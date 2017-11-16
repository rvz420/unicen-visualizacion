$(document).ready(function () {
    var cb = new Codebird;
    cb.setConsumerKey("UMJrCxTpWL2JMFnEe2JZtwa7X", "lHz7kqxnzfGAsuDcAQDlRq8fWt3lMVethWmQh4dHmzbK29t9Xo");
    cb.setToken("159279216-fS4fVDM4aD0gmgwexvRob4uOLToOKKX5bnBrhe7m", "eELKFBegOv2MsvY4Brh8AuPWGPNyHKzI8sTztXc2mG8QB");
    //cb.setProxy("https://cb-proxy.herokuapp.com/");

    let imagenes = document.getElementById('images');
    let btnBuscar = document.getElementById('buscar');
    let inputRadio = document.getElementsByClassName('form-check-input');
    let arrImg = new Array();
    let myIndex = 0;

    document.querySelector('.searchbox [type="reset"]').addEventListener('click', function () { this.parentNode.querySelector('input').focus(); });

    btnBuscar.addEventListener('click', () => {
        $('#form-buscar').addClass('sefueabuscar');
        $('#loading').addClass('loader');
        console.log("input value", document.getElementById('label').value);
        arrImg = [];
        let busqueda = document.getElementById('label').value;
        //imagenes.innerHTML = "";

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
            json.reply.statuses.forEach((status) => {
                if (status.entities.media) {
                    arrImg.push({ imagen: status.entities.media[0].media_url, likes: status.favorite_count, animation: Math.floor(Math.random() *3) +1 });
                }
            });
            imagenes.innerHTML = "";
            layout();
        })
    })

    function layout() {
        if (inputRadio[0].checked && arrImg) {
            $.get('./js/card.mst', function (template) {
                var rendered = Mustache.render(template, { tweets: arrImg });
                $('#images').html(rendered); 
            }); 
        }
        else if (inputRadio[1].checked && arrImg) {
            $.get('./js/list.mst', function (template2) {
                var rendered = Mustache.render(template2, { tweets: arrImg });
                $('#images').html(rendered);
            });
        }
        else if (inputRadio[2].checked && arrImg) {
            $.get('./js/slide.mst', function (template3) {
                var rendered = Mustache.render(template3, { tweets: arrImg });
                $('#images').html(rendered);
                carousel();
            });
        }
        $('html,body').animate({scrollTop:$('#images').offset().top},1000);
        setTimeout(()=>{$('#form-buscar').removeClass('sefueabuscar');$('#loading').removeClass('loader');},1000);
    }

    //checkbox de menu de layouts
    $('.form-check-input').on('click', () => {
        if (inputRadio[0].checked){
            $('#ly-2').removeClass('fade-in-left');
            $('#ly-2').addClass('fade-out-up');
            $('#ly-3').removeClass('fade-in-left');
            $('#ly-3').addClass('fade-out-up');
        }
        else if (inputRadio[1].checked){
            $('#ly-1').removeClass('fade-in-left');
            $('#ly-1').addClass('fade-out-up');
            $('#ly-3').removeClass('fade-in-left');
            $('#ly-3').addClass('fade-out-up');
        }
        else if (inputRadio[1].checked){
            $('#ly-1').removeClass('fade-in-left');
            $('#ly-1').addClass('fade-out-up');
            $('#ly-2').removeClass('fade-in-left');
            $('#ly-2').addClass('fade-out-up');
        }
        setTimeout(()=>{
            layout();}
        ,2000);
        
    });

    //button to go top
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("to-top").style.display = "block";
        } else {
            document.getElementById("to-top").style.display = "none";
        }
    }
    
    // When the user clicks on the button, scroll to the top of the document
    $("#to-top").on('click',
    function topFunction() {
        $('html,body').animate({scrollTop:0},1000);
    });

    /*---------carrousel------------ */
    function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";  
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}    
        x[myIndex-1].style.display = "block";  
        setTimeout(carousel, 2000); // Change image every 2 seconds
    }
});
