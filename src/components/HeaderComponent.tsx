import { Avatar, Button, Dropdown, Input, MenuProps, Space } from "antd";
import { SearchNormal1, Notification } from "iconsax-react";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, removeAuth } from "../redux/reducers/authReducer";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    const user = useSelector(authSelector);
    const dispacth = useDispatch();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: 'logout',
            label: 'Logout',
            onClick: async () => {
                auth.signOut();
                dispacth(removeAuth({}));
                localStorage.clear();
                navigate("/");
            },
        },
    ];

    return (
        <div className="p-2 row bg-white">
            <div className="col">
                <Input
                    placeholder="Search product, supplier, order"
                    style={{
                        borderRadius: 100,
                        width: '50%'
                    }}
                    size="large"
                    prefix={<SearchNormal1 className="text-muted" size={20} />}>
                </Input>
            </div>
            <div className="col text-right">
                <Space>
                    <Button
                        type='text'
                        icon={<Notification size={22} color={colors.gray600} />} />
                    <Dropdown menu={{ items }}>
                        <Avatar src={user.photoUrl} size={40} />
                    </Dropdown>
                </Space>
            </div>
        </div>
    )
};

export default HeaderComponent;