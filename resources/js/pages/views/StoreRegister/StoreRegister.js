import React from 'react';
import {notification, Form, Input, Button, Upload, message, Col, Row, Select, InputNumber} from 'antd';
import {MinusCircleOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import './storeRegister.scss'
import Header from "../../components/Header/Header";
import { Redirect, withRouter } from 'react-router-dom'

const axios = require('axios');

const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const elementLayout = {
    wrapperCol: {span: 23}
};

function isVietnamesePhoneNumber(number) {
    return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}

const checkPhone = (_, value) => {
    if (isVietnamesePhoneNumber(value)) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Format số điện thoại không hợp lệ'));
};

const openNotification = () => {
    notification.success({
        message: 'Đăng ký thành công!',
        className: 'noti'
    });

    setTimeout(function () {
        window.location.assign('/store/login');
    }, 1000);
};

function handleBeforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Chỉ chấp nhận định dạng ảnh png, jpeg, jpg');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
        message.error('Ảnh phải có dung lượng < 10MB');
    }
    return isJpgOrPng && isLt10M;
}

class StoreRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: null
        }
    }

    handleChange = info => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                imageUrl: info.file?.response?.logo_url,
                loading: false,
            })
        }
    };

    onFinish = values => {
        values.logo_image = this.state.imageUrl;

        axios.post('/api/stores', values)
            .then(function (response) {
                if (response?.status === 200) {
                    openNotification();
                }
                else {
                    notification.error({
                        message: 'Đăng ký thất bại!'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: 'Đăng ký thất bại!'
                });
            });
    };

    render() {
        const {loading, imageUrl} = this.state;
        console.log(imageUrl);
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{marginTop: 8}}>Upload logo</div>
            </div>
        );
        const defaultPrintServices = [
            {
                print_type: "Tiết Kiệm",
                color_type: "Đen Trắng",
                paper_size: "A4",
                page_type: "1 mặt",
                price_per_page: null
            },
            {
                print_type: "Tiết Kiệm",
                color_type: "Đen Trắng",
                paper_size: "A4",
                page_type: "2 mặt",
                price_per_page: null
            },
            {
                print_type: "Tiết Kiệm",
                color_type: "Màu",
                paper_size: "A4",
                page_type: "1 mặt",
                price_per_page: null
            },
            {
                print_type: "Tiết Kiệm",
                color_type: "Màu",
                paper_size: "A4",
                page_type: "2 mặt",
                price_per_page: null
            },
            {
                print_type: "Nhanh",
                color_type: "Đen Trắng",
                paper_size: "A4",
                page_type: "1 mặt",
                price_per_page: null
            },
            {
                print_type: "Nhanh",
                color_type: "Đen Trắng",
                paper_size: "A4",
                page_type: "2 mặt",
                price_per_page: null
            },
            {
                print_type: "Nhanh",
                color_type: "Màu",
                paper_size: "A4",
                page_type: "1 mặt",
                price_per_page: null
            },
            {
                print_type: "Nhanh",
                color_type: "Màu",
                paper_size: "A4",
                page_type: "2 mặt",
                price_per_page: null
            },
        ];

        const defaultExtraServices = [
            {
                service_name: "Đóng Bìa Xanh Chữ Đen",
                price: null
            },
            {
                service_name: "Đóng Bìa Xanh In Màu",
                price: null
            },
            {
                service_name: "Đóng Bìa Bóng Kính Trong",
                price: null
            },
            {
                service_name: "Đóng Bìa Bóng Kính Mờ",
                price: null
            },
            {
                service_name: "Đóng Quyển Gáy Nhựa",
                price: null
            },
            {
                service_name: "Đóng Quyển Gáy Xoắn Kẽm",
                price: null
            },

        ];

        return (
            <div>
                <Header/>
                <div className="container">
                    <h1 className="store-register-title">Đăng ký cửa hàng</h1>
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
                            <Form.Item
                                label="Tên cửa hàng"
                                name="store_name"
                                rules={[{required: true, message: 'Xin nhập tên cửa hàng'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{required: true, message: 'Xin nhập địa chỉ cửa hàng'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Họ tên"
                                name="owner_name"
                                rules={[{required: true, message: 'Xin nhập họ tên'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label={"Số điện thoại"}
                                name="phone"
                                type="tel"
                                rules={[
                                    {required: true, message: 'Xin nhập số điện thoại'},
                                    {validator: checkPhone}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item name="introduction" label="Giới thiệu">
                                <Input.TextArea rows={4}/>
                            </Form.Item>
                            <Upload
                                name="logo"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={handleBeforeUpload}
                                action='/api/logo'
                                onChange={this.handleChange}
                            >
                                {imageUrl ?
                                    <img src={imageUrl} alt="avatar"/> : uploadButton}
                            </Upload>
                            <Form.Item label="Bảng giá dịch vụ">
                            </Form.Item>
                            <Row>
                                <Col/>
                            </Row>
                            <Form.List name="print_services" initialValue={defaultPrintServices}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                            <Row style={{marginLeft: '20%'}}>
                                                <Col span={5}>
                                                    <Form.Item
                                                        {...restField}
                                                        {...elementLayout}
                                                        name={[name, 'print_type']}
                                                        fieldKey={[fieldKey, 'print_type']}
                                                    >
                                                        <Select placeholder="Loại dịch vụ">
                                                            <Option value="Nhanh">In Nhanh</Option>
                                                            <Option value="Tiết Kiệm">In Tiết Kiệm</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={5}>
                                                    <Form.Item
                                                        {...restField}
                                                        {...elementLayout}
                                                        name={[name, 'color_type']}
                                                        fieldKey={[fieldKey, 'color_type']}
                                                    >
                                                        <Select placeholder="Loại màu">
                                                            <Option value="Đen Trắng">Đen Trắng</Option>
                                                            <Option value="Màu">In Màu</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={3}>
                                                    <Form.Item
                                                        {...restField}
                                                        {...elementLayout}
                                                        name={[name, 'paper_size']}
                                                        fieldKey={[fieldKey, 'paper_size']}
                                                    >
                                                        <Select placeholder="Cỡ giấy">
                                                            <Option value="A4">A4</Option>
                                                            <Option value="A3">A3</Option>
                                                            <Option value="A2">A2</Option>
                                                            <Option value="A1">A1</Option>
                                                            <Option value="A0">A0</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        {...elementLayout}
                                                        name={[name, 'page_type']}
                                                        fieldKey={[fieldKey, 'page_type']}
                                                    >
                                                        <Select placeholder="Kiểu In">
                                                            <Option value="1 mặt">1 mặt</Option>
                                                            <Option value="2 mặt">2 mặt</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        {...restField}
                                                        {...elementLayout}
                                                        name={[name, 'price_per_page']}
                                                        fieldKey={[fieldKey, 'price_per_page']}
                                                    >
                                                        <InputNumber min={0} placeholder="Giá"/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={1}>
                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </Col>
                                            </Row>
                                        ))}
                                        <Form.Item  {...elementLayout} style={{marginLeft: '20%'}}>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Thêm Dịch Vụ
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            <Form.Item label="Dịch vụ khác">
                            </Form.Item>

                            <Form.List name="extra_services" initialValue={defaultExtraServices}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                                <Row style={{marginLeft: '20%'}}>
                                                    <Col span={17}>
                                                        <Form.Item
                                                            {...restField}
                                                            {...elementLayout}
                                                            name={[name, 'service_name']}
                                                            fieldKey={[fieldKey, 'service_name']}
                                                            style={{width: '100%'}}
                                                        >
                                                            <Input placeholder="Tên dịch vụ"/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            {...elementLayout}
                                                            name={[name, 'price']}
                                                            fieldKey={[fieldKey, 'price']}
                                                        >
                                                            <InputNumber min={0} placeholder="Giá"/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={1}>
                                                        <MinusCircleOutlined style={{marginTop: '9px'}}
                                                                             onClick={() => remove(name)}/>
                                                    </Col>
                                                </Row>
                                        ))}
                                        <Form.Item {...elementLayout} style={{marginLeft: '20%'}}>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Thêm Dịch Vụ
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" className="store-register-form-button">
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


export default withRouter(StoreRegister);

