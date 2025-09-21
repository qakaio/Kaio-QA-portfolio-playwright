// utils/testFixtures.js

const baseURL = 'https://www.automationexercise.com';

function getTestUser() {
  return {
    email: 'kaioqa@test.com',
    password: 'Password123',
    name: 'Kaio QA',
  };
}

module.exports = { baseURL, getTestUser };