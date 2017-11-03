var cb = new Codebird;
cb.setConsumerKey("UMJrCxTpWL2JMFnEe2JZtwa7X", "lHz7kqxnzfGAsuDcAQDlRq8fWt3lMVethWmQh4dHmzbK29t9Xo");
cb.setToken("159279216-fS4fVDM4aD0gmgwexvRob4uOLToOKKX5bnBrhe7m", "eELKFBegOv2MsvY4Brh8AuPWGPNyHKzI8sTztXc2mG8QB");

let imagenes = document.getElementById('images');
let btnBuscar = document.getElementById('buscar');

btnBuscar.addEventListener('click', ()=>{
    imagenes.innerHTML = "";
    var params = {
        q: "#lanus",
        count: 200
    };
    
    cb.__call(
        "search_tweets",
        params
    ).then((json) => {
        console.log(json);
        json.reply.statuses.forEach((status) => {
            if(status.entities.media) {
                imagenes.innerHTML += `<img src="${status.entities.media[0].media_url}">`;  
            } 
               
        })
    })
})

