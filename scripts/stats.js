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
window.get_ranking = function get_ranking(callback) {
  ajax('/stats.json', function(err, res) {
      if (err) {
          callback(err);
      } else {
          callback(null, JSON.parse(res));
      }
  });
}
window.vote_for = function vote_for(name, callback) {
  ajax({
      url: '/stats.php?vote=' + name,
      method: 'POST',
  }, function(err, res) {
      if (err) {
          callback(err);
      } else {
          callback(null, parseInt(res));
      }
  });
}
window.console_get_ranking = function console_get_ranking() {
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
window.console_vote_for = function console_vote_for(name) {
  vote_for(name, function(err, clicks) {
      if (err) {
          if ('error' in console) {
              console.error(err);
          } else {
              console.log('ERROR', err);
          }
      } else {
          console.log(clicks);
      }
  });
}
