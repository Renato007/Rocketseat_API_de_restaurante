export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db",
  },
  pool: {
    //AFIM DE GARANTIR QUE SEJA RESPEITADO AS RELAÇÕES ENTRE CHAVES ESTRANGEIRAS
    afterCreate: (connection: any, done: any) => {
      connection.run("PRAGMA foreign_keys= ON");
      done();
    },
  },
  useNullAsDefault: true,
  migrations: {
    extensions: "ts",
    directory: "./src/database/migrations",
  },
  seeds: {
    extensions: "ts",
    directory: "./src/database/seeds",
  },
};
