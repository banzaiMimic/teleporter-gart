import React from 'react'

import { Teleporter } from './Teleporter'

class QueryUi extends React.Component {

  state = {
    teleporter: new Teleporter(),
    teleporterInput: ''
  }

  handleInputChange(event) {
    this.setState({ teleporterInput: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.state.teleporter.parseInput(this.state.teleporterInput)
  }

  render() {
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
        <p>{this.state.teleporterInput}</p>
      </>
    )
  }
}

export default QueryUi