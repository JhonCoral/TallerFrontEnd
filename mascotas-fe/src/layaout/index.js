
const {Link} = require("react-router-dom");
const Layout= ({children})=>{
    return (
        <>
            <header>

            <nav className="navbar navbar-expand-lg bg-dark border-bottom pe-lg-5 ps-lg-5 border-body" data-bs-theme="dark">
               <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MASCOTAS</Link>
                    <button className="navbar-toggler"
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText" 
                        aria-controls="navbarText" 
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                    
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Administrar Mascotas</Link>
                            </li>
                            
                        </ul>
                        
                    </div>                    
               </div>
            </nav>
               
            </header>
            <div>{children}</div>
        </>
    );

}

export default Layout;