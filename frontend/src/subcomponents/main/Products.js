import {Component} from 'react'
import {Card, Button, Form} from 'react-bootstrap'

import Navigation from '../navigation/Navigation'

class ProductPage extends Component {
  render () {
    return (
      <>
        <Navigation
          onRouteChange = {this.props.onRouteChange}
          onAuthentication = {this.props.onAuthentication}
        />
        <Card>
          <Card.Header>
            <Card.Title>
              Products
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Loan/>
            <Mortgage/>
          </Card.Body>
        </Card>
      </>
      )
  }
}

class Mortgage extends Component {
  render () {
    return (
      <>
        <Card className = "product-card">
          <Card.Header>
            Mortgage         
          </Card.Header>
          <Card.Body className = "product-body">
            <Card.Text>
              This is an ordinary amortizing mortgage!
            </Card.Text>
            <Form.Group controlId="formFile" className="mb-3">
             <Form.Label>Upload your transactions: </Form.Label>
              <Form.Control 
              type="file"
              onChange = {(event) => {this.props.onFileUpload(event.target.files[0])}} />
            </Form.Group>
            <Button 
              variant = "primary"
              className = "product-button"
            >Calculate!
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

class Loan extends Component {
  render () {
    return (
      <>
        <Card className = "product-card">
          <Card.Header>
            Loan         
          </Card.Header>
          <Card.Body>
            <Card.Text>
              This is an ordinary amortizing loan!
            </Card.Text>
            <Form.Group controlId="formFile" className="mb-3">
             <Form.Label>Upload:</Form.Label>
              <Form.Control 
              type="file"
              onChange = {(event) => {this.props.onFileUpload(event.target.files[0])}} />
            </Form.Group>
            <Button 
              variant = "primary"
            >Calculate!
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default ProductPage