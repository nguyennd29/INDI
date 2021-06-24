import React from 'react';
import {
    Collapse,
    List,
    Avatar,
    Timeline,
    Button,
    Modal,
    notification,
    Steps
} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import './statusView.scss';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

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

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getOrder = (orderId) => {
        axios.get(`/api/order/${orderId}`)
            .then(response => {
                if (response?.status == 200 && response?.data) {
                    this.setState({
                        createdOrder: response.data
                    })
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
                + item.page_type + ' ' + item.paper_size + ' - ' + item.price_per_page + 'đ/trang'}
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
                    <div className="body-container">

                        <div className="step-container">
                            <Steps current={2}>
                                <Step title="Chọn cửa hàng" description={selectedStore?.storeName}/>
                                <Step title="Tạo đơn hàng"/>
                                <Step title="Theo dõi đơn hàng"/>
                            </Steps>
                        </div>
                        <div className="step-component-container">
                            <div className="status-view-container">
                                <div className='order-code'>
                                    Đơn hàng: #{createdOrder.id}
                                </div>
                                <div className='order-status'>
                                    {'Trạng thái: ' + this.renderStatusText(createdOrder.status)}
                                </div>
                                {/*<div className='order-store'>*/}
                                {/*    Cửa Hàng: {createdOrder.store.store_name + ' - ' + createdOrder.store.}*/}
                                {/*</div>*/}
                                <div className='order-customer'>
                                    Khách hàng: {createdOrder.user_name + ' - ' + createdOrder.user_phone}
                                </div>
                                <Collapse defaultActiveKey={['1', '2']} expandIconPosition='right'>
                                    <Panel header={createdOrder.files.length + ' files'} key="1">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={createdOrder.files}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar shape='square' size='large'
                                                                        src="/images/pdf.png"/>}
                                                        title={<a style={{color: '#1890ff'}} href={item.url}
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
                                    <Button danger className='cancel-button'
                                            onClick={() => this.onCancel(createdOrder)}>Huỷ đơn hàng</Button>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusView;
