import React from 'react';
import {Link} from 'react-router-dom'
import {PageHeader, Button, Menu} from 'antd';
import './header.scss'
class Header extends React.Component {
    render() {
        return (
            <div>
                <Menu mode="horizontal">
                        <Menu.Item key="Home">
                            <Link to="/">
                            INDI
                            </Link>
                        </Menu.Item>
                    {/*<Menu.Item key="Guide">*/}
                    {/*    Trợ giúp*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="Partner">*/}
                    {/*    Đối tác*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="Login">
                        Đăng nhập
                    </Menu.Item>
                    <Menu.Item key="Signup">
                        Đăng ký
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header;
