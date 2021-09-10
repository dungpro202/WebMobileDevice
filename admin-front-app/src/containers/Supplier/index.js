import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createSupplier, getOrdersByAccountId } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
* @author
* @function Supplier
**/

export const Supplier = (props) => {

    const supplier = useSelector(state => state.supplier);

    const [showCreateModel, setShowCreateModel] = useState(false);
    const [showUpdateModel, setShowUpdateModel] = useState(false);
    const [_id,setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");




    const dispatch = useDispatch();

    useEffect(() => {
        if (supplier.message) {
            toast(supplier.message);
        }
    }, [supplier.message])

    const handleCloseCreate = () => setShowCreateModel(false);
    const handleSaveCreate = (e) => {
        e.preventDefault();
        const supplier = { name, address, note };
        dispatch(createSupplier(supplier));

        setShowCreateModel(false)
    }
    const handleShowCreate = () => setShowCreateModel(true);

    const handleCloseUpdate = () => setShowUpdateModel(false);

    const handleShowUpdate = (supplier) => {
        // e.preventDefault();
        setId(supplier._id)
        // const supplier = {_id, name, address, note };
        setName(supplier.name)
        setAddress(supplier.address)
        setNote(supplier.note)
        setShowUpdateModel(true);
    }

    const handleSaveUpdate = (e) => {
        e.preventDefault();
        const supplier = {_id, name, address, note };
        dispatch(createSupplier(supplier));
        setShowCreateModel(false)

    }

    const renderSupplers = () => {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên Nhà Cung Cấp</th>
                        <th>Địa Chỉ</th>
                        <th>Ghi Chú</th>
                        <th>Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supplier.suppliers ?
                            supplier.suppliers.map((supplier, index) =>
                                <tr key={supplier._id}>
                                    <td>{index + 1}</td>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.note}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleShowUpdate(supplier)}
                                        >
                                            Sửa
                                        </Button>
                                    </td>

                                </tr>
                            ) : null
                    }

                </tbody>
            </Table>
        )
    }


    const renderCreateSupplier = () => {
        return (
            <NewModal
                show={showCreateModel}
                handleClose={handleCloseCreate}
                modalTitle={'Tạo Nhà Cung Cấp Mới'}
                handleSave={handleSaveCreate}
            >
                <Input
                    value={name}
                    placeholder={'Name'}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Input
                    value={address}
                    placeholder={'Address'}
                    onChange={(e) => { setAddress(e.target.value) }}
                // errorMessage={'no no'}
                />
                <Input
                    value={note}
                    placeholder={'Ghi Chú'}
                    onChange={(e) => { setNote(e.target.value) }}
                />

            </NewModal>
        )
    }

    const renderUpdateSupplier = () => {
        return (
            <NewModal
                show={showUpdateModel}
                handleClose={handleCloseUpdate}
                modalTitle={'Cập Nhật Nhà Cung Cấp'}
                handleSave={handleSaveUpdate}
            >
                <Input
                    value={name}
                    placeholder={'Name'}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Input
                    value={address}
                    placeholder={'Address'}
                    onChange={(e) => { setAddress(e.target.value) }}
                />
                <Input
                    value={note}
                    placeholder={'Note'}
                    onChange={(e) => { setNote(e.target.value) }}
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
                            <h3>Nhà Cung Cấp</h3>
                            <Button
                                variant="primary"
                                onClick={handleShowCreate}
                            >
                                Tạo Nhà Cung Cấp Mới
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderSupplers()}
                    </Col>
                </Row>
            </Container>


            {renderCreateSupplier()}

            {renderUpdateSupplier()}

            <ToastContainer />

        </Layout>
    )

}