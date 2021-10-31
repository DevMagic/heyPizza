require('dotenv').config();
const request = require('supertest');
const url = process.env.API_URL;

const mockUsers = require('./mocks/users');

describe(`>>> Users`, () => {

  test('expected create the user successfully', async () => {

    const newUser = mockUsers.createUserMock();
    const response = await request(url).post(`user`).send(newUser);       
    const userCreated = response.body;

    expect(response.status).toBe(200);
    expect(userCreated.name).toBe(newUser.name);
    expect(userCreated.profileImageUrl).toBe(newUser.profileImageUrl);
    expect(userCreated.externalId).toBe(newUser.externalId);
  });

  test('wait for user creation to fail', async () => {
    
    const response = await request(url).post(`user`);

    expect(response.status).toBe(400);    
  });


  test('expected to return the user by id', async () => {

    const user = await mockUsers.createUser();    
    const response = await request(url).get(`user/${user.id}`);       
    const userFound = response.body;

    expect(response.status).toBe(200);
    expect(user.name).toBe(userFound.name);
    expect(user.profileImageUrl).toBe(userFound.profileImageUrl);
    expect(user.externalId).toBe(userFound.externalId);
  });

  test('expected not to return user - invalid type id', async () => {

    const user = { id: `12331213131213` }
    const response = await request(url).get(`user/${user.id}`);

    expect(response.status).toBe(400);
  });

  test('Expected not to return user - invalid id', async () => {

    const user = { id: `b4694744-0e18-4933-a64d-1400bd461763` }
    const response = await request(url).get(`user/${user.id}`);

    expect(response.status).toBe(404);
  });


  test('Expected to update the user', async () => {

    const user = await mockUsers.createUser();    
    user.name = `${user.name}${new Date().getTime()}`;
    const response = await request(url).put(`user/${user.id}`).send(user);
    const userUpdated = response.body;
    const userFound = await mockUsers.getUserById(user.id);

    expect(response.status).toBe(200);
    expect(userUpdated.name).toBe(user.name);
    expect(userFound.name).toBe(user.name);

  });

  test('expected not to be able to update the user', async () => {

    const user = mockUsers.createUserMock();
    const userId = `b4694744-0e18-4933-a64d-1400bd461763`
    const response = await request(url).put(`user/${userId}`).send(user);
    
    expect(response.status).toBe(400);
    

  });

  test('Expected to be able to delete the user', async () => {

    const user = await mockUsers.createUser();    
    const response = await request(url).delete(`user/${user.id}`);

    expect(response.status).toBe(200);

  });

  test('Expected you can not delete the user', async () => {

    const user = await mockUsers.createUser();    
    await request(url).delete(`user/${user.id}`);
    const response = await request(url).delete(`user/${user.id}`);
    
    expect(response.status).toBe(400);

  });


})


