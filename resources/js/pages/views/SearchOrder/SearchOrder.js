import React from 'react';
import {Link} from 'react-router-dom'
import {Button, Form, Input, notification} from 'antd';
import './searchOrder.scss'
import Header from "../../components/Header/Header";
import axios from "../../../utils/axios";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const {Search} = Input;

const openNotification = () => {
    notification.success({
        message: 'Đăng nhập thành công!',
        className: 'noti'
    });

    setTimeout(function () {
        window.location.assign('/store/order');
    }, 500);
};

class SearchOrder extends React.Component {
    onFinish = values => {
        axios.post('/api/auth/login', values)
            .then(function (response) {
                if (response?.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    openNotification();
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
                    <div className="form-search-container">
                        {/*<Form*/}
                        {/*    {...layout}*/}
                        {/*    name="store-register-form"*/}
                        {/*    className="store-register-form"*/}
                        {/*    onFinish={this.onFinish}*/}
                        {/*>*/}

                        {/*    <Form.Item*/}
                        {/*        label="Mã đơn hàng"*/}
                        {/*        name="order_id"*/}
                        {/*        rules={[{required: true, message: 'Xin nhập mã đơn hàng'}]}*/}
                        {/*    >*/}
                        {/*        /!*<Input/>*!/*/}
                                <Search
                                    enterButton="Tìm Kiếm"
                                    onSearch={(value) => console.log(value)}
                                />
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item {...tailLayout}>*/}
                        {/*        <Button type="primary" htmlType="submit" className="store-register-form-button">*/}
                        {/*            Tìm kiếm*/}
                        {/*        </Button>*/}
                        {/*    </Form.Item>*/}
                        {/*</Form>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchOrder;
