import { Col, Row } from "react-bootstrap"
import Input from "../../../components/UI/Input"
import NewModal from "../../../components/UI/NewModal"

const UpdateCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        handleSave,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,

    } = props;

    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            handleSave={handleSave}
            size={size}
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => { handleCategoryInput('name', e.target.value, index, 'expanded') }}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => { handleCategoryInput('name', e.target.value, index, 'expanded') }}

                            >
                                <option>Select Category Parent</option>
                                {categoryList.map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )}
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={(e) => { handleCategoryInput('type', e.target.value, index, 'expanded') }}
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>)
            }
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => { handleCategoryInput('name', e.target.value, index, 'checked') }}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => { handleCategoryInput('name', e.target.value, index, 'checked') }}

                            >
                                <option>Select Category Parent</option>
                                {categoryList.map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )}
                            </select>
                        </Col>
                        <Col>
                        <select
                                className="form-control"
                                value={item.type}
                                onChange={(e) => { handleCategoryInput('type', e.target.value, index, 'checked') }}
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>)
            }
        </NewModal>
    )
}
export default UpdateCategoriesModal