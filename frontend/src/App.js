import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Overview from './subcomponents/main/Overview'
import TransferPage from './subcomponents/main/Transfers'

const initialTransactionDetails = {
  txAmount: 0,
  txToAccount: '',
  txCurrency: ''
}

const initialState = {
  username: '',
  route: 'overview',
  transactionDetails: initialTransactionDetails
}

class App extends Component {

  constructor(props) {
    super()
    this.state = initialState
  }

  onRouteChange = (dest) => {
    this.setState({
      route: dest
    })
  }

  sendTransaction = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        transactionDetails: this.state.transactionDetails
      })
    }
    let response = await (await fetch('http://127.0.0.1:5001/send_transaction', requestOptions)).json()
    let message = response['message']
    console.log(message)
    alert(message)
  }

  render() {
    return (
      <div class = "app">
        {this.state.route === 'overview' 
        ?
          <Overview
          onRouteChange = {this.onRouteChange}
          />
        :
          <TransferPage
          onRouteChange = {this.onRouteChange}
          sendTransaction = {this.sendTransaction}
          />
        }
      </div>
    )
  }
}

export default App;
