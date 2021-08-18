import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategories as deleteCategoriesAction, getAllCategory, updateCategories } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosArrowForward, IoIosArrowDown, IoIosCheckbox, IoIosCheckboxOutline, IoIosTrash, IoIosAdd, IoIosSettings } from "react-icons/io";
import UpdateCategoriesModal from './components/UpdateCategoryModal';
import AddCategoryModal from './components/AddCategoryModal';
import './style.css';
import DeleteCategoryModal from './components/DeleteCategoryModal';

/**
* @author
* @function Category
**/

const Category = (props) => {

    const category = useSelector(state => state.category);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    //On Off Modal
    const [show, setShow] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!category.loading){
            setShow(false);
        }
    },[category.loading])

    // handel action Add Model
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSave = () => {

        //body : form -data
        const form = new FormData();

        if (categoryName === "") {
            alert("Name is required");
            setShow(false);
            return;
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        setCategoryName('');
        setParentCategoryId('')

        setShow(false)
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                //Checkbox react tree
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    // tao category list de do vao select-option 
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type,
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    //update checked and expanded dung cho update & delete
    const updateCheckedAndExpanded = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && expandedArray.push(category);

        })
        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
        console.log({ checked, expanded, categories, checkedArray, expandedArray })
    }

    //update category Xem lai bai 20
    const updateCategory = () => {
        setUpdateCategoryModal(true);
        updateCheckedAndExpanded();
    }

    //Xu ly Input khi Update (checked,expanded)
    const handleCategoryInput = (key, value, index, type) => {
        console.log(value);
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const handleCloseUpdateCategoryForm = () => setUpdateCategoryModal(false);

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);

        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);

        })

        // sau khi update se dispatch(getAllCategory)
        dispatch(updateCategories(form))

        setCategoryName('');
        setParentCategoryId('')

        setUpdateCategoryModal(false)
    }

    const deleteCategory = () => {
        updateCheckedAndExpanded()
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map(((item, index) => ({ _id: item.value })))
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))

        }
        setDeleteCategoryModal(false);
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div >Action</div>
                                <Button variant="primary" onClick={handleShow} className="actionBtn">
                                    <span><IoIosAdd />Thêm</span>
                                </Button>
                                <Button variant="success " onClick={updateCategory} className="actionBtn">
                                    <IoIosSettings />Sửa
                                </Button>
                                <Button variant="danger" onClick={deleteCategory} className="actionBtn">
                                    <IoIosTrash />Xóa
                                </Button>

                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {/* {renderCategories(category.categories)} */}
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,
                                }}
                            />
                        </ul>
                    </Col>
                </Row>


            </Container>

            {/* Add */}
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                handleSave={handleSave}
                modalTitle={'Add Category'}
                size="lg"
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />

            {/* EDIT */}
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={handleCloseUpdateCategoryForm}
                handleSave={updateCategoriesForm}
                modalTitle={'Update Category'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />


            {/* DELETE */}
            <DeleteCategoryModal
                show={deleteCategoryModal}
                handleClose={setDeleteCategoryModal}
                modalTitle={'Delete Category'}
                size="lg"
                deleteCategories={deleteCategories}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
            />

        </Layout>
    )

}

export default Category