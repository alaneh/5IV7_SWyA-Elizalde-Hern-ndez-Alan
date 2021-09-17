var cesar = cesar || (function() {
    var proceso = function(txt, desp, action) {
        var replace = (function() {
            //primero necesito tener la matriz del alfabeto
            //hay que recorrar que el cifrado lo hace caracter por caracter
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
                'x', 'y', 'z'
            ];
            var l = abc.length;

            //necesitamos obtener la posicion que va  a venir por parte 
            //de la llave privada

            return function(c) {
                //vamos a saber la posicion
                var i = abc.indexOf(c.toLowerCase());
                //necesitamos saber es donde estamos adentro de la matriz
                //como la vamos a recorrer y que pasa cuando llegue
                //al final?
                //alert(c);
                //alert(i);

                if (i != -1) {
                    //primero obtenemos la posicion para el desp
                    var pos = i;
                    //que voy a hacer cifrar o descifrar
                    if (action) {
                        //cifrar para adelante
                        pos += desp;
                        //como se va a mover
                        pos -= (pos >= l) ? l : 0;
                    } else {
                        //descifrar para atras
                        pos -= desp;
                        //movimiento
                        pos += (pos < 0) ? l : 0;
                    }
                    return abc[pos];

                }
                return c;
            };
        })();
        //tenemos que saber que el texto este acorde al abc
        var re = (/([a-zñ])/ig);
        //una funcion que se encargue del intercambio
        return String(txt).replace(re, function(match) {
            return replace(match);
        });

    };

    return {
        encode: function(txt, desp) {
            return proceso(txt, desp, true);
        },

        decode: function(txt, desp) {
            return proceso(txt, desp, false);
        }
    };
})();

//funcion de cifrado

function cifrar() {
    var desplazamiento = document.getElementById("desplazamiento").value;
    var numeros = (/([0-9]*)/);
    alert(numeros.test(desplazamiento));
    if (numeros.test(desplazamiento)) {
        numero = parseInt(desplazamiento) % 27;
        document.getElementById("resultado").innerHTML =
            cesar.encode(document.getElementById("cadena").value, numero);
    }

}

//funcion de descifrado

function descifrar() {
    var desplazamiento = document.getElementById("desplazamiento").value;
    var numeros = (/([0-9]*)/);
    if (numeros.test(desplazamiento)) {
        numero = parseInt(desplazamiento) % 26;
        document.getElementById("resultado").innerHTML =
            cesar.decode(document.getElementById("cadena").value, numero);
    }
}