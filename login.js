document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form');
    const campoUsuario = document.getElementById('usuario');
    const campoSenha = document.getElementById('senha');
    const botaoEntrar = document.querySelector('button[type="submit"]');

    // Mapeia os feedbacks de erro (você precisará adicioná-los ao seu HTML)
    const feedbackUsuario = document.getElementById('erro_usuario');
    const feedbackSenha = document.getElementById('erro_senha');

    formulario.addEventListener('submit', function(event) {
        // Impede o envio padrão do formulário
        event.preventDefault();

        // Limpa mensagens de erro anteriores
        feedbackUsuario.textContent = '';
        feedbackSenha.textContent = '';
        campoUsuario.classList.remove('is-invalid');
        campoSenha.classList.remove('is-invalid');

        let ehValido = true;

        // Validação básica de campo vazio
        if (campoUsuario.value.trim() === '') {
            ehValido = false;
            campoUsuario.classList.add('is-invalid');
            feedbackUsuario.textContent = 'O campo usuário é obrigatório.';
        }

        if (campoSenha.value.trim() === '') {
            ehValido = false;
            campoSenha.classList.add('is-invalid');
            feedbackSenha.textContent = 'O campo senha é obrigatório.';
        }

        // Se a validação básica passar, simula a verificação de credenciais
        if (ehValido) {
            // Este é apenas um exemplo. As credenciais de verdade estariam em um banco de dados.
            const usuarioCorreto = 'admin';
            const senhaCorreta = 'senha123';

            if (campoUsuario.value === usuarioCorreto && campoSenha.value === senhaCorreta) {
                // Credenciais corretas: redireciona para a página principal
                alert('Login bem-sucedido!');
                window.location.href = '/dashboard'; // Mude para o caminho correto
            } else {
                // Credenciais incorretas: exibe uma mensagem de erro genérica
                ehValido = false;
                campoUsuario.classList.add('is-invalid');
                campoSenha.classList.add('is-invalid');
                feedbackUsuario.textContent = 'Usuário ou senha incorretos.';
            }
        }
    });
});