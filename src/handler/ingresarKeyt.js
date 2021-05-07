import Swal from "sweetalert2";

export const ingresarKeytHandler = ({ keyt, value }, e) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();

    formData.append("keyt", keyt);
    formData.append("value", value);

    fetch(
      process.env.REACT_APP_BASE_URL + "keyt/ingresarKeyt.php?table=text_en",
      {
        method: "POST",
        body: formData,
      }
    ).then(() => {
      fetch(
        process.env.REACT_APP_BASE_URL + "keyt/ingresarKeyt.php?table=text",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .catch((error) => {
          Swal.fire("Error!", error, "error");
          reject(false);
        })
        .then(({ result, message }) => {
          if (result) {
            Swal.fire("Correcto!", message, "success");
            e.target.reset();
            resolve(true);
          } else {
            Swal.fire("Error!", message, "error");
          }
        });
    });
  });
};
