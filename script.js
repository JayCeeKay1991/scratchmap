'use strict';

// prettier-ignore

let map, mapEvent;

class Trip {
  // date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, start, rating, duration, persons, checkedPersons) {
    this.start = new Date(start);
    this.coords = coords; // [lat, lng]
    this.rating = rating; // in stars
    this.duration = duration; // in weeks
    this.persons = persons;
    this.checkedPersons = checkedPersons;
  }

  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} Trip in ${
      months[this.start.getMonth()]
    } ${this.start.getFullYear()} `;
  }

  click() {
    this.clicks++;
  }
}

class Solo extends Trip {
  type = 'solo';
  popupTitle = 'Solo';
  constructor(coords, start, rating, duration, persons, checkedPersons) {
    super(coords, start, rating, duration, persons, checkedPersons);
    this._setDescription();
  }
}
class Social extends Trip {
  type = 'social';
  popupTitle = 'Social';
  constructor(coords, start, rating, duration, persons, checkedPersons) {
    super(coords, start, rating, duration, persons, checkedPersons);
    this._setDescription();
  }
}


///////////////
// Architecture

const form = document.querySelector('.form');
const containerTrips = document.querySelector('.trips');
const inputType = document.querySelector('.form__input--type');
const inputRating = document.querySelector('.form__input--rating');
const inputDuration = document.querySelector('.form__input--duration');
const inputPersons = document.querySelector('.form__input--persons');
const inputStart = document.querySelector('.form__input--start');


class App {
  #map;
  #mapEvent;
  #trips = [];
  #mapZoom = 5;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newTrip.bind(this));
    containerTrips.addEventListener('click', this._moveToPopup.bind(this));

    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get position.');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoom);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    // Call _getLocalStorage directly after the map is set up
    this._getLocalStorage();

    // Render existing trips
    this.#trips.forEach(trip => {
      this._renderTripMarker(trip);
    });
  }


  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
  }

  _hideForm() {
    inputRating.value =
      inputDuration.value =
      inputStart.value =
      inputType.value =
        '';


    const personsCheckboxes = document.querySelectorAll('input[name="person"]');
    personsCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }


  _newTrip(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();
    // get data from form
    const start = new Date(inputStart.value);
    const type = inputType.value;
    const rating = +inputRating.value;
    const duration = +inputDuration.value;
    const persons = +inputPersons.value;
    const checkedPersons = this._getCheckedValues();
    const { lat, lng } = this.#mapEvent.latlng;
    let trip;


    // Check trip type and create respective object

    // validate data
    if (
      !validInputs(rating, duration) ||
      !allPositive(rating, duration)
    ) {
      return alert('Inputs have to be positive numbers!');
    }

    if (type === 'solo') trip = new Solo([lat, lng], start, rating, duration, persons, checkedPersons);

    if (type === 'social') trip = new Social([lat, lng], start, rating, duration, persons, checkedPersons);


    // add new object to trip array
    this.#trips.push(trip);

    // render as marker on map
    this._renderTripMarker(trip);

    // render on list
    this._renderTrip(trip);

    // hide form & clear input fields
    this._hideForm();

    // add trip to local storage
    this._setLocalStorage();
  }


  _renderTripMarker(trip) {
    L.marker(trip.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          maxHeight: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${trip.type}-popup`,
        })
      )
      .setPopupContent(
        `${trip.type === 'solo' ? '💃' : '👯'} ${trip.description}`
      )
      .openPopup();
  }

  _renderTrip(trip) {
    let html = `
    <li class="trip trip--${trip.type}" data-id=${trip.id}>
          <h2 class="trip__title">${trip.description}</h2>
          <div class="trip__details">
            <span class="trip__icon">${
              trip.type === 'solo' ? '💃' : '👯'
            }</span>
            <span class="trip__value">${'⭐️'.repeat(trip.rating)}</span>
          </div>
          <div class="trip__details">
            <span class="trip__icon">⏱</span>
            <span class="trip__value">${trip.duration}</span>
            <span class="trip__unit">${trip.duration > 1 ? 'weeks' : 'week'}</span>
          </div>
        <div class="trip__details">
            <span class="trip__icon">💚</span>
            <span class="trip__value">${trip.checkedPersons.join(', ')}</span>
            <span class="trip__unit"></span>
        </div>
        </li>
        `;

    form.insertAdjacentHTML('afterend', html);
  }

  _getCheckedValues() {
    var checkedValues = [];
    var checkboxes = document.querySelectorAll('input[name="person"]:checked');

    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);
    });
    return checkedValues;
  }

  _moveToPopup(e) {
    const tripElem = e.target.closest('.trip');
    // here we need the unique id

    if (!tripElem) return;
    const trip = this.#trips.find(
      trip => trip.id === tripElem.dataset.id
    );

    this.#map.setView(trip.coords, this.#mapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // using the public interface
    // trip.click(); (just demonstrating what local storage does to the objects)
  }

  _setLocalStorage() {
    localStorage.setItem('trips', JSON.stringify(this.#trips));
    // localStorage is a simple API, can be used as long as we don't have large amounts of data.
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('trips'));

    if (!data) return;

    this.#trips = data.map(tripData => {
      const { coords, start, rating, duration, persons, checkedPersons, type } = tripData;
      if (type === 'solo') {
        return new Solo(coords, start, rating, duration, persons, checkedPersons);
      } else if (type === 'social') {
        return new Social(coords, start, rating, duration, persons, checkedPersons);
      }
    });

    this.#trips.sort((a, b) => new Date(a.start) - new Date(b.start));

    this.#trips.forEach(trip => {
      this._renderTrip(trip);
      this._renderTripMarker(trip);
    });

  }

  reset() {
    localStorage.removeItem('trips');
    location.reload();
    // location is an API which contains many methods
  }
}

const app = new App();

function clearLocalStorage() {
  localStorage.clear();
  console.log('Local storage cleared.');
  // You might want to update your application state or UI after clearing local storage
}