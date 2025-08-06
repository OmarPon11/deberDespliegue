/**
 * @jest-environment jsdom
 */
const {
  agregarACarrito,
  carrito,
  productos,
  getTotal,
  resetTotal
} = require('./script');

describe('Ponce Motors - Tests de carrito de autos', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="lista-carrito"></ul>
      <span id="total"></span>
    `;
    carrito.length = 0;
    resetTotal();
  });

  test('agrega un vehículo al carrito', () => {
    agregarACarrito(productos[0]); // Mercedes Benz clase C
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe("Mercedes Benz clase C");
    expect(getTotal()).toBeCloseTo(65000.00);
  });

  test('actualiza el DOM correctamente con el auto agregado', () => {
    agregarACarrito(productos[1]); // Audi R8

    const lista = document.getElementById("lista-carrito");
    expect(lista).not.toBeNull();
    expect(lista.children.length).toBe(1);
    expect(lista.textContent).toContain("Audi R8");

    const totalTexto = document.getElementById("total").textContent;
    expect(totalTexto).toBe("120000.00");
  });

  test('agrega múltiples autos y calcula total', () => {
    agregarACarrito(productos[2]); // Eclipse Cross
    agregarACarrito(productos[5]); // Ford Raptor

    expect(carrito.length).toBe(2);
    expect(getTotal()).toBeCloseTo(30000.00 + 85000.50);
  });
});