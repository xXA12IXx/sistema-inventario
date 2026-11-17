class Producto {
    #codigo;
    #nombre;
    #precio;
    #existencia;

    constructor(codigo, nombre, precio, existencia) {
        this.#codigo = codigo;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#existencia = existencia;
    }

    getCodigo() {
        return this.#codigo;
    }
}