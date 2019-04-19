
var manzanas;
var valor;
var manzanasRestantes;
var errorSolucion;
var errorManzanas;

// Info del boton seleccionado 
var seleccionado;
var idseleccionado;

//Cantidad de manzanas arriba y abajo al principio
var inicialUp;
var inicialDown;

//Cantidad de manzanas en cada momento
var manzanasArriba;
var manzanasAbajo;

var seleccionCorrecta;


//Random
function randInt(max,  min){
    var random = Math.floor(Math.random() * (+max - +min)) + +min; 
    return random;
}


//Insertando manzanas
function insertar(id, num){
	for(let i=1;i<=num;i++){
		if(id == "#manzanasUp"){
			$(id).append("<img src='./Imagenes/manzana.png' id='mu"+ i +"' width='70em' />");
			$("#mu"+i).draggable({
				revert: "invalid",
				containment: "document",
				cursor: "move"
			});
		}
		else{
			$(id).append("<img src='./Imagenes/manzana.png' id='md"+ i +"' width='70em' />");
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
	$("span>div").click(function(){
		//if(manzanasRestantes == (manzanas - valor)){
			seleccionado = this.getAttribute("value");
			idseleccionado = this.id;
			$("span>div").removeClass("seleccionado");
			if(!$("#"+idseleccionado + ">img").hasClass("incorrecto") && !$("#"+idseleccionado + ">img").hasClass("correcto")){
				if(!seleccionCorrecta)
					$("#"+idseleccionado).addClass("seleccionado");
			}
		/*}
		else{
			swal({
				title: "El número de manzanas que quedan no es correcto. ¡Revisalo!",
			});

			
			if((manzanas - valor) != manzanasRestantes)
				errorManzanas = true;
			else
				errorManzanas = false;

			guardar(0,1,0);
		}*/
	});

}


//Prepara el juego
function preparar(){
	valor = 0;
	errorManzanas = -1;
	errorSolucion = 0;
	seleccionado = 0;
	idseleccionado = 0;
	seleccionCorrecta = false;

	//var audio = new Audio('./Audio/correcto');
    //    audio.play();

	var up = randInt(6,1);
	var down = randInt(6,1);

	insertar("#manzanasUp",up);
	insertar("#manzanasDown", down);


	inicialUp = $("#manzanasUp").children().length;
	inicialDown = $("#manzanasDown").children().length;

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
	$("#v1").append("<img />");

	$("#v2").append(lista[1]);
	$("#v2").attr("value",lista[1]);
	$("#v2").append("<img />");

	$("#v3").append(lista[2]);
	$("#v3").attr("value",lista[2]);
	$("#v3").append("<img />");

	$("#v4").append(lista[3]);
	$("#v4").attr("value",lista[3]);
	$("#v4").append("<img />");


	$("#volver").click(function(){
		window.location.href = "index.html";
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
			$("#saco>img").css("margin","1em 2em");
		},
		out: function(event, ui){
			$("#saco>img").css("width","20em");
			$("#saco>img").css("margin","2em 3em");
		},
		drop: function(event, ui){
			manzanasArriba = $("#manzanasUp").children().length;
			manzanasAbajo = $("#manzanasDown").children().length;
			//if(manzanasRestantes != (manzanas - valor)){
				$("#"+ui.draggable[0].id).remove();
				manzanasRestantes--;
			//}
			/*else{
				swal({
					title: "El número de manzanas ya es correcto",
				});
				guardar(0,1,0);
				$("#manzanasUp").children().remove();
				$("#manzanasDown").children().remove();
				insertar("#manzanasUp",manzanasArriba);
				insertar("#manzanasDown", manzanasAbajo);
			}*/
											
			$("#saco>img").css("width","20em");
			$("#saco>img").css("margin","2em 3em");
		}
	});

	$("#saco>img").click(function(){
		$("#manzanasUp").children().remove();
		$("#manzanasDown").children().remove();
		insertar("#manzanasUp",inicialUp);
		insertar("#manzanasDown", inicialDown);
		manzanasRestantes = manzanas;
	});
}




//Cambio de CSS a los botones cuando aciertas
function acertasteBoton(){
	$("#"+idseleccionado).removeClass("seleccionado");
	$("#"+idseleccionado).addClass("acertaste");

		$("span>div").css("box-shadow","none");
		$("span>div").css("cursor","default");

}

function jugadoMal(){
	console.log("-----------------");
	console.log("jugadoMal");
	console.log("-----------------");
	
	swal({
		title: "Antes de corregir, selecciona una opción",
	  });
	
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

	
	guardar(1,0,0);

	var audio = new Audio('./Audio/correcto');
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

	swal({
		title: "¡Casi! Has quitado bien las manzanas pero, ¿has contado bien las que quedan?",
	});
	
	guardar(0,0,1);
}

function manzanasMal(){
	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;

	acertasteBoton();
	seleccionCorrecta = true;

	swal({
		title: "¡Casi! La resta está bien, reinicia las manzanas y vuelve a contar las que debes quitar",
	});

	guardar(0,1,0);

}


function todoMal(){
	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;

	$("#"+idseleccionado).prop("disabled", true);
	$("#"+idseleccionado).css("box-shadow","none");
	$("#"+idseleccionado).removeClass("seleccionado");

	swal({
		title: "¡Intentalo de nuevo!",
	});
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


function valorar(bien){
	if(bien){	
		$("#"+ idseleccionado +">img").attr("src","./Imagenes/correcto2.png");
		$("#"+ idseleccionado +">img").addClass("correcto");
	}
	else{
		$("#"+ idseleccionado +">img").attr("src","./Imagenes/incorrecto.png");
		$("#"+ idseleccionado +">img").addClass("incorrecto");
	}
}

/*****************************************************/
/*****************************************************/

function empezarAnimacion(){
	$("#mano").addClass("anim1");
	$("#mano2").addClass("anim2");
	$("#mano3").addClass("anim3");
	$("#mano4").addClass("anim41");
	$("#v2").addClass("anim42");
	$("#mano5").addClass("anim5");
	$("#mano6").addClass("anim61");
	$("#corregir").addClass("anim62");
}

function terminarAnimacion(){
	$("#mano").removeClass("anim1");
	$("#mano2").removeClass("anim2");
	$("#mano3").removeClass("anim3");
	$("#mano4").removeClass("anim41");
	$("#v2").removeClass("anim42");
	$("#mano5").removeClass("anim5");
	$("#mano6").removeClass("anim61");
	$("#corregir").removeClass("anim62");
}


/*****************************************************/
/*****************************************************/

$(document).ready(function(){

	preparar();

	jugando();

	$("#corregir").click(function(){

		//Seleccionar una opcion
		if(seleccionado == 0 && !seleccionCorrecta){
			jugadoMal();
		}
		//El boton esta mal pero las manzanas bien
		else if(seleccionado != (manzanas - valor) && manzanasRestantes == (manzanas - valor) && !seleccionCorrecta){
			console.log('operacion mal');
			operacionMal();
			valorar(false);
		}
		//El boton esta bien pero las manzanas mal
		else if(manzanasRestantes != (manzanas - valor) && seleccionado == (manzanas - valor)){
			console.log('manzanas mal');
			manzanasMal();
			valorar(true);
		}
		//Todo mal
		else if(seleccionado != (manzanas - valor) && manzanasRestantes != (manzanas - valor)){
			console.log('todo mal');
			todoMal();
			valorar(false);
		}
		//Esta bien
		else {
			correcto();
			valorar(true);
		}

		//Reinicio la variable
		if(!seleccionCorrecta){
			seleccionado = 0;
			idseleccionado = 0;
		}

	});

	
	/******************** ANIMACIONES ********************/

	$("#ayuda").click(function(e){
		empezarAnimacion();
	});

	var x = document.getElementById("mano6");
	x.addEventListener("animationend", terminarAnimacion);

});




