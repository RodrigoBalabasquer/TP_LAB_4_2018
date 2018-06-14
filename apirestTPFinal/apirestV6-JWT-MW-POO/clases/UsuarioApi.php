<?php
require_once 'Usuario.php';
class UsuarioApi extends Usuario 
{
    public function TraerTodos($request, $response, $args) {
        $todosLasMascotas=Usuario::TraerTodosLosRemiseros();
        $newresponse = $response->withJson($todosLasMascotas, 200);  
        return $newresponse;
    }
    public function CargarUno($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $nombre = $ArrayDeParametros["nombre"];
       $apellido = $ArrayDeParametros["apellido"];
       $tipo = $ArrayDeParametros['tipo'];
       $fechaDeNacimiento = $ArrayDeParametros['fechaDeNacimiento'];
       $foto = $ArrayDeParametros['foto'];
       $Usuario = $ArrayDeParametros['usuario'];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       $sexo = $ArrayDeParametros['sexo'];
       
       $miUsuario = new Usuario();
       $miUsuario->nombre=$nombre;
       $miUsuario->tipo=$tipo;
       $miUsuario->fechaDeNacimiento=$fechaDeNacimiento;
       $miUsuario->foto=$foto;
       $miUsuario->Usuario=$Usuario;
       $miUsuario->apellido = $apellido;
       $miUsuario->contrasenia=md5($contrasenia);
       $miUsuario->sexo = $sexo;
       $miUsuario->habilitado = true;
       $miUsuario->InsertarUsuarioParametros();

       $objDelaRespuesta->respuesta="Se guardo el usuario exitosamente.";
       //$objDelaRespuesta->respuesta=$miUsuario;
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function TraerUno($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $usuario= $ArrayDeParametros["usuario"];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       $pass = md5($contrasenia);
       $User = Usuario::TraerUnUsuario($usuario,$pass);
       //$User =Usuario::TraerTodoLosUsuarios();
       $newresponse = $response->withJson($User, 200);  
       return $newresponse;
    }
   public function CargarFoto($request, $response, $args)
   {    
        $objDelaRespuesta= new stdclass();
        $destino="./fotos/";
        
        $ArrayDeParametros = $request->getParsedBody();
        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['foto']->getClientFilename();
        $extension= explode(".", $nombreAnterior)  ;
        $extension=array_reverse($extension);

        $archivos['foto']->moveTo($destino.$nombreAnterior);
        
        //$objDelaRespuesta->respuesta=$destino.$nombreAnterior;
        $objDelaRespuesta->respuesta = $archivos;
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function CrearToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token= AutentificadorJWT::CrearToken($ArrayDeParametros); 
        $objDelaRespuesta->respuesta = $token;
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function VerificarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        try 
        {
            //$token="";
            AutentificadorJWT::verificarToken($token);
            $objDelaRespuesta->esValido=true;
            $objDelaRespuesta->respuesta = "Token valido";      
        }
        catch (Exception $e) {      
            //guardar en un log
            $objDelaRespuesta->respuesta=$e->getMessage();
            $objDelaRespuesta->esValido=false;     
        }
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function RecuperarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        $data = AutentificadorJWT::ObtenerData($token);
        $objDelaRespuesta->respuesta = $data;
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function DesabilitarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $legajo = $ArrayDeParametros["Legajo"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET habilitado=false WHERE Legajo = :legajo");
        $consulta->bindParam(':legajo',$legajo);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Empleado suspendido éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function HabilitarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $legajo = $ArrayDeParametros["Legajo"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET habilitado=true WHERE Legajo = :legajo");
        $consulta->bindParam(':legajo',$legajo);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Empleado reabilitado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
}
?>