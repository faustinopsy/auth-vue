import Login from './components/Login.js';
import Register from './components/Register.js';
import Listar from './components/Listar.js';
import Inserir from './components/Inserir.js';
import Admin from './components/Admin.js';
import { Autenticado, Autorizacao } from './utils/autorizacao.js';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/listar',
    component: Listar,
    meta: { requerAutenticacao: true, roles: ['listar', 'admin'] },
  },
  {
    path: '/inserir',
    component: Inserir,
    meta: { requerAutenticacao: true, roles: ['inserir', 'admin'] },
  },
  {
    path: '/admin',
    component: Admin,
    meta: { requerAutenticacao: true, roles: ['admin'] },
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const requerAutenticacao = to.meta.requiresAuth;
  const autorizacoes = to.meta.roles;
  const isAuth = Autenticado();
  const userRole = Autorizacao();

  if (requerAutenticacao && !isAuth) {
    next('/login');
  } else if (requerAutenticacao && !autorizacoes.includes(userRole)) {
    alert('Acesso negado!');
    next(false);
  } else {
    next();
  }
});

export default router;
