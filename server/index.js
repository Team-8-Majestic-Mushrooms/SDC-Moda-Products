const express = require('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const router = require('./routes');
const schema = require('./graphql');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);
app.use('/api/products', router);

module.exports = app;
