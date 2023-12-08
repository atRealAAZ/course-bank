import {Component} from 'react'
import {Card, Button} from 'react-bootstrap'

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
            <Button 
              variant = "primary"
              className = "product-button"
            >Get it!
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
            <Button 
              variant = "primary"
            >Get it!
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default ProductPage