import React,{useState} from 'react'
import './Voting.css'
import profile from '../Assets/profile.svg'
import PaystackPop from '@paystack/inline-js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Voting = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail]= useState('');
  const [ref, setRef]= useState('');
  const [vote, setVote]= useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function payWithPaystack(e) {
    e.preventDefault();

    const paystack = new PaystackPop()
    paystack.newTransaction({
      key:"pk_test_738c5038178fb13b68b9bb15cf43517877d65c17",
      amount: vote * 50 * 100,
      email,
      ref: `${ref}` + (Math.floor(Math.random()  * 10000) + 1) ,
         onSuccess(transaction){
        let message= `Payment Successful! ${transaction.reference}`
        alert(message)
        setEmail('')
        setVote('')
      },
      onCancel(){
        alert('Transaction canceled')
      }

    })

  }

  return (
  <div className="voting-container">
    <div className="first">
      <div className="contestants">
        <div className="image">
        <img src={profile} alt="profile" className="pic" width='150' />
        </div>
      <div className="details">
      <h2>Ademola bright</h2>
      <h3>Contestant Id: 004</h3>
      </div>
      <div className="input">
        
        <input type="text" className="vote" />
      </div>
      <div className="action">
        <button className="vote" onClick={handleShow}>VOTE</button>
      </div>
      </div>
    </div>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Face Of The City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e)=>setEmail(e.target.value)}
                required={true}
              />
                <Form.Label>Contestant Code</Form.Label>
              <Form.Control
                type="number"
                placeholder="001"
                autoFocus
                onChange={(e)=>setRef(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Number Of Votes</Form.Label>
              <Form.Control type='number' placeholder='0' autoFocus required onChange={(e)=>setVote(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={payWithPaystack}>
            Proceed to Pay
            </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default Voting