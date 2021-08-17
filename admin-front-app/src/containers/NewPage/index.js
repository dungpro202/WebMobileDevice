import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setCategories(linearCategories(category.categories))
    }, [category])

    console.log('category.categories', category.categories)

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const renderCreatePageModal = () => {
        return (
            <NewModal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                handleSave={() => setCreateModal(false)}
            >
                <Container>

                    <Row>
                        <Col>
                            <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select>
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
    console.log(createModal)

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
        </Layout>
    )

}

export default NewPage