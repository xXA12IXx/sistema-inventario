
const inventario = new BusquedaProductos();

const formulario = document.getElementById("formulario");
const codigo = document.getElementById("codigo");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const existencia = document.getElementById("existencia");

const tabla = document.getElementById("tablaProductos");
const mensaje = document.getElementById("mensaje");

const btnAgregar = document.getElementById("btnAgregar");
const btnActualizar = document.getElementById("btnActualizar");
const btnCancelar = document.getElementById("btnCancelar");

let codigoEditando = null;


// CARGAR PRODUCTOS GUARDADOS
function cargarProductos() {
    const datos = JSON.parse(localStorage.getItem("productos")) || [];

    datos.forEach(p => {
        inventario.agregar(
            new Producto(p.codigo, p.nombre, p.precio, p.existencia)
        );
    });

    mostrarProductos();
}


// GUARDAR PRODUCTOS
function guardarProductos() {
    const datos = inventario.mostrarTodos().map(p => p.mostrarInformacion());

    localStorage.setItem("productos", JSON.stringify(datos));
}


// MOSTRAR MENSAJES
function mostrarMensaje(texto, color = "green") {
    mensaje.textContent = texto;
    mensaje.style.color = color;
}


// MOSTRAR PRODUCTOS EN LA TABLA
function mostrarProductos(lista = inventario.mostrarTodos()) {

    tabla.innerHTML = "";

    if (lista.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.colSpan = 5;
        celda.textContent = "No hay productos registrados.";

        fila.appendChild(celda);
        tabla.appendChild(fila);
        return;
    }

    lista.forEach(producto => {

        const fila = document.createElement("tr");

        const datos = producto.mostrarInformacion();

        const valores = [
            datos.codigo,
            datos.nombre,
            "$" + datos.precio.toFixed(2),
            datos.existencia
        ];

        valores.forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        const acciones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "editar";

        btnEditar.addEventListener("click", () => {
            seleccionarProducto(datos.codigo);
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "eliminar-fila";

        btnEliminar.addEventListener("click", () => {
            eliminarProducto(datos.codigo);
        });

        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);

        fila.appendChild(acciones);
        tabla.appendChild(fila);
    });
}


// AGREGAR PRODUCTO
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nuevoProducto = new Producto(
        codigo.value.trim(),
        nombre.value.trim(),
        Number(precio.value),
        Number(existencia.value)
    );

    if (!inventario.agregar(nuevoProducto)) {
        mostrarMensaje("Ya existe un producto con ese código.", "red");
        return;
    }

    guardarProductos();
    mostrarProductos();

    formulario.reset();

    mostrarMensaje("Producto agregado correctamente.");

});


// SELECCIONAR PRODUCTO PARA EDITAR
function seleccionarProducto(codigoProducto) {

    const producto = inventario.buscarPorCodigo(codigoProducto);

    if (!producto) {
        mostrarMensaje("Producto no encontrado.", "red");
        return;
    }

    codigo.value = producto.getCodigo();
    nombre.value = producto.getNombre();
    precio.value = producto.getPrecio();
    existencia.value = producto.getExistencia();

    codigoEditando = codigoProducto;

    codigo.disabled = true;

    btnAgregar.hidden = true;
    btnActualizar.hidden = false;
    btnCancelar.hidden = false;

    mostrarMensaje("Modificando producto: " + codigoProducto, "#d97706");

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// ACTUALIZAR PRODUCTO
btnActualizar.addEventListener("click", function() {

    if (!formulario.reportValidity()) {
        return;
    }

    const resultado = inventario.actualizar(
        codigoEditando,
        nombre.value.trim(),
        Number(precio.value),
        Number(existencia.value)
    );

    if (resultado) {

        guardarProductos();
        mostrarProductos();

        cancelarEdicion();

        mostrarMensaje("Producto actualizado correctamente.");

    } else {
        mostrarMensaje("No se pudo actualizar el producto.", "red");
    }

});


// CANCELAR EDICION
function cancelarEdicion() {

    formulario.reset();

    codigo.disabled = false;
    codigoEditando = null;

    btnAgregar.hidden = false;
    btnActualizar.hidden = true;
    btnCancelar.hidden = true;
}

btnCancelar.addEventListener("click", cancelarEdicion);


// ELIMINAR PRODUCTO
function eliminarProducto(codigoProducto) {

    const confirmar = confirm(
        "¿Estás seguro de eliminar el producto " + codigoProducto + "?"
    );

    if (!confirmar) {
        return;
    }

    if (inventario.eliminar(codigoProducto)) {

        guardarProductos();
        mostrarProductos();

        if (codigoEditando === codigoProducto) {
            cancelarEdicion();
        }

        mostrarMensaje("Producto eliminado correctamente.");

    } else {
        mostrarMensaje("No se encontró el producto.", "red");
    }
}


// BUSCAR PRODUCTOS
document.getElementById("btnBuscar").addEventListener("click", buscarProductos);

document.getElementById("buscar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarProductos();
    }
});

function buscarProductos() {

    const texto = document.getElementById("buscar").value.trim();

    if (texto === "") {
        mostrarProductos();
        mostrarMensaje("Mostrando todos los productos.");
        return;
    }

    const porCodigo = inventario.buscarPorCodigo(texto);
    const porNombre = inventario.buscarPorNombre(texto);

    const resultados = [...porNombre];

    if (porCodigo && !resultados.includes(porCodigo)) {
        resultados.unshift(porCodigo);
    }

    mostrarProductos(resultados);

    if (resultados.length === 0) {
        mostrarMensaje("No se encontraron productos.", "red");
    } else {
        mostrarMensaje("Se encontraron " + resultados.length + " producto(s).");
    }
}


// MOSTRAR TODOS LOS PRODUCTOS
document.getElementById("btnMostrar").addEventListener("click", function() {

    document.getElementById("buscar").value = "";

    mostrarProductos();

    mostrarMensaje("Mostrando todos los productos.");

});


// INICIAR SISTEMA
cargarProductos();
