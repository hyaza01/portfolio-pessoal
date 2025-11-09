// Aguarda o DOM (estrutura HTML) ser completamente carregado
// antes de tentar executar o script.
document.addEventListener("DOMContentLoaded", function() {

    // 1. Seleciona os elementos do formulário
    const form = document.getElementById("form-contato");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const mensagemInput = document.getElementById("mensagem");
    const feedbackDiv = document.getElementById("feedback-mensagem");

    // 2. Adiciona um "ouvinte" para o evento de 'submit' (envio) do formulário
    form.addEventListener("submit", function(event) {
        
        // 3. Impede o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault(); 

        // 4. Captura os valores dos campos, removendo espaços em branco extras
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const mensagem = mensagemInput.value.trim();

        // Limpa o feedback anterior
        feedbackDiv.textContent = "";

        // 5. Lógica de Validação
        // Verifica se nome, e-mail ou mensagem estão vazios
        if (nome === "" || email === "" || mensagem === "") {
            exibirMensagem("Por favor, preencha todos os campos.", "erro");
            return; // Para a execução
        }

        // Verifica se o e-mail tem um formato válido
        if (!isValidEmail(email)) {
            exibirMensagem("Por favor, insira um endereço de e-mail válido.", "erro");
            return; // Para a execução
        }

        // 6. Simulação de Envio (se tudo estiver válido)
        // Requisito da atividade: exibir alerta e limpar o formulário 
        alert("Mensagem enviada com sucesso!");

        // Limpa os campos do formulário
        form.reset(); 
    });

    /**
     * Função auxiliar para exibir mensagens de feedback (sucesso ou erro)
     * @param {string} mensagem - O texto a ser exibido
     * @param {string} tipo - "erro" ou "sucesso" para definir a cor
     */
    function exibirMensagem(mensagem, tipo) {
        feedbackDiv.textContent = mensagem;
        if (tipo === "erro") {
            feedbackDiv.style.color = "red";
        } else {
            feedbackDiv.style.color = "green";
        }
    }

    /**
     * Função auxiliar simples para validar o formato do e-mail.
     * Verifica se existe um "@" e um "." após o "@".
     * @param {string} email - O e-mail a ser validado
     * @returns {boolean} - Verdadeiro se o formato for válido
     */
    function isValidEmail(email) {
        // Esta é uma validação simples, conforme sugerido no exemplo (usuario@dominio.com) [cite: 58]
        const at = email.indexOf("@");
        const dot = email.lastIndexOf(".");
        return at > 0 && dot > at + 1 && dot < email.length - 1;
    }

});