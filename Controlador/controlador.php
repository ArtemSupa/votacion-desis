<?php
// Se requiere el archivo del modelo ("modelo.php") que contiene funciones relacionadas con la base de datos.
require_once "../Modelo/modelo.php";

// Se obtiene el valor de "action" desde la solicitud POST.
$resultado = $_POST['action'];

// Se verifica el valor de "action" y se realiza una acción correspondiente.

// Si "action" es "selectRegion", se llama a la función "obtenerRegiones" del modelo y se imprime el resultado.
if (strval($resultado) == "selectRegion") {
    print_r(obtenerRegiones());
}

// Si "action" es "selectComuna", se obtiene el ID de la región desde la solicitud POST.
// Luego, se llama a la función "obtenerComunas" del modelo con el ID de la región y se imprime el resultado.
if (strval($resultado) == "selectComuna") {
    $idregion = $_POST['idregion'];
    print_r(obtenerComunas($idregion));
}

// Si "action" es "selectCandidato", se llama a la función "obtenerCandidatos" del modelo y se imprime el resultado.
if (strval($resultado) == "selectCandidato") {
    print_r(obtenerCandidatos());
}

// Si "action" es "guardarVoto", se obtiene la variable "data" desde la solicitud POST.
// Luego, se llama a la función "guardarVoto" del modelo con los datos y se realiza la acción correspondiente.
if (strval($resultado) == "guardarVoto") {
    $data = $_POST['data'];
    guardarVoto($data);
}

?>
