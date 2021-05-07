import React from "react";
import { MDBView, MDBCard, MDBCardBody } from "mdbreact";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useFetch from "../hooks/useFetch";

export default function IngresarProducto() {
  const { handleSubmit, register, errors } = useForm();

  const [data, loading, setUrl, reload, setReload] = useFetch(
    process.env.REACT_APP_BASE_URL + "productos/optionsCategorias.php"
  );

  const onSubmit = (data) => {
    let formData = new FormData();

    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoria", data.categoria);
    formData.append("precio", data.precio);
    formData.append("imagen", data.imagen[0]);

    Swal.fire({
      title: "Subiendo Producto ...",
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

    fetch(process.env.REACT_APP_BASE_URL + "productos/ingresarProducto.php", {
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
          <h4 className="h4-responsive text-white">Ingresar productos</h4>
        </MDBView>
        <MDBCardBody>
          {/* TODO AGREGAR NAME Y DESCRIPTION */}
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
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              name="descripcion"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.name && errors.name.message}</span>
            <span>{errors.descripcion && errors.descripcion.message}</span>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.description && errors.description.message}</span>
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
                data.map(({ id, name, nombre }) => (
                  <option key={id} value={id}>
                    {name} {nombre}
                  </option>
                ))
              )}
            </select>
            <span>{errors.categoria && errors.categoria.message}</span>
            <label htmlFor="precio">Precio</label>
            <input
              name="precio"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.price && errors.price.message}</span>
            <label htmlFor="image">Imagen</label>
            <input
              name="imagen"
              type="file"
              className="form-control"
              ref={register({
                required: "Requerido",
              })}
            />
            <span>{errors.imagen && errors.imagen.message}</span>

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