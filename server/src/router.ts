import express from 'express';

import { getTrips, postTrip } from './controller';
const router = express.Router();

router.get('/trips', getTrips);
router.post('/trips', postTrip);