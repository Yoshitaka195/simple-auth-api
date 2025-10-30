export default () => ({
  main_database: {
    host: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USER,
    port: process.env.TEST_DB_PORT,
    password: process.env.TEST_DB_PASSWORD,
    name: process.env.TEST_DB,
  },
});
