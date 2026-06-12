class Producto {
    #nombre
    #precio
    #categoria
    #descripcion
    constructor(nombre, precio, categoria, descripcion) {
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.descripcion = descripcion
    }
    set nombre(value) {
        this.#nombre = value
    }
    set precio(value) {
        this.#precio = value
    }
    set categoria(value) {
        this.#categoria = value
    }
    set descripcion(value) {
        this.#descripcion = value
    }
    get nombre() {
        return this.#nombre
    }
    get precio() {
        return this.#precio
    }
    get categoria() {
        return this.#categoria
    }
    get descripcion() {
        return this.#descripcion
    }
}

class Pedido {
    #nombre
    #cantidad = 0
    #precioUnitario
    #subTotal
    #total
    constructor(nombre, precioUnitario) {
        this.nombre = nombre
        this.cantidad = this.cantidad
        this.precioUnitario = precioUnitario
        this.subTotal = this.subTotal
        this.total = this.total
    }
    get nombre() {
        return this.#nombre
    }
    get cantidad() {
        return this.#cantidad
    }
    get precioUnitario() {
        return this.#precioUnitario
    }
    get subTotal() {
        return this.#subTotal
    }
    set nombre(value) {
        this.#nombre = value
    }
    set cantidad(value) {
        this.#cantidad += value
    }
    set precioUnitario(value) {
        this.#precioUnitario = value
    }
    set subTotal(value) {
        this.#subTotal = value * this.cantidad
    }
    restarCantidad() {
        this.#cantidad--
    }
    aumentarCantidad() {
        this.#cantidad++
    }


}

let pedidos = document.querySelector('#pedidos')
let productos = document.querySelector('#productos')

let producto1 = new Producto('Café Americano', 12, 'Bebida caliente', 'Cafe negro tradicional')
let producto2 = new Producto('Café Latte', 18, 'Bebida caliente', 'Cafe con leche espumada')
let producto3 = new Producto('Frappe de Chocolate', 25, 'Bebida fria', 'Bebida fría con chocolate y crema')
let producto4 = new Producto('Smoothie de Fresa', 22, 'Bebida fria', 'Batido natural de fresa')
let producto5 = new Producto('Muffin de Vainilla', 15, 'Postre', 'Pan dulce suave de vainilla')
let producto6 = new Producto('Cheesecake', 28, 'Postre', 'Pastel frio de queso')
let producto7 = new Producto('Sandwich de Pollo', 30, 'Comida', 'Sandwich con pollo y vegetales')
let producto8 = new Producto('Bagel con Queso', 20, 'Comida', 'Bagel tostado con queso crema')

let todosProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]
let todosPedidos = []
let i = 0;

const pintarProductos = () => {
    let contenedor = todosProductos.forEach(producto => {
        let html = `
                    <div class="col-md-3 mb-4">
                        <div class="card product-card h-100">
                            <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348" class="card-img-top" alt="Café Latte">
                                <div class="card-body">
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">Q${producto.precio}.00</h6>
                                    <p class="card-text">${producto.descripcion}</p>
                                    <button id="${i}" class="agregar btn btn-sm btn-success w-100">Agregar</button>
                                </div>
                        </div>
                    </div>
                `
        i++
        productos.innerHTML += html

    })
}
pintarProductos()
let ids = 0
const pintarPedidos = (nuevosPedidos) => {
    pedidos.innerHTML = ''
    nuevosPedidos.forEach(nuevoPedido => {
        let html = ` 
    <div class="pedido-item d-flex justify-content-between align-items-center">
      <div>
        <strong>${nuevoPedido.nombre}</strong><br>
        <span id="${ids}" class="cantidad">Cantidad: ${nuevoPedido.cantidad}</span> | <span class="precioUnitario">Precio unitario: Q${nuevoPedido.precioUnitario}</span>
      </div>
      <div>
        <button id="${event.target.id}" class="btn btn-sm btn-outline-secondary restar">-</button>
        <button id="${event.target.id}" class="btn btn-sm btn-outline-secondary sumar">+</button>
        <button id="${event.target.id}" class="btn btn-sm btn-outline-danger eliminar">Eliminar</button>
      </div>
    </div>
    `
        pedidos.innerHTML += html
    })
    ids++
}


productos.addEventListener('click', (event) => {
    let cantidad = document.querySelectorAll('.cantidad')
    console.log(event.target)
    if (event.target.classList.contains('agregar')) {
        let nuevoPedido = new Pedido(todosProductos[event.target.id].nombre, todosProductos[event.target.id].precio)
        if (todosPedidos.find(pedido => pedido.nombre == nuevoPedido.nombre)) {
            let prueba = todosPedidos.filter(pedido => pedido.nombre == nuevoPedido.nombre)
            prueba[0].aumentarCantidad()
            console.log(prueba)
            pintarPedidos(todosPedidos)
        } else {
            todosPedidos.push(nuevoPedido)
            pintarPedidos(todosPedidos)
        }

    }
})

pedidos.addEventListener('click', (event) => {
    if (event.target.classList.contains('sumar')) {
        let nuevoPedido = new Pedido(todosProductos[event.target.id].nombre, todosProductos[event.target.id].precio)
        console.log(event.target.id)
        if (todosPedidos.find(pedido => pedido.nombre == nuevoPedido.nombre)) {
            let prueba = todosPedidos.filter(pedido => pedido.nombre == nuevoPedido.nombre)
            prueba[0].aumentarCantidad()
            console.log(prueba)
            pintarPedidos(todosPedidos)
        }
    } else if (event.target.classList.contains('restar')) {
        let nuevoPedido = new Pedido(todosProductos[event.target.id].nombre, todosProductos[event.target.id].precio)
        if (todosPedidos.find(pedido => pedido.nombre == nuevoPedido.nombre)) {
            let prueba = todosPedidos.filter(pedido => pedido.nombre == nuevoPedido.nombre)
            prueba[0].restarCantidad()
            console.log(prueba)
            pintarPedidos(todosPedidos)
        }
    } else if (event.target.classList.contains('eliminar')) {
        let nuevoPedido = new Pedido(todosProductos[event.target.id].nombre, todosProductos[event.target.id].precio)
        if (todosPedidos.find(pedido => pedido.nombre == nuevoPedido.nombre)) {
            let prueba = todosPedidos.filter(pedido => pedido.nombre == nuevoPedido.nombre)
            prueba[0].aumentarCantidad()
            console.log(prueba)
            pintarPedidos(todosPedidos)
        } else {
            todosPedidos.push(nuevoPedido)
            pintarPedidos(todosPedidos)
        }
    }
})