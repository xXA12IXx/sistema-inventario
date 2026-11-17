class BusquedaProductos {
    constructor() {
        this.productos = [];
    }

    agregar(producto) {
        this.productos.push(producto);
    }

    buscarPorCodigo(codigo) {
        for (const p of this.productos) {
            if (p.codigo.toLowerCase() === codigo.toLowerCase()) {
                return p;
            }
        }
        return null;
    }

    buscarPorNombre(texto) {
        const resultados = [];

        for (const p of this.productos) {
            if (p.nombre.toLowerCase().includes(texto.toLowerCase())) {
                resultados.push(p);
            }
        }

        return resultados;
    }
}

// Programa principal
const inventario = new BusquedaProductos();

inventario.agregar(new Producto("P001", "Teclado", 350.0, 20));
inventario.agregar(new Producto("P002", "Mouse", 180.0, 35));

const encontrado = inventario.buscarPorCodigo("P002");

if (encontrado !== null) {
    encontrado.mostrarInformacion();
} else {
    console.log("Producto no encontrado");
}