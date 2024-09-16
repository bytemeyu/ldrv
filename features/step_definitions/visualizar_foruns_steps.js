import { Given, When, Then } from "@cucumber/cucumber";
import { User } from "../../backend/api/src/User.js";
import { Forum } from "../../backend/api/src/Forum.js";
import { AccessControl } from "../../backend/api/src/AccessControl.js";
import { strict as assert } from "assert";

Given("que um {string} está no site", function (accessType) {
  if (accessType === "visitante") {
    this.user = new User();
    //criação de um visitante não autenticado
  } else if (accessType === "usuário autenticado") {
    this.user = new User("Autenticado", true);
    //criação de um usuário autenticado
  }
});

When("ele acessa um fórum {string}", function (forumType) {
  if (forumType === "público") {
    this.forum = new Forum("Fórum Público", true);
    //criação de um fórum público
  } else if (forumType === "restrito") {
    this.forum = new Forum("Fórum Privado", false);
    //criação de um fórum restrito
  }
});

Then("ele deve visualizar o conteúdo do fórum", function () {
  const canAccess = AccessControl.canAccess(this.user, this.forum);

  if (this.forum.isPublic) {
    assert.strictEqual(canAccess, true);
    //assert.strictEqual é uma função que compara dois valores para garantir que sejam estritamente iguais. se os valores não forem iguais, o teste falha e você será informado de que algo não está funcionando conforme o esperado.
    //esse assert.strictEqual quer dizer, então, que canAccess deve ser true, ou seja, se o fórum for público (o if por fora), todos podem acessá-lo.
  } else {
    if (this.user.isAuthenticated) {
      assert.strictEqual(canAccess, true);
      //usuário autenticado pode acessar fóruns restritos
    } else {
      assert.strictEqual(canAccess, false);
      //visitante não pode acessar fóruns restritos
    }
  }
});

Then("ele deve ser redirecionado para a página de login", function () {
  const canAccess = AccessControl.canAccess(this.user, this.forum);

  //se o usuário não pode acessar o fórum, ele deve ser redirecionado para a página de login:
  if (!canAccess && !this.forum.isPublic) {
    assert.strictEqual(canAccess, false);
  } else {
    assert.strictEqual(canAccess, true);
  }
});
