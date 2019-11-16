import React from 'react'

import { Teleporter } from './Teleporter'
import CityGraph from './CityGraph'

class QueryUi extends React.Component {

  state = {
    teleporter: new Teleporter(),
    teleporterInput: '',
    output: [],
    graphModel: ''
  }

  onInputChange(event) {
    this.setState({ teleporterInput: event.target.value })
  }

  submit() {
    this.setState( { 
      output: this.state.teleporter.parseInput(this.state.teleporterInput),
      graphModel: this.state.teleporter.parseGraphData()
    } )
  }

  clear() {
    this.state.teleporter.clearData()
    this.setState({
      output: [],
      teleporterInput: '',
      graphModel: null
    })
  }

  loadDefaultInput() {
    this.clear()
    this.setState({
      teleporterInput: `Fortuna - Hemingway
Fortuna - Atlantis
Hemingway - Chesterfield
Chesterfield - Springton
Los Amigos - Paristown
Paristown - Oaktown
Los Amigos - Oaktown
Summerton - Springton
Summerton - Hemingway
cities from Summerton in 1 jumps
cities from Summerton in 2 jumps
can I teleport from Springton to Atlantis
can I teleport from Oaktown to Atlantis
loop possible from Oaktown
loop possible from Fortuna`
    })
  }

  render() {
    const output = this.state.output
    const data = this.state.graphModel
    return(
      <>
        <CityGraph data={data}/>
        <h3>Input:</h3>
        <form>
          <textarea cols={50} rows={16}
            value={this.state.teleporterInput}
            onChange={(e) => this.onInputChange(e)}
          />
          {this.state.output.length === 0 && <input onClick={() => this.submit()} className="btn-submit" type="submit" value="Submit" />}
        </form>
        <input onClick={() => this.clear()} className="btn-submit" type="submit" value="Clear" />
        <input onClick={() => this.loadDefaultInput()} className="btn-submit" type="submit" value="Load Default Input" />
        
        <h3>Output:</h3>
        <ul>
          {output.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default QueryUi