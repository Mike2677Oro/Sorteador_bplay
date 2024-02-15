function contarParticipantes() {
    // Obtener el contenido del Text Area y dividirlo por líneas
    var participantsTextArea = document.getElementById('participants');
    var participants = participantsTextArea.value.split('\n');

    // Filtrar líneas vacías para evitar contar líneas en blanco
    participants = participants.filter(function(participant) {
      return participant.trim() !== '';
    });

    // Mostrar el total de participantes
    var totalParticipantsSpan = document.getElementById('totalParticipants');
    totalParticipantsSpan.textContent = participants.length;
  }

  function agregarParticipante(event) {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.key === 'Enter') {
      // Obtener el contenido del Text Area y el total de participantes
      var participantsTextArea = document.getElementById('participants');
      var totalParticipantsSpan = document.getElementById('totalParticipants');

      // Agregar el nuevo participante a la lista
      participantsTextArea.value += '\n';
      
      // Contar y mostrar el total de participantes
      contarParticipantes();

      // Evitar el salto de línea automático en el Text Area
      event.preventDefault();
    }
  }

  function resetearParticipantes() {
    // Obtener el Text Area y el total de participantes
    var participantsTextArea = document.getElementById('participants');
    var totalParticipantsSpan = document.getElementById('totalParticipants');

    // Restablecer el contenido del Text Area y el total de participantes
    participantsTextArea.value = '';
    totalParticipantsSpan.textContent = '0';
  }

  // Agregamos la función para guardar datos en localStorage
function guardarDatosPaso1() {
  localStorage.setItem('tituloSorteo', document.getElementById('inputTitulo').value);
  localStorage.setItem('participantes', document.getElementById('participants').value);
  // Puedes agregar más datos si es necesario
}

// Modificamos el evento del botón para incluir la función de guardarDatosPaso1
document.getElementById('buttonComenzar').addEventListener('click', function() {
  guardarDatosPaso1();
  window.location.href = 'C:\Users\maikol.oropeza\Desktop\Sorteadorbplay2024\pages\parameters.html'; // Cambia la ruta según sea necesario
});

// Recuperamos datos almacenados en localStorage
document.getElementById('winnersnmber').value = localStorage.getItem('cantidadGanadores') || 1;
document.getElementById('subwinnersNmber').value = localStorage.getItem('cantidadSuplentes') || 0;
// Puedes agregar más líneas para recuperar otros datos si es necesario

// Modificamos el evento del botón para incluir la función de guardarDatosPaso2
document.getElementById('buttonSortear').addEventListener('click', function() {
    // Guardamos datos del Paso 2 (si es necesario)
    localStorage.setItem('cantidadGanadores', document.getElementById('winnersnmber').value);
    localStorage.setItem('cantidadSuplentes', document.getElementById('subwinnersNmber').value);

    // Redireccionamos o realizamos la acción necesaria
    // window.location.href = ...; // Cambia la ruta según sea necesario
});

  function importarArchivo(event) {
    var fileInput = event.target;
    var file = fileInput.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var contenido = e.target.result;

        // Verificar el tipo de archivo
        if (file.name.endsWith('.txt')) {
          // Procesar como archivo TXT
          procesarArchivoTXT(contenido);
        } else if (file.name.endsWith('.csv')) {
          // Procesar como archivo CSV
          procesarArchivoCSV(contenido);
        } else {
          alert('Formato de archivo no admitido. Solo se admiten archivos .txt y .csv.');
        }
      };

      reader.readAsText(file);
    }
  }

  function procesarArchivoTXT(contenido) {
    var participantsTextArea = document.getElementById('participants');
    participantsTextArea.value = contenido;
    contarParticipantes();
  }

  function procesarArchivoCSV(contenido) {
    var participantsTextArea = document.getElementById('participants');
    var lines = contenido.split('\n');

    // Limpiar el área de participantes antes de cargar el archivo CSV
    participantsTextArea.value = '';

    // Agregar cada línea del archivo CSV al área de participantes
    for (var i = 0; i < lines.length; i++) {
      participantsTextArea.value += lines[i] + '\n';
    }

    contarParticipantes();
  }

  