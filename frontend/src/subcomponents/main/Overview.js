import {Component} from 'react'
import {Table, Card, Button} from 'react-bootstrap'

import Navigation from '../navigation/Navigation'

class Overview extends Component {
  render () {
    return (
      <>
        <Navigation
        onRouteChange = {this.props.onRouteChange}
        />
        <Card>
          <Card.Body>  
            <AccountInformation
            state = {this.props.state}
            />
          </Card.Body>
          <Card.Body>
            <Button 
              variant="primary"
              onClick = {() => {this.props.onRouteChange('transfer')}}>Transfer 
            </Button>
            <TransactionTable/>
          </Card.Body>
        </Card>
      </>
    )
  }
}

class AccountInformation extends Component {
  render () {
    let acctInfo = this.props.state.acctDetails
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{acctInfo.username}</td>
            <td>{acctInfo.accountNumber}</td>
            <td>{acctInfo.balance}</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

class TransactionTable extends Component {
  render () {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>123456789</td>
              <td>987654321</td>
              <td>10</td>
              <td>EUR</td>
              <td>Pleasure</td>
              <td>18-01-2023</td>
           </tr>
         </tbody>
      </Table>
      </>
    )
  }
} 

export default Overview
