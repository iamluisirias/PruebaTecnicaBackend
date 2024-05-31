"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarValoresComunes = exports.valoresComunesEnArboles = exports.ArbolBinario = exports.NodoArbol = void 0;
class NodoArbol {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }
}
exports.NodoArbol = NodoArbol;
class ArbolBinario {
    constructor() {
        this.raiz = null;
    }
    insertar(valor) {
        const nuevoNodo = new NodoArbol(valor);
        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        }
        else {
            this.insertarNodo(this.raiz, nuevoNodo);
        }
    }
    insertarNodo(nodo, nuevoNodo) {
        if (nuevoNodo.valor < nodo.valor) {
            if (nodo.izquierda === null) {
                nodo.izquierda = nuevoNodo;
            }
            else {
                this.insertarNodo(nodo.izquierda, nuevoNodo);
            }
        }
        else {
            if (nodo.derecha === null) {
                nodo.derecha = nuevoNodo;
            }
            else {
                this.insertarNodo(nodo.derecha, nuevoNodo);
            }
        }
    }
    buscar(valor) {
        return this.buscarEnArbol(this.raiz, valor);
    }
    buscarEnArbol(nodo, valor) {
        if (nodo === null) {
            return false;
        }
        if (valor === nodo.valor) {
            return true;
        }
        if (valor < nodo.valor) {
            return this.buscarEnArbol(nodo.izquierda, valor);
        }
        else {
            return this.buscarEnArbol(nodo.derecha, valor);
        }
    }
    construirDesdeArray(numeros) {
        for (const num of numeros) {
            this.insertar(num);
        }
    }
    imprimirArbol() {
        this.imprimirNodo(this.raiz, 0);
    }
    imprimirNodo(nodo, nivel) {
        if (nodo === null) {
            return;
        }
        this.imprimirNodo(nodo.derecha, nivel + 1);
        console.log(' '.repeat(nivel * 4) + `${nodo.valor}`);
        this.imprimirNodo(nodo.izquierda, nivel + 1);
    }
}
exports.ArbolBinario = ArbolBinario;
function valoresComunesEnArboles(arbol1, arbol2) {
    return verificarValoresComunes(arbol1.raiz, arbol2);
}
exports.valoresComunesEnArboles = valoresComunesEnArboles;
function verificarValoresComunes(nodo, arbol) {
    if (nodo === null) {
        return false;
    }
    if (arbol.buscar(nodo.valor)) {
        return true;
    }
    return (verificarValoresComunes(nodo.izquierda, arbol) ||
        verificarValoresComunes(nodo.derecha, arbol));
}
exports.verificarValoresComunes = verificarValoresComunes;
/*
// Uso de la función:
const array1 = [3, 6, 9, 12, 15];
const array2 = [8, 9, 10];
 
const arbol1 = new ArbolBinario();
const arbol2 = new ArbolBinario();
 
arbol1.construirDesdeArray(array1);
arbol2.construirDesdeArray(array2);
 
const tieneValoresComunes = valoresComunesEnArboles(arbol1, arbol2);
console.log(`¿Los árboles tienen valores en común?: ${tieneValoresComunes}`);
*/
