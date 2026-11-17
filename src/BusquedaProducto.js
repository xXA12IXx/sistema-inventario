
class BusquedaProductos {
    constructor() {
        this.productos = [];
    }

    agregar(producto) {
        if (this.buscarPorCodigo(producto.getCodigo())) {
            return false;
        }

        this.productos.push(producto);
        return true;
    }

    mostrarTodos() {
        return this.productos;
    }

    buscarPorCodigo(codigo) {
        return this.productos.find(
            p => p.getCodigo().toLowerCase() === codigo.toLowerCase()
        ) || null;
    }

    buscarPorNombre(nombre) {
        return this.productos.filter(
            p => p.getNombre().toLowerCase().includes(nombre.toLowerCase())
        );
    }

    actualizar(codigo, nombre, precio, existencia) {
        const producto = this.buscarPorCodigo(codigo);

        if (!producto) {
            return false;
        }

        producto.setNombre(nombre);
        producto.setPrecio(precio);
        producto.setExistencia(existencia);

        return true;
    }

    eliminar(codigo) {
        const indice = this.productos.findIndex(
            p => p.getCodigo().toLowerCase() === codigo.toLowerCase()
        );

        if (indice === -1) {
            return false;
        }

        this.productos.splice(indice, 1);
        return true;
    }
}
