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

    renderFile = (fileName) => {
        return <a href='#'>{fileName}</a>
    };

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

        if (createdOrder.extraServices && createdOrder.extraServices.length > 2) {
            const type = extraServices[0].pivot?.type;

            return type === 'ALL' ? 'Gộp các file làm một' : 'Áp dụng từng file';
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
                <div className='order-status'>
                    Trạng thái: Đã Tiếp Nhận
                </div>
                <div className='order-code'>
                    Mã đơn hàng: #{createdOrder.id}
                </div>
                <Collapse defaultActiveKey={['1', '2']}>
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
                        {/*<Card*/}
                        {/*    size="small"*/}
                        {/*    title={this.renderFile('DATN_Nguyen_Duy_Nguyen.pdf')}*/}
                        {/*    className='file-item'*/}
                        {/*>*/}
                        {/*    <div>2 bộ - In nhanh đen trắng 2 mặt A4</div>*/}
                        {/*</Card>*/}
                        {/*<Card*/}
                        {/*    size="small"*/}
                        {/*    title={this.renderFile('DATN_Nguyen_Duy_Nguyen.pdf')}*/}
                        {/*    className='file-item'*/}
                        {/*>*/}
                        {/*    <div>2 bộ - In nhanh đen trắng 2 mặt A4</div>*/}
                        {/*</Card>*/}
                        {/*<Card*/}
                        {/*    size="small"*/}
                        {/*    title={this.renderFile('DATN_Nguyen_Duy_Nguyen.pdf')}*/}
                        {/*    className='file-item'*/}
                        {/*>*/}
                        {/*    <div>2 bộ - In nhanh đen trắng 2 mặt A4</div>*/}
                        {/*</Card>*/}
                    </Panel>
                    <Panel header={createdOrder?.extra_services?.length + ' - ' + this.getServiceType()} key="2">
                        <List
                            itemLayout="horizontal"
                            dataSource={createdOrder.files}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<div>Đóng bìa xanh chữ màu</div>}
                                    />
                                </List.Item>
                            )}
                        />

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
