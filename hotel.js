window.onload = function() 
{
    carregarReservas();
};

function carregarReservas() 
{
    fetch('http://localhost:3000/reservas')

        .then(response => response.json())

        .then(reservas => 
            {
            const tabela = document.getElementById('tabelaReservas');
            tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
            reservas.forEach(reserva => 
                
            {

                const row = document.createElement('tr');
                row.innerHTML = `

                 <td>${reserva.nome}</td>
                 <td>${reserva.email}</td>
                 <td>${reserva.dataEntrada}</td>
                 <td>${reserva.dataSaida}</td>
                 <td>${reserva.observacoes}</td>
                `;

                tabela.appendChild(row);
            });
        });
}


document.querySelector('form').addEventListener('submit', function(event) 
{
    event.preventDefault(); // Impede o comportamento padrão do formulário
    
    // Captura os dados do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const dataEntrada = document.getElementById('data-entrada').value;
    const dataSaida = document.getElementById('data-saida').value;
    const observacoes = document.getElementById('observacoes').value;
    const adultos = document.getElementById('adultos').value;
    const criancas = document.getElementById('criancas').value;
  
    // Envia os dados para o servidor
    fetch('http://localhost:3000/reservas', 
        {
      method: 'POST',

      headers: 
      {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(
        {
        nome: nome,
        email: email,
        dataEntrada: dataEntrada,
        dataSaida: dataSaida,
        observacoes: observacoes,
        adultos: adultos,
        criancas: criancas
      })
    })

    .then(response => response.json())
    .then(data => 
        {
      // Exibe mensagem de sucesso
      const successMessage = document.createElement('div');
      successMessage.classList.add('alert', 'alert-success');
      successMessage.textContent = 'Reserva realizada com sucesso!';
      document.body.appendChild(successMessage);
        });
    });
