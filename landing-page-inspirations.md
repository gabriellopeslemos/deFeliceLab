# Inspirações — landing pages de laboratórios e iniciativas de Alzheimer's/neurociência

Pesquisa feita em 2026-08-18 para orientar melhorias na landing page do De Felice Lab
(`index.html` / `study.html`). Levantamento via busca na web (WebSearch); não foi uma
auditoria visual pixel a pixel de cada site — os fatos citados (números, nomes de
features) vêm de buscas reais, cruzados com a arquitetura de informação conhecida
dessas instituições.

## As 10 referências

### Labs de pesquisa em geral

1. **Allen Institute for Brain Science** — https://alleninstitute.org/division/brain-science/
   - Organiza por "o que você pode fazer aqui" (explorar atlas, usar ferramentas, baixar
     dados) em vez de lista de publicações — navegação orientada a tarefa.
   - Ciência aberta como identidade central: dados/atlas gratuitos tratados como produto
     principal, não anexo.
   - *Ideia:* criar um ponto de entrada "Recursos" na navegação agregando materiais
     suplementares dos papers (dados, protocolos, código).

2. **Buck Institute for Research on Aging** — https://www.buckinstitute.org/
   - Grid de PIs com foto — forte humanização.
   - Página de ensaios clínicos separada da página de doação.
   - *Ideia:* adicionar seção "Equipe" com foto da PI e colaboradores-chave.

3. **Picower Institute for Learning and Memory, MIT** — https://picower.mit.edu/
   - Estrutura a pesquisa por escala biológica (genes → circuitos → comportamento →
     doença) — narrativa próxima ao "loop" Discover/Measure/Prove do De Felice Lab.
   - Feed de notícias do lab continuamente atualizado, sinalizando atividade viva.
   - *Ideia:* inserir uma faixa "Últimas do laboratório" entre o hero e o translational loop.

4. **Gladstone Institute of Neurological Disease** — https://gladstone.org/science/neurological-disease-institute
   - Barra "by the numbers" (labs, pessoas, publicações, citações) logo após a missão.
   - Framing por mecanismo com subprogramas em cards, parecido com o loop atual.
   - *Ideia:* barra de estatísticas compacta (anos ativos, artigos, citações, países
     Canadá–Brasil) perto da seção de financiadores.

5. **Knight Initiative for Brain Resilience, Stanford** — https://brainresilience.stanford.edu/
   - Marca a iniciativa em torno de uma tese única e memorável.
   - Credibilidade via liderança nomeada + conselho consultivo + colaboradores explícitos.
   - *Ideia:* transformar o loop numa "marca" mais explícita e listar colaboradores
     institucionais nomeados (IDOR, CNPq etc.), não só siglas.

6. **Stanley Center for Psychiatric Research, Broad Institute** — https://www.broadinstitute.org/stanley-center-for-psychiatric-research
   - Usa branding institucional "guarda-chuva" (MIT/Harvard) de forma visível, mantendo
     identidade própria do centro.
   - *Ideia:* dar mais presença visual ao vínculo com a Queen's University (brasão no
     header/footer, não só texto).

### Alzheimer's / neurociência

7. **Cure Alzheimer's Fund** — https://curealz.org/
   - Números grandes como prova social primária: $260M financiados, 300+ pesquisadores,
     1.340+ artigos peer-reviewed, 115.410 citações.
   - "Consórcios de Pesquisa" nomeados (Tau Consortium, APOE Consortium etc.).
   - *Ideia:* quantificar a produção do próprio lab e nomear frentes de pesquisa.

8. **Alzheimer's Research UK** — https://www.alzheimersresearchuk.org/
   - Trilhas de navegação separadas por público (doador/geral vs. "For researchers").
   - *Ideia:* diferenciar CTAs na navegação para participante de estudo, pesquisador e
     imprensa/financiador.

9. **Alzheimer's Association — TrialMatch** — https://trialmatch.alz.org/
   - Questionário curto de pré-triagem que casa o visitante com estudos por
     diagnóstico/localização, reduzindo fricção entre "ler" e "saber se sou elegível".
   - *Ideia:* substituir o CTA "See if you're eligible" (hoje leva a um formulário
     genérico) por uma pré-triagem inline de 3–5 perguntas.

10. **DIAN — Dominantly Inherited Alzheimer Network, WashU** — https://dian.wustl.edu/
    - Conteúdo centrado em família/participante, com "value exchange" explícito
      (o que o participante ganha ao se inscrever) e materiais multilíngues.
    - *Ideia:* explicitar o valor concreto para o participante em `study.html` e tornar
      o suporte EN/PT mais proeminente.

## Melhorias recomendadas para o De Felice Lab (priorizadas)

**Alta prioridade**
1. Bloco de estatísticas reais (anos ativos, publicações, citações, participantes
   recrutados) — hoje a seção de financiadores só tem wordmarks-placeholder.
2. Pré-triagem de elegibilidade em `study.html` antes do formulário de contato.
3. Ativar o link "All publications →" (`#pubs`), hoje aponta para `#`.
4. Separar trilhas de público na navegação (participante / pesquisador / imprensa).

**Média prioridade**
5. Seção "Equipe" com foto da PI e colaboradores.
6. 1–2 números-chave no hero, abaixo do headline.
7. Enriquecer o placeholder de imaging com legenda científica mais específica.
8. Reforçar o vínculo com a Queen's University no header/footer.
9. Explicitar o que o participante ganha em `study.html`.
10. Toggle EN/PT visível no header. **(implementado — ver `assets/i18n.js`)**

**Baixa prioridade**
11. Faixa "Últimas do laboratório" entre hero e translational loop.
12. Logos de financiadores clicáveis com alt text real.
13. Nomear consórcios/frentes de pesquisa (ex.: "Kingston Aging Cohort").
14. Footer com links reais (ORCID, Google Scholar, redes sociais).
15. Dropdown de assunto no formulário de contato (colaboração / imprensa / estudo).
