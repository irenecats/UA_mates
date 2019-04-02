

/*
    $.each(grmanzana.children(), function(key, val){
        val.draggable({
            
        });
    });
    $().droppable({
        drop: function(event, ui){
            /*
            var $this = $(this);
                        //LE CAMBIO EL TEXTO (NO EN MI CASO) 
                        $("<li></li>").text(ui.draggable.text()).appendTo(this);
                        //BUSCO Y ELIMINO, (SI, BUSCAR EN EL DIV GRMANZANA)
                        $("#allItems").find(":contains('" + ui.draggable.text() + "')")[0].remove();*/
      /*  }
    });
}
/*
    ZONA PROFESORES
    ----------
    GENERAL
        ERRORES
        ACIERTOS
    -------
    MANZANAS
        FALLOS AL RESTAR
        FALLOS AL CONTAR 
        ACIERTOS
    --------
    MONEDAS
        FALLOS AL SABER SI LO PUEDO COMPRAR
        FALLOS AL ELEGIR MONEDAS
        ACIERTOS
    ---------
    PELOTAS
        FALLOS
        SIN CONTESTAR
        ACIERTOS
*/
/*
initDroppable($("#dropdiv"));
            function initDroppable($elements) {
                $elements.droppable({
                    //CREO QUE NO
                    activeClass: "ui-state-default",
                    //NECESARIO, POSIBLEMENTE, TENEMOS QUE DISEÑAR QUE HACER
                    hoverClass: "ui-drop-hover",
                    
                    //CREO QUE INUTIL
                    accept: ":not(.ui-sortable-helper)",
                    
                    //CREO QUE ESTO ES INNECESARIO
                    over: function (event, ui) {
                        var $this = $(this);
                    },
                    drop: function (event, ui) {
                        var $this = $(this);
                        //LE CAMBIO EL TEXTO (NO EN MI CASO) 
                        $("<li></li>").text(ui.draggable.text()).appendTo(this);
                        //BUSCO Y ELIMINO, (SI, BUSCAR EN EL DIV GRMANZANA)
                        $("#allItems").find(":contains('" + ui.draggable.text() + "')")[0].remove();
                    }
                });

*/