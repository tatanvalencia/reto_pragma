Reto EVC

Enunciado:

La empresa CompuMundo almacena una hoja de cálculo por cada empleado llamada Ficha en formato xsl. Esta ficha contiene la información personal del empleado como su nombre, información de contacto, etc. La empresa almacena la ficha de tanto empleados como ex-empleados, siendo la diferencia que la ficha de los empleados activos es un recurso de acceso frecuente, mientras que la ficha de un ex-empleado rara vez se consulta.

Cuando un ex-empleado vuelve a la empresa, su ficha debe recuperarse y almacenarse como archivo de acceso frecuente. Así mismo, cuando un empleado sale de la empresa, su ficha se vuelve archivo de poca frecuencia. Compumundo desea almacenar estos archivos en nube basado en la frecuencia de acceso tratando de minimizar los costos. 

Subreto 2

Creación de lambda register-new-employee: recibe un json de entrada con id (cédula del empleado) y un archivo en base64. El archivo debe guardarse en active-employee-files con nombre del archivo la cédula.
Creación de lambda disable-employee: recibe un json de entrada con id (cédula del empleado). Obtiene el archivo desde active-employee-files y lo almacena en inactive-employee-files. Tras el proceso exitoso, elimina el archivo original de active-employee-files.
Creación de tabla en DynamoDb employee-restore-status con llave de partición id (string), un índice secundario global (GSI) con llave de partición status (string), y con TTL enabled.
Creación de lambda start-recover-employee: recibe un json de entrada con id (cédula del empleado). Le ordena a inactive-employee-files que inicie el proceso de restauración del archivo con nombre id. Posteriormente hace un registro en dynamo con el id y status “in progress”, además con tiempo de expiración (TTL) de 7 días.
Asegurarse de que todas las lambdas tengan permiso para registrar logs en cloudwatch. Cada lambda debe realizar la traza de eventos de entrada
