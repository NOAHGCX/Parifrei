import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Image</h1>
            <nav>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/events">Prochains événements</a></li>
                    <li><a href="/comparateur">Comparateur</a></li>
                    <li><a href="/classement">Classement</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
