export interface authResponse {
  usuario?: Usuario;
  token?:   string;
  msg?: string;
}

export interface Usuario {
  rol?:    string;
  estado?: boolean;
  google?: boolean;
  nombre: string;
  correo?: string;
  uid:    string;
}

// {
//   "msg": "Usuario / Password no son correctos - password"
// }
