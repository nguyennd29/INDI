import React from 'react';
import {Link} from 'react-router-dom'
import {Dropdown, Button, Menu, notification} from 'antd';
import './header.scss'
import axios from "../../../utils/axios";
import { DownOutlined } from '@ant-design/icons';



class Header extends React.Component {
    menu = (
        <Menu>
            <Menu.Item key="logout" onClick={() => this.logOut()}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    logOut = () => {
        axios.post('/api/auth/logout')
            .then(function (response) {
                if (response?.status === 200) {
                    localStorage.clear();
                    notification.success({
                        message: 'Đăng xuất thành công!'
                    });
                    window.location.assign('/');
                }
                else {
                    notification.error({
                        message: 'Đăng xuất thất bại!'
                    });
                }
            })
            .catch(function (error) {
                notification.error({
                    message: 'Đăng xuất thất bại!'
                });
            });
    };

    render() {
        const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div>
                <Menu mode="horizontal">
                        <Menu.Item key="Home" className='indi'>
                            <Link to="/">
                            INDI
                            </Link>
                        </Menu.Item>
                    <Menu.Item key="Service">
                        <Link to="/print">
                            Dịch vụ
                        </Link>
                    </Menu.Item>
                    {/*<Menu.Item key="Guide">*/}
                    {/*    Trợ giúp*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="Partner">*/}
                    {/*    Đối tác*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="store-register">
                        <Link to="/store-register">
                            Đăng ký cửa hàng
                        </Link>
                    </Menu.Item>
                    {
                        user ? null : (
                            <Menu.Item key="Login">
                                <Link to="/user-login">
                                    Đăng nhập
                                </Link>
                            </Menu.Item>
                        )
                    }

                    {
                        user ? (
                            <Menu.Item style={{float: 'right'}}>
                                <Dropdown overlay={this.menu}>
                                    <div>{user.user_name} <DownOutlined /></div>
                                </Dropdown>
                            </Menu.Item>
                        ) : null
                    }

                </Menu>
            </div>
        );
    }
}

export default Header;
