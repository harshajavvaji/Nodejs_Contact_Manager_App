const express = require("express");

const router = express.Router();

const {getContact,CreateContact,getContacts,updateContact,deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");

// router.get(getContacts);

router.use(validateToken)

router.route("/").get(getContacts).post(CreateContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router
