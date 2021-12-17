const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

test('sanity', () => {
  expect(true).not.toBe(false)
})

test('it is the correct environment for the tests', () => {
    expect(process.env.NODE_ENV).toBe('testing');
});