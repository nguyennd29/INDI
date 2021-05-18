import React from 'react';
import {Button, Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
import './searchStoreView.scss';

class SearchStoreView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            storeList: []
        };
    }

    render() {
        // const { } = this.state;
        const optionsData = [
            {
                storeId: 1,
                storeName: 'in minh chau',
                phone: '09123',
                address: 'Pho Huyen - Quoc Oai - Ha Noi',
                imageUrl: 'asda',
                description: 'test description',
                services: []
            },
            {
                storeId: 2,
                storeName: 'in hoa phat',
                phone: '09123',
                address: 'Thach Than - Quoc Oai - Ha Noi',
                imageUrl: 'asda',
                description: 'test description',
                services: []
            },
            {
                storeId: 3,
                storeName: 'in tien dat',
                phone: '09123',
                address: 'Tran Dai Nghia',
                imageUrl: 'asda',
                description: 'test description',
                services: []
            }
        ];
        const options = optionsData.map(option =>
            <Option key={option.storeId}>{option.storeName}</Option>
        );


        return (
            <div>
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
                            onClick={() => {}}
                        >
                            <SearchOutlined />
                        </Button>
                    </span>
                </div>
                <div className='list-store'>
                    {
                        optionsData.map(item => (
                            <div className='list-store-item'>
                                <img
                                    src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/183250776_2959240077687146_1137825167377866414_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=v8taho7wu5sAX8GPpBh&_nc_ht=scontent.fhan4-1.fna&oh=d23f008271ea45923f3b1b652c665a45&oe=60C04157"
                                    alt=""
                                    className="store-item-image"
                                />
                                <div className="store-item-info">
                                    <div className="store-item-name">{item.storeName}</div>
                                    <div className="store-item-address">{item.address}</div>
                                    <div className="store-item-description">{item.description}</div>
                                    <div className="store-item-phone">SĐT: {item.phone}</div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        );
    }
}

export default SearchStoreView;
