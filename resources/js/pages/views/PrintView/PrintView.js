import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import {Button, Steps} from 'antd';
import {ArrowRightOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import UploadFileView from "./UploadFileView/UploadFileView";
import SearchStoreView from "./SearchStoreView/SearchStoreView";
import InputInfoView from "../InputInfoView/InputInfoView";

const axios = require('axios');

import './printView.scss'
import StatusView from "./StatusView/StatusView";
import Footer from "../../components/Footer/Footer";

const {Step} = Steps;

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

    updatePropSelectedStore = (store) => {
        this.setState({
            selectedStore: store
        })
    };

    render() {
        const {currentStep, selectedStore, storeList} = this.state;

        return (
            <div>
                <Header/>
                <div>
                    <div className="body-container">
                        <div className="step-container">
                            <Steps current={currentStep}>
                                <Step title="Chọn cửa hàng" description={selectedStore?.storeName}/>
                                <Step title="Tạo đơn hàng"/>
                                <Step title="Theo dõi đơn hàng"/>
                            </Steps>
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
                                />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrintView;
