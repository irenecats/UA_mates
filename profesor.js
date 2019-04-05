$(document).ready(function(){
var aciertosplaya=erroresplaya=nojuegaplaya=0;
var aciertosmanzana=errorescontar=erroresrestar=0;

/*      --Playa--       */
if(sessionStorage.getItem("pAciertos")!=null){
   aciertosplaya = JSON.parse(sessionStorage.pAciertos);
}

if(sessionStorage.getItem("pErrores")!=null){
   erroresplaya = JSON.parse(sessionStorage.pErrores);
}
 
if(sessionStorage.getItem("pVacio")!=null){
   nojuegaplaya =  JSON.parse(sessionStorage.pVacio);
}
/*      --Manzanas--        */
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

var aciertosTOT = aciertosplaya+ aciertosmanzana//+aciertos que falta;
var erroresTOT = erroresplaya+errorescontar+erroresrestar;


$("#general").append("<p>Aciertos Totales: "+aciertosTOT+"</p>");
$("#general").append("<p>Errores Totales: "+erroresTOT+"</p>");

$("#playa").append("<p>Sin responder: "+nojuegaplaya+"</p>");
$("#playa").append("<p>Errores: "+erroresplaya+"</p>");
$("#playa").append("<p>Aciertos: "+aciertosplaya+"</p>");

$("#manzanas").append("<p>Errores al contar: "+errorescontar+"</p>");
$("#manzanas").append("<p>Errores al restar: "+erroresrestar+"</p>");
$("#manzanas").append("<p>Aciertos: "+aciertosmanzana+"</p>");

$("#monedas").append("<p>Errores al comprar: "+errorescontar+"</p>");
$("#monedas").append("<p>Errores al contar: "+erroresrestar+"</p>");
$("#monedas").append("<p>Aciertos: "+aciertosmanzana+"</p>");
})