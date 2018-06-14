<?php
class Usuario
{
	public $Usuario;
    public $legajo;
 	public $nombre;
  	public $apellido;
    public $tipo;
    public $contrasenia;
    public $fechaDeNacimiento;
    public $foto;
    public $habilitado;
    public $sexo;

	public static function TraerTodoLosUsuarios()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }
    public static function TraerTodosLosRemiseros()
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios Where tipo=3");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }
    public static function TraerUnUsuario($usuario,$pass)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios
			Where usuario = :usuario AND contrasenia = :pass");
			$consulta->bindParam(':usuario',$usuario);
			$consulta->bindParam(':pass',$pass);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
	}
    public function InsertarUsuarioParametros()
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Usuarios(Legajo,Nombre,Apellido,Usuario,sexo,contrasenia,tipo,fechadeNacimiento,foto,habilitado)
               values(null,:nombre,:apellido,:usuario,:sexo,:contrasenia,:tipo,:fechaDeNacimiento,:foto,:habilitado)");
               $consulta->bindValue(':nombre',$this->nombre);
               $consulta->bindValue(':apellido',$this->apellido);
               $consulta->bindValue(':usuario',$this->Usuario);
               $consulta->bindValue(':tipo', $this->tipo);
               $consulta->bindValue(':fechaDeNacimiento',$this->fechaDeNacimiento);
               $consulta->bindValue(':foto',$this->foto);
               $consulta->bindValue(':contrasenia',$this->contrasenia);
               $consulta->bindValue(':sexo',$this->sexo);
               $consulta->bindValue(':habilitado',$this->habilitado);
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>