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
            <TransactionTable
            state = {this.props.state}
            onNavigatePagination = {this.props.onNavigatePagination}
            />
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
    let txTable = this.props.state.txTable
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
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {txTable.tx_exists
          ?
            txTable.txs[txTable.page].items.map((tx) => (
              <tr>
                <td>{tx.id}</td>
                <td>{tx.to_account}</td>
                <td>{tx.from_account}</td>
                <td>{tx.amount}</td>
                <td>{tx.currency}</td>
                <td>{tx.date}</td>
              </tr>  
              )
            )
          :
            <p>No transactions found!</p>
          }     
         </tbody>
        </Table>
        {txTable['tx_exists']
        ?
          <Pagination
          txTable = {txTable}
          onNavigatePagination = {this.props.onNavigatePagination}
          />
        :
          <>
          </>
        }
      </>
    )
  }
} 

class Pagination extends Component {
  render () {
    let txTable = this.props.txTable
    return (
    <>
      {txTable.txs[txTable.page]['has_prev']
      ?
        <Button 
        variant="primary"
        onClick = {() => this.props.onNavigatePagination('Previous')}
        >Previous
        </Button>
      : 
        null
      }
      {txTable.txs[txTable.page]['has_next']
      ?
        <Button 
        variant="primary"
        onClick = {() => this.props.onNavigatePagination('Next')}
        >Next
        </Button>
      :
       null
      }
    </>
    )
  }
}

export default Overview
