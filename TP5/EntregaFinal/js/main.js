var cb = new Codebird;
cb.setConsumerKey("UMJrCxTpWL2JMFnEe2JZtwa7X", "lHz7kqxnzfGAsuDcAQDlRq8fWt3lMVethWmQh4dHmzbK29t9Xo");
cb.setToken("159279216-fS4fVDM4aD0gmgwexvRob4uOLToOKKX5bnBrhe7m", "eELKFBegOv2MsvY4Brh8AuPWGPNyHKzI8sTztXc2mG8QB");

let imagenes = document.getElementById('img-container');
let btnBuscar = document.getElementById('buscar');

document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});

btnBuscar.addEventListener('click', ()=>{
    console.log("input value",document.getElementById('label').value);
    let busqueda = document.getElementById('label').value;
    imagenes.innerHTML = "";
    var params = {
        q: `#${busqueda}`,
        count: 20
    };
    
    cb.__call(
        "search_tweets",
        params
    ).then((json) => {
        console.log(json);
        console.log(document.getElementById('label').innerHTML);
        
        json.reply.statuses.forEach((status) => {
            if(status.entities.media) {
                imagenes.innerHTML += `<div class=" col-sm-4 col-md-4" >
                                          <div class="card text-white bg-primary mb-3">
                                            <img class="card-img-top" src="${status.entities.media[0].media_url}" alt="Card image cap">
                                            <div class="card-body">
                                            <h4 class="card-title">Card title</h4>
                                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a
                                                little bit longer.</p>
                                            </div>
                                          </div>
                                        </div> `
            } 
               
        })
    })
})

