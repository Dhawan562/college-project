const express = require('express');
const {
  getUserById,
  getUserByType,
  signup,
  login,
  getAllUsers,
} = require('../controller/UserController');

const Router = express.Router();

Router.get('/all', getAllUsers);
Router.get('/:id', getUserById);
Router.get('/type/:type', getUserByType);
Router.post('/login', login);
Router.post('/signup', signup);

module.exports = Router;
