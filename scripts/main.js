import '../styles/main.scss'
import './info'
import './stats'

function buttonClickHandler() {
  let name = this.getAttribute('data-name')
  vote_for(name, (err, clicks) => {
    if (err) {
      let message = `There is no button called "${name}"!`
      if ('error' in console) {
        console.error(message)
      } else {
        console.log('ERROR: ' + message)
      }
    } else {
      console.log(`The button called "${name}" has ${clicks} clicks already!`)
    }
  })
}

let buttons = document.querySelectorAll('button')
for (let i = 0; i < buttons.length; i++) {
  if (buttons[i].hasAttribute('data-name')) {
    buttons[i].addEventListener('click', buttonClickHandler)
  }
}

window.on_new_ranking = function(ranking) {
  console.log(ranking)
}

window.on_new_vote = function(name, votes) {
  let votesField = document.querySelector(
    `.ranking tr[data-button-name="${name}"] .votes`
  )
  votesField.innerHTML = votes
}
