<?php
require_once 'Vehiculos.php';
class VehiculoApi extends Vehiculos 
{
    public function TraerTodos($request, $response, $args) {
        $todosLosVehiculos=Vehiculos::TraerTodosLosVehiculos();
        $newresponse = $response->withJson($todosLosVehiculos, 200);  
        return $newresponse;
    }
    public function CargarUno($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $marca = $ArrayDeParametros["marca"];
       $patente = $ArrayDeParametros["patente"];
       $modelo = $ArrayDeParametros['modelo'];
       
       $destino="../../Remiseria/src/assets/vehiculos/";
       //$destino="../../assets/vehiculos/";
       $archivos = $request->getUploadedFiles();
       $nombreAnterior=$archivos['foto']->getClientFilename();
       $extension= explode(".", $nombreAnterior);
       $extension=array_reverse($extension);
       $nombre = $patente.'.'.$extension[0];
       $archivos['foto']->moveTo($destino.$nombre);

       $miVehiculo = new Vehiculos();
       $miVehiculo->marca=$marca;
       $miVehiculo->patente=$patente;
       $miVehiculo->modelo=$modelo;
       $miVehiculo->foto = $nombre;
       
       $miVehiculo->InsertarVehiculoParametros();
       $objDelaRespuesta->respuesta="Se guardo el vehiculo exitosamente.";
       //$objDelaRespuesta->respuesta=$extension;
       return $response->withJson($objDelaRespuesta, 200);
   }
   
}
?>