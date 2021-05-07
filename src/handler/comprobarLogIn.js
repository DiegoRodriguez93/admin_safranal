export default function comprobarLogIn() {

  let result = true;

  if (
    localStorage.getItem("idUserAdmin") !== 1 &&
    localStorage.getItem("token") !== "041292200a64c28adcd1c66feac2cd2b"
  ) {
    result = false;
  }

  return result;

}
