export default class Teleporter {

  constructor() {
    this._cityData = {
      cityKeys: {},
      citiesJumped: new Set(),
      adjList: {},
      cityListCacheSize: 0,
      found: false,
      origin: '',
      graphModel: ''
    }
  }

  addVertex = vertex => {
    this._cityData.adjList[vertex] = []
    this._cityData.cityKeys[vertex] = Object.keys(this._cityData.cityKeys).length + 1
  }

  addEdge = (vertex0, vertex1) => {
    this._cityData.adjList[vertex0].push(vertex1)
    this._cityData.adjList[vertex1].push(vertex0)
  }

  getAdjacentCitiesFromList = cityList => {
    this._cityData.citiesJumpedCacheSize = this._cityData.citiesJumped.size
    cityList.map( (city) => 
      // if city is not our origin city, add it to our cityList Set
      this._cityData.adjList[city].map( c => (c !== this._cityData.origin) ? this._cityData.citiesJumped.add(c) : null)
      )
    return this._cityData.citiesJumped
  }

  citiesConnect = (origin, destination) => {
    this._cityData.found = false
    const visited = {}
    return this.citiesConnectUtil(origin, visited, destination)
  }

  citiesConnectUtil = (vertex, visited, destination) => {
    if(!visited[vertex]) {
      visited[vertex] = true
      const neighbors = this._cityData.adjList[vertex]
      for( let i=0; i<neighbors.length && !this._cityData.found; i++) {
        if(neighbors.includes(destination)) {
          this._cityData.found = true
          return true
        } 
        return this.citiesConnectUtil(neighbors[i], visited, destination)
      }
    }
    return false
  }

  loopPossibleFromCity = origin => {
    this._cityData.origin = origin
    this._cityData.found = false
    const visited = {}
    this.loopPossibleFromCityUtil(origin, visited, -1)
    return this._cityData.found
  }

  loopPossibleFromCityUtil = (vertex, visited, parent) => {
    visited[vertex] = true
    this._cityData.adjList[vertex].map( (destination) => {
      if(!visited[destination]) {
        visited[destination] = true
        return this.loopPossibleFromCityUtil(destination, visited, vertex)
      } else if (destination !== parent && destination === this._cityData.origin) {
        this._cityData.found = true
        return true
      }
      return false
    })
    return false
  }

  citiesWithinJumps = (vertex, jumps) => {
    this._cityData.citiesJumped.clear()
    this._cityData.citiesJumpedCacheSize = 0
    this._cityData.origin = vertex
  
    for( let i=0; i<jumps; i++) {
      if(i === 0) {
        this._cityData.adjList[vertex].map( c => this._cityData.citiesJumped.add(c))
      } else {
        // if no more adjacent nodes are being found, stop remaining jumps
        if(this._cityData.citiesJumpedCacheSize === this._cityData.citiesJumped.size) {
          break
        }
        this.getAdjacentCitiesFromList([...this._cityData.citiesJumped])
      }
    }
    return this._cityData.citiesJumped
  }

  build = parsedInput => {
    parsedInput.cities.forEach( c => this.addVertex(c))
    parsedInput.cityMap.map( m => this.addEdge(m[0], m[1]))
  }

  getGraphAsText = () => {
    const keys = Object.keys(this._cityData.adjList)
    let graphData = `graph LR;\n`
    keys.map( key => this._cityData.adjList[key].map( neighbor => graphData += `${this._cityData.cityKeys[key]}[${key}]-->${this._cityData.cityKeys[neighbor]}[${neighbor}];\n`))
    return this._cityData.graphModel = graphData
  }
  
  // returns formatted output array from queries ran from parsedInput.queryData obj
  runQueries = queryData => {
    let output = []
    queryData.citiesWithinJumps.map( cwjQuery => output.push( `cities from ${cwjQuery[0]} in ${cwjQuery[1]} jumps: ${[...this.citiesWithinJumps(cwjQuery[0], cwjQuery[1])]}`))
    queryData.citiesConnect.map( ccQuery => output.push( `can I teleport from ${ccQuery[0]} to ${ccQuery[1]}: ${this.citiesConnect(ccQuery[0], ccQuery[1]) ? 'yes' : 'no'}`))
    queryData.loopPossibleFromCity.map( lpQuery => output.push( `loop possible from ${lpQuery}: ${this.loopPossibleFromCity(lpQuery) ? 'yes' : 'no'}`))
    return output
  }
  
  clearData = () => {
    this._cityData = {
      cityKeys: {},
      citiesJumped: new Set(),
      adjList: {},
      cityListCacheSize: 0,
      found: false,
      origin: '',
      graphModel: ''
    }
  }
}
