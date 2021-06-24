import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import Header from "../../../components/Header/Header";
import {UploadOutlined} from '@ant-design/icons';
import {
    DatePicker,
    Upload,
    Radio,
    Button,
    Form,
    Input,
    Card,
    notification,
    Select,
    InputNumber,
    Row,
    Col,
    Modal
} from 'antd';
import moment from 'moment';

import './UploadFileView.scss';

const {Option} = Select;
const {Search} = Input;

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const fileItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day').subtract(1, 'days');
}

const checkDate = (_, value) => {
    const now = new Date();
    const due = new Date(value);
    const timeDiff = (due - now) / 60000;
    if (timeDiff >= 5) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Xin chọn thời gian > 5 phút so với hiện tại'));
};

function isVietnamesePhoneNumber(number) {
    return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}

const checkPhone = (_, value) => {
    if (isVietnamesePhoneNumber(value)) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Format số điện thoại không hợp lệ'));
};


const CustomizedForm = (
    {
        onChange,
        fields,
        fileList,
        onFinish,
        handleChange,
        renderItem,
        removeFile,
        getExtraOption,
        totalText,
        finalText,
        getPromoCode,
        promoText
    }) => (
    <Form
        {...layout}
        name="store-register-form"
        className="store-register-form"
        scrollToFirstError={true}
        onValuesChange={(_, allFields) => {
            onChange(allFields);
        }}
        onFinish={onFinish}
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
                label="Số điện thoại"
                name="user_phone"
                type="tel"
                rules={[
                    {required: true, message: 'Xin nhập số điện thoại'},
                    {validator: checkPhone}
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Thời gian nhận dự kiến"
            >
                <Form.Item
                    name="due_at"
                    rules={[
                        {required: true, message: 'Xin nhập thời gian nhận tài liệu'},
                        {validator: checkDate}
                    ]}
                    style={{marginBottom: 0}}
                >
                    <DatePicker
                        showTime format="DD-MM-YYYY HH:mm"
                        showNow={false}
                        minuteStep={5}
                        disabledDate={disabledDate}
                    />
                </Form.Item>
                <div style={{fontStyle: 'italic', color: 'royalblue'}}>{'Nhận tài liệu sau >1h để nhận được nhiều ưu đãi'}</div>

            </Form.Item>
        </div>
        <div className="service-container">
            <Form.Item
                name="files"
                label={"Tải lên file"}
                rules={[{required: true, message: 'Xin tải lên file'}]}
            >
                <Upload
                    name='file'
                    accept='.pdf'
                    multiple={true}
                    action='/api/file'
                    progress={{
                        strokeColor: {
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        },
                        strokeWidth: 3,
                        format: percent => '',
                        success: {percent: '100%'}
                    }}
                    onChange={handleChange}
                    itemRender={renderItem}
                    onRemove={(file) => removeFile(file)}
                    showUploadList={{
                        showRemoveIcon: true,
                        removeIcon: 'Xoá'
                    }}
                >
                    <Button icon={<UploadOutlined/>}>Upload</Button>
                    <div
                        style={{fontStyle: 'italic', color: 'royalblue'}}>{'Tải lên file pdf, dung lượng < 50MB (có thể tải lên nhiều file)'}</div>
                </Upload>
            </Form.Item>
        </div>
        {
            fileList.length > 0 ? (
                <div className='extra-service'>
                    <Form.Item name="extra_services" label="Cách đóng quyển">
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Dập ghim mặc định"
                        >
                            {getExtraOption()}
                        </Select>
                    </Form.Item>
                    {
                        fileList.length > 1 ? (
                            <Form.Item name="extra_type" label="Cách áp dụng" initialValue="EACH">
                                <Radio.Group>
                                    <Radio value="EACH">Áp dụng từng file</Radio>
                                    <Radio value="ALL">Gộp các file thành 1 tệp</Radio>
                                </Radio.Group>
                            </Form.Item>
                        ) : null
                    }
                </div>
            ) : null
        }
        <div className='note'>
            <Form.Item name="note" label="Ghi chú">
                <Input.TextArea rows={2} placeholder="Để lại note nếu có yêu cầu đặc biệt"/>
            </Form.Item>
        </div>
        <div>
            <Form.Item name="code" label="Mã khuyến mãi">
                {/*<Input style={{width: 100}} />*/}
                <Search
                    style={{width: 200}}
                    enterButton="Áp dụng"
                    onSearch={(value) => getPromoCode(value)}
                />
                <div>{promoText}</div>
            </Form.Item>
        </div>
        <div>
            <Form.Item
                label={<div style={{paddingTop: 5}}>Giá tạm tính</div>}
                tooltip="Giá có thể thay đổi theo các dịch vụ thực tế được áp dụng"
            >
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <div style={{fontSize: 18, textDecoration: 'line-through', color: 'grey', marginRight: 10}}>
                        {totalText}
                    </div>
                    <div style={{fontSize: 24}}>{finalText}</div>
                </div>
            </Form.Item>
        </div>
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="create-order-button">
                Tạo đơn hàng
            </Button>
        </Form.Item>
    </Form>
);

class UploadFileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            fields: [],
            promoCode: null
        };
    }

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

        this.setState({fileList: [...fileList]});
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

    updatePromoCodeState = (code) => {
        this.setState({
                promoCode: code
            }
        );
    };

    getPromoCode = (code) => {
        if (!code) return;

        axios.get(`/api/promotion/${code}`)
            .then((response) => {
                if (response?.status === 200) {
                    this.updatePromoCodeState(response.data);

                    notification.success({
                        message: 'Áp dụng mã thành công!'
                    });
                } else {
                    notification.error({
                        message: 'Áp dụng mã thất bại'
                    });
                }
            })
            .catch((error) => {
                const promoCode = {
                    type: '-1'
                };
                this.updatePromoCodeState(promoCode);
                console.log(error);
                notification.error({
                    message: 'Áp dụng mã thất bại'
                });
            });

    };

    renderItem = (originNode, file, currFileList) => {
        const {selectedStore} = this.props;

        const getPrintOption = () => {
            let printServices = selectedStore?.print_services;
            const printType = this.getPrintType();
            if (printType === 'fast') {
                printServices = printServices.filter(item => item.print_type === 'Nhanh');
            }

            if (printType === 'slow') {
                printServices = printServices.filter(item => item.print_type === 'Chậm');
            }

            return printServices.map(item => (
                    <Option value={item.id}>
                        {"In " + item.print_type + ' ' + item.color_type + ' '
                        + item.page_type + ' ' + item.paper_size + ' - ' + item.price_per_page + 'đ/tờ'}
                    </Option>
                )
            );
        };

        const file_id = file?.response?.file?.id;
        const pageCount = file?.response?.file?.page_count;
        if (file_id) {
            return (
                <div>
                    <Card
                        size="small"
                        title={originNode}
                        className='service-item'
                    >
                        <Row className='page-count'>
                            <Col span={6} style={{textAlign: 'right', paddingRight: '10px'}}>Số trang:</Col>
                            <Col span={18}>{pageCount + ' trang'}</Col>
                        </Row>
                        <Form.Item
                            {...fileItemLayout}
                            name={['files', file_id, 'print_service_id']}
                            key={['files', file_id, 'print_service_id']}
                            label="Chọn kiểu in"
                            rules={[{required: true, message: 'Xin chọn kiểu in'}]}
                        >
                            <Select
                                allowClear
                            >
                                {getPrintOption()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            {...fileItemLayout}
                            label="Số lượng"
                        >
                            <Form.Item
                                name={['files', file_id, 'copy_num']}
                                key={['files', file_id, 'copy_num']}
                                rules={[{required: true, message: 'Xin chọn số lượng'}]}
                                noStyle
                            >
                                <InputNumber className='input-num' min={1}/>
                            </Form.Item>
                            <span className="ant-form-text"> Bộ</span>
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
                {item.service_name + ' - ' + item.price + 'đ/1 bộ'}
            </Option>
        ))
    };

    onFinish = (values) => {
        const {fields, fileList, promoCode} = this.state;
        const {selectedStore} = this.props;
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

        const totalFee = this.calcTotalFee(fields, fileList, selectedStore);
        const discount = this.getDiscount(totalFee);

        values.cost = totalFee - discount;
        if (promoCode?.type !== '-1') values.code = promoCode.code;

        axios.post('/api/order', values)
            .then(function (response) {
                if (response?.status === 200) {
                    notification.success({
                        message: 'Tạo đơn hàng thành công!'
                    });
                    window.location.assign(`/order/${response?.data?.id}`)
                } else {
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

    getPrintServiceById = (id, selectedStore) => {
        return selectedStore?.print_services?.find(item => item.id === id);
    };

    convertFilesFromForm = (files, selectedStore, fileList) => {
        if (!files) return null;

        let filesData = [];
        const filesWithPageCount = fileList.map(file => {
            return (
                {
                    id: file?.response?.file?.id,
                    page_count: file?.response?.file?.page_count
                }
            )
        });

        for (const [key, value] of Object.entries(files)) {
            if (key !== 'file' && key !== 'fileList') {
                const print_service = this.getPrintServiceById(value.print_service_id, selectedStore);
                const pageCount = filesWithPageCount.find(item => item.id == key)?.page_count;
                const item = {
                    file_id: key,
                    print_service: print_service,
                    copy_num: value.copy_num,
                    page_count: pageCount
                };

                filesData = [...filesData, item];
            }
        }

        return filesData;
    };

    getExtraServicePriceById = (id, selectedStore) => {
        if (selectedStore?.extra_services?.find(item => item.id === id)?.price) {
            return selectedStore?.extra_services?.find(item => item.id === id)?.price;
        }

        return 0;
    };

    calculateExtraServicesPrice = (fields, fileList, selectedStore) => {
        let totalExtraFee = 0;

        if (fileList?.length > 0 && fields?.extra_services?.length > 0) {
            fields.extra_services.forEach(item => {
                totalExtraFee += this.getExtraServicePriceById(item, selectedStore);
            });

            if (fields.extra_type === 'ALL') {
                let maxCopyNum = 0;
                for (const [key, value] of Object.entries(fields.files)) {
                    if (key !== 'file' && key !== 'fileList' && maxCopyNum < value.copy_num) {
                        maxCopyNum = value.copy_num;
                    }
                }

                return totalExtraFee * maxCopyNum;
            } else {
                let totalCopyNum = 0;
                for (const [key, value] of Object.entries(fields.files)) {
                    if (key !== 'file' && key !== 'fileList') {
                        totalCopyNum += value.copy_num;
                    }
                }

                return totalExtraFee * totalCopyNum;
            }
        }

        return totalExtraFee;
    };

    calculatePrintServicesPrice = (convertedFiles) => {
        let totalPrint = 0;

        if (convertedFiles?.length > 0) {
            convertedFiles.forEach(file => {
                if (file.print_service && file.copy_num) {
                    if (file.print_service.page_type === '2 mặt') {
                        totalPrint += file.print_service.price_per_page * file.copy_num * Math.ceil(file.page_count / 2);
                    } else {
                        totalPrint += file.print_service.price_per_page * file.copy_num * file.page_count;
                    }
                }
            });
        }

        return totalPrint;
    };


    renderPromoText = (promo) => {
        let serviceFeeText = '';
        if (this.getFeeByPrintType() !== null) {
            serviceFeeText = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND'
            }).format(this.getFeeByPrintType());
        }

        if (promo) {
            if (promo.type == '-1') return `Mã không khả dụng`;

            const minCost = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND'
            }).format(promo.min_order_cost);
            const maxCost = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND'
            }).format(promo.max_amount);

            switch (promo.type) {
                case '1':
                    return `Free phí dịch vụ ${serviceFeeText}`;
                case '2':
                    return `Giảm giá ${promo.discount_amount}đ cho đơn từ ${minCost}`;
                case '3':
                    return `Giảm giá ${promo.discount_percent}% cho đơn từ ${minCost}
                    (Tối đa: ${maxCost})`;
                default:
                    return ''
            }
        }

        return '';
    };

    getFeeByPrintType = () => {
        const printType = this.getPrintType();

        switch (printType) {
            case 'fast':
                return 5000;
            case 'slow':
                return 2000;
            default:
                return null;
        }
    };

    getPrintType = () => {
        const {fields} = this.state;

        if (fields?.due_at) {
            const now = new Date();
            const due = new Date(fields?.due_at);
            const timeDiff = (due - now) / 60000;
            if (timeDiff >= 60) {
                return 'slow';
            }
            if (timeDiff > 5) return 'fast';

            return null;
        }

        return null;
    };

    getDiscount = (totalFee) => {
        const {promoCode} = this.state;
        let discount = 0;

        if (promoCode?.type === '1' && this.getFeeByPrintType() !== null) {
            discount = this.getFeeByPrintType();
        }

        if (promoCode?.type === '2' && totalFee >= promoCode?.min_order_cost && promoCode?.discount_amount) {
            discount = promoCode.discount_amount;
        }

        if (promoCode?.type === '3' && totalFee >= promoCode?.min_order_cost
            && promoCode?.discount_percent && promoCode?.max_amount) {
            discount = Math.min(totalFee * promoCode.discount_percent, promoCode?.max_amount);
        }

        return discount;
    };

    calcTotalFee = (fields, fileList, selectedStore) => {
        let totalFee = this.calculateExtraServicesPrice(fields, fileList, selectedStore)
            + this.calculatePrintServicesPrice(this.convertFilesFromForm(fields?.files, selectedStore, fileList));
        if (!totalFee) totalFee = 0;
        let serviceFee = 0;
        if (this.getFeeByPrintType() !== null) {
            serviceFee = this.getFeeByPrintType();
        }

        totalFee = totalFee + serviceFee;

        return totalFee;

    };

    render() {
        const {fileList, fields, promoCode} = this.state;
        const {selectedStore} = this.props;
        const promoText = this.renderPromoText(promoCode);
        const totalFee = this.calcTotalFee(fields, fileList, selectedStore);
        const discount = this.getDiscount(totalFee);
        let totalText = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'VND'}).format(totalFee);
        if (discount === 0) totalText = '';
        const finalText = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND'
        }).format(totalFee - discount);
        return (
            <div>
                <div className="page-title">
                    Tạo đơn hàng
                </div>
                <div className="upload-file-view-container">

                    <CustomizedForm
                        onChange={(newFields) => {
                            this.setState({
                                fields: newFields
                            });
                        }}
                        fileList={fileList}
                        onFinish={(values) => this.onFinish(values)}
                        handleChange={this.handleChange}
                        renderItem={this.renderItem}
                        removeFile={(file) => this.removeFile(file)}
                        getExtraOption={this.getExtraOption}
                        totalText={totalText}
                        finalText={finalText}
                        getPromoCode={this.getPromoCode}
                        promoText={promoText}
                    />

                </div>
            </div>
        );
    }
}

export default UploadFileView;
