var max;
var norep=[];
var aciertos=0;
var audio;
var audioAyuda;

$(document).ready(function(){

    //preparar todo lo necesario para que funcione el juego
    preparar();

    //comprobar si los resultados introducidos son correctos
    $("#corregir").on("click", function(event){
        comprobar();
    });
    //mostrar video/animación de ayuda

    //volver



	/******************** ANIMACIONES ********************/
    $("#ayuda").click(function(e){
		empezarAnimacion();
	});

    var x = document.getElementById("mano7");
	x.addEventListener("animationend", terminarAnimacion);
    
});


function empezarAnimacion(){

    if(audioAyuda !== undefined){
        audioAyuda.pause()
    }
    audioAyuda = new Audio('./Audio/Playa.wav');
    audioAyuda.play();

    var elem = 0;
    norep.forEach(e => {
        if(e >= elem)
            elem = e;
    });

    if(elem >= 8){
        $("#mano1").addClass("anim1");
        $("#mano2").addClass("anim22");
        $("#mano3").addClass("anim32");
        $("#mano4").addClass("anim42");
        $("#mano5").addClass("anim5");
        $("#mano6").addClass("anim6");
        $("#mano7").addClass("anim72");
    }
    else if(elem>=6){
        $("#mano1").addClass("anim1");
        $("#mano2").addClass("anim2");
        $("#mano3").addClass("anim3");
        $("#mano4").addClass("anim4");
        $("#mano5").addClass("anim5");
        $("#mano6").addClass("anim6");
        $("#mano7").addClass("anim7");
    }
    else{
        $("#mano1").addClass("anim1");
        $("#mano2").addClass("anim23");
        $("#mano3").addClass("anim33");
        $("#mano4").addClass("anim43");
        $("#mano5").addClass("anim5");
        $("#mano6").addClass("anim6");
        $("#mano7").addClass("anim73");
    }
}

function terminarAnimacion(){
    if(audioAyuda !== undefined){
        audioAyuda.pause()
    }
    $("#mano1").removeClass("anim1");
    $("#mano2").removeClass("anim22");
    $("#mano3").removeClass("anim32");
    $("#mano4").removeClass("anim42");
    $("#mano1").removeClass("anim1");
    $("#mano2").removeClass("anim2");
    $("#mano3").removeClass("anim3");
    $("#mano4").removeClass("anim4");
    $("#mano1").removeClass("anim1");
    $("#mano2").removeClass("anim23");
    $("#mano3").removeClass("anim33");
    $("#mano4").removeClass("anim43");
    $("#mano5").removeClass("anim5");
    $("#mano6").removeClass("anim6");
    $("#mano7").removeClass("anim7");
    $("#mano7").removeClass("anim72");
    $("#mano7").removeClass("anim73");
}



function preparar(){
    max = randInt(5,11);
    var pelota = $("#contpelota"); 
    let i=0;
    $("h1").text("Suma hasta "+max);
    do{
       var num = randInt(1,max);
       var contr = true;
       if(norep.length!=0){

            norep.forEach(element => {
                if(num==element){
                    contr=false
                }
            });

            if(contr){
                norep.push(num);
            }
       }
       else{
            norep.push(num);
       }
    }while(norep.length<4)
    console.log(norep)

    for (i = 0; i < 4; i++) {
        pelota.prepend("<div id='grp"+i+"'>")
        for(let j=0; j< norep[i];j++){
            pelota.children().first().append("<img src='./Imagenes/pelota.png'>")
            if(j==norep[i]-1){
               pelota.children().first().prepend("<img src='./Imagenes/plus.png'>");
            }
        }
    }


    console.log("Length: "+norep.length);
    for(i=0;i<4;i++){
        console.log("i = "+i+", val="+norep[i]);
        let rand = randInt(0,4);


        if($("#contdraw").children().eq(rand).text()==""){
            console.log("   No hay nada en "+rand);
            let resto = max-norep[i];
            $("#contdraw").children().eq(rand).text(max-norep[i]).addClass("sol"+resto);
        }
        else{
            console.log("   Hay en "+rand);
            contr = false;
            if(rand==3){
                cont=0;
            }
            else{
                cont=rand+1;
            }

            do{
                if($("#contdraw").children().eq(cont).text()==""){
                    let resto = max-norep[i];
                    $("#contdraw").children().eq(cont).text(resto).addClass("sol"+resto);
                    contr=true;
                    console.log("   No hay nada en "+cont);
                }
                cont++;
                if(cont>=norep.length){
                    cont=0;
                }
            }while(!contr)
        }
    }

    $("#contdraw").children().each(function( index ) {
            $(this).draggable({
                revert: "invalid",
                cursor: "move"
             });
    });
    
    $("#contdrop").children().children().each(function( index ) {
            $(this).draggable({
                revert: "invalid",
                cursor: "move"
             });
    });

    $('#contdraw').droppable({
        drop:function(event, ui) {
            let clas=ui.draggable.attr('class').split(" ")[0].slice(-1);
            let newclas="sol"+clas;
            let add="<div class='"+newclas+"'>"+clas+"</div>";

            $(this).append(add);
            $(this).children().last().draggable({
                revert: "invalid",
                cursor: "move"
             });

             ui.draggable.remove();
        },
        accept: ".res1, .res2, .res3, .res4, .res5, .res6, .res7, .res8, .res9",
        hoverClass: "drop-hover",
        greedy: true
    });

    $("#contdrop").children().each(function( index ) {
        $(this).droppable({
            drop:function(event, ui) {
                if($(this).children().length>0){
                    let clas = $(this).children().eq(0).attr('class').split(" ")[0].slice(-1);
                    let minum = ui.draggable.attr('class').split(" ")[0].slice(-1);

                    let newclas = "sol" + clas;
                    let add = "<div class='" + newclas + "'>" + clas + "</div>";

                    if(minum != clas){
                        $("#contdraw").append(add).children().last().draggable({
                            revert: "invalid",
                            cursor: "move"
                        });
                    }
                }

                $(this).empty();

                let clas=ui.draggable.attr('class').split(" ")[0].slice(-1);
                let newclas="res"+clas;
                let add="<div class='"+newclas+"'>"+clas+"</div>";

                $(this).append(add);
                $(this).children().eq(0).draggable({
                    revert: "invalid",
                    cursor: "move"
                 });

                 ui.draggable.remove();
            },

            hoverClass: "drop-hover",
            greedy: true
          });
          
    });
}


function comprobar(){
    var bien=mal=no=0;

    $("#contdrop>div").each(function( index ) {
       if( $(this).children().length<=0){
            no++;
            console.log("sin responder")
       }
       else{
        let res = max-norep[norep.length-1-index];

           if($(this).children().eq(0).text()==res || $(this).children().eq(1).text()==res){
                console.log("correcto")

                if($(this).attr("class").split(" ").length<3){
                    bien++;
                    aciertos++;
                    console.log("   bien")
                    $(this).droppable("disable");
                    $(this).children().eq(0).css("display", "none");
                    $(this).children().eq(0).draggable("disable");
                    $(this).prepend("<img src='./Imagenes/correcto2.png'>")
                    $(this).addClass("correcto")
                    $(this).children().eq(1).css("display", "block");
                }
                else{
                    console.log("no cuento")
                }
           }
           else{
                mal++;
                console.log("mal")
                let clas = $(this).children().eq(0).attr("class").split(" ")[0].slice(-1);
                let newclas = "sol"+clas;
                let add = "<div class='"+newclas+"'>"+clas+"</div>";
                console.log("hey")
                $(contdraw).append(add).children().last().draggable({
                    revert: "invalid",
                    cursor: "move"
                });;

                $(this).children().eq(0).remove(); 
           }
           
       }
    });

   corregir(bien,mal,no);
   haTerminado();
}


function haTerminado(){
    if(aciertos==4){
        if(audio !== undefined){
            audio.pause();
        }
        if(audioAyuda !== undefined){
            audioAyuda.pause();
            terminarAnimacion();
        }
        audio = new Audio('./Audio/muyBien.wav');
        audio.play();

        $("#corregir").css("display", "none");
        $("#rejugar").css("display", "block");

        swal(
            {
               title: "¡Bien hecho!",
               icon: "success",
               buttons: {
                 cantch: {
                    text:"Otro juego",
                    value:"otro"
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

    }
}


function corregir(bien, mal, sin){

    if(sessionStorage.getItem("pAciertos")==null){
       sessionStorage.pAciertos = JSON.stringify(bien);
    }
    else{
        var aciertos = JSON.parse(sessionStorage.pAciertos)+bien;
        sessionStorage.pAciertos = JSON.stringify(aciertos);
    }

    if(sessionStorage.getItem("pErrores")==null){
        sessionStorage.pErrores = JSON.stringify(mal);
    }
    else{
        var errores = JSON.parse(sessionStorage.pErrores)+mal;
        sessionStorage.pErrores = JSON.stringify(errores);
    }
    
    if(sessionStorage.getItem("pVacio")==null){
        sessionStorage.pVacio = JSON.stringify(sin);
    }
    else{
        var noResp = JSON.parse(sessionStorage.pVacio)+sin;
        sessionStorage.pVacio = JSON.stringify(noResp);
    }
}


function randInt(max,  min){
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
    return random;
}