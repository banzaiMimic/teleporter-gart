import { Teleporter } from './Teleporter'

const teleporter = new Teleporter()

beforeAll( () => {
  teleporter.addDummyData()
})

test('Cities within 1 jump of Summerton should return Springton and Hemingway', () => {
  const expected = new Set(['Springton', 'Hemingway'])
  const result = teleporter.checkJumps('Summerton',1)
  expect(result).toEqual(expected)
})