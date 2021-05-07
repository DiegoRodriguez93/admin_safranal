import React from "react";
import DataTable from "../DataTable";
import { MDBRow, MDBCol, MDBCard, MDBView, MDBCardBody } from "mdbreact";
import TextEditor from "./../TextEditor";

const Config = () => {
  const thead = ["Nombre", "Valor"];
  const [refreshID, setRefreshID] = React.useState(0);

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [editKeyt, setEditKeyt] = React.useState({
    id: null,
    value: "",
    url: "",
  });

  window.editconfig = (id, value, key) => {
    setIsOpenModal(true);
    const URL = `${process.env.REACT_APP_BASE_URL}config/editConfig.php?key=${key}`;
    setEditKeyt({
      id,
      value,
      url: URL,
    });
    setTimeout(() => {
      setIsOpenModal(false);
    }, 300);
  };

  return (
    <>
      <TextEditor setIsOpenModal={isOpenModal} editKeyt={editKeyt} />
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">
                Paramentros de configuracion.
              </h4>
            </MDBView>
            <MDBCardBody>
              <DataTable
                url={process.env.REACT_APP_BASE_URL + "config/entity.php"}
                thead={thead}
                tableId="CapacitacionesTable"
                refreshID={refreshID}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Config;
