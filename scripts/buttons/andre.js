let links = document.querySelectorAll('.button-wrapper--andre-pasquier a')

function clickHandler() {
  /*global voteFor*/
  voteFor('Andre')
}

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', clickHandler)
}
