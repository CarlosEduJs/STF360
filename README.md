# STF 360

> Profiles dos 11 ministros do Supremo Tribunal Federal — decisões, notícias e dados, num lugar só.

O STF toma decisões que afetam a vida de todo mundo, mas acompanhar o que cada ministro está fazendo é difícil. As informações existem, mas estão espalhadas em portais burocráticos, PDFs e notícias que exigem contexto para fazer sentido.

O **STF 360** resolve isso. É um site simples, rápido e sem viés editorial: você escolhe um ministro, vê as últimas decisões dele e as notícias mais recentes sobre ele — tudo com link para a fonte original. Sem interpretação, sem opinião, sem ruído.

---

## O que o projeto faz

Cada ministro tem um profile com duas abas:

**Últimas Decisões** — processos recentes relatados pelo ministro, com número do caso, tipo (HC, ADI, RE...), resultado e link direto para o portal de jurisprudência do STF.

**Últimas Notícias** — manchetes dos principais veículos sobre aquele ministro, com fonte e data. O site não escreve nada: só agrega o que já foi publicado.

Os dados básicos de cada ministro (quem indicou, data de posse, formação) ficam visíveis no topo do profile, para dar contexto a quem não é da área jurídica.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16.1.6 (App Router) |
| Estilo | TailwindCSS + shadcn/ui |
| Notícias | Google News RSS |
| Decisões | Portal de Jurisprudência do STF |
| Cache | ISR nativo do Next.js |
| Deploy | Vercel |

A escolha do Next.js com ISR é porque o conteúdo muda algumas vezes por dia, não a cada segundo. Com revalidação configurada por rota (1h para notícias, 24h para decisões), o site serve páginas estáticas na maior parte do tempo e só busca dados novos quando necessário. Isso mantém o projeto leve e sem custo de infraestrutura relevante.

---

## Estrutura do projeto

> todo: colocar a estrutura do projeto aqui

Os dados estáticos dos ministros (nome, foto, data de posse, quem indicou) vivem num JSON versionado no repositório. Esses dados mudam raramente — o próximo ministro a se aposentar compulsoriamente é Luiz Fux, em 2028 — então não faz sentido buscar isso dinamicamente.

---

## Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/carlosedujs/stf360.git
cd stf360

# Instale as dependências
bun install

# Rode o servidor de desenvolvimento
cd apps/web && bun run dev
```

O projeto sobe em `http://localhost:3000`. Durante o desenvolvimento, as API Routes usam dados mock (veja `/data/ministers.json`) para não depender de nenhuma API externa.

## Fontes de dados

**Notícias** — Google News RSS, sem autenticação, sem custo. A query é montada dinamicamente por ministro:

```
https://news.google.com/rss/search?q="NOME_MINISTRO"+STF&hl=pt-BR&gl=BR&ceid=BR:pt-419
```

**Decisões** — Portal de Jurisprudência do STF (`jurisprudencia.stf.jus.br`), que é público. A busca é feita por nome do relator.

**Dados básicos** — JSON curado manualmente no repositório, baseado nas informações oficiais do [portal do STF](https://portal.stf.jus.br/ostf/).

> **Nota sobre o Datajud/CNJ:** a API pública do CNJ não indexa o STF (apenas tribunais de instância como TJs e TRFs). Não adianta tentar — testamos e confirmamos que o índice não existe.

---

## Princípios editoriais

O STF 360 não tem opinião. Algumas decisões que aparecem aqui vão agradar você, outras não. O projeto não está do lado de ninguém.

As regras são simples:

- Só mostramos o que já foi publicado em fontes externas ou consta no portal oficial do STF.
- Não resumimos, não interpretamos, não pontuamos ministros.
- Todo item tem link para a fonte original. Se quiser saber mais, vai lá.

Isso não é neutralidade performática — é uma escolha deliberada para que o projeto seja útil para qualquer pessoa, independente de onde ela está no espectro político.

---

## Contribuindo

Pull requests são bem-vindos. Antes de abrir um PR grande, abre uma issue descrevendo o que você quer fazer — evita trabalho duplicado.

Algumas coisas que seriam úteis:

- Melhorar a integração com o portal de jurisprudência do STF (o endpoint ainda precisa de ajustes finos)
- Adicionar filtro por tipo de decisão na aba de decisões
- Melhorar a acessibilidade dos componentes de tab
- Testes de integração para as API Routes

Para bugs, abre uma issue com o máximo de contexto possível: URL, comportamento esperado, comportamento observado.

---

## Licença

[MIT](LICENSE). Use à vontade, mas mantenha os créditos e os links para as fontes originais dos dados.

---

*Dados oficiais do STF. Notícias via Google News. Nenhuma afiliação com o Supremo Tribunal Federal ou qualquer partido político.*
