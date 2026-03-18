# Guia de Contribuição

Obrigado pelo seu interesse em contribuir para o **STF 360**! Este projeto é focado em transparência e facilidade de acesso a dados públicos, e toda ajuda é muito bem-vinda.

Ao contribuir para este repositório, por favor, tente seguir as diretrizes abaixo.

## Como contribuir?

### Reportando Bugs ou Sugestões
Para reportar um bug ou sugerir uma funcionalidade:
1. Verifique se a sua ideia ou bug já não foi relatado nas [Issues](https://github.com/carlosedujs/stf360/issues).
2. Se for algo novo, abra uma issue descrevendo o máximo possível: o que aconteceu, o que era esperado e como reproduzir (se houver um bug).

### Enviando Code Changes (Pull Requests)
Para alterações grandes, peço que você abra uma Issue primeiro para discutirmos a abordagem, evitando assim trabalho duplicado.

O processo básico para enviar um Pull Request:
1. Faça o **Fork** do repositório.
2. Crie uma branch para a sua alteração: `git checkout -b feat/minha-melhoria`.
3. Faça suas alterações.
4. Rode as ferramentas de lint e formatação:
   ```bash
   bun run lint
   bun run format
   ```
5. Faça o commit e o push para a sua branch.
6. Abra um Pull Request para a branch `main`.

## Áreas que precisam de ajuda
Atualmente, as seguintes frentes seriam de grande valor para o projeto:
- **Integração com o portal do STF**: Ajustes finos nos endpoints de busca de jurisprudência.
- **Filtros**: Adicionar filtros por tipo de decisão na aba de decisões.
- **Acessibilidade**: Melhorar a navegação teclado/leitor de tela nos componentes.
- **Testes**: Implementar testes de integração para as rotas da API.

## Padrões de Código
- Utilizamos **Next.js** com App Router.
- O projeto usa **Oxlint** para linting e **Oxfmt** para formatação (pelo Turborepo).
- Tentando sempre manter o código limpo, sem opiniões e focado na fonte dos dados.

## Licença
Ao contribuir, você concorda que seu código será licenciado sob a [Licença MIT](LICENSE) do projeto.
