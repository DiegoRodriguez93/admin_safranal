

import React from "react";
import { MDBView, MDBCard, MDBCardBody } from "mdbreact";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function IngresarCategoriaDeProducto() {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data) => {
    let formData = new FormData();

    formData.append("nombre", data.nombre);
    formData.append("name", data.name);

    Swal.fire({
      title: "Subiendo Categoría ...",
      onBeforeOpen() {
        Swal.showLoading();
      },
      onAfterClose() {
        Swal.hideLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
    });

    fetch(process.env.REACT_APP_BASE_URL + "productos/ingresarCategoriaDeProducto.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => {
        Swal.fire("Error!", error, "error");
      })
      .then(({ result, message }) => {
        if (result) {
          Swal.fire("Correcto!", message, "success");
          window.location.reload();
        } else {
          Swal.fire("Error!", message, "error");
        }
      });
  };

  return (
    <React.Fragment>
      <MDBCard className="mt-5">
        <MDBView className="gradient-card-header blue darken-2">
          <h4 className="h4-responsive text-white">Ingresar nueva categoría</h4>
        </MDBView>
        <MDBCardBody>
          <form className="qr-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombre">Nombre</label>
            <input
              name="nombre"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.nombre && errors.nombre.message}</span>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.name && errors.name.message}</span>
            <div className="text-center">
              <button className="btn btn-primary" type="submit">
                Ingresar
              </button>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  );
}