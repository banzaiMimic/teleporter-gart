export const parseInput = (input) => {
  const lines = input.split('\n')
  let cities = new Set()
  let cityMap = []
  let queryData = {
    citiesWithinJumps: [],
    citiesConnect: [],
    loopPossibleFromCity: []
  }
  let error = {
    hasError: false,
    line: ''
  }
  lines.map( (line) => {
    if (line.includes('-')) {
      const edge = line.split(' - ')
      edge.map( c => cities.add(c) )
      cityMap.push(edge)
    } else if(line.includes('cities')) {
      // citiesWithinJumps
      let city = line.match(new RegExp('from\\s(\\w+)'))[1]
      let jumps = line.match(new RegExp('in\\s(\\w+)'))[1]
      queryData.citiesWithinJumps.push([city, jumps])
    } else if(line.includes('can')) {
      // citiesConnect
      let from = line.match(new RegExp('from\\s(\\w+)'))[1]
      let to = line.match(new RegExp('to\\s(\\w+)'))[1]
      queryData.citiesConnect.push([from, to])
    } else if(line.includes('loop')) {
      // loopPossibleFromCity
      let city = line.match(new RegExp('from\\s(\\w+)'))[1]
      queryData.loopPossibleFromCity.push(city)
    } else {
      error.hasError = true
      error.line = line
    }
    return false
  })
  return {
    cities,
    cityMap,
    queryData,
    error
  }
}