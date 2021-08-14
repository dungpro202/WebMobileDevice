import React from 'react'
import { Button, Modal } from 'react-bootstrap'

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Thoát
                </Button>
                <Button variant="primary" onClick={props.handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default NewModal