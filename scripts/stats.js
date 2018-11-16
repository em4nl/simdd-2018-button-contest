import { consoleError } from './utils'

function ajax(options, callback) {
  var request = new XMLHttpRequest()
  var method = 'GET'
  var url
  if (typeof options === 'string') {
    url = options
  } else {
    method = options.method || method
    url = options.url
  }
  request.open(method, url, true)
  request.onload = function() {
    if (request.status !== 200) {
      callback(request.status)
    } else {
      callback(null, request.responseText)
    }
  }
  request.onerror = function() {
    callback(1)
  }
  request.send()
}
function responseHandler(callback) {
  return function(err, res) {
    var ranking
    if (err) {
      callback && callback(err)
    } else {
      ranking = JSON.parse(res)
      callback && callback(null, ranking)
      if (window.onNewRanking) {
        window.onNewRanking(ranking)
      }
    }
  }
}
export function getRanking(callback) {
  ajax('/stats.json', responseHandler(callback))
}
window.getRanking = getRanking
export function voteFor(name, callback) {
  ajax(
    {
      url: '/stats.php?vote=' + name,
      method: 'POST',
    },
    responseHandler(callback)
  )
}
window.voteFor = voteFor
export function consoleGetRanking() {
  getRanking(function(err, ranking) {
    if (err) {
      consoleError(err)
    } else {
      console.log(ranking)
    }
  })
}
window.consoleGetRanking = consoleGetRanking
export function consoleVoteFor(name) {
  voteFor(name, function(err, ranking) {
    if (err) {
      consoleError(err)
    } else {
      console.log(ranking[name].votes)
    }
  })
}
window.consoleVoteFor = consoleVoteFor
