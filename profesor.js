$(document).ready(function(){

   $("#profesor").focus();

var aciertosplaya=erroresplaya=nojuegaplaya=0;
var aciertosmanzana=errorescontar=erroresrestar=0;
var Mpartidas = Tpartidas = Ppartidas = 0;
var aciertosMayor=erroresMayor=errorMonedas=aciertosMonedas=muchasMonedas=0;
/*      --Playa--       */
if(sessionStorage.getItem("pAciertos")!=null){
   aciertosplaya = JSON.parse(sessionStorage.pAciertos);
}

if(sessionStorage.getItem("pErrores")!=null){
   erroresplaya = JSON.parse(sessionStorage.pErrores);
}
 
if(sessionStorage.getItem("pVacio")!=null){
   nojuegaplaya =  JSON.parse(sessionStorage.pVacio);

   if(sessionStorage.getItem("pPartidas")!=null){
      Ppartidas = JSON.parse(sessionStorage.pPartidas);
   }
}
/*      --Manzanas--        */

if(sessionStorage.getItem("mPartidas")!=null){
   Mpartidas = JSON.parse(sessionStorage.mPartidas);
}

if(sessionStorage.getItem("mAciertos")!=null){
   aciertosmanzana = JSON.parse(sessionStorage.mAciertos);
}
 
if(sessionStorage.getItem("mErroresS")!=null){
   errorescontar = JSON.parse(sessionStorage.mErroresS);
}
  
if(sessionStorage.getItem("mErroresM")!=null){
   erroresrestar =  JSON.parse(sessionStorage.mErroresM);
}
/*      --Monedas--     */

if(sessionStorage.getItem("tPartidas")!=null){
   Tpartidas = JSON.parse(sessionStorage.tPartidas);
}


if(sessionStorage.getItem("tMayorCorrecto")!=null){
   aciertosMayor = JSON.parse(sessionStorage.tMayorCorrecto);
}
 
if(sessionStorage.getItem("tMayorIncorrecto")!=null){
   erroresMayor = JSON.parse(sessionStorage.tMayorIncorrecto);
}
  
if(sessionStorage.getItem("tCorrecto")!=null){
   aciertosMonedas =  JSON.parse(sessionStorage.tCorrecto);
}

if(sessionStorage.getItem("tMonedasmal")!=null){
   errorMonedas =  JSON.parse(sessionStorage.tMonedasmal);
}

if(sessionStorage.getItem("tNominimo")!=null){
   muchasMonedas =  JSON.parse(sessionStorage.tCorrecto);
}

$("#monedas").append("<p>Partidas jugadas: "+ Tpartidas+"</p>");
$("#monedas").append("<p>Sabe cual numero es mayor: "+aciertosMayor+"</p>");
$("#monedas").append("<p>No sabe qué numero es mayor: "+erroresMayor+"</p>");
$("#monedas").append("<p>Usa el mínimo nº de monedas: "+aciertosMonedas+"</p>");
$("#monedas").append("<p>Usa monedas de más: "+muchasMonedas+"</p>");
$("#monedas").append("<p>No ha alcanzado el precio: "+errorMonedas+"</p>");




$("#playa").append("<p>Partidas jugadas: "+ Ppartidas+"</p>");
$("#playa").append("<p>Sin responder: "+nojuegaplaya+"</p>");
$("#playa").append("<p>Errores: "+erroresplaya+"</p>");
$("#playa").append("<p>Aciertos: "+aciertosplaya+"</p>");

$("#manzanas").append("<p>Partidas jugadas: "+ Mpartidas +"</p>");
$("#manzanas").append("<p>Errores al restar: "+errorescontar+"</p>");
$("#manzanas").append("<p>Errores al quitar: "+erroresrestar+"</p>");
$("#manzanas").append("<p>Aciertos: "+aciertosmanzana+"</p>");


})