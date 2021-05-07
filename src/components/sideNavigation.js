import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink, useHistory } from 'react-router-dom';

import comprobarLogIn from './../handler/comprobarLogIn'


const TopNavigation = () => {

    /* let history = useHistory(); */

/*         if(!comprobarLogIn()){
            history.push('/admin');
            return null;
        }   */

    const cerrarSesionHander = () => {
        localStorage.clear();
        window.location.reload();
    }


    return (

        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src="https://demo.paellastogomiami.com/logo.png" />
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/admin/qrs" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Qrs
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/textos" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Textos
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/textos_en" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Textos Inglés
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/productos" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="table" className="mr-3"/>
                        Productos
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/imagenes" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="table" className="mr-3"/>
                        Imagenes
                    </MDBListGroupItem>
                </NavLink>
{/*                 <NavLink to="/qrs" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="link" className="mr-3"/>
                        Códigos QRs
                    </MDBListGroupItem>
                </NavLink> */}
                <NavLink exact to="/admin" onClick={cerrarSesionHander} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="sign-out-alt" className="mr-3"/>
                        Cerrar sesión
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;