import { Layout } from "antd";
import SiderComponent from "../components/SiderComponent";
import HomeScreen from "../screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManagerStore, Oders, ReportScreen, Suppliers, Inventories } from "../screens";
import { HeaderComponent } from "../components";

const { Content, Footer } = Layout;

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Layout>
                <SiderComponent />
                <Layout>
                    <HeaderComponent />
                    <Content className="mt-3 mb-2 container bg-white">
                        <Routes>
                            <Route path='/' element={<HomeScreen />}></Route>
                            <Route path='/inventory' element={<Inventories />}></Route>
                            <Route path='/report' element={<ReportScreen />}></Route>
                            <Route path='/suppliers' element={<Suppliers />}></Route>
                            <Route path='/oders' element={<Oders />}></Route>
                            <Route path='/manage-store' element={<ManagerStore />}></Route>
                        </Routes>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </BrowserRouter>
    )
};
export default MainRouter;