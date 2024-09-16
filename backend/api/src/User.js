export class User {
  constructor(name = "visitante", isAuthenticated = false) {
    //se o nome não for fornecido, será 'visitante' por padrão. isAuthenticated também é false, por padrão.
    this.name = name;
    this.isAuthenticated = isAuthenticated;
    //true se o usuário estiver autenticado, false para visitantes
  }
}
