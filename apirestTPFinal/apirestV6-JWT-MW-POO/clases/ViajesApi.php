<?php
require_once 'Viajes.php';
class ViajesApi extends Viajes
{
    public function TraerViajesRemisero($request, $response, $args) {
        $ArrayDeParametros = $request->getParsedBody();
        $cliente = $ArrayDeParametros['cliente'];
        $todosLosViajes=Viajes::todosLosViajesRemisero($cliente);
        $newresponse = $response->withJson($todosLosViajes, 200);  
        return $newresponse;
    }
    public function TraerViajes($request, $response, $args) {
        $todosLosViajes=Viajes::todosLosViajes();
        $newresponse = $response->withJson($todosLosViajes, 200);  
        return $newresponse;
    }
    public function CargarViaje($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $latDesde = $ArrayDeParametros["latDesde"];
       $lngDesde = $ArrayDeParametros['lngDesde'];
       $latHasta = $ArrayDeParametros['latHasta'];
       $lngHasta = $ArrayDeParametros['lngHasta'];
       $cliente = $ArrayDeParametros['cliente'];
       $comodidad = $ArrayDeParametros['comodidad'];
       $medioPago = $ArrayDeParametros['medioPago'];
       $duracion = $ArrayDeParametros['duracion'];
       $distancia = $ArrayDeParametros['distancia'];
       $precio = $ArrayDeParametros['precio'];
       $cantidad = $ArrayDeParametros['cantidad'];
       $horario = $ArrayDeParametros['horario'];

       $miViaje = new Viajes();
       $miViaje->latDesde=$latDesde;
       $miViaje->lngDesde=$lngDesde;
       $miViaje->latHasta=$latHasta;
       $miViaje->lngHasta=$lngHasta;
       $miViaje->cliente=$cliente;
       $miViaje->comodidad = $comodidad;
       $miViaje->medioPago=$medioPago;
       $miViaje->duracion = $duracion;
       $miViaje->distancia = $distancia;
       $miViaje->precio = $precio;
       $miViaje->cantidad = $cantidad;
       $miViaje->horario = $horario;
       
       $lastId =  $miViaje->InsertarViajeParametros();

       $objDelaRespuesta->respuesta=$lastId;
       //$objDelaRespuesta->respuesta=$miUsuario;
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function ActualizarViaje($request, $response, $args) {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $id = $ArrayDeParametros["id"];
        $latDesde = $ArrayDeParametros["latDesde"];
        $lngDesde = $ArrayDeParametros['lngDesde'];
        $latHasta = $ArrayDeParametros['latHasta'];
        $lngHasta = $ArrayDeParametros['lngHasta'];
        $comodidad = $ArrayDeParametros['comodidad'];
        $medioPago = $ArrayDeParametros['medioPago'];
        $duracion = $ArrayDeParametros['duracion'];
        $distancia = $ArrayDeParametros['distancia'];
        $precio = $ArrayDeParametros['precio'];
        $cantidad = $ArrayDeParametros['cantidad'];
        $horario = $ArrayDeParametros['horario'];
        $estado = $ArrayDeParametros['estado'];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE viajes 
        SET latDesde=:latDesde,
            lngDesde=:lngDesde,
            latHasta=:latHasta,
            lngHasta=:lngHasta,
            comodidad=:comodidad,
            medioDePago=:medioPago,
            duracion=:duracion,
            distancia=:distancia,
            precio=:precio,
            cantidadPasajeros=:cantidad,
            horario=:horario,
            estado=:estado
            WHERE id = :id");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':latDesde',$latDesde);
        $consulta->bindValue(':lngDesde', $lngDesde);
        $consulta->bindValue(':latHasta', $latHasta);
        $consulta->bindValue(':lngHasta',$lngHasta);
        $consulta->bindValue(':comodidad', $comodidad);
        $consulta->bindValue(':medioPago', $medioPago);
        $consulta->bindValue(':duracion',$duracion);
        $consulta->bindValue(':distancia', $distancia);
        $consulta->bindValue(':precio', $precio);
        $consulta->bindValue(':cantidad',$cantidad);
        $consulta->bindValue(':horario', $horario);
        $consulta->bindValue(':estado', $estado);
        $consulta->execute();	

        $objDelaRespuesta->respuesta="viaje actualizado correctamente";
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function ActualizarViaje2($request, $response, $args) {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $id = $ArrayDeParametros["id"];
        $remisero = $ArrayDeParametros["remisero"];
        $vehiculo = $ArrayDeParametros['vehiculo'];
        $estado = $ArrayDeParametros['estado'];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE viajes 
        SET legajoRemisero='$remisero',
            idVehiculo='$vehiculo',
            estado=:estado
            WHERE id = :id");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':estado', $estado);
        $consulta->execute();	

        $objDelaRespuesta->respuesta="viaje asignado correctamente";
       return $response->withJson($objDelaRespuesta, 200);
   }
}
?>