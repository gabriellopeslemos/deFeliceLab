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
      navHome: "Home",
      navResearch: "Research",
      navTeam: "Team",
      navPubs: "Publications",
      navStudies: "Studies",
      navContact: "Contact",
      navCta: 'Join our brain health study <span class="arrow" aria-hidden="true">→</span>',
      brandMarkAlt: "De Felice Lab circuit-brain mark",

      heroH1: "Shape the Future<br>of Neuroscience",
      heroLead: "We investigate how physical exercise affects brain health at a molecular level, and how this knowledge can be applied to detect and prevent Alzheimer's disease earlier.",
      heroCta1: 'See our research approach <span class="arrow" aria-hidden="true">→</span>',
      heroCta2: "Join our brain health study",

      cycleEyebrow: "The translational loop",
      cycleH2: "How we investigate Alzheimer's disease.",
      cycleP: "We investigate how physical exercise affects the brain, translate that effect into blood-based biomarkers, and use gene editing to establish causality, building the evidence needed for earlier detection and prevention of Alzheimer's disease.",

      cycle1Tag: "Discover",
      cycle1H3: "Exerkines",
      cycle1P: "We investigate how exercise-released molecules, known as exerkines, influence brain health and protect against Alzheimer's disease, as well as their potential transport via extracellular vesicles.",
      cycle1Foot: "Whole body → brain",

      cycle2Tag: "Measure",
      cycle2H3: "Plasma biomarkers",
      cycle2P: "Through a simple blood sample, we can identify plasma biomarkers that may enable the early detection of Alzheimer's disease.",
      cycle2Foot: "Brain → blood",

      cycle3Tag: "Prove",
      cycle3H3: "CRISPR epigenome editing",
      cycle3P: "Using CRISPR-based epigenome editing, we can precisely regulate gene activity without altering the DNA sequence, exploring new therapeutic strategies for Alzheimer's disease.",
      cycle3Foot: "Blood → gene",

      imagingAriaLabel: "Immunofluorescence imaging",
      imagingEyebrow: "Imaging the loop",
      imagingH2: "What we do",
      imagingP: "Our mission is to improve lives by deepening our understanding of Alzheimer's disease, uncovering how physical exercise protects the brain, and identifying blood biomarkers that reveal the earliest signs of the disease. By advancing early detection and developing new treatment strategies, we aim for a future where aging does not mean losing our memory or cognitive abilities.",
      imagingNote: "Placeholder — pending real lab microscopy (AVIF/WebP, explicit dimensions, real alt text).",

      pubsEyebrow: "Selected work",
      pubsH2: "Featured Publications",
      pubsAllLink: "All publications →",
      pubsLoading: "Loading publications from ORCID…",

      pubsPageTitle: "All Publications — De Felice Lab",
      pubsPageMetaDescription: "The complete, continuously updated list of peer-reviewed publications from the De Felice Lab, fetched from ORCID.",
      pubsAllEyebrow: "Full record",
      pubsAllH2: "Every publication, in one place.",
      pubsAllP: "The complete, continuously updated list of the lab's peer-reviewed work.",

      pubsFiltersLegend: "Filter publications",
      pubsFilterYearLabel: "Year",
      pubsFilterAllYears: "All years",
      pubsFilterJournalLabel: "Journal",
      pubsFilterAllJournals: "All journals",
      pubsFilterTagLabel: "Topic",
      pubsFilterAllTags: "All topics",
      pubsFilterClear: "Clear filters",
      pubsResultsCountAll: "{n} publications",
      pubsResultsCountFiltered: "{n} of {total} publications",
      pubsEmptyFiltered: "No publications match these filters.",
      pubsError: "Could not load publications right now.",
      pubsErrorRetry: "Try again",
      pubsYearSrLabel: "Year:",
      pubsCitesSrLabel: "Citations:",
      pubsOpensNewTab: "Opens in a new tab.",

      fundingAriaLabel: "Funding",
      fundingEyebrow: "Funding",


      studyPageTitle: "Now Recruiting — De Felice Lab Brain Health Study",
      studyMetaDescription: "Join the De Felice Lab's brain health study in Kingston — a 12-month study using smartwatch monitoring, cognitive assessments, and biological samples to understand healthy cognitive aging.",
      navCtaStudy: 'Join our study <span class="arrow" aria-hidden="true">→</span>',

      studyHeroKicker: "Now recruiting · Kingston, ON",
      studyHeroH1: "Help advance brain health research",
      studyHeroLead: "Help us understand how everyday patterns such as sleep, physical activity, and general health relate to brain resilience and healthy aging.",
      studyHeroCta1: 'Join our study <span class="arrow" aria-hidden="true">→</span>',
      studyHeroCta2: "About the research",

      spotlightName: "Brain Health &amp; Smartwatch Tracking",
      spotlightIntro: "A 12-month study following adults in Kingston through smartwatch monitoring, cognitive assessments, and blood and saliva samples.",
      spotlightStat1Label: "Duration",
      spotlightStat1Value: "12 months",
      spotlightStat2Label: "Visits",
      spotlightStat2Value: "5 visits",
      spotlightStat3Label: "Age",
      spotlightStat3Value: "18+",

      applyEyebrow: "Now recruiting",
      applyH2: "Brain Health &amp; Smartwatch Tracking",
      applyP: "Participation lasts about 12 months, with follow-up visits every three months at our research site in Kingston, Ontario. Your participation can help researchers better understand the factors linked to healthy cognitive aging and support the development of more accessible ways to study brain health in the future.",
      applyCtaContact: 'Contact the study team <span class="arrow" aria-hidden="true">→</span>',

      studyCardTitle: "What to expect",
      factTimeLabel: "Time required",
      factTimeValue: "~12 months, 5 visits",
      factCompLabel: "Compensation",
      factCompValue: "$170 total, paid in installments",
      factWhoLabel: "Who can join",
      factWhoValue: "Any 18+, cognitively healthy",
      factWhereLabel: "Where",
      factWhereValue: "Kingston, Ontario",

      involvesEyebrow: "What participation involves",
      involvesH2: "What does participation involve?",
      involves1H3: "Study visits",
      involves1P: "Attend 5 study visits over 12 months at our research site in Kingston, Ontario.",
      involves2H3: "Smartwatch monitoring",
      involves2P: "Use a smartwatch during the study so we can measure patterns such as sleep, activity, and other health-related signals. We'll provide one if you don't have it, along with instructions and ongoing support across the study.",
      involves3H3: "Cognitive &amp; health assessments",
      involves3P: "Complete questionnaires and cognitive assessments to help us understand different aspects of health and daily functioning.",
      involves4H3: "Blood samples",
      involves4P: "Provide blood samples during study visits so researchers can examine biological markers related to brain health.",
      involves5H3: "Saliva samples",
      involves5P: "Provide saliva samples during study visits so researchers can examine biological markers related to brain health.",
      involves6H3: "Video-based eye tracking",
      involves6P: "Participate in video-based eye tracking sessions to help researchers understand visual attention and cognitive processes.",

      faqEyebrow: "Questions",
      faqH2: "Frequently asked questions.",
      faq0Q: "How do I know if I can join?",
      faq0A: "You may be eligible if you are 18 or older, live in or can travel to Kingston, Ontario, and are cognitively healthy, with no neurodegenerative or severe psychiatric conditions.",
      faq1Q: "Does participation cost anything?",
      faq1A: "No. There is no cost to participate in the study.",
      faq2Q: "Will my information be kept private?",
      faq2A: "Yes. Study data are handled confidentially and stored securely according to research ethics and institutional requirements.",
      faq3Q: "Do I need to be an expert in technology?",
      faq3A: "No. The study team will explain each step and help you with the smartwatch and study procedures.",
      faq4Q: "Can I ask questions before deciding?",
      faq4A: 'Yes. You can contact the study team at <a href="mailto:star.defelice@gmail.com">star.defelice@gmail.com</a>.',

      ethicsEyebrow: "Ethics approval",
      ethicsP1: "This study has received ethical approval from the Queen's University Health Sciences and Affiliated Teaching Hospitals Research Ethics Board (HSREB).",
      ethicsP2: 'For ethics concerns, please contact HSREB at 1-844-535-2988 (toll-free in North America) or email <a href="mailto:researchethics@queensu.ca">researchethics@queensu.ca</a>.',

      teamPageTitle: "Our Team — De Felice Lab",
      teamPageMetaDescription: "The people of the De Felice Lab — the principal investigator, research associates, postdoctoral fellows, and graduate and undergraduate students studying neurodegeneration across Canada and Brazil.",
      teamHeroKicker: "Our lab · Canada &amp; Brazil",
      teamHeroH1: "The people behind the work.",
      teamHeroLead: "Molecular biologists, bioinformaticians, clinicians and students spanning Kingston and Rio de Janeiro — each carrying one thread of the same question about how the brain ages.",

      piEyebrow: "Principal investigator",
      piPortraitNote: "Portrait placeholder",
      piBio: "Dr. De Felice's research explores the interface between Alzheimer's disease and metabolism, with pioneering work on hormone signaling, insulin resistance, and inflammation in the brain. Her studies, including recent findings on the exercise hormone irisin, have shaped the understanding of how lifestyle interventions, particularly physical exercise, can help preserve brain health and delay Alzheimer's disease.",
      piEducationLabel: "Education",
      piAffiliationsLabel: "Affiliations",
      piScholarLabel: "Google Scholar",
      piLattesLabel: "Lattes CV",

      teamGroupBiomarkers: "Biomarkers",
      teamGroupBiomarkersDesc: "Reading brain state from a blood draw, without imaging.",
      teamGroupExerkines: "Exerkines",
      teamGroupExerkinesDesc: "How movement remodels neuronal signalling and protects the brain.",
      teamGroupCrispr: "CRISPR",
      teamGroupCrisprDesc: "Editing the target gene to prove causality at the source.",
      teamGroupOther: "Other contributors",
      teamGroupOtherDesc: "Supporting the lab's work across projects and cores.",

      team1Role: "Research Associate",
      team1Focus: "Molecular mechanisms behind the beneficial effects of exercise on Alzheimer's disease.",
      team2Role: "Research Associate",
      team2Focus: "Novel biomarkers of neurological conditions, including Alzheimer's and other dementias.",

      team3Role: "Research Assistant (IDOR)",
      team3Focus: "PhD in Biological Sciences with expertise in pharmacology; works on extracellular vesicles, neurocovid and neurodegenerative pathologies (since 2021).",

      team4Role: "Postdoctoral Fellow",
      team4Focus: "Molecular biologist and bioinformatician developing CRISPR-Cas epigenetic editors for Alzheimer's therapy.",
      team5Role: "Postdoctoral Fellow",
      team5Focus: "The impact of COVID-19 on the central nervous system and its possible connections to dementia.",
      team6Role: "Postdoctoral Fellow",
      team6Focus: "Brain health, digital biomarkers and machine learning.",

      teamPhdRole: "PhD Student",
      team7Focus: "The role of exercise-linked irisin in Alzheimer's disease.",
      team8Focus: "Biochemical mechanisms of Alzheimer's and the impact of obesity on brain health.",
      team9Focus: "Extracellular vesicles from Alzheimer's disease models.",
      team10Focus: "COVID-19 biomarkers affecting the nervous system, studied using nanotechnology.",
      team11Role: "PhD Student · Coordinator, Molecular Biology",
      team11Focus: "Molecular diagnosis, neurobiology and stem cells, with interests in neuro research and sustainability.",

      teamMastersRole: "Master's Student",
      team12Focus: "Isolating and characterising neuronal-derived extracellular vesicles from plasma.",
      team13Focus: "Characterising the cingulate cortex in non-human-primate Alzheimer's models.",

      teamMemberRole: "Team member",

      teamUndergradRole: "Undergraduate Student",
      teamICRole: "Undergraduate Student",
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
      navHome: "Início",
      navResearch: "Pesquisa",
      navTeam: "Equipe",
      navPubs: "Publicações",
      navStudies: "Estudos",
      navContact: "Contato",
      navCta: 'Participe do nosso estudo de saúde cerebral <span class="arrow" aria-hidden="true">→</span>',
      brandMarkAlt: "Marca circuito-cérebro do De Felice Lab",

      heroH1: "Molde o Futuro<br>da Neurociência",
      heroLead: "Investigamos como o exercício físico afeta a saúde cerebral em nível molecular, e como esse conhecimento pode ser aplicado para detectar e prevenir a doença de Alzheimer mais precocemente.",
      heroCta1: 'Veja nossa abordagem de pesquisa <span class="arrow" aria-hidden="true">→</span>',
      heroCta2: "Participe do nosso estudo de saúde cerebral",

      cycleEyebrow: "O ciclo translacional",
      cycleH2: "Como investigamos a doença de Alzheimer.",
      cycleP: "Investigamos como o exercício físico afeta o cérebro, traduzimos esse efeito em biomarcadores sanguíneos e usamos edição gênica para estabelecer causalidade, construindo as evidências necessárias para a detecção precoce e a prevenção da doença de Alzheimer.",

      cycle1Tag: "Descobrir",
      cycle1H3: "Exerkines",
      cycle1P: "Investigamos como moléculas liberadas pelo exercício físico, conhecidas como exerkines, influenciam a saúde cerebral e protegem contra a doença de Alzheimer, além de seu possível transporte por vesículas extracelulares.",
      cycle1Foot: "Corpo inteiro → cérebro",

      cycle2Tag: "Medir",
      cycle2H3: "Biomarcadores plasmáticos",
      cycle2P: "Por meio de uma simples amostra de sangue, podemos identificar biomarcadores plasmáticos que possibilitam a detecção precoce da doença de Alzheimer.",
      cycle2Foot: "Cérebro → sangue",

      cycle3Tag: "Provar",
      cycle3H3: "Edição epigenômica com CRISPR",
      cycle3P: "Usando edição epigenômica baseada em CRISPR, podemos regular com precisão a atividade gênica sem alterar a sequência de DNA, explorando novas estratégias terapêuticas para a doença de Alzheimer.",
      cycle3Foot: "Sangue → gene",

      imagingAriaLabel: "Imagem de imunofluorescência",
      imagingEyebrow: "Visualizando o ciclo",
      imagingH2: "O que fazemos",
      imagingP: "Nossa missão é melhorar vidas aprofundando nossa compreensão sobre a doença de Alzheimer, desvendando como o exercício físico protege o cérebro e identificando biomarcadores sanguíneos que revelam os primeiros sinais da doença. Ao avançar na detecção precoce e no desenvolvimento de novas estratégias terapêuticas, buscamos um futuro em que envelhecer não signifique perder a memória ou as capacidades cognitivas.",
      imagingNote: "Placeholder — aguardando microscopia real do laboratório (AVIF/WebP, dimensões explícitas, alt text real).",

      pubsEyebrow: "Trabalhos selecionados",
      pubsH2: "Publicações que sustentam o argumento.",
      pubsAllLink: "Todas as publicações →",
      pubsLoading: "Carregando publicações do ORCID…",

      pubsPageTitle: "Todas as Publicações — De Felice Lab",
      pubsPageMetaDescription: "A lista completa e continuamente atualizada das publicações revisadas por pares do De Felice Lab, buscada no ORCID.",
      pubsAllEyebrow: "Registro completo",
      pubsAllH2: "Todas as publicações, em um só lugar.",
      pubsAllP: "A lista completa e continuamente atualizada dos trabalhos revisados por pares do laboratório.",

      pubsFiltersLegend: "Filtrar publicações",
      pubsFilterYearLabel: "Ano",
      pubsFilterAllYears: "Todos os anos",
      pubsFilterJournalLabel: "Periódico",
      pubsFilterAllJournals: "Todos os periódicos",
      pubsFilterTagLabel: "Tema",
      pubsFilterAllTags: "Todos os temas",
      pubsFilterClear: "Limpar filtros",
      pubsResultsCountAll: "{n} publicações",
      pubsResultsCountFiltered: "{n} de {total} publicações",
      pubsEmptyFiltered: "Nenhuma publicação corresponde a esses filtros.",
      pubsError: "Não foi possível carregar as publicações agora.",
      pubsErrorRetry: "Tentar novamente",
      pubsYearSrLabel: "Ano:",
      pubsCitesSrLabel: "Citações:",
      pubsOpensNewTab: "Abre em uma nova aba.",

      fundingAriaLabel: "Financiamento",
      fundingEyebrow: "Financiamento",


      studyPageTitle: "Recrutamento Aberto — Estudo de Saúde Cerebral do De Felice Lab",
      studyMetaDescription: "Participe do estudo de saúde cerebral do De Felice Lab em Kingston — um estudo de 12 meses que usa monitoramento por smartwatch, avaliações cognitivas e amostras biológicas para entender o envelhecimento cognitivo saudável.",
      navCtaStudy: 'Participe do nosso estudo <span class="arrow" aria-hidden="true">→</span>',

      studyHeroKicker: "Recrutamento aberto · Kingston, ON",
      studyHeroH1: "Ajude a avançar a pesquisa em saúde cerebral",
      studyHeroLead: "Ajude-nos a entender como padrões do dia a dia, como sono, atividade física e saúde geral, se relacionam com a resiliência cerebral e o envelhecimento saudável.",
      studyHeroCta1: 'Participe do nosso estudo <span class="arrow" aria-hidden="true">→</span>',
      studyHeroCta2: "Sobre a pesquisa",

      spotlightName: "Saúde Cerebral e Monitoramento por Smartwatch",
      spotlightIntro: "Um estudo de 12 meses que acompanha adultos em Kingston por meio de monitoramento por smartwatch, avaliações cognitivas e amostras de sangue e saliva.",
      spotlightStat1Label: "Duração",
      spotlightStat1Value: "12 meses",
      spotlightStat2Label: "Visitas",
      spotlightStat2Value: "5 visitas",
      spotlightStat3Label: "Idade",
      spotlightStat3Value: "18+",

      applyEyebrow: "Recrutamento aberto",
      applyH2: "Saúde Cerebral e Monitoramento por Smartwatch",
      applyP: "A participação dura cerca de 12 meses, com visitas de acompanhamento a cada três meses no nosso centro de pesquisa em Kingston, Ontario. Sua participação pode ajudar pesquisadores a entender melhor os fatores ligados ao envelhecimento cognitivo saudável e apoiar o desenvolvimento de formas mais acessíveis de estudar a saúde cerebral no futuro.",
      applyCtaContact: 'Fale com a equipe do estudo <span class="arrow" aria-hidden="true">→</span>',

      studyCardTitle: "O que esperar",
      factTimeLabel: "Tempo necessário",
      factTimeValue: "~12 meses, 5 visitas",
      factCompLabel: "Compensação",
      factCompValue: "$170 no total, pagos em parcelas",
      factWhoLabel: "Quem pode participar",
      factWhoValue: "Qualquer pessoa 18+, cognitivamente saudável",
      factWhereLabel: "Onde",
      factWhereValue: "Kingston, Ontario",

      involvesEyebrow: "O que a participação envolve",
      involvesH2: "O que a participação envolve?",
      involves1H3: "Visitas do estudo",
      involves1P: "Comparecer a 5 visitas do estudo ao longo de 12 meses no nosso centro de pesquisa em Kingston, Ontario.",
      involves2H3: "Monitoramento por smartwatch",
      involves2P: "Usar um smartwatch durante o estudo para que possamos medir padrões como sono, atividade e outros sinais relacionados à saúde. Fornecemos um aparelho caso você não tenha um, junto com instruções e suporte contínuo ao longo do estudo.",
      involves3H3: "Avaliações cognitivas e de saúde",
      involves3P: "Responder questionários e realizar avaliações cognitivas para nos ajudar a entender diferentes aspectos da saúde e do funcionamento diário.",
      involves4H3: "Amostras de sangue",
      involves4P: "Fornecer amostras de sangue durante as visitas do estudo para que os pesquisadores possam examinar marcadores biológicos relacionados à saúde cerebral.",
      involves5H3: "Amostras de saliva",
      involves5P: "Fornecer amostras de saliva durante as visitas do estudo para que os pesquisadores possam examinar marcadores biológicos relacionados à saúde cerebral.",
      involves6H3: "Rastreamento ocular em vídeo",
      involves6P: "Participar de sessões de rastreamento ocular baseado em vídeo para ajudar os pesquisadores a entender a atenção visual e os processos cognitivos.",

      faqEyebrow: "Perguntas",
      faqH2: "Perguntas frequentes.",
      faq0Q: "Como sei se posso participar?",
      faq0A: "Você pode ser elegível se tiver 18 anos ou mais, morar em Kingston, Ontario, ou puder viajar até lá, e for cognitivamente saudável, sem condições neurodegenerativas ou psiquiátricas graves.",
      faq1Q: "Participar tem algum custo?",
      faq1A: "Não. Não há custo para participar do estudo.",
      faq2Q: "Minhas informações serão mantidas privadas?",
      faq2A: "Sim. Os dados do estudo são tratados de forma confidencial e armazenados com segurança, de acordo com os requisitos de ética em pesquisa e institucionais.",
      faq3Q: "Preciso ser especialista em tecnologia?",
      faq3A: "Não. A equipe do estudo vai explicar cada etapa e ajudar você com o smartwatch e os procedimentos do estudo.",
      faq4Q: "Posso fazer perguntas antes de decidir?",
      faq4A: 'Sim. Você pode entrar em contato com a equipe do estudo pelo e-mail <a href="mailto:star.defelice@gmail.com">star.defelice@gmail.com</a>.',

      ethicsEyebrow: "Aprovação ética",
      ethicsP1: "Este estudo recebeu aprovação ética do Queen's University Health Sciences and Affiliated Teaching Hospitals Research Ethics Board (HSREB).",
      ethicsP2: 'Para questões de ética, entre em contato com o HSREB pelo telefone 1-844-535-2988 (gratuito na América do Norte) ou pelo e-mail <a href="mailto:researchethics@queensu.ca">researchethics@queensu.ca</a>.',

      teamPageTitle: "Nossa Equipe — De Felice Lab",
      teamPageMetaDescription: "As pessoas do De Felice Lab — a pesquisadora principal, associados de pesquisa, pós-doutorandos e estudantes de graduação e pós-graduação que estudam neurodegeneração no Canadá e no Brasil.",
      teamHeroKicker: "Nosso laboratório · Canadá e Brasil",
      teamHeroH1: "As pessoas por trás do trabalho.",
      teamHeroLead: "Biólogos moleculares, bioinformatas, clínicos e estudantes espalhados entre Kingston e o Rio de Janeiro — cada um carregando um fio da mesma pergunta sobre como o cérebro envelhece.",

      piEyebrow: "Pesquisadora principal",
      piPortraitNote: "Placeholder de retrato",
      piBio: "A pesquisa da Dra. De Felice explora a interface entre a doença de Alzheimer e o metabolismo, com contribuições pioneiras sobre sinalização hormonal, resistência à insulina e inflamação no cérebro. Seus estudos, incluindo achados recentes sobre a irisina, hormônio ligado ao exercício físico, têm ajudado a compreender como intervenções no estilo de vida, em particular o exercício físico, podem preservar a saúde cerebral e retardar a doença de Alzheimer.",
      piEducationLabel: "Formação",
      piAffiliationsLabel: "Afiliações",
      piScholarLabel: "Google Scholar",
      piLattesLabel: "Currículo Lattes",

      teamGroupBiomarkers: "Biomarcadores",
      teamGroupBiomarkersDesc: "Lendo o estado do cérebro a partir de uma coleta de sangue, sem imagem.",
      teamGroupExerkines: "Exercinas",
      teamGroupExerkinesDesc: "Como o movimento remodela a sinalização neuronal e protege o cérebro.",
      teamGroupCrispr: "CRISPR",
      teamGroupCrisprDesc: "Editando o gene-alvo para provar causalidade na fonte.",
      teamGroupOther: "Outros colaboradores",
      teamGroupOtherDesc: "Dando suporte ao trabalho do laboratório em projetos e núcleos diversos.",

      team1Role: "Associada de Pesquisa",
      team1Focus: "Mecanismos moleculares por trás dos efeitos benéficos do exercício na doença de Alzheimer.",
      team2Role: "Associado de Pesquisa",
      team2Focus: "Novos biomarcadores de condições neurológicas, incluindo Alzheimer e outras demências.",

      team3Role: "Assistente de Pesquisa (IDOR)",
      team3Focus: "Doutora em Ciências Biológicas com expertise em farmacologia; atua com vesículas extracelulares, neurocovid e patologias neurodegenerativas (desde 2021).",

      team4Role: "Pós-doutorando",
      team4Focus: "Biólogo molecular e bioinformata desenvolvendo editores epigenéticos CRISPR-Cas para terapia do Alzheimer.",
      team5Role: "Pós-doutoranda",
      team5Focus: "O impacto da COVID-19 no sistema nervoso central e suas possíveis conexões com demência.",
      team6Role: "Pós-doutorando",
      team6Focus: "Saúde cerebral, biomarcadores digitais e aprendizado de máquina.",

      teamPhdRole: "Estudante de Doutorado",
      team7Focus: "O papel da irisina ligada ao exercício na doença de Alzheimer.",
      team8Focus: "Mecanismos bioquímicos do Alzheimer e o impacto da obesidade na saúde cerebral.",
      team9Focus: "Vesículas extracelulares em modelos da doença de Alzheimer.",
      team10Focus: "Biomarcadores da COVID-19 que afetam o sistema nervoso, estudados com nanotecnologia.",
      team11Role: "Estudante de Doutorado · Coordenador, Biologia Molecular",
      team11Focus: "Diagnóstico molecular, neurobiologia e células-tronco, com interesse em pesquisa neuro e sustentabilidade.",

      teamMastersRole: "Estudante de Mestrado",
      team12Focus: "Isolamento e caracterização de vesículas extracelulares de origem neuronal no plasma.",
      team13Focus: "Caracterização do córtex cingulado em modelos de Alzheimer em primatas não humanos.",

      teamMemberRole: "Membro da equipe",

      teamUndergradRole: "Estudante de Graduação",
      teamICRole: "Estudante de Graduação (IC)",
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

  // Read-only access for other modules (e.g. pubs.js) that build UI text
  // dynamically and need the current dictionary instead of static data-i18n.
  window.deFeliceI18n = {
    t: function (key) { return translations[currentLang] ? translations[currentLang][key] : undefined; },
    lang: function () { return currentLang; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(getStoredLang());

    document.addEventListener('click', function (e) {
      var toggleBtn = e.target.closest && e.target.closest('.lang-btn');
      if (toggleBtn) {
        applyLanguage(toggleBtn.getAttribute('data-lang'));
      }
    });
  });
})();
