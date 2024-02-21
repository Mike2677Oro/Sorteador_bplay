function contarParticipantes() {
  // Obtener el contenido del Text Area y dividirlo por líneas
  var participantsTextArea = document.getElementById("participants");
  var participants = participantsTextArea.value.split("\n");

  // Filtrar líneas vacías para evitar contar líneas en blanco
  participants = participants.filter(function (participant) {
    return participant.trim() !== "";
  });

  // Mostrar el total de participantes
  var totalParticipantsSpan = document.getElementById("totalParticipants");
  totalParticipantsSpan.textContent = participants.length;
}

function agregarParticipante(event) {
  // Verificar si la tecla presionada es "Enter" (código 13)
  if (event.key === "Enter") {
    // Obtener el contenido del Text Area y el total de participantes
    var participantsTextArea = document.getElementById("participants");
    var totalParticipantsSpan = document.getElementById("totalParticipants");
    // Agregar el nuevo participante a la lista

    participantsTextArea.value += "\n";
    // Contar y mostrar el total de participantes
    // Evitar el salto de línea automático en el Text Area
    event.preventDefault();
  }
}

function resetearParticipantes() {
  // Obtener el Text Area y el total de participantes
  var participantsTextArea = document.getElementById("participants");
  var totalParticipantsSpan = document.getElementById("totalParticipants");

  // Restablecer el contenido del Text Area y el total de participantes
  participantsTextArea.value = "";
  totalParticipantsSpan.textContent = "0";
}

function importarArchivo(event) {
  var fileInput = event.target;
  var file = fileInput.files[0];

  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var contenido = e.target.result;

      // Verificar el tipo de archivo
      if (file.name.endsWith(".txt")) {
        // Procesar como archivo TXT
        procesarArchivoTXT(contenido);
      } else if (file.name.endsWith(".csv")) {
        // Procesar como archivo CSV
        procesarArchivoCSV(contenido);
      } else {
        alert(
          "Formato de archivo no admitido. Solo se admiten archivos .txt y .csv."
        );
      }
    };

    reader.readAsText(file);
  }
}

function procesarArchivoTXT(contenido) {
  var participantsTextArea = document.getElementById("participants");
  participantsTextArea.value = contenido;
  contarParticipantes();
}

function procesarArchivoCSV(contenido) {
  var participantsTextArea = document.getElementById("participants");
  var lineas = contenido.split("\n");
  // Limpiar el área de participantes antes de cargar el archivo CSV
  participantsTextArea.value = "";

  // Agregar cada línea del archivo CSV al área de participantes
  for (var i = 0; i < lineas.length; i++) {
    participantsTextArea.value += lineas[i] + "\n";
  }

  contarParticipantes();
}

function buttonComenzar() {
  const tituloSorteo = document.getElementById("tituloSorteo").value
  // guardar el titulo del sorteo en el localStorage
  localStorage.setItem(
    "tituloSorteo",
    tituloSorteo
  );
  // valor del textarea
  let participantsValue = document.getElementById("participants").value;
  // aca se divide el contenido en lineas
  let lines = participantsValue.split("\n");
  // se filtran las líneas que no están en blanco
  let nonEmptyLines = lines.filter(function (line) {
    // elimina espacios en blanco al principio y al final de la línea
    let trimmedLine = line.trim();
    // devuelve true si la línea no está vacía después de recortar los espacios en blanco
    return trimmedLine.length > 0;
  });
  // convierte las líneas no vacías de nuevo en un solo string
  var filteredParticipantsValue = nonEmptyLines.join("\n");
  // guardar los datos de los participants en el localStorage
  localStorage.setItem("participantes", filteredParticipantsValue);
  if(participantsValue.length > 0 && tituloSorteo.length > 0){
    window.location.href = "./pages/parameters.html"; // Cambia la ruta según sea necesario
  }else{
    alert('Titulo y/o Participantes no pueden estar vacios')
  }
}

// Rescatar los participantes del localStorage
let storageParticipants = localStorage.getItem("participantes");
storageParticipants = storageParticipants.split("\n");

const spanElement = document.querySelector(".totalP span");

spanElement.innerHTML = storageParticipants.length;

function buttonSortear() {
  // elegir el ganador usando la libreria Math
  const ganador =
    storageParticipants[Math.floor(Math.random() * storageParticipants.length)];
  // elegir el suplente
  let suplente =
    storageParticipants[Math.floor(Math.random() * storageParticipants.length)];
  console.log(ganador, suplente);
  // condicionar para que el suplente no sea igual al ganador
  while (suplente === ganador) {
    suplente =
      storageParticipants[
        Math.floor(Math.random() * storageParticipants.length)
      ];
  }

  // Almacenamos datos en localStorage
  localStorage.setItem(
    "cantidadGanadores",
    document.getElementById("winnersnmber").value
  );
  localStorage.setItem(
    "cantidadSuplentes",
    document.getElementById("subwinnersNmber").value
  );
  console.log(
    `Participantes:\n${storageParticipants}\n\nGanador: ${ganador}\n\nSuplente: ${suplente}`
  );
  // Llamar cuenta regresiva
  coronometro();

  document.querySelector("#ganador").textContent = ganador;
  document.querySelector("#suplente").textContent = suplente;
}

// Mostrar los segundos cada vez que pasa un segundo
function cuentaRegresiva(segundos) {
  let cuentaRegresiva = document.querySelector("#sorteando h2");
  cuentaRegresiva.textContent = segundos;
}

// hacer la cuenta regresiva
function coronometro() {
  document.querySelector(".containerParameters").style.display = "none";
  document.querySelector("#sorteando").style.display = "block";
  let segundos = 3;
  

  function actualizarSegundo() {
    cuentaRegresiva(segundos);

    if (segundos === 0) {
      document.querySelector("#sorteando").style.display = "none";
      document.querySelector("#resultado").style.display = "initial";
      document.querySelector("#confeti").style.display = "initial";

    } else {
      segundos--;
      setTimeout(actualizarSegundo, 1000);
    }
  }
  actualizarSegundo();
}

// ... filtrar duplicados, chances, extras, parametro

//Limpiar todos los valores del localStorage cuando va al home despues de terminar todo elsorteo
document.querySelector("#resetSorteo").addEventListener("click", () => {
  localStorage.clear();
});

// rescata el valor del nombre del titulo y lo agrega el contenido a la pagina
const tituloSorteo = localStorage.getItem("tituloSorteo");
document.querySelector(".tituloSorteo").textContent = tituloSorteo;

//Rescatar todos los parametros en ellocalStorage

//Parametros de ganador y suplentes. Si ganador es menor a 2 no se puede aumentar el suplente

//Si parametro chances extra es true se activa parametro sino no

//Que aparezca losresultados arriba del confeti

//Aumentar los numeros en los parametros de ganador y suplente