import './TripList.css';
import React, { useEffect, useState } from 'react';
import { TripType } from '../../../server/src/model';
import { getAllTrips } from '../services/tripService';
import TripItem from './TripItem';

const TripList = ():React.JSX.Element => {
  const [tripList, setTripList] = useState<TripType[]>([])

  useEffect(() => {
    async function fetchAndSet () {
      const updatedTrips = await getAllTrips();
      setTripList(updatedTrips);
    }
    fetchAndSet();
  })

  return (
    <div id="trip-list-wrap" >
      {
        tripList && tripList.length ? tripList.map((trip) => <TripItem trip={trip} ></TripItem>) :
        <h3>No trips yet.</h3>
      }
    </div>
  )
}

export default TripList;