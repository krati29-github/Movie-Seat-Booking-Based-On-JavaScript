const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const ticketPrice = +movieSelect.value;

populateUI();
// save seleced movie index anf price
function setsMovieData(movieId, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelecetedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    console.log(selectedSeats);

    // copy selected seats
    const seatIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatCounts = selectedSeats.length;
    console.log(selectedSeatCounts);

    count.innerText = selectedSeatCounts;
    total.innerText = selectedSeatCounts * ticketPrice;
}

// get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    } else {

    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;

    setsMovieData();
    updateSelecetedCount();
})
container.addEventListener('onClick', function (e) {
    if (e.target.classList.contains('seat')
        &&
        !e.target.classList.contains('occupied')) {
        // console.log(e.target)
    } else {
        e.target.classList.toggle('selected');

        updateSelecetedCount();
    }
});

// initial count and total
updateSelecetedCount();