import React from "react";
import { MDBView, MDBCard, MDBCardBody } from "mdbreact";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

export default function IngresarCategoriaDeFoto() {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data) => {

    let formData = new FormData();

    formData.append('nombreDeCategoria', data.categoria)

    fetch(process.env.REACT_APP_BASE_URL + 'galeriaDeFotos/ingresarCategoriaDeFoto.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .catch(error => {
            Swal.fire('Error!', error, 'error')
        })
        .then(({ result, message }) => {
            if (result) {
                Swal.fire('Correcto!', message, 'success');
                window.location.reload();
            } else {
                Swal.fire('Error!', message, 'error');
            }
        });

  }

  return (
    <React.Fragment>
      <MDBCard className="mt-5">
        <MDBView className="gradient-card-header blue darken-2">
          <h4 className="h4-responsive text-white">
            Ingresar categoría de imagen
          </h4>
        </MDBView>
        <MDBCardBody>
          <form className="qr-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Nombre Categoría</label>
            <input
              name="categoria"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.categoria && errors.categoria.message}</span>
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
