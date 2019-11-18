import Teleporter from './Teleporter'
import { parseInput } from './Parser'

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
cities from Summerton in 1 jumps
cities from Summerton in 2 jumps
can I teleport from Springton to Atlantis
can I teleport from Oaktown to Atlantis
loop possible from Oaktown
loop possible from Fortuna`
const teleporterData = parseInput(testInput)

beforeAll( () => {
  // populate teleporter with test data
  teleporter.build(teleporterData)
})

afterAll( () => {
  teleporter.clearData()
})
 
test('runQueries:: queries run and output correctly', () => {
  const output = teleporter.runQueries(teleporterData.queryData)
  const expectedOutput = [ 'cities from Summerton in 1 jumps: Springton,Hemingway',
  'cities from Summerton in 2 jumps: Springton,Hemingway,Chesterfield,Fortuna',
  'can I teleport from Springton to Atlantis: yes',
  'can I teleport from Oaktown to Atlantis: no',
  'loop possible from Oaktown: yes',
  'loop possible from Fortuna: no' ]
  expect(output).toEqual(expectedOutput)
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
