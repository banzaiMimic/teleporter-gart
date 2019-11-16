import React from 'react'

import { Teleporter } from './Teleporter'

class QueryUi extends React.Component {

  state = {
    teleporter: new Teleporter(),
    teleporterInput: '',
    output: []
  }

  handleInputChange(event) {
    this.setState({ teleporterInput: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState( { output: this.state.teleporter.parseInput(this.state.teleporterInput) } )
  }

  render() {
    const output = this.state.output
    return(
      <>
        <h3>Input:</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <textarea cols={50} rows={16}
            value={this.state.teleporterInput}
            onChange={(e) => this.handleInputChange(e)}
          />
          <input className="btn-submit" type ="submit" value="Submit" />
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