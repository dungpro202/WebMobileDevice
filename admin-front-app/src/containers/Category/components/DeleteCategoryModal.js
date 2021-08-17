import NewModal from "../../../components/UI/NewModal"

const DeleteCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size,
        deleteCategories,
        expandedArray,
        checkedArray,
    } = props;


    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}

            size={size}
            buttons={[
                {
                    label: 'No',
                    color: 'primary',
                    onClick: () => {
                        alert('NO')
                    }
                },
                {
                    label: 'Yes',
                    color: 'danger',
                    onClick: deleteCategories
                }


            ]}
        >
            <h5>Expanded</h5>
            {expandedArray.map((item, index) => <h6 key={index}>{item.name}</h6>)}
            <h5>Checked</h5>
            {checkedArray.map((item, index) => <h6 key={index}>{item.name}</h6>)}


        </NewModal>
    )
}

export default DeleteCategoryModal