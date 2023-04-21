import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Overview from './subcomponents/main/Overview'
import TransferPage from './subcomponents/main/Transfers'
import Authentication from './subcomponents/authentication/Authentication'

const initialLoginDetails = {
  email: '',
  username: '',
  password: ''
}

const initialGame = {
  player: {},
  opponent: {},
  text: "Hello, and welcome. Start the game below!"
}

const initialState = {
  route: 'overview',
  loginDetails: initialLoginDetails,
  game: initialGame
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

  onStartGame = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginDetails.username
      })
    }
    let response = await (
      await fetch(
        'http://127.0.0.1:5001/start_game', requestOptions
      )
    ).json()
    this.setState({
      game: response
    })
  }

  onContinueGame = async (choice) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        choice: choice
      })
    }
    let response = await (
      await fetch(
        'http://127.0.0.1:5001/continue_game', requestOptions
      )
    ).json()
    this.setState({
      game: response
    })
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

  render() {
    return (
      <div className = "app">
        {this.state.route === 'overview' 
        ?
          <Overview
          state = {this.state}
          onRouteChange = {this.onRouteChange}
          onStartGame = {this.onStartGame}
          onContinueGame = {this.onContinueGame}
          />
        : this.state.route === 'transfer'
        ?
          <TransferPage
          onRouteChange = {this.onRouteChange}
          sendTransaction = {this.sendTransaction}
          onFormTextChange = {this.onFormTextChange}
          onAuthentication = {this.onAuthentication}
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
