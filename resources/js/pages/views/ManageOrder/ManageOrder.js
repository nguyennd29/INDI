import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import './manageOrder.scss'
import {Modal, Avatar, Button, Card, Collapse, List, Row, Col, notification} from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';
import moment from 'moment';
import Footer from "../../components/Footer/Footer";

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
            this.getOrderList(store.id);

            this.interval = setInterval(() => {
                this.getOrderList(store.id);
            }, 5000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getOrderList = (storeId) => {
        axios.get(`/api/order/order-store/${storeId}`)
            .then(response => {
                if (response?.status === 200 && response?.data) {
                    if (this.state.orderList !== response.data) {
                        const data = response.data.filter(order => order?.due_at !== null)
                            .sort((order1, order2) => moment(order1.due_at).diff(moment(order2.due_at)));

                        this.setState({
                            orderList: data
                        })
                    }
                }
            })
            .catch(e => console.log(e));
    };

    getPrintOption = (item) => {
        return (
            <span>
                {"In " + item.print_type + ' ' + item.color_type + ' '
                + item.page_type + ' ' + item.paper_size}
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

    cancelContent = (order) => (
        <div>
            <div>Hãy liên lạc với khách hàng trước khi huỷ đơn.</div>
            <div>Khách hàng:</div>
            <div>{order.user_name + ' - ' + order.user_phone}</div>
        </div>
    );

    onCancel = (order) => {
        Modal.confirm({
            title: 'Xác nhận huỷ đơn hàng',
            content: this.cancelContent(order),
            onOk: () => this.handleButtonRequest(order.id, 'cancel'),
            onCancel() {
            },
            okText: 'Xác Nhận',
            cancelText: 'Huỷ'
        });
    };

    onReceive = (order) => {
        Modal.confirm({
            title: 'Xác nhận nhận đơn hàng',
            content: this.renderOrderDetail(order),
            onOk: () => this.handleButtonRequest(order.id, 'receive'),
            onCancel() {
            },
            okText: 'Xác Nhận',
            cancelText: 'Huỷ',
            width: 600
        });
    };

    onProcess = (order) => {
        Modal.confirm({
            title: 'Download File',
            content: this.renderOrderProcess(order),
            onOk: () => this.handleButtonRequest(order.id, 'process'),
            onCancel() {
            },
            okText: 'Xong',
            cancelText: 'Huỷ',
            width: 600
        });
    };

    onPrinted = (order) => {
        Modal.confirm({
            title: 'Xác nhận in hoàn tất',
            content: this.renderOrderDetail(order),
            onOk: () => this.handleButtonRequest(order.id, 'printed'),
            onCancel() {
            },
            okText: 'Xác Nhận',
            cancelText: 'Huỷ',
            width: 600
        });
    };

    onPick = (order) => {
        Modal.confirm({
            title: 'Xác nhận khách nhận hàng',
            content: this.renderOrderDetail(order),
            onOk: () => this.handleButtonRequest(order.id, 'pick'),
            onCancel() {
            },
            okText: 'Xác Nhận',
            cancelText: 'Huỷ',
            width: 600
        });
    };

    renderSuccessMessage = (type) => {
        switch (type) {
            case 'cancel':
                return 'Huỷ đơn hàng thành công';
            case 'receive':
                return 'Nhận đơn hàng thành công';
            case 'process':
                return 'Chuyển trạng thái thành công';
            case 'printed':
                return 'Chuyển trạng thái thành công';
            case 'pick':
                return 'Đơn hàng hoàn tất';
            default:
                return 'Error success message';
        }
    };

    handleButtonRequest = (orderId, type) => {
        const {store} = this.state;
        const getOrderList = (storeId) => this.getOrderList(storeId);
        const renderSuccessMessage = (type) => this.renderSuccessMessage(type);
        axios.post(`/api/order/${type}/${orderId}`)
            .then(function (response) {
                if (response?.status === 200) {
                    getOrderList(store?.id);
                    notification.success({
                        message: renderSuccessMessage(type)
                    });
                } else {
                    notification.error({
                        message: 'Thao tác thất bại!'
                    });
                }
            })
            .catch(function (error) {
                notification.error({
                    message: 'Thao tác thất bại!'
                });
            });
    };

    renderTitle = (order, status) => (
        <div className='order-card-title'>
            <nav>Đơn: #{order.id}</nav>
            {
                status === 'CREATED' ? (
                    <nav>

                        <Button type="primary" size='small' onClick={() => this.onReceive(order)}>
                            Nhận
                        </Button>
                        <Button type="primary" size='small' danger onClick={() => this.onCancel(order)}>
                            Từ chối
                        </Button>
                    </nav>

                ) : status === 'RECEIVED' ? (
                    <nav>
                        <Button type="primary" size='small' onClick={() => this.onProcess(order)}>
                            In
                        </Button>
                        <Button type="primary" size='small' danger onClick={() => this.onCancel(order)}>
                            Huỷ
                        </Button>
                    </nav>

                ) : status === 'PROCESSING' ? (
                    <nav>
                        <Button type="primary" size='small' onClick={() => this.onPrinted(order)}>
                            In Xong
                        </Button>
                        <Button type="primary" size='small' danger onClick={() => this.onCancel(order)}>
                            Huỷ
                        </Button>
                    </nav>
                ) : status === 'PRINTED' ? (
                    <nav>
                        <Button type="primary" size='small' onClick={() => this.onPick(order)}>
                            Hoàn tất
                        </Button>
                    </nav>
                ) : null
            }

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

    renderOrderDetail = (order) => (
        <Card
            size="small"
            title={<div className='order-card-detail-title'>Đơn: #{order.id}</div>}
            className={this.orderClassName(order.status)}
            style={{marginTop: 30}}
        >
            <div className='order-code' style={{display: 'flex'}}>
                Khách: <div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>
                <div>{order.user_name}</div>
                <div>{order.user_phone}</div>
            </div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Hẹn lấy:</div>
                <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    marginLeft: 5
                }}>{moment(order.due_at).locale('vi').format('hh:mm ddd DD-MM-YYYY')}</div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Tổng:</div>
                <div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>{new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'VND'
                }).format(order.cost)}</div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Mã KM:</div>
                <div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>{order.code ? order.code : ''}</div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Note:</div>
                <div style={{fontSize: 16, marginLeft: 5}}>{order.note ? order.note : ''}</div>
            </div>
            <Collapse defaultActiveKey={[]} ghost>
                <Panel header={order.files.length + ' files - ' + this.countTotalCopy(order) + ' bộ'} key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={order.files}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape='square' size='large' src="/images/pdf.png"/>}
                                    title={<a style={{color: '#1890ff'}} href={item.url}
                                              target="_blank">{item.file_name}</a>}
                                    description={
                                        <div>
                                            <div>{item.copy_num + ' bản - ' + item.page_count + ' trang/bản'}</div>
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
                {
                    order?.extra_services?.length > 0 ? (
                        order?.extra_services.map(item => (
                            <div
                                className='extra-service-item'>{'・' + item.service_name}</div>
                        ))
                    ) : (
                        <div className='extra-service-item'>・Dập ghim mặc định</div>
                    )
                }
            </Collapse>
        </Card>
    );

    handleDownload = (fileId) => {
        axios.get(`/api/file/download/${fileId}`)
            .then(response => {
                console.log(response);
            })
            .catch(e => console.log(e));
    };

    renderOrderProcess = (order) => (
        <Card
            size="small"
            title={<div className='order-card-detail-title'>Đơn: #{order.id}</div>}
            className={this.orderClassName(order.status)}
            style={{marginTop: 30}}
        >
            <List
                itemLayout="horizontal"
                dataSource={order.files}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar shape='square' size='large' src="/images/pdf.png"/>}
                            title={<div className='order-code'
                                        style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a style={{color: '#1890ff'}} href={item.url} target="_blank">{item.file_name}</a>
                                <a style={{color: '#1890ff'}} href={item.url} target="_blank">Download</a>
                            </div>}
                            description={
                                <div>
                                    <div>{item.copy_num + ' bản - ' + item.page_count + ' trang/bản'}</div>
                                    <div>
                                        {this.getPrintOption(item.print_service)}
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );

    countTotalCopy = (order) => {
        let totalCopy = 0;

        order.files?.forEach(file => {
            if (file.copy_num) totalCopy += file.copy_num;
        });

        return totalCopy;
    };

    renderOrder = (order) => (
        <Card
            size="small"
            title={this.renderTitle(order, order.status)}
            className={this.orderClassName(order.status)}
        >
            <div className='order-code' style={{display: 'flex'}}>
                Khách: <div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>
                <div>{order.user_name}</div>
                <div>{order.user_phone}</div>
            </div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Hẹn lấy:</div>
                <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    marginLeft: 5
                }}>{moment(order.due_at).locale('vi').format('hh:mm ddd DD-MM-YYYY')}</div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Tổng:</div>
                <div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>{new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'VND'
                }).format(order.cost)}</div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Mã KM:</div>
                <div style={{fontSize: 16, fontWeight: 600, marginLeft: 5}}>{order.code ? order.code : ''}</div>
            </div>
            <div className='order-code' style={{display: 'flex'}}>
                <div>Note:</div>
                <div style={{fontSize: 16, marginLeft: 5}}>{order.note ? order.note : ''}</div>
            </div>
            <Collapse defaultActiveKey={[]} ghost>
                <Panel header={order.files.length + ' files - ' + this.countTotalCopy(order) + ' bộ'} key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={order.files}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape='square' size='large' src="/images/pdf.png"/>}
                                    title={<a style={{color: '#1890ff'}} href={item.url}
                                              target="_blank">{item.file_name}</a>
                                    }
                                    description={
                                        <div>
                                            <div>{item.copy_num + ' bản - ' + item.page_count + ' trang/bản'}</div>
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
                {
                    order?.extra_services?.length > 0 ? (
                        order?.extra_services.map(item => (
                            <div
                                className='extra-service-item'>{'・' + item.service_name}</div>
                        ))
                    ) : (
                        <div className='extra-service-item'>・Dập ghim mặc định</div>
                    )
                }
            </Collapse>
        </Card>
    );

    calcSumValue = (orders) => {
        let sumValue = 0;

        orders.forEach(order => {
            sumValue += order?.cost ? order.cost : 0;
        });

        return sumValue;
    };

    renderPercent = (percent) => {
        if (percent >= 0) {
            return (
                <div className='percent-up'>
                    <CaretUpOutlined/>
                    <div>{percent + '%'}</div>
                </div>
            )
        }

        if (percent < 0) {
            return (
                <div className='percent-down'>
                    <CaretDownOutlined/>
                    <div>{percent + '%'}</div>
                </div>
            )
        }

        return null;
    };

    render() {
        const {orderList, user} = this.state;

        const startLastMonth = moment().subtract(1, 'months').startOf('month');
        const endLastMonth = moment().subtract(1, 'months').endOf('month');
        const startThisMonth = moment().startOf('month');

        const startYesterday = moment().subtract(1, 'days').startOf('day');
        const endYesterday = moment().subtract(1, 'days').endOf('day');
        const startToday = moment().startOf('day');

        const now = moment();

        const pickedOrders = orderList.filter(order => order.status === 'PICKED');
        const yesterdayOrders = pickedOrders.filter(order =>
            moment(order.picked_at).diff(startYesterday) >= 0 && moment(order.picked_at).diff(endYesterday) <= 0);
        const todayOrders = pickedOrders.filter(order =>
            moment(order.picked_at).diff(startToday) >= 0 && moment(order.picked_at).diff(now) <= 0);
        const lastMonthOrders = pickedOrders.filter(order =>
            moment(order.picked_at).diff(startLastMonth) >= 0 && moment(order.picked_at).diff(endLastMonth) <= 0);
        const thisMonthOrders = pickedOrders.filter(order =>
            moment(order.picked_at).diff(startThisMonth) >= 0 && moment(order.picked_at).diff(now) <= 0);

        const sumYesterday = this.calcSumValue(yesterdayOrders);
        const sumToday = this.calcSumValue(todayOrders);
        const sumLastMonth = this.calcSumValue(lastMonthOrders);
        const sumThisMonth = this.calcSumValue(thisMonthOrders);

        const percentTodayOrders = yesterdayOrders?.length ? Math.round((todayOrders.length/yesterdayOrders.length - 1) * 100) : 0;
        const percentMonthOrders = lastMonthOrders?.length ? Math.round((thisMonthOrders.length/lastMonthOrders.length - 1) * 100) : 0;

        const percentTodayOrdersValue = sumYesterday ? Math.round((sumToday/sumYesterday - 1) * 100) : 0;
        const percentMonthOrdersValue = sumLastMonth ? Math.round((sumThisMonth/sumLastMonth - 1) * 100) : 0;

        if (user?.role === "store") {
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
                                                {todayOrders?.length + ' đơn'}
                                            </div>
                                            {this.renderPercent(percentTodayOrders)}
                                        </Col>
                                        <Col span={12}>
                                            <div style={{fontSize: 25}}>
                                                {new Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(this.calcSumValue(todayOrders))}                                            </div>
                                            {this.renderPercent(percentTodayOrdersValue)}
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Tháng Này" bordered={true} className='statistic-card'>
                                    <Row>
                                        <Col span={12}>
                                            <div style={{fontSize: 25}}>
                                                {thisMonthOrders?.length + ' đơn'}
                                            </div>
                                            {this.renderPercent(percentMonthOrders)}
                                        </Col>
                                        <Col span={12}>
                                            <div style={{fontSize: 25}}>
                                                {new Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(this.calcSumValue(thisMonthOrders))}
                                            </div>
                                            {this.renderPercent(percentMonthOrdersValue)}
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
                    {/*<Footer/>*/}
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
