import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from 'react-router-dom';
import SocialLogin from "./components/SocialLogin";
import handleAPI from "../../apis/handleAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";
import { appInfor, localDataNames } from "../../constants/appInfos";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRember] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const res: any = await handleAPI('/auth/login', values, 'post');
            toast(res.message);
            res.data && dispatch(addAuth(res.data));

            if(isRemember) {
                localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
            }
        } catch (error: any) {
            toast(error.message);
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Card
                style={{
                    width: '120%'
                }}>
                <div className="text-center">
                    <img className="mb-3"
                        src={appInfor.logo}
                        alt=""
                        style={{
                            width: 48,
                            height: 48
                        }} />
                    <Title level={2}>Login to your account</Title>
                    <Paragraph type="secondary">Welcome back! Please enter your  details.</Paragraph>
                </div>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleLogin}
                    disabled={isLoading}
                    size="large">
                    <Form.Item
                        name={'email'}
                        label='Email'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!'
                            }
                        ]}>
                        <Input placeholder="Enter your email" allowClear maxLength={100} type='email' />
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!'
                            }
                        ]}>
                        <Input.Password placeholder="Please enter your password" maxLength={100} />
                    </Form.Item>
                </Form>
                <div className="row">
                    <div className="col">
                        <Checkbox checked={isRemember} onChange={(val) => setIsRember(val.target.checked)}>
                            Remember for 30 days
                        </Checkbox>
                    </div>
                    <div className="col text-right">
                        <Link to={'/'}>Forgot passwprd</Link>
                    </div>
                </div>
                <div className="mt-4 mb-3">
                    <Button
                        loading={isLoading}
                        onClick={() => form.submit()}
                        type="primary"
                        style={{
                            width: '100%'
                        }}
                        size='large'>
                        Login
                    </Button>
                </div>
                <SocialLogin isRemember={isRemember} />
                <div className="mt-4 text-center">
                    <Space>
                        <Text type="secondary"> Don't have an account?</Text>
                        <Link to={'/sign-up'}>Sign up</Link>
                    </Space>
                </div>
            </Card>
        </div>
    )
};
export default Login;