import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { addAuth, authSelector, AuthState } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { localDataNames } from "../constants/appInfos";
import { Spin } from "antd";

const Routers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const auth: AuthState = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const res = localStorage.getItem(localDataNames.authData);
        res && dispatch(addAuth(JSON.parse(res)));
    }

    const handleCheckToken = async ( ) => {
        
    }

    return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />
};

export default Routers;