import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client/core/index.js'
import { setContext } from '@apollo/client/link/context/index.js'
import { onError } from '@apollo/client/link/error/index.js'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js'
import { useLazyQuery } from '@apollo/client/react/hooks/useLazyQuery.js'
import { useMutation } from '@apollo/client/react/hooks/useMutation.js'
import { useQuery } from '@apollo/client/react/hooks/useQuery.js'
import { useSubscription } from '@apollo/client/react/hooks/useSubscription.js'
import { getMainDefinition } from '@apollo/client/utilities/index.js'
// import { onValue, ref } from 'firebase/database'
import { createClient } from 'graphql-ws'
// import { auth, db } from './firebase'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors != null) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(message, locations, path)
    })
  }
  if (networkError != null) {
    const networkErrorMessage =
      networkError instanceof Error ? networkError.message : 'Network error'
  }
})

// const CurrentToken = async (): Promise<any> => {
//   return await new Promise((resolve) => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const getToken = await user.getIdToken()
//         const idTokenResult = await user.getIdTokenResult()
//         const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']
//         if (hasuraClaim) {
//           resolve(getToken)
//         } else {
//           const metadataRef = ref(db, `metadata/${user.uid}/refreshTime`)

//           onValue(metadataRef, async (snapshot) => {
//             const data = snapshot.val()
//             if (!data.exists) return
//             const t = await user.getIdToken(true)
//             resolve(t)
//           })
//         }
//       } else {
//         resolve(null)
//       }
//     })
//   })
// }

// const authLink = setContext(async (_, { headers }) => {
//   const [cookies] = useCookies(['user'])

//   if (cookies?.user?.token) {
//     return {
//       headers: {
//         ...headers,
//         authorization: `Bearer ${cookies.user.token}`,
//       },
//     }
//   }
//   return headers
// })

// const httpLink = new HttpLink({
//   uri: import.meta.env.PUBLIC_HASURA_ENDPOINT,
// })

// const wsLink =
//   typeof window !== 'undefined'
//     ? new GraphQLWsLink(
//         createClient({
//           url: import.meta.env.PUBLIC_HASURA_WS,
//           connectionParams: async () => {
//             const [cookies] = useCookies(['user'])

//             if (cookies?.user?.token) {
//               return {
//                 headers: {
//                   Authorization: `Bearer ${cookies.user.token}`,
//                 },
//               }
//             }
//             return {}
//           },
//         })
//       )
//     : null

const authLink = setContext(async (_, { headers }) => {
  // const $token = await CurrentToken()

  // if ($token) {
  //     return {
  //         headers: {
  //             ...headers,
  //             authorization: $token ? `Bearer ${$token}` : '',
  //         },
  //     }
  // }
  return {
    headers: {
      'x-hasura-admin-secret': import.meta.env.PUBLIC_HASURA_SECRET,
    },
  }
})

const httpLink = new HttpLink({
  uri: import.meta.env.PUBLIC_HASURA,
})

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: import.meta.env.PUBLIC_HASURA_WS,
          connectionParams: async () => {
            // const $token = await CurrentToken()

            // if ($token) {
            //     return {
            //         headers: {
            //             Authorization: `Bearer ${$token}`
            //         },
            //     }
            // }
            return {
              headers: {
                'x-hasura-admin-secret': import.meta.env.PUBLIC_HASURA_SECRET,
              },
            }
          },
        }),
      )
    : null

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink,
      )
    : httpLink

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: from([authLink, errorLink, splitLink]),
  cache: new InMemoryCache(),
})

export const useAstroMutation: typeof useMutation = (query, options) => {
  return useMutation(query, { ...options, client })
}

export const useAstroQuery: typeof useQuery = (query, options) => {
  return useQuery(query, { ...options, client })
}

export const useLazyAstroQuery: typeof useLazyQuery = (query, options) => {
  return useLazyQuery(query, { ...options, client })
}

export const useAstroSubscription: typeof useSubscription = (
  query,
  options,
) => {
  return useSubscription(query, { ...options, client })
}
