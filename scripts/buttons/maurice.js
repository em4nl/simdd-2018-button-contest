var button = document.querySelector('.button-wrapper--maurice button'),
  count = 0
var image = document.querySelector('.button-wrapper--maurice img')
function clickHandler() {
  count += 1
  button.innerHTML = 'Click me: ' + count

  if (count % 100 === 0) {
    image.classList.add('free-beer')
  } else {
    image.classList.remove('free-beer')
  }
}
button.addEventListener('click', clickHandler)
image.addEventListener('click', clickHandler)
