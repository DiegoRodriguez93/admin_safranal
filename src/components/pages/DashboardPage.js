import React from "react";
import DataTable from "./../DataTable";
import { MDBRow, MDBCol, MDBCard, MDBView, MDBCardBody } from "mdbreact";
import { capacitacionesHandler } from "./../../handler/capacitacionesHandler";
import { marcarPagoHandler } from "./../../handler/marcarPagoHandler";
import { eliminarInscriptoHandler } from "./../../handler/eliminarInscriptoHandler";
import Swal from "sweetalert2";
import useFetch from "./../../hooks/useFetch";

const DashboardPage = () => {
  const thead = [
    "Nombre",
    "Email",
    "Pago",
    "Fecha inscripción",
    "DNI",
    "Profesión",
    "Eliminar",
  ];
  const [refreshID, setRefreshID] = React.useState(0);
  const [data, loading, setUrl, reload, setReload] = useFetch(
    process.env.BASE_RUL + "capacitaciones/chequearFinalizadoInscripto.php"
  );

  const buttonHandler = (ACTION) => {
    Swal.fire({
      title: `Esta seguro que quiere realizar esta acción?`,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Espere por favor ...",
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

        capacitacionesHandler(ACTION).then((res) => {
          if (res) {
            setRefreshID(refreshID + 1);
            setReload(reload + 1);
          }
        });
      }
    });
  };

  window.MarcarPago = (id) => {
    marcarPagoHandler(id).then((res) => {
      if (res) {
        setRefreshID(refreshID + 1);
      }
    });
  };

  window.eliminarInscripto = (id) => {
    Swal.fire({
      title: `Esta seguro que quiere eliminar este inscripto?`,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Espere por favor ...",
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

        eliminarInscriptoHandler(id).then((res) => {
          if (res) {
            setRefreshID(refreshID + 1);
          }
        });
      }
    });
  };

  return (
    <>
      <MDBRow>
        <MDBCol md="8">
          <button
            onClick={() => {
              buttonHandler("DELETE_ALL");
            }}
            className="btn btn-danger"
          >
            Eliminar Todos
          </button>
          <button
            onClick={() => {
              buttonHandler("MARCAR_ABIERTO_CAPACITACION");
            }}
            className="btn btn-primary"
          >
            Marcar como abierto
          </button>
          <button
            onClick={() => {
              buttonHandler("MARCAR_CERRADO_CAPACITACION");
            }}
            className="btn btn-secondary"
          >
            Marcar como finalizado
          </button>
          <button
            onClick={() => {
              buttonHandler("MARCAR_ABIERTO_INSCRIPCION");
            }}
            className="btn btn-success"
          >
            Abrir inscripciones
          </button>
          <button
            onClick={() => {
              buttonHandler("MARCAR_CERRADO_INSCRIPCION");
            }}
            className="btn btn-warning"
          >
            Cerrar inscripciones
          </button>
        </MDBCol>
        <MDBCol md="4">
          <h3>
            Estado de capacitación:
            {loading ? (
              ""
            ) : data.estado_capacitacion === "1" ? (
              <span style={{ color: "green", fontWeight: "bolder" }}>
                {" "}
                En curso
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bolder" }}>
                {" "}
                Finalizada
              </span>
            )}
          </h3>
          <h3>
            Estado de inscripciones:
            {loading ? (
              ""
            ) : data.estado_inscripciones === "1" ? (
              <span style={{ color: "green", fontWeight: "bolder" }}>
                {" "}
                Abiertas
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bolder" }}>
                {" "}
                Cerradas
              </span>
            )}
          </h3>
        </MDBCol>
        <MDBCol md="12">
          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">
                Inscriptos en capacitaciones.
              </h4>
            </MDBView>
            <MDBCardBody>
              <DataTable
                url={
                  process.env.REACT_APP_BASE_URL +
                  "capacitaciones/listarCapacitaciones.php"
                }
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

export default DashboardPage;
