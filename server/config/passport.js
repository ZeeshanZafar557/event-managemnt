const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
module.exports=function(passport){
  
    let opts = {};  
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();   
    opts.secretOrKey = 'secret';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {     
        console.log(jwt_payload);
        User.findById(jwt_payload._id, function(err, user) {
            if (err) {
                return done(err, false);
          }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}