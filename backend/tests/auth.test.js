/**
 * Basic auth tests skeleton using supertest
 * To run:
 *  - configure a test MongoDB (or use in-memory MongoDB)
 *  - run `npm test`
 *
 * This file is a template and will require database setup to run reliably.
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth routes', () => {
  beforeAll(async () => {
    // You should set MONGO_URI for tests or use mongodb-memory-server for isolation.
    if (!process.env.MONGO_URI) {
      console.warn('MONGO_URI not set - skipping tests that require DB.');
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'campushub_test' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('register rejects non-student email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test',
        email: 'someone@gmail.com',
        password: 'pass12345',
        regNo: '123',
        department: 'CSE',
        batch: '20'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/student email/);
  });

  // Further tests require email sending and OTP; you can mock emailService and OTP collection.
});
