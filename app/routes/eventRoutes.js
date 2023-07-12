const eventCreate = require("../controller/event/eventCreate");
const eventUpdate = require("../controller/event/eventUpdate");
const eventDelete = require("../controller/event/eventDelete");
const { eventValidator } = require("../middleware/eventValidation.js")
const auth = require('../middleware/auth');
const errorHandler = require("../middleware/errorHandler")
var router = require("express").Router();

router.post("/create", auth, eventCreate);
router.put("/update/:id", auth, eventUpdate);
router.delete("/delete/:id", auth, eventDelete.delete);

router.use(errorHandler)
module.exports = router