import React, {Component} from 'react'
import {Navbar, Button} from 'react-bootstrap'

import './Navigation.css'

class Navigation extends Component {
  render () {
    return (
      <>
        <Navbar fixed = "top" className="justify-content-end">
          <Button 
            variant = "danger"
            onClick = {() => {this.props.onRouteChange('login')}}
            >Sign Out
          </Button>
        </Navbar>
      </>
    )
  }
}

export default Navigation