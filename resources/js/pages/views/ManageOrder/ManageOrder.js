import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import './manageOrder.scss'
import {Avatar, Button, Card, Collapse, List, Row, Col} from 'antd';
import {CaretUpOutlined } from '@ant-design/icons';

const {Panel} = Collapse;

class ManageOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderList: [],
            user: JSON.parse(localStorage.getItem('user')),
            store: JSON.parse(localStorage.getItem('user'))?.store
        };

    }

    componentDidMount() {
        const {user, store} = this.state;

        if (user?.role === 'store' && store?.id) {
            axios.get(`/api/order/order-store/${store.id}`)
                .then(response => {
                    if (response?.status == 200 && response?.data) {
                        this.setState({
                            orderList: response.data
                        })
                    }
                })
                .catch(e => console.log(e));
        }
    }

    getPrintOption = (item) => {
        return (
            <span>
                {"In " + item.print_type + ' ' + item.color_type + ' '
                + item.page_type + ' ' + item.paper_size + ' - ' + item.price_per_page + 'đ/trang'}
            </span>
        );
    };


    getServiceType = (order) => {

        if (order?.extra_services?.length > 0 && order?.files?.length > 1) {
            const type = order?.extra_services[0]?.pivot?.type;

            return type === 'ALL' ? ' - Gộp các file làm một' : ' - Áp dụng từng file';
        }

        return ('');
    };

    renderTitle = (order, status) => (
        <div className='order-card-title'>
            <nav>Đơn: #{order.id}</nav>
            <nav>
                {
                    status === 'CREATED' ? (
                        <Button type="primary" size='small'>
                            Nhận
                        </Button>
                    ) : status === 'RECEIVED' ? (
                        <Button type="primary" size='small'>
                            In
                        </Button>
                    ) : status === 'PROCESSING' ? (
                        <Button type="primary" size='small'>
                            In Xong
                        </Button>
                    ) : status === 'PRINTED' ? (
                        <Button type="primary" size='small'>
                            Hoàn tất
                        </Button>
                    ) : null
                }

                <Button type="primary" size='small' danger>
                    Huỷ
                </Button>
            </nav>

        </div>
    );

    orderClassName = (status) => {
        switch (status) {
            case 'CREATED':
                return 'created-order';
            case 'RECEIVED':
                return 'received-order';
            case 'PROCESSING':
                return 'processing-order';
            case 'PRINTED':
                return 'printed-order';
            default:
                return '';
        }
    };

    renderOrder = (order) => (
        <Card
            size="small"
            title={this.renderTitle(order, order.status)}
            className={this.orderClassName(order.status)}
        >
            {/*<div className='order-code'>*/}
            {/*    Khách hàng: {order.user_name + ' - ' + order.user_phone}*/}
            {/*</div>*/}
            <div className='order-code' style={{display: 'flex'}}>
                <div>Hẹn lấy:</div><div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>12:30 Thứ 2, 21/06/2021</div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Tổng:</div> <div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>52.000đ</div>
            </div>
            <Collapse defaultActiveKey={[]} ghost>
                <Panel header={order.files.length + ' files - ' + order.files.length + ' bộ - ' + '321 trang'} key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={order.files}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape='square' size='large' src="/images/pdf.png"/>}
                                    title={<a style={{color: '#1890ff'}} href="#">{item.file_name}</a>}
                                    description={
                                        <div>
                                            <div>{item.copy_num + ' bản - 60 trang/bản'}</div>
                                            <div>
                                                {this.getPrintOption(item.print_service)}
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />

                </Panel>
                {/*<Panel header={order?.extra_services?.length + ' dịch vụ khác' + this.getServiceType()} key="2">*/}
                    {
                        order?.extra_services?.length > 0 ? (
                            order?.extra_services.map(item => (
                                <div
                                    className='extra-service-item'>{'・' + item.service_name + ' - ' + item.price + 'đ/bộ'}</div>
                            ))
                        ) : (
                            <div className='extra-service-item'>・Dập ghim mặc định</div>
                        )
                    }
                {/*</Panel>*/}
            </Collapse>
        </Card>
    );

    render() {
        const {orderList, user} = this.state;

        console.log(orderList, user);

        if (user.role === "store") {
            return (
                <div>
                    <Header/>
                    <div className="manage-container">
                        <div className="manage-page-title">
                            Quản lý đơn hàng
                        </div>
                        <Row className="statistic-container">
                            <Col span={12}>
                                <Card title="Hôm Nay" bordered={true} className='statistic-card'>
                                    <Row>
                                        <Col span={12}>
                                            <div style={{fontSize: 25}}>
                                                30 đơn
                                            </div>
                                            <div className='percent'>
                                                <CaretUpOutlined /> <div>12%</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{fontSize: 25}}>
                                                1.250.000đ
                                            </div>
                                            <div className='percent'>
                                                <CaretUpOutlined /> <div>12%</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Tháng Này" bordered={true} className='statistic-card'>
                                    <Row>
                                        <Col span={12}>
                                            <div style={{fontSize: 25}}>
                                                120 đơn
                                            </div>
                                            <div className='percent'>
                                                <CaretUpOutlined /> <div>20%</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{fontSize: 25}}>
                                                20.250.000đ
                                            </div>
                                            <div className='percent'>
                                                <CaretUpOutlined /> <div>23%</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                        <Row className='oders-container'>
                            <Col span={6}>
                                <List
                                    header={<div className='col-header'>Đơn mới</div>}
                                    itemLayout="horizontal"
                                    dataSource={orderList.filter(item => item.status === 'CREATED')}
                                    renderItem={item => this.renderOrder(item)}
                                />
                            </Col>
                            <Col span={6}>
                                <List
                                    header={<div className='col-header'>Đơn đã nhận</div>}
                                    itemLayout="horizontal"
                                    dataSource={orderList.filter(item => item.status === 'RECEIVED')}
                                    renderItem={item => this.renderOrder(item)}
                                />
                            </Col>
                            <Col span={6}>
                                <List
                                    header={<div className='col-header'>Đơn đang xử lý</div>}
                                    itemLayout="horizontal"
                                    dataSource={orderList.filter(item => item.status === 'PROCESSING')}
                                    renderItem={item => this.renderOrder(item)}
                                />
                            </Col>
                            <Col span={6}>
                                <List
                                    header={<div className='col-header'>Đơn đợi khách nhận</div>}
                                    itemLayout="horizontal"
                                    dataSource={orderList.filter(item => item.status === 'PRINTED')}
                                    renderItem={item => this.renderOrder(item)}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Header/>
                <div className="manage-container">
                    <div className="manage-page-title">
                        Bạn không có quyền vào trang này
                    </div>

                </div>
            </div>
        )
    }
}

export default ManageOrder;
