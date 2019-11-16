import React from 'react'

import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true
})

class GraphDisplay extends React.Component {
  componentDidMount() {
    mermaid.contentLoaded();
  }
  render() {
    return <div className="mermaid">{this.props.chart}</div>;
  }
}

export default function CityGraph(props) {
  return (props.data) ? <GraphDisplay chart={props.data}/> : <></>
}