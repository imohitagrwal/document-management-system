const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');


const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: String,
  salt: String,
  accountId: { type: String, description: 'Account Id of the given company', required: true },
  hostname: {
    type: String,
    description: 'Registered hostname',
    lowercase: true,
    required: false,
  },
  forgotPassSecureHash: { type: String, default: '' },
  forgotPassSecureHashExp: { type: Date },
  passwordChange: { type: Boolean, default: false },
  userId: { type: String },
  username: { type: String, required: false },
  imageUrl: { type: String },
  active: { type: Boolean, default: true },
});

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(() => ({
    _id: this._id,
  }));

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(email => email.length, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('password')
  .validate(password => password.length, 'Password cannot be blank');

// Validate empty accountId
UserSchema
  .path('accountId')
  .validate(accountId => accountId.length, 'accountId cannot be blank');

// Validate empty hostname
UserSchema
  .path('hostname')
  .validate(hostname => hostname.length, 'hostname cannot be blank');


// Validate email is not taken
UserSchema
  .path('email')
  .validate(function (value) {
    return this.constructor.findOne({ email: value }).exec()
      .then((user) => {
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      })
      .catch((err) => {
        throw err;
      });
  }, 'The specified email address is already in use.');

const validatePresenceOf = function (value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(this.password)) {
      return next(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        return next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          return next(encryptErr);
        }
        this.password = hashedPassword;
        return next();
      });
    });
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }

      if (this.password === pwdGen) {
        return callback(null, true);
      }
      return callback(null, false);
    });
  },

  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(...args) {
    let byteSize;
    let callback;
    const defaultByteSize = 16;

    if (typeof args[0] === 'function') {
      callback = args[0];
      byteSize = defaultByteSize;
    } else if (typeof args[1] === 'function') {
      callback = args[1];
    } else {
      throw new Error('Missing Callback');
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        return callback(err);
      }
      return callback(null, salt.toString('base64'));
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      if (!callback) {
        return null;
      }
      return callback('Missing password or salt');
    }

    const defaultIterations = 10000;
    const defaultKeyLength = 64;
    const salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      // eslint-disable-next-line no-sync
      return crypto.pbkdf2Sync(
        password, salt, defaultIterations,
        defaultKeyLength, 'sha1',
      )
        .toString('base64');
    }

    return crypto.pbkdf2(
      password, salt, defaultIterations, defaultKeyLength,
      'sha1', (err, key) => {
        if (err) {
          return callback(err);
        }
        return callback(null, key.toString('base64'));
      },
    );
  },
};

module.exports = mongoose.model('User', UserSchema);
