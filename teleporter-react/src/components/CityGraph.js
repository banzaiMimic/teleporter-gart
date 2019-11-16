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

export default function CityGraph() {
  return (
    <GraphDisplay
        chart={`graph LR;
                A[Fortuna]-->B[Hemingway];
                A-->C[Atlantis];
                B-->D[Chesterfield];
                D-->E[Springton];
                F[Los Amigos]-->G[Paristown];
                G-->H[Oaktown];
                F-->H;
                I[Summerton]-->E;
                I-->B;
      `}
      />
  )
}