import React, {Component} from 'react'
import {Navbar, Button} from 'react-bootstrap'

import './Navigation.css'

class Navigation extends Component {
  render () {
    return (
      <>
        <Navbar fixed = "top" className="justify-content-end">
          <Button 
            variant = "primary"
            onClick = {() => {this.props.onAuthentication('get_overview_route')}}
            >Overview
          </Button>
          <Button 
            variant = "primary"
            onClick = {() => {this.props.onRouteChange('login')}}
            >Sign Out
          </Button>
        </Navbar>
      </>
    )
  }
}

export default Navigation