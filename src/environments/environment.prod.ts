export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allPeople: '/people',
      randomPeople: '/people/random'
    }
  }
};
