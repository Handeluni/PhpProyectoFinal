/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$(function(){
  getCiudad();
  getTipo();
})

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

$(document).ready(function() {
    // Agregar evento de clic al botón "Mostrar Todos"
    $('#mostrarTodos').click(function() {
        // Realizar una solicitud para obtener todos los datos disponibles
        $.ajax({
            url: '../data-1.json', // Reemplaza 'ruta/al/archivo/data-1.json' con la ruta correcta a tu archivo JSON
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                // Mostrar los datos obtenidos en la interfaz de usuario
                mostrarResultados(data);
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los datos:', error);
            }
        });
    });

    // Función para mostrar los resultados en la interfaz de usuario
function mostrarResultados(data) {
  // Obtener el contenedor de contenido
  var contenido = $('.colContenido');

  // Limpiar el contenido actual de los resultados si es la primera vez
  if (contenido.children().length === 0) {
      // Agregar el título y el botón "Mostrar Todos" solo si el contenido está vacío
      contenido.append('<div class="tituloContenido card"><h5>Resultados de la búsqueda:</h5><div class="divider"></div><button type="button" name="todos" class="btn-flat waves-effect" id="mostrarTodos">Mostrar Todos</button></div>');
  }

  // Iterar sobre los datos y crear elementos HTML para mostrar cada registro
  $.each(data, function(index, property) {
      // Crear un elemento card para mostrar cada propiedad
      var propertyCard = $('<div class="card"></div>');

      // Agregar imagen a la card (aquí debes sustituir 'ruta/a/la/imagen.jpg' con la ruta correcta)
      var imgSrc = '../img/home.jpg'; // Reemplazar con la ruta correcta a la imagen
      var imageElement = $('<img src="' + imgSrc + '" class="property-image">');
      propertyCard.append(imageElement);

      // Agregar contenido de la propiedad a la card
      propertyCard.append('<div class="card-content"><span class="card-title">' + property.Direccion + '</span><p><strong>Ciudad:</strong> ' + property.Ciudad + '</p><p><strong>Teléfono:</strong> ' + property.Telefono + '</p><p><strong>Código Postal:</strong> ' + property.Codigo_Postal + '</p><p><strong>Tipo:</strong> ' + property.Tipo + '</p><p><strong>Precio:</strong> ' + property.Precio + '</p></div>');

      // Agregar la card al contenedor de contenido
      contenido.append(propertyCard);
  });
}




});

function getCiudad(){
  $.ajax({
    url:'./ciudad.php',
    type: 'GET',
    data:{},
    success:function(ListaCiudades){
      ListaCiudades = validarJson(ListaCiudades, 'Ciudad')
      $.each(ListaCiudades, function( index, value ) {
        $('#selectCiudad').append('<option value="'+value+'">'+value+'</option>')
      });
    }
  })
}
/*
  Funcion para el input select
*/
function getTipo(){
  $.ajax({
    url:'../tipo.php',
    type: 'GET',
    data:{},
    success:function(tipoList){
      tipoList = validarJson(tipoList, 'Tipo')
      $.each(tipoList, function( index, value ) {
        $('#selectTipo').append('<option value="'+value+'">'+value+'</option>')
      });
    },
  }).done(function(){
    $('select').material_select(); 
  })
}

function validarJson(validarJson, lista){
  try {
    var validarJson = JSON.parse(validarJson)
    return validarJson
  } catch (e) {
    obtnError('','SyntaxError '+lista);
    }
}
inicializarSlider();
playVideoOnScroll();
