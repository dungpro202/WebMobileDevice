import React, { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createAccountUser } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';

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
                        <th>Số lượng đơn hàng</th>
                        <th>Xem đơn hàng</th>
                        <th>Chỉnh Sửa</th>
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
                                    <td>----</td>
                                    <td>
                                        <Button variant="primary">
                                            Xem
                                        </Button>
                                    </td>
                                    <td>
                                        <Button 
                                        variant="primary"
                                        onClick={()=>{}}
                                        >

                                            Update
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

        </Layout>
    )

}