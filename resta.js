
var manzanas;
var valor;
var manzanasRestantes;
var errorSolucion;
var errorManzanas;

/** Info del boton seleccionado **/
var seleccionado;
var idseleccionado;


//Random
function randInt(max,  min){
    var random = Math.floor(Math.random() * (+max - +min)) + +min; 
    return random;
}


//Insertando manzanas
function insertar(id, num){
	for(let i=1;i<=num;i++){
		if(id == "#manzanasUp"){
			$(id).append("<img src='./Imagenes/manzana.png' id='mu"+ i +"' width='100em' />");
			$("#mu"+i).draggable({
				revert: "invalid",
				containment: "document",
				cursor: "move"
			});
		}
		else{
			$(id).append("<img src='./Imagenes/manzana.png' id='md"+ i +"' width='100em' />");
			$("#md"+i).draggable({
				revert: "invalid",
				containment: "document",
				cursor: "move"
			});
		}
	}
	return false;
}


//Random pero con limitacion
function randInt2(num){
    var random = 0;
    while(random == 0){
    	random = randInt(manzanas + 3, 1);
    	if(random == num || random > 9){
    		random = 0;
    	}
    }
    return random;
}


// Genera numeros random de soluciones
function resultados(num){
	var num2 = 0, num3 = 0, num4 = 0;
	num2 = randInt2(num);
	while(num3 == 0 || num3 == num2){
		num3 = randInt2(num);
	}
	while(num4 == 0 || num4 == num2 || num4 == num3){
		num4 = randInt2(num);
	}

	var lista = [num, num2, num3, num4];

	return lista;
};


//Se encarga del evento de cuando haces click en un boton
function evento(){
	$("button").click(function(){
		seleccionado = this.value;
		idseleccionado = this.id;
		$("button").removeClass("seleccionado");
		$("#"+idseleccionado).addClass("seleccionado");
	});

}


//Prepara el juego
function preparar(){
	valor = 0;
	errorManzanas = -1;
	errorSolucion = 0;
	seleccionado = 0;
	idseleccionado = 0;

	var up = randInt(5,1);
	var down = randInt(5,1);

	insertar("#manzanasUp",up);
	insertar("#manzanasDown", down)

	manzanas = up + down;
	manzanasRestantes = manzanas;

			console.log("Numero de manzanas: " + manzanas);

	while(valor == 0 || valor == manzanas){
		valor = randInt(manzanas, 1);
	}

			console.log("Le resto: " + valor);

	$("#operacion>label").append(manzanas + " - " + valor + " = ")

	var lista = resultados(manzanas - valor);

	lista = lista.sort(function(){
		return Math.random() - 0.5;
	});

	$("#v1").append(lista[0]);
	$("#v1").attr("value",lista[0]);
	$("#v2").append(lista[1]);
	$("#v2").attr("value",lista[1]);
	$("#v3").append(lista[2]);
	$("#v3").attr("value",lista[2]);
	$("#v4").append(lista[3]);
	$("#v4").attr("value",lista[3]);

	$("#volver").click(function(){
		window.location.href = "index.html";
	});
	
	
	$("#otravez").click(function(){
		location.reload();
	});
	
}


function jugando(){
	/*On click de los botones de solucion*/
	evento();

	/*Droppable*/
	$("#saco").droppable({
		accept: "#manzanasUp > img, #manzanasDown > img",
		over: function(event, ui){
			$("#saco>img").css("width","22.5em");
			$("#saco>img").css("margin","1.5em");
		},
		out: function(event, ui){
			$("#saco>img").css("width","20em");
			$("#saco>img").css("margin","2em");
		},
		drop: function(event, ui){
			$("#"+ui.draggable[0].id).remove();
			manzanasRestantes--;
								
			$("#saco>img").css("width","20em");
			$("#saco>img").css("margin","2em");
		}
	});

	$("#saco>img").click(function(){
		var cant1 = $("#manzanasUp").children().length;
		var cant2 = $("#manzanasDown").children().length;
		if(cant1 < 5){
			$("#manzanasUp").append("<img src='./Imagenes/manzana.png' id='mu"+ (cant1+1) +"' width='100em' />");
			$("#mu"+(cant1+1)).draggable({
				revert: "invalid",
				containment: "document",
				cursor: "move"
			});
			manzanasRestantes++;
		}
		else if(cant2 < 5){
			$("#manzanasDown").append("<img src='./Imagenes/manzana.png' id='md"+ (cant2+1) +"' width='100em' />");
			$("#md"+(cant2+1)).draggable({
				revert: "invalid",
				containment: "document",
				cursor: "move"
			});
			manzanasRestantes++;
		}
	});
}




//Cambio de CSS a los botones cuando aciertas
function acertasteBoton(){
	$("#"+idseleccionado).removeClass("seleccionado");
	$("#"+idseleccionado).addClass("acertaste");
	if("v1" != idseleccionado){
		$("#v1").prop("disabled", true);
		$("#v1").css("box-shadow","none");
	}
	if("v2" != idseleccionado){
		$("#v2").prop("disabled", true);
		$("#v2").css("box-shadow","none");
	}
	if("v3" != idseleccionado){
		$("#v3").prop("disabled", true);
		$("#v3").css("box-shadow","none");
	}
	if("v4" != idseleccionado){
		$("#v4").prop("disabled", true);
		$("#v4").css("box-shadow","none");
	}

}

function jugadoMal(){
	console.log("-----------------");
	console.log("jugadoMal");
	console.log("-----------------");
	if(seleccionado != 0 && seleccionado != (manzanas - valor)){
		$("#"+idseleccionado).prop("disabled", true);
		$("#"+idseleccionado).css("box-shadow","none");
		$("#"+idseleccionado).removeClass("seleccionado");
	}
	else if(seleccionado == (manzanas - valor)){
		acertasteBoton();
	}
	else{
		//Aqui debe mostrar una alerta de que no se ha jugado con nada
	}
	
	errorManzanas = false;
	guardar(0,0,0);
}

function correcto(){
	console.log("-----------------");
	console.log("¡¡¡CORRECTO!!!");
	console.log("-----------------");
	acertasteBoton();
	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;

	$("#otravez").removeAttr("disabled");
	guardar(1,0,0);
}

function manzanasMal(){
	console.log("-----------------");
	console.log("Manzanas mal");
	console.log("-----------------");
	
	acertasteBoton();

	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;
	
	guardar(0,1,0);
}

function operacionMal(){
	console.log("-----------------");
	console.log("operacionMal");
	console.log("-----------------");
	$("#"+idseleccionado).prop("disabled", true);
	$("#"+idseleccionado).css("box-shadow","none");
	$("#"+idseleccionado).removeClass("seleccionado");
	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;
	
	guardar(0,0,1);
}

function todoMal(){
	console.log("-----------------");
	console.log("todoMal");
	console.log("-----------------");
	$("#"+idseleccionado).prop("disabled", true);
	$("#"+idseleccionado).css("box-shadow","none");
	$("#"+idseleccionado).removeClass("seleccionado");
	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;
	guardar(0,1,1);
}



//Guardando datos en sessionStorage
function guardar(bien,malM,malS){
    if(bien != 0 || malM != 0 || malS != 0){
		if(sessionStorage.getItem("mAciertos")==null){
		sessionStorage.mAciertos = JSON.stringify(bien);
		}
		else{
			var aciertos = JSON.parse(sessionStorage.mAciertos)+bien;
			sessionStorage.mAciertos = JSON.stringify(aciertos);
		}

		if(sessionStorage.getItem("mErroresS")==null){
			sessionStorage.mErroresS = JSON.stringify(malS);
		}
		else{
			var errores = JSON.parse(sessionStorage.mErroresS)+malS;
			sessionStorage.mErroresS = JSON.stringify(errores);
		}

		if(sessionStorage.getItem("mErroresM")==null && errorManzanas){
			sessionStorage.mErroresM = JSON.stringify(malM);
		}
		else if(errorManzanas){
			var errores = JSON.parse(sessionStorage.mErroresM)+malM;
			sessionStorage.mErroresM = JSON.stringify(errores);
		}
	}
	else{
		if(sessionStorage.getItem("mJugado")==null && (seleccionado == 0 || errorManzanas == 0)){
			sessionStorage.mJugado = JSON.stringify(1);
		}
		else{
			var jugado = JSON.parse(sessionStorage.mJugado)+1;
			sessionStorage.mJugado = JSON.stringify(jugado);
		}
	}

	console.log("Aciertos: " + sessionStorage.mAciertos);
	console.log("Errores por manzanas: " + sessionStorage.mErroresM);
	console.log("Errores de operacion: " + sessionStorage.mErroresS);
	console.log("No ha jugado bien: " + sessionStorage.mJugado);

}




/*****************************************************/

/*****************************************************/


$(document).ready(function(){

	preparar();

	jugando();

	$("#corregir").click(function(){
		if(seleccionado == 0 || manzanasRestantes == manzanas){
			jugadoMal();
		}
		else if(seleccionado == (manzanas - valor) && manzanasRestantes == (manzanas - valor)){
			correcto();
		}
		else if(seleccionado == (manzanas - valor) && manzanasRestantes != (manzanas - valor)){
			manzanasMal();
		}
		else if(seleccionado != (manzanas - valor) && manzanasRestantes == (manzanas - valor)){
			operacionMal();
		}
		else{
			todoMal();
		}

	});

});




