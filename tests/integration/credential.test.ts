import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createCredential, createSessionAndToken, createUser } from '../factories';
import { cleanDb } from '../helpers';
import { duplicatedEmailError } from '@/errors';
import app, { init } from '@/app';
import * as jwt from 'jsonwebtoken';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /credential', () => {
    describe('/credential', () => {
      it('should respond status 401 when token isnt given ', async () => {
        const response = await server.get('/credential').set('Authorization', `Bearer`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
  
      it('should respond status 401 when token isnt invalid ', async () => {
        const token = faker.lorem.word();
        const response = await server.get('/credential').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
  
      it('should respond status 401 when dont have session for token', async () => {
        const user = await createUser();
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
        const response = await server.get('/credential').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    });
});

describe('POST /credential', () => {
  it('should respond with status 401 when body is not given', async () => {
    const response = await server.post('/credential');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/credential').send(invalidBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
        title: faker.lorem.word(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.password(6),
        userId: expect.any(Number),
    });



      it('should respond with status 409 when there is an user with given email', async () => {
        const body = generateValidBody();
        await createCredential(body);

        const response = await server.post('/credential').send(body);

        expect(response.status).toBe(httpStatus.CONFLICT);
        expect(response.body.message).toEqual(duplicatedEmailError().message);
      });

      it('should respond with status 200 and save credential on DB', async () => {
        const token = await createSessionAndToken()
        const data = {
           title: faker.lorem.word(),
           url: faker.internet.url(),
           username: faker.internet.userName(),
           password: faker.internet.password(6),
           userId: token.id
        }
    
        const response = await server.post('/credential/create').set('Authorization', `Bearer ${token.token}`).send(data);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual({
          id: expect.any(Number),
          title: expect.any(String),
          url: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          userId: expect.any(String),
        });
      });

    });
  });

  