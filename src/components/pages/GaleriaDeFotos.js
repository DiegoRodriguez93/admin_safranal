import React from 'react'
import { MDBRow, MDBCol, MDBView, MDBCard, MDBCardBody } from 'mdbreact';
import DataTable from '../DataTable';
import IngresarFoto from '../IngresarFoto';
import IngresarCategoriaDeFoto from '../IngresarCategoriaDeFoto';
import { eliminarFotoHandler } from './../../handler/eliminarFotoHandler';
import Swal from 'sweetalert2';

const GaleriaDeFotos =  () => {

 const [refreshID, setRefreshID] = React.useState(0);
 const thead = new Array(`IMG`, `Resolución`, `Url`, `Nombre`, `Categoría`, `Eliminar`);

 window.getImgSize = (imgSrc) => {
  let newImg = new Image();

  newImg.onload = function() {
    let height = newImg.height;
    let width = newImg.width;
    Swal.fire('Resolución original:', 'La resolución es width:'+width+'px*height:'+height+'px' , 'success');
  }

  newImg.src = imgSrc; // this must be done AFTER setting onload
 }

 window.eliminarFoto = (id) => {
  eliminarFotoHandler(id).then((res) => {
    if (res) {
      setRefreshID(refreshID + 1);
    }
  });
};

  return (
    <>
      <MDBRow>
      <MDBCol md="4">
        <IngresarFoto/>
      </MDBCol>
      <MDBCol md="4">
        <IngresarCategoriaDeFoto/>
      </MDBCol>
      <MDBCol md="12">
        <MDBCard className="mt-5">
          <MDBView className="gradient-card-header blue darken-2">
            <h4 className="h4-responsive text-white">Imagenes</h4>
          </MDBView>
          <MDBCardBody>
            <DataTable
            url={process.env.REACT_APP_BASE_URL + "galeriaDeFotos/listarFotos.php"}
            thead={thead}
            tableId="GaleriaDeFotosTable"
            refreshID={refreshID}
            />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </>
  )
}

export default GaleriaDeFotos;