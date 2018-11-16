import $ from 'jquery'

let foods = [
  'http://tobija.ch/rouven/pommes.png',
  'http://tobija.ch/rouven/hamburger.png',
  'http://tobija.ch/rouven/sushi.png',
  'http://tobija.ch/rouven/steak.png',
]
let button = document.querySelector('.button-wrapper--rouven .fudes-button')
button.addEventListener('click', () => {
  let food = foods[Math.floor(Math.random() * foods.length)]
  let img = document.createElement('img')
  img.className = 'fude'
  img.src = food
  img.style.position = 'fixed'
  img.style.left = Math.floor(Math.random() * (window.innerWidth - 200)) + 'px'
  img.style.top = Math.floor(Math.random() * (window.innerHeight - 200)) + 'px'
  document.body.appendChild(img)
})
$('.button-wrapper--rouven .reset-button').on('click', function() {
  $('body')
    .find('img.fude')
    .each(function() {
      $(this).remove()
    })
})
