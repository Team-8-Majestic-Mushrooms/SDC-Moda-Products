module.exports = {
  HOST: "localhost",
  USER: "sdcadmin",
  PASSWORD: "123456",
  DB: "sdcdb",
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
