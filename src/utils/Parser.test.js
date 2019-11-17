import { parseInput } from './Parser'

const testInput = `Fortuna - Hemingway
Fortuna - Atlantis
Hemingway - Chesterfield
Chesterfield - Springton
Los Amigos - Paristown
Paristown - Oaktown
Los Amigos - Oaktown
Summerton - Springton
Summerton - Hemingway
B - C
C - D
D - E
cities from Summerton in 1 jumps
cities from Summerton in 2 jumps
can I teleport from Springton to Atlantis
can I teleport from Oaktown to Atlantis
loop possible from Oaktown
loop possible from Fortuna`
let result

beforeAll( () => {
  result = parseInput(testInput)
})

test('parseInput:: expected cities', () => {
  let expectedCities = new Set ([
    'Fortuna',
    'Hemingway',
    'Atlantis',
    'Chesterfield',
    'Springton',
    'Los Amigos',
    'Paristown',
    'Oaktown',
    'Summerton',
    'B',
    'C',
    'D',
    'E' ])
  expect(result.cities).toEqual(expectedCities)
})

test('parseInput:: expected cityMap', () => {
  let expectedCityMap = [
    ["Fortuna", "Hemingway"], 
    ["Fortuna", "Atlantis"], 
    ["Hemingway", "Chesterfield"], 
    ["Chesterfield", "Springton"], 
    ["Los Amigos", "Paristown"], 
    ["Paristown", "Oaktown"], 
    ["Los Amigos", "Oaktown"], 
    ["Summerton", "Springton"], 
    ["Summerton", "Hemingway"], 
    ["B", "C"], 
    ["C", "D"], 
    ["D", "E"]]
  expect(result.cityMap).toEqual(expectedCityMap)
})

test('parseInput:: expected queryData', () => {
  let expectedQueryData = {
    "citiesConnect": 
    [["Springton", "Atlantis"], 
    ["Oaktown", "Atlantis"]], 
    "citiesWithinJumps": 
    [["Summerton", "1"], 
    ["Summerton", "2"]], 
    "loopPossibleFromCity": 
    ["Oaktown", "Fortuna"]}
  expect(result.queryData).toEqual(expectedQueryData)
})

test('parseInput:: expected errors', () => {
  let errInput = 'unformatted input...'
  let res = parseInput(errInput)
  expect(res.error.hasError).toEqual(true)
  expect(res.error.line).toEqual(errInput)
  res = parseInput('A - B')
  expect(res.error.hasError).toEqual(false)
})