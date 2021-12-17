module.exports = {
  PORT: process.env.PORT || 9000,
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 4,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'shh',
}