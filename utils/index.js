// utils/index.js

const { LoginHelper } = require('./loginhelper');
const { baseURL, getTestUser } = require('./testFixtures');
const { addProductToCart, removeProductFromCart } = require('./pageActions');

module.exports = {
  LoginHelper,
  baseURL,
  getTestUser,
  addProductToCart,
  removeProductFromCart,
};
