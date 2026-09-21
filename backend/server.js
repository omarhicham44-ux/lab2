// server.js
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map(origin => origin.trim());

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));
app.use(express.json());

const openapi = YAML.load(require.resolve('./openapi.yaml'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapi, {explorer: true}));

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todolist_lab2';

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });
