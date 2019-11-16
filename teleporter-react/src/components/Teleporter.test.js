import { Teleporter } from './Teleporter'

const teleporter = new Teleporter()
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
` 

beforeAll( () => {
  // populate teleporter with test data
  teleporter.parseInput(testInput)
})

afterAll( () => {
  teleporter.clearData()
})

test('parseInput:: initial citymap test data', () => {
  let expectedAdjList = {}
  expectedAdjList['Fortuna'] = ['Hemingway', 'Atlantis']
  expectedAdjList['Hemingway'] = ['Fortuna', 'Chesterfield', 'Summerton']
  expectedAdjList['Atlantis'] = ['Fortuna']
  expectedAdjList['B'] = ['C']
  expectedAdjList['C'] = ['B', 'D']
  expectedAdjList['Chesterfield'] = ['Hemingway', 'Springton']
  expectedAdjList['D'] = ['C', 'E']
  expectedAdjList['E'] = ['D']
  expectedAdjList['Springton'] = ['Chesterfield', 'Summerton']
  expectedAdjList['Los Amigos'] = ['Paristown', 'Oaktown']
  expectedAdjList['Paristown'] = ['Los Amigos', 'Oaktown']
  expectedAdjList['Oaktown'] = ['Paristown', 'Los Amigos']
  expectedAdjList['Summerton'] = ['Springton', 'Hemingway']
  expect(teleporter.cityData.adjList).toEqual(expectedAdjList)
})

test('citiesWithinJumps:: 1 jump of Summerton', () => {
  const expected = new Set(['Springton', 'Hemingway'])
  const result = teleporter.citiesWithinJumps('Summerton',1)
  expect(result).toEqual(expected)
})

test('citiesWithinJumps:: 2 jumps of Summerton', () => {
  const expected = new Set(['Springton', 'Hemingway', 'Chesterfield', 'Fortuna'])
  const result = teleporter.citiesWithinJumps('Summerton',2)
  expect(result).toEqual(expected)
})

test('citiesConnect:: Springton and Atlantis', () => {
  expect( teleporter.citiesConnect('Springton', 'Atlantis') ).toEqual(true)
})

test('citiesConnect:: Oaktown and Atlantis', () => {
  expect( teleporter.citiesConnect('Oaktown', 'Atlantis') ).toEqual(false)
})

test('loopPossibleFromCity:: Oaktown', () => {
  expect( teleporter.loopPossibleFromCity('Oaktown') ).toEqual(true)
})

test('loopPossibleFromCity:: Fortuna', () => {
  expect( teleporter.loopPossibleFromCity('Fortuna') ).toEqual(false)
})

test('loopPossibleFromCity:: D', () => {
  expect( teleporter.loopPossibleFromCity('D') ).toEqual(false)
})

test('loopPossibleFromCity:: Chesterfield', () => {
  expect( teleporter.loopPossibleFromCity('Chesterfield') ).toEqual(true)
})