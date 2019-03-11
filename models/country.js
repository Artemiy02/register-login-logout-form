const db   = require('../database/db');

module.exports = {

    allCountries: () => {
          let countries = [];
          let sql = 'SELECT * FROM `countries`';

          db.query(sql, (err, rows) => {
            if (err) throw err;

            // console.log(rows);
            rows.forEach((el) => {
              countries.push(el.country);
            });
          });
          return countries;
        },

    getCountryId: (country) => {
              return new Promise((resolve, reject) => {
                let sql = `SELECT id FROM countries WHERE country='${country}'`;

                db.query(sql, (error, rows) => {
                  if (error)
                    reject(new Error(error));
                  resolve(rows[0].id);
                });
            });
          }
};
