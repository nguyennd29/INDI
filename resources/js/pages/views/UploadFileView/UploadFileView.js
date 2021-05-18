import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../../components/Header/Header";
import { InboxOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';

import './uploadFileView.scss';


const { Dragger } = Upload;

class UploadFileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            uploading: false,
        };
    }

    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true
        });
    };

    render() {
        const { uploading, fileList } = this.state;

        const uploadProps = {
            name: 'file',
            multiple: true,
            // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            // onChange(info) {
            //     const { status } = info.file;
            //     if (status !== 'uploading') {
            //         console.log(info.file, info.fileList);
            //     }
            //     if (status === 'done') {
            //         // message.success(`${info.file.name} file uploaded successfully.`);
            //     } else if (status === 'error') {
            //         // message.error(`${info.file.name} file upload failed.`);
            //     }
            // },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            showUploadList: {
                showRemoveIcon: true
            },
        };


        return (
            <div>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        );
    }
}

export default UploadFileView;
