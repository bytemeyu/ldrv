Feature: Visualizar fóruns

Scenario: Um visitante acessa um fórum público
    Given que um "visitante" está no site
    When ele acessa um fórum "público"
    Then ele deve visualizar o conteúdo do fórum

Scenario: Um visitante tenta acessar um fórum restrito
    Given que um "visitante" está no site
    When ele acessa um fórum "restrito"
    Then ele deve ser redirecionado para a página de login

Scenario: Um usuário autenticado acessa um fórum restrito
    Given que um "usuário autenticado" está no site
    When ele acessa um fórum "restrito"
    Then ele deve visualizar o conteúdo do fórum

Scenario: Um usuário autenticado acessa um fórum público
    Given que um "usuário autenticado" está no site
    When ele acessa um fórum "público"
    Then ele deve visualizar o conteúdo do fórum