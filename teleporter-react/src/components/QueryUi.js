import React from 'react'

function GraphData() {
  this.adjList = {}
  this.jump = {
    cityList: new Set(),
    origin: ''
  }
}

GraphData.prototype.addVertex = function(vertex) {
  this.adjList[vertex] = []
}

GraphData.prototype.addEdge = function(vertex0, vertex1) {
  this.adjList[vertex0].push(vertex1)
  this.adjList[vertex1].push(vertex0)
}

GraphData.prototype.getAdjacentFromList = function(cityList) {
  cityList.map( (city) => {
    console.log('adjacent cities to : ' + city + ' : ' + this.adjList[city])
    this.adjList[city].map( c => {
      return (c !== this.jump.origin) ? this.jump.cityList.add(c) : null
    })
  })
  console.log('returning adjacentCities : ' , this.jump.cityList)
}

GraphData.prototype.checkJumps = function(vertex, jumps) {
  this.jump.cityList.clear()
  this.jump.origin = vertex
  console.log('---')
  console.log('checkJumps:: ' + jumps + ' max jumps from ' + vertex + '...')
  console.log('adjacent nodes to ' + vertex + ' : ' + this.adjList[vertex])

  for( let i=0; i<jumps; i++) {
    if(i === 0) {
      this.adjList[vertex].map( c => this.jump.cityList.add(c))
    } else {
      this.getAdjacentFromList([...this.jump.cityList])
    }
  }

  console.log('jumpList updated : ' , this.jump.cityList)

}

class QueryUi extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.createGraphData()
  }

  createGraphData() {
    
    let data = new GraphData()
    data.addVertex('Fortuna')
    data.addVertex('Hemingway')
    data.addVertex('Atlantis')
    data.addVertex('Chesterfield')
    data.addVertex('Springton')
    data.addVertex('Summerton')
    data.addVertex('Paristown')
    data.addVertex('Oaktown')
    data.addVertex('Los Amigos')

    data.addEdge('Fortuna', 'Hemingway')
    data.addEdge('Fortuna', 'Atlantis')
    data.addEdge('Hemingway', 'Chesterfield')
    data.addEdge('Chesterfield', 'Springton')
    data.addEdge('Los Amigos', 'Paristown')
    data.addEdge('Paristown', 'Oaktown')
    data.addEdge('Los Amigos', 'Oaktown')
    data.addEdge('Summerton', 'Springton')
    data.addEdge('Summerton', 'Hemingway')
    this.setState( { data }, () => {
      console.log('graphdata set : ' , this.state.data)
      //this.state.data.checkJumps('Summerton', 1)
      this.state.data.checkJumps('Summerton', 2)
    } )
    
  }

  render() {
    return(
      <p>query ui</p>
    )
  }
}

export default QueryUi