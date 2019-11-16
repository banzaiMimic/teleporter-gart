Teleporter.prototype.addVertex = function(vertex) {
  this.cityData.adjList[vertex] = []
  this.cityData.cityKeys[vertex] = Object.keys(this.cityData.cityKeys).length+1
}

Teleporter.prototype.addEdge = function(vertex0, vertex1) {
  this.cityData.adjList[vertex0].push(vertex1)
  this.cityData.adjList[vertex1].push(vertex0)
}

Teleporter.prototype.getAdjacentCitiesFromList = function(cityList) {
  this.cityData.citiesJumpedCacheSize = this.cityData.citiesJumped.size
  cityList.map( (city) => 
    // if city is not our origin city, add it to our cityList Set
    this.cityData.adjList[city].map( c => (c !== this.cityData.origin) ? this.cityData.citiesJumped.add(c) : null)
    )
  return this.cityData.citiesJumped
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

Teleporter.prototype.citiesWithinJumps = function(vertex, jumps) {
  this.cityData.citiesJumped.clear()
  this.cityData.citiesJumpedCacheSize = 0
  this.cityData.origin = vertex

  for( let i=0; i<jumps; i++) {
    if(i === 0) {
      this.cityData.adjList[vertex].map( c => this.cityData.citiesJumped.add(c))
    } else {
      // if no more adjacent nodes are being found, stop remaining jumps
      if(this.cityData.citiesJumpedCacheSize === this.cityData.citiesJumped.size) {
        break
      }
      this.getAdjacentCitiesFromList([...this.cityData.citiesJumped])
    }
  }
  return this.cityData.citiesJumped
}

Teleporter.prototype.parseInput = function(input) {
  const lines = input.split('\n')
  let cities = new Set()
  let cityMap = []
  lines.map( (line) => {
    if (line.includes('-')) {
      const edge = line.split(' - ')
      edge.map( c => cities.add(c) )
      cityMap.push(edge)
    } else if(line.includes('cities')) {
      // citiesWithinJumps
      let city = line.match(new RegExp('from\\s(\\w+)'))[1]
      let jumps = line.match(new RegExp('in\\s(\\w+)'))[1]
      this.queryData.citiesWithinJumps.push([city, jumps])
    } else if(line.includes('can')) {
      // citiesConnect
      let from = line.match(new RegExp('from\\s(\\w+)'))[1]
      let to = line.match(new RegExp('to\\s(\\w+)'))[1]
      this.queryData.citiesConnect.push([from, to])
    } else if(line.includes('loop')) {
      // loopPossibleFromCity
      let city = line.match(new RegExp('from\\s(\\w+)'))[1]
      this.queryData.loopPossibleFromCity.push(city)
    } else {
      this.error.hasError = true
      this.error.line = line
    }
    return false
  })
  cities.forEach( c => this.addVertex(c))
  cityMap.map( m => this.addEdge(m[0], m[1]))
  return this.runQueries()
}

Teleporter.prototype.parseGraphData = function() {
  const keys = Object.keys(this.cityData.adjList)
  let graphData = `graph LR;\n`
  keys.map( key => this.cityData.adjList[key].map( neighbor => graphData += `${this.cityData.cityKeys[key]}[${key}]-->${this.cityData.cityKeys[neighbor]}[${neighbor}];\n`))
  return this.cityData.graphModel = graphData
}

// populates this.output from queries ran from input
Teleporter.prototype.runQueries = function() {
  this.output = []
  this.queryData.citiesWithinJumps.map( cwjQuery => this.output.push( `cities from ${cwjQuery[0]} in ${cwjQuery[1]} jumps: ${[...this.citiesWithinJumps(cwjQuery[0], cwjQuery[1])]}`))
  this.queryData.citiesConnect.map( ccQuery => this.output.push( `can I teleport from ${ccQuery[0]} to ${ccQuery[1]}: ${this.citiesConnect(ccQuery[0], ccQuery[1]) ? 'yes' : 'no'}`))
  this.queryData.loopPossibleFromCity.map( lpQuery => this.output.push( `loop possible from ${lpQuery}: ${this.loopPossibleFromCity(lpQuery) ? 'yes' : 'no'}`))
  return this.output
}

Teleporter.prototype.clearData = function() {
  this.cityData = {
    cityKeys: {},
    citiesJumped: new Set(),
    adjList: {},
    cityListCacheSize: 0,
    found: false,
    origin: '',
    graphModel: ''
  }
  this.queryData = {
    citiesWithinJumps: [],
    citiesConnect: [],
    loopPossibleFromCity: []
  }
  this.output = []
  this.error = {
    hasError: false,
    line: ''
  }
}

export function Teleporter() {
  this.cityData = {
    cityKeys: {},
    citiesJumped: new Set(),
    adjList: {},
    cityListCacheSize: 0,
    found: false,
    origin: '',
    graphModel: ''
  }
  this.queryData = {
    citiesWithinJumps: [],
    citiesConnect: [],
    loopPossibleFromCity: []
  }
  this.output = []
  this.error = {
    hasError: false,
    line: ''
  }
}
