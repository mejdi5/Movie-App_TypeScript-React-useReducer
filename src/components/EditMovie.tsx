import React,{useState} from 'react'
import { Movie, Action, ActionKind } from '../App'
import {Modal, Button, Form} from 'react-bootstrap'

interface Props {
    movie: Movie,
    dispatch: React.Dispatch<Action>
}

const EditMovie : React.FC<Props> = ({movie, dispatch}: Props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editedTitle, setEditedTitle] = useState<string>(movie.title)
    const [editedRate, setEditedRate] = useState<number>(movie.rate)
    const [editedDate, setEditedDate] = useState<string>(movie.date)
    const [editedImgUrl, setEditedImgUrl] = useState<string>(movie.imgUrl)
    const [editedDescription, setEditedDescription] = useState<string>(movie.description)
    const [editedCategory, setEditedCategory] = useState<string>(movie.category)

    const EditMovie = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch({
            type: ActionKind.ADD_MOVIE, 
            payload: {
                _id: movie._id, 
                title: editedTitle, 
                rate: editedRate, 
                date: editedDate, 
                imgUrl: editedImgUrl,
                description: editedDescription, 
                category: editedCategory
            }
        });
        setEditedTitle('');
        setEditedRate(0); 
        setEditedDate(''); 
        setEditedImgUrl(''); 
        setEditedDescription(''); 
        setEditedCategory('')
        handleClose()
        }

return (
    <div>
    <Button variant="dark" onClick={handleShow}>
        Edit 
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="edit movie title" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicRate">
                <Form.Label>Rate</Form.Label>
                <Form.Control type="text" placeholder="edit rate" value={editedRate} onChange={e => setEditedRate(Number(e.target.value))} required/>
            </Form.Group>
            <Form.Group controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" placeholder="edit date" value={editedDate} onChange={e => setEditedDate(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="edit image" value={editedImgUrl} onChange={e => setEditedImgUrl(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="edit description" value={editedDescription} onChange={e => setEditedDescription(e.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="edit category" value={editedCategory} onChange={e => setEditedCategory(e.target.value)} required/>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={e => EditMovie(e)} >
            Update
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
)
}

export default EditMovie