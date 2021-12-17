const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');
const jokes = require('./jokes/jokes-data');


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

const newUser = {username: "Maria", password: "1234"};


describe('server.js', () => {
    describe('[POST] /api/auth/register', () => {
        it('[1] saves the user with a bcrypted password instead of plain text', async () => {
            await request(server).post('/api/auth/register').send({ username: 'Maria', password: '1234' })
            const Maria = await db('users').where('username', 'Maria').first()
            expect(bcrypt.compareSync('1234', Maria.password)).toBeTruthy()
        }, 750)
        it('[2] responds with status 201 - successful registration', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(newUser);
            expect(res.status).toBe(201);
        }, 750)
        it('[3] responds with proper error status code & "username taken" message if username exists in users table', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: 'Priscila', password: '1234' })
            expect(res.status).toBe(422)
            expect(res.body.message).toMatch(/username taken/i)

        }, 750)
        it('[4] responds with an error status code if password are not sent', async () => {
            let res = await request(server)
                .post('/api/auth/register')
                .send({ username: 'Maria', password: '' })
            expect(res.status).toBe(422)
        }, 750)
        it('[5] responds with an error status code if username are not sent', async () => {
            let res = await request(server)
                .post('/api/auth/register')
                .send({ username: '', password: '1234' })
            expect(res.status).toBe(422)
        }, 750)
        it('[6] responds with "username and password required" message if either is not sent', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: '', password: '1234' })
                .send({ username: 'Maria', password: '' })
            expect(res.body.message).toMatch(/username and password required/i)

        }, 750)
  })
  describe('[POST] /api/auth/login', () => {
    it('[7] responds with a proper status code on successful login', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'Priscila', password: '1234' })
        expect(res.status).toBe(200)
    }, 750)
    it('[9] responds with a welcome message and a token on successful login', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'Priscila', password: '1234' })
       expect(res.body.message).toMatch(/welcome, Priscila/i)

    }, 750)
    it('[10] responds with an error status code if username or password are not sent', async () => {

    }, 750)
    it('[11] responds with status 422 - missing username or password', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({ username: '', password: '1234' })
        expect(res.status).toBe(422)
    }, 750)
    it('[12] responds with a proper status code on non-existing username', async () => {

    }, 750)
    it('[13] responds with "invalid credentials" message on non-existing username', async () => {

    }, 750)
    it('[14] responds with a proper status code on invalid password', async () => {

    }, 750)
    it('[15] responds with "invalid credentials" message on invalid password', async () => {

    }, 750)

//     it('[2] responds with the correct status and message on invalid credentials', async () => {
//       let res = await request(server).post('/api/auth/login').send({ username: 'bobsy', password: '1234' })
//       expect(res.body.message).toMatch(/invalid credentials/i)
//       expect(res.status).toBe(401)
//       res = await request(server).post('/api/auth/login').send({ username: 'bob', password: '12345' })
//       expect(res.body.message).toMatch(/invalid credentials/i)
//       expect(res.status).toBe(401)
//     }, 750)

  })
  

    describe('[GET] /api/jokes', () => {
        it('[16] requests without a token are bounced with proper status and message', async () => {
        const res = await request(server).get('/api/jokes')
        expect(res.body.message).toMatch(/token required/i)
        }, 750)
        it('[17] responds with a "token required" message on missing token', async () => {
        
        }, 750)        
        it('[18] responds with an error status code on invalid token', async () => {
        
        }, 750)
        it('[19] requests with an invalid token are bounced with proper status and message', async () => {
        const res = await request(server).get('/api/jokes').set('Authorization', 'foobar')
        expect(res.body.message).toMatch(/token invalid/i)
        }, 750)
        it('[20] responds with the jokes on valid token', async () => {
        
        }, 750)
    })
})

