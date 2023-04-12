
const inviteUser = require("../controller/inviteUser/inviteUser");
const userList = require("../controller/inviteUser/inviteeList");
const eventList = require("../controller/inviteUser/eventList");
const auth = require('../middleware/auth');
const errorHandler = require("../middleware/errorHandler")
var router = require("express").Router();

router.post("/invite/:id", auth, inviteUser)
router.get("/userList", auth, userList.all)
router.get("/user/:id", auth, userList.findOne)
router.get("/eventList", auth, eventList.findAll)
router.get("/eventList/:id", auth, eventList.findById)

router.use(errorHandler)
module.exports = router