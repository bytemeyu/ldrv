import { Given, When, Then } from "@cucumber/cucumber";
import { HomePage } from "../../backend/api/src/HomePage";
import { Forum } from "../../backend/api/src/Forum";
import { strict as assert } from "assert";

Given(
  "que um usuário autenticado está na página inicial {string}",
  function (initialPageType) {
    this.user = new User("Autenticado", true);
    //criação de um usuário autenticado

    if (initialPageType === "de usuário") {
      this.initialPage = new HomePage(initialPageType);
      //criação de uma página inicial de usuário
    }
  }
);

When("ele clica em {string}", function (buttonType) {
  if (buttonType === "criar fórum público") {
    this.forum = new Forum("Fórum Público", true);
    //criação de um fórum público
  } else if (buttonType === "criar fórum restrito") {
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
