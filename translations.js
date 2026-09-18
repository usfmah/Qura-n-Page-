/* ==========================================================================
   translations.js — All AR/EN text strings for the site.
   --------------------------------------------------------------------------
   HOW IT WORKS:
   - Every translatable element in index.html carries `data-i18n="key"`.
   - On language switch, script.js looks up translations[lang][key]
     and replaces the element's text.
   - `data-i18n-ph="key"`  -> sets `placeholder` attribute (form fields).
   - `data-i18n-aria="key"` -> sets `aria-label` attribute.
   - `data-i18n-html="key"` -> sets `innerHTML` (for strings with <em> accents).
   - All user-facing copy is final. The only bracketed tokens left are
     fill-in secrets for the site owner: [YOUR_HOURLY_RATE],
     [FORMSPREE_ENDPOINT], [YOUR_WHATSAPP_NUMBER], [YOUR_EMAIL].
   ========================================================================== */

const translations = {
  en: {
    skipLink: "Skip to content",
    siteName: "Quran Teacher",

    navAbout: "About",
    navTeach: "What I Teach",
    navPaths: "Paths",
    navExperience: "Experience",
    navPricing: "Pricing",
    navHow: "How It Works",
    navFaq: "FAQ",
    navContact: "Contact",

    menuButtonLabel: "Toggle navigation menu",
    langToggleLabel: "Switch to Arabic",
    themeToggleLabel: "Toggle dark / light mode",

    heroEyebrow: "Online Quran lessons – for non-Arabs & diaspora Arabs",
    // HTML string: <em> wraps the gold accent word (rendered via data-i18n-html).
    heroTitle: "Learn to recite the Quran<br><em>beautifully,</em> step by step",
    heroSubtitle:
      "One-to-one Tajweed, recitation correction, and Hifz coaching online — calm, patient teaching for beginners and returning learners.",
    heroCtaPrimary: "Book a free trial lesson",
    heroCtaSecondary: "Explore learning paths",
    heroTrust:
      "Trusted by students in many countries · Male & female students welcome",
    artTitle: "Mihrab niche with olive branch and Quran books",
    artDesc:
      "A softly lit arched niche with geometric pattern, a potted olive branch, and two ornate Quran books on marble.",
    verseEn: "“And recite the Quran with measured recitation.”",
    verseCite: "(Al-Muzzammil 73:4)",
    feat1: "One-to-one sessions",
    feat2: "Flexible scheduling",
    feat3: "Non-Arab students welcome",
    feat4: "Male / female students",
    quoteText: "“The best of you are those who learn the Quran and teach it.”",
    quoteCite: "(Sahih al-Bukhari)",

    aboutEyebrow: "About",
    aboutTitle: "My journey with the Quran",
    aboutLead:
      "I teach the Quran the way I wish every beginner could be taught: slowly, warmly, and with room to make mistakes.",
    aboutP1:
      "My own path with the Quran taught me that beautiful recitation is a skill anyone can build — not a talent reserved for native Arabic speakers. That conviction is what brought me to teaching students from all over the world.",
    aboutP2:
      "Today I teach non-Arabic speakers and diaspora Arab families online, one to one. My lessons are calm and structured: we fix one thing at a time, we revise constantly, and no one is ever rushed.",
    aboutItem1: "Patient with absolute beginners",
    aboutItem2: "Tajweed explained in plain words",
    aboutItem3: "A plan that fits your week",

    teachEyebrow: "What I Teach",
    teachTitle: "Four ways I can help you",
    teachSub:
      "All lessons are live, one-to-one, and online.",
    teachTag: "Live · 1-on-1",
    teach1Title: "Tajweed",
    teach1Desc:
      "Tajweed rules explained in plain words, then trained on real verses.",
    teach2Title: "Recitation Correction",
    teach2Desc:
      "We correct your pronunciation and fluency verse by verse, until it flows.",
    teach3Title: "Hifz (Memorization)",
    teach3Desc:
      "A steady memorization plan with a revision cycle that keeps it.",
    teach4Title: "Arabic Reading from Scratch",
    teach4Desc:
      "From the Arabic letters to fluent reading, with correct makharij from day one.",

    pathsEyebrow: "Learning Paths",
    pathsTitle: "Choose your path",
    pathsSub:
      "Two tracks, one goal: a confident relationship with the Quran.",
    pathsTabCorrection: "Recitation Correction",
    pathsTabHifz: "Memorization (Hifz)",
    pathCorrTitle: "Recitation Correction Path",
    pathCorrDesc:
      "For students who can already read Arabic and want precise, beautiful recitation.",
    pathCorrS1T: "Recitation assessment",
    pathCorrS1D: "I listen to your recitation and map every issue.",
    pathCorrS2T: "Pinpoint weak points",
    pathCorrS2D: "Makharij al-huruf and Tajweed rules that need work.",
    pathCorrS3T: "Structured correction plan",
    pathCorrS3D: "A clear order for what we fix first, and how.",
    pathCorrS4T: "Practice every session",
    pathCorrS4D: "Guided practice and review in each lesson.",
    pathHifzTitle: "Memorization (Hifz) Path",
    pathHifzDesc:
      "For new or continuing memorizers — complete beginners start from the Arabic letters.",
    pathHifzS1T: "Starting-point assessment",
    pathHifzS1D: "From the Arabic letters if needed — wherever you are.",
    pathHifzS2T: "Set memorization targets",
    pathHifzS2D: "Realistic goals by Surah or Juz, at your pace.",
    pathHifzS3T: "Structured revision cycle",
    pathHifzS3D: "New memorization plus steady daily review.",
    pathHifzS4T: "Track progress by Juz",
    pathHifzS4D: "Clear milestones, so you always know where you stand.",
    pathsCta: "Not sure which path fits? Book a free level check",

    expEyebrow: "Experience",
    expTitle: "Online teaching, personal attention",
    expLead:
      "One-to-one Quran lessons for non-Arabs and diaspora families — structured, patient, and consistent.",
    expP1:
      "I teach students of all ages across many time zones, from absolute beginners learning their first letters to advanced readers refining their recitation. Every student follows a personal plan, and every lesson ends with something clear to practise.",
    expStat1Num: "1-on-1",
    expStat1Label: "Private live lessons",
    expStat2Num: "60 min",
    expStat2Label: "Focused hourly sessions",
    expStat3Num: "1–3×",
    expStat3Label: "Sessions a week, your choice",
    expNote: "Want to know more about my background? Ask me anything in the free trial lesson.",

    pricingEyebrow: "Pricing",
    pricingTitle: "Simple hourly pricing",
    pricingSub:
      "Pick the program that fits — every package is billed per hour, with no fixed monthly prices.",
    pack1Tag: "From zero",
    pack1Name: "Starter / Foundations",
    pack1Desc: "Arabic letters and makharij al-huruf, from absolute zero.",
    pack2Tag: "Readers",
    pack2Name: "Tajweed Mastery",
    pack2Desc: "Focused correction of Tajweed rules for students who already read.",
    pack3Tag: "All levels",
    pack3Name: "Hifz Program",
    pack3Desc: "Gradual memorization by Surah or Juz, with regular revision.",
    pack4Tag: "Ages 5+",
    pack4Name: "Kids Package",
    pack4Desc: "The same program, paced and styled for children.",
    pack5Tag: "Advanced",
    pack5Name: "Ijazah Track",
    pack5Desc: "Advanced recitation for students working toward formal Ijazah.",
    // Rate line = pre + [YOUR_HOURLY_RATE] + post. Fill in the number later.
    packPricePre: "Starting at $",
    packPricePost: "/hour",
    packCta: "Book free trial",
    billingFreqLabel: "How often?",
    freq1: "Once a week",
    freq2: "Twice a week",
    freq3: "Three times a week",
    billingFormatLabel: "Format",
    fmtSolo: "One-on-one",
    fmtGroup: "Small group",
    billingSummary:
      "{freq} · {format} — billed per hour. Your exact schedule is confirmed in the free trial.",
    billingNote:
      "Frequency and format only shape your schedule — they never change the hourly rate.",

    howEyebrow: "How It Works",
    howTitle: "Start in four simple steps",
    howSub: "From your first message to regular lessons.",
    how1Title: "1 · Book a free trial",
    how1Desc: "Send the form or a WhatsApp message — it takes a minute.",
    how2Title: "2 · Meet and assess",
    how2Desc: "We talk goals while I listen to a short recitation.",
    how3Title: "3 · Get your plan",
    how3Desc: "Track, schedule, and materials — agreed together.",
    how4Title: "4 · Learn every week",
    how4Desc: "Live lessons plus short practice between them.",

    contactEyebrow: "Contact / Booking",
    contactTitle: "Book your free trial lesson",
    contactSub:
      "Send the form below — or message me directly on WhatsApp, whichever is easier. I usually reply within a day.",
    formNameLabel: "Your name",
    formNamePh: "e.g. Ahmed / Sarah",
    formEmailLabel: "Email",
    formEmailPh: "you@example.com",
    formWhatsappLabel: "WhatsApp number (optional)",
    formWhatsappPh: "e.g. +1 555 000 1234",
    formTrackLabel: "Preferred track",
    formTrackDefault: "Choose a track…",
    formTrackCorr: "Recitation Correction",
    formTrackHifz: "Memorization (Hifz)",
    formTrackUnsure: "Not sure yet — help me decide",
    formMsgLabel: "Message",
    formMsgPh: "Your goals, level, and the times that suit you…",
    formSubmit: "Send booking request",
    formSending: "Sending…",
    formNote:
      "Your details are only used to arrange your trial lesson.",
    formSuccess:
      "Thank you! Your message is on its way — I'll reply soon, in shaa Allah.",
    formError:
      "Something went wrong sending the form — please try WhatsApp instead.",
    whatsappBadge: "Fastest",
    whatsappLabel: "Chat on WhatsApp",
    whatsappSub: "The fastest way to reach me — tap to start a chat.",
    whatsappNumber: "WhatsApp: [YOUR_WHATSAPP_NUMBER]",
    contactAltTitle: "Prefer email?",
    contactEmail: "Email: [YOUR_EMAIL]",

    faqEyebrow: "FAQ",
    faqTitle: "Questions, answered",
    faqSub: "Everything students usually ask before the trial lesson.",
    faq1Q: "Do I need to already know Arabic to start?",
    faq1A:
      "Not at all. Complete beginners start from the Arabic letters in the Foundations program, and we build up to reading with correct makharij step by step. If you already read, we simply begin from your current level.",
    faq2Q: "How long is each session, and how often do we meet?",
    faq2A:
      "Sessions are one hour, and most students meet once to three times a week — you choose the rhythm in the booking section above. Regular, shorter contact beats occasional long sessions, especially for memorization.",
    faq3Q: "Do you teach both kids and adults?",
    faq3A:
      "Yes — the Kids Package (ages 5+) paces the same program for young learners, while adults follow a rhythm that fits work and family life. Beginners and returning learners of any age are welcome.",
    faq4Q: "Is there a discount for siblings or group sessions?",
    faq4A:
      "Yes — siblings learning together and small-group formats come with reduced per-student rates. Mention it in your booking message and we'll arrange a plan that fits your family.",
    faq5Q: "What time zones / schedules are available?",
    faq5A:
      "Lessons run online across many time zones, with morning, afternoon, and evening slots. Share the times that suit you in the booking form and we'll find a fixed weekly slot together.",
    faq6Q: "What platform do we use for lessons?",
    faq6A:
      "We meet live on Zoom — you only need the free app and a quiet corner. The meeting link arrives before each lesson, along with any pages or notes we'll use.",
    faq7Q: "What happens in the free trial lesson?",
    faq7A:
      "We get to know each other: I listen to your recitation (or start from the letters), we talk about your goals, and you leave with a clear personal plan. There is no commitment — it's simply the best way to begin.",

    footerTagline:
      "Serving Quran learners around the world.",
    footerExploreTitle: "Explore",
    footerContactTitle: "Contact",
    footerEmailPh: "[YOUR_EMAIL]",
    footerWhatsappPh: "WhatsApp: [YOUR_WHATSAPP_NUMBER]",
    footerRights: "© Quran Teacher · All rights reserved.",
    footerNote: "Made with sincerity for the sake of Allah.",
  },

  ar: {
    skipLink: "تخطَّ إلى المحتوى",
    siteName: "مُعلِّم القرآن",

    navAbout: "من أنا",
    navTeach: "ماذا أُدرِّس",
    navPaths: "المسارات",
    navExperience: "الخبرة",
    navPricing: "الأسعار",
    navHow: "كيف نبدأ",
    navFaq: "الأسئلة الشائعة",
    navContact: "تواصل",

    menuButtonLabel: "فتح / إغلاق قائمة التنقل",
    langToggleLabel: "التبديل إلى الإنجليزية",
    themeToggleLabel: "التبديل بين الوضع الداكن والفاتح",

    heroEyebrow: "دروس قرآن عن بُعد — لغير العرب وعرب المهجر",
    // HTML string: <em> wraps the gold accent word (rendered via data-i18n-html).
    heroTitle: "تعلَّم تلاوة القرآن<br><em>بإتقان،</em> خطوة بخطوة",
    heroSubtitle:
      "تجويد فردي وتصحيح تلاوة وتحفيظ عن بُعد — تعليم هادئ وصبور للمبتدئين والعائدين.",
    heroCtaPrimary: "احجز حصة تجريبية مجانية",
    heroCtaSecondary: "استكشف المسارات",
    heroTrust:
      "يثق بي طلاب في دول كثيرة · أهلاً بالطلاب والطالبات",
    artTitle: "محراب مزخرف مع غصن زيتون ومصاحف",
    artDesc:
      "محراب مقوس بإضاءة هادئة ونقوش هندسية، مع غصن زيتون في مزهرية ومصحفين مزخرفين على الرخام.",
    verseEn: "«واتلُ القرآن بتؤدة وتمهُّل.»",
    verseCite: "(المزّمّل 73:4)",
    feat1: "حصص فردية مباشرة",
    feat2: "مواعيد مرنة",
    feat3: "نرحب بغير العرب",
    feat4: "طلاب وطالبات",
    quoteText: "«خيركم من تعلَّم القرآن وعلَّمه.»",
    quoteCite: "(صحيح البخاري)",

    aboutEyebrow: "من أنا",
    aboutTitle: "رحلتي مع القرآن",
    aboutLead: "أُدرِّس القرآن كما يتمنى كل مبتدئ أن يُدرَّس: بتأنٍّ ودفء ومساحة آمنة للخطأ.",
    aboutP1:
      "علمتني رحلتي مع القرآن أن التلاوة الجميلة مهارة يستطيع أي شخص بناؤها — وليست موهبة حكرًا على الناطقين بالعربية. هذه القناعة هي ما قادتني إلى تعليم طلاب من جميع أنحاء العالم.",
    aboutP2:
      "واليوم أُدرِّس غير الناطقين بالعربية وأسر عرب المهجر عن بُعد، درسًا فرديًا لكل طالب. حصصي هادئة ومنظمة: نصحح شيئًا واحدًا في كل مرة، ونراجع باستمرار، ولا نستعجل أحدًا أبدًا.",
    aboutItem1: "صبر مع المبتدئين تمامًا",
    aboutItem2: "التجويد بكلمات بسيطة",
    aboutItem3: "خطة تناسب الأسبوع",

    teachEyebrow: "ماذا أُدرِّس",
    teachTitle: "أربع طرق أساعدك بها",
    teachSub: "جميع الدروس مباشرة وفردية وعن بُعد.",
    teachTag: "مباشر · فردي",
    teach1Title: "التجويد",
    teach1Desc: "شرح أحكام التجويد بكلمات بسيطة، ثم التدرب عليها في آيات حقيقية.",
    teach2Title: "تصحيح التلاوة",
    teach2Desc: "نصحح النطق والطلاقة آيةً بآية حتى تجري التلاوة بسلاسة.",
    teach3Title: "الحفظ (التحفيظ)",
    teach3Desc: "خطة حفظ ثابتة مع دورة مراجعة تحفظ ما حُفظ.",
    teach4Title: "القراءة العربية من الصفر",
    teach4Desc: "من الحروف العربية إلى القراءة الطليقة، بمخارج صحيحة من اليوم الأول.",

    pathsEyebrow: "المسارات",
    pathsTitle: "اختر مسارك",
    pathsSub: "مساران وهدف واحد: علاقة واثقة بالقرآن.",
    pathsTabCorrection: "تصحيح التلاوة",
    pathsTabHifz: "الحفظ",
    pathCorrTitle: "مسار تصحيح التلاوة",
    pathCorrDesc:
      "لمن يجيد قراءة العربية ويريد تلاوة صحيحة وجميلة.",
    pathCorrS1T: "تقييم التلاوة",
    pathCorrS1D: "أستمع إلى تلاوتك وأحدد كل موضع يحتاج إلى تصحيح.",
    pathCorrS2T: "تحديد نقاط الضعف",
    pathCorrS2D: "مخارج الحروف وأحكام التجويد التي تحتاج إلى تقوية.",
    pathCorrS3T: "خطة تصحيح منظمة",
    pathCorrS3D: "ترتيب واضح لما نصححه أولًا وكيف.",
    pathCorrS4T: "تدريب في كل حصة",
    pathCorrS4D: "تطبيق ومراجعة بتوجيه مباشر في كل لقاء.",
    pathHifzTitle: "مسار الحفظ",
    pathHifzDesc:
      "لمن يبدأ الحفظ أو يواصله — والمبتدئ تمامًا يبدأ من الحروف العربية.",
    pathHifzS1T: "تقييم نقطة البداية",
    pathHifzS1D: "من الحروف العربية إن لزم الأمر — من حيث أنت الآن.",
    pathHifzS2T: "أهداف حفظ واقعية",
    pathHifzS2D: "بالسورة أو بالجزء، وفق القدرة والوقت المتاح.",
    pathHifzS3T: "دورة مراجعة منظمة",
    pathHifzS3D: "حفظ جديد مع مراجعة يومية ثابتة.",
    pathHifzS4T: "متابعة التقدم بالأجزاء",
    pathHifzS4D: "محطات واضحة توضح التقدم أولًا بأول.",
    pathsCta: "لاختيار المسار المناسب: احجز اختبار مستوى مجاني",

    expEyebrow: "الخبرة",
    expTitle: "تعليم عن بُعد باهتمام شخصي",
    expLead: "دروس قرآن فردية لغير العرب وأسر المهجر — منظمة وصبورة ومنتظمة.",
    expP1:
      "أُدرِّس طلابًا من كل الأعمار عبر مناطق زمنية كثيرة، من المبتدئين تمامًا الذين يتعلمون حروفهم الأولى إلى المتقدمين الذين يصقلون تلاوتهم. لكل طالب خطة شخصية، وتنتهي كل حصة بشيء واضح للتدرب عليه.",
    expStat1Num: "فردي",
    expStat1Label: "حصص مباشرة خاصة",
    expStat2Num: "60 دقيقة",
    expStat2Label: "حصص مركزة بالساعة",
    expStat3Num: "1–3",
    expStat3Label: "حصص أسبوعيًا بالاختيار",
    expNote: "أسئلتكم عن الخلفية التعليمية مرحب بها في الحصة التجريبية.",

    pricingEyebrow: "الأسعار",
    pricingTitle: "أسعار بسيطة بالساعة",
    pricingSub: "اختر البرنامج المناسب — جميع الباقات تُحاسَب بالساعة دون أسعار شهرية ثابتة.",
    pack1Tag: "من الصفر",
    pack1Name: "التأسيس",
    pack1Desc: "الحروف العربية ومخارجها من الصفر تمامًا.",
    pack2Tag: "للقارئين",
    pack2Name: "إتقان التجويد",
    pack2Desc: "تصحيح مركّز لأحكام التجويد لمن يقرأ العربية.",
    pack3Tag: "كل المستويات",
    pack3Name: "برنامج الحفظ",
    pack3Desc: "حفظ تدريجي بالسورة أو بالجزء مع مراجعة منتظمة.",
    pack4Tag: "من 5 سنوات",
    pack4Name: "باقة الأطفال",
    pack4Desc: "البرنامج نفسه بإيقاع وأسلوب مناسبين للأطفال.",
    pack5Tag: "متقدم",
    pack5Name: "مسار الإجازة",
    pack5Desc: "تلاوة متقدمة لمن يعمل نحو إجازة رسمية.",
    // سطر السعر = قبل + [YOUR_HOURLY_RATE] + بعد. املأ الرقم لاحقًا.
    packPricePre: "تبدأ من $",
    packPricePost: " للساعة",
    packCta: "احجز التجريبية",
    billingFreqLabel: "عدد الحصص أسبوعيًا؟",
    freq1: "مرة أسبوعيًا",
    freq2: "مرتين أسبوعيًا",
    freq3: "ثلاث مرات أسبوعيًا",
    billingFormatLabel: "الشكل",
    fmtSolo: "فردي",
    fmtGroup: "مجموعة صغيرة",
    billingSummary:
      "{freq} · {format} — الدفع بالساعة، والجدول النهائي يُؤكَّد في الحصة التجريبية.",
    billingNote:
      "عدد الحصص وشكلها يحددان الجدول فقط — ولا يغيران سعر الساعة.",

    howEyebrow: "كيف نبدأ",
    howTitle: "ابدأ في أربع خطوات بسيطة",
    howSub: "من أول رسالة إلى الدروس المنتظمة.",
    how1Title: "1 · حجز حصة تجريبية",
    how1Desc: "إرسال النموذج أو رسالة واتساب — يستغرق الأمر دقيقة واحدة.",
    how2Title: "2 · تعارف وتقييم",
    how2Desc: "نتحدث عن الأهداف بينما أستمع إلى تلاوة قصيرة.",
    how3Title: "3 · استلام الخطة",
    how3Desc: "المسار والمواعيد والمواد — نتفق عليها معًا.",
    how4Title: "4 · التعلم كل أسبوع",
    how4Desc: "حصص مباشرة مع تدريب قصير بينها.",

    contactEyebrow: "التواصل / الحجز",
    contactTitle: "احجز حصتك التجريبية المجانية",
    contactSub: "املأ النموذج بالأسفل، أو تواصل عبر واتساب — الرد عادة خلال يوم.",
    formNameLabel: "الاسم",
    formNamePh: "مثال: أحمد / سارة",
    formEmailLabel: "البريد الإلكتروني",
    formEmailPh: "you@example.com",
    formWhatsappLabel: "رقم واتساب (اختياري)",
    formWhatsappPh: "مثال: +1 555 000 1234",
    formTrackLabel: "المسار المفضل",
    formTrackDefault: "اختر المسار…",
    formTrackCorr: "تصحيح التلاوة",
    formTrackHifz: "الحفظ",
    formTrackUnsure: "أحتاج مساعدة في الاختيار",
    formMsgLabel: "رسالتك",
    formMsgPh: "الأهداف والمستوى والأوقات المناسبة…",
    formSubmit: "إرسال طلب الحجز",
    formSending: "جارٍ الإرسال…",
    formNote: "بياناتك تُستخدم فقط لترتيب حصتك التجريبية.",
    formSuccess: "شكرًا لك! رسالتك في الطريق — سأرد عليك قريبًا إن شاء الله.",
    formError: "تعذر إرسال النموذج — يمكن مراسلتي واتساب مباشرة.",
    whatsappBadge: "الأسرع",
    whatsappLabel: "راسلني واتساب",
    whatsappSub: "أسرع طريقة للتواصل — اضغط لبدء المحادثة.",
    whatsappNumber: "واتساب: [YOUR_WHATSAPP_NUMBER]",
    contactAltTitle: "تفضّل البريد؟",
    contactEmail: "البريد: [YOUR_EMAIL]",

    faqEyebrow: "الأسئلة الشائعة",
    faqTitle: "أسئلة وأجوبتها",
    faqSub: "كل ما يسأله الطلاب عادة قبل الحصة التجريبية.",
    faq1Q: "هل أحتاج أن أعرف العربية مسبقًا؟",
    faq1A:
      "إطلاقًا. يبدأ المبتدئون تمامًا من الحروف العربية في برنامج التأسيس، ونتدرج حتى القراءة بمخارج صحيحة خطوة بخطوة. وأما من يجيد القراءة فيبدأ من مستواه الحالي.",
    faq2Q: "كم مدة الحصة، وكم مرة نلتقي؟",
    faq2A:
      "مدة الحصة ساعة واحدة، ويلتقي معظم الطلاب من مرة إلى ثلاث مرات أسبوعيًا، ويُحدَّد عدد الحصص في قسم الحجز أعلاه. اللقاء المنتظم القصير أنفع من الطويل المتباعد، خاصة في الحفظ.",
    faq3Q: "هل تدرّس الصغار والكبار؟",
    faq3A:
      "نعم — باقة الأطفال (من 5 سنوات) تقدم البرنامج نفسه بإيقاع يناسب الصغار، بينما يتعلم الكبار بإيقاع يناسب العمل والأسرة. المبتدئون والعائدون مرحب بهم في أي عمر.",
    faq4Q: "هل يوجد خصم للإخوة أو المجموعات؟",
    faq4A:
      "نعم — للإخوة الذين يتعلمون معًا والمجموعات الصغيرة أسعار مخفضة للطالب الواحد. يكفي ذكر ذلك في رسالة الحجز لنرتب معًا خطة تناسب الأسرة.",
    faq5Q: "ما المناطق الزمنية والمواعيد المتاحة؟",
    faq5A:
      "الدروس عن بُعد لطلاب في مناطق زمنية كثيرة، بمواعيد صباحية ومسائية. تكفي كتابة الأوقات المناسبة في نموذج الحجز لنجد معًا موعدًا أسبوعيًا ثابتًا.",
    faq6Q: "على أي منصة تكون الدروس؟",
    faq6A:
      "نلتقي مباشرة عبر زوم — ولا يُحتاج إلا إلى التطبيق المجاني وركن هادئ. يُرسَل رابط اللقاء قبل كل حصة مع الصفحات أو الملاحظات المستخدمة.",
    faq7Q: "ماذا يحدث في الحصة التجريبية؟",
    faq7A:
      "نتعارف: أستمع إلى التلاوة (أو نبدأ من الحروف)، ونتحدث عن الأهداف، ثم نضع معًا خطة شخصية واضحة. لا يوجد أي التزام — إنها ببساطة خير بداية.",

    footerTagline: "في خدمة متعلمي القرآن حول العالم.",
    footerExploreTitle: "استكشف",
    footerContactTitle: "تواصل",
    footerEmailPh: "[YOUR_EMAIL]",
    footerWhatsappPh: "واتساب: [YOUR_WHATSAPP_NUMBER]",
    footerRights: "© مُعلِّم القرآن · جميع الحقوق محفوظة.",
    footerNote: "صُنع بإخلاص ابتغاء وجه الله.",
  },
};

// Expose for script.js (plain script, no modules — keeps it framework-free).
window.translations = translations;
