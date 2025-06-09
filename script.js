const produtos = [
  { id: 1, nome: 'Camiseta Branca', preco: 29.99, imagem: 'https://via.placeholder.com/100?text=Camiseta+Branca' },
  { id: 2, nome: 'Calça Jeans', preco: 79.99, imagem: 'https://via.placeholder.com/100?text=Calça+Jeans' },
  { id: 3, nome: 'Vestido Floral', preco: 59.99, imagem: 'https://via.placeholder.com/100?text=Vestido+Floral' },
  { id: 4, nome: 'Jaqueta Cácia', preco: 99.99, imagem: 'https://via.placeholder.com/100?text=Jaqueta' }
];

const listaProdutos = document.getElementById('listaProdutos');
const itensCarrinho = document.getElementById('itensCarrinho');
const mensagem = document.getElementById('mensagem');
let carrinho = [];

function renderizarProdutos() {
  produtos.forEach(produto => {
    const divProduto = document.createElement('div');
    divProduto.className = 'produto';
    divProduto.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
    `;
    listaProdutos.appendChild(divProduto);
  });
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const produtoNoCarrinho = carrinho.find(p => p.id === id);
  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }
  renderizarCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(p => p.id !== id);
  renderizarCarrinho();
}

function renderizarCarrinho() {
  itensCarrinho.innerHTML = '';
  mensagem.textContent = '';
  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = '<p>Carrinho vazio.</p>';
    return;
  }
  carrinho.forEach(item => {
    const divItem = document.createElement('div');
    divItem.innerHTML = `
      <p>${item.nome} x ${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
      <button onclick="removerDoCarrinho(${item.id})">Remover</button>
    `;
    itensCarrinho.appendChild(divItem);
  });
}

document.getElementById('finalizarCompra').addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio.');
    return;
  }
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  mensagem.textContent = `Compra finalizada! Total: R$ ${total.toFixed(2)}`;
  carrinho = [];
  renderizarCarrinho();
});

renderizarProdutos();
renderizarCarrinho();
