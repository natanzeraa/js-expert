import assert from 'node:assert'
import { createSandbox } from 'sinon'
import alderaan from '../mocks/alderaan.json' with { type: 'json' }
import tatooine from '../mocks/tatooine.json' with { type: 'json' }
import Service from './service.js'

const sinon = createSandbox()

const BASE_URL_1 = 'https://swapi.py4e.com/api/planets/1/'
const BASE_URL_2 = 'https://swapi.py4e.com/api/planets/2/'


; (async () => {
  // {
  //     // Esse exemplo acessa a internet toda vez quando o teste é executado
  //     const service = new Service()
  //     const data = await service.makeRequest(BASE_URL_1)
  //     console.log('data', data)
  // }

  const service = new Service()

  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )

  stub
    .withArgs(BASE_URL_1)
    .resolves(tatooine)

  stub
    .withArgs(BASE_URL_2)
    .resolves(alderaan)

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appeardIn: 5
    }

    const result = await service.getPlanets(BASE_URL_1)
    assert.deepStrictEqual(result, expected)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appeardIn: 2
    }

    const result = await service.getPlanets(BASE_URL_2)
    assert.deepStrictEqual(result, expected)
  }
})()