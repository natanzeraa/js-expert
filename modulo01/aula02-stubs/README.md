### O que são Stubs?

>**_Imagina que você tem uma API ou serviço que cobra por request..._**

Você precisa testar o seu código e bater nos endpoints desse serviço, quanto isso custaria para a empresa dependendo da escala?

É nesse cenário que entram os **Stubs**, que basicamente funcionam transformando ou substituindo comportamentos do sistema por objetos estáticos, onde você pode criar diferentes mocks para diferentes cenários.

---
Exemplo:

Imagina que você precisa bater numa API de consulta de CEP.

Várias partes do seu sistema precisam desse serviço ou então existem regras de negócio que dependem dos resultados dessa consulta.

Determinado dia a API sai do ar e todos os seus testes falham.

Nenhuma alteração será aprovada por conta dos resultados dos testes.

A equipe entra em pânico e todo o desenvolvimento fica na mão.


