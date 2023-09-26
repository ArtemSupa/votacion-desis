$("document").ready(function(){
    //Al cargar la pagina principal, se cargan las dos primeras funciones
    //Estas funciones, llenan los datos de los dos Select del formulario (Region y candidato)
    //No se carga el Select de comunas porque este depende de el Select de la region.
    cargarSelectRegion()
    cargarSelectCandidato()
})

function cargarSelectRegion(){
    //Se obtiene el id del select en HTML y se guarda en la variable SelectRegion
    var selectRegion = document.getElementById("selectregion");

    //Se crea una variable de datos con la accion a ejecutar en el controlador del backend (php)
    var datos = {'action':'selectRegion'};

    //Se genera la peticion hacia el backend por medio de Ajax y Jquery
    $.ajax({
        url: 'controlador/controlador.php',
        type: "POST",
        data:datos,
        success: function(data){
            //Se obtienen los datos del backend y se genera una etiqueta Option la cual se agregara al Selector
            // que obtuvimos antes en la variable SelectRegion
            for(var i in data){

                var option = document.createElement("option");
                option.text = data[i]["Nombre"];
                option.value = data[i]["IdRegion"];
                selectRegion.add(option);

            }

        },
        error: function(resp){
            console.log(resp);
        }


    });
}

function cargarSelectComuna(sel){

    // Se obtiene el id del select en HTML y se guarda en la variable selectcomuna
    var selectComuna = document.getElementById("selectcomuna");

    // Se remueven todas las opciones del Selector para limpiar los datos
    $('#selectcomuna option').remove();

    // Se crea una variable de datos con la accion a ejecutar en el controlador del backend (php)
    // Y se envia la id de la region para obtener las comunas que estan asociadas a la region
    var datos = {'action':'selectComuna','idregion':sel.value}

    //Se genera la peticion hacia el backend por medio de Ajax y Jquery
    $.ajax({
        url: 'controlador/controlador.php',
        type: "POST",
        data:datos,
        success: function(data){
            //Se obtienen los datos del backend y se genera una etiqueta Option la cual se agregara al Selector
            // que obtuvimos antes en la variable selectcomuna

            for(var i in data){

                var option = document.createElement("option");
                option.text = data[i]["Nombre"];
                option.value = data[i]["IdComuna"];
                selectComuna.add(option);

            }


        },
        error: function(resp){
            console.log(resp);
        }


    });
}

function cargarSelectCandidato(){

    // Se obtiene el id del select en HTML y se guarda en la variable selectcandidato
    var selectCandidato = document.getElementById("selectcandidato");

    // Se crea una variable de datos con la accion a ejecutar en el controlador del backend (php)
    var datos = {'action':'selectCandidato'}

    $.ajax({
        url: 'controlador/controlador.php',
        type: "POST",
        data:datos,
        success: function(data){
            
            // Se obtienen los datos del backend y se genera una etiqueta Option la cual se agregara al Selector
            // que obtuvimos antes en la variable selectcomuna

            for(var i in data){

                var option = document.createElement("option");
                option.text = data[i]["Nombre"];
                option.value = data[i]["IdCandidato"];
                selectCandidato.add(option);

            }


        },
        error: function(resp){
            console.log(resp);
        }


    });
}

function guardarVoto(){

    // Se obtienen los valores de los input en html con su respectivo id con Jquery y se guardan en sus variables
    const nombre = $('#inputnombre').val();
    const alias = $('#inputalias').val();
    const rut = $('#inputrut').val();
    const email = $('#inputemail').val();


    // se validan que cada uno de estos campos de textos no esten vacias, si lo esta, se envia un mensaje de alerta
    // y se acaba la ejecucion de codigo
    if(nombre == ''){return alert('El campo nombre y apellido no puede estar en blanco')}
    if(alias == ''){return alert('El campo alias no puede estar en blanco')}
    if(rut == ''){return alert('El campo rut no puede estar en blanco')}
    if(email == ''){return alert('El campo email no puede estar en blanco')}

    // se valida que el campo alias sea mayor a 5 caracteres
    if(alias.length <5){return alert('Alias: La cantidad de caracteres debe ser mayor a 5')}

    // se valida que el campo alias contenga letras y numeros
    if(validarletrasynum(alias) == false){return alert('Alias: El campo debe contener numeros y letras')}

    // inicializamos una variable vacia la cual contendra las opciones de los checkbox en html
    let valoresCheck = [];

    // se recorren todos los input de tipo checkox que esten tickeados para guardarlos en la variable valoresCheck
    $("input[type=checkbox]:checked").each(function(){
        valoresCheck.push(this.value);
    });

    // se valida el formato de correo
    if(validaEmail() == false){return alert('El formato de correo no es el correcto')};

    // se valida el rut
    if(ejecutarValidacion() == false){ return alert('Rut no valido')};


    // se validan los campos seleccionables en el formulario
    if ($('#selectregion').val().trim() === 'Seleccione....') {
       return alert('Debe seleccionar una región');
    }

    if ($('#selectcomuna').val().trim() === 'Seleccione....') {
        return alert('Debe seleccionar una comuna');
    }

    if ($('#selectcandidato').val().trim() === 'Seleccione....') {
        return alert('Debe seleccionar un candidato');
    }


    // se valida que la cantidad de check "Como se entero de nosotros" no sea menor a 2
    if(valoresCheck.length < 2){return alert('Como se enteró de nosotros: Se deben elegir minimo dos opciones')}

    //se obtienen los valores de los selectores
    const region = $('#selectregion').val();
    const comuna = $('#selectcomuna').val();
    const candidato = $('#selectcandidato').val();

    // se crea el objeto data para enviar la informacion al modelo que guardara el voto en la base de datos
    var data = {'nombre':nombre,'alias':alias,'rut':rut,'email':email,'region':region,'comuna':comuna,'candidato':candidato,'comoseentero':valoresCheck}

    // funcion que genera la peticion al backend para guardar el registro del voto
    guardarVotacion(data);



}


// Esta función toma un argumento llamado "mensaje", que es la cadena de texto que se va a validar.
function validarletrasynum(mensaje){
    // Se define una expresión regular llamada "ExpRegSoloNumeros" que busca coincidencias
    // con una cadena que contenga solo números del 0 al 9.
    var ExpRegSoloNumeros = "^[0-9]+$";

    // Se define otra expresión regular llamada "ExpRegSoloLetras" que busca coincidencias
    // con una cadena que contenga solo letras, incluyendo letras acentuadas (ñ, Ñ, á, é, í, ó, ú, Á, É, Í, Ó, Ú).
    var ExpRegSoloLetras = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

    // La siguiente condición verifica si el "mensaje" coincide con alguna de las dos expresiones regulares.
    // Si el mensaje contiene solo números o solo letras (sin caracteres especiales ni espacios),
    // entonces la función retorna "false" para indicar que la validación no ha pasado.
    if (mensaje.match(ExpRegSoloNumeros) != null || mensaje.match(ExpRegSoloLetras) != null) {
        return false;
    }
}



// La siguiente línea agrega un evento 'input' al documento que escucha cambios en cualquier elemento.
document.addEventListener('input', (e) => {
    // Obtiene una referencia al elemento del documento con el ID 'inputrut'.
    const rut = document.getElementById('inputrut');

    // Comprueba si el evento 'input' proviene del elemento con el ID 'inputrut'.
    if (e.target === rut) {
        // Llama a la función 'darFormatoRUT' para formatear el valor del elemento 'rut'.
        // Luego, actualiza el valor del elemento 'rut' con el valor formateado.
        let rutFormateado = darFormatoRUT(rut.value);
        rut.value = rutFormateado;

        // Llama a la función 'ejecutarValidacion' después de formatear el valor.
        ejecutarValidacion();
    }
});



function darFormatoRUT(rut) {
    // Elimina todos los caracteres que no sean números ni la letra 'k' (o 'K').
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');

    // Aísla el cuerpo del RUT (sin el dígito verificador) y el dígito verificador.
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase(); // Convierte el dígito verificador a mayúscula.

    // Si el RUT limpio tiene menos de 2 caracteres, se devuelve tal cual.
    if (rutLimpio.length < 2) return rutLimpio;

    // Se agrega un separador de miles al cuerpo del RUT.
    let cuerpoFormatoMiles = cuerpo
        .toString()
        .split('')
        .reverse()
        .join('')
        .replace(/(?=\d*\.?)(\d{3})/g, '$1.');

    // Se revierte nuevamente el cuerpo del RUT después de agregar los separadores de miles
    // y se elimina cualquier punto de separación al principio.
    cuerpoFormatoMiles = cuerpoFormatoMiles
        .split('')
        .reverse()
        .join('')
        .replace(/^[\.]/, '');

    // Se retorna el RUT formateado en el formato "cuerpoFormatoMiles-dv".
    return `${cuerpoFormatoMiles}-${dv}`;
}




function ejecutarValidacion() {
    // Obtiene el valor del elemento de entrada con el ID 'inputrut'.
    const rut = document.getElementById('inputrut').value;

    // Llama a la función 'validarRUT' para validar el RUT y obtiene el resultado.
    const resultado = validarRUT(rut);

    // Obtiene una referencia al elemento con la constante 'salida' para mostrar el resultado.
    const salida = document.querySelector('.salida');

    // Comienza a evaluar diferentes casos.

    // Si no se ha ingresado un RUT, muestra un mensaje de error en rojo.
    if (!rut) {
        salida.innerHTML = `<p style="color: red;">Debes ingresar un RUT</p>`;
        return false; // Retorna 'false' indicando que la validación falló.
    }
    // Si el resultado de la validación es verdadero, muestra un mensaje de éxito en verde.
    else if (resultado === true) {
        salida.innerHTML = `<p style="color: darkgreen;">El RUT ${rut} es válido</p>`;
        return true; // Retorna 'true' indicando que la validación fue exitosa.
    }
    // Si el resultado de la validación es falso, muestra un mensaje de error en rojo.
    else {
        salida.innerHTML = `<p style="color: red;">El RUT ${rut} no es válido</p>`;
        return false; // Retorna 'false' indicando que la validación falló.
    }
}


function validarRUT(rut) {
    // dejar solo números y letras 'k'
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');

    // verificar que ingrese al menos 2 caracteres válidos
    if (rutLimpio.length < 2) return false;

    // asilar el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    // validar que el cuerpo sea numérico
    if (!cuerpo.replace(/[^0-9]/g, '')) return false;

    // calcular el DV asociado al cuerpo del RUT
    const dvCalculado = calcularDV(cuerpo);

    // comparar el DV del RUT recibido con el DV calculado
    return dvCalculado == dv;
}

function calcularDV(cuerpoRUT) {
    let suma = 1;
    let multiplo = 0;

    // Este bucle itera a través de los dígitos del cuerpo del RUT de derecha a izquierda.
    for (; cuerpoRUT; cuerpoRUT = Math.floor(cuerpoRUT / 10)) {
        // Calcula la suma acumulativa de los dígitos multiplicados por factores específicos.
        suma = (suma + (cuerpoRUT % 10) * (9 - (multiplo++ % 6))) % 11;
    }

    // Si la suma es diferente de cero, calcula el dígito verificador restando 1.
    // Si la suma es igual a cero, el dígito verificador es 'K'.
    return suma ? suma - 1 : 'K';
}



function validaEmail() {
    // Obtiene una referencia al elemento de entrada con el ID 'inputemail'.
    var emailField = document.getElementById('inputemail');

    // Define una expresión regular llamada 'validEmail' que representa un patrón de correo electrónico válido.
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Comprueba si el valor en el campo de entrada no coincide con el patrón de correo electrónico válido.
    if (!validEmail.test(emailField.value)) {
        return false; // Retorna 'false' para indicar que la validación falló.
    }
}




function guardarVotacion(data) {
    // Se crea un objeto de datos que contiene una acción y los datos a enviar.
    var data = {'action':'guardarVoto','data':data};

    // Se realiza una solicitud AJAX al servidor.
    $.ajax({
        url: 'controlador/controlador.php', // La URL del archivo PHP en el servidor.
        type: "POST", // Se utiliza el método POST para enviar datos.
        data: data, // Los datos que se envían al servidor.
        success: function(datas) {
            // Si la solicitud AJAX tiene éxito, se muestra una alerta con un mensaje
            // y se recarga la página actual.
            alert('El voto fue guardado exitosamente!');
            window.location.reload();
        },
        error: function(resp) {
            // Si la solicitud AJAX falla, se muestra una alerta con un mensaje de error.
            alert('Rut ya existe en nuestros registros');
        }
    });
}







