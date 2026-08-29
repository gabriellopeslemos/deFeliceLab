# SEO — pendências

Itens levantados na auditoria de SEO que **ainda não foram aplicados**. Os itens já
entregues (pré-render das publicações, versão PT-BR em `/pt/`, `h1` na página de
publicações, meta descriptions encurtadas e URLs limpas) estão documentados no
`readme.md`.

## Bloqueador transversal: confirmar o domínio de produção

`scripts/build_site.py` assume `BASE_URL = "https://defelicelab.com"` — usado hoje só
nas anotações `hreflang` e nos stubs de redirect. **Confirmar apex vs. `www` e o host**
antes de aplicar canônicas e sitemap, porque os três precisam da mesma origem. Se o
domínio for outro, é uma linha em `build_site.py` e um rebuild.

Vale confirmar também que o site é servido na **raiz do domínio**: todos os caminhos de
asset e de navegação são absolutos a partir da raiz (`/assets/...`, `/study/`). Em um
subdiretório (ex.: `usuario.github.io/repo/`) eles quebram.

---

## Alta

### 1. Open Graph e Twitter Cards

Nenhuma das 8 páginas geradas tem `og:title`, `og:description`, `og:image`, `og:url`,
`og:type`, `og:locale` ou `twitter:card`. Links compartilhados no LinkedIn, X, WhatsApp
e Slack aparecem sem imagem e sem título formatado — crítico para a divulgação do
recrutamento do estudo.

Precisa de:

- uma imagem 1200x630 (não existe nenhuma no repo — `logoSemTexto.webp` é a marca de
  38px, não serve);
- geração no `build_site.py`, por página e por idioma, reaproveitando as chaves de
  título/descrição que já existem em `scripts/i18n.json`;
- `og:locale` = `en_US` / `pt_BR` e `og:locale:alternate` recíproco.

### 2. URLs canônicas

Nenhuma página tem `<link rel="canonical">`. Sem isso há risco de duplicação por
`/` vs. `/index.html`, apex vs. `www` e, se houver GitHub Pages com domínio próprio,
`usuario.github.io` vs. o domínio.

A canônica de cada página é `BASE_URL + page_path(slug, lang)` — a mesma função que o
`build_site.py` já usa para o `hreflang`, então é uma linha de injeção no build.

### 3. `robots.txt` e `sitemap.xml`

Nenhum dos dois existe. O sitemap deve listar as 8 URLs (4 EN + 4 PT) com
`<xhtml:link rel="alternate" hreflang="...">` em cada entrada, e **não** deve incluir os
stubs `.html` de redirect. Os dois podem ser gerados pelo `build_site.py`, que já conhece
`PAGES` e `LANGS`.

## Média

### 4. Dados estruturados (JSON-LD)

Nenhuma página tem JSON-LD. Para um site de pesquisa o retorno é alto:

- `index` — `ResearchOrganization` (nome, logo, email, `sameAs` do Instagram);
- `team` — `Person` da PI, com `sameAs` do Google Scholar e do Lattes que já estão
  linkados na página;
- `study` — `MedicalStudy` ou `ResearchProject` (habilita rich results de recrutamento);
- `publications` — `ItemList` de `ScholarlyArticle`, gerado a partir do
  `assets/publications.json` que o build já carrega (DOI, título, journal, ano, autores).

### 5. Favicon e ícones

Nenhum `<link rel="icon">`, nenhum `apple-touch-icon`, nenhum `theme-color`. O navegador
pede `/favicon.ico` e recebe 404. Já existem `assets/logoSemTexto.webp` e
`assets/logosDeFeliceLab/logoVetor.svg` para derivar os ícones.

## Baixa

### 6. Assets pesados não utilizados

Não são servidos (nenhum HTML/CSS/JS os referencia), então não afetam SEO diretamente,
mas somam ~13 MB de repositório morto:

- `assets/img/heroBackground.gif` — 6,5 MB
- `assets/logosDeFeliceLab/3.png`, `4.png`, `6.png` — 1,7 MB cada
- `Logos Defelice lab.png` e `Logos Defelice lab horizontal.png` na raiz — ~1,5 MB cada

### 7. `assets/support.js`

Não é referenciado por nenhuma página. Remover ou passar a usar.
