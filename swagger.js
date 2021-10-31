require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

const config = {
  info: {
    title: 'HeyPizza',
    description: '...',
  },
  host: `localhost:${process.env.API_PORT}`,
  schemes: ['http'],
  tag: ['User', 'Slack', 'Feedback']
};

swaggerAutogen(outputFile, endpointsFiles, config)