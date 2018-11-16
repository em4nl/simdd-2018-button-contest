import '../styles/main.scss'
import { consoleError } from './utils'
import './stats'

import './buttons/tobija'
import './buttons/jonas'
import './buttons/alina'
import './buttons/marvin'

/*global voteFor*/
/*global updateRanking*/
/*global getRanking*/

function buttonClickHandler() {
  let name = this.getAttribute('data-name')
  voteFor(name, (err, ranking) => {
    if (err) {
      consoleError(`"${name}" is not in stats.json!`)
    } else {
      console.log(`"${name}" has ${ranking[name]} clicks!`)
      updateRanking(ranking)
    }
  })
}

let buttons = document.querySelectorAll('button, a')
for (let i = 0; i < buttons.length; i++) {
  if (buttons[i].hasAttribute('data-name')) {
    buttons[i].addEventListener('click', buttonClickHandler)
  }
}

function updateVotesForButton(name, votes) {
  let votesField = document.querySelector(`.stats__clicks[data-name="${name}"]`)
  if (!votesField) {
    consoleError(`There is no click counter for "${name}"!`)
  } else {
    votesField.innerHTML = votes
  }
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
