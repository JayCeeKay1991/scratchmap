import express from "express";
import { getTrips, postTrip, deleteTrip, login, signup } from "./controller";

const router = express.Router();

router.get("/trips", getTrips);
router.post("/trips", postTrip);
router.delete("/trips/:tripId", deleteTrip);
router.post("/login", login);
router.post("/signup", signup);

export default router;
