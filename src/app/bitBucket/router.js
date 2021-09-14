require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/fetch", controller.fetchData);
router.post("/load", controller.loadData);

module.exports = router;
