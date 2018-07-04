<?php
class Viajes
{
    public $id;
    public $latDesde;
 	public $lngDesde;
  	public $latHasta;
    public $lngHasta;
    public $vehiculo;
    public $remisero;
    public $cliente;
    public $estado;
    public $comodidad;
    public $medioPago;
    public $duracion;
    public $distancia;
    public $precio;
    public $cantidad;
    public $horario;

    public function InsertarViajeParametros(){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into viajes(id,legajoCliente,latDesde,latHasta,lngDesde,lngHasta,duracion,
         distancia,cantidadPasajeros,comodidad,precio,medioDePago,legajoRemisero,idVehiculo,estado,horario)
        values(null,:legajoCliente,:latDesde,:latHasta,:lngDesde,:lngHasta,:duracion,
         :distancia,:cantidadPasajeros,:comodidad,:precio,:medioDePago,0,0,1,:horario)");
        $consulta->bindValue(':legajoCliente',$this->cliente);
        $consulta->bindValue(':latDesde',$this->latDesde);
        $consulta->bindValue(':latHasta',$this->latHasta);
        $consulta->bindValue(':lngDesde', $this->lngDesde);
        $consulta->bindValue(':lngHasta',$this->lngHasta);
        $consulta->bindValue(':duracion',$this->duracion);
        $consulta->bindValue(':distancia',$this->distancia);
        $consulta->bindValue(':cantidadPasajeros',$this->cantidad);
        $consulta->bindValue(':comodidad',$this->comodidad);
        $consulta->bindValue(':precio',$this->precio);
        $consulta->bindValue(':medioDePago',$this->medioPago);
        $consulta->bindValue(':horario',$this->horario);
        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
    public static function todosLosViajesCliente($legajo)
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *
            FROM viajes  
            WHERE legajoCliente = '$legajo'");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    public static function todosLosViajesRemisero($legajo)
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *
            FROM viajes  
            WHERE legajoRemisero = '$legajo'");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    public static function todosLosViajes()
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *
            FROM viajes  
            WHERE 1");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    
}
?>