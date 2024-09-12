import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";

Given("que um {string} está no site", function (accessType) {
  if (accessType === "visitante") {
    this.isAuthenticated = false;
    //visitante (não está autenticado)
  } else if (accessType === "usuário autenticado") {
    this.isAuthenticated = true;
    //usuário (autenticado)
  }
});

When("ele acessa um fórum {string}", function (forumType) {
  if (forumType === "público") {
    this.forum = {
      isPublic: true,
      content: "Conteúdo do fórum público",
    };
    //visitante ou usuário acessa fórum público
  } else if (forumType === "restrito") {
    this.forum = {
      isPublic: false,
      content: "Conteúdo do fórum restrito",
    };
    //visitante ou usuário acessa fórum restrito

    if (!this.isAuthenticated && !this.forum.isPublic) {
      this.redirectToLogin = true;
      //se não estiver autenticado, deve ser redirecionado
    }
  }
});

Then("ele deve visualizar o conteúdo do fórum", function () {
  if (this.forum.isPublic) {
    assert.strictEqual(this.forum.content, "Conteúdo do fórum público");
    //visitante (não autenticado) e usuário autenticado deve ver conteúdo público
  } else {
    if (this.isAuthenticated) {
      assert.strictEqual(this.forum.content, "Conteúdo do fórum restrito");
      //usuário (autenticado) deve ver conteúdo restrito
    } else {
      assert.strictEqual(this.redirectToLogin, true);
    }
  }
});

Then("ele deve ser redirecionado para a página de login", function () {
  assert.strictEqual(this.redirectToLogin, true);
  //verificação de redirecionamento para login (somente para visitante - não autenticado)
});
