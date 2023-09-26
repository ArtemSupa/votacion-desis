<?php
// Se requiere el archivo "conexion.php" que contiene la clase de conexión.
require_once "../DB/conexion.php";

// Función para obtener las comunas de una región específica.
function obtenerComunas($idregion){
    $idregion = strval($idregion);
    $conexion = new conexion(); // Se crea una instancia de la clase de conexión.
    $query = "select IdComuna,Nombre from comuna where idregion =" . $idregion . " order by Nombre asc";
    $resultado = $conexion->conectar()->query($query);
    $resultadoArray = array();
    foreach ($resultado as $clave) {
        $resultadoArray[] = $clave;
    }

    return convertirUTF8($resultadoArray);
}

// Función para obtener las regiones.
function obtenerRegiones(){
    $conexion = new conexion();
    $query = "select IdRegion,Nombre from region";
    $resultado = $conexion->conectar()->query($query);
    $resultadoArray = array();
    foreach ($resultado as $clave) {
        $resultadoArray[] = $clave;
    }

    return convertirUTF8($resultadoArray);
}

// Función para obtener los candidatos.
function obtenerCandidatos(){
    $conexion = new conexion();
    $query = "select IdCandidato,Nombre from candidato";
    $resultado = $conexion->conectar()->query($query);
    $resultadoArray = array();
    foreach ($resultado as $clave) {
        $resultadoArray[] = $clave;
    }

    return convertirUTF8($resultadoArray);
}

// Función para convertir elementos del array a UTF-8.
function convertirUTF8($array){
    array_walk_recursive($array,function (&$item,$key){
        if(!mb_detect_encoding($item,'utf-8',true)){
            $item = utf8_encode($item);
        }
    });
    header('Content-type: application/json');
    return json_encode($array);
}

// Función para guardar un voto en la base de datos.
function guardarVoto($data){
    // Se obtienen los datos necesarios del array "$data".
    $nombre = $data['nombre'];
    $alias = $data['alias'];
    $rut = $data['rut'];
    $email = $data['email'];
    $comuna = $data['comuna'];
    $candidato = $data['candidato'];
    $comoseentero = $data['comoseentero'];

    // Se verifica si el RUT ya existe en la base de datos.
    $existe = validarRutExistente($rut);
    if($existe == 1){
        header('Content-type: application/json');
        $resultados = array();
        $resultados[] = 'error';
        return json_encode($resultados);
    }

    // Se guarda el registro de la votacion con los datos que vienen desde el formulario
    $conexion = new conexion();
    $query = "insert into votacion values ('".$rut."','".$nombre."','".$alias."','".$email."','".$candidato."','".$comuna."')";
    $conexion->conectar()->query($query);
    $conexion->conectar()->affected_rows;

    //Como el requerimiento de el campo "Como se entero de nosotros" es que pueda tener mas de uno
    //se guarda en la base de datos los registros correspondientes asociados al rut en una funcion aparte
    guardarComoSeEntero($comoseentero,$rut);
}

// Función para guardar cómo se enteró una persona.
function guardarComoSeEntero($arreglo,$rut){
    foreach ($arreglo as $clave){
        $conexion = new conexion();
        $query = "insert into mediodeinformacion (nombre, rut) values ('".$clave."','".$rut."')";
        $conexion->conectar()->query($query);
        $conexion->conectar()->affected_rows;
    }
}

// Función para validar si un RUT ya existe en la base de datos.
function validarRutExistente($rut){
    $conexion = new conexion();
    $query = "select count(*) as resultado from votacion where rut ='".$rut."'";
    $resultado = $conexion->conectar()->query($query);
    $resultadoArray = array();
    foreach ($resultado as $valor){
        $resultadoArray = $valor;
    }

    return $resultadoArray['resultado'];
}
?>
