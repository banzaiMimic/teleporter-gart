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

  handleInputChange(event) {
    this.setState({ teleporterInput: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState( { 
      output: this.state.teleporter.parseInput(this.state.teleporterInput),
      graphModel: this.state.teleporter.parseGraphData()
    } )
  }

  clear(event) {
    event.preventDefault()
    this.state.teleporter.clearData()
    this.setState({
      output: [],
      teleporterInput: '',
      graphModel: null
    })
  }

  render() {
    const output = this.state.output
    const data = this.state.graphModel
    return(
      <>
        <CityGraph data={data}/>
        <h3>Input:</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <textarea cols={50} rows={16}
            value={this.state.teleporterInput}
            onChange={(e) => this.handleInputChange(e)}
          />
          {this.state.output.length === 0 && <input className="btn-submit" type="submit" value="Submit" />}
        </form>
        <form onSubmit={(e) => this.clear(e)}>
          <input className="btn-submit" type="submit" value="Clear" />
        </form>
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