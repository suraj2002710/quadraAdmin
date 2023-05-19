import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SingleNotification from './SingleNotification';

function DetailModal(props) {
    console.log(props);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Professional Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
                <SingleNotification id={props.id}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default DetailModal;