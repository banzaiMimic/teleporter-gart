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

test('updating jumps method', () => {
  teleporter.checkJumps('Summerton',7)
})

// test('checkJumps:: Cities within 1 jump of Summerton should return Springton and Hemingway', () => {
//   const expected = new Set(['Springton', 'Hemingway'])
//   const result = teleporter.checkJumps('Summerton',1)
//   expect(result).toEqual(expected)
// })

// test('checkJumps:: Cities within 2 jumps of Summerton should return Springton, Hemingway, Chesterfield, Fortuna', () => {
//   const expected = new Set(['Springton', 'Hemingway', 'Chesterfield', 'Fortuna'])
//   const result = teleporter.checkJumps('Summerton',2)
//   expect(result).toEqual(expected)
// })

// test('citiesConnect:: Checking if cities Springton and Atlantis connect should return true', () => {
//   expect( teleporter.citiesConnect('Springton', 'Atlantis') ).toEqual(true)
// })

// test('citiesConnect:: Checking if cities Oaktown and Atlantis connect should return false', () => {
//   expect( teleporter.citiesConnect('Oaktown', 'Atlantis') ).toEqual(false)
// })

// test('loopPossible:: Checking if a loop is possible from Oaktown should return true', () => {
//   expect( teleporter.loopPossible('Oaktown') ).toEqual(true)
// })

// test('loopPossible:: Checking if a loop is possible from Fortuna should return false', () => {
//   expect( teleporter.loopPossible('Fortuna') ).toEqual(false)
// })

// test('loopPossible:: Checking if a loop is possible from D should return false', () => {
//   expect( teleporter.loopPossible('D') ).toEqual(false)
// })

// test('loopPossible:: Checking if a loop is possible from Chesterfield should return true', () => {
//   expect( teleporter.loopPossible('Chesterfield') ).toEqual(true)
// })