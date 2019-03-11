const express = require('express'),
      router  = express.Router(),
      User    = require('../models/user'),
      Joi     = require('joi'),
      db      = require('../database/db'),
      session = require('express-session'),
      Bcrypt  = require('bcrypt'),
      Country = require('../models/country');





const countries =  Country.allCountries();


router.get('/register', (req, res) =>{
        res.render('register', {
          title: 'Register Form',
          countries: countries
        });
      });


router.post('/register', (req, res) => {
        //Validate Form
        let result = Joi.validate(req.body, User.userSchema);

          if (result.error){
            res.render('register', {
              title: 'Register Form',
              err: result.error,
              result: req.body,
              countries: countries
            });
            return;
          }

        // Validate -> getCountryId -> getHash -> Save User
        User.findOne(req.body.login, req.body.email)
            .then(user => {

                  if (user.length && user[0].login == req.body.login) {
                    throw new Error('Login already exist');
                  }

                  if (user.length && user[0].email == req.body.email) {
                    throw new Error('Email already exist');
                  }

                  user = new User.User(req.body);

                  Country.getCountryId(req.body.country)
                         .then(id => {
                           user.countryId = id;

                           Bcrypt.hash(user.password, 10)
                                 .then(hash => {
                                   user.password = hash;
                                   // console.log(user);

                                   User.save(user);
                                 });
                         });

                 req.session.name = user.name;
                 req.session.email = user.email;

                  res.render('profile', {
                    title: 'Profile',
                    result: user,
                    isAuthenticated: true
                  });
                  return;
            })
            .catch((err) => {
                  res.render('register', {
                    title: 'Register Form',
                    err: err,
                    result: req.body,
                    countries: countries
                  });
            });



//
});



router.get('/login', (req, res) => {
  if (  req.session.name && req.session.email) {
    res.render('profile', {
                  title: 'Profile',
                  result: req.session,
                  isAuthenticated: true
              });
          return;
  }
  res.render('login', { title: 'Login Page'});
});

router.post('/login', (req, res) => {
  User.findOne(req.body.loginOrEmail, req.body.loginOrEmail)
              .then(user => {
                // console.log(user);
                if (!user.length) throw new Error('User Not Found');

                Bcrypt.compare(req.body.password, user[0].password)
                      .then((result) => {
                        if (!result)   throw new Error("Invalid Password");

                        req.session.name = user[0].name;
                        req.session.email = user[0].email;

                        res.render('profile', {
                                      title: 'Profile',
                                      result: user[0],
                                      isAuthenticated: true
                                  });
                              return;
                      })
                      .catch((err) => {
                        res.render('login', {
                          title: 'Login Form',
                          err: err,
                          result: req.body
                        });
                      });
              })
              .catch(err => {
                    res.render('login', {
                      title: 'Login Form',
                      err: err,
                      result: req.body
                    });
              });
});


router.get('/logout', (req, res) => {
  delete req.session.name;
  delete req.session.email;

  res.render('index', { title: 'Home Page'});
});






module.exports = router;
