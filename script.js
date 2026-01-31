document.addEventListener("DOMContentLoaded", function () {

  const produtos = [
    ["12x18 + ABA", 27.90, 1.7],
    ["15x25 + ABA", 46.90, 3.0],
    ["19x25 + ABA", 59.90, 3.4],
    ["20x30 + ABA", 74.90, 4.5],
    ["22x40 + ABA",105.90, 6.8],
    ["25x35 + 3 ABA",101.90, 7.2],
    ["26x36 + 3 ABA",105.90, 7.4],
    ["25x45 + 3 ABA",133.90, 8.2],
    ["30x40 + 3 ABA",143.90, 8.8],
    ["32x40 + 3 ABA",152.90,10.6],
    ["35x50 + 3 ABA",207.90,11.8],
    ["40x50 + 3 ABA",237.90,14.0],
    ["40x60 + 3 ABA",283.90,16.9],
    ["50x60 + 3 ABA",354.90,21.9]
  ];

  const tabela = document.getElementById("tabela");
  const tbody = tabela.querySelector("tbody");

  produtos.forEach(produto => {
    const linha = tbody.insertRow();

    linha.insertCell(0).innerText = produto[0];

    const cellQtd = linha.insertCell(1);
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.placeholder = "0";
    input.addEventListener("input", calcular);
    cellQtd.appendChild(input);

    linha.insertCell(2).innerText = "R$ " + produto[1].toFixed(2);
    linha.insertCell(3).innerText = "-";
    linha.insertCell(4).innerText = "-";

    linha.dataset.preco = produto[1];
    linha.dataset.peso = produto[2];
  });

  function calcular() {
    let totalValor = 0;
    let totalPeso = 0;
    let mensagem = "Pedido:%0A";
    let temPedido = false;

    [...tbody.rows].forEach(row => {
      const input = row.cells[1].querySelector("input");
      const qtd = Number(input.value);

      if (!qtd) {
        row.cells[3].innerText = "-";
        row.cells[4].innerText = "-";
        return;
      }

      temPedido = true;

      const preco = Number(row.dataset.preco);
      const peso = Number(row.dataset.peso);

      const subtotal = qtd * preco;
      const pesoTotal = qtd * peso;

      row.cells[3].innerText = "R$ " + subtotal.toFixed(2);
      row.cells[4].innerText = pesoTotal.toFixed(1) + " kg";

      totalValor += subtotal;
      totalPeso += pesoTotal;

      mensagem += `${row.cells[0].innerText}: ${qtd} mil%0A`;
    });

    document.getElementById("totalValor").innerText =
      "R$ " + totalValor.toFixed(2);

    document.getElementById("totalPeso").innerText =
      totalPeso.toFixed(1) + " kg";

    const btn = document.getElementById("whatsappBtn");

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

});

