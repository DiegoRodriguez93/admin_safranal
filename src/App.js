import React from "react";
/* import Routes from "../src/components/Routes"; */
import TopNavigation from "./components/topNavigation";
import SideNavigation from "./components/sideNavigation";
import Footer from "./components/Footer";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

import LogInPage from "./components/pages/LogInPage";
import Textos from "./components/pages/Textos";
import Textos_EN from "./components/pages/Textos_en";
import Productos from "./components/pages/Productos";
import GaleriaDeFotos from "./components/pages/GaleriaDeFotos";
import Qrs from "./components/pages/Qrs";
import NotFoundPage from "./components/pages/NotFoundPage";
import "./index.css";
import "./App.scss";
import history from "./utils/history/" 

export default function App() {

  return (
    <BrowserRouter  history={history} >

      <div className="flexible-content">
        <TopNavigation />
        <SideNavigation />
        <main id="content" className="p-5">
        <Switch>
            <Route path="/admin" exact component={LogInPage} />
            <Route path="/admin/qrs" component={Qrs} />
            <Route path="/admin/textos" component={Textos} />
            <Route path="/admin/textos_en" component={Textos_EN} />
            <Route path="/admin/productos" component={Productos} />
            <Route path="/admin/imagenes" component={GaleriaDeFotos} />
            <Route /* path="/admin/404" */ component={NotFoundPage} />
          </Switch>
        </main>
        <br />
        <br />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
