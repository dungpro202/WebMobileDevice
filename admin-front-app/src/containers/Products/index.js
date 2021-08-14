import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

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

    const category = useSelector(state => state.category);
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

    console.log(productImages)

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
            </Container>
            {/* Add */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )

}

export default Products