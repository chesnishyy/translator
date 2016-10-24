
(function () {

    var card = document.createElement('div');
    card.classList.add('card');

    var card_tr = document.createElement('div');
    card_tr.classList.add('card_tr');

    var img = document.createElement('img');
    img.classList.add('class', 'image');


    var word = document.createElement('p');
    word.classList.add('class', 'word');

    document.body.setAttribute('id', 'body');

    body.appendChild(card);

    function getSelectionText() {
        return window.getSelection().toString();

    }

    window.addEventListener('mouseup', function () {
        var text = getSelectionText();
        if(text) {

            card.style.left = event.clientX + 'px';
            card.style.top = event.clientY + 20 + 'px';
            card.classList.add('show');

            var link = 'https://dictionary.skyeng.ru/api/v2/search-word-translation?text=' + text;

            var request = new XMLHttpRequest();
            request.open('GET', link, true);
            request.send();

            request.onreadystatechange = function () {
                if (request.readyState != 4) return;

            var jsonRequest = request.response;
            jsonRequest = JSON.parse(jsonRequest);
            if (request.status !== 200 || request.response == "[]") {
                card.classList.remove('show');
                img.setAttribute('src', '');
            }
            else {
                var arrTranslations = jsonRequest[0].meanings;
                var imgsrc = 'http://' + jsonRequest[0].meanings[0].image_url;

                img.setAttribute('src', imgsrc);
                img.classList.add('show');
                card.appendChild(img);

                word.innerHTML = text;
                card.appendChild(word);
                card.appendChild(card_tr);

                arrTranslations.forEach(function (item) {
                    var trans_i = document.createElement('p');
                    trans_i.classList.add('translation');
                    trans_i.innerHTML = item.translation;
                    card_tr.appendChild(trans_i);
                    trans_i.addEventListener('mouseover', function () {
                        trans_i.classList.add('bold');
                        img.setAttribute('src', 'http://' + item.image_url);
                    });
                    trans_i.addEventListener('mouseout', function () {
                        trans_i.classList.remove('bold');

                    });

                });

            }
        }
        }
        });

    window.addEventListener('mousedown', function () {

        card.classList.remove('show');

        img.setAttribute('src', '');
        var trans_i = card_tr.querySelectorAll('.translation');
        trans_i.forEach(function (item) {
            card_tr.removeChild(item);
        });

    });

})();
