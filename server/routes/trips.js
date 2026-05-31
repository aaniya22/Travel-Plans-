const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const auth = require("../middleware/auth");

router.post("/", auth, tripController.createTrip);
router.get("/", auth, tripController.getUserTrips);

// Must be before /:id
router.get("/shared/:token", tripController.getSharedTrip);

router.get("/:id", auth, tripController.getTrip);
router.put("/:id", auth, tripController.updateTrip);
router.delete("/:id", auth, tripController.deleteTrip);
router.post("/:id/share", auth, tripController.shareTrip);

module.exports = router;