// utils/testFixtures.js

const baseURL = process.env.CI ? 'https://httpbin.org' : 'https://automationexercise.com';

function getTestUser() {
  return {
    email: 'kaioqa@test.com',
    password: 'Password123',
    name: 'Kaio QA',
  };
}

module.exports = { baseURL, getTestUser };