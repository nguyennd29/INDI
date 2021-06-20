import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import Header from "../../../components/Header/Header";
import { UploadOutlined } from '@ant-design/icons';
import {Upload, Radio, Button, Form, Input, Card, notification, Select, InputNumber} from 'antd';

import './UploadFileView.scss';

const {Option} = Select;

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const fileItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class UploadFileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileList: []
        };
    }

    // countPage = file => {
    //     let reader = new FileReader();
    //     let count = 0;
    //     reader.readAsBinaryString(file);
    //     reader.onloadend = function(){
    //         let count2 = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
    //         return function (e) { // return handler function for 'onload' event
    //
    //             var data = this.result; // do some thing with data
    //             console.log('data',data);
    //
    //         }
    //     };
    //
    //     return count;
    // };

    handleChange = info => {
        if (info.file.status === 'done') {
            notification.success({
                message: `File ${info.file.name} tải lên thành công`
            });
        } else if (info.file.status === 'error') {
            notification.error({
                message: `File ${info.file.name} tải lên thất bại`
            });
        }

        let fileList = [...info.fileList];

        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response?.file?.url;
            }
            return file;
        });

        this.setState({ fileList: [...fileList] });
    };

    removeFile = (file) => {
        const {fileList} = this.state;
        const data = {};
        data['fileName'] = file?.response?.file?.file_name;
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);

        if (data['fileName']) {
            axios.post('/api/file/delete', data);
        }
        this.setState({
            fileList: newFileList
        });
    };

    renderItem = (originNode, file, currFileList) => {
        const {selectedStore} = this.props;

        const getPrintOption = () => {
            return selectedStore?.print_services.map(item => (
                <Option value={item.id}>
                    {"In " + item.print_type + ' ' + item.color_type + ' '
                    + item.page_type + ' ' + item.paper_size + ' - ' + item.price_per_page +'đ/trang'}
                </Option>
            ))
        };

        const file_id = file?.response?.file?.id;

        if (file_id) {
            return (
                <div>
                    <Card
                        size="small"
                        title={originNode}
                        className='service-item'
                    >
                        <Form.Item
                            {...fileItemLayout}
                            name={['files', file_id, 'print_service_id']}
                            key={['files', file_id, 'print_service_id']}
                            label="Chọn kiểu in"
                            rules={[{ required: true, message: 'Xin chọn kiểu in' }]}
                        >
                            <Select
                                allowClear
                            >
                                {getPrintOption()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            {...fileItemLayout}
                            name={['files', file_id, 'copy_num']}
                            key={['files', file_id, 'copy_num']}
                            label="Số lượng"
                            rules={[{ required: true, message: 'Xin chọn số lượng' }]}
                        >
                            <InputNumber className='input-num' min={1}/>
                        </Form.Item>
                    </Card>
                </div>
            );
        }

        return '';
    };

    getExtraOption = () => {
        const {selectedStore} = this.props;

        return selectedStore?.extra_services?.map(item => (
            <Option value={item.id}>
                {item.service_name + ' - ' + item.price +'đ/1 bộ'}
            </Option>
        ))
    };

    onFinish = (values) => {
        console.log(values);
        const {selectedStore, nextStep, updatePropCreatedOrder} = this.props;
        let filesData = [];
        for (const [key, value] of Object.entries(values.files)) {
            if (key !== 'file' && key !== 'fileList') {
                const item = {
                    file_id: key,
                    print_service_id: value.print_service_id,
                    copy_num: value.copy_num
                };

                filesData = [...filesData, item];
            }
        }

        values.filesData = filesData;
        values.store_id = selectedStore.storeId;

        axios.post('/api/order', values)
            .then(function (response) {
                if (response?.status === 200) {
                    updatePropCreatedOrder(response.data);
                    notification.success({
                        message: 'Tạo đơn hàng thành công!'
                    });
                    nextStep();
                }
                else {
                    notification.error({
                        message: 'Tạo đơn hàng thất bại!'
                    });
                }
            })
            .catch(function (error) {
                notification.error({
                    message: 'Tạo đơn hàng thất bại!'
                });
            });
    };

    render() {
        const { fileList } = this.state;
        const uploadProps = {
            name: 'file',
            accept: '.pdf',
            multiple: true,
            action: '/api/file',
            progress: {
                strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                },
                strokeWidth: 3,
                format: percent => '',
                success: {percent: '100%'}
            },
            onChange: this.handleChange,
            itemRender: this.renderItem,
            onRemove: (file) => this.removeFile(file),
            showUploadList: {
                showRemoveIcon: true,
                removeIcon: 'Xoá'
            }
        };

        return (
            <div>
            <div className="page-title">
                Tạo đơn hàng
            </div>
            <div className="upload-file-view-container">
                <Form
                    {...layout}
                    name="store-register-form"
                    className="store-register-form"
                    onFinish={this.onFinish}
                >
                    <div className="user-info-container">
                        <Form.Item
                            label="Tên khách hàng"
                            name="user_name"
                            rules={[{required: true, message: 'Xin nhập tên khách hàng'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={"Số điện thoại"}
                            name="user_phone"
                            type="tel"
                            rules={[{required: true, message: 'Xin nhập số điện thoại'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className="service-container">
                        <Form.Item
                            name="files"
                            label={"Tải lên file"}
                            rules={[{required: true, message: 'Xin tải lên file'}]}
                        >
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                        </Form.Item>
                    </div>
                    {
                        fileList.length > 0 ? (
                            <div className='extra-service'>
                                <Form.Item name="extra_services" label="Chọn dịch vụ bổ sung">
                                    <Select
                                        mode="multiple"
                                        allowClear
                                    >
                                        {this.getExtraOption()}
                                    </Select>
                                </Form.Item>
                                {
                                    fileList.length > 1 ? (
                                        <Form.Item name="extra_type" label="Cách áp dụng" initialValue="EACH">
                                            <Radio.Group>
                                                <Radio value="EACH">Áp dụng từng file</Radio>
                                                <Radio value="ALL">Gộp các file làm một</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    ) : null
                                }
                            </div>
                        ) : null
                    }
                    <div className='note'>
                        <Form.Item name="note" label="Ghi chú">
                            <Input.TextArea rows={2}/>
                        </Form.Item>
                    </div>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" className="create-order-button">
                            Tạo đơn hàng
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            </div>
        );
    }
}

export default UploadFileView;
