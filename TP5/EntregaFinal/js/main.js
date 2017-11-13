$(document).ready(function(){
    var cb = new Codebird;
    cb.setConsumerKey("UMJrCxTpWL2JMFnEe2JZtwa7X", "lHz7kqxnzfGAsuDcAQDlRq8fWt3lMVethWmQh4dHmzbK29t9Xo");
    cb.setToken("159279216-fS4fVDM4aD0gmgwexvRob4uOLToOKKX5bnBrhe7m", "eELKFBegOv2MsvY4Brh8AuPWGPNyHKzI8sTztXc2mG8QB");
    //cb.setProxy("https://cb-proxy.herokuapp.com/");

    let imagenes = document.getElementById('img-container');
    let btnBuscar = document.getElementById('buscar');
    let inputRadio = document.getElementsByClassName('form-check-input');
    let arrImg = new Array();

    document.querySelector('.searchbox [type="reset"]').addEventListener('click', function () { this.parentNode.querySelector('input').focus(); });

    btnBuscar.addEventListener('click', () => {
        console.log("input value", document.getElementById('label').value);
        arrImg = [];

        let busqueda = document.getElementById('label').value;
        
        if (busqueda[0] === '#') { //saca el caracter # si en la busqueda se ingresó
            busqueda = busqueda.substring(1, busqueda.length);
        }
        var params = {
            q: `#${busqueda}`,
            count: 200
        };

        cb.__call(
            "search_tweets",
            params
        ).then((json) => {
            console.log(json);
            console.log(document.getElementById('label').innerHTML);
            json.reply.statuses.forEach((status) => {
                if (status.entities.media) {
                    arrImg.push({ imagen: status.entities.media[0].media_url, likes: status.favorite_count });
                }
            });
            console.log("imagenes2 ", arrImg);
            //layout();
            if (inputRadio[0].checked && arrImg) {
                console.log("grilla activa");
                console.log(arrImg);
                $.get('./js/card.mst', function (template) {
                    var rendered = Mustache.render(template, { tweets: arrImg });
                    $('#img-container').append(rendered);
    
                });
            }
            else if (inputRadio[1].checked && arrImg) {
                console.log("lista activa");
                $.get('./js/list.mst', function (template) {
                    var rendered = Mustache.render(template, { tweets: arrImg });
                    $('#img-container').append(rendered);
    
                });
            }
        })
    })

    function layout() {
        if (inputRadio[0].checked && arrImg) {
            console.log("grilla activa");
            console.log(arrImg);
            $.get('./js/card.mst', function (template) {
                var rendered = Mustache.render(template, { tweets: arrImg });
                $('#img-container').append(rendered);

            });
        }
        else if (inputRadio[1].checked && arrImg) {
            console.log("lista activa");
            $.get('./js/list.mst', function (template2) {
                var rendered = Mustache.render(template2, { tweets: arrImg });
                $('#img-container').append(rendered);

            });
            console.log("salida de la lista ",arrImg);
        }
    }

    $('.form-check-input').on('click', () => {
        console.log("input clickeado");
        imagenes.innerHTML=" ";
        layout();
    }); 
});
