import supertest from 'supertest'
import app from '../api'


const OLD_ENV = process.env;
beforeEach(() => {
  jest.resetModules(); // most important - it clears the cache
  process.env = { ...OLD_ENV }; // make a copy
});

afterAll(() => {
  process.env = OLD_ENV; // restore old env
});
describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    supertest(app).get('/').then((response: any) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
