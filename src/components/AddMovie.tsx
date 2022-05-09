import React,{useState} from 'react'
import {ActionKind, Action} from '../App'
import {Modal, Button, Form} from 'react-bootstrap'

interface Props {
    dispatch: React.Dispatch<Action>
}

const AddMovie : React.FC<Props> = ({dispatch}: Props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState<string>('')
    const [rate, setRate] = useState<number>(0)
    const [date, setDate] = useState<string>('')
    const [imgUrl, setImgUrl] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [category, setCategory] = useState<string>('')


    const AddMovie = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({
        type: ActionKind.ADD_MOVIE, 
        payload: {
            _id: Math.random().toString(), 
            title: title, 
            rate: rate, 
            date: date, 
            imgUrl: imgUrl,
            description: description, 
            category: category
        }
    });
    setTitle('');
    setRate(0); 
    setDate(''); 
    setImgUrl(''); 
    setDescription(''); 
    setCategory('')
    handleClose()
    }

return (
    <div>
    <Button variant="primary" onClick={handleShow}>
        New 
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="add movie title" value={title} onChange={e => setTitle(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicRate">
                <Form.Label>Rate</Form.Label>
                <Form.Control type="text" placeholder="add rate" value={rate} onChange={e => setRate(Number(e.target.value))} required/>
            </Form.Group>
            <Form.Group controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" placeholder="add date" value={date} onChange={e => setDate(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="add image" value={imgUrl} onChange={e => setImgUrl(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="add description" value={description} onChange={e => setDescription(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="add category" value={category} onChange={e => setCategory(e.target.value)} required/>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={e => AddMovie(e)} >
            Submit
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
)
}

export default AddMovie