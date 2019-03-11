const db      = require('../database/db'),
      Country  = require('./country'),
      Joi     = require('joi');


module.exports = User = {


    findOne: (login, email) => {
          return new Promise((resolve, reject) => {
          let sql = 'SELECT * FROM `users` WHERE login=? OR email=?';

          db.query(sql, [login, email], (error, rows) => {
            if (error)
              reject(new Error(error));
            resolve(rows);
          });
        });
      },


    User:  function (body) {
        this.login = body.login;
        this.email = body.email;
        this.name = body.name;
        this.birthDate = body.birthDate;
    },

    save: (user) => {
      let timestamp = Math.round(new Date().getTime() / 1000.0);
      let options = [
                        user.email,
                        user.login,
                        user.name,
                        user.password,
                        user.birthDate,
                        user.countryId,
                        timestamp
                      ];

      let sql = 'INSERT INTO `users` (`email`, `login`, `name`, `password`, `birth_date`, `countryId`, `timestamp`) VALUES (?, ?, ?, ?, ?, ?, ?)';

        return new Promise((resolve, reject) => {

            db.query(sql, options, (error, result) => {
              if (error) reject(new Error(error));
              resolve(result);
            });
        });

    },

    userSchema : Joi.object().keys({
                      login: Joi.string().required().error(new Error("Enter Your Login")),
                      email: Joi.string().email().required().error(new Error("Enter Your Email")),
                      name: Joi.string().required().error(new Error("Enter Your Real Name")),
                      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required().error(new Error("Enter Valid Password")),
                      confirmationPassword: Joi.any().valid(Joi.ref('password')).required().error(new Error("Confirm Password Error")),
                      birthDate: Joi.date().required().error(new Error("Enter Your Birth Date")),
                      country: Joi.string().required().error(new Error("Enter Your County")),
                      agree: Joi.string().required().error(new Error("You must agree to the terms and conditions before registering!"))
      })








  };
