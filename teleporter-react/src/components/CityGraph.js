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
  if(props.data) {
    return <GraphDisplay chart={props.data}/>
  } else {
    return <></>
  }
}