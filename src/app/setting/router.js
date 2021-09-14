require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/create", controller.createUser);
router.get("/fetch", controller.fetchUser);
router.delete("/delete/:id", controller.deleteUser);
router.put("/edit/:id", controller.editUser);

module.exports = router;
