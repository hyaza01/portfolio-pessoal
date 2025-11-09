/**
 * PORTFÓLIO PESSOAL - SCRIPT PRINCIPAL
 * 
 * Funcionalidades:
 * - Menu mobile responsivo
 * - Navegação suave entre seções
 * - Animações ao rolar (AOS)
 * - Validação de formulário
 * - Botão scroll to top
 * - Highlight de menu ativo
 */

// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initScrollToTop();
    initActiveMenu();
});

// ===================================
// MENU MOBILE
// ===================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuNav = document.getElementById('menuNav');
    
    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', function() {
            menuNav.classList.toggle('active');
            
            // Animação do botão hambúrguer
            this.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = menuNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !menuNav.contains(event.target)) {
                menuNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// ===================================
// NAVEGAÇÃO SUAVE
// ===================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// ANIMAÇÕES AO ROLAR (AOS)
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observar todos os elementos com data-aos
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        // Definir transformação inicial baseada no tipo de animação
        const animationType = element.getAttribute('data-aos');
        
        switch(animationType) {
            case 'fade-up':
                element.style.transform = 'translateY(50px)';
                break;
            case 'fade-down':
                element.style.transform = 'translateY(-50px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(-50px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(50px)';
                break;
        }
        
        observer.observe(element);
    });
}

// ===================================
// MENU ATIVO AO ROLAR
// ===================================
function initActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveMenu() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu(); // Executar ao carregar a página
}

// ===================================
// SCROLL TO TOP
// ===================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// FORMULÁRIO DE CONTATO
// ===================================
function initContactForm() {
    const form = document.getElementById('form-contato');
    const btnLimpar = document.getElementById('btn-limpar');
    const feedbackMensagem = document.getElementById('feedback-mensagem');
    
    if (!form) return;
    
    const campoNome = document.getElementById('nome');
    const campoEmail = document.getElementById('email');
    const campoTelefone = document.getElementById('telefone');
    const campoMensagem = document.getElementById('mensagem');
    
    // Botão limpar
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            form.reset();
            feedbackMensagem.textContent = '';
            feedbackMensagem.className = 'feedback-message';
            limparErros();
        });
    }
    
    // Validação em tempo real do e-mail
    if (campoEmail) {
        campoEmail.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email !== '' && !validarEmail(email)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
        
        campoEmail.addEventListener('focus', function() {
            this.style.borderColor = '';
        });
    }
    
    // Remover feedback de erro ao digitar
    [campoNome, campoEmail, campoMensagem].forEach(campo => {
        if (campo) {
            campo.addEventListener('input', function() {
                if (feedbackMensagem.classList.contains('erro')) {
                    feedbackMensagem.style.display = 'none';
                }
                this.style.borderColor = '';
            });
        }
    });
    
    // Submit do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpar mensagens anteriores
        feedbackMensagem.textContent = '';
        feedbackMensagem.className = 'feedback-message';
        limparErros();
        
        // Capturar valores
        const nome = campoNome.value.trim();
        const email = campoEmail.value.trim();
        const telefone = campoTelefone ? campoTelefone.value.trim() : '';
        const mensagem = campoMensagem.value.trim();
        
        // Validações
        if (!nome || !email || !mensagem) {
            exibirErro('⚠️ Por favor, preencha todos os campos obrigatórios.');
            
            if (!nome) destacarErro(campoNome);
            if (!email) destacarErro(campoEmail);
            if (!mensagem) destacarErro(campoMensagem);
            
            return;
        }
        
        if (nome.length < 3) {
            exibirErro('⚠️ O nome deve ter pelo menos 3 caracteres.');
            destacarErro(campoNome);
            return;
        }
        
        if (!validarEmail(email)) {
            exibirErro('⚠️ Por favor, insira um endereço de e-mail válido.');
            destacarErro(campoEmail);
            return;
        }
        
        if (mensagem.length < 10) {
            exibirErro('⚠️ A mensagem deve ter pelo menos 10 caracteres.');
            destacarErro(campoMensagem);
            return;
        }
        
        // Simular envio
        enviarFormulario(nome, email, telefone, mensagem);
    });
    
    // Função auxiliar de validação de e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Função para exibir erro
    function exibirErro(mensagem) {
        feedbackMensagem.textContent = mensagem;
        feedbackMensagem.className = 'feedback-message erro';
        
        // Rolar até o feedback
        feedbackMensagem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remover mensagem após 5 segundos
        setTimeout(function() {
            feedbackMensagem.style.display = 'none';
        }, 5000);
    }
    
    // Função para exibir sucesso
    function exibirSucesso(mensagem) {
        feedbackMensagem.textContent = mensagem;
        feedbackMensagem.className = 'feedback-message sucesso';
        
        // Remover mensagem após 5 segundos
        setTimeout(function() {
            feedbackMensagem.style.display = 'none';
        }, 5000);
    }
    
    // Função para destacar campo com erro
    function destacarErro(campo) {
        campo.style.borderColor = '#ef4444';
        campo.focus();
    }
    
    // Função para limpar erros
    function limparErros() {
        [campoNome, campoEmail, campoMensagem].forEach(campo => {
            if (campo) {
                campo.style.borderColor = '';
            }
        });
    }
    
    // Função para simular envio
    function enviarFormulario(nome, email, telefone, mensagem) {
        // Desabilitar botão de envio
        const btnEnviar = form.querySelector('button[type="submit"]');
        btnEnviar.disabled = true;
        btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simular requisição
        setTimeout(function() {
            // Log para desenvolvimento
            console.log('===== FORMULÁRIO ENVIADO COM SUCESSO =====');
            console.log('Nome:', nome);
            console.log('E-mail:', email);
            console.log('Telefone:', telefone);
            console.log('Mensagem:', mensagem);
            console.log('==========================================');
            
            // Exibir mensagem de sucesso
            exibirSucesso('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.');
            
            // Limpar formulário
            form.reset();
            limparErros();
            
            // Reabilitar botão
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            
            // Alert de confirmação
            alert('✅ Mensagem enviada com sucesso!\n\nObrigado pelo contato. Responderei em breve!');
        }, 1500);
    }
}

// ===================================
// EFEITOS ADICIONAIS
// ===================================

// Adicionar efeito parallax suave ao hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.shape');
    
    heroShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Fade in header ao rolar
let lastScroll = 0;
const header = document.querySelector('.header-fixed');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            // Rolando para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Rolando para cima
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
});

// Iniciar loading da página
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animar números nas barras de progresso
    const skillBars = document.querySelectorAll('.level-bar');
    skillBars.forEach(bar => {
        const level = bar.style.getPropertyValue('--level');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = level;
        }, 100);
    });
});

// Log de boas-vindas no console
console.log('%c🚀 Portfólio de Antônio Bernabio Júnior', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c👨‍💻 Especialista em RPA & Automação', 'color: #06b6d4; font-size: 14px;');
console.log('%c💼 Desenvolvido com HTML5, CSS3 e JavaScript', 'color: #f59e0b; font-size: 12px;');
console.log('%c📧 antoniobernabiopereira@gmail.com', 'color: #10b981; font-size: 12px;');
