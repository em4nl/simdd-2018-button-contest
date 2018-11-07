import '../styles/main.scss'
import './info'
import './stats'

function buttonClickHandler() {
  let name = this.getAttribute('data-name')
  voteFor(name, (err, ranking) => {
    if (err) {
      let message = `There is no button called "${name}"!`
      if ('error' in console) {
        console.error(message)
      } else {
        console.log('ERROR: ' + message)
      }
    } else {
      console.log(`The button called "${name}" has ${ranking[name].votes} clicks already!`)
      updateRanking(ranking)
    }
  })
}

let buttons = document.querySelectorAll('button')
for (let i = 0; i < buttons.length; i++) {
  if (buttons[i].hasAttribute('data-name')) {
    buttons[i].addEventListener('click', buttonClickHandler)
  }
}

function updateVotesForButton(name, votes) {
  let votesField = document.querySelector(
    `.ranking tr[data-button-name="${name}"] .votes`
  )
  votesField.innerHTML = votes
}

window.updateRanking = function updateRanking(ranking) {
  let key
  for (key in ranking) {
    if (ranking.hasOwnProperty(key)) {
      updateVotesForButton(key, ranking[key].votes)
    }
  }
}

window.onNewRanking = updateRanking

function autoUpdate() {
  getRanking(() => {
    setTimeout(autoUpdate, 2000)
  })
}
setTimeout(autoUpdate, 2000)
