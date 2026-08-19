// De Felice Lab — EN / PT-BR language toggle.
// Elements opt in with data-i18n="key" (innerHTML swap) or
// data-i18n-attr-<attrname>="key" (attribute swap, e.g. data-i18n-attr-alt).
// Selected language persists in localStorage across index.html / study.html.
(function () {
  var STORAGE_KEY = 'defelicelab-lang';

  var translations = {
    en: {
      pageTitle: "De Felice Lab — From the whole body to the single gene",
      metaDescription: "De Felice Lab (Queen's University, Kingston) studies neurodegeneration across every scale: discovering what modifies the brain, measuring it non-invasively in blood, and proving causality at the gene.",
      navAriaLabel: "Primary",
      navResearch: "Research",
      navTeam: "Team",
      navPubs: "Publications",
      navStudies: "Studies",
      navContact: "Contact",
      navCta: 'Join our brain health study <span class="arrow" aria-hidden="true">→</span>',
      brandMarkAlt: "De Felice Lab circuit-brain mark",

      heroH1: "Shape the Future<br>of Neuroscience",
      heroLead: "We discover what modifies the brain, measure it non-invasively in blood, and prove causality at the gene. One research program spanning every scale of neurodegeneration.",
      heroCta1: 'See how the loop closes <span class="arrow" aria-hidden="true">→</span>',
      heroCta2: "Join our brain health study",

      cycleEyebrow: "The translational loop",
      cycleH2: "Most labs run one step. We run the whole sequence — and each step feeds the next.",
      cycleP: "Exercise reshapes the brain. That change shows up as a signal in the blood. Gene editing tells us whether the signal is the cause. Discover, measure, prove — a single closed program.",

      cycle1Tag: "Discover",
      cycle1H3: "Exercise &amp; the brain",
      cycle1P: "Our flagship line: how physical exercise remodels neuronal signalling and protects against neurodegeneration — the upstream cause we can actually move.",
      cycle1Foot: "Whole body → brain",

      cycle2Tag: "Measure",
      cycle2H3: "Plasma biomarkers",
      cycle2P: "We read that change without opening the skull — quantifying brain state from a blood draw, so the effect becomes a number you can track over time.",
      cycle2Foot: "Brain → blood",

      cycle3Tag: "Prove",
      cycle3H3: "CRISPR gene editing",
      cycle3P: "We edit the target gene to test causality directly — turning a correlation in the blood into a mechanism we can switch on and off at the source.",
      cycle3Foot: "Blood → gene",

      imagingAriaLabel: "Immunofluorescence imaging",
      imagingEyebrow: "Imaging the loop",
      imagingH2: "The evidence is visible — in the tissue itself.",
      imagingP: "Immunofluorescence over a dark field is our strongest asset. Cyan and magenta channels resolve where signalling changes, cell by cell — the same molecular events we then track in blood and edit at the gene.",
      imagingNote: "Placeholder — pending real lab microscopy (AVIF/WebP, explicit dimensions, real alt text).",

      pubsEyebrow: "Selected work",
      pubsH2: "Publications that carry the argument.",
      pubsAllLink: "All publications →",
      pubsLoading: "Loading publications from ORCID…",

      pubsPageTitle: "All Publications — De Felice Lab",
      pubsPageMetaDescription: "The complete, continuously updated list of peer-reviewed publications from the De Felice Lab, fetched from ORCID.",
      pubsBackLink: "← Back to Publications",
      pubsAllEyebrow: "Full record",
      pubsAllH2: "Every publication, in one place.",
      pubsAllP: "The complete, continuously updated list of the lab's peer-reviewed work.",

      fundingAriaLabel: "Funding",
      fundingEyebrow: "Funding",


      studyPageTitle: "Now Recruiting — De Felice Lab Brain Health Studies",
      studyMetaDescription: "Join a De Felice Lab brain health study in Kingston. We're recruiting adults to help us understand how exercise, blood biomarkers, and everyday health shape memory as we age.",
      navCtaStudy: 'Join our study <span class="arrow" aria-hidden="true">→</span>',

      studyHeroKicker: "Now recruiting · Kingston, ON",
      studyHeroH1: "Help us understand how the brain stays sharp.",
      studyHeroLead: "We're looking for volunteers to join our brain health studies. Each one is a piece of the same question — how exercise, blood, and everyday health shape memory as we age. Hover a study to see what it involves.",
      studyHeroCta1: 'See if you’re eligible <span class="arrow" aria-hidden="true">→</span>',
      studyHeroCta2: "About the research",
      studyTilesAriaLabel: "Studies now recruiting",

      studyTile1Tag: "Discover · Exercise",
      studyTile1Name: "Exercise &amp; Memory",
      studyTile1Intro: "A single 90-minute visit pairing light physical activity with short memory activities, measuring how movement changes brain performance. Adults 55+.",
      studyTile2Tag: "Measure · Biomarkers",
      studyTile2Name: "Blood &amp; Brain State",
      studyTile2Intro: "A simple blood draw lets us read brain-health signals without any scan. Your sample helps validate a test that could track memory changes years early.",
      studyTile3Tag: "Cohort · Longitudinal",
      studyTile3Name: "Healthy Aging Cohort",
      studyTile3Intro: "A once-a-year check-in over time, building a Kingston record of how lifestyle and cognition move together. Available in English and Portuguese.",

      applyEyebrow: "Now recruiting",
      applyH2: "Join our brain health study.",
      applyP: "We're looking for adults in the Kingston area to help us understand how exercise and everyday health shape memory as we age. Taking part is simple, and your time directly advances the research.",
      applyStep1: "A short visit at Botterell Hall — no cost to you",
      applyStep2: "A simple blood draw and memory activities",
      applyStep3: "Available in English and Portuguese",
      applyCtaContact: 'Contact the lab <span class="arrow" aria-hidden="true">→</span>',
      // Shown while the page is in English; switches to Portuguese on click.
      ctaLangSwitch: "Ver em português",

      studyCardTitle: "What to expect",
      factTimeLabel: "Time required",
      factTimeValue: "~90 minutes, once",
      factWhoLabel: "Who can join",
      factWhoValue: "Adults 55+",
      factWhereLabel: "Where",
      factLangLabel: "Languages",

      teamPageTitle: "Our Team — De Felice Lab",
      teamPageMetaDescription: "The people of the De Felice Lab — the principal investigator, research associates, postdoctoral fellows, and graduate and undergraduate students studying neurodegeneration across Canada and Brazil.",
      teamHeroKicker: "Our lab · Canada &amp; Brazil",
      teamHeroH1: "The people behind the work.",
      teamHeroLead: "Molecular biologists, bioinformaticians, clinicians and students spanning Kingston and Rio de Janeiro — each carrying one thread of the same question about how the brain ages.",

      piEyebrow: "Principal investigator",
      piPortraitNote: "Portrait placeholder",
      piRole: "Associate Professor · Queen's University — Centre for Neuroscience Studies, and the Departments of Biomedical &amp; Molecular Sciences and Psychiatry.",
      piBio: "Her work sits at the intersection of Alzheimer's disease and metabolism, with a focus on the links between Alzheimer's, diabetes and inflammation. She studies how hormones act in neurodegeneration and how insulin signalling breaks down in the Alzheimer's brain. Her finding that irisin — an exercise-linked hormone — protects against Alzheimer's has drawn wide interest from scientists and media around the world.",
      piEducationLabel: "Education",
      piAffiliationsLabel: "Affiliations",

      teamGroupAssociates: "Research associates",
      team1Role: "Research Associate",
      team1Focus: "Molecular mechanisms behind the beneficial effects of exercise on Alzheimer's disease.",
      team2Role: "Research Associate · IDOR, Rio de Janeiro",
      team2Focus: "Novel biomarkers of neurological conditions, including Alzheimer's and other dementias.",

      teamGroupAssistant: "Research assistant",
      team3Role: "Research Assistant",
      team3Focus: "PhD in Biological Sciences with expertise in pharmacology; works on extracellular vesicles, neurocovid and neurodegenerative pathologies (since 2021).",

      teamGroupPostdocs: "Postdoctoral fellows",
      team4Role: "Postdoctoral Fellow · UC Berkeley",
      team4Focus: "Molecular biologist and bioinformatician developing CRISPR-Cas epigenetic editors for Alzheimer's therapy.",
      team5Role: "Postdoctoral Fellow",
      team5Focus: "The impact of COVID-19 on the central nervous system and its possible connections to dementia.",
      team6Role: "Postdoctoral Fellow",
      team6Focus: "Brain health, digital biomarkers and machine learning.",

      teamGroupPhd: "PhD students",
      teamPhdRole: "PhD Student",
      team7Focus: "The role of exercise-linked irisin in Alzheimer's disease.",
      team8Focus: "Biochemical mechanisms of Alzheimer's and the impact of obesity on brain health.",
      team9Focus: "Extracellular vesicles from Alzheimer's disease models.",
      team10Focus: "COVID-19 biomarkers affecting the nervous system, studied using nanotechnology.",
      team11Role: "PhD Student · Coordinator, Molecular Biology",
      team11Focus: "Molecular diagnosis, neurobiology and stem cells, with interests in neuro research and sustainability.",

      teamGroupMasters: "Master's students",
      teamMastersRole: "Master's Student",
      team12Focus: "Isolating and characterising neuronal-derived extracellular vesicles from plasma.",
      team13Focus: "Characterising the cingulate cortex in non-human-primate Alzheimer's models.",

      teamGroupUndergrad: "Undergraduate students",
      teamUndergradRole: "Undergraduate Student",
      team14Focus: "Biochemical mechanisms linking obesity to memory and cognition.",
      team15Focus: "Measuring irisin protein concentration in patient samples.",
      team16Focus: "Extracellular vesicles and FNDC5/irisin in Alzheimer's mouse models.",
      team17Focus: "Therapeutic potential of mesenchymal-cell-derived extracellular vesicles.",

      teamPlaceholderNote: "Portrait placeholders — pending real team photos with descriptive alt text."
    },

    pt: {
      pageTitle: "De Felice Lab — Do corpo inteiro ao gene único",
      metaDescription: "O De Felice Lab (Queen's University, Kingston) estuda a neurodegeneração em todas as escalas: descobrindo o que modifica o cérebro, medindo isso de forma não invasiva no sangue e provando causalidade no gene.",
      navAriaLabel: "Principal",
      navResearch: "Pesquisa",
      navTeam: "Equipe",
      navPubs: "Publicações",
      navStudies: "Estudos",
      navContact: "Contato",
      navCta: 'Participe do nosso estudo de saúde cerebral <span class="arrow" aria-hidden="true">→</span>',
      brandMarkAlt: "Marca circuito-cérebro do De Felice Lab",

      heroH1: "Molde o Futuro<br>da Neurociência",
      heroLead: "Descobrimos o que modifica o cérebro, medimos isso de forma não invasiva no sangue e provamos causalidade no gene. Um único programa de pesquisa que percorre todas as escalas da neurodegeneração.",
      heroCta1: 'Veja como o ciclo se fecha <span class="arrow" aria-hidden="true">→</span>',
      heroCta2: "Participe do nosso estudo de saúde cerebral",

      cycleEyebrow: "O ciclo translacional",
      cycleH2: "A maioria dos laboratórios executa uma etapa. Nós executamos a sequência inteira — e cada etapa alimenta a próxima.",
      cycleP: "O exercício remodela o cérebro. Essa mudança aparece como um sinal no sangue. A edição gênica nos diz se o sinal é a causa. Descobrir, medir, provar — um único programa fechado.",

      cycle1Tag: "Descobrir",
      cycle1H3: "Exercício e o cérebro",
      cycle1P: "Nossa linha principal: como o exercício físico remodela a sinalização neuronal e protege contra a neurodegeneração — a causa a montante que de fato podemos modificar.",
      cycle1Foot: "Corpo inteiro → cérebro",

      cycle2Tag: "Medir",
      cycle2H3: "Biomarcadores plasmáticos",
      cycle2P: "Lemos essa mudança sem abrir o crânio — quantificando o estado do cérebro a partir de uma coleta de sangue, para que o efeito vire um número que dá para acompanhar ao longo do tempo.",
      cycle2Foot: "Cérebro → sangue",

      cycle3Tag: "Provar",
      cycle3H3: "Edição gênica com CRISPR",
      cycle3P: "Editamos o gene-alvo para testar a causalidade diretamente — transformando uma correlação no sangue em um mecanismo que podemos ligar e desligar na fonte.",
      cycle3Foot: "Sangue → gene",

      imagingAriaLabel: "Imagem de imunofluorescência",
      imagingEyebrow: "Visualizando o ciclo",
      imagingH2: "A evidência é visível — no próprio tecido.",
      imagingP: "A imunofluorescência em campo escuro é nosso maior recurso. Os canais ciano e magenta revelam onde a sinalização muda, célula a célula — os mesmos eventos moleculares que depois rastreamos no sangue e editamos no gene.",
      imagingNote: "Placeholder — aguardando microscopia real do laboratório (AVIF/WebP, dimensões explícitas, alt text real).",

      pubsEyebrow: "Trabalhos selecionados",
      pubsH2: "Publicações que sustentam o argumento.",
      pubsAllLink: "Todas as publicações →",
      pubsLoading: "Carregando publicações do ORCID…",

      pubsPageTitle: "Todas as Publicações — De Felice Lab",
      pubsPageMetaDescription: "A lista completa e continuamente atualizada das publicações revisadas por pares do De Felice Lab, buscada no ORCID.",
      pubsBackLink: "← Voltar para Publicações",
      pubsAllEyebrow: "Registro completo",
      pubsAllH2: "Todas as publicações, em um só lugar.",
      pubsAllP: "A lista completa e continuamente atualizada dos trabalhos revisados por pares do laboratório.",

      fundingAriaLabel: "Financiamento",
      fundingEyebrow: "Financiamento",


      studyPageTitle: "Recrutamento Aberto — Estudos de Saúde Cerebral do De Felice Lab",
      studyMetaDescription: "Participe de um estudo de saúde cerebral do De Felice Lab em Kingston. Estamos recrutando adultos para entender como o exercício, os biomarcadores no sangue e a saúde do dia a dia moldam a memória conforme envelhecemos.",
      navCtaStudy: 'Participe do nosso estudo <span class="arrow" aria-hidden="true">→</span>',

      studyHeroKicker: "Recrutamento aberto · Kingston, ON",
      studyHeroH1: "Ajude-nos a entender como o cérebro se mantém afiado.",
      studyHeroLead: "Estamos procurando voluntários para participar dos nossos estudos de saúde cerebral. Cada um é uma peça da mesma pergunta — como o exercício, o sangue e a saúde do dia a dia moldam a memória conforme envelhecemos. Passe o mouse sobre um estudo para ver o que ele envolve.",
      studyHeroCta1: 'Veja se você é elegível <span class="arrow" aria-hidden="true">→</span>',
      studyHeroCta2: "Sobre a pesquisa",
      studyTilesAriaLabel: "Estudos com recrutamento aberto",

      studyTile1Tag: "Descobrir · Exercício",
      studyTile1Name: "Exercício e Memória",
      studyTile1Intro: "Uma única visita de 90 minutos combinando atividade física leve com pequenas atividades de memória, medindo como o movimento muda o desempenho cerebral. Adultos 55+.",
      studyTile2Tag: "Medir · Biomarcadores",
      studyTile2Name: "Sangue e Estado Cerebral",
      studyTile2Intro: "Uma simples coleta de sangue nos permite ler sinais de saúde cerebral sem nenhum exame de imagem. Sua amostra ajuda a validar um teste que pode rastrear mudanças na memória anos antes.",
      studyTile3Tag: "Coorte · Longitudinal",
      studyTile3Name: "Coorte de Envelhecimento Saudável",
      studyTile3Intro: "Um acompanhamento anual ao longo do tempo, construindo um registro em Kingston de como estilo de vida e cognição se movem juntos. Disponível em inglês e português.",

      applyEyebrow: "Recrutamento aberto",
      applyH2: "Participe do nosso estudo de saúde cerebral.",
      applyP: "Estamos procurando adultos na região de Kingston para nos ajudar a entender como o exercício e a saúde do dia a dia moldam a memória conforme envelhecemos. Participar é simples, e seu tempo faz a pesquisa avançar diretamente.",
      applyStep1: "Uma breve visita ao Botterell Hall — sem custo para você",
      applyStep2: "Uma simples coleta de sangue e atividades de memória",
      applyStep3: "Disponível em inglês e português",
      applyCtaContact: 'Fale com o laboratório <span class="arrow" aria-hidden="true">→</span>',
      // Shown while the page is in Portuguese; switches to English on click.
      ctaLangSwitch: "View in English",

      studyCardTitle: "O que esperar",
      factTimeLabel: "Tempo necessário",
      factTimeValue: "~90 minutos, uma vez",
      factWhoLabel: "Quem pode participar",
      factWhoValue: "Adultos 55+",
      factWhereLabel: "Onde",
      factLangLabel: "Idiomas",

      teamPageTitle: "Nossa Equipe — De Felice Lab",
      teamPageMetaDescription: "As pessoas do De Felice Lab — a pesquisadora principal, associados de pesquisa, pós-doutorandos e estudantes de graduação e pós-graduação que estudam neurodegeneração no Canadá e no Brasil.",
      teamHeroKicker: "Nosso laboratório · Canadá e Brasil",
      teamHeroH1: "As pessoas por trás do trabalho.",
      teamHeroLead: "Biólogos moleculares, bioinformatas, clínicos e estudantes espalhados entre Kingston e o Rio de Janeiro — cada um carregando um fio da mesma pergunta sobre como o cérebro envelhece.",

      piEyebrow: "Pesquisadora principal",
      piPortraitNote: "Placeholder de retrato",
      piRole: "Professora Associada · Queen's University — Centre for Neuroscience Studies, e os Departamentos de Ciências Biomédicas e Moleculares e Psiquiatria.",
      piBio: "Seu trabalho está na interseção entre a doença de Alzheimer e o metabolismo, com foco nas ligações entre Alzheimer, diabetes e inflamação. Ela estuda como os hormônios atuam na neurodegeneração e como a sinalização de insulina se rompe no cérebro com Alzheimer. A descoberta de que a irisina — um hormônio ligado ao exercício — protege contra o Alzheimer despertou grande interesse de cientistas e da mídia ao redor do mundo.",
      piEducationLabel: "Formação",
      piAffiliationsLabel: "Afiliações",

      teamGroupAssociates: "Associados de pesquisa",
      team1Role: "Associada de Pesquisa",
      team1Focus: "Mecanismos moleculares por trás dos efeitos benéficos do exercício na doença de Alzheimer.",
      team2Role: "Associado de Pesquisa · IDOR, Rio de Janeiro",
      team2Focus: "Novos biomarcadores de condições neurológicas, incluindo Alzheimer e outras demências.",

      teamGroupAssistant: "Assistente de pesquisa",
      team3Role: "Assistente de Pesquisa",
      team3Focus: "Doutora em Ciências Biológicas com expertise em farmacologia; atua com vesículas extracelulares, neurocovid e patologias neurodegenerativas (desde 2021).",

      teamGroupPostdocs: "Pós-doutorandos",
      team4Role: "Pós-doutorando · UC Berkeley",
      team4Focus: "Biólogo molecular e bioinformata desenvolvendo editores epigenéticos CRISPR-Cas para terapia do Alzheimer.",
      team5Role: "Pós-doutoranda",
      team5Focus: "O impacto da COVID-19 no sistema nervoso central e suas possíveis conexões com demência.",
      team6Role: "Pós-doutorando",
      team6Focus: "Saúde cerebral, biomarcadores digitais e aprendizado de máquina.",

      teamGroupPhd: "Estudantes de doutorado",
      teamPhdRole: "Estudante de Doutorado",
      team7Focus: "O papel da irisina ligada ao exercício na doença de Alzheimer.",
      team8Focus: "Mecanismos bioquímicos do Alzheimer e o impacto da obesidade na saúde cerebral.",
      team9Focus: "Vesículas extracelulares em modelos da doença de Alzheimer.",
      team10Focus: "Biomarcadores da COVID-19 que afetam o sistema nervoso, estudados com nanotecnologia.",
      team11Role: "Estudante de Doutorado · Coordenador, Biologia Molecular",
      team11Focus: "Diagnóstico molecular, neurobiologia e células-tronco, com interesse em pesquisa neuro e sustentabilidade.",

      teamGroupMasters: "Estudantes de mestrado",
      teamMastersRole: "Estudante de Mestrado",
      team12Focus: "Isolamento e caracterização de vesículas extracelulares de origem neuronal no plasma.",
      team13Focus: "Caracterização do córtex cingulado em modelos de Alzheimer em primatas não humanos.",

      teamGroupUndergrad: "Estudantes de graduação",
      teamUndergradRole: "Estudante de Graduação",
      team14Focus: "Mecanismos bioquímicos que ligam a obesidade à memória e à cognição.",
      team15Focus: "Medição da concentração da proteína irisina em amostras de pacientes.",
      team16Focus: "Vesículas extracelulares e FNDC5/irisina em modelos murinos de Alzheimer.",
      team17Focus: "Potencial terapêutico de vesículas extracelulares derivadas de células mesenquimais.",

      teamPlaceholderNote: "Placeholders de retrato — aguardando fotos reais da equipe com texto alternativo descritivo."
    }
  };

  function getStoredLang() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'pt') return stored;
    } catch (e) {}
    return 'en';
  }

  function setStoredLang(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  var currentLang = 'en';

  function applyLanguage(lang) {
    if (lang !== 'en' && lang !== 'pt') lang = 'en';
    currentLang = lang;
    var dict = translations[lang];

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (dict[key] !== undefined) nodes[i].innerHTML = dict[key];
    }

    var attrNodes = document.querySelectorAll('*');
    for (var j = 0; j < attrNodes.length; j++) {
      var el = attrNodes[j];
      for (var k = 0; k < el.attributes.length; k++) {
        var attr = el.attributes[k];
        if (attr.name.indexOf('data-i18n-attr-') === 0) {
          var targetAttr = attr.name.slice('data-i18n-attr-'.length);
          var dictKey = attr.value;
          if (dict[dictKey] !== undefined) el.setAttribute(targetAttr, dict[dictKey]);
        }
      }
    }

    var toggleButtons = document.querySelectorAll('.lang-btn');
    for (var b = 0; b < toggleButtons.length; b++) {
      var isActive = toggleButtons[b].getAttribute('data-lang') === lang;
      toggleButtons[b].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    setStoredLang(lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(getStoredLang());

    document.addEventListener('click', function (e) {
      var toggleBtn = e.target.closest && e.target.closest('.lang-btn');
      if (toggleBtn) {
        applyLanguage(toggleBtn.getAttribute('data-lang'));
        return;
      }
      var switchCta = e.target.closest && e.target.closest('#lang-alt-cta');
      if (switchCta) {
        e.preventDefault();
        applyLanguage(currentLang === 'en' ? 'pt' : 'en');
      }
    });
  });
})();
