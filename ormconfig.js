const path = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "entities": [
    `./${path}/infrastructure/typeorm/**/entities/*.{ts,js}`
  ],
  "migrations": [
    `./${path}/infrastructure/database/migrations/*.{ts,js}`
  ],
  "cli": {
    "migrationsDir": `./${path}/infrastructure/database/migrations`
  }
};
