import React from "react";
import { MDBRow, MDBCol, MDBView, MDBCard, MDBCardBody } from "mdbreact";
import DataTable from "./../DataTable";
import IngresarProducto from "./../IngresarProducto";
import TextEditor from "./../TextEditor";
import { activarProductoHandler } from "./../../handler/activarProductoHandler";
import { eliminarProductoHandler } from "./../../handler/eliminarProductoHandler";
import { eliminarCategoriaDeProductoHandler } from "./../../handler/eliminarCategoriaDeProductoHandler";
import Swal from "sweetalert2";
import IngresarCategoriaDeProducto from "../IngresarCategoriaDeProducto";

const Productos = () => {
  const thead = {
    productos: [
      "Nombre",
      "Descripción",
      "Name",
      "Description",
      "Precio",
      "Url Imagen",
      "Activo",
      "Prioridad",
      "Eliminar",
    ],
    categorias: ["Nombre", "Name", "Prioridad", "Eliminar"],
  };

  const [refreshID, setRefreshID] = React.useState(0);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [editKeyt, setEditKeyt] = React.useState({
    id: null,
    value: "",
    url: "",
  });

  window.editarProducto = (id, value, key) => {
    setIsOpenModal(true);
    const URL = `${process.env.REACT_APP_BASE_URL}productos/editarProducto.php?key=${key}`;
    setEditKeyt({
      id,
      value,
      url: URL,
    });
    setTimeout(() => {
      setIsOpenModal(false);
    }, 100);
  };

  window.activarDesactivarProducto = (id, value) => {
    let title = "Seguro que desea desactivar el producto";
    let confirm = "Desactivar";

    if (value === 1) {
      title = "Seguro que desea activar el producto";
      confirm = "Activar";
    }

    Swal.fire({
      title: title,
      showDenyButton: true,
      confirmButtonText: confirm,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        activarProductoHandler(id, value).then((res) => {
          if (res) {
            setRefreshID(refreshID + 1);
          }
        });
      }
    });
  };

  window.eliminarProducto = (id) => {
    Swal.fire({
      title: "Seguro que desea eliminar el producto?",
      text: "La acción no se puede revertir!!",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCategoriaDeProductoHandler(id).then((res) => {
          if (res) {
            setRefreshID(refreshID + 1);
          }
        });
      }
    });
  };

  window.eliminarCategoriaDeProducto = (id) => {
    Swal.fire({
      title: "Seguro que desea eliminar la categoría?",
      text:
        "Esto eliminará también todos los productos asociados, la acción no se puede revertir!!",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProductoHandler(id).then((res) => {
          if (res) {
            setRefreshID(refreshID + 1);
          }
        });
      }
    });
  };

  window.editarCategoriaDelProducto = (id, value, key) => {
    setIsOpenModal(true);
    const URL = `${process.env.REACT_APP_BASE_URL}productos/editarCategoriaDelProducto.php?key=${key}`;
    setEditKeyt({
      id,
      value,
      url: URL,
    });
    setTimeout(() => {
      setIsOpenModal(false);
    }, 100);
  };

  return (
    <>
      <TextEditor setIsOpenModal={isOpenModal} editKeyt={editKeyt} />
      <MDBRow>
        <MDBCol md="4">
          <IngresarProducto />
        </MDBCol>
        <MDBCol md="4">
          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Notas</h4>
            </MDBView>
            <MDBCardBody>
              <ul>
                <li>Los productos se suben por defecto desactivados.</li>
                <li>
                  Las imagenes deben ser cuadras mismo alto que largo y en lo
                  posible mayores a 300x300px.
                </li>
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <IngresarCategoriaDeProducto />
        </MDBCol>
        <MDBCol md="12">
          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Categorias</h4>
            </MDBView>
            <MDBCardBody>
              <DataTable
                url={
                  process.env.REACT_APP_BASE_URL +
                  "productos/optionsCategoriasTable.php"
                }
                thead={thead.categorias}
                tableId="CategoriasTable"
                refreshID={refreshID}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="12">
          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Productos</h4>
            </MDBView>
            <MDBCardBody>
              <DataTable
                url={
                  process.env.REACT_APP_BASE_URL +
                  "productos/listarProductos.php"
                }
                thead={thead.productos}
                tableId="ProductosTable"
                refreshID={refreshID}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Productos;
