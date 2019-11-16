import { Teleporter } from './Teleporter'

const teleporter = new Teleporter()

beforeAll( () => {
  // populate teleporter with test data
  teleporter.addVertex('Fortuna')
  teleporter.addVertex('Hemingway')
  teleporter.addVertex('Atlantis')
  teleporter.addVertex('Chesterfield')
  teleporter.addVertex('Springton')
  teleporter.addVertex('Summerton')
  teleporter.addVertex('Paristown')
  teleporter.addVertex('Oaktown')
  teleporter.addVertex('Los Amigos')
  teleporter.addVertex('B')
  teleporter.addVertex('C')
  teleporter.addVertex('D')
  teleporter.addVertex('E')

  teleporter.addEdge('B', 'C')
  teleporter.addEdge('C', 'D')
  teleporter.addEdge('D', 'E')
  teleporter.addEdge('Fortuna', 'Hemingway')
  teleporter.addEdge('Fortuna', 'Atlantis')
  teleporter.addEdge('Hemingway', 'Chesterfield')
  teleporter.addEdge('Chesterfield', 'Springton')
  teleporter.addEdge('Los Amigos', 'Paristown')
  teleporter.addEdge('Paristown', 'Oaktown')
  teleporter.addEdge('Los Amigos', 'Oaktown')
  teleporter.addEdge('Summerton', 'Springton')
  teleporter.addEdge('Summerton', 'Hemingway')
})

test('checkJumps:: 1 jump of Summerton', () => {
  const expected = new Set(['Springton', 'Hemingway'])
  const result = teleporter.checkJumps('Summerton',1)
  expect(result).toEqual(expected)
})

test('checkJumps:: 2 jumps of Summerton', () => {
  const expected = new Set(['Springton', 'Hemingway', 'Chesterfield', 'Fortuna'])
  const result = teleporter.checkJumps('Summerton',2)
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