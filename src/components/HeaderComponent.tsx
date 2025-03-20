import { Avatar, Button, Input, Space } from "antd";
import { SearchNormal1, Notification } from "iconsax-react";
import { colors } from "../constants/colors";

const HeaderComponent = () => {
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
                    <Button type='text' icon={<Notification size={22} color={colors.gray600} />} />
                    <Avatar src={'https://haycafe.vn/wp-content/uploads/2022/02/Anh-avatar-doremon-do-mat.png'}
                        size={40} />
                </Space>
            </div>
        </div>
    )
};

export default HeaderComponent;