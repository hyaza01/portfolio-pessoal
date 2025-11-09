# 🎨 Guia de Personalização do Portfólio

Este guia ajudará você a personalizar o portfólio de acordo com suas preferências.

## 📝 Conteúdo

### 1. Informações Pessoais

**Arquivo: `index.html`**

Localize e edite as seguintes seções:

```html
<!-- Hero Section - Linhas 63-67 -->
<h1 class="hero-title">
    Seu Nome Completo<br>
    <span class="gradient-text">Sobrenome</span>
</h1>

<!-- Dados Pessoais - Linhas 47-52 -->
<li><strong>Data de Nascimento:</strong> Sua data</li>
<li><strong>Nacionalidade:</strong> Sua nacionalidade</li>
<li><strong>Estado Civil:</strong> Seu estado civil</li>
<li><strong>Endereço:</strong> Seu endereço</li>

<!-- Contatos - Linhas 54-58 -->
<p><strong>E-mail:</strong> <a href="mailto:seu@email.com">seu@email.com</a></p>
<p><strong>Telefone:</strong> <a href="tel:+5500000000000">(00) 0 0000-0000</a></p>
<p><strong>LinkedIn:</strong> <a href="url-linkedin">seu-perfil</a></p>
```

### 2. Competências e Habilidades

**Arquivo: `index.html` (Linhas 160-215)**

Edite os cards de competências:

```html
<div class="competencia-card">
    <div class="competencia-icon">
        <i class="fas fa-seu-icone"></i>
    </div>
    <h4>Título da Competência</h4>
    <p>Descrição detalhada da sua competência</p>
    <div class="skill-level">
        <!-- Altere o valor de --level para ajustar a barra (0-100%) -->
        <span class="level-bar" style="--level: 85%"></span>
    </div>
</div>
```

### 3. Formação Acadêmica

**Arquivo: `index.html` (Linhas 228-273)**

Adicione ou edite itens da timeline:

```html
<div class="timeline-item" data-aos="fade-up">
    <div class="timeline-marker">
        <i class="fas fa-graduation-cap"></i>
    </div>
    <div class="timeline-content">
        <span class="timeline-date"><i class="far fa-calendar"></i> Período</span>
        <h3>Nome do Curso</h3>
        <p class="timeline-instituicao">
            <i class="fas fa-university"></i> Instituição
        </p>
        <p class="timeline-description">
            Descrição do curso...
        </p>
        <div class="timeline-tags">
            <span class="tag"><i class="fas fa-code"></i> Tag 1</span>
            <span class="tag"><i class="fas fa-database"></i> Tag 2</span>
        </div>
    </div>
</div>
```

### 4. Experiências Profissionais

**Arquivo: `index.html` (Linhas 285-361)**

Adicione ou edite cards de experiência:

```html
<article class="exp-card" data-aos="fade-up">
    <div class="exp-header">
        <div class="exp-icon">
            <i class="fas fa-briefcase"></i>
        </div>
        <div class="exp-period">Mês Ano - Mês Ano</div>
    </div>
    <h3>Título do Cargo</h3>
    <p class="exp-empresa"><i class="fas fa-building"></i> Nome da Empresa</p>
    <p class="exp-description">
        Descrição das suas atividades e responsabilidades...
    </p>
    <div class="exp-tags">
        <span class="tag"><i class="fas fa-robot"></i> Tecnologia 1</span>
        <span class="tag"><i class="fas fa-code"></i> Tecnologia 2</span>
    </div>
</article>
```

### 5. Certificações

**Arquivo: `index.html` (Linhas 378-448)**

Adicione certificados:

```html
<div class="cert-card" data-aos="fade-up">
    <div class="cert-icon">
        <i class="fas fa-award"></i>
    </div>
    <h4>Nome do Certificado</h4>
    <p class="cert-emissor"><i class="fas fa-building"></i> Emissor</p>
    <p class="cert-data"><i class="far fa-calendar"></i> Mês Ano</p>
</div>
```

## 🎨 Cores e Estilos

### Alterar Paleta de Cores

**Arquivo: `css/style.css` (Linhas 6-26)**

```css
:root {
    /* Altere estas cores principais */
    --cor-primaria: #6366f1;        /* Cor principal */
    --cor-secundaria: #06b6d4;      /* Cor secundária */
    --cor-acento: #f59e0b;          /* Cor de destaque */
    
    /* Cores de fundo */
    --cor-fundo: #0f172a;           /* Fundo principal */
    --cor-cartao: #1e293b;          /* Fundo dos cards */
    
    /* Gradientes - use https://cssgradient.io/ para criar novos */
    --gradiente-principal: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
}
```

### Fontes Personalizadas

**Arquivo: `index.html` (Linha 12)**

```html
<!-- Altere as fontes usando Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@300;400;600&display=swap" rel="stylesheet">
```

**Arquivo: `css/style.css` (Linha 62)**

```css
body {
    font-family: 'SuaFonte', sans-serif;
}
```

### Tamanhos e Espaçamentos

**Arquivo: `css/style.css` (Linhas 28-32)**

```css
:root {
    --header-height: 80px;          /* Altura do header */
    --container-max: 1200px;        /* Largura máxima */
    --border-radius: 12px;          /* Raio de borda */
}
```

## 🖼️ Ícones

### Encontrar Novos Ícones

Visite [Font Awesome](https://fontawesome.com/icons) e busque ícones:

```html
<!-- Exemplos de ícones -->
<i class="fas fa-code"></i>           <!-- Código -->
<i class="fas fa-laptop"></i>         <!-- Laptop -->
<i class="fas fa-database"></i>       <!-- Banco de dados -->
<i class="fas fa-chart-line"></i>     <!-- Gráfico -->
<i class="fab fa-github"></i>         <!-- GitHub -->
<i class="fab fa-linkedin"></i>       <!-- LinkedIn -->
```

## 🔗 Links Sociais

**Arquivo: `index.html` (Linhas 93-107)**

```html
<div class="hero-social">
    <a href="URL-LINKEDIN" target="_blank">
        <i class="fab fa-linkedin-in"></i>
    </a>
    <a href="URL-GITHUB" target="_blank">
        <i class="fab fa-github"></i>
    </a>
    <a href="mailto:SEU-EMAIL">
        <i class="fas fa-envelope"></i>
    </a>
    <a href="tel:+55SEUNUMERO">
        <i class="fas fa-phone"></i>
    </a>
</div>
```

## 📱 Responsividade

### Breakpoints

**Arquivo: `css/style.css` (Linhas 955-1048)**

Ajuste os breakpoints se necessário:

```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Mobile pequeno */ }
```

## ⚙️ Funcionalidades JavaScript

### Desabilitar Animações

**Arquivo: `js/script.js` (Linhas 82-113)**

Comente ou remova a função `initScrollAnimations()`:

```javascript
// initScrollAnimations(); // Desabilitar animações
```

### Alterar Velocidade das Animações

**Arquivo: `css/style.css` (Linha 24)**

```css
:root {
    --transicao-rapida: all 0.2s ease;   /* Animação rápida */
    --transicao-normal: all 0.3s ease;   /* Animação normal */
    --transicao-lenta: all 0.5s ease;    /* Animação lenta */
}
```

## 📧 Integrar Formulário Real

Para integrar um backend real, edite:

**Arquivo: `js/script.js` (Linhas 305-337)**

```javascript
function enviarFormulario(nome, email, telefone, mensagem) {
    // Substituir por chamada real de API
    fetch('https://sua-api.com/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, telefone, mensagem })
    })
    .then(response => response.json())
    .then(data => {
        exibirSucesso('Mensagem enviada com sucesso!');
        form.reset();
    })
    .catch(error => {
        exibirErro('Erro ao enviar mensagem. Tente novamente.');
    });
}
```

### Serviços de Formulário Recomendados

- **Formspree**: https://formspree.io/
- **EmailJS**: https://www.emailjs.com/
- **Web3Forms**: https://web3forms.com/

## 🚀 Deploy

### Opções de Hospedagem Gratuita

1. **GitHub Pages**
   - Faça push do código para o GitHub
   - Ative GitHub Pages nas configurações
   - Acesse via `usuario.github.io/repositorio`

2. **Netlify**
   - Arraste a pasta do projeto
   - Deploy automático
   - Domínio customizado grátis

3. **Vercel**
   - Conecte com GitHub
   - Deploy automático
   - Performance otimizada

## 💡 Dicas Extras

### SEO

Edite as meta tags no `<head>`:

```html
<meta name="description" content="Sua descrição aqui">
<meta name="keywords" content="suas, palavras, chave">
<meta name="author" content="Seu Nome">
```

### Analytics

Adicione antes de `</body>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=SEU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'SEU-ID');
</script>
```

### Favicon

Adicione no `<head>`:

```html
<link rel="icon" type="image/png" href="favicon.png">
```

## 🆘 Suporte

Se tiver dúvidas ou problemas:

1. Consulte a documentação completa no `README.md`
2. Verifique os comentários no código
3. Entre em contato: antoniobernabiopereira@gmail.com

---

**Boa sorte com seu portfólio! 🚀**
