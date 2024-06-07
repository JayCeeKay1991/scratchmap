import express from "express";
import {
  getTrips,
  postTrip,
  deleteTrip,
  login,
  signup,
  editTrip,
} from "./controller";

const router = express.Router();

router.get("/trips", getTrips);
router.post("/trips", postTrip);
router.put("/trips/:tripId", editTrip);
router.delete("/trips/:tripId", deleteTrip);
router.post("/login", login);
router.post("/signup", signup);

export default router;
