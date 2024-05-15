import express from "express";
import { getTrips, postTrip, deleteTrip } from "./controller";

const router = express.Router();

router.get("/trips", getTrips);
router.post("/trips", postTrip);
router.delete("/trips/:tripId", deleteTrip);

export default router;
