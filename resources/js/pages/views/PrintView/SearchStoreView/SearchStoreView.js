import React from 'react';
import {Button, Select, Modal, Row, Col, Badge, Table, Rate} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import './searchStoreView.scss';

const {Option} = Select;

const printColumns = [
    {
        title: 'Loại in',
        dataIndex: 'print_type',
        key: 'print_type',
    },
    {
        title: 'Loại màu',
        dataIndex: 'color_type',
        key: 'color_type',
    },
    {
        title: 'Số mặt',
        dataIndex: 'page_type',
        key: 'page_type',
    },
    {
        title: 'Số mặt',
        dataIndex: 'page_type',
        key: 'page_type',
    },
    {
        title: 'Cỡ giấy',
        dataIndex: 'paper_size',
        key: 'paper_size',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price_per_page',
        key: 'price_per_page',
        render: text => <a>{text + 'đ/tờ'}</a>
    },
];

const extraColumns = [
    {
        title: 'Dịch vụ',
        dataIndex: 'service_name',
        key: 'service_name',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        render: text => <a>{text + 'đ/bộ'}</a>
    },
];

class SearchStoreView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            storeList: [],
            visible: false,
            currentStore: null
        };
    }

    onClickStore = (currentStore) => {
        this.setState({
            visible: true,
            currentStore: currentStore
        });
    };

    handleOkModel = () => {
        const {currentStore} = this.state;

        this.props.updatePropSelectedStore(currentStore);
        this.setState({
                visible: false
            }
        );
        this.props.nextStep();
    };

    render() {
        const { visible, currentStore } = this.state;
        const {storeList} = this.props;

        const optionsData = storeList.map((store) => {
            return (
                {
                    storeId: store.id,
                    storeName: store.store_name,
                    phone: store.owner.phone,
                    address: store.address,
                    imageUrl: store.logo_image,
                    description: store.introduction,
                    print_services: store.print_services,
                    extra_services: store.extra_services,
                    rating: store.rating ? store.rating : 0
                }
            )
        });

        const options = optionsData.map(option =>
            <Option key={option.storeId}>{option.storeName + ' - ' + option.address}</Option>
        );

        return (
            <div>
                <div className="page-title">
                    Chọn cửa hàng
                </div>
                <div>
                    <span>
                        <Select
                            className="search-store"
                            showSearch
                            placeholder="Tìm cửa hàng, địa chỉ,..."
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            size="large"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {options}
                        </Select>
                        <Button
                            size='large'
                            className="next-btn"
                            type="primary"
                            onClick={() => {
                            }}
                        >
                            <SearchOutlined/>
                        </Button>
                    </span>
                </div>
                <div className='list-store'>
                    {
                        optionsData.map(item => (
                            <div className="store-item" onClick={() => this.onClickStore(item)}>
                                <a className="">
                                    <img
                                        src={item.imageUrl}
                                        alt=""
                                        className="store-image"
                                    />
                                </a>
                                <div className="store-info">
                                    <div>
                                        <a className="store-name">
                                            {item.storeName}
                                        </a>
                                    </div>
                                    <div className="store-item-address">{item.address}</div>
                                    <Rate disabled allowHalf defaultValue={Math.round(item.rating*2)/2} />
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    currentStore ? (
                        <Modal
                            centered
                            visible={visible}
                            onOk={(e) => this.handleOkModel()}
                            onCancel={() => this.setState({visible: false})}
                            width={800}
                            okText='Chọn'
                            cancelText='Huỷ'
                        >

                            <Row>
                                <Col span={10}>
                                    <img
                                        src={currentStore.imageUrl}
                                        alt=""
                                        className="store-image-detail"
                                    />
                                </Col>
                                <Col span={14}>
                                    <div className="store-info-detail">
                                        <div className="store-name-detail">
                                            {currentStore.storeName}
                                        </div>
                                        <div className="store-item-detail-address">{currentStore.address}</div>
                                        <div className="store-item-detail-phone">{'SĐT: ' + currentStore.phone}</div>
                                        <Rate disabled defaultValue={Math.round(item.rating*2)/2}  />
                                        {/*<div className="store-item-detail-introduction">{currentStore.introduction}</div>*/}

                                    </div>
                                </Col>
                            </Row>
                            <div className='store-detail'>
                                <h3 style={{marginBottom: 20}}>Dịch vụ</h3>
                                <Table
                                    dataSource={currentStore.print_services}
                                    columns={printColumns}
                                    pagination={false}
                                />

                                <h3 style={{marginBottom: 20, marginTop: 50}}>Dịch vụ khác</h3>
                                <Table
                                    dataSource={currentStore.extra_services}
                                    columns={extraColumns}
                                    pagination={false}
                                />
                            </div>
                        </Modal>
                    ) : null
                }
            </div>

        );
    }
}

export default SearchStoreView;
