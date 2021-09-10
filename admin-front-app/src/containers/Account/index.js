import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createAccountUser, getOrdersByAccountId } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
* @author
* @function Account
**/

export const Account = (props) => {

    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');


    const account = useSelector(state => state.account);

    const [showCreateModel, setShowCreateModel] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [orderByAccount, setOrderByAccount] = useState([])
    const [showOrderByAccount, setShowOrderByAccount] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (account.notification) {
            toast(account.notification);
        }
    }, [account.notification])

    const handleCloseCreate = () => setShowCreateModel(false);
    const handleSaveCreate = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, email, password };
        
        // switch (firstName) {
        //     case "":
        //         toast('FirstName không được để trống');
        //         return;
        //     case firstName.length>5:
        //         toast('FirstName không được để quá 50 kí tự');
        //         return;
        //     default:
        //         break;

        // }
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            toast('Không được để trống');
             //setShowCreateModel(false)
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
        console.log('renderOrdersByAccountId', orderByAccount)
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
                                        {formatCash(
                                            order.record.itemRecords.reduce((temp, item) =>
                                                temp + item.productPrice * item.productQty
                                                , 0)
                                        )}₫
                                    </div>
                                    <div className="orderPaymentStatus">Trạng Thái: {order.paymentStatus}</div>
                                    {
                                        order.record.itemRecords.map((item, index) => {
                                            return (
                                                <div className="orderDetails" key={index}>
                                                    <div className="itemStt" >{index + 1}.</div>
                                                    <div className="itemName" >{item.productName}  </div>
                                                    <div className="itemQty">SL: {item.productQty}</div>
                                                    <div className="itemPrice">Giá Tiền: {formatCash(item.productPrice)} ₫</div>
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
                    // errorMessage={'no no'}
                />
                <Input
                    value={email}
                    type={'email'}
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

    // const renderUpdateAccountUser = () => {
    //     return (
    //         <NewModal
    //             show={showCreateModel}
    //             handleClose={handleCloseCreate}
    //             modalTitle={'Cập Nhật Tài Khoản Khách Hàng Mới'}
    //             handleSave={handleSaveCreate}
    //         >
    //             <Input
    //                 value={firstName}
    //                 placeholder={'FirstName'}
    //                 onChange={(e) => { setFirstName(e.target.value) }}
    //             />
    //             <Input
    //                 value={lastName}
    //                 placeholder={'LastName'}
    //                 onChange={(e) => { setLastName(e.target.value) }}
    //             />
    //             <Input
    //                 value={email}
    //                 placeholder={'Email'}
    //                 onChange={(e) => { setEmail(e.target.value) }}
    //             />
    //             <Input
    //                 value={password}
    //                 placeholder={'Password'}
    //                 onChange={(e) => { setPassword(e.target.value) }}
    //             />
    //         </NewModal>
    //     )
    // }

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

            {/* {renderUpdateAccountUser()} */}

            {renderOrdersByAccountId(orderByAccount)}


            <ToastContainer />

        </Layout>
    )

}