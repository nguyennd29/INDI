import React from 'react';
import {Collapse, List, Avatar, Timeline, Button, Select, Modal, Row, Col, Badge, Table, Rate, Card, Form} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import './statusView.scss';

const { Panel } = Collapse;

class StatusView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    getPrintOption = (item) => {
        return (
            <span>
                {"In " + item.print_type + ' ' + item.color_type + ' '
                + item.page_type + ' ' + item.paper_size + ' - ' + item.price_per_page +'đ/trang'}
            </span>
        );
    };

    getServiceType = () => {
        const {createdOrder} = this.props;

        if (createdOrder.extra_services?.length > 0 && createdOrder.files?.length > 1) {
            const type = createdOrder.extra_services[0].pivot?.type;

            return type === 'ALL' ? ' - Gộp các file làm một' : ' - Áp dụng từng file';
        }

        return ('');
    };

    render() {
        // const {  } = this.state;
        const {createdOrder} = this.props;
        console.log(createdOrder);

        if (!createdOrder) {
            return '';
        }

        return (
            <div className="status-view-container">
                <div className='order-code'>
                    Đơn hàng: #{createdOrder.id}
                </div>
                <div className='order-status'>
                    Trạng thái: Đã Tiếp Nhận
                </div>
                <div className='order-code'>
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
                                        avatar={<Avatar shape='square' size='large' src="/images/pdf.png" />}
                                        title={<a style={{color: '#1890ff'}} href="#">{item.file_name}</a>}
                                        description={<div>{item.copy_num} bản - {this.getPrintOption(item.print_service)}</div>}
                                    />
                                </List.Item>
                            )}
                        />

                    </Panel>
                    <Panel header={createdOrder?.extra_services?.length + ' dịch vụ khác' + this.getServiceType()} key="2">
                        {
                            createdOrder?.extra_services?.length > 0 ? (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={createdOrder?.extra_services}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<div>{item.service_name + ' - ' + item.price + 'đ/bộ'}</div>}
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
                    <Button danger className='cancel-button'>Huỷ đơn hàng</Button>
                </div>
            </div>

        );
    }
}

export default StatusView;
