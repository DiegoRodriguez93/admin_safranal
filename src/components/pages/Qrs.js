import React from "react";
import QRCode from "react-qr-code";
import useFetch from "./../../hooks/useFetch";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { onSubmitQr } from "./../../handler/onSubmitQr";
import { MDBCol, MDBCard, MDBCardBody, MDBRow, MDBIcon } from "mdbreact";

const Qrs = () => {
  const [data, loading, setUrl, reload, setReload] = useFetch(
    process.env.REACT_APP_BASE_URL + "qrs/listarQrs.php"
  );
  const { handleSubmit, register, errors } = useForm();

  const deleteQr = (e) => {
    let formData = new FormData();

    formData.append("id", e.target.id);

    fetch(process.env.REACT_APP_BASE_URL + "qrs/eliminarQr.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => Swal.fire("Error!", error, "error"))
      .then(({ result, message }) => {
        if (result) {
          Swal.fire("Correcto!", message, "success");
          e.target.parentNode.remove();
          setReload(reload + 1);
        } else {
          Swal.fire("Error!", message, "error");
        }
      });
  };

  const handleS = (values, e) => {
    onSubmitQr(values, e).then((r) => setReload(reload + 1));
  };

  const handlePrint = (id) => {
    let printWindow = window.open("", "qrPrint", "height=600, width=600");
    let el = document.getElementById(`qr${id}`);
    var cloneEl = el.cloneNode(true);
    cloneEl.id = "clone" + id;
    cloneEl.style.display = "block";
    cloneEl.style.textAlign = 'center';
    cloneEl.style.marginTop = '8%';

    printWindow.document.body.innerHTML = `${cloneEl.outerHTML}`;

    printWindow.print();
  };

  return (
    <>
      <MDBRow className="mb-4">
        <MDBCol md="5" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <div className="text-center mb-2">
                <h3>Crear QR</h3>
              </div>
              <form className="qr-form" onSubmit={handleSubmit(handleS)}>
                <label htmlFor="description">Descripción*</label>
                <input
                  name="description"
                  className="form-control"
                  ref={register({
                    required: "Descripción requerida!",
                  })}
                />
                <span>{errors.description && errors.description.message}</span>
                <label htmlFor="value">Valor*</label>
                <input
                  name="value"
                  className="form-control"
                  placeholder="EJ: https://paellastogomiami.com/menu"
                  ref={register({
                    required: "Valor requerido!",
                  })}
                />
                <span>{errors.value && errors.value.message}</span>

                <button
                  className="btn btn-primary btn-block mt-3"
                  type="submit"
                >
                  Crear
                </button>
              </form>
              {/*                         <QRCode value="https://renoca.ml" /><br/>
                        <span className="qr-description">qr de https://renoca.ml</span> */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-4">
        {loading ? (
          "Loading..."
        ) : !data.result ? (
          <span>{data.message}</span>
        ) : (
          data.qrs.map(({ id, description, value }) => (
            <MDBCol md="4" className="mb-4 text-center" key={id}>
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <QRCode value={value} />
                  <div id={`qr${id}`} style={{ display: "none" }}>
                    <QRCode value={value} size={512} />
                  </div>
                  <span className="descripcion-qr">{description}</span>
                  <MDBIcon
                    id={id}
                    icon="trash"
                    onClick={(e) => {
                      deleteQr(e);
                    }}
                    className="mr-3 fa-2x trash"
                  />
                  <MDBIcon
                    id={id}
                    icon="print"
                    onClick={() => handlePrint(id)}
                    className="mr-3 fa-2x trash"
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
        )}
      </MDBRow>
    </>
  );
};

export default Qrs;
