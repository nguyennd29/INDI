import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import { Button, Steps } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import UploadFileView from "./UploadFileView/UploadFileView";
import SearchStoreView from "./SearchStoreView/SearchStoreView";
import InputInfoView from "../InputInfoView/InputInfoView";
const axios = require('axios');

import './printView.scss'
import StatusView from "./StatusView/StatusView";

const { Step } = Steps;

const steps = [
    {
        title: 'Tìm hàng in'
    },
    {
        title: 'Upload file'
    },
    {
        title: 'Trạng thái'
    }
];

class PrintView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0,
            selectedStore: null,
            storeList: [],
            createdOrder: null
        };

    }

    componentDidMount() {
        axios.get('/api/stores')
            .then(response => {
                if (response?.status == 200 && response?.data) {
                    this.setState({
                        storeList: response.data
                    })
                }
            })
            .catch(e => console.log(e));

    }

    nextStep = () => {
        const {currentStep} = this.state;

        if (currentStep < steps.length) {
            this.setState({
                currentStep: currentStep + 1
            });
        }
    };

    previousStep = () => {
        const {currentStep} = this.state;

        if (currentStep > 0) {
            this.setState({
                currentStep: currentStep - 1
            });
        }
    };

    updatePropSelectedStore = (store) => {
        this.setState({
            selectedStore: store
        })
    };

    updatePropCreatedOrder = (order) => {
        this.setState({
            createdOrder: order
        })
    };

    render() {
        const {currentStep, selectedStore, storeList, createdOrder} = this.state;

        return (
            <div>
                <Header />
                <div className="container">
                    <div className="step-container">
                        <Steps current={currentStep}>
                            <Step title="Chọn cửa hàng" description={selectedStore?.storeName}/>
                            <Step title="Tạo đơn hàng" />
                            <Step title="Theo dõi đơn hàng" />
                        </Steps>
                        {/*<div className="steps-action">*/}
                        {/*    {currentStep > 0 && (*/}
                        {/*        <Button*/}
                        {/*            shape="round"*/}
                        {/*            size='large'*/}
                        {/*            className="back-btn"*/}
                        {/*            style={{ margin: '0 8px' }}*/}
                        {/*            onClick={() => this.previousStep()}*/}
                        {/*        >*/}
                        {/*            Back <ArrowLeftOutlined />*/}
                        {/*        </Button>*/}
                        {/*    )}*/}
                        {/*    {currentStep < steps.length - 1 && (*/}
                        {/*        <Button*/}
                        {/*            shape="round"*/}
                        {/*            size='large'*/}
                        {/*            className="next-btn"*/}
                        {/*            type="primary"*/}
                        {/*            onClick={this.nextStep}*/}
                        {/*        >*/}
                        {/*            Next <ArrowRightOutlined />*/}
                        {/*        </Button>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                    </div>

                    <div className="step-component-container">
                        <div className={currentStep === 0 ? "reveal" : "hidden"}>
                            <SearchStoreView
                                storeList={storeList}
                                selectedStore={selectedStore}
                                updatePropSelectedStore={this.updatePropSelectedStore}
                                nextStep={this.nextStep}
                            />
                        </div>
                        <div className={currentStep === 1 ? "reveal" : "hidden"}>
                            <UploadFileView
                                selectedStore={selectedStore}
                                createdOrder={createdOrder}
                                updatePropCreatedOrder={this.updatePropCreatedOrder}
                                nextStep={this.nextStep}
                            />
                        </div>

                        <div className={currentStep === 2 ? "reveal" : "hidden"}>
                            <StatusView
                                createdOrder={createdOrder}
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default PrintView;
