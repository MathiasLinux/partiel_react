// Importation of all the modules used in this page
import React from 'react';
import {Link} from "react-router-dom";

// Importation of the style used by this page
import "../Style/notFound.css"

// Importation of the image used in the center of this page
import notFound from '../Img/404.svg'

const NotFound = () => {
    return (
        <main className="mainNotFound">
            <img src={notFound} alt="Erreur 404"/>
            <h2>Oups vous vous êtes perdu !</h2>
            <div>La page que vous cherchez n'est plus disponible</div>
            <div>Vous pouvez retourner à l'accueil <Link to="/">ici</Link></div>
        </main>
    );
};

export default NotFound;