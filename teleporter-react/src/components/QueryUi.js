import React from 'react'

import { Teleporter } from './Teleporter'

class QueryUi extends React.Component {

  state = {
    teleporter: null
  }

  componentDidMount() {
    this.createTeleporter()
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
      <p>query ui</p>
    )
  }
}

export default QueryUi