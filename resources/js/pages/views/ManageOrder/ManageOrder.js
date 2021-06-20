import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import './manageOrder.scss'
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

class ManageOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderList: []
        };

    }

    componentDidMount() {
        axios.get('/api/orders')
            .then(response => {
                if (response?.status == 200 && response?.data) {
                    this.setState({
                        orderList: response.data
                    })
                }
            })
            .catch(e => console.log(e));

    }

    render() {
        const {orderList} = this.state;

        console.log(orderList);

        return (
            <div>
                <Header />
                <div className="manage-container">
                    <div className="manage-page-title">
                        Quản lý đơn hàng
                    </div>

                </div>
            </div>
        );
    }
}

export default ManageOrder;
