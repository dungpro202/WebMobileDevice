import React, { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createAccountUser, getOrdersByAccountId } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';
import './style.css'

/**
* @author
* @function Account
**/

export const Account = (props) => {

    const account = useSelector(state => state.account);

    const [showCreateModel, setShowCreateModel] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [orderByAccount, setOrderByAccount] = useState([])
    const [showOrderByAccount, setShowOrderByAccount] = useState(false);

    const dispatch = useDispatch();

    const handleCloseCreate = () => setShowCreateModel(false);
    const handleSaveCreate = () => {
        const user = { firstName, lastName, email, password };
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            setShowCreateModel(false)
            return;
        }
        dispatch(createAccountUser(user));

        setShowCreateModel(false)
    }
    const handleShowCreate = () => setShowCreateModel(true);

    const showOrdersByAccountId = (accountId) => {
        setShowOrderByAccount(true)
        const payload = {
            params: {
                accountId,
            },
        };
        dispatch(getOrdersByAccountId(payload))
            .then(response => {
                console.log('response', response)
                setOrderByAccount(response)
            })
    }

    const renderOrdersByAccountId = (orderByAccount) => {
        return (
            <>
                {
                    orderByAccount ?
                        <NewModal
                            show={showOrderByAccount}
                            handleClose={() => setShowOrderByAccount(false)}
                            modalTitle={'Danh Sách Đơn Hàng'}
                            size='lg'
                        >
                            <h3 > {`Tổng số đơn hàng : ${orderByAccount.length}`}</h3>
                            {orderByAccount.map((order, index) => {
                                return <div key={order._id} className="order">
                                    <div className="orderId">Mã đơn hàng: {order._id}</div>
                                    <div className="orderTotal"> Giá Trị :
                                        {
                                            order.items.reduce((temp, item) =>
                                                temp + item.payablePrice * item.purchasedQty
                                                , 0)
                                        }
                                    </div>
                                    <div className="orderPaymentStatus">Trạng Thái: {order.paymentStatus}</div>
                                    {
                                        order.items.map((item, index) => {
                                            return (
                                                <div className="orderDetails" key={index}>
                                                    <div className="itemStt" >{index+1}.</div>
                                                    <div className="itemName" >{item.productId.name}  </div>
                                                    <div className="itemQty">SL: {item.purchasedQty}</div>
                                                    <div className="itemPrice">Giá Tiền: {item.payablePrice}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            })}
                        </NewModal >
                        : null

                }
            </>
        )
    }



    const renderAccounts = () => {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Full Name</th>
                        <th>Xem đơn hàng đã đặt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        account.accounts.length > 0 ?
                            account.accounts.map((account, index) =>
                                <tr key={account._id}>
                                    <td>{index + 1}</td>
                                    <td>{account.email}</td>
                                    <td>{account.firstName}</td>
                                    <td>{account.lastName}</td>
                                    <td>{account.firstName} {account.lastName}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => showOrdersByAccountId(account._id)}
                                        >
                                            Xem đơn hàng
                                        </Button>
                                    </td>
                                    
                                </tr>
                            ) : null
                    }

                </tbody>
            </Table>
        )
    }


    const renderCreateAccountUser = () => {
        return (
            <NewModal
                show={showCreateModel}
                handleClose={handleCloseCreate}
                modalTitle={'Tạo Tài Khoản Khách Hàng Mới'}
                handleSave={handleSaveCreate}
            >
                <Input
                    value={firstName}
                    placeholder={'FirstName'}
                    onChange={(e) => { setFirstName(e.target.value) }}
                />
                <Input
                    value={lastName}
                    placeholder={'LastName'}
                    onChange={(e) => { setLastName(e.target.value) }}
                />
                <Input
                    value={email}
                    placeholder={'Email'}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input
                    value={password}
                    placeholder={'Password'}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </NewModal>
        )
    }

    const renderUpdateAccountUser = () => {
        return (
            <NewModal
                show={showCreateModel}
                handleClose={handleCloseCreate}
                modalTitle={'Tạo Tài Khoản Khách Hàng Mới'}
                handleSave={handleSaveCreate}
            >
                <Input
                    value={firstName}
                    placeholder={'FirstName'}
                    onChange={(e) => { setFirstName(e.target.value) }}
                />
                <Input
                    value={lastName}
                    placeholder={'LastName'}
                    onChange={(e) => { setLastName(e.target.value) }}
                />
                <Input
                    value={email}
                    placeholder={'Email'}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input
                    value={password}
                    placeholder={'Password'}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </NewModal>
        )
    }

    return (
        <Layout sidebar>
            <Container >
                <Row style={{ marginBottom: '50px' }}>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Tài Khoản Khách Hàng</h3>
                            <Button
                                variant="primary"
                                onClick={handleShowCreate}
                            >
                                Tạo Tài Khoản Khách Hàng Mới
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderAccounts()}
                    </Col>
                </Row>
            </Container>

            {renderCreateAccountUser()}

            {renderUpdateAccountUser()}

            {renderOrdersByAccountId(orderByAccount)}

        </Layout>
    )

}