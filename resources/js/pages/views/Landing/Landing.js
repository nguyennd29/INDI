import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import './landing.scss'
import {Button, Form, Input, notification} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const {Search} = Input;

class Landing extends React.Component {
    getOrderById = (value) => {
        if (value) {
            axios.get(`/api/order/${value}`)
                .then(response => {
                    if (response?.status == 200 && response?.data?.id) {
                        window.location.assign(`/order/${value}`);
                    }
                    else {
                        notification.error({
                            message: 'Không tìm thấy mã đơn hàng này'
                        });
                    }
                })
                .catch(e => {
                    notification.error({
                        message: 'Không tìm thấy mã đơn hàng này'
                    });
                });
        }
    };

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="post-feature">

                        <div className="post-feature-info">
                            <h2>
                                <div className="post-title">
                                    <div>Nền tảng</div>
                                    <div>In ấn trực tuyến</div>
                                    <div>INDI</div>
                                </div>

                            </h2>
                            <div className="post-title-desc">
                                In ấn, photocopy tài liệu một cách nhanh chóng, tiện lợi
                            </div>
                            <Link to="/print">
                                <Button
                                    type="primary"
                                    shape="round"
                                    size='large'
                                    style={{height: '50px'}}
                                >In Ngay <ArrowRightOutlined style={{fontSize: '20px'}}/></Button>
                            </Link>
                            <div className="post-title-desc" style={{marginTop: 40}}>
                                Tra cứu đơn hàng:
                            </div>
                            <Search
                                style={{width: 300}}
                                enterButton
                                size='large'
                                onSearch={(value) => this.getOrderById(value)}
                                placeholder='Nhập mã đơn hàng'
                            />
                        </div>
                        <a className="post-feature-media post-media">
                            <img
                                src="/images/Photocopy-amico.png"
                                alt=""
                                className="post-feature-image"
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
