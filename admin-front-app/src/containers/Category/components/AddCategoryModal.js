import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input"
import NewModal from "../../../components/UI/NewModal"

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        handleSave,
        modalTitle,
        size,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage

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
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => { setCategoryName(e.target.value) }}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option>Select Category Parent</option>
                        {categoryList.map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>

                    <input type="file" name="Category Image" onChange={handleCategoryImage} />
                </Col>
            </Row>

        </NewModal>
    )
}

export default AddCategoryModal