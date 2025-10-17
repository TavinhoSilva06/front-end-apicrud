// Endereço base da API (onde o backend Java está rodando)
const API_URL = "http://localhost:8080/funcionarios"; 

// Função para adicionar um novo funcionário
async function adicionarFuncionario() {
  const nome = document.getElementById("nome").value;
  const profissao = document.getElementById("profissao").value;
  const modelo = document.getElementById("modelo").value;
  const salario = document.getElementById("salario").value;

  if (!nome || !profissao || !modelo || !salario) {
    alert("Preencha todos os campos!");
    return;
  }

  const funcionario = { nome, profissao, modelo, salario: parseFloat(salario) };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(funcionario)
    });

    if (response.ok) {
      alert("Funcionário adicionado com sucesso!");
    } else {
      alert("Erro ao adicionar funcionário!");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar funcionário!");
  }
}
