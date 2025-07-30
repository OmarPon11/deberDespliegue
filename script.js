// DATOS DE PAYPHONE PARA REDIRECCIONAR:
const token = "jLKZwul6WuFRLFVKetXc6X30OwNokSAQ2nvPxF9orxmy1S0giEIrp4r9sAdZMT8oyOLU3krQrYnwx7Ys1lA29uVP2jmp2bKmBjR838LyM75epNz5USnbcizx3d8cUVKcmLYvsNPZ1quqvMwLAnA6k2siP3cyhxklk9WMGPAXGF1zteQRKIALux8V6csOn0KyvMPhsDqK2HJ3JlLZnJQCXJGmjx0QQ-9LUTb6D_mfgJnmjeuyp4V4xnnA9-QdL77QNv58cG162N2vOkfL5IAuDlEkcDPD3qY3-At3ZOQFmZZqfCyGioA4jYRyuPHh1uKdmoJbFgJ6A5fawueiTLTxkelYsi0";
const storeId = "dcd37f2d-b0f8-4fc7-a79b-9c7361e788ba";

const productos = [
  { nombre: "Mercedes Benz clase C", precio: 65000.00, img: "images/mercedes.jpeg" },
  { nombre: "Audio R8", precio: 120000.00, img: "images/audi.jpeg" },
  { nombre: "Eclipse Cross", precio: 30000.00, img: "images/elip.jpeg" },
  { nombre: "Ferrari SF90 Stradale", precio: 150000.00, img: "images/lambo.jpeg" },
  { nombre: "Lamborghini Urus", precio: 110000.00, img: "images/urus.jpeg" },
  { nombre: "Ford Raptor ", precio: 85000.50, img: "images/ford.jpeg" }
];

let carrito = [];
let total = 0;

const grid = document.getElementById("product-grid");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");

function renderProductos() {
  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h2>${p.nombre}</h2>
      <p class="price">$${p.precio.toFixed(2)}</p>
    `;
    card.onclick = () => agregarACarrito(p);
    grid.appendChild(card);
  });
}

function agregarACarrito(producto) {
  carrito.push(producto);
  total += producto.precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  carrito.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
    listaCarrito.appendChild(item);
  });
  totalSpan.textContent = total.toFixed(2);
}

async function pagar() {
  if (total === 0) {
    alert("Agrega productos al carrito antes de pagar.");
    return;
  }

  const montoCentavos = Math.round(total * 100);

  const data = {
    amount: montoCentavos,
    amountWithoutTax: montoCentavos,
    amountWithTax: 0,
    tax: 0,
    reference: "Compra Ponce Motors",
    currency: "USD",
    clientTransactionId: "trx-" + Date.now(),
    storeId: storeId,
    responseUrl: "http://127.0.0.1"
  };

  try {
    const res = await fetch("https://pay.payphonetodoesposible.com/api/button/Prepare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const resultado = await res.json();

    if (resultado.payWithPayPhone) {
      window.location.href = resultado.payWithPayPhone;
    } else {
      alert("No se recibió el enlace de pago. Verifica tu token o storeId.");
      console.log("Respuesta:", resultado);
    }

  } catch (error) {
    console.error("Error al conectar con PayPhone:", error);
    alert("Ocurrió un error al conectar con PayPhone.");
  }
}

renderProductos();