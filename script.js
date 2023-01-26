const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const selected = document.getElementById("movie");
const reserveButton = document.getElementById("reserve-button");
const seats = document.querySelectorAll('.seat:not(.reserved)');
let selectedSeats;
getFromLocalStorage();  
calculateTotal();

reserveButton.addEventListener("click", reserveSeats);


container.addEventListener("click", function (e) {
  if (e.target.classList.contains("seat") &&!e.target.classList.contains("reserved")) {
    e.target.classList.toggle("selected");
    calculateTotal();
   
  }
});

function calculateTotal() {
  selectedSeats = container.querySelectorAll(".seat.selected");
  const selectedSeatsArr =[];
  const seatsArr = [];
  selectedSeats.forEach(seat => selectedSeatsArr.push(seat));
  seats.forEach( seat => seatsArr.push(seat));
 let selectedSeatIndexs = selectedSeatsArr.map(seat => seatsArr.indexOf(seat));
 
  
  let selectedSeatCount = container.querySelectorAll(".seat:not(.reserved).selected").length;
  let price = selected.value;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * price;

  saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(selectedSeatIndexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatIndexs));
}

selected.addEventListener("change", e => calculateTotal());

function reserveSeats() {
   selectedSeats = container.querySelectorAll(".seat.selected");
   selectedSeats.forEach((seat) => seat.classList.add("reserved"));
   count.innerText = 0;
   amount.innerText = 0;
}
function getFromLocalStorage(){
const selectedSeats= JSON.parse(localStorage.getItem("selectedSeats"));

if(selectedSeats != null && selectedSeats.length > 0){
  seats.forEach((seat, index)=>{
if(selectedSeats.indexOf(index)> -1){
  seat.classList.add("selected");
}
  })
 
}
}
