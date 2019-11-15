Teleporter.prototype.addVertex = function(vertex) {
  this.adjList[vertex] = []
}

Teleporter.prototype.addEdge = function(vertex0, vertex1) {
  this.adjList[vertex0].push(vertex1)
  this.adjList[vertex1].push(vertex0)
}

Teleporter.prototype.getAdjacentFromList = function(cityList) {
  cityList.map( (city) => {
    console.log('adjacent cities to : ' + city + ' : ' + this.adjList[city])
    return this.adjList[city].map( c => {
      return (c !== this.jump.origin) ? this.jump.cityList.add(c) : null
    })
  })
  console.log('returning adjacentCities : ' , this.jump.cityList)
}

Teleporter.prototype.checkJumps = function(vertex, jumps) {
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

Teleporter.prototype.addDummyData = function() {
  this.addVertex('Fortuna')
  this.addVertex('Hemingway')
  this.addVertex('Atlantis')
  this.addVertex('Chesterfield')
  this.addVertex('Springton')
  this.addVertex('Summerton')
  this.addVertex('Paristown')
  this.addVertex('Oaktown')
  this.addVertex('Los Amigos')

  this.addEdge('Fortuna', 'Hemingway')
  this.addEdge('Fortuna', 'Atlantis')
  this.addEdge('Hemingway', 'Chesterfield')
  this.addEdge('Chesterfield', 'Springton')
  this.addEdge('Los Amigos', 'Paristown')
  this.addEdge('Paristown', 'Oaktown')
  this.addEdge('Los Amigos', 'Oaktown')
  this.addEdge('Summerton', 'Springton')
  this.addEdge('Summerton', 'Hemingway')
}

export function Teleporter() {
  this.adjList = {}
  this.jump = {
    cityList: new Set(),
    origin: ''
  }
}
