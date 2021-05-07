import React from 'react';
import { MDBFooter } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="blue" className="text-center font-small darken-2">
            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.renoca.ml"> Renoca.ml </a>
            </p>
        </MDBFooter>
    );
}

export default Footer;