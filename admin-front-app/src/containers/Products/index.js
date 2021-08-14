import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import NewModal from '../../components/UI/NewModal'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'

/**
* @author
* @function Products
**/

const Products = (props) => {


    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productImages, setProductImages] = useState([]);

    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleSave = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for (let image of productImages) {
            form.append('productImage', image);
        }

        dispatch(addProducts(form));

        setShow(false)
    }
    const handleShow = () => setShow(true);

    // tao category lít
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    // xu ly upload file
    const handleProductImages = (e) => {
        //console.log( "e.target.files[0]",e.target.files[0])
        setProductImages([
            ...productImages,
            e.target.files[0]
        ]);
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: '12px' }} responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Mô Tả</th>
                        <th>Danh Mục</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) =>
                                <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td>{product.category.name}</td>
                                </tr>
                            )
                            : null
                    }


                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return (
            <NewModal
                show={show}
                handleClose={handleClose}
                modalTitle={'Thêm Sản Phẩm'}
                handleSave={handleSave}
            >
                <Input
                    value={name}
                    placeholder={'Tên Sản Phẩm'}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Input
                    value={quantity}
                    placeholder={'Số lượng'}
                    onChange={(e) => { setQuantity(e.target.value) }}
                />
                <Input
                    value={price}
                    placeholder={'Giá'}
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                <Input
                    value={description}
                    placeholder={'Description'}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
                <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option>Select Category Parent</option>
                    {createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </select>

                {
                    productImages.length > 0
                        ? productImages.map((image, index) => <div key={index}>{image.name}</div>)
                        : null
                }

                <input type='file' name='productImage' onChange={handleProductImages} />
            </NewModal>
        )
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);

    }

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <NewModal
                show={productDetailModal}
                handleClose={handleCloseProductDetailsModal}
                modalTitle={'Product Details'}
                size={'lg'}
            >
                <Row>
                    <Col md={6}>
                        <label className="key">Tên Sản Phẩm</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Giá</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Số lượng</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Danh mục</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Mô tả</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <label className="key">Hình ảnh Sản Phẩm</label>
                        <div style={{ display: 'flex' }}>
                            {productDetails.productImages.map(image =>
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(image.img)} alt='some' />
                                </div>)}
                        </div>
                    </Col>
                </Row>

            </NewModal >
        )
    }

    return (
        <Layout sidebar>
            <Container >
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>

            {/* Model Add */}
            {renderAddProductModal()}

            {/* Model Product Details */}
            {renderProductDetailsModal()}

        </Layout>
    )

}

export default Products