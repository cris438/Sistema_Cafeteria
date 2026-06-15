class Producto {
    #nombre
    #precio
    #categoria
    #descripcion
    #url
    constructor(nombre, precio, categoria, descripcion, url) {
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.descripcion = descripcion
        this.#url = url
    }
    get url(){
        return this.#url
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
    constructor(nombre, precioUnitario) {
        this.nombre = nombre
        this.cantidad = this.cantidad
        this.precioUnitario = precioUnitario
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

    set nombre(value) {
        this.#nombre = value
    }
    set cantidad(value) {
        this.#cantidad += value
    }
    set precioUnitario(value) {
        this.#precioUnitario = value
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
let subTotal = document.querySelector('#subtotal')
let impuesto = document.querySelector('#impuesto')
let total = document.querySelector('#total')
let vaciarPedido = document.querySelector('#vaciarPedido')
let finalizarPedido = document.querySelector('#finalizarPedido')
let resumenFinal = document.querySelector('#resumenFinal')
let totalFinal = document.querySelector('#totalFinal')
let filtros = document.querySelector('#filtros')
let inputBuscador = document.querySelector('#buscador')

let producto1 = new Producto('Café Americano', 12, 'Bebida caliente', 'Cafe negro tradicional','./images/cafeAmericano.jpeg')
let producto2 = new Producto('Café Latte', 18, 'Bebida caliente', 'Cafe con leche espumada','./images/cafeLatte.jpeg')
let producto3 = new Producto('Frappe de Chocolate', 25, 'Bebida fria', 'Bebida fría con chocolate y crema','./images/frappeChocolate.jpeg')
let producto4 = new Producto('Smoothie de Fresa', 22, 'Bebida fria', 'Batido natural de fresa','./images/smothiedeFresa.jpeg')
let producto5 = new Producto('Muffin de Vainilla', 15, 'Postre', 'Pan dulce suave de vainilla','./images/muffinDeVainilla.jpeg')
let producto6 = new Producto('Cheesecake', 28, 'Postre', 'Pastel frio de queso','./images/Chess.jpeg')
let producto7 = new Producto('Sandwich de Pollo', 30, 'Comida', 'Sandwich con pollo y vegetales','./images/sandwich.jpeg')
let producto8 = new Producto('Bagel con Queso', 20, 'Comida', 'Bagel tostado con queso crema','./images/bagel.jpeg')

let todosProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]
let todosPedidos = []

let nombre = null
let categoria = 'Todas'

const pintarProductos = (todosProducto) => {
    productos.innerHTML = ''
    todosProducto.forEach((producto) => {
        let html = `
                    <div class="col-md-3 mb-4">
                        <div class="card product-card h-100">
                            <img src=${producto.url} class="card-img-top" alt="Café Latte">
                                <div class="card-body">
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">Q${producto.precio}.00</h6>
                                    <p class="card-text">${producto.descripcion}</p>
                                    <button id="${todosProductos.indexOf(producto)}" class=" agregar btn btn-sm btn-success w-100">Agregar</button>
                                </div>
                        </div>
                    </div>
                `
        productos.innerHTML += html

    })
}

const pintarPedidos = (nuevosPedidos) => {
    pedidos.innerHTML = ''
    nuevosPedidos.forEach((nuevoPedido, index) => {
        let html = ` 
    <div class="pedido-item d-flex justify-content-between align-items-center">
      <div>
        <strong>${nuevoPedido.nombre}</strong><br>
        <span class="cantidad">Cantidad: ${nuevoPedido.cantidad}</span> | <span class="precioUnitario">Precio unitario: Q${nuevoPedido.precioUnitario}</span>
      </div>
      <div>
        <button id="${index}" class="btn btn-sm btn-outline-secondary restar">-</button>
        <button id="${index}" class="btn btn-sm btn-outline-secondary sumar">+</button>
        <button id="${index}" class="btn btn-sm btn-outline-danger eliminar">Eliminar</button>
      </div>
    </div>
    `
        console.log(html)
        pedidos.innerHTML += html
    })
}

const calcularSubTotal = () => {
    let subtotal = 0
    if (!todosPedidos.length == 0) {
        todosPedidos.forEach(pedido => {
            subtotal += parseFloat(pedido.cantidad) * parseFloat(pedido.precioUnitario)
        })
    }
    return subtotal.toFixed(2)
}

const calcularImpuesto = () => {
    let calculoImpuesto = (calcularSubTotal() / 100) * 5
    return calculoImpuesto.toFixed(2)
}

const calcularTotal = () => {
    let calculoTotal = parseFloat(calcularSubTotal()) + parseFloat(calcularImpuesto())
    return calculoTotal.toFixed(2)
}

const todosFiltros = (categoria, nombre) => {
    let filtrarProductos = []
    filtrarProductos = todosProductos.filter(producto => (nombre != '' && nombre != null) ? producto.nombre.toLowerCase().includes(nombre.toLowerCase()) : producto).filter(producto => (categoria != 'Todas') ? producto.categoria == categoria : producto)
    pintarProductos(filtrarProductos)
}

const quitarHovers = () => {
    let botones = filtros.childNodes
    botones.forEach((boton, index) => {
        if (index % 2 != 0) {
            boton.classList.remove('active')
        }
    })
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
            nuevoPedido.aumentarCantidad()
            todosPedidos.push(nuevoPedido)
            pintarPedidos(todosPedidos)
        }
        finalizarPedido.disabled = false
        subTotal.textContent = `Q${calcularSubTotal()}`
        impuesto.textContent = `Q${calcularImpuesto()}`
        total.textContent = `Q${calcularTotal()}`
    }
})

pedidos.addEventListener('click', (event) => {
    if (event.target.classList.contains('sumar')) {
        todosPedidos[event.target.id].aumentarCantidad()
        pintarPedidos(todosPedidos)
        subTotal.textContent = `Q${calcularSubTotal()}`
        impuesto.textContent = `Q${calcularImpuesto()}`
        total.textContent = `Q${calcularTotal()}`
    } else if (event.target.classList.contains('restar')) {
        if (todosPedidos[event.target.id].cantidad > 1) {
            todosPedidos[event.target.id].restarCantidad()
        } else {
            todosPedidos.splice(event.target.id, 1)
        }
        if (todosPedidos.length == 0) {
            finalizarPedido.disabled = true
        }
        subTotal.textContent = `Q${calcularSubTotal()}`
        impuesto.textContent = `Q${calcularImpuesto()}`
        total.textContent = `Q${calcularTotal()}`
        pintarPedidos(todosPedidos)
    } else if (event.target.classList.contains('eliminar')) {
        todosPedidos.splice(event.target.id, 1)
        pintarPedidos(todosPedidos)
        subTotal.textContent = `Q${calcularSubTotal()}`
        impuesto.textContent = `Q${calcularImpuesto()}`
        total.textContent = `Q${calcularTotal()}`
    }
})

vaciarPedido.addEventListener('click', (event) => {
    todosPedidos = []
    pintarPedidos(todosPedidos)
    subTotal.textContent = `Q${calcularSubTotal()}`
    impuesto.textContent = `Q${calcularImpuesto()}`
    total.textContent = `Q${calcularTotal()}`
    resumenFinal.classList.add('d-none')
    finalizarPedido.disabled = true
    categoria = 'Todas'
    nombre = null
    inputBuscador.value = ''
    todosFiltros(categoria, nombre)
    quitarHovers()
})

finalizarPedido.addEventListener('click', () => {
    resumenFinal.classList.remove('d-none')
    totalFinal.textContent = `Q${calcularTotal()}`
})

filtros.addEventListener('click', (event) => {
    if (event.target.getAttribute('data-category') == 'Todas') {
        categoria = 'Todas'
        todosFiltros(categoria, nombre)
    } else if (event.target.getAttribute('data-category') == 'Bebida caliente') {
        categoria = 'Bebida caliente'
        todosFiltros(categoria, nombre)
    } else if (event.target.getAttribute('data-category') == 'Bebida fria') {
        categoria = 'Bebida fria'
        todosFiltros(categoria, nombre)
    } else if (event.target.getAttribute('data-category') == 'Postre') {
        categoria = 'Postre'
        todosFiltros(categoria, nombre)
    } else if (event.target.getAttribute('data-category') == 'Comida') {
        categoria = 'Comida'
        todosFiltros(categoria, nombre)
    }
    quitarHovers()
    event.target.classList.add('active')
})

inputBuscador.addEventListener('keyup', (event) => {
    nombre = event.target.value
    todosFiltros(categoria, nombre)
})


pintarProductos(todosProductos)