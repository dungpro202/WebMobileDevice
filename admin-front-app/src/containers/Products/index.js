import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProductById, updateProduct } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import NewModal from '../../components/UI/NewModal'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
* @author
* @function Products
**/

const Products = (props) => {

    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');


    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productImages, setProductImages] = useState([]);

    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [productItem, setProductItem] = useState(null);

    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        toast(product.notification);
    }, [product.notification])

    const handleClose = () => setShow(false);
    const handleSave = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', 0);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for (let image of productImages) {
            form.append('productImage', image);
        }

        console.log({ form })
        dispatch(addProduct(form));

        setName(''); setQuantity(''); setPrice(''); setDescription('');
        setCategoryId(''); setProductImages('');

        setShow(false)
    }
    const handleShow = () => setShow(true);

    //update
    const closeUpdateProductForm = () => {
        setShowUpdateModal(false);
    }
    const onUpdateProduct = (product) => {
        setShowUpdateModal(true);
        setProductItem(product)
        renderUpdateProductModal();
    }

    const updateProductForm = () => {

        let _id = productItem._id;
        let name = productItem.name;
        let quantity = productItem.quantity;
        let price = productItem.price;
        let description = productItem.description;
        // let category = productItem.category.id;
        let category = productItem.category ? productItem.category.id : 123456789;
        const payload = {
            _id,
            name,
            quantity,
            price,
            description,
            category,
        }

        dispatch(updateProduct(payload));

        setShowUpdateModal(false);
    }

    // tao category l??t
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
                        <th>T??n S???n Ph???m</th>
                        <th>Gi??</th>
                        <th>S??? L?????ng</th>
                        <th>Danh M???c</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) =>
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{formatCash(product.price)} ??? </td>
                                    <td>{product.quantity}</td>

                                    <td>{
                                        product.category &&
                                            product.category.name ?
                                            product.category.name : <span style={{ color: 'red' }}>Danh M???c ???? B??? X??a</span>}</td>
                                    <td style={{ display: 'flex' }}>
                                        <Button variant="primary" onClick={() => showProductDetailsModal(product)}>
                                            Details
                                        </Button>
                                        <div style={{ marginRight: "10px" }}></div>
                                        <Button variant="success" onClick={() => onUpdateProduct(product)}>
                                            Update
                                        </Button>
                                        <div style={{ marginRight: "10px" }}></div>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                const payload = {
                                                    productId: product._id,
                                                };
                                                dispatch(deleteProductById(payload));
                                            }}
                                        >
                                            DELETE
                                        </Button>

                                    </td>
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
                modalTitle={'Th??m S???n Ph???m'}
                handleSave={handleSave}
            >
                <Input
                    value={name}
                    placeholder={'T??n S???n Ph???m'}
                    onChange={(e) => { setName(e.target.value) }}
                />

                <Input
                    type={'number'}
                    value={price}
                    placeholder={'Gi??'}
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                <Input
                    value={description}
                    placeholder={'Description'}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
                <Input
                    type={'select'}
                    placeholder={'Select Category Parent'}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </Input>

                {
                    productImages.length > 0
                        ? productImages.map((image, index) => <div key={index}>{image.name}</div>)
                        : null
                }

                <input type='file' name='productImage' required onChange={handleProductImages} />
            </NewModal>
        )
    }

    const renderUpdateProductModal = (productItem) => {
        if (!productItem) {
            return null;
        } else {
            console.log(productItem)
            return (
                <NewModal
                    show={showUpdateModal}
                    handleClose={closeUpdateProductForm}
                    modalTitle={'Update S???n Ph???m'}
                    handleSave={updateProductForm}
                >
                    <Input
                        value={productItem.name}
                        placeholder={'T??n S???n Ph???m'}
                        onChange={(e) => { setProductItem({ ...productItem, name: e.target.value }) }}
                    />
                    <Input
                        type={'number'}
                        value={productItem.quantity}
                        placeholder={'S??? l?????ng'}
                        onChange={(e) => { setProductItem({ ...productItem, quantity: e.target.value }) }}
                        style={{ display: 'none' }}
                    />
                    <Input
                        type={'number'}
                        value={productItem.price}
                        placeholder={'Gi??'}
                        onChange={(e) => { setProductItem({ ...productItem, price: e.target.value }) }}
                    />
                    <Input
                        value={productItem.description}
                        placeholder={'Description'}
                        onChange={(e) => { setProductItem({ ...productItem, description: e.target.value }) }}
                    />
                    {
                        productItem.category ?
                            <Input
                                type={'select'}
                                value={productItem.category.id}
                                onChange={(e) => { setProductItem({ ...productItem, category: { name: productItem.category.name, id: e.target.value } }) }}
                                placeholder={productItem.category &&
                                    productItem.category.name ?
                                    productItem.category.name : 'Danh M???c ???? B??? X??a'}
                            >
                                {createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )}
                            </Input>
                            :
                            <Input
                                className="form-control"
                                value={productItem.categoryId}
                                onChange={(e) => { setProductItem({ ...productItem, category: { id: e.target.value } }) }}
                                placeholder={'Danh M???c ???? B??? X??a'}
                            >
                                {createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )}
                            </Input>

                    }

                    <h6 style={{ color: 'red', padding: '10px 0 10px 0' }}>H??nh ???nh s???n ph???m</h6>
                    {
                        productItem.productImages && productItem.productImages.length > 0
                            ? productItem.productImages.map((image, index) => <div key={index}>{image.img}</div>)
                            : 'Ch??a c?? H??nh ???nh'
                    }
                </NewModal>
            )
        }

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
                        <label className="key">T??n S???n Ph???m</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Gi??</label>
                        <p className="value">{productDetails.price}  ???</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">S??? l?????ng</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Danh m???c</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">M?? t???</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <label className="key">H??nh ???nh S???n Ph???m</label>
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

            {renderUpdateProductModal(productItem)}

            <ToastContainer />

        </Layout>
    )

}

export default Products