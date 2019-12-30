module.exports = {
  url: 'mongodb://localhost:27017/todo',
  development: {
    port: process.env.PORT || 3000,
    saltingRounds: 10
  },
  port: process.env.PORT || 3000,
  saltingRounds: 10
};