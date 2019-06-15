
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

//Audio
var audio;
var audioAyuda;

//subtitulos
var sub=-1;






//Random
function randInt(max,  min){
    var random = Math.floor(Math.random() * (+max - +min)) + +min; 
    return random;
}


//Insertando manzanas
function insertar(id, num){
	for(let i=1;i<=num;i++){
		if(id == "#manzanasUp"){
			$(id).append("<img  alt='Manzana' src='./Imagenes/manzana.png' id='mu"+ i +"' width='70em' />");
			$("#mu"+i).draggable({
				revert: "invalid",
				containment: "document",
				cursor: "move"
			});
		}
		else{
			$(id).append("<img  alt='Manzana'  src='./Imagenes/manzana.png' id='md"+ i +"' width='70em' />");
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
	$("#seleccion>div>div").click(function(){
		seleccionado = this.getAttribute("value");
		idseleccionado = this.id;
		$("#seleccion>div>div").removeClass("seleccionado");
		if(!$("#"+idseleccionado + ">img").hasClass("incorrecto") && !$("#"+idseleccionado + ">img").hasClass("correcto")){
			if(!seleccionCorrecta)
				$("#"+idseleccionado).addClass("seleccionado");
		}
	});
	$("#seleccion>div>div").keypress(function(){
		seleccionado = this.getAttribute("value");
		idseleccionado = this.id;
		$("#seleccion>div>div").removeClass("seleccionado");
		if(!$("#"+idseleccionado + ">img").hasClass("incorrecto") && !$("#"+idseleccionado + ">img").hasClass("correcto")){
			if(!seleccionCorrecta)
				$("#"+idseleccionado).addClass("seleccionado");
		}
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
			$("#"+ui.draggable[0].id).remove();
			manzanasRestantes--;
			$("#metidas").empty();
			$("#metidas").append("<label>" + (manzanas - manzanasRestantes) + "</label>");							
			$("#saco>img").css("width","20em");
			$("#saco>img").css("margin","2em 3em");
		}
	});

	//+++++++++++++++++ACCESIBILIDAD+++++++++++++++++++

	$("#guardar").click(function(){
		borrandoManzana();
	});
	//+++++++++++++++++ACCESIBILIDAD+++++++++++++++++++

	$("#saco").click(function(){
		$("#manzanasUp").children().remove();
		$("#manzanasDown").children().remove();
		insertar("#manzanasUp",inicialUp);
		insertar("#manzanasDown", inicialDown);
		manzanasRestantes = manzanas;
		$("#metidas").empty();
		$("#metidas").append("<label>0</label>");
	});

	$("#saco").keypress(function(){
		$("#manzanasUp").children().remove();
		$("#manzanasDown").children().remove();
		insertar("#manzanasUp",inicialUp);
		insertar("#manzanasDown", inicialDown);
		manzanasRestantes = manzanas;
		$("#metidas").empty();
		$("#metidas").append("<label>0</label>");
	});
}


//+++++++++++++++++ACCESIBILIDAD+++++++++++++++++++
function borrandoManzana(){
	manzanasArriba = $("#manzanasUp").children().length;
		manzanasAbajo = $("#manzanasDown").children().length;
		if(manzanasArriba > 0){
			$("#manzanasUp>img").last().remove();
			manzanasRestantes--;
			$("#metidas").empty();
			$("#metidas").append("<label>" + (manzanas - manzanasRestantes) + "</label>");							
			$("#saco>img").css("width","20em");
			$("#saco>img").css("margin","2em 3em");
		}
		else if(manzanasAbajo > 0){
			$("#manzanasDown>img").last().remove();
			manzanasRestantes--;
			$("#metidas").empty();
			$("#metidas").append("<label>" + (manzanas - manzanasRestantes) + "</label>");							
			$("#saco>img").css("width","20em");
			$("#saco>img").css("margin","2em 3em");
		}
}
//+++++++++++++++++ACCESIBILIDAD+++++++++++++++++++




//Cambio de CSS a los botones cuando aciertas
function acertasteBoton(){
	$("#"+idseleccionado).removeClass("seleccionado");
	$("#"+idseleccionado).addClass("acertaste");

		$("#seleccion>div>div").css("box-shadow","none");
		$("#seleccion>div>div").css("cursor","default");

}

function jugadoMal(){
	console.log("-----------------");
	console.log("jugadoMal");
	console.log("-----------------");
	if(audio !== undefined){
		audio.pause();
	}
	audio = new Audio('./Audio/antesCorrect.wav');
	audio.play();
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

	$("#ayuda").css("display","none");

	acertasteBoton();
	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;

	
	guardar(1,0,0);
	if(audio !== undefined){
		audio.pause();
	}
	var audio = new Audio('./Audio/bienHecho.wav');
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
						value:"otro",
						focus
						},
				 catch: {
					 text: "Volver a jugar",
					 value: "rejugar"
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
	$("#"+idseleccionado).removeAttr("tabindex");
	if((manzanas - valor) != manzanasRestantes)
		errorManzanas = true;
	else
		errorManzanas = false;

		if(audio !== undefined){
			audio.pause();
		}
		audio = new Audio('./Audio/manzanasMal.wav');
		audio.play();
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
	
	if(audio !== undefined){
		audio.pause();
	}
	audio = new Audio('./Audio/arrastra.wav');
	audio.play();
	swal({
		title: "¡Casi! La resta está bien, pulsa el saco y arrastra las manzanas de nuevo",
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
	$("#"+idseleccionado).removeAttr("tabindex");
	if(audio !== undefined){
		audio.pause();
	}
	audio = new Audio('./Audio/Intentalodenuevo.wav');
	audio.play();
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

	if(audio !== undefined){
		audio.pause();
	}

	if(audioAyuda !== undefined){
        audioAyuda.pause()
	}
	audioAyuda = new Audio('./Audio/manzanas.wav');
	audioAyuda.play();

	sub=0;
	$('#subtitulos').text('Aqui tienes una serie de manzanas');

	$("#mano").addClass("anim1");
	$("#mano2").addClass("anim2");
	$("#mano3").addClass("anim3");
	$("#mano4").addClass("anim41");
	$("#v2").addClass("anim42");
	$("#mano5").addClass("anim5");
	$("#mano6").addClass("anim61");
	$("#corregir").addClass("anim62");
	$("#mano7").addClass("anim7");
	$("#mano8").addClass("anim8");

	$("#subtitulos").css("padding",".25em .5em");
	$("#subtitulos").css("display","block");
}

function terminarAnimacion(){
	if(audioAyuda !== undefined){
        audioAyuda.pause()
	}
	sub=-1;
    $('#subtitulos').text('');
	$("#mano").removeClass("anim1");
	$("#mano2").removeClass("anim2");
	$("#mano3").removeClass("anim3");
	$("#mano4").removeClass("anim41");
	$("#v2").removeClass("anim42");
	$("#mano5").removeClass("anim5");
	$("#mano6").removeClass("anim61");
	$("#corregir").removeClass("anim62");
	$("#mano7").removeClass("anim7");
	$("#mano8").removeClass("anim8");

	$("#subtitulos").css("padding","0em");
}



function cambiaSubs(){

	sub++;
	console.log("He entrado y el subtitulo es: " +sub);
    switch(sub){
        case 2:  $('#subtitulos').text('Arrastra al saco la cantidad que indica la operación. Por ejemplo:');
            break;
        case 3:  $('#subtitulos').text('si la resta es 5-2, quita 3');
            break;
        case 4: $('#subtitulos').text('Pulsa el saco para que vuelvan a aparecer las manzanas que había antes');
            break;
        case 5: $('#subtitulos').text('Después, elige la opción correcta de entre las 4 posibles');
            break;
        case 6: $('#subtitulos').text('Debe ser el resultado');
            break;
        case 7: $('#subtitulos').text('Cuando lo tengas, pulsa corregir para saber si lo tienes bien');
            break;
    }

}



/*****************************************************/
/*****************************************************/

$(document).ready(function(){

	preparar();
	$("#metidas").append("<label>0</label>");

	jugando();
	if(sessionStorage.getItem("mPartidas")==null){
		sessionStorage.mPartidas = JSON.stringify(1);
	}
	else{
		var partidas = JSON.parse(sessionStorage.mPartidas)+1;
		sessionStorage.mPartidas = JSON.stringify(partidas);
	}


	$("#corregir").click(function(){

		terminarAnimacion();
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

	$("#corregir").keypress(function(){

		terminarAnimacion();
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

	$("#ayuda").keypress(function(e){
		empezarAnimacion();
	});


	var x1 = document.getElementById("mano");
	x1.addEventListener("animationstart", cambiaSubs);
	console.log(x1);
	var x2 = document.getElementById("mano2");
	x2.addEventListener("animationstart", cambiaSubs);
	var x3 = document.getElementById("mano3");
	x3.addEventListener("animationstart", cambiaSubs);
	var x4 = document.getElementById("mano4");
	x4.addEventListener("animationstart", cambiaSubs);
	var x5 = document.getElementById("mano5");
	x5.addEventListener("animationstart", cambiaSubs);
	var x6 = document.getElementById("mano6");
	x6.addEventListener("animationstart", cambiaSubs);
	var x7 = document.getElementById("mano7");
	x7.addEventListener("animationstart", cambiaSubs);
	var x8 = document.getElementById("mano8");
	x8.addEventListener("animationstart", cambiaSubs);

	var x = document.getElementById("mano6");
	x.addEventListener("animationend", terminarAnimacion);

});



