Feature: Criar fóruns

Scenario: Um usuário autenticado cria um fórum público
    Given que um usuário autenticado está na página inicial "de usuário"
    When ele clica em "criar fórum público"
    And ele preenche as informações obrigatórias do fórum (nome, descrição)
    And clica em "salvar"
    Then um fórum "público" deve ser criado
    And o fórum deve estar visível na lista de fóruns públicos

Scenario: Um usuário autenticado cria um fórum restrito
    Given que um "usuário autenticado" está na "página inicial do usuário"
    When ele clica em "criar fórum restrito"
    And ele preenche as informações obrigatórias do fórum (nome, descrição)
    And clica em "salvar"
    Then um fórum "restrito" deve ser criado
    And o fórum deve estar visível apenas para os usuários autenticados

