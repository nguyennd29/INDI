import React from 'react';
import {Link} from 'react-router-dom'
import {Dropdown, Button, Menu, notification} from 'antd';
import './header.scss'
import axios from "../../../utils/axios";
import {DownOutlined} from '@ant-design/icons';


class Header extends React.Component {
    menuLoggedUser = (
        <Menu>
            <Menu.Item key="logout" onClick={() => this.logOut()}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    menuStore = (
        <Menu>
            <Menu.Item key="storeRegister">
                <Link to="/store/register">
                    Đăng ký cửa hàng
                </Link>
            </Menu.Item>
            <Menu.Item key="storeLogin">
                <Link to="/store/login">
                    Đăng nhập cửa hàng
                </Link>
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
                } else {
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
                    <Menu.Item key="Home">
                        <Link to="/">
                            <div style={{display: 'flex', alignItems: 'baseline'}}>
                                {/*<img*/}
                                {/*    src="/images/copyphotologo.png"*/}
                                {/*    alt=""*/}
                                {/*    className=""*/}
                                {/*    height={'20'}*/}
                                {/*/>*/}
                                <div className='indi'>
                                    INDI
                                </div>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Service">
                        <Link to="/print">
                            Dịch Vụ
                        </Link>
                    </Menu.Item>
                    {user?.role === 'store' ? (
                        <Menu.Item key="order">
                            <Link to="/store/order">
                                Quản lý đơn hàng
                            </Link>
                        </Menu.Item>) : null
                    }
                    {user ? null : (<Menu.Item key="Partner">
                        <Dropdown overlay={this.menuStore}>
                            <div>Đối Tác<DownOutlined/></div>
                        </Dropdown>
                    </Menu.Item>)}
                    {
                        user ? (
                            <Menu.Item key='user' style={{float: 'right'}}>
                                <Dropdown overlay={this.menuLoggedUser}>
                                    <div>{user.user_name} <DownOutlined/></div>
                                </Dropdown>
                            </Menu.Item>
                        ) : (
                            <Menu.Item key="Login" style={{float: 'right'}}>
                                <Link to="/user/login">
                                    Đăng Nhập
                                </Link>
                            </Menu.Item>
                        )
                    }

                </Menu>
            </div>
        );
    }
}

export default Header;
