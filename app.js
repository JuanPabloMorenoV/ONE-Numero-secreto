//Inicializo las variables
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//La siguiente función puede asignar un texto a un elemento del archivo .HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
// .document me conecta con el archivo .HTML y innerHTML permite que yo defina la variable que hay antes del punto

//La siguiente función genera el título y las instrucciones iniciales del juego, genera el número aleatorio e inicializa los intentos
function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

condicionesIniciales();

//La siguiente función limpia la caja blanca donde el usuario digita su número
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

//La siguiente función compara el número que digita el usuario con el número secreto
function verificarIntento() {
    //Defino la variable numeroDeUsuario que representa lo que el usuario digita en el elemento que tiene id valorUsuario
    let numeroDeUsuario = parseInt(document.querySelector('#valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto){
        //Cuando el usuario adivina el número secreto se muestra el mensaje de cuántos intentos usó en el elemento p y se reinicia el juego removiendo el atributo diabled del elemento con id reiniciar
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        //El usuario no acertó y entonces se muestra un mensaje si el número es menor o mayor

        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor');
        } else{
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}



//La siguiente función devuelve un número entre 1 y 10
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado)
    console.log(listaNumerosSorteados)

    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se jugaron todos los números, reinicia la página para volver a jugar');
    } else{
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
            //Esta parte del código es recursiva pues uso la función generarNumeroSecreto dentro de ella misma
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado
        }        
    }
}

//La siguiente limpia la caja, inicializa las condiciones de título, instrucciones, número aleatorio e intentos y deshabilita el botón de nuevo juego
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}