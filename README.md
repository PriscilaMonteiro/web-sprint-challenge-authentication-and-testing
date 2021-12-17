# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [ ] Run `npm install` to install your dependencies.
- [ ] Build your database executing `npm run migrate`.
- [ ] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.
2. What does `bcryptjs` do to help us store passwords in a secure manner?
3. How are unit tests different from integration and end-to-end testing?
4. How does _Test Driven Development_ change the way we write applications and tests?

--------------TESTS 20- 8 - 9

server.js > auth endpoints > [POST] /api/auth/login [8] responds with a proper status code on successful login server.js > auth endpoints > [POST] /api/auth/login [8] responds with a proper status code on successful login
Error: expect(received).toBe(expected) // Object.is equality
Expected: 200
Received: 500
at Object.<anonymous> (/home/codegrade/student/codegrade_mvp.test.js:86:28)
at processTicksAndRejections (node:internal/process/task_queues:96:5)

---

    server.js > jokes endpoint > [GET] /api/jokes [20] responds with the jokes on valid token server.js > jokes endpoint > [GET] /api/jokes [20] responds with the jokes on valid token

TypeError: Invalid value "undefined" for header "Authorization"
at ClientRequest.setHeader (node:\_http_outgoing:579:3)
at Test.request (/home/codegrade/student/node_modules/superagent/src/node/index.js:829:11)
at Test.Object.<anonymous>.Request.end
(/home/codegrade/student/node_modules/superagent/src/node/index.js:949:8)
at Test.end (/home/codegrade/student/node_modules/supertest/lib/test.js:161:7)
at /home/codegrade/student/node_modules/superagent/src/request-base.js:311:12
at new Promise (<anonymous>)
at Test.Object.<anonymous>.RequestBase.then (/home/codegrade/student/node_modules/superagent/src/request-base.js:293:31)
at processTicksAndRejections (node:internal/process/task_queues:96:5) \***\*\_\_\*\***
server.js > auth endpoints > [POST] /api/auth/login [9] responds with a welcome message and a token on successful login server.js > auth endpoints > [POST] /api/auth/login [9] responds with a welcome message and a token on successful login
Error: expect(received).toHaveProperty(path)
Expected path: "token"
Received path: []
Received value: {"message": "secretOrPrivateKey must have a value", "stack": "Error: secretOrPrivateKey must have a value
at Object.sign (/home/codegrade/student/node_modules/jsonwebtoken/sign.js:107:20)
at tokenBuilder (/home/codegrade/student/api/auth/token-builder.js:12:21)
at /home/codegrade/student/api/auth/auth-router.js:33:23
at Layer.handle [as handle_request] (/home/codegrade/student/node_modules/express/lib/router/layer.js:95:5)
at next (/home/codegrade/student/node_modules/express/lib/router/route.js:137:13)
at validatedUser (/home/codegrade/student/api/auth/auth-middleware.js:73:13)"}
at Object.<anonymous> (/home/codegrade/student/codegrade_mvp.test.js:91:26)
at processTicksAndRejections (node:internal/process/task_queues:96:5)
