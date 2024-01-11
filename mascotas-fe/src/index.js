import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import MascotasComponent from './Components/MascotasComponent';
import MascotaDetailComponent from './Components/mascotadetail';



const router=createBrowserRouter([
  {path:"/",element:<App />}, 
  {path:"/admin",element:<MascotasComponent />},
  {path:"/mascota/:id",element:<MascotaDetailComponent/>}
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 
