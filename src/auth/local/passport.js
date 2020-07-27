const passport = require('passport');
const  LocalStrategy  = require('passport-local');

/*
Error Code list:
AU01 - Email mismatch
AU02 - Password mismatch
*/
function localAuthenticate(req, User, login, password, done) {
  // can login through both username and emailId
  login = login.trim();
  const email_lower = login.toLowerCase(); //eslint-disable-line
  const email_upper = login.toUpperCase(); //eslint-disable-line
  User.findOne({
    email: { $in: [email_lower, email_upper] }, //eslint-disable-line
    active: true,
  })
    .exec()
    .then(user => {
      // return done(null, user);
      if (!user) {
        return done(null, false, {
          message: 'This email/username is not registered.',
          code: 'AU01',
        });
      }

      return user.authenticate(password, (authError, authenticated) => {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, {
            message: 'This password is not correct.',
            code: 'AU02',
          });
        }
        return done(null, user);
      });
    })
    .catch(err => done(err));
}

module.exports = function setup(User /* config */) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password', // this is the virtual field on the model
        passReqToCallback: true,
      },
      (req, email, password, done) =>
        localAuthenticate(req, User, email, password, done),
    ),
  );
}

