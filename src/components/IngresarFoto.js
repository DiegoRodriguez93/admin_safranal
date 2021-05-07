import React from "react";
import { MDBView, MDBCard, MDBCardBody } from "mdbreact";
import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import Swal from "sweetalert2";

export default function IngresarFoto() {
  const { handleSubmit, register, errors } = useForm();
  const [data, loading, setUrl, reload, setReload] = useFetch(
    process.env.REACT_APP_BASE_URL + "galeriaDeFotos/optionsCategorias.php"
  );
  const onSubmit = (data, e) => {
    let formData = new FormData();

    formData.append("nombre", data.nombre);
    formData.append("categoria", data.categoria);
    formData.append("foto", data.image[0]);

    Swal.fire({
      title: "Subiendo Foto ...",
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

    fetch(process.env.REACT_APP_BASE_URL + "galeriaDeFotos/subirFoto.php", {
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
          <h4 className="h4-responsive text-white">Ingresar Imagen</h4>
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
            <label htmlFor="description">Categoría</label>
            <select
              name="categoria"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            >
              {loading ? (
                <option value="">Cargando categorias..</option>
              ) : (
                data.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}{" "}
                  </option>
                ))
              )}
            </select>
            <span>{errors.categoria && errors.categoria.message}</span>
            <label htmlFor="image">Imagen</label>
            <input
              name="image"
              type="file"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.image && errors.image.message}</span>

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
