import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { Navbar, Nav, NavDropdown, Container, Row, Col, Button, Modal, Form, FormGroup, ListGroup } from 'react-bootstrap';

export default function Home() {
  const protoNewDiary = {
    id: 0,
    title: '',
    body: ''
}

  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  const [showNewDiaryModal, setShowNewDiaryModal] = useState(false);
  const handleClose = () => setShowNewDiaryModal(false);
  const handleShow = () => setShowNewDiaryModal(true);

  const [diaries, setDiaries] = useState([
    {id: 0, title: "title 1", body: "sample text"},
    {id: 1, title: "title 2", body: "sample text"}
  ])

  const [newDiary, setNewDiary] = useState(protoNewDiary);
  const handleChange = (name) => (event) => {
    const modNewDiary = {
        ...newDiary,
        [name]: event.target.value
    }
    setNewDiary(modNewDiary)
  };
  const handleSubmit = () => {
    const modNewDiary = {
      ...newDiary,
      id: diaries.length
    }
    setDiaries([...diaries, modNewDiary])
    setNewDiary(protoNewDiary)
    handleClose()
  }

  const AuthedState = () => {
    return (
      <NavDropdown title={user?.addr ?? "No Address"} id="basic-nav-dropdown" >
        <NavDropdown.Item onClick={handleShow}>Create New Diary</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={fcl.unauthenticate}>Log Out</NavDropdown.Item>
      </NavDropdown>
    )
  }

  const UnauthenticatedState = () => {
    return (
      <Nav.Link onClick={fcl.logIn}>Log In</Nav.Link>
    )
  }

  const ListDiaries = (props) => {
    const diaries = props.diaries;
    const listItems = diaries.map((diary) =>
      <ListGroup.Item key={diary.id.toString()}>
        <h2>{diary.title}</h2>
        {diary.body}
      </ListGroup.Item>
    );
    return (
      <>
        <h1 className="my-3">Your Diaries</h1>
        <ListGroup>
          {listItems}
        </ListGroup>
      </>
    )
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>NFT Diary</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Nav className="float-end">
              {user.loggedIn
                  ? <AuthedState />
                  : <UnauthenticatedState />
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            {user.loggedIn
                  ? <ListDiaries diaries={diaries} />
                  : <h1 className="my-3">Please log in</h1>
            }
          </Col>
        </Row>
      </Container>
      <Modal show={showNewDiaryModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Diary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="diary title" value={newDiary.title} onChange={handleChange('title')} />
            </FormGroup>
            <FormGroup controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea" rows={5}
                value={newDiary.body}
                onChange={handleChange('body')}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
