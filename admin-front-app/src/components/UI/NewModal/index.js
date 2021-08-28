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
                {props.buttons ? props.buttons.map((btn, index) =>
                    <Button key={index} variant={btn.color} onClick={btn.onClick}>
                        {btn.label}
                    </Button>
                ) :
                    <>
                        <Button Button variant="secondary" onClick={props.handleClose}>
                            Thoát
                        </Button>
                        {
                            props.handleSave ?
                                <Button variant="primary" onClick={props.handleSave}>
                                    Lưu
                                </Button>
                                : null
                        }
                    </>
                }

            </Modal.Footer>
        </Modal >
    )

}

export default NewModal