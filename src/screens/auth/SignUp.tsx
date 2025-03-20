import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SocialLogin from "./components/SocialLogin";
import handleAPI from "../../apis/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";
import { appInfor, localDataNames } from "../../constants/appInfos";

const { Title, Paragraph, Text } = Typography;
const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const handleLogin = async (values: { email: string; password: string; }) => {
        const api = '/auth/register';
        setIsLoading(true);
        try {
            const res: any = await handleAPI(api, values, 'post');
            if (res.data) {
                message.success(res.message);
                dispatch(addAuth(res.data));
            }
        } catch (error: any) {
            console.log(error);
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Card>
                <div className="text-center">
                    <img className="mb-3"
                        src={appInfor.logo}
                        alt=""
                        style={{
                            width: 48,
                            height: 48
                        }} />
                    <Title level={2}>Create an account for you</Title>
                    <Paragraph type="secondary">Start your 30-day free trial!</Paragraph>
                </div>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleLogin}
                    disabled={isLoading}
                    size="large">
                    <Form.Item
                        name={'name'}
                        label='Name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name!'
                            }
                        ]}>
                        <Input placeholder="Please enter your name" allowClear />
                    </Form.Item>
                    <Form.Item
                        name={'email'}
                        label='Email'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!'
                            }
                        ]}>
                        <Input placeholder="Plsae enter your email" allowClear maxLength={100} type='email' />
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!'
                            },
                            () => ({
                                validator: (_, value) => {
                                    if (value.length < 6) {
                                        return Promise.reject(new Error('Password must contain at least 6 characters!'))
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            })
                        ]}>
                        <Input.Password placeholder="Please enter your password" maxLength={100} />
                    </Form.Item>
                </Form>
                <div className="mt-5 mb-3">
                    <Button
                        loading={isLoading}
                        onClick={() => form.submit()}
                        type="primary"
                        style={{
                            width: '100%',
                        }}
                        size='large'>
                        Get started
                    </Button>
                </div>
                <SocialLogin />
                <div className="mt-4 text-center">
                    <Space>
                        <Text type="secondary"> Already have an account?</Text>
                        <Link to={'/'}>Login</Link>
                    </Space>
                </div>
            </Card>
        </div>
    )
};
export default SignUp;