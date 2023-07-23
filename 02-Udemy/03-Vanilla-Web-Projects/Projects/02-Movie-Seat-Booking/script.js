const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');

// Calling Function:
populateUI();

// Getting Ticket Price in NUM:
let price = +movieSelect.value;

// Save Selected Movie Index and Price:
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Update Total and Count:
const updateSelectedCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * price;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
};

// Get Data from Localstorage and Populate UI:
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  // const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  //
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  //
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie Select Event:
movieSelect.addEventListener('change', e => {
  e.preventDefault();

  price = +e.target.value;

  updateSelectedCountAndTotal();
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
});

// Seat Click Event:
container.addEventListener('click', e => {
  e.preventDefault();

  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCountAndTotal();
  }
});

// Initial Count and Total Set:
updateSelectedCountAndTotal();
