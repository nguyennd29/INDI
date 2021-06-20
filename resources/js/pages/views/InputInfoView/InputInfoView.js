import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import SearchStoreView from "../PrintView/SearchStoreView/SearchStoreView";

class InputInfoView extends React.Component {
    constructor(props) {
        super(props);
    }
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    render() {
    const {uploadedFiles} = this.props;

    return (
        <Form
            name="order_info"
            className="order-form"
            initialValues={{ remember: true }}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Xin nhập tên khách hàng' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên" />
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Xin nhập số điện thoại' }]}
            >
                <Input
                    placeholder="Số điện thoại"
                />
            </Form.Item>
            {
                uploadedFiles.length > 0 && (
                    <div>
                        <div>File List</div>
                        {
                            uploadedFiles?.map(file =>
                                <div>{file.name}</div>
                            )
                        }
                    </div>
                )
            }
            <Form.Item>
                <Button type="primary" htmlType="submit" className="order-form-button">
                    Xác nhận
                </Button>
            </Form.Item>
        </Form>
    );
    }
}

export default InputInfoView;

