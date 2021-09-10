import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { authConstants } from '../../actions/constants';
import Layout from '../../components/Layout';
import './style.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

/**
* @author
* @function Home
**/

const Home = (props) => {

    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const receipt = useSelector(state => state.receipt)
    const order = useSelector(state => state.order)

    // totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
    //     return qty + cart.cartItems[key].qty;
    // }, 0)}
    let totalReceipt =
        receipt.receipts.reduce((totalReceipt, item) => {
            return totalReceipt + item.totalAmount
        }, 0)

    let totalOrder =
        order.orders.reduce((totalOrder, item) => {

            return totalOrder + item.totalAmount
        }, 0)


    console.log(`Order`, totalReceipt)

    return (
        <Layout sidebar>
            <Container >
                <Row>
                    <Col>
                        <h5>Tổng Số Tiền Nhập Kho: {formatCash(totalReceipt)} ₫</h5>
                    </Col>

                    <Col>
                        <h5>Tổng Số Tiền Xuất Kho: {formatCash(totalOrder)} ₫</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Lợi Nhuận {formatCash(totalOrder - totalReceipt)} ₫</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Thống Kê</h3>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <h3>+++++++</h3>
                    </Col>

                </Row>


            </Container>

        </Layout>
    )

}

export default Home