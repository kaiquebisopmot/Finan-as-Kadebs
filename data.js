// =====================================================
//  KD Finanças — Módulo de Dados (localStorage)
//  Todos os dados são salvos no navegador via localStorage
//  para que ambos os usuários vejam o mesmo estado.
//  Para uso real em equipe, substitua por Firebase/Supabase.
// =====================================================

const KD = (() => {
  const KEY = 'kd_financas_v2';

  const DEFAULT = {
    renda: { kaique: 6000, deborah: 5000 },
    transactions: [
      { id: 1, desc: 'Aluguel', val: 2200, cat: 'Moradia',     quem: 'Casal',   date: today() },
      { id: 2, desc: 'Mercado', val: 680,  cat: 'Alimentação', quem: 'Deborah', date: today() },
      { id: 3, desc: 'Uber',    val: 120,  cat: 'Transporte',  quem: 'Kaique',  date: today() },
      { id: 4, desc: 'Farmácia',val: 95,   cat: 'Saúde',       quem: 'Deborah', date: today() },
      { id: 5, desc: 'Cinema',  val: 60,   cat: 'Lazer',       quem: 'Casal',   date: today() },
    ],
    goals: [
      { id: 1, nome: 'Casa Própria',  icon: 'fa-house',  cor: 'rose',  total: 500000, atual: 42000, prazo: '2030-06', mensal: 3000 },
      { id: 2, nome: 'Viagem Europa', icon: 'fa-plane',  cor: 'blue',  total: 25000,  atual: 8500,  prazo: '2026-12', mensal: 800  },
      { id: 3, nome: 'Carro Novo',    icon: 'fa-car',    cor: 'teal',  total: 80000,  atual: 12000, prazo: '2028-06', mensal: 1200 },
    ],
    nextId: 10,
  };

  function today() {
    return new Date().toISOString().split('T')[0];
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT));
    } catch { return JSON.parse(JSON.stringify(DEFAULT)); }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function get() { return load(); }

  function addTransaction(tx) {
    const data = load();
    data.transactions.push({ ...tx, id: data.nextId++, date: today() });
    save(data);
  }

  function removeTransaction(id) {
    const data = load();
    data.transactions = data.transactions.filter(t => t.id !== id);
    save(data);
  }

  function addGoal(goal) {
    const data = load();
    data.goals.push({ ...goal, id: data.nextId++ });
    save(data);
  }

  function updateGoal(id, patch) {
    const data = load();
    const g = data.goals.find(g => g.id === id);
    if (g) Object.assign(g, patch);
    save(data);
  }

  function removeGoal(id) {
    const data = load();
    data.goals = data.goals.filter(g => g.id !== id);
    save(data);
  }

  function updateRenda(kaique, deborah) {
    const data = load();
    data.renda = { kaique: parseFloat(kaique) || 0, deborah: parseFloat(deborah) || 0 };
    save(data);
  }

  // Calcula quanto precisa poupar por mês para cada meta
  function calcMensalNecessario(goal) {
    if (!goal.prazo) return 0;
    const prazo = new Date(goal.prazo + '-01');
    const now = new Date();
    const months = Math.max(1,
      (prazo.getFullYear() - now.getFullYear()) * 12 + (prazo.getMonth() - now.getMonth())
    );
    const falta = Math.max(0, goal.total - goal.atual);
    return Math.ceil(falta / months);
  }

  function calcStats() {
    const data = load();
    const renda = data.renda.kaique + data.renda.deborah;
    const gastos = data.transactions.reduce((a, t) => a + t.val, 0);
    const guardado = data.goals.reduce((a, g) => a + g.atual, 0);
    const saldo = renda - gastos;
    return { renda, gastos, saldo, guardado, ...data.renda };
  }

  // Categorias com ícone e cor
  const CATS = {
    'Moradia':     { icon: 'fa-house',        cor: 'rose'   },
    'Alimentação': { icon: 'fa-basket-shopping', cor: 'teal' },
    'Transporte':  { icon: 'fa-car',           cor: 'amber'  },
    'Saúde':       { icon: 'fa-heart-pulse',   cor: 'rose'   },
    'Lazer':       { icon: 'fa-ticket',        cor: 'blue'   },
    'Educação':    { icon: 'fa-graduation-cap', cor: 'blue'  },
    'Roupas':      { icon: 'fa-shirt',         cor: 'amber'  },
    'Outros':      { icon: 'fa-ellipsis',      cor: 'purple' },
  };

  const COLORS = {
    rose:   { bg: 'rgba(244,63,110,0.15)',  fg: '#F43F6E',  hex: '#F43F6E' },
    teal:   { bg: 'rgba(0,212,161,0.15)',   fg: '#00D4A1',  hex: '#00D4A1' },
    amber:  { bg: 'rgba(255,184,48,0.15)',  fg: '#FFB830',  hex: '#FFB830' },
    blue:   { bg: 'rgba(79,142,247,0.15)',  fg: '#4F8EF7',  hex: '#4F8EF7' },
    purple: { bg: 'rgba(168,85,247,0.15)',  fg: '#A855F7',  hex: '#A855F7' },
  };

  function fmtMoney(n) {
    return 'R$\u00a0' + Math.round(n).toLocaleString('pt-BR');
  }

  function fmtMonthYear(ym) {
    if (!ym) return '—';
    const [y, m] = ym.split('-');
    const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    return months[parseInt(m) - 1] + ' ' + y;
  }

  return { get, save, load, addTransaction, removeTransaction, addGoal, updateGoal, removeGoal,
           updateRenda, calcMensalNecessario, calcStats, CATS, COLORS, fmtMoney, fmtMonthYear };
})();

// Auth guard — redirect to login if not authenticated
function requireAuth() {
  if (!sessionStorage.getItem('kd_user')) {
    window.location.href = '../index.html';
  }
  return sessionStorage.getItem('kd_user');
}

function logout() {
  sessionStorage.removeItem('kd_user');
  window.location.href = '../index.html';
}
