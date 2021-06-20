import React from 'react';
import {Link} from 'react-router-dom'
import {Button, Form, Input, notification} from 'antd';
import './storeLogin.scss'
import Header from "../../components/Header/Header";
import axios from "../../../utils/axios";
import history from "../../components/history";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const openNotification = () => {
    notification.success({
        message: 'Đăng nhập thành công!',
        className: 'noti'
    });
};

class StoreLogin extends React.Component {
    onFinish = values => {
        axios.post('/api/auth/login', values)
            .then(function (response) {
                if (response?.status === 200) {
                    localStorage.setItem('store', JSON.stringify(response.data.store));
                    openNotification();
                    history.push('/');
                }
                else {
                    notification.error({
                        message: 'Tài khoản hoặc mật khẩu không chính xác!'
                    });
                }
            })
            .catch(function (error) {
                notification.error({
                    message: 'Tài khoản hoặc mật khẩu không chính xác!'
                });
            });
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <h1 className="store-register-title">Đăng nhập cửa hàng</h1>
                    <div className="form-container">
                        <Form
                            {...layout}
                            name="store-register-form"
                            className="store-register-form"
                            onFinish={this.onFinish}
                        >

                            <Form.Item
                                label="Email"
                                name="email"
                                type="email"
                                rules={[{required: true, message: 'Xin nhập email'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Xin nhập mật khẩu'}]}
                            >
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <div>
                                    Chưa có tài khoản? <a href="/store-register">Đăng ký ngay!</a>
                                </div>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" className="store-register-form-button">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default StoreLogin;
