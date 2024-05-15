export type LocationObj = {
  lat: number;
  lng: number;
};

export type LocationTuple = [lat: number, lng: number];

type Location = {
  type: string;
  coordinates: LocationTuple;
};

export type Trip = {
  _id: string;
  startDate: Date;
  duration: number;
  location: Location;
  rating: number;
  image: string;
  travellers: string[];
};
