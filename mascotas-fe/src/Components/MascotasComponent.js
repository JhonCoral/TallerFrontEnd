//IMPORT
import React, { useEffect, useState } from "react";
import axios from "axios";
import { mostrarAlerta } from "../functions.js";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import Layout from "../layaout/index.js";

//CUERPO COMPONENTE
const MascotasComponent = () => {
  const url = "http://localhost:8000/mascotas";
  const [mascotas, setMascotas] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [estado, setEstado] = useState("");
  const [foto,setFoto]=useState("");
  const [cualidades,setCualidades]=useState("");
  const [detalles,setDetalles]=useState("");
  const [operacion, setOperacion] = useState("");
  const [titulo,setTitulo]=useState("");

  useEffect(() => {
    getMascotas();
  }, []);

  const getMascotas = async () => {
    const respuesta = await axios.get(`${url}/mostrar`);
    setMascotas(respuesta.data);
  };

  const openModal = (opcion,id,nombre,edad,raza,tipo,cualidades,detalles,foto,estado)=>{
    setId('');
    setNombre('');
    setTipo('');
    setRaza('');    
    setEdad('');
    setEstado('');
    setFoto('');
    setCualidades('');
    setDetalles('');
    setOperacion(opcion);
    if(opcion === 1){
        setTitulo("Registrar Mascota");
    }
    else if(opcion===2){
        setTitulo("Editar Mascota");
        setId(id);
        setNombre(nombre);
        setTipo(tipo);
        setRaza(raza);    
        setEdad(edad);
        setEstado(estado);
        setFoto(foto);
        setCualidades(cualidades);
        setDetalles(detalles);
    }
  };

  const validar = ()=>{
    
    let parametros;
    let metodo;
    if(nombre===''){
        console.log("Debe escribir un Nombre");
        mostrarAlerta("Debe escribir un Nombre");
    }
    else if(tipo===''){
      console.log("Debe colocar un tipo");
      mostrarAlerta("Debe colocar un tipo");
    }
    else if(raza===''){
      console.log("Debe colocar una raza");
      mostrarAlerta("Debe colocar una raza");
    }
    else if(edad===''){
        console.log("Debe escribir una Edad");
        mostrarAlerta("Debe escribir una Edad");
    }
    else if(estado===''){
      console.log("Debe colocar un estado");
      mostrarAlerta("Debe colocar una estado");
    }
    else if(foto===''){
      console.log("Debe colocar una foto");
      mostrarAlerta("Debe colocar una foto");
    }
    else if(cualidades===''){
      console.log("Debe colocar una cualidad");
      mostrarAlerta("Debe colocar una cualidad");
    }
    else if(detalles===''){
      console.log("Debe colocar un detalle");
      mostrarAlerta("Debe colocar un detalle");
    }

    else{
        if(operacion===1){
            parametros={
                urlExt: `${url}/crear`,
                nombre: nombre,
                tipo: tipo,
                raza: raza,
                edad: edad,
                estado: estado,
                foto: foto,
                cualidades: cualidades,
                detalles:detalles
            };
            metodo="POST";
        }
        else{
            parametros={
                urlExt: `${url}/actualizar/${id}`,
                nombre: nombre,
                tipo: tipo,
                raza: raza,
                edad: edad,
                estado: estado,
                foto: foto,
                cualidades: cualidades,
                detalles:detalles
            };
            metodo="PUT";
        }
        enviarSolicitud(metodo, parametros);
        
    }

  };


  const enviarSolicitud = async (metodo, parametros)=>{
    await axios({method: metodo, url: parametros.urlExt, data: parametros })
    .then((respuesta)=>{
        let tipo= respuesta.data.tipo;
        let mensaje = respuesta.data.mensaje;
        mostrarAlerta(mensaje,tipo);        
        if(tipo ==="success"){
            document.getElementById("btnCerrarModal").click();
            getMascotas();
        }
    })
    .catch((error)=>{
        mostrarAlerta(`Error en la solicitud`,error)
    });
  };
  
  const eliminarMascota=(id,nombre)=>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: `Estas seguro de eliminar la mascota ${nombre} ?`,
        icon: 'question',
        text: 'Se eliminará Definitivamente',
        showCancelButton: true, 
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result)=>{
        if(result.isConfirmed){
            setId(id);
            enviarSolicitud("DELETE",{urlExt: `${url}/eliminar/${id}`,id:id})
        }
        else{
            mostrarAlerta("No se elimino la mascota","info");
        }

    })

  }

  return (
    <Layout>
      <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button
               onClick={()=>openModal(1)}
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalMascotas"
              >
                <i className="fa-solid fa-circle-plus"></i>Añadir
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NOMBRE</th>
                    <th>TIPO</th>
                    <th>RAZA</th>
                    <th>EDAD</th>
                    <th>ESTADO</th>
                    <th>EDITAR</th>
                    <th>ELIMINAR</th>


                    

                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {mascotas.map((mascota, i) => (
                    <tr key={mascota.id}>
                      <td>{mascota.id}</td>
                      <td>{mascota.nombre}</td>
                      <td>{mascota.tipo}</td>
                      <td>{mascota.raza}</td>
                      <td>{mascota.edad}</td>
                      <td>{mascota.estado}</td>
                      

                      <td>
                        <button
                          onClick={()=>openModal(2,mascota.id,mascota.nombre,mascota.edad,mascota.raza,mascota.tipo,mascota.cualidades,mascota.detalles,mascota.foto,mascota.estado)}
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#modalMascotas"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                      </td>
                      <td>
                        <button
                            onClick={()=>eliminarMascota(mascota.id,mascota.nombre)} 
                            className="btn btn-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="modalMascotas" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{titulo}</label>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e)=>setNombre(e.target.value)}
                ></input>              
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="tipo"
                  className="form-control"
                  placeholder="tipo"
                  value={tipo}
                  onChange={(e)=>setTipo(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="raza"
                  className="form-control"
                  placeholder="raza"
                  value={raza}
                  onChange={(e)=>setRaza(e.target.value)}
                ></input>
              </div>              
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="edad"
                  className="form-control"
                  placeholder="Edad"
                  value={edad}
                  onChange={(e)=>setEdad(e.target.value)}

                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="estado"
                  className="form-control"
                  placeholder="estado"
                  value={estado}
                  onChange={(e)=>setEstado(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="foto"
                  className="form-control"
                  placeholder="url foto"
                  value={foto}
                  onChange={(e)=>setFoto(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="cualidades"
                  className="form-control"
                  placeholder="cualidades"
                  value={cualidades}
                  onChange={(e)=>setCualidades(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="detalles"
                  className="form-control"
                  placeholder="detalles"
                  value={detalles}
                  onChange={(e)=>setDetalles(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={()=>validar()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i>Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btnCerrarModal"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
        <button></button>
      </div>
    </div>
    </Layout>
  );
};

//EXPORT
export default MascotasComponent;
