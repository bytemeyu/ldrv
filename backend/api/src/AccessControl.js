export class AccessControl {
  static canAccess(user, forum) {
    if (forum.isPublic) {
      return true;
      //qualquer pessoa, autenticada ou não, pode acessar fóruns públicos
    } else if (user.isAuthenticated) {
      return true;
      //apenas usuários autenticados podem acessar fóruns restritos
    }
    return false;
    //visitantes não podem acessar fóruns restritos
  }
}
