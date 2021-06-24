import React from 'react';
import {Link} from 'react-router-dom'
import {PageHeader, Button, Menu, Form, Input, Upload, Row, Col, Select, notification, Checkbox} from 'antd';
import './userRegister.scss'
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
        message: 'Đăng ký thành công!\nXin vui lòng đăng nhập!',
        className: 'noti'
    });
};

class UserRegister extends React.Component {
    onFinish = values => {
        axios.post('/api/auth/register', values)
            .then(function (response) {
                if (response?.status === 200) {
                    openNotification();
                    window.location.assign('/user-login');
                }
                else {
                    notification.error({
                        message: 'Đăng ký thất bại!'
                    });
                }
            })
            .catch(function (error) {
                notification.error({
                    message: 'Đăng ký thất bại!'
                });
            });
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <h1 className="user-register-title">Đăng ký khách hàng</h1>
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
                            <Form.Item
                                label="Tên khách hàng"
                                name="user_name"
                                rules={[{required: true, message: 'Xin nhập họ tên'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label={"Số điện thoại"}
                                name="phone"
                                type="tel"
                                rules={[{required: true, message: 'Xin nhập số điện thoại'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" className="user-register-form-button">
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserRegister;
