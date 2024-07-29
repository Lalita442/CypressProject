const { defineConfig } = require('cypress');
const mysql = require('mysql');

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  waitForFileChanges: true,
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: 'cypress/reports'
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      on('task', {
        queryDb: (query) => {
          return queryTestDb(query, config);
        }
      });
    },
    env: {
      db: {
        server: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'mysql'
      }
    }
  }
});

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(query, (error, results) => {
        connection.end();
        
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
}
