export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allPeople: '/people',
      randomPeople: '/people/random',
      onePeople: '/people/:id',
    },
  },
};
