import { Layout } from "antd";
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import SideBar from "../components/SideBar/SideBar";

const MainLayout = () => {

    return (
        <div className="h-[calc(100vh-4rem)]">
            <NavBar />
            <Layout className="h-full">
                <SideBar  />
                <Layout.Content className="content p-5">
                    <Outlet />
                </Layout.Content>
            </Layout>
        </div>
    );
}

export default MainLayout;
