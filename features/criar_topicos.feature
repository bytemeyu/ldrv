Feature: Criar tópicos

Scenario: Um usuário autenticado cria um tópico em um fórum
    Given que um "usuário autenticado" está na "página inicial de um fórum"
    When ele clica em "criar tópico"
    And ele preenche as informações do tópico (título, conteúdo)
    And clica em "salvar"
    Then um tópico deve ser criado no fórum
    And o tópico deve estar visível na lista de tópicos do fórum