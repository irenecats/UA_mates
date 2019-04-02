var max;
var norep=[];
$(document).ready(function(){

    //preparar todo lo necesario para que funcione el juego
    preparar();
    //recargar pagina
    $("#juego").on("click", function(event){
        location.reload();
    });
    //comprobar si los resultados introducidos son correctos
    $("#corregir").on("click", function(event){
        comprobar();
    });
    //mostrar video/animación de ayuda

    //volver
    
})

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

           if($(this).children().eq(0).text()==res){
            console.log("A");
            console.log($(this).attr("class").split(" ")[2])
            console.log("correcto")

            if($(this).attr("class").split(" ").length<3){
               bien++;
            }
            else{
                console.log("no cuento")
            }
               console.log("bien")
               $(this).droppable("disable");
               $(this).addClass("correcto")
               $(this).children().eq(0).draggable("disable");
           }
           else{
                mal++;
                console.log("mal")
                let clas = $(this).children().eq(0).attr("class").split(" ")[0].slice(-1);
                let newclas = "sol"+clas;
                let add = "<div class='"+newclas+"'>"+clas+"</div>";

                $(contdraw).append(add).children().last().draggable({
                    revert: "invalid",
                    cursor: "move"
                });;

                $(this).children().eq(0).remove(); 

           }
           
       }
    });

   corregir(bien,mal,no);
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