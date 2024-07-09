const Loader = (): JSX.Element => {
    return (
      <>
        <div
          className={`w-screen h-screen fixed top-0 left-0 bg-white flex items-center justify-center z-50 `}
        >
          <img src={`/loadingtwo.gif`} alt={`loading`} className={`w-36`} />
        </div>
      </>
    )
  }
  
  export default Loader
  