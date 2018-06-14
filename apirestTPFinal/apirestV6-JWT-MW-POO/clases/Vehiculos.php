<?php
class Vehiculos
{
	public $id;
    public $marca;
 	public $patente;
  	public $modelo;
    public $foto;
    public $estado;
    
    public static function TraerTodosLosVehiculos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from vehiculos");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Vehiculos");		
    }
    public function InsertarVehiculoParametros()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into vehiculos(id, modelo,marca,patente,foto,estado)
        values(null,:modelo,:marca,:patente,:foto,1)");
        $consulta->bindValue(':modelo',$this->modelo);
        $consulta->bindValue(':marca',$this->marca);
        $consulta->bindValue(':patente',$this->patente);
        $consulta->bindValue(':foto', $this->foto);
        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>