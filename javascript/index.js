document.addEventListener("DOMContentLoaded", function () {
  var modal = new bootstrap.Modal(document.getElementById("modalInicio"));
  modal.show();

  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btnCalculadora");
  let resultadoMostrado = false;

  const esOperador = (car) => "+-*/".includes(car);

  const limpiarSiError = () => {
    if (display.value === "Error") display.value = "";
  };

  const agregarValor = (valor) => {
    limpiarSiError();

    const ultimo = display.value.slice(-1);
    const estaVacio = display.value === "";

    if (resultadoMostrado && !esOperador(valor)) {
      display.value = "";
      resultadoMostrado = false;
    }

    if (esOperador(valor)) {
      if (estaVacio) {
        // Si el display está vacío y presiona un operador, iniciamos con 0
        display.value = "0" + valor;
        return;
      }

      if (esOperador(ultimo)) {
        // Reemplazar el último operador por el nuevo
        display.value = display.value.slice(0, -1) + valor;
        return;
      }
    }

    display.value += valor;
  };

  // BOTONES
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.innerText;

      if (value === "C") {
        display.value = "";
      } else if (value === "=") {
        try {
          const result = eval(display.value.replace("X", "*"));
          display.value = result;
          resultadoMostrado = true;
        } catch {
          display.value = "Error";
        }
      } else {
        agregarValor(value === "X" ? "*" : value);
      }
    });
  });

  // TECLADO
  document.addEventListener("keydown", (event) => {
    const tecla = event.key;
    limpiarSiError();

    if (tecla === "Enter") {
      event.preventDefault();
      try {
        const result = eval(display.value);
        display.value = result;
        resultadoMostrado = true;
      } catch {
        display.value = "Error";
      }
    } else if (tecla === "Backspace") {
      display.value = display.value.slice(0, -1);
    } else if (tecla === "Escape") {
      display.value = "";
    } else if (!isNaN(tecla) || "+-*/.".includes(tecla)) {
      agregarValor(tecla);
    }
  });

  


});
