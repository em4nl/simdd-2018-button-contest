import { voteFor } from '../stats'

let button = document.querySelector(".jonas-button")
console.log(button)
button.addEventListener("click", () => {
  voteFor('jonas-button')
  button.classList.toggle("geklickt")
})
