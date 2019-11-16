Teleporter.prototype.addVertex = function(vertex) {
  this.cityData.adjList[vertex] = []
}

Teleporter.prototype.addEdge = function(vertex0, vertex1) {
  this.cityData.adjList[vertex0].push(vertex1)
  this.cityData.adjList[vertex1].push(vertex0)
}

Teleporter.prototype.getAdjacentCitiesFromList = function(cityList) {
  this.cityData.cityListCacheSize = this.cityData.cityList.size
  cityList.map( (city) => 
    // if city is not our origin city, add it to our cityList Set
    this.cityData.adjList[city].map( c => (c !== this.cityData.origin) ? this.cityData.cityList.add(c) : null)
    )
  return this.cityData.cityList
}

Teleporter.prototype.citiesConnect = function(origin, destination) {
  this.cityData.found = false
  const visited = {}
  return this.citiesConnectUtil(origin, visited, destination)
}

Teleporter.prototype.citiesConnectUtil = function(vertex, visited, destination) {
  if(!visited[vertex]) {
    visited[vertex] = true
    const neighbors = this.cityData.adjList[vertex]
    for( let i=0; i<neighbors.length && !this.cityData.found; i++) {
      if(neighbors.includes(destination)) {
        this.cityData.found = true
        return true
      } 
      return this.citiesConnectUtil(neighbors[i], visited, destination)
    }
  }
  return false
}

Teleporter.prototype.loopPossible = function(origin) {
  this.cityData.origin = origin
  this.cityData.found = false
  let nodes = Object.keys(this.cityData.adjList)
  const visited = {}
  nodes = nodes.filter(city => city !== origin)
  nodes.unshift(origin)
  console.log('checking if loop possible from ', origin)
  console.log('visited :', visited)
  console.log('loop possible : ' + this.cityData.found)
  this.loopPossibleUtil(nodes[0], visited, -1)
  return this.cityData.found
}

Teleporter.prototype.loopPossibleUtil = function(vertex, visited, parent) {
  visited[vertex] = true
  console.log('visited : ', visited)
  this.cityData.adjList[vertex].map( (destination) => {
    if(!visited[destination]) {
      console.log('heading to : ' + destination)
      visited[destination] = true
      return this.loopPossibleUtil(destination, visited, vertex)
    } else if (destination !== parent && destination === this.cityData.origin) {
      this.cityData.found = true
      console.log('already visited ' + destination + ' that is equal to origin ' + this.cityData.origin + ' loop found ?')
      return true
    }
  })
  return false
}

Teleporter.prototype.checkJumps = function(vertex, jumps) {
  this.cityData.cityList.clear()
  this.cityData.cityListCacheSize = 0
  this.cityData.origin = vertex

  for( let i=0; i<jumps; i++) {
    if(i === 0) {
      this.cityData.adjList[vertex].map( c => this.cityData.cityList.add(c))
    } else {
      // if no more adjacent nodes are being found, stop remaining jumps
      if(this.cityData.cityListCacheSize === this.cityData.cityList.size) {
        break
      }
      this.getAdjacentCitiesFromList([...this.cityData.cityList])
    }
  }
  return this.cityData.cityList

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
  this.cityData = {
    cityList: new Set(),
    adjList: {},
    cityListCacheSize: 0,
    found: false,
    origin: ''
  }
}
