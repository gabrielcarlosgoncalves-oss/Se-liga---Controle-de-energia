document.addEventListener('DOMContentLoaded', function() {
    // O ID do formulário está AGORA no HTML: id="cadastroForm"
    const formulario = document.getElementById('cadastroForm');

    // Mapeia todos os campos do formulário pelo ID 
    const campos = {
        usuario: document.getElementById('usuario'),
        nome: document.getElementById('nome'),
        senha: document.getElementById('senha'),
        salario: document.getElementById('salario'), 
        email: document.getElementById('email'),
    };

    // Mapeia os elementos de feedback de erro
    const feedbacks = {
        usuario: document.getElementById('erro_usuario'),
        senha: document.getElementById('erro_senha'),
        email: document.getElementById('erro_email'),
    };

    // Adiciona o ouvinte de evento para o envio do formulário
    formulario.addEventListener('submit', function(event) {
        // ESSENCIAL: Impede o envio do formulário padrão 
        event.preventDefault();

        let ehValido = true;

        // Limpa todos os erros no início para evitar mensagens antigas
        for (const key in campos) {
            const campo = campos[key];
            const feedback = feedbacks[key]; // Pode ser undefined para 'nome' e 'salario'

            // Remove classes de validação, se houver
            campo.classList.remove('is-invalid', 'is-valid');
            
            // Limpa o texto de erro
            if (feedback) {
                feedback.textContent = '';
            }
        }

        // --- Lógica de Validação ---

        // Validação de campos obrigatórios
        for (const key in campos) {
            const campo = campos[key];
            
            // Verifica se o campo está vazio ou só tem espaços
            if (campo.value.trim() === '') {
                campo.classList.add('is-invalid');
                
                // Exibe erro apenas se houver um elemento de feedback mapeado
                // Para Nome e Salário, o erro não será exibido em um div, apenas a borda vermelha
                if (feedbacks[key]) {
                    feedbacks[key].textContent = 'Este campo é obrigatório.';
                }
                ehValido = false;
            }
        }

        // Validação do Email
        // A validação de 'vazio' já foi feita acima.
        if (campos.email.value.trim() !== '' && (!campos.email.value.includes('@') || !campos.email.value.includes('.'))) {
            campos.email.classList.add('is-invalid');
            if (feedbacks.email) {
                feedbacks.email.textContent = 'Por favor, insira um email válido.';
            }
            ehValido = false;
        }

        // Validação da Senha
        const senhaValue = campos.senha.value;
        const senhaRegexMaiuscula = /[A-Z]/;
        const senhaRegexNumero = /[0-9]/;

        if (senhaValue.length > 0) { // Verifica a complexidade apenas se não estiver vazio
            if (senhaValue.length < 8) {
                campos.senha.classList.add('is-invalid');
                if (feedbacks.senha) {
                    feedbacks.senha.textContent = 'A senha deve ter no mínimo 8 caracteres.';
                }
                ehValido = false;
            } else if (!senhaRegexMaiuscula.test(senhaValue)) {
                campos.senha.classList.add('is-invalid');
                if (feedbacks.senha) {
                    feedbacks.senha.textContent = 'A senha deve conter pelo menos uma letra maiúscula.';
                }
                ehValido = false;
            } else if (!senhaRegexNumero.test(senhaValue)) {
                campos.senha.classList.add('is-invalid');
                if (feedbacks.senha) {
                    feedbacks.senha.textContent = 'A senha deve conter pelo menos um número.';
                }
                ehValido = false;
            }
        }
        
        // Validação do Usuário
        const usuarioValue = campos.usuario.value;
        const usuarioRegexMaiuscula = /[A-Z]/;
        const usuarioRegexNumero = /[0-9]/;
        
        // Não refaz a checagem de vazio, apenas a complexidade
        if (usuarioValue.length > 0) {
            if (usuarioValue.length < 8) {
                campos.usuario.classList.add('is-invalid');
                if (feedbacks.usuario) {
                    feedbacks.usuario.textContent = 'Nome de usuário deve ter no mínimo 8 caracteres.';
                }
                ehValido = false;
            } else if (!usuarioRegexMaiuscula.test(usuarioValue)) {
                campos.usuario.classList.add('is-invalid');
                if (feedbacks.usuario) {
                    feedbacks.usuario.textContent = 'Nome de usuário deve conter pelo menos uma letra maiúscula.';
                }
                ehValido = false;
            } else if (!usuarioRegexNumero.test(usuarioValue)) {
                campos.usuario.classList.add('is-invalid');
                if (feedbacks.usuario) {
                    feedbacks.usuario.textContent = 'Nome de usuário deve conter pelo menos um número.';
                }
                ehValido = false;
            }
        }
        
        if (ehValido) {
            console.log('Formulário validado com sucesso. Dados prontos para envio ou redirecionamento.');
            alert('Cadastro realizado com sucesso!'); // Feedback visual

            // Redireciona para a página inicial
            window.location.href = formulario.action; 
        } else {
            console.log('Existem erros no formulário. Por favor, preencha todos os campos corretamente.');
        }
    });
});