import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createReceipt } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
* @author
* @function Receipt
**/

export const Receipt = (props) => {
    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');


    const receipt = useSelector(state => state.receipt);
    const product = useSelector(state => state.product);
    const supplierList = useSelector(state => state.supplier);

    const [showCreateModel, setShowCreateModel] = useState(false);
    const [showCreateModel2, setShowCreateModel2] = useState(false);
    const [supplier, setSupplier] = useState("");
    const [sl, setSl] = useState(0);
    const [bang, setBang] = useState([]);
    const [arrayProduct, setArrayProduct] = useState([]);
   

    const dispatch = useDispatch();

    const toggleClass = (e) => {
        const tag = e.target.parentElement.parentElement
        tag.classList.toggle("mystyle");
    };


    const handleCloseCreate = () => setShowCreateModel(false);
    const handleCloseCreate2 = () => setShowCreateModel2(false);
    const handleSaveCreate = (e) => {
        e.preventDefault();
        setShowCreateModel(false)
        const mapItem = [];
        for (let i = 0; i < sl; i++) {

            mapItem.push(i);
        }
        setBang(mapItem)
        let temp = []
        let item = mapItem.map((x) => {
            return {
                "productId": "",
                "productPrice": 0,
                "productQty": 0,
            }
        })
        console.log('item', item)

        setArrayProduct(item)
        console.log('arrayProduct', arrayProduct)
        if (sl > 0) {
            setShowCreateModel2(true)
        }
    }
    const handleShowCreate = () => setShowCreateModel(true);
    const handleSaveCreate2 = (e) => {
        e.preventDefault();
        
        const totalAmount = arrayProduct.reduce((temp, item) =>
            temp + item.productPrice * item.productQty
            , 0)

        const receipt = {
            supplier,
            items: arrayProduct,
            totalAmount,
        }
        console.log('receipt',receipt)
        dispatch(createReceipt(receipt))
        setShowCreateModel2(false);
    }


    const renderReceipts = () => {
        return (
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã đơn Nhập</th>
                        <th>Nhà Cung Cấp</th>
                        <th>Số Loại SP</th>
                        <th>Tổng Giá</th>
                        <th>Người Tạo</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        receipt.receipts ?
                            receipt.receipts.map((receipt, index) =>
                                <>
                                    <tr key={receipt._id}>
                                        <td>{index + 1}</td>
                                        <td>{receipt._id}</td>
                                        <td>{receipt.supplier.name}</td>
                                        <td>{receipt.items.length}</td>
                                        <td>{formatCash(receipt.totalAmount)}  ₫</td>
                                        <td>{receipt.createdBy.email}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={(e) => { toggleClass(e) }}
                                            >
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr className="hidden">
                                        <td colspan="7">
                                            <div>
                                                <Table variant="parimary">
                                                    <thead>
                                                        <tr>
                                                            <th className="title"></th>
                                                            <th className="title">Tên Sản Phẩm</th>
                                                            <th className="title">Giá Nhập</th>
                                                            <th className="title">Số Lượng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {receipt.items.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="value">{index + 1}</td>
                                                                <td className="value">{item.productId.name}</td>
                                                                <td className="value">{formatCash(item.productPrice)} ₫</td>
                                                                <td className="value">{item.productQty}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ) : null
                    }

                </tbody>
            </Table>
        )
    }



    const renderCreateReceipt = () => {
        return (
            <NewModal
                size={'lg'}
                show={showCreateModel}
                handleClose={handleCloseCreate}
                modalTitle={'Tạo Đơn Nhập Hàng Mới'}
                handleSave={handleSaveCreate}
            >

                <Col>
                    <Input
                        type={'select'}
                        label={'Chon Nha Cung Cap'}
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        placeholder={'Select Supplier'}
                    >
                        {supplierList.suppliers.map(option =>
                            <option key={option.value} value={option._id}>{option.name}</option>
                        )}
                    </Input>
                </Col>

                <Input
                    type={'number'}
                    label={'So luong mat hang'}
                    value={sl}
                    onChange={(e) => { setSl(e.target.value); }}
                />

            </NewModal>
        )
    }

    const onChangeProductId = (e, x) => {
        let value = e.target.value;
        console.log('arrayProduct', arrayProduct);
        arrayProduct[x].productId = value
        setArrayProduct([...arrayProduct])
    }

    const onChangeProductPrice = (e, x) => {
        let value = e.target.value;
        console.log('arrayProduct', arrayProduct);
        arrayProduct[x].productPrice = value
        setArrayProduct([...arrayProduct])
    }

    const onChangeProductQty = (e, x) => {
        let value = e.target.value;
        console.log('arrayProduct', arrayProduct);
        arrayProduct[x].productQty = value
        setArrayProduct([...arrayProduct])
    }

    const renderCreateReceipt2 = () => {
        return (
            <NewModal
                size={'lg'}
                show={showCreateModel2}
                handleClose={handleCloseCreate2}
                modalTitle={'Tạo Đơn Nhập Hàng Mới'}
                handleSave={handleSaveCreate2}
            >

                {JSON.stringify(arrayProduct)}
                {
                    bang.map((x) => <>
                        <Row>
                            <Col>
                                <Input
                                    type={'select'}
                                    label={'Ten San Pham'}
                                    value={arrayProduct[x].productId}
                                    onChange={(e) => onChangeProductId(e, x)}
                                    placeholder={'Select Product Parent'}
                                >
                                    {product.products.map(option =>
                                        <option key={option.value} value={option._id}>{option.name}</option>
                                    )}
                                </Input>
                            </Col>
                            <Col>
                                <Input
                                    type={'number'}
                                    label={'Giá Nhập'}
                                    value={arrayProduct[x].productPrice}
                                    onChange={(e) => onChangeProductPrice(e, x)}
                                />
                            </Col>
                            <Col>
                                <Input
                                    type={'number'}
                                    label={'Số lượng'}
                                    value={arrayProduct[x].productQty}
                                    onChange={(e) => onChangeProductQty(e, x)}
                                />
                            </Col>
                        </Row>
                    </>)
                }

            </NewModal>
        )
    }

    return (
        <Layout sidebar>
            <Container >
                <Row style={{ marginBottom: '50px' }}>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Hoá Đơn Nhập Hàng</h3>
                            <Button
                                variant="primary"
                                onClick={handleShowCreate}
                            >
                                Tạo Đơn Nhập Mới
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderReceipts()}
                    </Col>
                </Row>
            </Container>


            {renderCreateReceipt()}
            {renderCreateReceipt2()}


            <ToastContainer />

        </Layout>
    )

}