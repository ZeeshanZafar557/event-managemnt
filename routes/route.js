const express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport=require('passport');
const jwt=require('jsonwebtoken');



//add account /signup start
router.post('/signup', (req, res, next) => {
  const { body } = req;
  console.log('body', body);
  const {
      first_name,
      last_name,
      phone,
      password,
      user_type
  } = body;
  let {
      email
  } = body;

  if (!first_name) {
      return res.send({
          success: false,
          message: 'Error: Missing first name'
      });
  }
  if (!last_name) {
      return res.send({
          success: false,
          message: 'Error: Missing last name'
      });
  }
  if (!email) {
      return res.send({
          success: false,
          message: 'Error: Missing email'
      });
  }
  if (!phone) {
      return res.send({
          success: false,
          message: 'Error: Missing email'
      });
  }
  if (!password) {
      return res.send({
          success: false,
          message: 'Error: password'
      });
  }
  if (!user_type) {
      return res.send({
          success: false,
          message: 'Error:mention user Type'
      });
  }
  email = email.toLowerCase();
  User.find ( {
      email: email
  }, (err, previousUser) => {
      if (err) {
          return res.send({
              success: false,
              message: 'Error : Server Error'
          });
      }
      else if (previousUser.length > 0) {
          return res.send({
              success: false,
              message: 'Error : Try Different email already register'
          });
      }
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.genereateHash(password);
      newUser.first_name = first_name;
      newUser.last_name = last_name;
      newUser.phone = phone;
      newUser.user_type = user_type;
      newUser.save((err, user) => {
          if (err) {
              return res.send({
                  success: false,
                  message: 'Error : Server Error'
              });

          }
          else {
              return res.send({
                  success: true,
                  message: ' Account Created'
              });
          }

      })
  });
});
//add account signup end

//profile
router.get('/profile', passport.authenticate('jwt', { session: false }),(req, res, next) => {
res.send('profile has succefully login');

});

//attenticate
router.post('/authenticate', (req, res, next) => {

  const { body } = req;
  const {
      password
  } = body;
  let {
      email
  } = body;
console.log(body)
  if (!email) {
      return res.send({
          success: false,
          message: 'Error: Missing email'
      });
  }
  if (!password) {
      return res.send({
          success: false,
          message: 'Error: password'
      });
  }

  email = email.toLowerCase();
  User.find({
      email: email
  }, (err, users) => {
      if (err) { // console.log(err);
          return res.send({
              success: false,
              message: 'Error : In Connection'
          });

      }
      if (users.length != 1) {
          console.log(users.length);

          return res.send({
              success: false,
              message: 'Error : Invalid Email or Password'
          });

      }
      const user = users[0];
      if (!user.validPassword(password)) {
          return res.send({
              success: false,
              message: 'Error : Invalid Email or Password'
          });

      }
      else
      {
        const token=jwt.sign(user.toJSON(),'secret',{
          expiresIn:604800,
        
         
        })
        return res.send({
          success: true,
          message: 'Message :successfull sign in',
          token:  `Bearer ${token}`,
          user:user
        });
      }
  });

});

module.exports = router;