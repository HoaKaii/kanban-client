import { Layout, Menu, MenuProps, Typography } from "antd";
import { Barcode, Box, Chart, DocumentCode, Home2, ProfileCircle } from "iconsax-react";
import { Link } from "react-router-dom";
import { appInfor } from "../constants/appInfos";
import { colors } from "../constants/colors";

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;
const { Text } = Typography;

const SiderComponent = () => {
    const items: MenuItem[] = [
        {
            key: 'dashboard',
            label: <Link to={'/'}>Dashboard</Link>,
            icon: <Home2 size="20" color="#555555" />,
        },
        {
            key: 'iventory',
            label: <Link to={'/inventory'}>Iventory</Link>,
            icon: <Barcode size="20" color="#555555" />,
        },
        {
            key: 'report',
            label: <Link to={'/report'}>Report</Link>,
            icon: <Chart size="20" color="#555555" />,
        },
        {
            key: 'suppliers',
            label: <Link to={'/suppliers'}>Suppliers</Link>,
            icon: <ProfileCircle size="20" color="#555555" />,
        },
        {
            key: 'oders',
            label: <Link to={'/oders'}>Oders</Link>,
            icon: <Box size="20" color="#555555" />,
        },
        {
            key: 'manage store',
            label: <Link to={'/manage-store'}>Manage Store</Link>,
            icon: <DocumentCode size="20" color="#555555" />,
        }
    ];
    return (
        <Sider width={280} theme='light' style={{ height: '100vh' }}>
            <div className="p-2 d-flex">
                <img src={appInfor.logo} alt="" width={48} height={48} />
                <Text style={
                    {
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        color: colors.primary500,
                        margin: 0
                    }
                }>
                    {appInfor.title}
                </Text>
            </div>
            <Menu items={items} theme='light' />
        </Sider>
    );
};

export default SiderComponent;