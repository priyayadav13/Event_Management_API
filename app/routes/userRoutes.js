const userRegister = require("../controller/user/userRegister");
const userLogin = require("../controller/user/userLogin");
const userLogout = require("../controller/user/userLogout");
const changePassword = require("../controller/user/userChangePassword");
const updatePassword = require("../controller/user/userUpdatePassword")
const resetPassword = require("../controller/user/userResetPassword")
const { registerValidator,
  loginValidator,
  changePasswordValidator,
  updatePasswordValidator,
  requestToResetPasswordValidator,
  resetPasswordValidator } = require("../middleware/userValidation")
var router = require("express").Router();

const auth = require('../middleware/auth');

router.post("/register", registerValidator,  userRegister);
router.post("/login", loginValidator, userLogin);
router.put("/password/change", auth, changePasswordValidator, changePassword);
router.put("/password/update", auth, updatePasswordValidator, updatePassword)
router.put("/password/reset/requestToReset", resetPassword.requestToResetPassword, requestToResetPasswordValidator)
router.put("/password/reset/resetPassword", resetPassword.resetPassword, resetPasswordValidator)
router.post("/logout", auth, userLogout);

module.exports = router
