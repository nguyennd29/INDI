import React from 'react';
import {Link} from 'react-router-dom'
import {PageHeader, Button, Menu, Form, Input, Upload, Row, Col, Select, notification, Checkbox} from 'antd';
import './userLogin.scss'
import Header from "../../../components/Header/Header";
import axios from "../../../../utils/axios";

const {Option} = Select;

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

class UserLogin extends React.Component {
    onFinish = values => {
        axios.post('/api/auth/login', values)
            .then(function (response) {
                if (response?.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    openNotification();
                    window.location.assign('/');                }
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
                    <h1 className="user-register-title">Đăng nhập</h1>
                    <div className="form-container">
                        <Form
                            {...layout}
                            name="user-register-form"
                            className="user-register-form"
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
                                    Chưa có tài khoản? <a href="/user-register">Đăng ký ngay!</a>
                                </div>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" className="user-register-form-button">
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

export default UserLogin;
