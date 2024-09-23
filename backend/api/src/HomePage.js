export class HomePage {
  constructor(type) {
    this.type = type;
    //o tipo da página inicial pode ser: de usuário, de fórum,
    this.content = `Conteúdo da página inicial de ${
      type === "de usuário" ? "de usuário" : "de fórum"
    }`;
  }
}
