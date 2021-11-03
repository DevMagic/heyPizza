const request = require('supertest');
const url = process.env.API_URL;

module.exports.createUserMock = () => {
  return {
    "name":"OldWolfKing",
    "externalId":"U02KM1V5A3A",
    "profileImageUrl":"https://ca.slack-edge.com/T04L38A0J-U02KM1ZZ5A3A-a1c978b1337e-512"
  }
}

module.exports.createUser = async () => {
  const newUser = module.exports.createUserMock();
  const response = await request(url).post(`user`).send(newUser);
  return response.body;
}

module.exports.getUserById = async (userId) => {
  const response = await request(url).get(`user/${userId}`);
  return response.body;
}

