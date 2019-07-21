'use strict';

(function () {
  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    return xhr;
  };

  var load = function (onLoad, onError) {
    var loadAddress = 'https://js.dump.academy/code-and-magick/data';
    var request = createRequest(onLoad, onError);
    request.open('GET', loadAddress);
    request.send();
  };

  var save = function (data, onLoad, onError) {
    var saveAddress = 'https://js.dump.academy/code-and-magick';
    var request = createRequest(onLoad, onError);
    request.open('POST', saveAddress);
    request.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
