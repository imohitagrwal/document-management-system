const express = require('express');
const passport = require('passport');

const auth = require("../auth.service");


const router = express.Router();

/* -------------------------------API ROUTES------------------------------------*/

router.post('/', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      const error = err || info;
      if (error) {
        return res.status(401).json(error);
      }
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Something went wrong, please try again.' });
      }

      const token = await auth.signToken(
        user._id, // eslint-disable-line
        user.role,
        user.accountId,
        user.hostname,
        user.loginHash,
      );

      const returnJson = {
        token,
        firstTimePasswordChanged: user.passwordChange,
        redirectionLink: `https://${user.hostname}`,
      };

      return res.json(returnJson);
    } catch (error) {
      console.error(error);
      return res.status(500).send('internal server error.');
    }
  })(req, res, next);
});

module.exports.default = router;
