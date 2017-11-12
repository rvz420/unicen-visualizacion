var cb = new Codebird;
cb.setConsumerKey("UMJrCxTpWL2JMFnEe2JZtwa7X", "lHz7kqxnzfGAsuDcAQDlRq8fWt3lMVethWmQh4dHmzbK29t9Xo");
cb.setToken("159279216-fS4fVDM4aD0gmgwexvRob4uOLToOKKX5bnBrhe7m", "eELKFBegOv2MsvY4Brh8AuPWGPNyHKzI8sTztXc2mG8QB");
//cb.setProxy("https://cb-proxy.herokuapp.com/");

let imagenes = document.getElementById('img-container');
let btnBuscar = document.getElementById('buscar');

document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});

btnBuscar.addEventListener('click', ()=>{
    console.log("input value",document.getElementById('label').value);
    let busqueda = document.getElementById('label').value;

    if(busqueda[0] === '#'){ //saca el caracter # si en la busqueda se ingresó
        busqueda= busqueda.substring(1,busqueda.length);
    }
    imagenes.innerHTML = "";
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
            if(status.entities.media) {
                let arrImg={imagen: status.entities.media[0].media_url, likes: status.favorite_count};

                $.get('./js/list.mst', function(template) {
                    var rendered = Mustache.render(template, {tweets:arrImg});
                    $('#img-container').append(rendered);
                    
                });
            } 
               
        })
    })
})
