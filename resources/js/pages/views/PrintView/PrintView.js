import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import './printView.scss'
import { Button, Steps } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import UploadFileView from "../UploadFileView/UploadFileView";
import SearchStoreView from "../SearchStoreView/SearchStoreView";
import InputInfoView from "../InputInfoView/InputInfoView";

const { Step } = Steps;

const steps = [
    {
        title: 'Upload file'
    },
    {
        title: 'Tìm hàng in'
    },
    {
        title: 'Nhập thông tin'
    },
    {
        title: 'Trạng thái'
    }
];

class PrintView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0
        };
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

    render() {
        const {currentStep} = this.state;

        return (
            <div>
                <Header />
                <div className="container">
                    <div className="step-container">
                        <Steps current={currentStep}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-action">
                            {currentStep > 0 && (
                                <Button
                                    shape="round"
                                    size='large'
                                    className="back-btn"
                                    style={{ margin: '0 8px' }}
                                    onClick={() => this.previousStep()}
                                >
                                    Back <ArrowLeftOutlined />
                                </Button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <Button
                                    shape="round"
                                    size='large'
                                    className="next-btn"
                                    type="primary"
                                    onClick={() => this.nextStep()}
                                >
                                    Next <ArrowRightOutlined />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="step-component-container">
                        <div className={currentStep === 0 ? "reveal" : "hidden"}>
                            <UploadFileView />
                        </div>
                        <div className={currentStep === 1 ? "reveal" : "hidden"}>
                            <SearchStoreView />
                        </div>
                        <div className={currentStep === 2 ? "reveal" : "hidden"}>
                            <InputInfoView />
                        </div>
                        <div className={currentStep === 3 ? "reveal" : "hidden"}>
                            {/*<UploadFileView />*/}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default PrintView;
