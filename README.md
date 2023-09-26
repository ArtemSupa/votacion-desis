# votacion-desis
Prueba tecnica para empresa Desis
VERSION DE PHP 7.3.33
VERSION DE MYSQL 5.7.36


Este desarrollo se ejecuto bajo el servidor Local WampServer, las siguientes instrucciones aplican tanto para Wamp como para Xampp en Windows

Paso 1: Descargar e instalar WAMP

Ve al sitio web oficial de WampServer: https://www.wampserver.com/.
Descarga la versión más reciente de WampServer compatible con tu sistema operativo (generalmente, Windows de 32 o 64 bits).
Ejecuta el instalador descargado y sigue las instrucciones de instalación. Durante la instalación, se te pedirá que elijas un directorio de instalación; el directorio predeterminado suele ser adecuado.

Paso 2: Iniciar WAMPP 
Una vez que la instalación esté completa, ejecuta WampServer desde el acceso directo en tu escritorio o desde el menú de inicio. 
Verás un icono de WAMP en la bandeja del sistema (junto al reloj) que debe estar verde una vez que WAMP esté funcionando correctamente.

Paso 3: Configurar Mysql
Haz clic en el icono de WAMP en la bandeja del sistema y selecciona "phpMyAdmin" en el menú. Esto abrirá la interfaz de administración de MySQL en tu navegador web.
Para crear la base de datos, se disponibiliza un archivo de creacion de la base de datos(En la carpeta SQL/script_creacion_db.sql), 
la cual se puede subir tanto en phpMyAdmin como en su gestor de Mysql favorito.
Despues de crear la bd con sus respectivas tablas, se ejecuta el archivo de poblado de tablas de dominio (En la carpeta SQL/script_poblado_tablas.sql).

Paso 4: Configuracion de proyecto PHP
Clonar el repositorio en el escritorio y directamente en la carpeta de web de WAMPP la cual es 'C:/wamp64/www' o 'C:/wampp/wwww'.
Si se clono en el escritorio u otra carpeta, mover a la ruta antes mencionada.
Tambien puede crear un host virtual en la ruta que mas desea.

Paso 5: Configurar la base de datos en el proyecto
Una vez clonada o movida la carpeta del proyecto, hay que configurar los datos de la base de datos local para que el proyecto se pueda conectar.
Este archivo se encuentra en la carpeta DB/config, donde se deben ingresar los datos de host,usuario,password, etc.

Paso 6: Acceder al proyecto
Abre tu navegador de preferencia y debes dirigirte a la siguiente url: 'http://localhost/votacion-desis' o 'http://127.0.0.1/votacion-desis'.
Este abrira el archivo index.html la cual contiene el proyecto

Saludos!!

*********** Los archivos de la carpeta SQL son los siguientes:
	* script_creacion_db.sql (Creacion de bd y tablas)
	* script_poblado_tablas.sql (Poblado de datos de la tabla Region, Comuna y Candidato)
	* MER.mwb (Modelo Entidad Relacion creada en Mysql Workbench)
	* Diagrama_MER.pdf (Diagrama del modelo de BD)

Kevin Luis Moreno Cuevas.
