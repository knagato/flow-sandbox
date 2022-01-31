import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from '@onflow/types';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Button, Modal, Form, FormGroup, ListGroup, Card } from 'react-bootstrap';

const getAllMedatadaScript = `\
import NFTDiary from 0xNFTDiary

pub fun main(addr: Address): [{String: String}] {
    let metadataArray: [{String: String}] = []
    let collectionCapability = getAccount(addr).getCapability<&{NFTDiary.NFTDiaryCollectionPublic}>(NFTDiary.CollectionPublicPath)
    if !collectionCapability.check() {
        return metadataArray
    }
    let collection = collectionCapability.borrow()!
    let ids = collection.getIDs()
    for id in ids {
        let token = collection.borrowNFTDiary(id: id)
        let metadata = token.metadata
        metadata["id"] = token.id.toString()
        metadataArray.append(metadata)
    }
    return metadataArray
}
`;

const mintNFTTransaction = `
import NFTDiary from 0xNFTDiary

transaction(metadata: {String: String}) {
    prepare(acct: AuthAccount) {
        // Setup Collection
        if acct.borrow<&NFTDiary.Collection>(from: NFTDiary.CollectionStoragePath) == nil {
            acct.save(<- NFTDiary.createEmptyCollection(), to: NFTDiary.CollectionStoragePath)
            acct.link<&{NFTDiary.NFTDiaryCollectionPublic}>(NFTDiary.CollectionPublicPath, target: NFTDiary.CollectionStoragePath)
        }

        // Setup Minter
        if acct.borrow<&NFTDiary.Minter>(from: NFTDiary.MinterStoragePath) == nil {
            acct.save(<- NFTDiary.createMinter(), to: NFTDiary.MinterStoragePath)
        }

        // Mint and Deposit NFT
        let minter = acct.borrow<&NFTDiary.Minter>(from: NFTDiary.MinterStoragePath)!
        let receiverRef = acct.getCapability(NFTDiary.CollectionPublicPath).borrow<&{NFTDiary.NFTDiaryCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's Replica collection")
        let token <- minter.mintNFT(metadata: metadata)
        receiverRef.deposit(token: <- token)

        log("Mint NFT succeeded")
    }
}
`;

const deleteNFTTransaction = `
import NFTDiary from 0xNFTDiary

transaction(tokenID: UInt64) {
    prepare(acct: AuthAccount) {
        let collection = acct.borrow<&NFTDiary.Collection>(from: NFTDiary.CollectionStoragePath)!
        let token <- collection.withdraw(withdrawID: tokenID) as! @NFTDiary.NFT
        destroy token

        log("Delete NFT")
    }
}
`;

export default function Home() {
  const protoNewDiary = {
    id: 0,
    title: '',
    body: ''
  }
  const executeScript = async (script, args = []) => {
    const response = await fcl.send([fcl.script(script), fcl.args(args)]);
    return await fcl.decode(response);
  }

  const sendTransaction = async (transaction, args) => {
    const response = await fcl.send([
      fcl.transaction(transaction),
      fcl.args(args),
      fcl.proposer(fcl.currentUser().authorization),
      fcl.authorizations([fcl.currentUser().authorization]),
      fcl.payer(fcl.currentUser().authorization),
      fcl.limit(9999),
    ]);
    return response;
  }

  const getAllMetadata = async () => {
    const addr = user?.addr
    if (!addr) return [];
    return await executeScript(getAllMedatadaScript, [
      fcl.arg(addr, t.Address),
    ]);
  }

  const mintNFT = async ({ title, body }) => {
    return await sendTransaction(mintNFTTransaction, [
      fcl.arg(
        [
          { key: 'title', value: title },
          { key: 'body', value: body },
          { key: 'timestamp', value: Date.now().toString()},
          { key: 'author', value: user?.addr}
        ],
        t.Dictionary({ key: t.String, value: t.String })
      ),
    ]);
  }

  const deleteNFT = async (tokenId) => {
    return await sendTransaction(deleteNFTTransaction, [
      fcl.arg(Number(tokenId), t.UInt64),
    ]);
  }
  const handleDelete = (tokenId) => (event) => {
    deleteNFT(tokenId).then(res => {
      getDiaries()
    })
  }

  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  const [showNewDiaryModal, setShowNewDiaryModal] = useState(false);
  const handleClose = () => setShowNewDiaryModal(false);
  const handleShow = () => setShowNewDiaryModal(true);

  const [diaries, setDiaries] = useState([])

  const getDiaries = () => {
    getAllMetadata().then(res => {
      setDiaries(res)
    })
  }

  const [newDiary, setNewDiary] = useState(protoNewDiary);
  const handleChange = (name) => (event) => {
    const modNewDiary = {
        ...newDiary,
        [name]: event.target.value
    }
    setNewDiary(modNewDiary)
  };
  const handleSubmit = () => {
    mintNFT(newDiary).then(res => {
      getDiaries()
      setNewDiary(protoNewDiary)
      handleClose()
    })
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
        <Card>
          <Card.Body>
            <Card.Title>
              #{diary.id}: {diary.title}
              <Nav className="float-end">
                <NavDropdown id="diary-nav-dropdown">
                  <NavDropdown.Item onClick={handleDelete(diary.id)}>Delete</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Card.Title>
            <Card.Text className="ms-2">{diary.body}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">{diary.timestamp ? new Date(Number(diary.timestamp)).toUTCString() : ''} By {diary.author ? diary.author : ''}</Card.Footer>
        </Card>
      </ListGroup.Item>
    );
    return (
      <>
        <h1 className="my-3">Your Diaries</h1>
        <Button className="mb-3" variant="outline-primary" onClick={getDiaries}>
            Get Diaries
        </Button>
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
