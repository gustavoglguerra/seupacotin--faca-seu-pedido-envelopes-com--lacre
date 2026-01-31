const linhas = document.querySelectorAll("#linhas tr");
const btn = document.getElementById("whatsappBtn");

linhas.forEach(linha => {
  linha.querySelector("input").addEventListener("input", calcular);
});

function calcular() {
  let totalValor = 0;
  let totalPeso = 0;
  let mensagem = "Pedido:%0A";
  let temPedido = false;

  linhas.forEach(linha => {
    const qtd = Number(linha.querySelector("input").value);
    const preco = Number(linha.dataset.preco);
    const peso = Number(linha.dataset.peso);

    if (!qtd) {
      linha.cells[3].innerText = "-";
      linha.cells[4].innerText = "-";
      return;
    }

    temPedido = true;

    const subtotal = qtd * preco;
    const pesoTotal = qtd * peso;

    linha.cells[3].innerText = "R$ " + subtotal.toFixed(2);
    linha.cells[4].innerText = pesoTotal.toFixed(1) + " kg";

    totalValor += subtotal;
    totalPeso += pesoTotal;

    mensagem += `${linha.cells[0].innerText}: ${qtd} mil%0A`;
  });

  document.getElementById("totalValor").innerText =
    "R$ " + totalValor.toFixed(2);

  document.getElementById("totalPeso").innerText =
    totalPeso.toFixed(1) + " kg";

  if (temPedido) {
    btn.style.display = "block";
    btn.href =
      "https://wa.me/5511990728646?text=" +
      mensagem +
      `%0ATotal: R$ ${totalValor.toFixed(2)}%0APeso: ${totalPeso.toFixed(1)} kg`;
  } else {
    btn.style.display = "none";
  }
}
