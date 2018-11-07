let info = document.querySelector('.info')
let button = document.querySelector('.info-button')
let overlay = document.querySelector('.info__overlay')

button.addEventListener('click', open)
overlay.addEventListener('click', close)

function open() {
  info.classList.add('is-displayed')
  info.offsetHeight
  info.classList.add('is-visible')
}

function close() {
  info.classList.remove('is-visible')

  window.setTimeout(()=>{
    info.classList.remove('is-displayed')
  }, 500)
}
