import '../styles/main.scss'
import './stats'

import './buttons/tobija.js'
import './buttons/jonas.js'
import './buttons/alina.js'
import './buttons/marvin.js'

function buttonClickHandler() {
  let name = this.getAttribute('data-name')
  voteFor(name, (err, ranking) => {
    if (err) {
      let message = `${name} is not in stats.json!`
      if ('error' in console) {
        console.error(message)
      } else {
        console.log('ERROR: ' + message)
      }
    } else {
      console.log(`${name} has ${ranking[name]} clicks!`)
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
    `.stats__clicks[data-name="${name}"]`
  )
  votesField.innerHTML = votes
}

window.updateRanking = function updateRanking(ranking) {
  let key
  for (key in ranking) {
    if (ranking.hasOwnProperty(key)) {
      updateVotesForButton(key, ranking[key])
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
