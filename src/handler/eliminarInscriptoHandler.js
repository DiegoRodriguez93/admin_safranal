import Swal from 'sweetalert2';

export const eliminarInscriptoHandler = (id) => {

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

    return new Promise ((resolve, reject) => {

        let formData = new FormData();
    
        formData.append('id', id);
    
        fetch(process.env.REACT_APP_BASE_URL + 'capacitaciones/eliminarInscripto.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => {
                Swal.fire('Error!', error, 'error')
                reject(false);
            })
            .then(({ result, message }) => {
                if (result) {
                    Swal.fire('Correcto!', message, 'success');
                    resolve(true);
                } else {
                    Swal.fire('Error!', message, 'error');
                }
            });
    })


}