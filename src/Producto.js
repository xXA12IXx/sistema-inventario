
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

    getNombre() {
        return this.#nombre;
    }

    getPrecio() {
        return this.#precio;
    }

    getExistencia() {
        return this.#existencia;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    setPrecio(precio) {
        this.#precio = precio;
    }

    setExistencia(existencia) {
        this.#existencia = existencia;
    }

    mostrarInformacion() {
        return {
            codigo: this.#codigo,
            nombre: this.#nombre,
            precio: this.#precio,
            existencia: this.#existencia
        };
    }
}
