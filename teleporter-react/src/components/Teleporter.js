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

Teleporter.prototype.loopPossibleFromCity = function(origin) {
  this.cityData.origin = origin
  this.cityData.found = false
  const visited = {}
  this.loopPossibleFromCityUtil(origin, visited, -1)
  return this.cityData.found
}

Teleporter.prototype.loopPossibleFromCityUtil = function(vertex, visited, parent) {
  visited[vertex] = true
  this.cityData.adjList[vertex].map( (destination) => {
    if(!visited[destination]) {
      visited[destination] = true
      return this.loopPossibleFromCityUtil(destination, visited, vertex)
    } else if (destination !== parent && destination === this.cityData.origin) {
      this.cityData.found = true
      return true
    }
    return false
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

Teleporter.prototype.parseInput = function(input) {
  console.log('parsing input ', input)
  const lines = input.split('\n')
  let cities = new Set()
  let cityMap = []
  lines.map( (line) => {
    if (line.includes('-')) {
      const edge = line.split(' - ')
      edge.map( c => cities.add(c) )
      cityMap.push(edge)
    } else if(line.includes('cities')) {
      
    } else if(line.includes('can')) {
      
    }
    return false
  })
  cities.forEach( c => this.addVertex(c))
  cityMap.map( m => this.addEdge(m[0], m[1]))
}

Teleporter.prototype.addTestData = function() {
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

Teleporter.prototype.clearData = function() {
  this.cityData = {
    cityList: new Set(),
    adjList: {},
    cityListCacheSize: 0,
    found: false,
    origin: ''
  }
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
