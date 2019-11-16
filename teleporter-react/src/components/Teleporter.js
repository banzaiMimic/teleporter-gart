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

Teleporter.prototype.citiesConnect = function(origin, destination) {
  this.search = true
  let nodes = Object.keys(this.adjList)
  const visited = {}
  nodes = nodes.filter(city => city !== origin)
  nodes.unshift(origin)
  this.citiesConnectUtil(nodes[0], visited, destination)
  console.log('cities connect : ' + !this.search)
}

Teleporter.prototype.citiesConnectUtil = function(vertex, visited, destination) {
  if(!visited[vertex]) {
    visited[vertex] = true
    console.log(vertex, visited)
    const neighbors = this.adjList[vertex]
    for( let i=0; i<neighbors.length && this.search; i++) {
      console.log('neighbors : ' , neighbors)
      if(neighbors.includes(destination)) {
        console.log('found ' + destination + ' returning true...')
        this.search = false
      }
      this.citiesConnectUtil(neighbors[i], visited, destination)
    }
  }
}

Teleporter.prototype.loopPossible = function(origin) {
  this.jump.origin = origin
  this.jump.previousCity = origin
  this.search = true
  let nodes = Object.keys(this.adjList)
  const visited = {}
  const recStack = {}
  nodes = nodes.filter(city => city !== origin)
  nodes.unshift(origin)
  console.log('checking if loop possible from ', origin)
  this.loopPossibleUtil(nodes[0], visited, -1)
  console.log('visited :', visited)
  console.log('loop possible : ' + !this.search)
}

Teleporter.prototype.loopPossibleUtil = function(vertex, visited, parent) {
  visited[vertex] = true
  console.log('visited : ', visited)
  this.adjList[vertex].map( (destination) => {
    if(!visited[destination]) {
      console.log('heading to : ' + destination)
      visited[destination] = true
      this.loopPossibleUtil(destination, visited, vertex)
    } else if (destination !== parent && destination === this.jump.origin) {
      this.search = false
      console.log('already visited ' + destination + ' that is equal to origin ' + this.jump.origin + ' loop found ?')
    }
  })
}

Teleporter.prototype.checkJumps = function(vertex, jumps) {
  this.jump.cityList.clear()
  this.jump.origin = vertex
  console.log('---')
  console.log('checkJumps:: ' + jumps + ' max jumps from ' + vertex + '...')
  console.log('adjacent nodes to ' + vertex + ' : ' + this.adjList[vertex])

  for( let i=0; i<jumps; i++) {
    console.log('checkJumps loop:' + i + ': ajdList length is ' + this.adjList[vertex].length)
    if(i === 0) {
      this.adjList[vertex].map( c => this.jump.cityList.add(c))
    } else {
      this.getAdjacentFromList([...this.jump.cityList])
    }
  }
  console.log('typeof is : ' + typeof(this.jump.cityList))
  console.log('jumpList updated : ' , this.jump.cityList)
  return this.jump.cityList

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

  //custom
  this.addVertex('B')
  this.addVertex('C')
  this.addVertex('D')
  this.addVertex('E')
  this.addEdge('B', 'C')
  this.addEdge('C', 'D')
  this.addEdge('D', 'E')
  //this.addEdge('E', 'B')

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
  this.search = false
  this.jump = {
    cityList: new Set(),
    origin: '',
    previousCity: ''
  }
}
