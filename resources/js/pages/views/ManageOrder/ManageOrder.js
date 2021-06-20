import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import './landing.scss'
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

class ManageOrder extends React.Component {
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

                    {/*<div className="post-list">*/}
                    {/*    <div className="post-item">*/}
                    {/*        <a href="#" className="post-media">*/}
                    {/*            <img*/}
                    {/*                src="https://cdn.dribbble.com/users/5209175/screenshots/15329869/media/46b95b0ec58274621935463cd534f793.jpg?compress=1&resize=1600x1200"*/}
                    {/*                alt=""*/}
                    {/*                className="post-image"*/}
                    {/*            />*/}
                    {/*        </a>*/}
                    {/*        <a href="#" className="post-category">Shop</a>*/}
                    {/*        <h3>*/}
                    {/*            <a href="#" className="post-title"*/}
                    {/*            >How to choose best bike for spring in Australia</a*/}
                    {/*            >*/}
                    {/*        </h3>*/}
                    {/*        <p className="post-desc">*/}
                    {/*            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam*/}
                    {/*            at quae architecto perspiciatis dolore deleniti, voluptas aperiam*/}
                    {/*            dolorem sit. Est in asperiores ipsa repellat sit odit eos quia*/}
                    {/*            nostrum quae.*/}
                    {/*        </p>*/}
                    {/*        <a href="#" className="post-author">*/}
                    {/*            <img*/}
                    {/*                src="https://cdn.dribbble.com/users/4674461/screenshots/15330665/media/fe4a38ceca4300ac0614483ab9e7a0d7.png?compress=1&resize=1600x1200"*/}
                    {/*                alt=""*/}
                    {/*                className="post-author-image"*/}
                    {/*            />*/}
                    {/*            <div className="post-author-info">*/}
                    {/*                <h4 className="post-author-name">By Sebastian</h4>*/}
                    {/*                <time className="post-author-time">Just now</time>*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*    <div className="post-item">*/}
                    {/*        <a href="#" className="post-media">*/}
                    {/*            <img*/}
                    {/*                src="https://cdn.dribbble.com/users/4674461/screenshots/15330665/media/fe4a38ceca4300ac0614483ab9e7a0d7.png?compress=1&resize=1600x1200"*/}
                    {/*                alt=""*/}
                    {/*                className="post-image"*/}
                    {/*            />*/}
                    {/*        </a>*/}
                    {/*        <a href="#" className="post-category">Shop</a>*/}
                    {/*        <h3>*/}
                    {/*            <a href="#" className="post-title"*/}
                    {/*            >How to choose best bike for spring in Australia</a*/}
                    {/*            >*/}
                    {/*        </h3>*/}
                    {/*        <p className="post-desc">*/}
                    {/*            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam*/}
                    {/*            at quae architecto perspiciatis dolore deleniti, voluptas aperiam*/}
                    {/*            dolorem sit. Est in asperiores ipsa repellat sit odit eos quia*/}
                    {/*            nostrum quae.*/}
                    {/*        </p>*/}
                    {/*        <a href="#" className="post-author">*/}
                    {/*            <img*/}
                    {/*                src="https://cdn.dribbble.com/users/4674461/screenshots/15330665/media/fe4a38ceca4300ac0614483ab9e7a0d7.png?compress=1&resize=1600x1200"*/}
                    {/*                alt=""*/}
                    {/*                className="post-author-image"*/}
                    {/*            />*/}
                    {/*            <div className="post-author-info">*/}
                    {/*                <h4 className="post-author-name">By Sebastian</h4>*/}
                    {/*                <time className="post-author-time">Just now</time>*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*    <div className="post-item">*/}
                    {/*        <a href="#" className="post-media">*/}
                    {/*            <img*/}
                    {/*                src="https://cdn.dribbble.com/users/486985/screenshots/15329016/media/de4829c5298afd8ed930e796154e276a.jpg?compress=1&resize=1600x1200"*/}
                    {/*                alt=""*/}
                    {/*                className="post-image"*/}
                    {/*            />*/}
                    {/*        </a>*/}
                    {/*        <a href="#" className="post-category">Shop</a>*/}
                    {/*        <h3>*/}
                    {/*            <a href="#" className="post-title"*/}
                    {/*            >How to choose best bike for spring in Australia</a*/}
                    {/*            >*/}
                    {/*        </h3>*/}
                    {/*        <p className="post-desc">*/}
                    {/*            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam*/}
                    {/*            at quae architecto perspiciatis dolore deleniti, voluptas aperiam*/}
                    {/*            dolorem sit. Est in asperiores ipsa repellat sit odit eos quia*/}
                    {/*            nostrum quae.*/}
                    {/*        </p>*/}
                    {/*        <a href="#" className="post-author">*/}
                    {/*            <img*/}
                    {/*                src="https://cdn.dribbble.com/users/4674461/screenshots/15330665/media/fe4a38ceca4300ac0614483ab9e7a0d7.png?compress=1&resize=1600x1200"*/}
                    {/*                alt=""*/}
                    {/*                className="post-author-image"*/}
                    {/*            />*/}
                    {/*            <div className="post-author-info">*/}
                    {/*                <h4 className="post-author-name">By Sebastian</h4>*/}
                    {/*                <time className="post-author-time">Just now</time>*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default ManageOrder;
