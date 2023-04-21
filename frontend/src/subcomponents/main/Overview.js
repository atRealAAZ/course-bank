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
        {/* <Card> */}
          {/* <Card.Body>   */}
          {this.props.state.game.text}
          
          {/* </Card.Body> */}
          {this.props.state.game.state !== 'playing'
          ?
            <Button 
              variant="danger"
              onClick = {this.props.onStartGame} 
              >Start
            </Button>
          :
           null
          }
          {this.props.state.game.state === 'playing'
            ?
            <>
              <Option
                option = "Collaborate"
                onContinueGame = {this.props.onContinueGame}
              />
              <Option 
                option = "Betray"
                onContinueGame = {this.props.onContinueGame}
              />
            </>
          :
            null
          }
          {/* <Card.Body>
         
           <Option/>
           <Option/>
           <Option/>
          
          </Card.Body> */}
        {/* </Card> */}
      </>
    )
  }
}

class Option extends Component {
  render() {
    let option = this.props.option
    return(
      <Card>
        Choose {option}
        <Card.Body>
        
          <Button 
            variant="danger"
            onClick = {() => {this.props.onContinueGame(option)}}
            >Choose 
          </Button>
        </Card.Body>
      </Card>
    )
  }
}




export default Overview
