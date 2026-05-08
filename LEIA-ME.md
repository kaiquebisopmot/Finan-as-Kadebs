# 💕 K&D Finanças — Guia Completo do Projeto

Olá, Kaique e Deborah! Este guia explica **tudo** sobre o projeto: como funciona, como hospedar e como personalizar.

---

## 📁 Estrutura de Arquivos

```
financas-casal/
├── index.html              ← Tela de login
├── css/
│   └── style.css           ← Estilos visuais compartilhados
├── js/
│   └── data.js             ← Toda a lógica de dados (salvar, ler, calcular)
└── pages/
    ├── dashboard.html      ← Visão geral / home
    ├── metas.html          ← Metas do casal
    ├── gastos.html         ← Registro de gastos
    └── config.html         ← Configurações e guia de hospedagem
```

---

## 🔐 Login e Senhas

O login é simples e protege o acesso ao painel. As credenciais ficam no arquivo `index.html`:

```javascript
const USERS = {
  kaique:  'minhasenha123',   // ← troque por uma senha real
  deborah: 'minhasenha123'    // ← troque por uma senha real
};
```

> ⚠️ **Importante:** Este login é básico (client-side). Serve para proteger o acesso casual. Para segurança avançada, integre Firebase Authentication.

---

## 🌐 Como Hospedar (Opção 1 — Netlify, mais fácil)

**Tempo estimado: 2 minutos. Grátis.**

1. Acesse **https://netlify.com/drop**
2. Arraste a pasta `financas-casal` inteira para a tela
3. Aguarde o upload (alguns segundos)
4. Você receberá um link como `https://abc123.netlify.app`
5. Crie uma conta gratuita no Netlify para:
   - Fixar o link permanente
   - Personalizar o nome (ex: `kd-financas.netlify.app`)
   - Re-publicar quando fizer mudanças

**Para atualizar o site depois:**
- Faça suas alterações nos arquivos
- Arraste a pasta novamente no Netlify
- O site é atualizado automaticamente

---

## 🌐 Como Hospedar (Opção 2 — GitHub Pages, mais permanente)

**Tempo estimado: 10 minutos. 100% grátis para sempre.**

1. Crie conta em **https://github.com**
2. Clique em "New repository" → nome: `kd-financas`
3. Marque como **Public** e crie
4. Faça upload de todos os arquivos da pasta `financas-casal`
5. Vá em **Settings → Pages**
6. Em "Source", selecione **main branch** e clique Save
7. Aguarde ~1 minuto e acesse: `https://SEU-USUARIO.github.io/kd-financas`

---

## 💾 Como os Dados São Salvos

Atualmente os dados usam o **localStorage** do navegador:

- ✅ Funciona offline
- ✅ Gratuito, sem servidor
- ⚠️ Dados ficam **separados por dispositivo/navegador**
- ⚠️ Limpar cache do navegador apaga os dados

### Para Dados Compartilhados entre os Dois (Evolução Futura)

Integre o **Firebase Firestore** (plano gratuito generoso):

1. Acesse **https://firebase.google.com** e crie um projeto
2. Ative o Firestore Database
3. No arquivo `js/data.js`, substitua as funções `load()` e `save()` para usar o SDK do Firebase
4. Os dados ficam na nuvem e ambos veem as mesmas informações em tempo real

---

## 🎨 Como Personalizar

### Trocar as cores principais
No arquivo `css/style.css`, no topo:
```css
--rose:  #F43F6E;  /* cor principal (rosa) */
--teal:  #00D4A1;  /* cor de renda/positivo (verde) */
--amber: #FFB830;  /* alertas e dicas */
--blue:  #4F8EF7;  /* saldo e informações */
```

### Adicionar novas categorias de gasto
No arquivo `js/data.js`, no objeto `CATS`:
```javascript
'Pets': { icon: 'fa-paw', cor: 'teal' },
'Academia': { icon: 'fa-dumbbell', cor: 'blue' },
```
E adicione a opção nos `<select>` dos arquivos `gastos.html` e do modal no `pages/gastos.html`.

### Alterar o nome do casal
Busque por `K&D Finanças` nos arquivos HTML e substitua pelo nome que quiserem.

---

## 🧩 Tecnologias Utilizadas

| Tecnologia | Para que serve | Custo |
|---|---|---|
| HTML5 | Estrutura das páginas | Grátis |
| CSS3 | Estilos e animações | Grátis |
| JavaScript (Vanilla) | Lógica e interatividade | Grátis |
| Chart.js | Gráficos | Grátis |
| Font Awesome 6 | Ícones | Grátis |
| Google Fonts (Sora) | Tipografia | Grátis |
| localStorage | Salvar dados no navegador | Grátis |
| Netlify / GitHub Pages | Hospedagem | Grátis |

**Custo total do projeto: R$ 0,00** 🎉

---

## 🚀 Próximas Evoluções Sugeridas

- [ ] **Firebase Realtime** — dados compartilhados entre os dois em tempo real
- [ ] **Histórico mensal** — visualizar meses anteriores
- [ ] **Exportar PDF** — relatório mensal bonito para imprimir
- [ ] **App mobile (PWA)** — instalar como app no celular
- [ ] **Notificações** — lembrete para lançar gastos ou checar metas
- [ ] **Integração bancária (Open Finance)** — importar extrato automaticamente

---

## ❓ Dúvidas Frequentes

**"Abri o site no celular da Deborah e os dados estão diferentes!"**
> Normal no estágio atual. O localStorage é por dispositivo. Solução: integrar Firebase (veja acima).

**"Esqueci a senha!"**
> Abra o arquivo `index.html` num editor de texto e veja/altere o objeto `USERS`.

**"Como faço backup dos dados?"**
> No console do navegador (F12), copie o conteúdo de `localStorage.getItem('kd_financas_v2')` e salve num arquivo .txt.

---

Feito com 💕 para o casal Kaique & Deborah
