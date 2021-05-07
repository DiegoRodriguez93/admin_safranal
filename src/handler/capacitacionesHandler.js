import Swal from 'sweetalert2';
export const capacitacionesHandler = (ACTION) => {

    return new Promise ((resolve, reject) => {

        let formData = new FormData();
    
        formData.append('action', ACTION);
    
        fetch(process.env.REACT_APP_BASE_URL + 'capacitaciones/handler.php', {
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