import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "../screens";
import { Typography } from "antd";

const {Title} = Typography;

const AuthRouter = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col d-none d-lg-block text-center" style={{ marginTop: '15%' }}>
                    <div className="mb-4">
                    <img 
                    src="https://firebasestorage.googleapis.com/v0/b/kanban-23717.appspot.com/o/Logo.png?alt=media&token=c4e26514-89b3-4cb4-9ee7-f5ad6e9fccc0" 
                    alt="" 
                    style={{
                        width: 256,
                        objectFit: 'cover'
                    }}
                    />
                    </div>
                    <Title className="text-primary">KANBAN</Title>
                </div>
                <div className="col content-center">
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Login />} />
                            <Route path='/sign-up' element={<SignUp />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    )
};
export default AuthRouter;