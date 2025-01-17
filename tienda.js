 
$(document).ready(function(){
    //preparar todo lo necesario para que funcione el juego
    preparar();

    
    if(sessionStorage.getItem("tPartidas")==null){
		sessionStorage.tPartidas = JSON.stringify(1);
	}
	else{
		var partidas = JSON.parse(sessionStorage.tPartidas)+1;
		sessionStorage.tPartidas = JSON.stringify(partidas);
	}


    //comprobar si los resultados introducidos son correctos
    $("#corregir").on("click", function(event){
        comprobarP2();
    });
    //comprobar si sabe si se puede comprar o no
    $("#si").on("click", function(event){
        comprobarP1( 0 );
    });
    $("#no").on("click", function(event){
        comprobarP1( 1 );
    });

    $("#ayuda").on("click", function(event){
        ayuda = 1;

        if($("#contenido").hasClass("oculto")){
            empezarAnimacion1();
        }else{
            empezarAnimacion2();
        }
    });
   
    var x1 = document.getElementById("mano");
    x1.addEventListener("animationend", cambiaSubs);
    var x1 = document.getElementById("mano2");
    x1.addEventListener("animationend", cambiaSubs);
    var x3 = document.getElementById("mano3");
    x3.addEventListener("animationend", terminarAnimacion1);
    var x4 = document.getElementById("mano4");
    x4.addEventListener("animationend", cambiaSubs);
    //Segunda parte
    var y = document.getElementById("mano5");
    y.addEventListener("animationend", terminarAnimacion2);


    $("#monedero>div>img").keypress(function(){
        if(cont1 == 0){
            ElemMonedero($(this));
        }
    });


});
var monedero;
var numMonedas;
var dinero  = 0;
var precio  = 0;
var cont1   = 2;
var cont2   = 3;
var monedas = [];
var minmonedas = 0;
var ayuda = 0;
var audio;
var audioAyuda1;
var audioAyuda2;
var sub=-1;

function comprobarP1( boton ){
    var resta = precio - dinero;
    console.log("Resta "+resta);
    if(resta <= 0){
        if(boton == 0){
            cont1 = 0;
        }
        else{
            cont1 = 1;
        }
    }
    else{
        if(boton == 0){
            cont1 = 1;
        }
        else{
            cont1 = 0;
        }
    }
    if( ayuda == 1){
        terminarAnimacion1();
    }
    console.log("Respuesta "+cont1);
    corregirP1();
    muestraAlerta( boton );
}

function comprobarP2(){
   console.log(monedas)
   dentro = [];
   var total = 0;


        
        $("#monedero>div").children().each(function( index ) {
            var classes =$(this).attr('class').split(" ");
            //miro si están dentro
            if( classes[classes.length -1] == "added"){
                var value = classes[0].slice(-1);
                dentro.push(value);
            }
        });
        console.log(dentro);
        $("#contenido>img").each(function( index ) {
           
            var classes =$(this).attr('class').split(" ");
            //miro si están dentro
            console.log(classes);
            if( classes[classes.length -1] == "added"){
                var value = classes[0].slice(-1);
                dentro.push(value);
            }
        });

    console.log(dentro);
    for(var i = 0; i<dentro.length; i++){
        total+=parseInt(dentro[i]);
    }
    console.log(total);
    if(dentro.length == minmonedas && total >=precio ){
        console.log("Bien");
        cont2 = 0;
    }
    else if(dentro.length < minmonedas || ( dentro.length >= minmonedas && total <precio)){
        console.log("¡Casi! Intentalo de nuevo");
        cont2 = 1;
    }
    else{
        console.log("¡Casi! Intenta usar menos monedas")
        cont2 = 2;
    }
    if( ayuda == 1){
        terminarAnimacion2();
    }
    corregirP2();
    muestraAlerta(false);
}

function muestraAlerta( boton){

    if(cont1 != 2 && cont2 == 3){
        if(cont1 == 0){
            if(audio !== undefined){
                console.log(audio);
                audio.pause();
            }
            audio = new Audio('./Audio/bienHecho.wav');
            audio.play();
            swal(
                {
                   title: "¡Bien hecho!",
                   icon: "success",
                    buttons: {
                     cantch: {
                        text:"Aceptar",
                        value:"pasarJuego",
                        focus
                        }
                   }
            })
            .then((value) => {
                if(value == "pasarJuego" && boton ==0 ){
                    $("#pregunta>div:first-child").toggleClass("oculto");
                    $("#pregunta>div:last-child").toggleClass("oculto");
                    $("#corregir").toggleClass("oculto");
                    
                    $("#contenido").droppable({
                        drop:function(event, ui) {
                            ui.draggable.addClass("added");
                        },
                        //accept: ".not",
                        hoverClass: "monedero-hover",
                        greedy: true
                    });

                    $("#monedero>div").droppable({
                        drop:function(event, ui) {
                            ui.draggable.removeClass("added");
                        },
                        //accept: ".added",
                        hoverClass: "monedero-hover",
                        greedy: true
                    })
                    
                    if(ayuda == 1){
                        empezarAnimacion2();

                    }
                }
                else if(value == "pasarJuego" && boton == 1 ){
                    location.reload();
                }
                
            });
        }
        else{
            if(audio !== undefined){
                audio.pause();
            }
            audio = new Audio('./Audio/Intentalodenuevo.wav');
            audio.play();
            swal("¡Casi! Intentalo de nuevo",  {
                button: "Aceptar",
                focus
              });

              if(boton == 0){
                $("#si").addClass("incorrecto");
              }
              else{
                $("#no").addClass("incorrecto");
              }
              cont1 = 2;
        }

    }
    else if(cont1 != -1 && cont2 != -1){
        console.log("muestro mensaje");

        if(cont2==0){
            $("#corregir").toggleClass("oculto");
            $("#rejugar").toggleClass("oculto");
            $("#ayuda").toggleClass("oculto");
            if(audio !== undefined){
                audio.pause();
            }
            audio = new Audio('./Audio/muyBien.wav');
            audio.play();
            swal(
                {
                   title: "¡Muy Bien!",
                   icon: "success",
                   buttons: {
                     cantch: {
                        text:"Otro juego",
                        value:"otro",
                        focus
                        },
                     catch: {
                       text: "Volver a jugar",
                       value: "rejugar",
                     },
                   },
                 })
                 .then((value) => {
                     switch(value){
                        case "rejugar": location.reload();
                            break;
                        case "otro": location.replace("./index.html");
                            break;
                        default: 
        
                     }
                 });

                 if(ayuda == 1){
                    terminarAnimacion2();
                }
        }
        else{
            var mensaje = "";
            if(audio !== undefined){
                audio.pause();
            }
            if(cont2 == 1){
                audio = new Audio('./Audio/cuentaMonedas.wav');
                audio.play();
                mensaje = "Casi! Vuelve a contar las monedas";
            }
            else{
                audio = new Audio('./Audio/menosMonedas.wav');
                audio.play();
                mensaje = "Casi! Intenta usar menos monedas";
            }
            swal(
                {
                   title: mensaje,
                   buttons: {
                    cantch: {
                       text:"Aceptar",
                       focus
                       }
                  },
                 })
        }

    }
}

function preparar(){

    numMonedas      = randInt(2,5);
    var puedoComprar    = randInt(0,4);

    monedero = $("#monedero>div");
    console.log("Numero de monedas "+ numMonedas);
    console.log("Puedo comprar "+ puedoComprar);
    generaMonedas(numMonedas);
    generaJuguete();
    console.log("Tengo ", dinero);

    if( puedoComprar <= 0 ){
        precio = randInt( dinero+1 , 20 );
    }
    else{
        precio = randInt( 1 , dinero+1 );
        
    }

    $("#etiqueta>p").attr("title","El precio del objeto es: " + precio + " centimos");

    $("#etiqueta>p").text(precio+" cent.");
    minMonedas();

    $("#monedero>div>img").each(function( index ) {
        $(this).draggable({
            revert: "invalid",
            cursor: "move"
         });
    });

    console.log("Precio del objeto "+precio);
   
}

function minMonedas(){
    var terminado = false;
    var mejor = 5;
    var mayor = 0;
    var sum = 0;
    var aux = 1;

    monedas.sort();
    monedas.reverse();
    
    for(var i=0; i<monedas.length && !terminado;i++){
        sum = monedas[i];
        mayor = monedas[i];
        aux = 1;
        if(sum < precio){
            console.log("necesito 2 monedas");
            //Solo sumo 2 monedas
            for(var j = 1; j<monedas.length && !terminado; j++){
                if(sum+monedas[j]>=precio){
                    terminado = true;
                    aux =2;
                }
                mayor = Math.max(mayor,sum+monedas[j]);
            }

            if(!terminado && i+2<monedas.length ){
                console.log("necesito 3 monedas");
                    sum = mayor;
                    aux = 2;
                    for(var j = 2; j<monedas.length && !terminado; j++){
                        if(sum+monedas[j]>=precio){
                            terminado = true;
                            aux =3;
                        }
                        mayor = Math.max(mayor,sum+monedas[j]);
                    }

                    if(i+3<monedas.length){
                        console.log("necesito 4 monedas");
                        sum = mayor;
                        aux = 3;
                        console.log(sum);
                        console.log(monedas.length);
                        for(var j = 3; j<monedas.length && !terminado; j++){
                            if(sum+monedas[j]>=precio){
                                terminado = true;
                                aux =4;
                            }
                            mayor = Math.max(mayor,sum+monedas[j]);
                        }
                       
                    }
                    
                   
                }
        }
        else{
            terminado = true;
        }
        mejor = Math.min(mejor,aux);
    }
    console.log("min monedas"+mejor);
    minmonedas = mejor;
}

function generaJuguete(){
    var num = randInt(0,3);
    var juguete = $("#objeto");
    switch(num){
        case 0:
            juguete.prepend("<img alt='Osito de peluche de la tienda' src='./Imagenes/osito.png'>");
            break;
        case 1:
            juguete.prepend("<img alt='Patines de la tienda' src='./Imagenes/patin.png'>")
            break;
        case 2:
            juguete.prepend("<img alt='Cubo de rubik de la tienda' src='./Imagenes/rubik.png'>")
            break;
    }
}

function generaMonedas( cantidad ){
    var moneda;
    console.log(monedero);
    for(var i = 0; i<cantidad ; i++){
        moneda = randInt(0,3);
        switch(moneda){
            case 0: 
                console.log("Genero 5 cents");
                dinero+=5;
                $(monedero).append("<img tabindex="+(cantidad-1)+" alt='Moneda de 5 centimos' title='Moneda de 5 centimos' src='./Imagenes/5-centimos.png' class='moneda5 not'>");
                monedas.push(5);
                break;
            case 1:
                console.log("Genero 2 cents");
                dinero+=2;
                monedero.append("<img tabindex="+(cantidad-1)+"  alt='Moneda de 2 centimos' title='Moneda de 2 centimos' src='./Imagenes/2-cent.png' class='moneda2 not'>");
                monedas.push(2);
                break;
            case 2:
                console.log("Genero 1 cents");
                dinero+=1;
                monedero.append("<img tabindex="+(cantidad-1)+"  alt='Moneda de 1 centimo' title='Moneda de 1 centimos' src='./Imagenes/1-centimo.png' class='moneda1 not'>");
                monedas.push(1);
                break;
        }
    }
}

function corregirP1(){

    if(cont1==0){
        if(sessionStorage.getItem("tMayorCorrecto")==null){
            sessionStorage.tMayorCorrecto = JSON.stringify(1);
         }
         else{
             var aciertos = JSON.parse(sessionStorage.tMayorCorrecto)+1;
             sessionStorage.tMayorCorrecto = JSON.stringify(aciertos);
         }
    }
    else{
        if(sessionStorage.getItem("tMayorIncorrecto")==null){
            sessionStorage.tMayorIncorrecto = JSON.stringify(1);
        }
        else{
            var errores = JSON.parse(sessionStorage.tMayorIncorrecto)+1;
            sessionStorage.tMayorIncorrecto = JSON.stringify(errores);
        }
    }
}

function corregirP2(){
    if(cont2 == 0){
        if(sessionStorage.getItem("tCorrecto")==null){
            sessionStorage.tCorrecto = JSON.stringify(1);
         }
         else{
             var aciertos = JSON.parse(sessionStorage.tCorrecto)+1;
             sessionStorage.tCorrecto = JSON.stringify(aciertos);
         }
    }
    else if(cont2 == 1){
        if(sessionStorage.getItem("tMonedasmal")==null){
            sessionStorage.tMonedasmal = JSON.stringify(1);
        }
        else{
            var errores = JSON.parse(sessionStorage.tMonedasmal)+1;
            sessionStorage.tMonedasmal = JSON.stringify(errores);
        }
    }
    else{
        if(sessionStorage.getItem("tNominimo")==null){
            sessionStorage.tNominimo = JSON.stringify(1);
        }
        else{
            var errores = JSON.parse(sessionStorage.tNominimo)+1;
            sessionStorage.tNominimo = JSON.stringify(errores);
        }
    }
}

function randInt(max,  min){
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
    return random;
}
//accesibilidad
function ElemMonedero(element){
    $(element).addClass("added");

    $("#contenido").append($(element).clone()).children().last().keypress(function(){
        ElemCaja($(this));
    });
    $(element).remove(); 
}

function ElemCaja(element){
    $(element).removeClass("added");

    $("#monedero>div").append($(element).clone()).children().last().keypress(function(){
        ElemMonedero($(this));
    });
    $(element).remove(); 
}

//animacion
function empezarAnimacion1(){
    if(audioAyuda1 !== undefined){
        audioAyuda1.pause()
    }
    if(audio !== undefined){
        audio.pause()
    }
    audioAyuda1 = new Audio('./Audio/Tienda_1.wav');
    audioAyuda1.play();
    sub=0;
    $('#subtitulos').text('Aquí tienes una serie de monedas que suman una cantidad');
    $('#mano').addClass('an1');
    $('#mano2').addClass('an2');
    $('#mano3').addClass('an3');
}
function terminarAnimacion1(){
    if(audioAyuda1 !== undefined){
        audioAyuda1.pause()
    }
    sub=-1;
    $('#subtitulos').text('');
    $('#mano').removeClass('an1');
    $('#mano2').removeClass('an2');
    $('#mano3').removeClass('an3');
}

function empezarAnimacion2(){
    if(audioAyuda2 !== undefined){
        audioAyuda2.pause()
    }
    if(audio !== undefined){
        audio.pause()
    }
    sub=3;
    $('#subtitulos').text('Arrastra el mínimo de monedas necesarias para comprar el objeto');
    audioAyuda2 = new Audio('./Audio/Tienda_2.wav');
    audioAyuda2.play();
    $('#mano4').addClass('an4');
    $('#mano5').addClass('an5');
}

function terminarAnimacion2(){
    if(audioAyuda2 !== undefined){
        audioAyuda2.pause()
    }
    sub=-1;
    $('#subtitulos').text('');
    $('#mano4').removeClass('an4');
    $('#mano5').removeClass('an5');
}
//subtitulos

function cambiaSubs(){

    sub++;
    switch(sub){
        case 1:  $('#subtitulos').text('En este otro, el objeto que quieres comprar con el precio indicado en la etiqueta');
            break;
        case 2:  $('#subtitulos').text('Elige SI o NO, según si puedes comprar el objeto con las monedas que tienes');
            break;
        case 4: $('#subtitulos').text('Cuando lo tengas, pulsa corregir para saber si lo tienes bien');
            break;
    }

}