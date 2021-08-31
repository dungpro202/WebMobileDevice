import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal'
import linearCategories from '../../helpers/linearCategories';

/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    const page = useSelector(state => state.page);

    useEffect(() => {
        setCategories(linearCategories(category.categories))
    }, [category])

    useEffect(() => {
        console.log(page);
        if (!page.loading) {
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const dispatch = useDispatch();

    const onCategoryChange = (e) => {
        //Tim kiem theo id
        const category = categories.find(category => category.value == e.target.value)

        setCategoryId(e.target.value);
        setType(category.type);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm = (e) => {
        if (title === "") {
            alert('Title is required');
            setCreateModal(false);
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', title);

        banners.forEach((banner, index) => {
            form.append('banners', banner)
        })
        console.log("lllasddddddddddddddl")

        products.forEach((product, index) => {
            form.append('products', product)
        })
        console.log("12312465464646")

        dispatch(createPage(form))

        // setCreateModal(false);
    }

    const renderCreatePageModal = () => {
        return (
            <NewModal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                handleSave={submitPageForm}
            >
                <Container>

                    <Row>
                        <Col>
                            {/* <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat.value} value={cat.value}>{cat.name}</option>

                                    )
                                }
                            </select> */}

                            <Input
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder={'Select Category'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                className="form-control-sm"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Desc'}
                                className=""
                            />
                        </Col>
                    </Row>
                    {
                        banners.length > 0 ?
                            banners.map((banner, index) =>
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    {
                        products.length > 0 ?
                            products.map((product, index) =>
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>

            </NewModal>
        )
    }

    return (
        <Layout sidebar>
            {
                page.loading ?
                    <h1>Createing Page.... please wait...</h1>
                    :
                    <>
                        {renderCreatePageModal()}
                        <Button onClick={() => setCreateModal(true)}>Create Page</Button>
                    </>
            }

        </Layout>
    )

}

export default NewPage