window.ajax = function ajax(options, callback) {
  var request = new XMLHttpRequest();
  var method = 'GET';
  var url;
  if (typeof options === 'string') {
    url = options;
  } else {
    method = options.method || method;
    url = options.url;
  }
  request.open(method, url, true);
  request.onload = function() {
    if (request.status !== 200) {
      callback(request.status);
    } else {
      callback(null, request.responseText);
    }
  };
  request.onerror = function() {
    callback(1);
  };
  request.send();
}
function responseHandler(callback) {
  return function(err, res) {
    var ranking;
    if (err) {
      callback(err);
    } else {
      ranking = JSON.parse(res);
      callback(null, ranking);
      if (window.onNewRanking) {
        window.onNewRanking(ranking);
      }
    }
  }
}
window.getRanking = function getRanking(callback) {
  ajax('/stats.json', responseHandler(callback));
}
window.voteFor = function voteFor(name, callback) {
  ajax({
    url: '/stats.php?vote=' + name,
    method: 'POST',
  }, responseHandler(callback));
}
window.consoleGetRanking = function consoleGetRanking() {
  get_ranking(function(err, ranking) {
    if (err) {
      if ('error' in console) {
        console.error(err);
      } else {
        console.log('ERROR', err);
      }
    } else {
      console.log(ranking);
    }
  });
}
window.consoleVoteFor = function consoleVoteFor(name) {
  vote_for(name, function(err, ranking) {
    if (err) {
      if ('error' in console) {
        console.error(err);
      } else {
        console.log('ERROR', err);
      }
    } else {
      console.log(ranking[name].votes);
    }
  });
}
