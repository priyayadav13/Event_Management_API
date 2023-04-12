const { check } = require("express-validator");

exports.registerValidator = [
  check("name")
    .notEmpty().withMessage('Name is required')
    .custom((value) => {
      if (isNaN(value)) {
        return true;
      } else {
        throw new Error('invalid name')
      }
    }),
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
  check('mobile')
    .notEmpty().withMessage('Contact No. is required')
    .isLength({ min: 10, max: 12 })
    .withMessage("your password should have min and max length between 10-12"),
  check("password")
    .notEmpty().withMessage('Password is required')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 5, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character"),
  check("confirmpassword")
    .notEmpty().withMessage('Confirm Password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  check('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['MALE', 'FEMALE'])
    .withMessage('Only MALE and FEMALE accept'),
];

exports.loginValidator = [

  check('email')
    .isEmail().withMessage('Email is required')
    .normalizeEmail()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
  check("password")
    .notEmpty().withMessage('Password is required')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 5, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character"),
];

exports.changePasswordValidator = [
  check('oldpassword')
    .notEmpty().withMessage('Old Password is required'),
  check("newpassword")
    .notEmpty().withMessage('New Password is required')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 5, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your New password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your New password should have at least one special character"),
];

exports.requestToResetPasswordValidator = [
  check('email')
    .isEmail().withMessage('Email is required')
    .normalizeEmail()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
];

exports.resetPasswordValidator = [

  check("password")
    .notEmpty()
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 5, max: 15 })
    .withMessage("Your New password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("Your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Your New password should have at least one special character"),
  check("token")
    .notEmpty()
    .withMessage('Enter Token')
];

exports.updatePasswordValidator = [
  check("password")
  .notEmpty().withMessage('Password is required')
  .not()
  .isIn(['123', 'password', 'god'])
  .withMessage('Do not use a common word as the password')
  .isLength({ min: 5, max: 15 })
  .withMessage("your password should have min and max length between 8-15")
  .matches(/\d/)
  .withMessage("your password should have at least one number")
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage("your password should have at least one special character"),
]
