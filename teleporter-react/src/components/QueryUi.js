import React from 'react'

import { Teleporter } from './Teleporter'

class QueryUi extends React.Component {

  state = {
    teleporter: null,
    teleporterInput: ''
  }

  componentDidMount() {
    this.createTeleporter()
  }

  handleInputChange(event) {
    this.setState({ teleporterInput: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  createTeleporter() {
    
    let teleporter = new Teleporter()
    teleporter.addTestData()
    this.setState( { teleporter }, () => {
      console.log('Teleporter set : ' , this.state.teleporter)
      //this.state.teleporter.checkJumps('Summerton', 1)
      //this.state.teleporter.checkJumps('Summerton', 2)
      //this.state.teleporter.citiesConnect('Springton', 'Atlantis')
      //this.state.teleporter.citiesConnect('Oaktown', 'Atlantis')
      //this.state.teleporter.loopPossible('Oaktown')
      //this.state.teleporter.loopPossible('Fortuna')
    })
    
  }

  render() {
    return(
      <>
        <h3>Input:</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <textarea 
            value={this.state.teleporterInput}
            onChange={(e) => this.handleInputChange(e)}
          />
          <input type ="submit" value="Submit" />
        </form>
        <h3>Output:</h3>
        <p>{this.state.teleporterInput}</p>
      </>
    )
  }
}

export default QueryUi