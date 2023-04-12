const { body } = require("express-validator");


exports.eventValidator = [
  body("name")
  .notEmpty().withMessage('Event Name is required')
    .matches(/^[A-Za-z]+$/),
  body("venue")
    .notEmpty().withMessage('Event Location is required')
    .isIn(['surat', 'vadodara', 'ahmedabad'])
    .withMessage('Use a common city as the location'),
  body("startDate")
    .notEmpty().withMessage('Event Start Date is required')
    .isDate()
    .withMessage('Start date must be in YYYY-MM-DD format ')
    .custom((value, { req }) => {
      if (new Date(value) >= new Date(req.body.endDate)) {
        throw new Error('Start date must be before end date');
      }
      return true;
    }),
  body("endDate")
    .notEmpty().withMessage('Event End Date is required')
    .isDate()
    .withMessage('Start date must be YYYY-MM-DD format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
]