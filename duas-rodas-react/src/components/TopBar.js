import React from "react";
import './TopBar.css';

function TopBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container-fluid">
                {/* Logo ou nome */}
                <a className="navbar-brand fw-bold" href="#">
                    Oficina Duas Rodas
                </a>

                {/* Botão do menu mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links que colapsam no mobile */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="btn btn-outline-light me-2 topbar-btn" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-light me-2 topbar-btn" href="#">
                                Produtos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-light me-2 topbar-btn" href="#">
                                Oficina
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-light me-2 topbar-btn" href="#">
                                Serviços
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-light me-2 topbar-btn" href="#">
                                Sobre Nós
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default TopBar;
