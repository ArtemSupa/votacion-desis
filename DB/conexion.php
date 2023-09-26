<?php

class conexion {
    private $server;
    private $user;
    private $password;
    private $database;
    private $port;
    private $conexion;

    public function conectar(){
        // Se llama a la función obtenerDatosConexion para obtener la información de conexión desde un archivo "config".
        $listaDatos = $this->obtenerDatosConexion();
        foreach($listaDatos as $clave => $valor){
            $this->server = $valor["server"];
            $this->user = $valor["user"];
            $this->password = $valor["password"];
            $this->database = $valor["database"];
            $this->port = $valor["port"];
        }
        // Se crea una instancia de mysqli para establecer la conexión con la base de datos.
        $this->conexion = new mysqli($this->server,$this->user,$this->password,$this->database,$this->port);
        // Se verifica si la conexión se realizó con éxito.
        if($this->conexion->connect_errno){
            echo "Error al conectar con la base de datos: ".$this->database;
            die(); // Termina la ejecución del script en caso de error de conexión.
        }else{
            return $this->conexion; // Retorna la conexión establecida.
        }
    }

    private function obtenerDatosConexion(){
        $archivo = dirname(__FILE__);
        // Lee el contenido del archivo "config" que contiene la información de conexión en formato JSON.
        $dataJson = file_get_contents($archivo."/"."config");
        return json_decode($dataJson,true); // Decodifica el JSON en un array asociativo y lo retorna.
    }
}

// Se crea una instancia de la clase "conexion" para su posterior uso.
$conexion = new conexion;
?>
