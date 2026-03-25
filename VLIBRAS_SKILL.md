# VLibras Widget — Skill Completa

> Suíte do governo brasileiro que traduz **Português → Libras** em tempo real.
> Docs oficiais: https://vlibras.gov.br/doc/widget/index.html

---

## 1. Integração com Página Web (HTML puro)

Inserir **antes do `</body>`**:

```html
<!-- Estrutura do widget -->
<div vw class="enabled">
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
</div>

<!-- Script do plugin (CDN gov.br — sem npm) -->
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>

<!-- Inicialização -->
<script>
  new window.VLibras.Widget('https://vlibras.gov.br/app');
</script>
```

---

## 2. Integração com React / Next.js / Vite (TSX)

```tsx
// Em App.tsx ou _app.tsx
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  script.onload = () => {
    new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
  };
  document.body.appendChild(script);
}, []);
```

```tsx
{/* JSX: atributos customizados precisam de "true" como valor */}
<div vw="true" className="enabled">
  <div vw-access-button="true" className="active"></div>
  <div vw-plugin-wrapper="true">
    <div className="vw-plugin-top-wrapper"></div>
  </div>
</div>
```

---

## 3. Funcionalidades do Widget

### 3.1 Tradução de Texto
- O usuário abre o widget clicando no **ícone flutuante** (lado direito da página).
- Ao passar o mouse sobre qualquer elemento de texto, ele é **realçado**.
- Clicando com o **botão esquerdo** sobre o texto realçado, a tradução em Libras inicia.

### 3.2 Reproduzir e Pausar
- Botão localizado no **canto inferior esquerdo** da janela do widget.
- Permite pausar ou continuar a animação em **qualquer momento**.
- **Auto-pause:** ao trocar de aba ou janela, a tradução pausa automaticamente e retoma quando o usuário voltar para a página.

### 3.3 Seleção de Velocidade
- Botão no **canto inferior direito** da janela do widget.
- Opções disponíveis: **x0.5 | x1 (padrão) | x2 | x3**

### 3.4 Opção de Legendas
- Botão **Balão de fala**, ao lado direito do botão de velocidade.
- Exibe legendas das palavras sendo traduzidas pelo avatar.
- Pode ser **habilitado ou desabilitado** com um clique.

### 3.5 Troca de Avatar
- O VLibras possui **2 avatares intérpretes:** `Ícaro` e `Hozana`.
- Botão com ícone do avatar no **canto superior esquerdo** da janela.
- O usuário pode alternar entre eles livremente.

### 3.6 Posição do Widget
- Por padrão o widget aparece no **lado direito** da página.
- Pode ser movido para o **lado esquerdo** via: `Menu (☰)` → `Posicionamento da Tela`.
- Clicando novamente em `Posicionamento da Tela` retorna à posição original.

### 3.7 Seleção de Região (Regionalismo)
- Permite escolher um **dicionário regional** de sinalizações em Libras.
- Acesso via: `Menu (☰)` → `Regionalismo` → selecionar região desejada.
- ⚠️ Se um sinal não existir no dicionário regional, o sistema busca automaticamente no **dicionário nacional (BR)**.

---

## 4. Mapa da Interface do Widget

```
┌─────────────────────────────┐
│ [Avatar] (canto sup. esq.)  │  ← Troca de Avatar
│                             │
│      Animação Libras        │
│                             │
│ [☰ Menu] (canto sup. esq.)  │  ← Posição da tela / Regionalismo
├─────────────────────────────┤
│ [▶/⏸] (inf. esq.)          │  ← Reproduzir/Pausar
│            [x1 ▾] [💬]     │  ← Velocidade / Legendas
└─────────────────────────────┘
```

---

## 5. Checklist de Integração

- [ ] Adicionar a `<div vw ...>` no HTML/JSX
- [ ] Carregar `vlibras-plugin.js` via CDN ou `createElement`
- [ ] Inicializar com `new window.VLibras.Widget('https://vlibras.gov.br/app')`
- [ ] Verificar que o botão flutuante aparece no canto direito da tela
- [ ] Testar tradução clicando em um elemento de texto

---

## 6. Observações Importantes

| Ponto | Detalhe |
|---|---|
| **Sem npm** | Carregado via CDN do governo — sem dependência de pacote |
| **Qualquer stack** | HTML, React, Vue, Angular, etc. |
| **Auto-pause** | Pausa ao trocar de aba, retoma ao voltar |
| **Fallback regional** | Sinais não encontrados na região usam o dicionário nacional BR |
| **Dois avatares** | Ícaro (masc.) e Hozana (fem.) |
| **Velocidade padrão** | x1 (opções: x0.5, x2, x3) |
