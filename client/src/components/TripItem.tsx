import '.TripList.css';
import React, { useEffect, useState } from 'react';
import { TripType } from '../../../server/src/model';
import './TripItem.css';

interface TripPropType {
  trip: TripType
}

const TripItem = ({trip}:TripPropType):React.JSX.Element => {

  return (
    <div id="trip-item-wrap" >
      <h3>Trip item</h3>
      <p>{trip.duration} days</p>
    </div>
  )

}

export default TripItem;