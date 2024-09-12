import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";

Given("que eu sou um visitante do site", function () {
  this.isAuthenticated = false;
  //visitante (não está autenticado)
});

Given("que eu estou autenticado no site", function () {
  this.isAuthenticated = true;
  //usuário (autenticado)
});

When("eu acesso um fórum público", function () {
  this.forum = {
    isPublic: true,
    content: "Conteúdo do fórum público",
  };
  //visitante ou usuário acessa fórum público
});

When("eu acesso um fórum restrito", function () {
  this.forum = {
    isPublic: false,
    content: "Conteúdo do fórum restrito",
  };
  //visitante ou usuário acessa fórum restrito

  if (!this.isAuthenticated && !this.forum.isPublic) {
    this.redirectToLogin = true;
    //se não estiver autenticado, deve ser redirecionado
  } else {
    this.redirectToLogin = false;
  }
});

Then("eu devo visualizar o conteúdo do fórum", function () {
  if (!this.isAuthenticated) {
    assert.strictEqual(this.isAuthenticated, false);
    //this refere-se ao contexto atual (no caso do Cucumber, o "world"), onde isAuthenticated foi armazenado anteriormente. this.isAuthenticated está acessando uma variável que foi definida no contexto atual. No seu exemplo, this.isAuthenticated provavelmente armazena um valor booleano (true ou false), indicando se o usuário está autenticado ou não. false: O valor que estamos comparando. Queremos verificar se this.isAuthenticated é igual a false, o que significa que o usuário não está autenticado.
    assert.strictEqual(this.forum.isPublic, true);
    assert.strictEqual(this.forum.content, "Conteúdo do fórum público");
    //visitante (não autenticado) deve ver conteúdo público
  } else {
    assert.strictEqual(this.isAuthenticated, true);
    assert.strictEqual(this.forum.isPublic, false);
    assert.strictEqual(this.forum.content, "Conteúdo do fórum restrito");
    //usuário (autenticado) deve ver conteúdo restrito
  }
});

//Aqui, o this é usado para armazenar o estado do usuário e o estado do fórum, permitindo que esses valores sejam compartilhados entre os diferentes passos (Given, When, Then). No último passo, estamos usando assert para garantir que o comportamento esperado (o visitante vê o conteúdo) está correto.

Then("eu devo ser redirecionado para a página de login", function () {
  assert.strictEqual(this.redirectToLogin, true);
  //verificação de redirecionamento para login (somente para visitante - não autenticado)
});
