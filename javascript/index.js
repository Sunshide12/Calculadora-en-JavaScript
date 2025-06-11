document.addEventListener("DOMContentLoaded", function () {
  var modal = new bootstrap.Modal(document.getElementById("modalInicio"));
  modal.show();

  // // Ocultar calculadora inicialmente
  // const calculadora = document.getElementById("calculadora");
  // calculadora.style.display = "none";

  // // Mostrar calculadora al cerrar el modal
  // document.getElementById("btnContinuar").addEventListener("click", () => {
  //   calculadora.style.display = "block"; // Mostrar la calculadora
  //   modal.hide(); // Ocultar modal
  // });

  //Hacemos el display
  const display = document.getElementById("display");

  //Para seleccionar todos los botones
  const buttons = document.querySelectorAll(".btnCalculadora");

  //Ahora detectar en donde le das click con .forEach()

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      //Recogemos los valores correspondientes
      const value = button.innerText;

      if (value == "C") {
        //Borramos lo que haya en el display
        display.value = "";
      } else if (value === "=") {
        try {
          const result = eval(display.value.replace("X", "*"));
          display.value = result;
        } catch {
          display.value = "Error";
        }
      } else {
        display.value += value; // añade el número u operador a la pantalla
      }
    });
  });

  //Soporte para teclado
  document.addEventListener("keydown", (event) => {
    const tecla = event.key;

    if (tecla == "Enter") {
      try {
        const result = eval(display.value.replace("X", "*"));
        display.value = result;
      } catch {
        display.value = "Error";
      }
    }

  });
});
