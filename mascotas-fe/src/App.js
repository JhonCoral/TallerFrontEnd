import { Link } from 'react-router-dom';
import './App.css';
import Layout from './layaout/index.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mostrarAlerta } from "./functions.js";


function App() {
  const url = "http://localhost:8000/mascotas";
  const urls = "http://localhost:8000/solicitudes";
  const [mascotas, setMascotas]=useState([]);
  const [id,setId]=useState(-1);
  const [nombre,setNombre]=useState("");
  const [telefono,setTelefono]=useState("");
  const [correo,setCorreo]=useState("");


  useEffect(()=>{
    getMascotas();
  },[]);
  
  const getMascotas=async()=>{
    const result=await axios.get(`${url}/mostrar`); 
    if (result.data){setMascotas(result.data)}
  }
  const realizarSolicitud= async()=>{
    const dataset={
      nombre:nombre,
      telefono:telefono,
      correo:correo,
      id_mascota:id
    }
    const res=await axios({method:'POST',url:`${urls}/crear`,data:dataset});
    console.log(res);
    if(res.data.tipo==="success"){
      mostrarAlerta(`Solicitud enviada con exito`,"success");
      limpiarCampos();
    }
    else{
      mostrarAlerta(`Solicitud no enviada`,"error");
    }
  } 
  const limpiarCampos=()=>{
    setNombre("");
    setTelefono("");
    setCorreo("");
  }

  return (
    <Layout>
    <div className='container mt-2'> 
       <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-4'> 
         {
           mascotas?(
             mascotas.map((mascota)=>(           
               <div className='col m-5' key={mascota.id}>
                   <div className="card p-3" style={{width:300}}>
                   <img src={mascota.foto }
                    style={{height:200}}
                    className="card-img-top" alt="..." />
                   <div className="card-body">
                     <h5 className="card-title">Nombre: {mascota.nombre}</h5>
                     <p className="card-text"> Tipo: {mascota.tipo}</p>                  
                     <p className="card-text"> Raza: {mascota.raza}</p>                                 
                     <p className="card-text"> Edad: {mascota.edad} </p> 
                     <p className="card-text"> Estado: {mascota.estado}</p> 
                     <p className="card-text"> {mascota.cualidades}</p>                  



                   </div>
                   <div className='card-footter'>
                     <div className='row'>
                       <div className='col'>
                        <button onClick={(e)=>setId(mascota.id)} type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Adoptar
                        </button>               
                       </div>
                       <div className='col'>
                         <Link to={`/mascota/${mascota.id}`} className="btn btn-primary w-100">Detalles</Link >               
                       </div>
                     </div> 
                   </div>
                 </div>
               </div>              
             ))
           ):""
         }
       </div>  
     </div>                
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button onClick={(e)=>limpiarCampos()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="nombre"
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
                      id="telefono"
                      className="form-control"
                      placeholder="telefono"
                      value={telefono}
                      onChange={(e)=>setTelefono(e.target.value)}
                    ></input>
                </div>   
                <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="correo"
                      className="form-control"
                      placeholder="correo"
                      value={correo}
                      onChange={(e)=>setCorreo(e.target.value)}
                    ></input>
                </div>   
            </div>
            <div className="modal-footer">
                <button onClick={(e)=>limpiarCampos()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button onClick={(e)=>realizarSolicitud()} type="button" className="btn btn-success">Guardar Solicitud</button>
            </div>
            </div>
        </div>
      </div>
   </Layout>
  );
}
    
  

export default App;
