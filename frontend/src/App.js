import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Overview from './subcomponents/main/Overview'
import TransferPage from './subcomponents/main/Transfers'
import ProductPage from './subcomponents/main/Products'
import Authentication from './subcomponents/authentication/Authentication'

const initialLoginDetails = {
  email: '',
  username: '',
  password: ''
}

const initialTxDetails = {
  txToAccount: '',
  txAmount: 0,
  txCurrency: ''
}

const initialAcctDetails = {
  username: '',
  accountNumber: '',
  balance: 0
}

const initialTxTable = {
  exists: false,
  txs: []
}

const initialProductDetails = {
  accepted: false,
  details: {}
}

const initialState = {
  route: 'login',
  loginDetails: initialLoginDetails,
  txDetails: initialTxDetails,
  acctDetails: initialAcctDetails,
  txTable: initialTxTable,
  productDetails: initialProductDetails
}


class App extends Component {

  constructor() {
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
        username: this.state.loginDetails.username,
        txDetails: this.state.txDetails
      })
    }
    let response = await (
      await fetch(
        'http://127.0.0.1:5001/send_transaction', requestOptions
      )
    ).json()
    let message = response['message']
    alert(message)
  }

  onFormTextChange = (object, key, value) => {
    this.setState({
      [object]: {
        ...this.state[object],
        [key]: value
      }
    })
  }

  onAuthentication = async (route) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loginDetails: this.state.loginDetails
      })
    }
    let response = await (
      await fetch(
        'http://127.0.0.1:5001/' + route, requestOptions
      )
    ).json()
    let success = response['success']
    let message = response['message']
    let result = response['result']
    if (success) {
      this.setState({
        ...this.state,
        route: 'overview',
        acctDetails: result['account_details'],
        txTable: result['tx_table']
      })
    }
    if (route !== 'get_overview_route') {
      alert(message)
    }
  }

  onNavigatePagination = (value) => {
    let page = this.state.txTable.page
    if (value === 'Next') {
      this.setState({
        txTable: {
          ...this.state.txTable,
          page: page + 1
        }
      })
    } else {
      this.setState({
        txTable: {
          ...this.state.txTable,
          page: page - 1
        }
      })
    } 
  }

  onGetProduct = async (product) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: product,
        productDetails: this.state.productDetails
      })
    }
    let response = await (
      await fetch(
        'http://127.0.0.1:5001/get_product', requestOptions
      )
    ).json()
    let success = response['success']
    let message = response['message']
    let result = response['result']
    if (success) {
      this.setState({
        ...this.state,
        route: 'productOffer',
        productDetails: result,
      })
    }
  }
    

  render() {
    return (
      <div className = "app">
        {this.state.route === 'overview' 
        ?
          <Overview
          state = {this.state}
          onRouteChange = {this.onRouteChange}
          onNavigatePagination = {this.onNavigatePagination}
          />
        : this.state.route === 'transfer'
        ?
          <TransferPage
          onRouteChange = {this.onRouteChange}
          sendTransaction = {this.sendTransaction}
          onFormTextChange = {this.onFormTextChange}
          onAuthentication = {this.onAuthentication}
          />
        : this.state.route === 'products'
        ?
          <ProductPage
          onRouteChange = {this.onRouteChange}
          onGetProduct = {this.onGetProduct}
          />
        : this.state.route === 'login' || this.state.route === 'register' 
        ?
          <Authentication
          state = {this.state}
          onRouteChange = {this.onRouteChange}
          onFormTextChange = {this.onFormTextChange}
          onAuthentication = {this.onAuthentication}
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
