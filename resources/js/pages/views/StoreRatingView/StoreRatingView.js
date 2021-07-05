import React from 'react';
import {
    Collapse,
    List,
    Tooltip,
    Comment,
    Row,
    Col, Form, Input,
    Rate, Table
} from 'antd';
import './storeRatingView.scss';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import moment from "moment";



class StoreRatingView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            store: null
        };
    }

    componentDidMount() {
        const {match} = this.props;
        const storeId = match?.params?.storeId;
        this.getStore(storeId);

    }

    getStore = (storeId) => {
        axios.get(`/api/stores/${storeId}`)
            .then(response => {
                if (response?.status == 200 && response?.data) {
                    const storeData = response.data;
                    storeData.orders = storeData.orders.filter(item => item.rating != null);

                    this.setState({
                        store: storeData
                    });
                }
            })
            .catch(e => console.log(e));
    };

    renderContent = (order) => {
        return (
            <div>
                <Rate disabled allowHalf defaultValue={order?.rating}  />
                <div>{order?.comment}</div>
            </div>
        )
    };

    renderRating = (rate) => {
        return (
            <div style={{display: 'flex', alignItems: 'baseline'}}>
                <Rate disabled allowHalf defaultValue={Math.round(rate*2)/2}  />
                <div style={{marginLeft: 10}}>{Number(rate).toFixed(1)}/5</div>
            </div>
        )
    };

    render() {
        const {store} = this.state;

        console.log(store);
        if (!store) return null;

        return (
            <div className='store'>
                <Header/>
                    <div className="store-component-container">
                        <Row>
                            <Col span={10}>
                                <img
                                    src={store.logo_image}
                                    alt=""
                                    className="store-image-detail"
                                />
                            </Col>
                            <Col span={14}>
                                <div className="store-info-detail">
                                    <div className="store-name-detail">
                                        {store.store_name}
                                    </div>
                                    <div className="store-item-detail-address">{store.address}</div>
                                    <div className="store-item-detail-phone">{'SĐT: ' + store.owner.phone}</div>
                                    <div>{this.renderRating(store.rating)}</div>
                                </div>
                            </Col>
                        </Row>
                        <List
                            className="comment-list"
                            header={`${store.orders.length} Đánh giá:`}
                            itemLayout="horizontal"
                            dataSource={store.orders}
                            style={{marginTop: 20}}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        author={item.user_name}
                                        content={this.renderContent(item)}
                                        datetime={moment(item.updated_at).locale('vi').format('hh:mm DD/MM/YYYY')}
                                    />
                                </li>
                            )}
                        />
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default StoreRatingView;
