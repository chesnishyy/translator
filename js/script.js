
(function () {

    var card = document.createElement('div');
    card.setAttribute('class', 'card');

    var img = document.createElement('img');
    img.setAttribute('class', 'image');


    var word = document.createElement('p');
    word.setAttribute('class', 'word');

    document.body.setAttribute('id', 'body');

    body.appendChild(card);



    function getSelectionText() {
        var txt = window.getSelection().toString();
        return txt;
    }

    window.addEventListener('mouseup', function () {
        var text = getSelectionText();
        if(text) {

            card.style.left = event.clientX + 'px';
            card.style.top = event.clientY + 20 + 'px';

            card.setAttribute('class', 'show card');


            var link = 'http://dictionary.skyeng.ru/api/v2/search-word-translation?text=' + text;

            //console.log(link);

            var request = new XMLHttpRequest();
            request.open('GET', link, false);
            request.send();

            console.log(request);
            console.log(request.status);

            var jsonRequest = request.response;
            jsonRequest = JSON.parse(jsonRequest);
            if (request.status !== 200 || request.response == "[]"){
                card.setAttribute('class', 'hide');
                img.setAttribute('src', '');
            }
            else {
                var arrTranslations = jsonRequest[0].meanings;
                var imgsrc = 'http://' + jsonRequest[0].meanings[0].image_url;

                img.setAttribute('src', imgsrc);
                img.setAttribute('class', 'show image');
                card.appendChild(img);

                word.innerHTML = text;
                card.appendChild(word);

                arrTranslations.forEach(function (item, i, arrTranslations) {
                    var trans_i = document.createElement('p');
                    trans_i.setAttribute('class', 'translation');
                    trans_i.innerHTML = item.translation;
                    card.appendChild(trans_i);
                    trans_i.addEventListener('mouseover', function () {
                        trans_i.setAttribute('class', 'translation bold');
                        img.setAttribute('src', 'http://' + item.image_url);
                    });
                    trans_i.addEventListener('mouseout', function () {
                        trans_i.setAttribute('class', 'translation');

                    });

                });

            }

        }
        });

    window.addEventListener('mousedown', function () {

        card.setAttribute('class', 'hide');
        img.setAttribute('src', '');
        trans_i = card.querySelectorAll('.translation');
        trans_i.forEach(function (item, i, trans_i) {
            card.removeChild(item);
        });

    });






})();
