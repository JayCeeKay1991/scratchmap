import Trip, { TripType } from "./model"
import { Request, Response } from "express";

export const getTrips = async (req: Request, res: Response) => {
  try {
    const trips:TripType[] = await Trip.find();
    if (trips) {
      res.status(200);
      res.send(trips);
    }
    else res.send('There are no trips in the database.')
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "An unexpected error occurred while fetching the trips. Please try again later." });
  }
}

export const postTrip = (req: Request, res: Response) => {
  try {
    if (req.body) {
      const newTrip = req.body.save();
      res.status(201);
      res.send(newTrip);
    }
    else res.send('No body in request.')
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "An unexpected error occurred while creating the trip. Please try again later." });
  }
}