let materiais = JSON.parse(localStorage.getItem("materiais") || "[]");

function atualizarTabela() {
  const tbody = document.querySelector("#tabelaMateriais tbody");
  tbody.innerHTML = "";

  materiais.forEach((mat, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${mat.nome}</td>
      <td>${mat.quantidadeInicial}</td>
      <td>${mat.quantidadeDisponivel}</td>
      <td>${mat.quantidadeMinima}</td>
      <td>R$ ${parseFloat(mat.valor).toFixed(2)}</td>
      <td>${mat.obs}</td>
      <td>
        <button class="btn-small btn-edit" onclick="editarMaterial(${index})">Editar</button>
        <button class="btn-small btn-delete" onclick="excluirMaterial(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function resetarFormulario() {
  document.getElementById("materialIndex").value = "";
  document.getElementById("formCadastro").reset();
  document.querySelector('#formCadastro button[type="submit"]').textContent = 'Cadastrar';
  document.getElementById("btnCancelarEdicao").style.display = "none";
}

document.getElementById("formCadastro").addEventListener("submit", function (event) {
  event.preventDefault();

  const index = document.getElementById("materialIndex").value;
  const nome = document.getElementById("nomeMaterial").value.trim();
  const quantidadeInicial = parseInt(document.getElementById("quantidadeInicial").value);
  const quantidadeDisponivel = parseInt(document.getElementById("quantidadeDisponivel").value);
  const quantidadeMinima = parseInt(document.getElementById("quantidadeMinima").value);
  const valor = parseFloat(document.getElementById("valor").value);
  const obs = document.getElementById("obs").value.trim();

  if (!nome || isNaN(quantidadeInicial) || isNaN(quantidadeDisponivel) || isNaN(quantidadeMinima) || isNaN(valor)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novoMaterial = { nome, quantidadeInicial, quantidadeDisponivel, quantidadeMinima, valor, obs };

  if (index !== "") {
    materiais[index] = novoMaterial;
    alert("Material atualizado com sucesso!");
  } else {
    const duplicado = materiais.find(m => m.nome.toLowerCase() === nome.toLowerCase());
    if (duplicado) {
      alert("Esse material já está cadastrado.");
      return;
    }
    materiais.push(novoMaterial);
    alert("Material cadastrado com sucesso!");
  }

  localStorage.setItem("materiais", JSON.stringify(materiais));
  atualizarTabela();
  resetarFormulario();
});

function editarMaterial(index) {
  const mat = materiais[index];
  document.getElementById("materialIndex").value = index;
  document.getElementById("nomeMaterial").value = mat.nome;
  document.getElementById("quantidadeInicial").value = mat.quantidadeInicial;
  document.getElementById("quantidadeDisponivel").value = mat.quantidadeDisponivel;
  document.getElementById("quantidadeMinima").value = mat.quantidadeMinima;
  document.getElementById("valor").value = mat.valor;
  document.getElementById("obs").value = mat.obs;

  document.querySelector('#formCadastro button[type="submit"]').textContent = 'Salvar';
  document.getElementById("btnCancelarEdicao").style.display = "inline-block";
}

function excluirMaterial(index) {
  if (confirm("Tem certeza que deseja excluir este material?")) {
    materiais.splice(index, 1);
    localStorage.setItem("materiais", JSON.stringify(materiais));
    atualizarTabela();
    resetarFormulario();
  }
}

document.getElementById("btnCancelarEdicao").addEventListener("click", resetarFormulario);

function filtrarMateriais() {
  const filtro = document.getElementById("filtro").value.toLowerCase();
  const linhas = document.querySelectorAll("#tabelaMateriais tbody tr");

  linhas.forEach(linha => {
    const nome = linha.children[0].textContent.toLowerCase();
    linha.style.display = nome.includes(filtro) ? "" : "none";
  });
}

// Atualiza automaticamente a tabela
window.onload = atualizarTabela;
window.onfocus = atualizarTabela;
window.onload = atualizarTabela;
window.onfocus = atualizarTabela;
history.back()
window.onload = atualizarTabela;
window.onfocus = atualizarTabela;
materiais[index].quantidadeDisponivel -= quantidade;
localStorage.setItem("materiais", JSON.stringify(materiais));
