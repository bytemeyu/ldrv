Feature: Visualizar fóruns

Scenario: Visitante acessa um fórum aberto
    Given que eu sou um visitante do site
    When eu acesso um fórum público
    Then eu devo visualizar o conteúdo do fórum

Scenario: Visitante tenta acessar um fórum fechado
    Given que eu sou um visitante do site
    When eu tento acessar um fórum restrito
    Then eu devo ser redirecionado para a página de login

Scenario: Usuário autenticado acessa um fórum fechado
    Given que eu estou autenticado no site
    When eu acesso um fórum restrito
    Then eu devo visualizar o conteúdo do fórum