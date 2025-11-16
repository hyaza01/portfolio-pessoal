/**
 * PORTFÓLIO PESSOAL - SCRIPT PRINCIPAL
 * * Funcionalidades:
 * - Menu mobile responsivo
 * - Navegação suave entre seções
 * - Animações ao rolar (AOS)
 * - Validação de formulário
 * - Botão scroll to top
 * - Highlight de menu ativo
 */

const EMAIL_DEFAULT_TO = 'antoniobernabiopereira@gmail.com';
const EMAIL_SERVICE_ID = '';
const EMAIL_TEMPLATE_ID = '';
const EMAIL_PUBLIC_KEY = '';
let emailServiceReady = false;

// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initEmailBridge();
    initContactForm();
    initScrollToTop();
    initActiveMenu();
    initClipboardButtons();
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
    let feedbackTimeout;
    
    // Botão limpar
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            form.reset();
            if (feedbackMensagem) {
                feedbackMensagem.textContent = '';
                feedbackMensagem.className = 'feedback-message';
                feedbackMensagem.style.display = 'none';
            }
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
                if (feedbackMensagem && feedbackMensagem.classList.contains('erro')) {
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
        if (feedbackMensagem) {
            feedbackMensagem.textContent = '';
            feedbackMensagem.className = 'feedback-message';
            feedbackMensagem.style.display = 'none';
        }
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
        
        // Envio real / fallback mailto
        enviarFormulario(nome, email, telefone, mensagem);
    });
    
    // Função auxiliar de validação de e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function mostrarFeedback(mensagem, tipo = 'sucesso') {
        if (!feedbackMensagem) return;
        clearTimeout(feedbackTimeout);
        feedbackMensagem.textContent = mensagem;
        feedbackMensagem.className = `feedback-message ${tipo}`;
        feedbackMensagem.style.display = 'block';
        feedbackMensagem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        feedbackTimeout = setTimeout(() => {
            feedbackMensagem.style.display = 'none';
        }, 6000);
    }

    function exibirErro(mensagem) {
        mostrarFeedback(mensagem, 'erro');
    }

    function exibirSucesso(mensagem) {
        mostrarFeedback(mensagem, 'sucesso');
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
        if (feedbackMensagem) {
            feedbackMensagem.textContent = '';
            feedbackMensagem.className = 'feedback-message';
            feedbackMensagem.style.display = 'none';
        }
    }
    
    // Função para envio real / fallback
    function enviarFormulario(nome, email, telefone, mensagem) {
        const btnEnviar = form.querySelector('button[type="submit"]');
        setLoadingState(btnEnviar, true);

        const payload = {
            from_name: nome,
            reply_to: email,
            phone: telefone || 'Não informado',
            message: mensagem,
            to_email: EMAIL_DEFAULT_TO
        };

        const finalizar = mensagemSucesso => {
            exibirSucesso(mensagemSucesso);
            form.reset();
            limparErros();
            setLoadingState(btnEnviar, false);
        };

        if (emailServiceReady && typeof emailjs !== 'undefined') {
            emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, payload)
                .then(() => {
                    finalizar('✅ Mensagem enviada com sucesso! Obrigado pelo contato.');
                })
                .catch(error => {
                    console.error('Erro ao enviar via EmailJS:', error);
                    abrirMailto(nome, email, telefone, mensagem);
                    finalizar('⚠️ Não conseguimos enviar automaticamente, mas abrimos seu e-mail com a mensagem pronta.');
                });
        } else {
            abrirMailto(nome, email, telefone, mensagem);
            finalizar('📮 Abrimos seu cliente de e-mail com uma mensagem pronta. É só revisar e enviar!');
        }
    }
}

// ===================================
// EMAIL & CLIPBOARD UTILITÁRIOS
// ===================================
function initEmailBridge() {
    if (typeof emailjs === 'undefined') {
        console.info('EmailJS não carregado. Mantendo fallback via mailto.');
        return;
    }

    if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
        console.info('Configure EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID e EMAIL_PUBLIC_KEY para habilitar o envio automático.');
        return;
    }

    emailjs.init({ publicKey: EMAIL_PUBLIC_KEY });
    emailServiceReady = true;
}

function initClipboardButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    if (!copyButtons.length) return;

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.copy;
            if (!value) return;

            copyToClipboard(value)
                .then(() => animateCopyButton(button))
                .catch(() => alert('Não foi possível copiar automaticamente. Por favor, selecione e copie manualmente.'));
        });
    });
}

function copyToClipboard(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(texto);
    }

    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            document.execCommand('copy');
            resolve();
        } catch (error) {
            reject(error);
        } finally {
            document.body.removeChild(textarea);
        }
    });
}

function animateCopyButton(button) {
    if (!button) return;
    if (!button.dataset.original) {
        button.dataset.original = button.innerHTML;
    }
    button.classList.add('copied');
    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = button.dataset.original;
    }, 1800);
}

function abrirMailto(nome, email, telefone, mensagem) {
    const assunto = encodeURIComponent(`Contato via portfólio - ${nome}`);
    const corpo = encodeURIComponent(montarCorpoEmail(nome, email, telefone, mensagem));
    window.location.href = `mailto:${EMAIL_DEFAULT_TO}?subject=${assunto}&body=${corpo}`;
}

function montarCorpoEmail(nome, email, telefone, mensagem) {
    return [
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        `Telefone: ${telefone || 'Não informado'}`,
        '',
        'Mensagem:',
        mensagem,
        '',
        '---',
        'Enviado via portfólio online.'
    ].join('\n');
}

function setLoadingState(button, isLoading) {
    if (!button) return;

    if (!button.dataset.defaultText) {
        button.dataset.defaultText = button.innerHTML;
    }

    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.defaultText || '<i class="fas fa-paper-plane"></i> Enviar';
    }
}

// ===================================
// EFEITOS ADICIONAIS
// ===================================

// CORREÇÃO 1: Efeito Parallax removido (comentado).
// Este script estava "brigando" com a animação CSS (@keyframes float)
// e causando lentidão (engasgos) em celulares.
/*
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.shape');
    
    heroShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
*/

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
    } else {
        // CORREÇÃO 2: Adicionado este 'else'.
        // Isso corrige o bug onde o menu ficava escondido
        // se o usuário rolasse de volta para o topo.
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Iniciar loading da página
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animar barras de progresso usando variáveis CSS
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.style.getPropertyValue('--level') || bar.dataset.level || '0%';
        bar.style.setProperty('--current-level', '0%');
        setTimeout(() => {
            bar.style.setProperty('--current-level', level);
        }, 150);
    });
});

// Log de boas-vindas no console
console.log('%c🚀 Portfólio de Antônio Bernabio Júnior', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c👨‍💻 Especialista em RPA & Automação', 'color: #06b6d4; font-size: 14px;');
console.log('%c💼 Desenvolvido com HTML5, CSS3 e JavaScript', 'color: #f59e0b; font-size: 12px;');
console.log('%c📧 antoniobernabiopereira@gmail.com', 'color: #10b981; font-size: 12px;');