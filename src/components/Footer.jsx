import React from 'react';

const Footer = () => {
    return (
        <footer>
            <nav>
                <h1>logo</h1>
                <ul>
                    <li>Nous contacter</li>
                    <li>30-32 av. de la République 94800 Villejuif</li>
                    <li>01 88 28 90 00</li>
                    <li><a href="mailto:dede.dupont@gmail.com">dede.dupont@gmail.com</a></li>
                </ul>
                <ul>
                    <li>Navigation</li>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/events">Prochains événements</a></li>
                    <li><a href="/comparateur">Comparateur</a></li>
                    <li><a href="/classement">Classement</a></li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
