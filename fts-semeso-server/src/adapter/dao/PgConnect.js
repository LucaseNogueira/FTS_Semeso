const { Pool } = require("pg");
const dotenv = require('dotenv');

dotenv.config();

class PgConnect {
    constructor() {
      this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
      });
      
      this.testConnection();
    }

    async testConnection(){
        try{
            const client = await this.pool.connect();
            console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
            client.release();
        } catch(err){
            console.error('Erro ao conectar ao banco de dados:', err.message);
        }
    }
    
    async query(sql, params) {
      const client = await this.pool.connect();
      try {
        const result = await client.query(sql, params);
        return result.rows;
      } catch (err) {
        console.error('Erro ao executar query:', err.message);
        throw err;
      } finally {
        client.release();
      }
    }
}

module.exports = {
  PgConnect
}