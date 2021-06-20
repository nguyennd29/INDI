import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import './landing.scss'
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

class Landing extends React.Component {
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
                                    <div>in ấn trực tuyến</div>
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
