let startImage = document.querySelector('.start-image')

let animatedImage = document.querySelector(".animated-image")

let cta = document.querySelector(".cta")
let ctaLabel = document.querySelector(".cta-label")

cta.addEventListener("click", toggle)

let isAnimationRunning = false

function startAnimation() {
  startImage.classList.remove("is-active")
  animatedImage.classList.add("is-active")
  ctaLabel.innerHTML = "STOP NOW"
  isAnimationRunning = true
}

function stopAnimation() {
  startImage.classList.add("is-active")
  animatedImage.classList.remove("is-active")
  ctaLabel.innerHTML = "START NOW"
  isAnimationRunning = false
}

function toggle() {
  if(isAnimationRunning) {
    stopAnimation()
  } else {
    startAnimation()
  }
}