export type LocationObj = {
  lat: number;
  lng: number;
};

export type LocationTuple = number[];

export type Location = {
  type: string;
  coordinates: LocationTuple;
};

export type Trip = {
  _id: string;
  startDate: Date;
  duration: number;
  location: Location;
  address: string;
  rating: number;
  image: string;
  travellers: string[];
};
