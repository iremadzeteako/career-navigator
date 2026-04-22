/* ═══════════════════════════════════════════════════════════
   career-navigator / js / app.js  — v2
   ახალი: 40 პროფესია | მოთხოვნადობა | ანაზღაურება | AI რისკი
   ═══════════════════════════════════════════════════════════ */

const state = {
  firstName: '',
  lastName:  '',
  selected:  new Set(),
  activeCategory: 'all',
};

/* ══════════════════════════════════════
   SKILLS — 37 უნარი
══════════════════════════════════════ */
const SKILLS = [
  { id:'programming',   label:'პროგრამირება',          cat:'tech' },
  { id:'algorithms',    label:'ალგორითმები',            cat:'tech' },
  { id:'databases',     label:'მონაცემთა ბაზები',       cat:'tech' },
  { id:'networking',    label:'ქსელები / IT',            cat:'tech' },
  { id:'cloud',         label:'Cloud Computing',         cat:'tech' },
  { id:'cybersecurity', label:'კიბერ-უსაფრთხოება',      cat:'tech' },
  { id:'ai_ml',         label:'ხელოვნური ინტელექტი',    cat:'tech' },
  { id:'mobile_dev',    label:'მობილური დეველოპმენტი',  cat:'tech' },
  { id:'graphic_design',label:'გრაფიკული დიზაინი',      cat:'creative' },
  { id:'ui_ux',         label:'UI/UX დიზაინი',           cat:'creative' },
  { id:'photography',   label:'ფოტოგრაფია',              cat:'creative' },
  { id:'video_editing', label:'ვიდეო-მონტაჟი',           cat:'creative' },
  { id:'writing',       label:'შემოქმედებითი წერა',      cat:'creative' },
  { id:'music',         label:'მუსიკა / კომპოზიცია',     cat:'creative' },
  { id:'biology',       label:'ბიოლოგია',                cat:'science' },
  { id:'chemistry',     label:'ქიმია',                   cat:'science' },
  { id:'physics',       label:'ფიზიკა',                  cat:'science' },
  { id:'mathematics',   label:'მათემატიკა',               cat:'science' },
  { id:'research',      label:'სამეცნიერო კვლევა',       cat:'science' },
  { id:'statistics',    label:'სტატისტიკა',               cat:'science' },
  { id:'communication', label:'კომუნიკაცია',              cat:'human' },
  { id:'leadership',    label:'ლიდერობა',                 cat:'human' },
  { id:'empathy',       label:'ემპათია',                  cat:'human' },
  { id:'teaching',      label:'სწავლება / მენტორობა',     cat:'human' },
  { id:'negotiation',   label:'მოლაპარაკება',             cat:'human' },
  { id:'teamwork',      label:'გუნდური მუშაობა',          cat:'human' },
  { id:'analytics',     label:'მონაცემთა ანალიზი',       cat:'business' },
  { id:'marketing',     label:'მარკეტინგი',               cat:'business' },
  { id:'finance',       label:'ფინანსები',                cat:'business' },
  { id:'project_mgmt',  label:'პროექტის მართვა',         cat:'business' },
  { id:'sales',         label:'გაყიდვები',                cat:'business' },
  { id:'strategy',      label:'სტრატეგიული აზროვნება',    cat:'business' },
  { id:'law',           label:'სამართლებრივი ცოდნა',     cat:'business' },
  { id:'languages',     label:'უცხო ენები',               cat:'culture' },
  { id:'diplomacy',     label:'დიპლომატია',               cat:'culture' },
  { id:'history',       label:'ისტორია / კულტურა',        cat:'culture' },
  { id:'public_speak',  label:'საჯარო გამოსვლა',         cat:'culture' },
];

const CATEGORIES = {
  all:      { label:'ყველა',        emoji:'🌐' },
  tech:     { label:'ტექნოლოგია',  emoji:'💻' },
  creative: { label:'შემოქმედება', emoji:'🎨' },
  science:  { label:'მეცნიერება',  emoji:'🔬' },
  human:    { label:'ადამიანური',  emoji:'💬' },
  business: { label:'ბიზნესი',     emoji:'📊' },
  culture:  { label:'კულტურა',     emoji:'🌍' },
};

/* ══════════════════════════════════════
   CAREERS — 40 პროფესია
   demand  : მოთხოვნადობა  (1-10)
   salary  : ანაზღაურება   (1-10)
   aiRisk  : AI ჩანაცვლება (1-10)
══════════════════════════════════════ */
const CAREERS = [
  /* ── ტექნოლოგია ── */
  {
    id:'software_engineer', title:'Software Engineer', titleKa:'პროგრამული ინჟინერი', emoji:'⚙️',
    desc:'ააგე პროდუქტები, რომლებს მილიონები იყენებენ. ტექნოლოგიური სამყაროს ხერხემალი.',
    required:['programming','algorithms','databases','mathematics','teamwork'],
    optional:['cloud','ai_ml','mobile_dev','cybersecurity','project_mgmt'],
    youtube:'https://www.youtube.com/embed/ysEN5RaKOlA',
    color:'#A78BFA', demand:10, salary:9, aiRisk:6,
  },
  {
    id:'data_scientist', title:'Data Scientist', titleKa:'მონაცემთა მეცნიერი', emoji:'📈',
    desc:'გააქციე ნედლი მონაცემები ზუსტ გადაწყვეტილებებად და პროგნოზებად.',
    required:['statistics','mathematics','programming','analytics','research'],
    optional:['ai_ml','databases','cloud','finance','communication'],
    youtube:'https://www.youtube.com/embed/X3paOmcrTjQ',
    color:'#60A5FA', demand:10, salary:9, aiRisk:7,
  },
  {
    id:'ai_researcher', title:'AI/ML Researcher', titleKa:'AI/ML მკვლევარი', emoji:'🤖',
    desc:'ჩამოაყალიბე ხელოვნური ინტელექტის მომავალი. ახალი სამყაროს არქიტექტი.',
    required:['ai_ml','mathematics','statistics','programming','research'],
    optional:['algorithms','cloud','physics','databases','writing'],
    youtube:'https://www.youtube.com/embed/ad79nYk2keg',
    color:'#818CF8', demand:10, salary:10, aiRisk:4,
  },
  {
    id:'cybersec_analyst', title:'Cybersecurity Analyst', titleKa:'კიბერ-უსაფრთხოების ანალიტიკოსი', emoji:'🔐',
    desc:'დაიცავი ციფრული სამყარო მუდმივად განვითარებადი საფრთხეებისგან.',
    required:['cybersecurity','networking','programming','algorithms','analytics'],
    optional:['cloud','databases','law','research','mathematics'],
    youtube:'https://www.youtube.com/embed/inWWhr5tnEA',
    color:'#FCD34D', demand:10, salary:9, aiRisk:4,
  },
  {
    id:'cloud_engineer', title:'Cloud Engineer', titleKa:'Cloud ინჟინერი', emoji:'☁️',
    desc:'ააგე სკალაბელური ღრუბლოვანი ინფრასტრუქტურა გლობალური კომპანიებისთვის.',
    required:['cloud','networking','programming','databases','cybersecurity'],
    optional:['algorithms','mathematics','project_mgmt','teamwork','finance'],
    youtube:'https://www.youtube.com/embed/M988_fsOSWo',
    color:'#7DD3FC', demand:9, salary:9, aiRisk:5,
  },
  {
    id:'devops_engineer', title:'DevOps Engineer', titleKa:'DevOps ინჟინერი', emoji:'🔧',
    desc:'შეაერთე დეველოპმენტი და ოპერაციები — სიჩქარე, სტაბილურობა, ავტომატიზაცია.',
    required:['cloud','networking','programming','databases','algorithms'],
    optional:['cybersecurity','project_mgmt','teamwork','mathematics','analytics'],
    youtube:'https://www.youtube.com/embed/0yWAtQ6wYNM',
    color:'#F97316', demand:9, salary:9, aiRisk:5,
  },
  {
    id:'game_developer', title:'Game Developer', titleKa:'თამაშების დეველოპერი', emoji:'🎮',
    desc:'ქმნი სამყაროებს, სადაც ადამიანები ივიწყებენ სინამდვილეს.',
    required:['programming','algorithms','mathematics','graphic_design','teamwork'],
    optional:['physics','music','ui_ux','ai_ml','project_mgmt'],
    youtube:'https://www.youtube.com/embed/lKm8jGMfJKI',
    color:'#C4B5FD', demand:8, salary:8, aiRisk:6,
  },
  {
    id:'blockchain_dev', title:'Blockchain Developer', titleKa:'Blockchain დეველოპერი', emoji:'⛓️',
    desc:'ააგე გამჭვირვალე, დეცენტრალიზებული სისტემები ახალი ეკონომიკისთვის.',
    required:['programming','algorithms','mathematics','cybersecurity','databases'],
    optional:['finance','networking','research','analytics','cloud'],
    youtube:'https://www.youtube.com/embed/SSo_EIwHSd4',
    color:'#F59E0B', demand:7, salary:9, aiRisk:5,
  },
  {
    id:'robotics_engineer', title:'Robotics Engineer', titleKa:'რობოტიკის ინჟინერი', emoji:'🦾',
    desc:'შექმენი რობოტები, რომლებიც ადამიანებს ეხმარებიან — ქარხნიდან ქირურგიამდე.',
    required:['programming','physics','mathematics','algorithms','ai_ml'],
    optional:['teamwork','research','cloud','databases','project_mgmt'],
    youtube:'https://www.youtube.com/embed/fn3KWM1kuAw',
    color:'#A78BFA', demand:9, salary:9, aiRisk:3,
  },
  /* ── დიზაინი / შემოქმედება ── */
  {
    id:'ux_designer', title:'UX/UI Designer', titleKa:'UX/UI დიზაინერი', emoji:'🎨',
    desc:'ქმნი ინტერფეისებს, სადაც ყოველი კლიკი სიამოვნებაა.',
    required:['ui_ux','graphic_design','empathy','communication','research'],
    optional:['writing','photography','video_editing','teamwork','analytics'],
    youtube:'https://www.youtube.com/embed/5IanQIwhA2Y',
    color:'#F472B6', demand:8, salary:7, aiRisk:7,
  },
  {
    id:'motion_designer', title:'Motion Designer', titleKa:'მოუშენ დიზაინერი', emoji:'🌀',
    desc:'გააცოცხლე ბრენდები და ისტორიები მოძრავი გრაფიკის მეშვეობით.',
    required:['graphic_design','video_editing','ui_ux','mathematics','communication'],
    optional:['music','photography','writing','marketing','teamwork'],
    youtube:'https://www.youtube.com/embed/eLMG9PFmQVU',
    color:'#EC4899', demand:7, salary:7, aiRisk:8,
  },
  {
    id:'photographer', title:'Photographer / Filmmaker', titleKa:'ფოტოგრაფი / კინემატოგრაფი', emoji:'📷',
    desc:'გააყინე მომენტი. მოუყვე სამყაროს ისტორია ვიზუალური ენით.',
    required:['photography','video_editing','graphic_design','writing','communication'],
    optional:['music','marketing','teaching','history','public_speak'],
    youtube:'https://www.youtube.com/embed/LXb3EKWsInQ',
    color:'#F9A8D4', demand:6, salary:6, aiRisk:7,
  },
  {
    id:'architect', title:'Architect', titleKa:'არქიტექტორი', emoji:'🏛️',
    desc:'ააგე ფიზიკური სივრცეები, რომლებშიც ადამიანები ოცნებობენ, ცხოვრობენ, მუშაობენ.',
    required:['mathematics','physics','graphic_design','research','teamwork'],
    optional:['ui_ux','history','leadership','project_mgmt','communication'],
    youtube:'https://www.youtube.com/embed/7bMdo7Rl4UU',
    color:'#86EFAC', demand:7, salary:7, aiRisk:5,
  },
  {
    id:'musician', title:'Musician / Composer', titleKa:'მუსიკოსი / კომპოზიტორი', emoji:'🎵',
    desc:'გამოხატე გრძნობები სიტყვების მიღმა. შექმენი ემოციები სიგნალებიდან.',
    required:['music','communication','empathy','writing','public_speak'],
    optional:['video_editing','photography','teaching','languages','marketing'],
    youtube:'https://www.youtube.com/embed/74r00PtIuSc',
    color:'#E879F9', demand:5, salary:5, aiRisk:7,
  },
  /* ── მედიცინა / მეცნიერება ── */
  {
    id:'surgeon', title:'Surgeon', titleKa:'ქირურგი', emoji:'🏥',
    desc:'ხელებით გადაარჩინე სიცოცხლე. პრეციზიულობისა და თავდადების სიმბოლო.',
    required:['biology','chemistry','physics','empathy','research'],
    optional:['mathematics','teamwork','statistics','teaching'],
    youtube:'https://www.youtube.com/embed/R7yfISlGLNU',
    color:'#F87171', demand:9, salary:10, aiRisk:2,
  },
  {
    id:'psychologist', title:'Psychologist', titleKa:'ფსიქოლოგი', emoji:'🧠',
    desc:'გაიგე ადამიანის ფსიქიკა და დაეხმარე ადამიანებს უკეთეს ცხოვრებაში.',
    required:['empathy','research','communication','biology','statistics'],
    optional:['teaching','writing','history','mathematics','public_speak'],
    youtube:'https://www.youtube.com/embed/vo4pMVb0R6M',
    color:'#67E8F9', demand:8, salary:7, aiRisk:3,
  },
  {
    id:'pharmacist', title:'Pharmacist', titleKa:'ფარმაცევტი', emoji:'💊',
    desc:'მართე სამკურნალო საშუალებები და დაიცავი პაციენტები ქიმიური ცოდნით.',
    required:['chemistry','biology','research','empathy','mathematics'],
    optional:['communication','statistics','teaching','law','analytics'],
    youtube:'https://www.youtube.com/embed/4ld6xNj1eMs',
    color:'#34D399', demand:8, salary:8, aiRisk:4,
  },
  {
    id:'biotech_researcher', title:'Biotech Researcher', titleKa:'ბიოტექნოლოგი', emoji:'🧬',
    desc:'გენეტიკა, CRISPR, ახალი მედიკამენტები — ადამიანობის ახალი ფრონტი.',
    required:['biology','chemistry','research','mathematics','statistics'],
    optional:['ai_ml','programming','physics','teamwork','writing'],
    youtube:'https://www.youtube.com/embed/jAhjPd4uNFY',
    color:'#6EE7B7', demand:9, salary:9, aiRisk:3,
  },
  {
    id:'epidemiologist', title:'Epidemiologist', titleKa:'ეპიდემიოლოგი', emoji:'🦠',
    desc:'გააანალიზე დაავადებების გავრცელება და გადაარჩინე საზოგადოებები.',
    required:['biology','statistics','research','mathematics','communication'],
    optional:['chemistry','analytics','ai_ml','writing','teaching'],
    youtube:'https://www.youtube.com/embed/Z71vXOD5JDw',
    color:'#4ADE80', demand:8, salary:8, aiRisk:4,
  },
  {
    id:'environmental_scientist', title:'Environmental Scientist', titleKa:'გარემოს მეცნიერი', emoji:'🌿',
    desc:'გადაარჩინე პლანეტა — კლიმატი, ეკოლოგია, მდგრადი განვითარება.',
    required:['biology','chemistry','research','statistics','mathematics'],
    optional:['physics','writing','analytics','teaching','communication'],
    youtube:'https://www.youtube.com/embed/EhAemz1v7dQ',
    color:'#4ADE80', demand:8, salary:7, aiRisk:4,
  },
  {
    id:'vet', title:'Veterinarian', titleKa:'ვეტერინარი', emoji:'🐾',
    desc:'გადაარჩინე ცხოველების სიცოცხლე — მედიცინა, სიყვარული, სამეცნიერო სიზუსტე.',
    required:['biology','chemistry','empathy','research','communication'],
    optional:['mathematics','teamwork','statistics','teaching','leadership'],
    youtube:'https://www.youtube.com/embed/wRLQpnSRmOk',
    color:'#86EFAC', demand:7, salary:7, aiRisk:2,
  },
  /* ── ინჟინერია ── */
  {
    id:'mechanical_engineer', title:'Mechanical Engineer', titleKa:'მექანიკური ინჟინერი', emoji:'🔩',
    desc:'ААге, გამოსცადე, გააუმჯობესე ფიზიკური სისტემები — ავტომობილიდან კოსმოსამდე.',
    required:['physics','mathematics','research','teamwork','analytics'],
    optional:['programming','chemistry','project_mgmt','databases','strategy'],
    youtube:'https://www.youtube.com/embed/3rAaX5E8WcE',
    color:'#94A3B8', demand:8, salary:8, aiRisk:4,
  },
  {
    id:'civil_engineer', title:'Civil Engineer', titleKa:'სამოქალაქო ინჟინერი', emoji:'🌉',
    desc:'ააგე ხიდები, გზები, შენობები — ინფრასტრუქტურა, რომელზეც ყველა დგას.',
    required:['mathematics','physics','research','project_mgmt','teamwork'],
    optional:['analytics','chemistry','leadership','databases','strategy'],
    youtube:'https://www.youtube.com/embed/lhQESRXHVRc',
    color:'#78716C', demand:8, salary:8, aiRisk:4,
  },
  {
    id:'aerospace_engineer', title:'Aerospace Engineer', titleKa:'კოსმოსური ინჟინერი', emoji:'🛸',
    desc:'ამაღლდი ატმოსფეროს მიღმა — თვითმფრინავები, სატელიტები, Mars.',
    required:['physics','mathematics','research','algorithms','teamwork'],
    optional:['programming','chemistry','ai_ml','databases','project_mgmt'],
    youtube:'https://www.youtube.com/embed/CbIZah0FBlc',
    color:'#38BDF8', demand:8, salary:9, aiRisk:3,
  },
  /* ── ბიზნესი / ფინანსები ── */
  {
    id:'financial_analyst', title:'Financial Analyst', titleKa:'ფინანსური ანალიტიკოსი', emoji:'💰',
    desc:'გადაარჩინე ან გაამრავლე კაპიტალი ანალიტიკური სიზუსტით.',
    required:['finance','analytics','mathematics','statistics','strategy'],
    optional:['programming','communication','law','research','project_mgmt'],
    youtube:'https://www.youtube.com/embed/WEDIj9JBTC8',
    color:'#6EE7B7', demand:8, salary:8, aiRisk:7,
  },
  {
    id:'investment_banker', title:'Investment Banker', titleKa:'საინვესტიციო ბანკირი', emoji:'🏦',
    desc:'მართე კაპიტალი, M&A გარიგებები და IPO-ები მსოფლიო მასშტაბით.',
    required:['finance','mathematics','strategy','negotiation','analytics'],
    optional:['law','communication','statistics','leadership','research'],
    youtube:'https://www.youtube.com/embed/gHXdFo3SFPA',
    color:'#FDE68A', demand:7, salary:10, aiRisk:6,
  },
  {
    id:'entrepreneur', title:'Entrepreneur', titleKa:'მეწარმე / სტარტაპ დამფუძნებელი', emoji:'🚀',
    desc:'გარდაქმენი იდეა ბიზნესად. ნებისმიერი ინდუსტრიის გამომცვლელი.',
    required:['leadership','strategy','sales','communication','finance'],
    optional:['marketing','project_mgmt','negotiation','teamwork','analytics'],
    youtube:'https://www.youtube.com/embed/0xMaYQ-pKM0',
    color:'#FB923C', demand:8, salary:9, aiRisk:3,
  },
  {
    id:'marketing_manager', title:'Marketing Manager', titleKa:'მარკეტინგის მენეჯერი', emoji:'📣',
    desc:'მოუყვანე სწორი ადამიანები სწორ პროდუქტს სწორ დროს.',
    required:['marketing','communication','analytics','strategy','sales'],
    optional:['writing','video_editing','teamwork','finance','project_mgmt'],
    youtube:'https://www.youtube.com/embed/bixR-KIJKYM',
    color:'#FCA5A5', demand:8, salary:7, aiRisk:7,
  },
  {
    id:'project_manager', title:'Project Manager', titleKa:'პროექტის მენეჯერი', emoji:'📋',
    desc:'კოორდინირდე ადამიანებს, პროცესებსა და რესურსებს შორის.',
    required:['project_mgmt','leadership','communication','strategy','teamwork'],
    optional:['analytics','finance','negotiation','programming','law'],
    youtube:'https://www.youtube.com/embed/PP83cNkxj9Q',
    color:'#FCD34D', demand:8, salary:8, aiRisk:6,
  },
  {
    id:'supply_chain_manager', title:'Supply Chain Manager', titleKa:'მიწოდების ჯაჭვის მენეჯერი', emoji:'🚢',
    desc:'მართე გლობალური ლოჯისტიკა — ქარხნიდან მომხმარებლამდე.',
    required:['analytics','project_mgmt','strategy','negotiation','teamwork'],
    optional:['finance','mathematics','communication','law','databases'],
    youtube:'https://www.youtube.com/embed/Mi1QBxVjZAg',
    color:'#A3E635', demand:8, salary:8, aiRisk:6,
  },
  {
    id:'hr_manager', title:'HR Manager', titleKa:'HR მენეჯერი', emoji:'👥',
    desc:'ჩამოაყალიბე კომპანიის კულტურა და მოიყვანე საუკეთესო ნიჭები.',
    required:['communication','empathy','leadership','negotiation','teamwork'],
    optional:['law','analytics','teaching','strategy','research'],
    youtube:'https://www.youtube.com/embed/3AZMhLZXK4Q',
    color:'#C4B5FD', demand:7, salary:7, aiRisk:6,
  },
  /* ── სამართალი / სახელმწიფო ── */
  {
    id:'lawyer', title:'Lawyer', titleKa:'იურისტი / ადვოკატი', emoji:'⚖️',
    desc:'დაიცავი სამართლიანობა ნორმებისა და პრინციპების მეშვეობით.',
    required:['law','communication','research','negotiation','public_speak'],
    optional:['languages','strategy','history','analytics','writing'],
    youtube:'https://www.youtube.com/embed/xtA5SHN5_2Y',
    color:'#FDE68A', demand:7, salary:8, aiRisk:5,
  },
  {
    id:'diplomat', title:'Diplomat', titleKa:'დიპლომატი', emoji:'🌍',
    desc:'წარმოადგინე ქვეყანა საერთაშორისო ასპარეზზე, შექმენი ხიდები კულტურებს შორის.',
    required:['diplomacy','languages','communication','negotiation','history'],
    optional:['public_speak','law','strategy','teamwork','leadership'],
    youtube:'https://www.youtube.com/embed/oJLqyuxm96k',
    color:'#34D399', demand:6, salary:7, aiRisk:2,
  },
  {
    id:'judge', title:'Judge', titleKa:'მოსამართლე', emoji:'🏛️',
    desc:'სამართლიანობის განხორციელება — ყველაზე მაღალი პასუხისმგებლობა.',
    required:['law','research','communication','history','analytics'],
    optional:['public_speak','empathy','writing','negotiation','leadership'],
    youtube:'https://www.youtube.com/embed/jkPBV2_kXho',
    color:'#E0E7FF', demand:6, salary:8, aiRisk:3,
  },
  {
    id:'politician', title:'Politician', titleKa:'პოლიტიკოსი', emoji:'🗳️',
    desc:'ჩამოაყალიბე პოლიტიკა, წარმოადგინე ადამიანები, შეცვალე სამყარო.',
    required:['communication','leadership','public_speak','negotiation','history'],
    optional:['law','strategy','languages','empathy','diplomacy'],
    youtube:'https://www.youtube.com/embed/tLGNRzTM6gQ',
    color:'#38BDF8', demand:5, salary:7, aiRisk:2,
  },
  /* ── განათლება / სოციალური ── */
  {
    id:'teacher', title:'Teacher / Educator', titleKa:'მასწავლებელი / განმათლებელი', emoji:'📚',
    desc:'ჩაანთე ცოდნის ალი სხვებში და ჩამოაყალიბე სამომავლო თაობები.',
    required:['teaching','communication','empathy','public_speak','teamwork'],
    optional:['writing','leadership','research','languages','history'],
    youtube:'https://www.youtube.com/embed/iG9CE55wbtY',
    color:'#A3E635', demand:8, salary:5, aiRisk:4,
  },
  {
    id:'social_worker', title:'Social Worker', titleKa:'სოციალური მუშაკი', emoji:'🤝',
    desc:'იყავი ხმა მათთვის, ვისაც ეს ყველაზე მეტად სჭირდება.',
    required:['empathy','communication','teaching','research','teamwork'],
    optional:['law','leadership','public_speak','languages','writing'],
    youtube:'https://www.youtube.com/embed/i8IJifJGhXk',
    color:'#FCA5A5', demand:7, salary:4, aiRisk:2,
  },
  {
    id:'ux_researcher', title:'UX Researcher', titleKa:'UX მკვლევარი', emoji:'🔍',
    desc:'გაიგე ადამიანების ნამდვილი მოთხოვნები — ქცევებიდან ტესტირებამდე.',
    required:['research','empathy','analytics','communication','statistics'],
    optional:['ui_ux','writing','teaching','databases','psychology'],
    youtube:'https://www.youtube.com/embed/Ovj4hFxko7c',
    color:'#67E8F9', demand:8, salary:8, aiRisk:5,
  },
  /* ── მედია / კომუნიკაცია ── */
  {
    id:'journalist', title:'Journalist / Writer', titleKa:'ჟურნალისტი / მწერალი', emoji:'✍️',
    desc:'სიმართლის ძიება და საზოგადოების ინფორმირება — დემოკრატიის ოთხი ძელი.',
    required:['writing','communication','research','public_speak','history'],
    optional:['photography','video_editing','languages','diplomacy','analytics'],
    youtube:'https://www.youtube.com/embed/SkmN8VX4H6Y',
    color:'#F9A8D4', demand:6, salary:5, aiRisk:8,
  },
  {
    id:'content_creator', title:'Content Creator', titleKa:'კონტენტ კრეატორი', emoji:'📱',
    desc:'ააგე აუდიტორია, ბრენდი და შემოსავალი ციფრული კონტენტით.',
    required:['communication','video_editing','marketing','writing','photography'],
    optional:['graphic_design','music','analytics','public_speak','sales'],
    youtube:'https://www.youtube.com/embed/B8R9Crx8-hM',
    color:'#FB7185', demand:9, salary:6, aiRisk:8,
  },
  {
    id:'pr_specialist', title:'PR Specialist', titleKa:'PR სპეციალისტი', emoji:'📡',
    desc:'ჩამოაყალიბე სახელი, გაუმკლავდე კრიზისს, მოახდინე სწორი ეფექტი.',
    required:['communication','writing','strategy','public_speak','negotiation'],
    optional:['marketing','analytics','languages','leadership','research'],
    youtube:'https://www.youtube.com/embed/bkCFzMSuRdA',
    color:'#F0ABFC', demand:7, salary:7, aiRisk:7,
  },
  /* ── სხვა ── */
  {
    id:'pilot', title:'Pilot', titleKa:'მფრინავი / პილოტი', emoji:'✈️',
    desc:'მართე ლითონის ფრინველი ღრუბლებში. სიზუსტე, ცივი თავი, ახირება.',
    required:['physics','mathematics','teamwork','communication','research'],
    optional:['algorithms','analytics','leadership','languages','networking'],
    youtube:'https://www.youtube.com/embed/V2lHoKm9dMs',
    color:'#7DD3FC', demand:7, salary:8, aiRisk:4,
  },
  {
    id:'chef', title:'Chef / Culinary Artist', titleKa:'შეფ-მზარეული', emoji:'👨‍🍳',
    desc:'გადაქციე ინგრედიენტები ხელოვნებად. გემო, ინოვაცია, კულტურა ერთ თეფშზე.',
    required:['empathy','communication','teamwork','research','leadership'],
    optional:['marketing','teaching','history','writing','analytics'],
    youtube:'https://www.youtube.com/embed/CIRMFmcOHkI',
    color:'#FCA5A5', demand:7, salary:6, aiRisk:2,
  },
];

/* ══════════════════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════════════════ */
function toggleTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  if (html.dataset.theme === 'dark') { html.dataset.theme = 'light'; btn.textContent = '🌙 Dark'; }
  else                               { html.dataset.theme = 'dark';  btn.textContent = '☀️ Light'; }
}

/* ══════════════════════════════════════════════════════
   STEP 1 → 2
══════════════════════════════════════════════════════ */
function goToStep2() {
  const fn = document.getElementById('firstName').value.trim();
  const ln = document.getElementById('lastName').value.trim();
  if (!fn || !ln) { shake(document.getElementById('firstName')); shake(document.getElementById('lastName')); return; }
  state.firstName = fn; state.lastName = ln;
  document.getElementById('step2Title').innerHTML =
    `${fn}, მონიშნე შენი<br/>
    <span style="background:linear-gradient(135deg,var(--accent),var(--accent-2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
      უნარები
    </span>`;
  showStep('step2'); buildCategoryFilters(); renderSkills();
}

function shake(el) {
  el.style.animation = 'none'; el.style.borderColor = '#F87171';
  el.offsetHeight; el.style.animation = 'fade-up 0.3s ease';
  setTimeout(() => { el.style.borderColor = ''; }, 1500);
}

/* ══════════════════════════════════════════════════════
   კატეგორიების ფილტრი
══════════════════════════════════════════════════════ */
function buildCategoryFilters() {
  const c = document.getElementById('categoryFilters'); c.innerHTML = '';
  Object.entries(CATEGORIES).forEach(([key, val]) => {
    const btn = document.createElement('button');
    btn.className = 'cat-badge cursor-pointer transition-all duration-200';
    btn.style.cssText = 'padding:6px 14px;font-size:0.82rem';
    btn.dataset.cat = key; btn.textContent = `${val.emoji} ${val.label}`;
    btn.onclick = () => setCategory(key); c.appendChild(btn);
  });
  highlightCategory('all');
}
function setCategory(cat) { state.activeCategory = cat; highlightCategory(cat); renderSkills(); }
function highlightCategory(cat) {
  document.querySelectorAll('#categoryFilters .cat-badge').forEach(btn => {
    const a = btn.dataset.cat === cat;
    btn.style.background = a ? 'var(--accent)' : ''; btn.style.color = a ? '#fff' : ''; btn.style.borderColor = a ? 'var(--accent)' : '';
  });
}

/* ══════════════════════════════════════════════════════
   SKILLS RENDER
══════════════════════════════════════════════════════ */
function renderSkills() {
  const query = document.getElementById('skillSearch').value.toLowerCase();
  const grid  = document.getElementById('skillsGrid'); grid.innerHTML = '';
  const filtered = SKILLS.filter(s =>
    (state.activeCategory === 'all' || s.cat === state.activeCategory) &&
    (s.label.toLowerCase().includes(query) || s.id.includes(query))
  );
  if (!filtered.length) { grid.innerHTML = `<p style="color:var(--text-dim)">შედეგი ვერ მოიძებნა 🔍</p>`; return; }
  filtered.forEach(skill => {
    const tag = document.createElement('button');
    tag.className = 'skill-tag' + (state.selected.has(skill.id) ? ' selected' : '');
    tag.innerHTML = `<svg class="check-icon" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>${skill.label}`;
    tag.onclick = () => toggleSkill(skill.id, tag); grid.appendChild(tag);
  });
}
function toggleSkill(id, el) {
  if (state.selected.has(id)) { state.selected.delete(id); el.classList.remove('selected'); }
  else { state.selected.add(id); el.classList.add('selected'); }
  updateCounter();
}
function updateCounter() {
  const cnt = state.selected.size;
  document.getElementById('selectedCount').textContent = `${cnt} შერჩეული`;
  document.getElementById('step2NextBtn').disabled = cnt < 3;
}
function clearAllSkills() { state.selected.clear(); renderSkills(); updateCounter(); }
function filterSkills()   { renderSkills(); }

/* ══════════════════════════════════════════════════════
   MATCHING ALGORITHM
══════════════════════════════════════════════════════ */
function computeMatches() {
  return CAREERS.map(career => {
    const sel = state.selected;
    const req = career.required, opt = career.optional || [];
    const rM = req.filter(r => sel.has(r)).length;
    const oM = opt.filter(o => sel.has(o)).length;
    const score = Math.round((rM / req.length) * 80 + (oM / (opt.length || 1)) * 20);
    return { ...career, score, reqHave: req.filter(r => sel.has(r)), reqMissing: req.filter(r => !sel.has(r)) };
  }).sort((a, b) => b.score - a.score);
}

/* ══════════════════════════════════════════════════════
   STEP 2 → 3
══════════════════════════════════════════════════════ */
function goToStep3() {
  const matches = computeMatches();
  const top3 = matches.slice(0, 3);
  document.getElementById('resultTitle').innerHTML =
    `${state.firstName}, <span style="background:linear-gradient(135deg,var(--accent),var(--accent-2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">აი შენი შედეგები!</span>`;
  const grid = document.getElementById('careersGrid'); grid.innerHTML = '';
  top3.forEach((c, i) => grid.appendChild(buildCareerCard(c, i + 1)));
  document.getElementById('detailPanel').innerHTML = buildDetailPanel(top3[0]);
  showStep('step3');
  setTimeout(() => { document.querySelectorAll('.match-bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; }); }, 300);
}

/* ════ მეტრიკ-ზოლი (დამხმარე) ════ */
function metricBar(label, score, color) {
  return `
    <div>
      <div class="flex justify-between text-xs mb-1" style="color:var(--text-muted)">
        <span>${label}</span><span style="color:${color};font-weight:700">${score}/10</span>
      </div>
      <div class="match-bar-bg">
        <div class="match-bar-fill" style="width:0%;background:${color}" data-w="${score * 10}"></div>
      </div>
    </div>`;
}

/* ════ სტატ-ჩიპი (დამხმარე) ════ */
function statChip(label, value, color) {
  return `
    <div class="rounded-2xl p-4 text-center" style="background:var(--bg-glass);border:1px solid ${color}44">
      <div class="text-xs mb-1" style="color:var(--text-dim)">${label}</div>
      <div class="brand text-2xl" style="color:${color}">${value}</div>
    </div>`;
}

/* ════ TOP-3 ბარათი ════ */
function buildCareerCard(career, rank) {
  const div = document.createElement('div');
  div.className = `career-card career-card-rank-${rank} glass p-6 cursor-pointer`;
  div.style.position = 'relative';
  div.innerHTML = `
    <div class="rank-badge">#${rank}</div>
    <div class="text-4xl mb-3">${career.emoji}</div>
    <h3 class="brand text-2xl leading-tight" style="color:var(--text-primary)">${career.titleKa}</h3>
    <p class="text-sm mt-1 italic" style="color:var(--accent)">${career.title}</p>
    <p class="mt-3 text-sm leading-relaxed" style="color:var(--text-dim)">${career.desc}</p>
    <div class="mt-5 space-y-3">
      ${metricBar('🎯 თანხვედრა',      career.score / 10, '#A78BFA').replace('/10', '%').replace('data-w="' + career.score / 10 * 10 + '"', 'data-w="' + career.score + '"')}
      ${metricBar('📈 მოთხოვნადობა', career.demand, '#34D399')}
      ${metricBar('💰 ანაზღაურება',  career.salary, '#F59E0B')}
      ${metricBar('🤖 AI ჩანაცვლება',career.aiRisk, '#F87171')}
    </div>`;

  /* ──── თანხვედრის ზოლი ცალკე ასწორდება ──── */
  div.querySelector('.match-bar-fill').dataset.w = career.score;

  div.onclick = () => {
    document.getElementById('detailPanel').innerHTML = buildDetailPanel(career);
    document.getElementById('detailPanel').scrollIntoView({ behavior:'smooth' });
    setTimeout(() => { document.querySelectorAll('.match-bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; }); }, 200);
  };
  return div;
}

/* ════ დეტალური პანელი ════ */
function buildDetailPanel(career) {
  const haveHtml = career.reqHave.length
    ? career.reqHave.map(id => { const s = SKILLS.find(x => x.id === id); return `<span class="skill-tag selected" style="cursor:default">✓ ${s ? s.label : id}</span>`; }).join('')
    : `<span style="color:var(--text-dim)">ჯერ არცერთი required უნარი</span>`;
  const learnHtml = career.reqMissing.length
    ? career.reqMissing.map(id => { const s = SKILLS.find(x => x.id === id); return `<span class="skill-tag" style="cursor:default;border-color:var(--accent-2);color:var(--accent-2)">→ ${s ? s.label : id}</span>`; }).join('')
    : `<span style="color:var(--text-dim)">ყველა required უნარი გაქვს! 🎉</span>`;

  const aiColor = career.aiRisk <= 3 ? '#4ADE80' : career.aiRisk <= 6 ? '#F59E0B' : '#F87171';
  const aiLabel = career.aiRisk <= 3 ? '🟢 დაბალი რისკი' : career.aiRisk <= 6 ? '🟡 საშუალო რისკი' : '🔴 მაღალი რისკი';
  const aiDesc  = career.aiRisk <= 3
    ? 'AI-ის ჩანაცვლების ალბათობა ძალიან დაბალია. ადამიანური ემპათია, ფიზიკური პრეზენცია ან პოლიტიკური ლეგიტიმაცია ხელოვნური ინტელექტისთვის მიუწვდომელია.'
    : career.aiRisk <= 6
    ? 'AI შეიძლება ჩაანაცვლოს ამ პროფესიის ზოგიერთი ქვეამოცანა, მაგრამ არა სრულად. კრიტიკული აზროვნება, ინტერპერსონალური კომუნიკაცია და კონტექსტუალური გადაწყვეტილება კვლავ ადამიანის პრეროგატივაა.'
    : 'მაღალი AI ჩანაცვლების რისკი. ამ სფეროში სპეციალიზაცია, ადამიანური ელემენტის გაძლიერება ან AI-ასოცირებული პოზიციებისკენ გადასვლა გადამარჩენელი სტრატეგიაა.';

  return `
    <div class="glass p-8 md:p-10 rounded-3xl" style="border-color:${career.color}44">
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div class="text-5xl">${career.emoji}</div>
        <div>
          <h3 class="brand text-4xl" style="color:var(--text-primary)">${career.titleKa}</h3>
          <p class="text-sm italic" style="color:${career.color}">${career.title}</p>
        </div>
      </div>

      <!-- 4 სტატ-ჩიპი -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        ${statChip('🎯 თანხვედრა',     career.score + '%', '#A78BFA')}
        ${statChip('📈 მოთხოვნადობა', career.demand + '/10', '#34D399')}
        ${statChip('💰 ანაზღაურება',  career.salary + '/10', '#F59E0B')}
        ${statChip('🤖 AI რისკი',      career.aiRisk + '/10', aiColor)}
      </div>

      <!-- AI ბლოკი -->
      <div class="mb-8 p-5 rounded-2xl" style="background:var(--bg-glass);border:1px solid ${aiColor}44">
        <p class="brand text-xl mb-2" style="color:${aiColor}">AI ჩანაცვლება — ${aiLabel}</p>
        <p class="text-sm leading-relaxed" style="color:var(--text-muted)">${aiDesc}</p>
        <div class="mt-4 match-bar-bg">
          <div class="match-bar-fill" style="width:0%;background:${aiColor}" data-w="${career.aiRisk * 10}"></div>
        </div>
      </div>

      <!-- რა შემიძლია -->
      <div class="mb-8">
        <h4 class="brand text-2xl mb-4" style="color:#4ADE80">✅ რა შემიძლია</h4>
        <div class="flex flex-wrap gap-2">${haveHtml}</div>
      </div>

      <!-- რა უნდა ვისწავლო -->
      <div class="mb-8">
        <h4 class="brand text-2xl mb-4" style="color:var(--accent-2)">🎯 რა უნდა ვისწავლო</h4>
        <div class="flex flex-wrap gap-2">${learnHtml}</div>
      </div>

      <!-- YouTube -->
      <div>
        <h4 class="brand text-2xl mb-4" style="color:var(--accent)">🎥 სასწავლო ვიდეო</h4>
        <div class="video-wrapper">
          <iframe src="${career.youtube}?modestbranding=1&rel=0" title="${career.titleKa}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════
   ნავიგაცია
══════════════════════════════════════════════════════ */
function showStep(stepId) {
  ['step1','step2','step3'].forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById(stepId).classList.remove('hidden');
  const n = parseInt(stepId.replace('step',''));
  ['dot-1','dot-2','dot-3'].forEach((d, i) => {
    const dot = document.getElementById(d); dot.classList.remove('active','done');
    if (i + 1 < n) dot.classList.add('done');
    if (i + 1 === n) dot.classList.add('active');
  });
  window.scrollTo({ top:0, behavior:'smooth' });
}

function restart() {
  state.selected.clear(); state.firstName = state.lastName = '';
  document.getElementById('firstName').value = document.getElementById('lastName').value = '';
  showStep('step1');
}

document.addEventListener('DOMContentLoaded', () => {
  ['firstName','lastName'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') goToStep2(); });
  });
});
