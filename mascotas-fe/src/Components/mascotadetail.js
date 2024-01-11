import { Link, useParams } from "react-router-dom"
import Layout from "../layaout";
import axios from "axios";
import { useEffect, useState } from "react";

const  MascotaDetailComponent = ()=>{
    const id=useParams().id;

    const [mascota,setMascota]=useState({});

    const getMascota = async ()=>{
        const result=await axios.get(`http://localhost:8000/mascotas/buscar/${id}`);
        if (result){
           setMascota(result.data);
        }
    }

    useEffect(()=>{getMascota()},[]);

    return (
        <Layout>
            <div className="container">
                <div className=" card">
                    {
                        mascota?(
                            <div className="card-body">
                                <div className="row">
                                    <h3>{mascota.nombre}</h3>
                                </div>
                                <div className="row row-cols-2">
                                    <div className="col-sm-4"> 
                                    
                                        <img src={mascota.foto} style={{width:400}}></img>
                                    </div>
                                    <div className="col-sm-8">
                                        <p>Edad: {mascota.edad}</p>
                                        <p>Tipo: {mascota.tipo}</p>
                                        <p>Raza: {mascota.raza}</p>
                                        <p>Estado: {mascota.estado}</p>
                                        <p>Cualidades: {mascota.cualidades}</p>
                                        <p>{mascota.detalles}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2">
                                        <Link className="btn btn-dark w-100" to="/">Regresar</Link>
                                    </div>
                                </div>
                            </div>
                        ):(<p>No se ha podido encontar la mascota</p>)
                    }
                </div>
            </div>
        </Layout>
    );
}

export default MascotaDetailComponent;