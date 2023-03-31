import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Overview from './subcomponents/main/Overview'
import TransferPage from './subcomponents/main/Transfers'
import Authentication from './subcomponents/authentication/Authentication'

const initialTxDetails = {
  txToAccount: '',
  txAmount: 0,
  txCurrency: ''
}

const initialState = {
  username: '',
  route: 'login',
  txDetails: initialTxDetails
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
        txDetails: this.state.txDetails
      })
    }
    let response = await (
      await fetch('http://127.0.0.1:5001/send_transaction', requestOptions
      )
    ).json()
    let message = response['message']
    alert(message)
  }

  onTxTextChange = (key, value) => {
    this.setState({
      txDetails: {
        ...this.state.txDetails,
        [key]: value
      }
    })
  }

  render() {
    return (
      <div class = "app">
        {this.state.route === 'overview' 
        ?
          <Overview
          onRouteChange = {this.onRouteChange}
          />
        : this.state.route === 'transfer'
        ?
          <TransferPage
          onRouteChange = {this.onRouteChange}
          sendTransaction = {this.sendTransaction}
          onTxTextChange = {this.onTxTextChange}
          />
        : this.state.route === 'login' || this.state.route === 'register' 
        ?
          <Authentication
          state = {this.state}
          onRouteChange = {this.onRouteChange}
          />
        :
          <>
          </>
        }
      </div>
    )
  }
}

export default App;
