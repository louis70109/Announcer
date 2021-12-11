import supertest from 'supertest'
import express from 'express'
import app from '../api'

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    supertest(app).get('/').then((response: any) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
