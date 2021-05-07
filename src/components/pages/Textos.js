import React from "react";
import { MDBRow, MDBCol, MDBView, MDBCard, MDBCardBody } from "mdbreact";
import DataTable from "../DataTable";
import { eliminarCategoriaHandler } from "../../handler/eliminarCategoria";
import IngresarKeyt from "./../ingresarKeyt";
import TextEditor from "./../TextEditor";

const Textos = () => {
  const thead = new Array("keyt", "Value", "Editar");

  const [refreshID, setRefreshID] = React.useState(0);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [editKeyt, setEditKeyt] = React.useState({
    id: null,
    value: "",
    url: "",
  });

  window.eliminarCategoria = (id) => {
    eliminarCategoriaHandler(id).then((res) => {
      if (res) {
        setRefreshID(refreshID + 1);
      }
    });
  };

  window.editKeyt = (id, value) => {
    setIsOpenModal(true);
    const URL = process.env.REACT_APP_BASE_URL + "keyt/editarKeyt.php?table=text";
    setEditKeyt({
      id,
      value,
      url: URL,
    });
    setTimeout(() => {
      setIsOpenModal(false);
    }, 1500);
  };

  /*   React.useEffect(()=>{
    if(typeof window.refreshTextTable === 'number'){
      setRefreshID(refreshID + 1);
    }
  },
  [window.refreshTextTable]) */

  return (
    <>
      <TextEditor setIsOpenModal={isOpenModal} editKeyt={editKeyt} />
      <MDBRow>
        <MDBCol md="4">
          <IngresarKeyt refresh={setRefreshID} />
        </MDBCol>
        <MDBCol md="12">
          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Textos</h4>
            </MDBView>
            <MDBCardBody>
              <DataTable
                url={process.env.REACT_APP_BASE_URL + "keyt/listarKeyt.php?table=text"}
                thead={thead}
                tableId="CategoriasTable"
                refreshID={refreshID}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Textos;
