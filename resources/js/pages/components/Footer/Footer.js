import React from 'react';
import {Link} from 'react-router-dom'
import {Dropdown, Button, Menu, notification} from 'antd';
import './footer.scss'
import axios from "../../../utils/axios";
import { DownOutlined } from '@ant-design/icons';



class Footer extends React.Component {


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
        return (
            <div className='footer'>
                <div><a href='#'>Feedback</a></div>
            </div>
        );
    }
}

export default Footer;
