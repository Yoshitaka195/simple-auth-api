export default () => ({
  main_database: {
    host: process.env.RAKBIL_TEST_DB_HOST,
    username: process.env.RAKBIL_TEST_DB_USER,
    port: process.env.RAKBIL_TEST_DB_PORT,
    password: process.env.RAKBIL_TEST_DB_PASSWORD,
    name: process.env.RAKBIL_TEST_DB,
  },
});
