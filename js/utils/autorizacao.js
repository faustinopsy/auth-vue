export function Autenticado() {
    return localStorage.getItem('token') !== null;
  }
  
  export function buscaToken() {
    return localStorage.getItem('token');
  }
  
  export function buscaPerfil() {
    const token = buscaToken();
    if (!token) return null;
  
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  
  export function Autorizacao() {
    const userInfo = buscaPerfil();
    return userInfo ? userInfo.perfil : null;
  }
  
  export function logout() {
    localStorage.removeItem('token');
  }
  