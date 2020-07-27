const jwt = require('jsonwebtoken');

const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const  config =  require('../config/environment');
const User = require('../api/users/users.model');

const utf8 = require('utf8');

const CryptoJS = require('crypto-js');

const validateJwt = expressJwt({
  secret: config.secrets.session,algorithms: ['RS256']
});


function verifyJWTToken(token, userId) {
  if (config.encriptedToken) {
    const bytes = CryptoJS.AES.decrypt(
      token.toString(),
      config.encriptedTokenKey,
    );
    token = bytes.toString(CryptoJS.enc.Utf8);
  }
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      config.secrets.session,
      (err, decodedToken) =>
        err || !decodedToken || userId !== decodedToken._id // eslint-disable-line
          ? reject(err)
          : resolve(decodedToken),
    );
  });
}
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * Also attach access data with req.user.authorization object
 */
function isAuthenticated() {
  return (
    compose()
      // Validate jwt
      .use((req, res, next) => {
        const { authorization } = req.headers;
        if (config.encriptedToken) {
          const bytes = CryptoJS.AES.decrypt(
            authorization.toString(),
            config.encriptedTokenKey,
          );
          req.headers.authorization = bytes.toString(CryptoJS.enc.Utf8);
        }
        req.authorization = authorization;
        req.headers.authorization = `Bearer ${req.headers.authorization}`;
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(async(req, res, next) => {// eslint-disable-line

        if (!req.user || !req.user._id) {// eslint-disable-line
          res.statusMessage = 'User Data is Null';
          return res.status(401).end();
        }

        const findUserQuery = {
          _id: req.user._id,  // eslint-disable-line
          active: true,
        };
        User.findOneAndUpdate(findUserQuery, {
          $set: { 'activityLogs.lastVisit': new Date() },
        })
          .exec()
          .then(user => {
            if (!user) {
              return res.status(401).end();
            }

            if (user.loginHash !== req.user.loginHash) {
              res.statusMessage = 'User need to Login again';
              return res.status(401).end();
            }

            const userData = JSON.parse(JSON.stringify(user));
            delete req.authorization;
              userData.token = {
                authorization,
                accesscontroltoken,
              };
              req.user = userData;
              return next();
          })
          .catch(err => next(err));
      })
  );
}

async function signAccessControlToken(id, access) {
  let token = await jwt.sign(
    {
      _id: id,
      access,
    },
    config.secrets.session,
    {
      expiresIn: 60 * 60 * 24 * 365,
    },
  );
  if (config.encriptedToken) {
    token = await CryptoJS.AES.encrypt(
      token.toString(),
      config.encriptedTokenKey,
    ).toString();
  }
  return utf8.decode(token);
}


module.exports = {
  signAccessControlToken,
  isAuthenticated,
  verifyJWTToken,
}