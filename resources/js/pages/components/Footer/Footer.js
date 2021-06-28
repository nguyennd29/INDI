import React from 'react';
import {Link} from 'react-router-dom'
import {Dropdown, Button, Menu, notification, Modal, Form, Rate, Input} from 'antd';
import './footer.scss'
import axios from "../../../utils/axios";
import { DownOutlined } from '@ant-design/icons';



class Footer extends React.Component {
    onFeedback = () => {
        Modal.info({
            title: 'Phản Hồi Khách Hàng',
            content: this.feedbackContent(),
            className: 'picked-container',
            closable: true,
            width: 600
        });
    };

    onFinishFeedback = (values) => {

        axios.post('/api/feedback', values)
            .then(function (response) {
                if (response?.status === 200) {
                    Modal.destroyAll();
                    notification.success({
                        message: 'Gửi feedback thành công!'
                    });
                } else {
                    notification.error({
                        message: 'Gửi feedback thất bại!'
                    });
                }
            })
            .catch(function (error) {
                notification.error({
                    message: 'Gửi feedback thất bại!'
                });
            });
    };

    feedbackContent = () => {
        return (
            <Form
                name="feedback-form"
                labelCol={{span: 4}}
                wrapperCol={{span: 16}}
                onFinish={this.onFinishFeedback}
                style={{marginTop: 20}}
            >
                <Form.Item name="email" label="email">
                    <Input placeholder="Email"/>
                </Form.Item>
                <Form.Item
                    name="feedback"
                    label="Feedback"
                    rules={[{required: true, message: 'Xin nhập phản hồi'}]}
                >
                    <Input.TextArea rows={2} placeholder="Xin chia sẻ cảm nhận về dịch vụ"/>
                </Form.Item>
                <Button type="primary" htmlType="submit" className="submit-feedback-btn" style={{marginLeft: '17%'}}>
                    Gửi
                </Button>
            </Form>
        )
    };

    render() {
        return (
            <div className='footer'>
                <Button type="link" onClick={this.onFeedback}>
                    Feedback
                </Button>
            </div>
        );
    }
}

export default Footer;
