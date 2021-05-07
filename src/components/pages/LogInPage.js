import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBView, MDBCardBody } from "mdbreact";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import comprobarLogIn from './../../handler/comprobarLogIn'

import Swal from "sweetalert2";

const LogInPage = () => {
  const { handleSubmit, register, errors } = useForm();
  let history = useHistory();
  const onSubmit = (data, e) => {
    if (data.user === "safranaladmin" && data.pass === "Argentina161803") {
      localStorage.setItem("idUserAdmin", 1);
      localStorage.setItem("token", "041292200a64c28adcd1c66feac2cd2b");
      window.location.reload();
    } else {
      Swal.fire("Error!", "Usuario o contraseña incorrectos", "error");
    }
  };

  
  console.log("🚀 ~ file: LogInPage.js ~ line 25 ~ LogInPage ~ comprobarLogIn", comprobarLogIn)

  if(comprobarLogIn()){
    history.push("/admin/capacitaciones");
  }

  return (
    <MDBRow>
      <MDBCol md="4"></MDBCol>
      <MDBCol md="4">
        <MDBCard className="mt-5">
          <MDBView className="gradient-card-header blue darken-2">
            <h4 className="h4-responsive text-white">Iniciar sesión</h4>
          </MDBView>
          <MDBCardBody>
            <form className="qr-form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="user">Usuario</label>
              <input
                name="user"
                className="form-control"
                ref={register({
                  required: "Requerido",
                })}
              />
              <span>{errors.user && errors.user.message}</span>
              <label htmlFor="pass">Contraseña</label>
              <input
                name="pass"
                className="form-control"
                type="password"
                ref={register({
                  required: "Requerido",
                })}
              />
              <span>{errors.pass && errors.pass.message}</span>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Ingresar
                </button>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="4"></MDBCol>
    </MDBRow>
  );
};

export default LogInPage;
