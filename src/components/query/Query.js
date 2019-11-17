import React from 'react'

import { Teleporter } from '../../utils/Teleporter'
import CityGraph from './CityGraph'
import ErrorMessage from './ErrorMessage'
import * as Constants from '../../constants'

class Query extends React.Component {

  state = {
    teleporter: new Teleporter(),
    teleporterInput: '',
    output: [],
    graphModel: '',
    showInstructions: false,
    errorLine: ''
  }

  onInputChange(event) {
    this.setState({ teleporterInput: event.target.value })
  }

  submit(event) {
    event.preventDefault()
    this.setState( { 
      output: this.state.teleporter.parseInput(this.state.teleporterInput),
      graphModel: this.state.teleporter.parseGraphData(),
      showInstructions: false,
      errorLine: ''
    }, () => {
      const err = this.state.teleporter.error
      if(err.hasError) {
        this.setState({ 
          showInstructions: true,
          errorLine: err.line
        })
        this.clear()
      }
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
      showInstructions: false,
      teleporterInput: Constants.DEFAULT_INPUT
    })
  }

  render() {
    const { 
      output, 
      graphModel, 
      errorLine,
      showInstructions,
      teleporterInput
    } = this.state
    
    return(
      <>
        <CityGraph data={graphModel}/>
        <h3>Input:</h3>
        {showInstructions && <ErrorMessage errorLine={errorLine} />}
        <form>
          <textarea cols={50} rows={16}
            value={teleporterInput}
            onChange={(e) => this.onInputChange(e)}
          />
          {output.length === 0 && <input onClick={(e) => this.submit(e)} className="btn-submit" type="submit" value="Submit" />}
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

export default Query