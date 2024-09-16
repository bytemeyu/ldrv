export class Forum {
  constructor(name, isPublic) {
    this.name = name;
    //o nome do fórum pode ser qualquer valor, pois o que importa é a sua natureza (definida abaixo).
    this.isPublic = isPublic;
    //true para fóruns públicos, false para fóruns restritos
    this.content = `Conteúdo do fórum ${isPublic ? "público" : "restrito"}`;
  }
}
