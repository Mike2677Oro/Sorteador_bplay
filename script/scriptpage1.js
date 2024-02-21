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
  const tituloSorteo = document.querySelector("#tituloSorteo").value;
  // guardar el titulo del sorteo en el localStorage
  localStorage.setItem("tituloSorteo", tituloSorteo);
  // valor del textarea
  let participantsValue = document.querySelector("#participants").value;
  // aca se divide el contenido en lineas
  let lines = participantsValue.split("\n");
  console.log(lines);
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
  if (lines.length > 1 && tituloSorteo.length > 0) {
    window.location.href = "./pages/parameters.html"; // Cambia la ruta según sea necesario
  } else {
    alert("- Título y/o Participantes no pueden estar vacíos\n- Debe haber más de un participante. ")
    
}
}
//Rescatar todos los parametros en el localStorage
function onloadParameters() {
  // rescata el valor del nombre del titulo y lo agrega el contenido a la pagina
  document.querySelector(".tituloSorteo").textContent = localStorage.getItem("tituloSorteo");
  
  // Rescatar los participantes del localStorage
  let storageParticipants = localStorage.getItem("participantes").split("\n");
  document.querySelector(".totalP span").textContent = storageParticipants.length;
  
  //rescatar los valores de los parametros
  let cantidadGanadores = document.querySelector("#winnersnmber");
  let cantidadSuplentes = document.querySelector("#subwinnersNmber");
  let filtrarDuplicados = document.querySelector("#toggle");
  let chancesExtra = document.querySelector("#toggle2");
  let parametro = document.querySelector("#parameTexarea");
  
  // Almacenamos datos en localStorage
  localStorage.setItem("cantidadGanadores", cantidadGanadores.value);
  localStorage.setItem("cantidadSuplentes", cantidadSuplentes.value);
  localStorage.setItem("filtrarDuplicados", filtrarDuplicados.value);
  localStorage.setItem("chancesExtra", chancesExtra.value);
  localStorage.setItem("parametro", parametro.value);

  // Sortear
  document.querySelector("#buttonSorteo").addEventListener("click", () => {
    // elegir el ganador usando la libreria Math
    const ganador =
      storageParticipants[
        Math.floor(Math.random() * storageParticipants.length)
      ];
    // elegir el suplente
    let suplente =
      storageParticipants[
        Math.floor(Math.random() * storageParticipants.length)
      ];
    // condicionar para que el suplente no sea igual al ganador
    while (suplente === ganador) {
      suplente =
        storageParticipants[
          Math.floor(Math.random() * storageParticipants.length)
        ];
    }
    // Llamar cuenta regresiva
    cronometro();

    document.querySelector("#ganador").textContent = ganador;
    document.querySelector("#suplente").textContent = suplente;
  });

  // Hacer la cuenta regresiva y cambiar el display para ver el conteo y luego el ganador
  function cronometro() {
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
  
  // Mostrar los segundos cada vez que pasa un segundo
  function cuentaRegresiva(segundos) {
    let cuentaRegresiva = document.querySelector("#sorteando h2");
    cuentaRegresiva.textContent = segundos;
  }
 
  //Limpiar todos los valores del localStorage cuando va al home despues de terminar todo elsorteo
  document.querySelector("#resetSorteo").addEventListener("click", () => {
    localStorage.clear();
  });

  // aumentar valor de ganadores
  document.querySelector('.botonUp1').addEventListener('click', ()=>{
    
    if(Number(cantidadGanadores.value) > 0 && Number(cantidadGanadores.value) < 10){
      const NuevaCantidadCanadores = Number(cantidadGanadores.value) + 1
      cantidadGanadores.value = NuevaCantidadCanadores
      console.log(cantidadGanadores.value);
      localStorage.setItem("cantidadGanadores", NuevaCantidadCanadores);
    }
  })
  // disminuir valor de ganadores
  document.querySelector('.botonDown1').addEventListener('click', ()=>{

    if(Number(cantidadGanadores.value) > 1 && Number(cantidadGanadores.value) <= 10 && Number(cantidadSuplentes.value) < (Number(cantidadGanadores.value) - 1)){
      const NuevaCantidadCanadores = Number(cantidadGanadores.value) - 1
      cantidadGanadores.value = NuevaCantidadCanadores
      localStorage.setItem("cantidadGanadores", NuevaCantidadCanadores);
    }
  })
  //aumentar valor de suplentes
  document.querySelector('.botonUp2').addEventListener('click', ()=>{
    if(Number(cantidadGanadores.value) > 1 && Number(cantidadSuplentes.value) < (Number(cantidadGanadores.value) - 1)){
      const NuevaCantidadSuplentes = Number(cantidadSuplentes.value) + 1
      cantidadSuplentes.value = NuevaCantidadSuplentes
      localStorage.setItem("cantidadSuplentes", NuevaCantidadSuplentes);
    }
  })
  //disminuir valor de suplentes
  document.querySelector('.botonDown2').addEventListener('click', ()=>{
    if(Number(cantidadSuplentes.value) > 0 && Number(cantidadGanadores.value) <= 10){
      const NuevaCantidadSuplentes = Number(cantidadSuplentes.value) - 1
      cantidadSuplentes.value = NuevaCantidadSuplentes
      localStorage.setItem("cantidadSuplentes", NuevaCantidadSuplentes);
    }
  })

  // activar y desactivar filtro de duplicado
  document.querySelector('#toggle').addEventListener('click', ()=>{
    if(localStorage.getItem("filtrarDuplicados") === "0"){
      localStorage.setItem("filtrarDuplicados", '1');
    }else{
      localStorage.setItem("filtrarDuplicados", '0');
    }
  })
  
  //activar y descativar filtro chances extra, y activar y desactivar parametro
  document.querySelector('#toggle2').addEventListener('click', ()=>{
    if(localStorage.getItem("chancesExtra") === "0"){
      localStorage.setItem("chancesExtra", '1');
      parametro.disabled = false
      parametro.focus()
    }else{
      localStorage.setItem("chancesExtra", '0');
      document.querySelector('#parameTexarea').disabled = true
    }
  })
  // ir guardando en el localStorage el valor del parametro mediante evento del input
  parametro.addEventListener('input',()=>{
    localStorage.setItem('parametro',parametro.value)
  })
}


//Parametros de ganador y suplentes. Si ganador es menor a 2 no se puede aumentar el suplente (FINALIZADO)

//Si parametro chances extra es true se activa parametro sino no (FINALIZADO)

//Que aparezca los resultados arriba del confeti (FINALIZADO)

//Aumentar los numeros en los parametros de ganador y suplente (FINALIZADO)


// FALTA POR HACER
// SPINNER - Listo
// FILTRE DUPLICADOS (FUNCIONABILIDAD)
// CHANCES EXTRA (FUNCIONABILIDAD)
//FUNCIÓN DE ELEGIR LA CANTIDAD DE GANADORES/SUPLENTES SELECCIONADOS