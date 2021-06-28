import React from 'react';
import {
    Collapse,
    List,
    Avatar,
    Timeline,
    Button,
    Modal,
    notification,
    Steps,
    Row,
    Col, Form, Input,
    Rate
} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import './statusView.scss';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import moment from "moment";

const {Panel} = Collapse;

const {Step} = Steps;

class StatusView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            createdOrder: null
        };
    }

    componentDidMount() {
        const {match} = this.props;
        const orderId = match?.params?.orderId;
        this.getOrder(orderId);

        this.interval = setInterval(() => {
            this.getOrder(orderId);
        }, 5000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.createdOrder?.status && this.state.createdOrder?.status !== prevState.createdOrder?.status) {
            if (this.state.createdOrder?.status === 'PRINTED') {
                this.onPrinted(this.state.createdOrder);
            }

            if (this.state.createdOrder?.status === 'PICKED') {
                this.onPicked(this.state.createdOrder);
            }

            if (this.state.createdOrder?.status === 'CANCELED') {
                this.onCanceled(this.state.createdOrder);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onCanceled = (order) => {
        Modal.error({
            title: 'Đơn hàng đã huỷ',
            content: this.cancelContent(order),
            width: 600,
            className: 'printed-container',
            onOk: () => window.location.assign('/print')
        });
    };

    cancelContent = (order) => {
        return (
            <div style={{marginTop: 15}}>
                <div>Xin lỗi quý khách, cửa hàng không thể tiếp tục thực hiện đơn hàng này.</div>
                <div>Nếu có thắc mắc, xin liên hệ cửa hàng:</div>

                <div className='store-info-text'>
                    <div className='order-info-item'>
                        <div className='order-item-title'>Cửa Hàng:</div>
                        <div>{order?.store?.store_name}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-item-title'>Địa Chỉ:</div>
                        <div>{order?.store?.address}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-item-title'>SĐT:</div>
                        <div>{order?.store?.owner?.phone}</div>
                    </div>
                </div>
            </div>
        )
    };

    printedContent = (order) => {
        return (
            <div style={{marginTop: 15}}>
                <div>Xin hãy đến cửa hàng lấy tài liệu!</div>
                <div className='store-info-text'>
                    <div className='order-info-item'>
                        <div className='order-item-title'>Cửa Hàng:</div>
                        <div>{order?.store?.store_name}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-item-title'>Địa Chỉ:</div>
                        <div>{order?.store?.address}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-item-title'>SĐT:</div>
                        <div>{order?.store?.owner?.phone}</div>
                    </div>
                </div>

            </div>
        )
    };

    onPrinted = (order) => {
        Modal.success({
            title: 'In tài liệu hoàn tất',
            content: this.printedContent(order),
            width: 600,
            className: 'printed-container',
        });
    };

    pickedContent = (order) => {
        return (
            <Form
                name="feedback-form"
                labelCol={{span: 6}}
                wrapperCol={{span: 16}}
                onFinish={this.onFinish}
            >
                <Form.Item
                    label="Đã thanh toán:"
                    style={{marginTop: 20, marginBottom: 10}}
                >
                    <div style={{fontSize: 22}}>
                        {new Intl.NumberFormat('de-DE', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(order.cost)}
                    </div>
                </Form.Item>
                <Form.Item
                    name="rate"
                    label="Đánh Giá"
                    rules={[{required: true, message: 'Xin đánh giá dịch vụ'}]}
                >
                    <Rate/>
                </Form.Item>
                    <Form.Item name="feedback" label="Feedback">
                        <Input.TextArea rows={2} placeholder="Xin chia sẻ cảm nhận về dịch vụ"/>
                    </Form.Item>
                <Button type="primary" htmlType="submit" className="submit-feedback-btn">
                    Gửi
                </Button>
                <div className='warning-text'>Nếu chưa nhận tài liệu, liên hệ cửa hàng: {order?.store?.owner?.phone}</div>
            </Form>
        )
    };

    onPicked = (order) => {
        Modal.destroyAll();
        Modal.success({
            title: 'Đơn hàng hoàn tất',
            content: this.pickedContent(order),
            className: 'picked-container',
            closable: true,
            width: 600
        });
    };

    getOrder = (orderId) => {
        axios.get(`/api/order/${orderId}`)
            .then(response => {
                if (response?.status == 200 && response?.data) {
                    if (this.state.createdOrder?.status !== response.data?.status) {
                        this.setState({
                            createdOrder: response.data
                        });
                    }
                }
            })
            .catch(e => console.log(e));
    };

    renderStatusText = (type) => {
        switch (type) {
            case 'CANCELED':
                return 'Đã Huỷ';
            case 'CREATED':
                return 'Đã Tạo Đơn';
            case 'RECEIVED':
                return 'Đã Nhận Đơn';
            case 'PROCESSING':
                return 'Đang In';
            case 'PRINTED':
                return 'In Hoàn Tất';
            case 'PICKED':
                return 'Đã Nhận Hàng';
            default:
                return '';
        }
    };

    getPrintOption = (item) => {
        return (
            <span>
                {"In " + item.print_type + ' ' + item.color_type + ' '
                + item.page_type + ' ' + item.paper_size + ' - ' + item.price_per_page + 'đ/tờ'}
            </span>
        );
    };

    getServiceType = () => {
        const {createdOrder} = this.state;

        if (createdOrder.extra_services?.length > 0 && createdOrder.files?.length > 1) {
            const type = createdOrder.extra_services[0].pivot?.type;

            return type === 'ALL' ? ' - Gộp các file làm một' : ' - Áp dụng từng file';
        }

        return ('');
    };

    handleButtonRequest = (orderId, type) => {
        axios.post(`/api/order/${type}/${orderId}`)
            .then(function (response) {
                if (response?.status === 200) {
                    notification.success({
                        message: 'Huỷ đơn hàng thành công'
                    });
                    window.location.assign('/print')
                } else {
                    notification.error({
                        message: 'Thao tác thất bại!'
                    });
                }
            })
            .catch(function () {
                notification.error({
                    message: 'Thao tác thất bại!'
                });
            });
    };

    onCancel = (order) => {
        Modal.confirm({
            title: 'Xác nhận huỷ đơn hàng',
            content: <div>Bạn có chắc chắn muốn huỷ đơn hàng?</div>,
            onOk: () => this.handleButtonRequest(order.id, 'cancel'),
            onCancel() {
            },
            okText: 'Xác Nhận',
            cancelText: 'Quay lại'
        });
    };

    redirectHome = () => {
        window.location.assign('/');
    };

    onFinish = (values) => {
        values.order_id = this.state.createdOrder?.id;

        axios.post('/api/order/feedback', values)
            .then(function (response) {
                if (response?.status === 200) {
                    Modal.destroyAll();
                    notification.success({
                        message: 'Gửi feedback thành công!'
                    });
                } else {
                    notification.error({
                        message: 'Gửi feedback thất bại!'
                    });
                }
            })
            .catch(function (error) {
                notification.error({
                    message: 'Gửi feedback thất bại!'
                });
            });
    };


    render() {
        const {createdOrder} = this.state;
        console.log(createdOrder);
        const selectedStore = createdOrder?.store;

        if (!createdOrder) {
            return '';
        }

        return (
            <div>
                <Header/>
                <div>
                    <div className="status-body-container">
                        <div className="step-container">
                            <Steps current={2}>
                                <Step title="Chọn cửa hàng" description={selectedStore?.storeName}/>
                                <Step title="Tạo đơn hàng"/>
                                <Step title="Theo dõi đơn hàng"/>
                            </Steps>
                        </div>
                        <div className="step-component-container">
                            <div className="status-view-container">
                                <div className='order-status'>
                                    {'Đơn Hàng: #' + (createdOrder.id)}
                                </div>
                                <div className='order-info'>
                                    <Row>
                                        <Col span={12}>
                                            <div className='order-info-item'>
                                                <div className='order-item-title2'>Giá dự tính:</div>
                                                <div>{new Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(createdOrder.cost)}</div>
                                            </div>
                                            <div className='order-info-item'>
                                                <div className='order-item-title2'>Mã KM:</div>
                                                <div>{createdOrder.code}</div>
                                            </div>
                                            <div className='order-info-item'>
                                                <div className='order-item-title2'>Thời gian dự kiến:</div>
                                                <div>{createdOrder.due_at}</div>
                                            </div>
                                            <div className='order-info-item'>
                                                <div className='order-item-title2'>Trạng thái:</div>
                                                <div>{this.renderStatusText(createdOrder.status)}</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className='order-info-item'>
                                                <div className='order-item-title'>Cửa Hàng:</div>
                                                <div>{createdOrder?.store?.store_name + ' - ' + createdOrder?.store?.owner?.phone}</div>
                                            </div>
                                            <div className='order-info-item'>
                                                <div className='order-item-title'>Địa Chỉ:</div>
                                                <div>{createdOrder?.store?.address}</div>
                                            </div>
                                            <div className='order-info-item'>
                                                <div className='order-item-title'>Khách Hàng:</div>
                                                <div>{createdOrder.user_name + ' - ' + createdOrder.user_phone}</div>
                                            </div>
                                            <div className='order-info-item'>
                                                <div className='order-item-title'>Note:</div>
                                                <div>{createdOrder.note}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>


                                <Collapse defaultActiveKey={['1', '2']}
                                          expandIconPosition='right'>
                                    <Panel header={createdOrder.files.length + ' files'}
                                           key="1">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={createdOrder.files}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar shape='square'
                                                                        size='large'
                                                                        src="/images/pdf.png"/>}
                                                        title={<a style={{color: '#1890ff'}}
                                                                  href={item.url}
                                                                  target="_blank">{item.file_name}</a>}
                                                        description={<div>{item.copy_num} bản
                                                            - {this.getPrintOption(item.print_service)}</div>}
                                                    />
                                                </List.Item>
                                            )}
                                        />

                                    </Panel>
                                    <Panel
                                        header={createdOrder?.extra_services?.length + ' dịch vụ khác' + this.getServiceType()}
                                        key="2">
                                        {
                                            createdOrder?.extra_services?.length > 0 ? (
                                                <List
                                                    itemLayout="horizontal"
                                                    dataSource={createdOrder?.extra_services}
                                                    renderItem={item => (
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                title={
                                                                    <div>{item.service_name + ' - ' + item.price + 'đ/bộ'}</div>}
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            ) : (
                                                <div>Dập ghim mặc định</div>
                                            )
                                        }
                                    </Panel>
                                </Collapse>
                                <div className='cancel-button-container'>
                                    {
                                        createdOrder?.status === 'PICKED'
                                        || createdOrder?.status === 'CANCELED'
                                        ? (
                                            <div>
                                                <Button
                                                    type='primary'
                                                    className='cancel-button'
                                                    onClick={() => this.onPicked(createdOrder)}
                                                    style={{marginRight: 20}}
                                                >
                                                    Đánh giá
                                                </Button>
                                                <Button
                                                    type='primary'
                                                    className='cancel-button'
                                                    onClick={this.redirectHome}
                                                >
                                                    Về trang chủ
                                                </Button>
                                            </div>
                                            ) : (
                                                <Button
                                                    danger
                                                    type='primary'
                                                    className='cancel-button'
                                                    onClick={() => this.onCancel(createdOrder)}
                                                    disabled={!(createdOrder.status === 'CREATED' || createdOrder.status === 'RECEIVED')}
                                                >
                                                    Huỷ đơn hàng
                                                </Button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default StatusView;
