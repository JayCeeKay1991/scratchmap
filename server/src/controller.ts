import { Trip, User } from "./model";
import { Trip as TripType } from "./types/types";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const getTrips = async (req: Request, res: Response) => {
  try {
    const trips: TripType[] = await Trip.find();
    if (trips) {
      res.status(200);
      res.send(trips);
    } else res.send("There are no trips in the database.");
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while fetching the trips. Please try again later.",
    });
  }
};

export const postTrip = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const newTrip = new Trip({
        location: {
          type: "Point",
          coordinates: [req.body.location.lat, req.body.location.lng],
        },
        ...req.body,
      });
      await newTrip.save();
      res.status(201);
      res.send(newTrip);
    } else res.send("No body in request.");
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      error: error,
      message:
        "An unexpected error occurred while creating the trip. Please try again later.",
    });
  }
};

export const editTrip = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { startDate, duration, rating, location, travellers } = req.body;
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          startDate: startDate,
          duration: duration,
          rating: rating,
          location: location,
          travellers: travellers,
        },
      },
      { new: true }
    );
    res.status(201);
    res.send(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while editing the item. Please try again later.",
    });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.tripId;

    const deletedTrip = await Trip.findOneAndDelete({
      _id: tripId,
    });

    if (!deletedTrip) {
      res.status(404);
      res.send("Trip not found");
    }
  } catch (error) {
    res.status(500);
    res.send({
      message:
        "An unexpected error occurred while deleting the trips. Please try again later.",
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const userInDb = await User.findOne({ name: name });
    if (userInDb)
      return res
        .status(409)
        .send({ error: "409", message: "User already exists" });
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(400);
    res.send({ error, message: "Could not create user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(401).send("Please provide name and password");
    }
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(400).send("No user found");
    }
    const validatedPass = await bcrypt.compare(password, user.password!);
    if (!validatedPass) throw new Error();
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(401);
    res.send({ error: "401", message: "Username or password is incorrect" });
  }
};
