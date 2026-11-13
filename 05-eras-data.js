/* ---------- ERAS + MORE CIVILIZATIONS AND FIGURES ---------- */
Object.assign(ART, {
  labrys: '<path d="M100 40V168M100 70C70 40 50 60 60 86C75 102 100 92 100 92M100 70C130 40 150 60 140 86C125 102 100 92 100 92"/>',
  temple: '<path d="M30 162H170M40 162V140H160V162M52 140V118H148V140M64 118V98H136V118M78 98V80H122V98M92 80V62H108V80M100 62V44"/>',
  fort: '<path d="M24 162H176V96H156V116H138V96H118V116H100V96H82V116H62V96H44V116H24ZM92 162V138a8 8 0 0 1 16 0V162M60 74H80V96M120 74H140V96M100 52V96"/>'
});
Object.assign(KEY, {minoan:['labrys',205],kush:['egypt',25],maurya:['ashoka',40],gupta:['ashoka',55],chola:['temple',22],abbasid:['ottoman',160],viking:['ship',215],maratha:['fort',15],songhai:['mali',30],meiji:['alexander',350],
  hammurabi:['cyrus',25],ramesses:['hatshepsut',30],hannibal:['joan',10],augustus:['caesar',350],aryabhata:['cosmos',245],charlemagne:['mansa',255],saladin:['suleiman',120],rajaraja:['temple',30],
  shivaji:['fort',18],galileo:['cosmos',220],gandhi:['ashoka',30],patel:['torch',22],einstein:['cosmos',205],curie:['moon',160],
  era0:['egypt',38],era1:['greece',215],era2:['byzantine',275],era3:['mughal',335],era4:['gear',350]});
const PERIODS = [
 {n:'The Ancient World', r:'c. 3500 – 500 BCE', b:'The first cities, the invention of writing and the great river-valley civilizations.', f:'era0', w:'Great_Pyramid_of_Giza'},
 {n:'The Classical Age', r:'500 BCE – 500 CE', b:'Empires and thinkers of Greece, Rome, Persia, India and China shape the ancient world.', f:'era1', w:'Parthenon'},
 {n:'The Medieval World', r:'500 – 1450 CE', b:'Caliphates, Mongol horsemen, Viking ships and rich trading empires link continents.', f:'era2', w:'Hagia_Sophia'},
 {n:'The Early Modern Age', r:'1450 – 1800 CE', b:'Gunpowder empires, great voyages and the Renaissance open a new age of exploration.', f:'era3', w:'Taj_Mahal'},
 {n:'The Modern World', r:'1800 CE – today', b:'Revolutions, independence movements and science reshape the modern world.', f:'era4', w:'Statue_of_Unity'}
];
const ERA_OF = {};
[['Mesopotamia','Ancient Egypt','Indus Valley Civilization','Minoan Civilization','Kingdom of Kush','Hammurabi','Hatshepsut','Ramesses II','Cyrus the Great'],
 ['Ancient Greece','Roman Empire','Persian Empire','Ancient China','Maurya Empire','Gupta Empire','Confucius','Alexander the Great','Julius Caesar','Cleopatra VII','Ashoka the Great','Qin Shi Huang','Hannibal','Augustus','Aryabhata'],
 ['Byzantine Empire','Mongol Empire','Mali Empire','Khmer Empire','Mayan Civilization','Chola Empire','Abbasid Caliphate','Viking Age','Genghis Khan','Mansa Musa','Joan of Arc','Charlemagne','Saladin','Rajaraja Chola I'],
 ['Ottoman Empire','Aztec Empire','Inca Empire','Mughal Empire','Maratha Empire','Songhai Empire','Leonardo da Vinci','Suleiman the Magnificent','Akbar','Shivaji','Galileo Galilei'],
 ['Meiji Japan','Mahatma Gandhi','Sardar Vallabhbhai Patel','Albert Einstein','Marie Curie']
].forEach((list, i) => list.forEach(n => ERA_OF[n] = i));
civs.push(
 {n:'Minoan Civilization', p:'c. 3000 – 1100 BCE', f:'minoan', w:'Knossos', s:'A Bronze Age sea-trading culture on the island of Crete.',
  d:['The Minoans lived on Crete and traded across the eastern Mediterranean. Their large palace complexes, such as Knossos, had storerooms, workshops and vivid wall paintings.','Linear B, a later script found on Crete, records an early form of Greek, while Linear A is still undeciphered. Minoan power declined after about 1450 BCE, and the causes, including volcanic eruption and invasion, are still debated.']},
 {n:'Kingdom of Kush', p:'c. 1070 BCE – 350 CE', f:'kush', w:'Meroë', s:'A powerful Nubian kingdom south of Egypt that once ruled it.',
  d:['Kush grew along the Nile in what is now Sudan, with capitals at Napata and later Meroë. Its kings, known as the Twenty-fifth Dynasty, ruled Egypt from about 744 to 656 BCE.','Meroë became a centre of iron working and trade. Kushite rulers built many pyramids, and the Meroitic script is only partly understood.']},
 {n:'Maurya Empire', p:'322 – 185 BCE', f:'maurya', w:'Sanchi', s:"India's first great empire, united under Chandragupta and Ashoka.",
  d:['Chandragupta Maurya founded the empire around 322 BCE from its capital Pataliputra, with the help of his adviser Kautilya, traditionally linked to the Arthashastra, a text on statecraft.','Under his grandson Ashoka, it covered most of the subcontinent. After Ashoka died around 232 BCE the empire weakened and ended around 185 BCE.']},
 {n:'Gupta Empire', p:'c. 320 – 550 CE', f:'gupta', w:'Nalanda', s:'A golden age of Indian science, mathematics and art.',
  d:['Founded by Chandragupta I around 320 CE, the Gupta Empire ruled much of northern India from Pataliputra. Rulers such as Samudragupta and Chandragupta II expanded it and supported learning.','Scholars of the era advanced mathematics and astronomy, including the decimal place-value system and the use of zero as a number. Invasions and internal weakness ended the empire by about 550 CE.']},
 {n:'Chola Empire', p:'c. 848 – 1279 CE', f:'chola', w:'Brihadisvara_Temple,_Thanjavur', s:'South Indian naval power and temple-builders.',
  d:['The medieval Chola dynasty rose from Thanjavur around 848 CE. Under Rajaraja I and his son Rajendra I, it ruled much of southern India and Sri Lanka, and its navy reached Southeast Asia.','The Cholas built great Shiva temples, including the Brihadisvara Temple at Thanjavur, completed around 1010 CE, and were famed for bronze sculpture such as Nataraja images.']},
 {n:'Abbasid Caliphate', p:'750 – 1258 CE', f:'abbasid', w:'House_of_Wisdom', s:'A caliphate whose capital Baghdad became a world centre of learning.',
  d:["The Abbasids took power from the Umayyads in 750 CE and founded Baghdad in 762 as their capital. Under caliphs such as Harun al-Rashid and al-Ma'mun, it became one of the largest cities in the world.",'Scholars in Baghdad translated Greek, Persian and Indian texts into Arabic and advanced mathematics, medicine, astronomy and optics. The caliphate lost real power over time, and Baghdad fell to the Mongols in 1258.']},
 {n:'Viking Age', p:'c. 793 – 1066 CE', f:'viking', w:'Oseberg_ship', s:'Norse seafarers, raiders, traders and settlers.',
  d:['The Viking Age is usually dated from the raid on Lindisfarne in 793 CE. Norse people from Scandinavia sailed in fast longships as raiders, traders and settlers.','They reached Iceland, Greenland and, around 1000 CE, North America, and also travelled along Russian rivers to Constantinople. The age is often said to end in 1066, when the Norwegian king Harald Hardrada died at Stamford Bridge.']},
 {n:'Maratha Empire', p:'1674 – 1818 CE', f:'maratha', w:'Raigad_Fort', s:'A Deccan power that challenged Mughal rule and grew across India.',
  d:['Shivaji Bhonsle was crowned Chhatrapati at Raigad in 1674, founding an independent Maratha state in the Western Ghats region. His forts, light cavalry and navy helped resist the Mughals and other powers.','Under later Peshwas, Maratha influence spread across much of India in the 18th century. The empire was weakened by defeat at Panipat in 1761 and ended after the Third Anglo-Maratha War in 1818.']},
 {n:'Songhai Empire', p:'c. 1464 – 1591 CE', f:'songhai', w:'Tomb_of_Askia', s:'The largest empire in West African history.',
  d:['Songhai rose from the city of Gao and, under Sunni Ali (r. 1464–1492), took Timbuktu and Djenné. Askia Muhammad (r. 1493–1528) built an efficient administration and supported Islamic learning.','The empire grew rich from the trans-Saharan gold and salt trade. It fell in 1591 after a Moroccan army armed with firearms defeated it at the Battle of Tondibi.']},
 {n:'Meiji Japan', p:'1868 – 1912 CE', f:'meiji', w:'Meiji_Restoration', s:"Japan's rapid transformation into a modern industrial state.",
  d:['In 1868 the Meiji Restoration ended the rule of the Tokugawa shoguns and returned power to Emperor Meiji. The capital moved from Kyoto to Tokyo.','The government built railways, factories, schools and a modern army and navy, and adopted a constitution in 1889. Japan became an industrial power within a few decades, with lasting effects across Asia.']}
);
figures.push(
 {n:'Hammurabi', t:'King of Babylon', e:'r. c. 1792 – 1750 BCE', f:'hammurabi', w:'Hammurabi', s:'Babylonian king remembered for his law code.',
  d:['Hammurabi became king of Babylon and, through conquest and diplomacy, united much of Mesopotamia under Babylonian rule.','His law code, carved on a basalt stele now in the Louvre, set out about 280 laws on trade, property and family, with penalties that depended on a person\'s social status.']},
 {n:'Ramesses II', t:'Pharaoh of Egypt', e:'c. 1303 – 1213 BCE', f:'ramesses', w:'Ramesses_II', s:"One of Egypt's longest-reigning and most celebrated pharaohs.",
  d:['Ramesses II ruled for about 66 years (c. 1279–1213 BCE) and led Egypt against the Hittites at the Battle of Kadesh.','He built or expanded many monuments, including the temples at Abu Simbel and the Ramesseum, and later signed one of the earliest known peace treaties with the Hittites.']},
 {n:'Hannibal', t:'Carthaginian general', e:'247 – c. 183 BCE', f:'hannibal', w:'Hannibal', s:'Led an army with war elephants over the Alps against Rome.',
  d:['Hannibal commanded Carthaginian forces in the Second Punic War. In 218 BCE he led an army, including war elephants, from Spain across the Alps into Italy.','He won major victories, including Cannae in 216 BCE, but could not take Rome. Carthage was defeated at Zama in 202 BCE, and Hannibal died in exile around 183 BCE.']},
 {n:'Augustus', t:'First Roman emperor', e:'63 BCE – 14 CE', f:'augustus', w:'Augustus_of_Prima_Porta', s:'Ended the civil wars and founded the Roman Empire.',
  d:["Born Gaius Octavius, he was Julius Caesar's grand-nephew and adopted heir. After defeating Mark Antony and Cleopatra at Actium in 31 BCE, he became the sole ruler of Rome.",'In 27 BCE the Senate gave him the title Augustus. He reformed the army, taxes and provinces and ruled until 14 CE, beginning a long period of relative peace.']},
 {n:'Aryabhata', t:'Mathematician and astronomer', e:'476 – c. 550 CE', f:'aryabhata', w:'Aryabhata', s:'Indian scholar of the Gupta era who wrote the Aryabhatiya.',
  d:['Aryabhata was born in 476 CE and wrote the Aryabhatiya in 499 CE, a short Sanskrit work on mathematics and astronomy.','It gave an approximation of pi close to 3.1416, methods for square and cube roots, and the idea that the Earth rotates on its axis, which explains the apparent motion of the stars.']},
 {n:'Charlemagne', t:'King of the Franks and Emperor', e:'748 – 814 CE', f:'charlemagne', w:'Charlemagne', s:'United much of Western Europe and was crowned emperor in 800.',
  d:['Charlemagne became king of the Franks in 768 and expanded his realm across much of Western and Central Europe through long campaigns.','Pope Leo III crowned him emperor in Rome on Christmas Day, 800 CE. He supported scholars and schools, and the revival of learning at his court is called the Carolingian Renaissance.']},
 {n:'Saladin', t:'Sultan of Egypt and Syria', e:'c. 1137 – 1193 CE', f:'saladin', w:'Saladin', s:'Founded the Ayyubid dynasty and recaptured Jerusalem in 1187.',
  d:['Saladin (Salah ad-Din) was born in Tikrit and rose in the service of the Zengid rulers. He took control of Egypt in the 1170s and later united Egypt and Syria.','In 1187 he defeated the Crusaders at the Battle of Hattin and recaptured Jerusalem. He later agreed a truce with Richard the Lionheart and was respected even by opponents for his conduct.']},
 {n:'Rajaraja Chola I', t:'Emperor of the Chola Empire', e:'c. 947 – 1014 CE', f:'rajaraja', w:'Rajaraja_I', s:'Built the Chola state into a major land and sea power.',
  d:['Rajaraja I became king in 985 CE and expanded the Chola Empire across southern India and into northern Sri Lanka.','He built the Brihadisvara Temple at Thanjavur, completed around 1010 CE, and organised land surveys and a detailed local administration.']},
 {n:'Shivaji', t:'Founder of the Maratha Empire', e:'1630 – 1680 CE', f:'shivaji', w:'Shivaji', s:'Founded an independent Maratha state and was crowned Chhatrapati in 1674.',
  d:['Shivaji Bhonsle was born in 1630 at Shivneri Fort. He captured forts from the Adil Shahi and Mughal rulers and built a state in western India using fast, flexible warfare.','He was crowned Chhatrapati at Raigad in 1674. He set up a council of ministers, a navy and a revenue system, and is remembered across India, especially in Maharashtra.']},
 {n:'Galileo Galilei', t:'Astronomer and physicist', e:'1564 – 1642 CE', f:'galileo', w:'Galileo_Galilei', s:'Used the telescope to reveal the heavens in a new way.',
  d:["Galileo, born in Pisa, improved the telescope and in 1609–1610 observed the Moon's mountains, the phases of Venus and four large moons of Jupiter.",'His support for the Sun-centred model of Copernicus led to a trial by the Inquisition in 1633, and he spent his last years under house arrest. His methods helped found modern experimental science.']},
 {n:'Mahatma Gandhi', t:"Leader of India's independence movement", e:'1869 – 1948 CE', f:'gandhi', w:'Mahatma_Gandhi', s:'Led non-violent resistance that helped end British rule in India.',
  d:['Mohandas Karamchand Gandhi was born in Porbandar, Gujarat, in 1869. He trained as a lawyer in London and developed his method of non-violent resistance, satyagraha, in South Africa.','Returning to India in 1915, he led campaigns including the Salt March of 1930, which began at Sabarmati Ashram in Ahmedabad and ended at Dandi. India became independent in 1947, and Gandhi was assassinated in Delhi on 30 January 1948.']},
 {n:'Sardar Vallabhbhai Patel', t:'Statesman and first Deputy Prime Minister of India', e:'1875 – 1950 CE', f:'patel', w:'Vallabhbhai_Patel', s:'The “Iron Man of India” who unified the princely states.',
  d:['Born in Nadiad, Gujarat, Patel became a leading barrister and a key figure in the Indian National Congress. He led the 1928 Bardoli satyagraha, which earned him the title “Sardar”.',"After 1947 he served as India's first Deputy Prime Minister and Home Minister, and persuaded and pressed more than 500 princely states to join the Indian Union. The Statue of Unity in Gujarat is dedicated to him."]},
 {n:'Albert Einstein', t:'Theoretical physicist', e:'1879 – 1955 CE', f:'einstein', w:'Albert_Einstein', s:'Developed the theory of relativity and changed modern physics.',
  d:['Born in Ulm, Germany, Einstein published four groundbreaking papers in 1905, including work on the photoelectric effect, Brownian motion and special relativity, which included the famous equation E = mc².','In 1915 he completed general relativity, a new theory of gravity that was supported by observations of starlight during the 1919 solar eclipse. He was awarded the 1921 Nobel Prize in Physics for the photoelectric effect.']},
 {n:'Marie Curie', t:'Physicist and chemist', e:'1867 – 1934 CE', f:'curie', w:'Marie_Curie', s:'The first person to win Nobel Prizes in two different sciences.',
  d:['Born Maria Skłodowska in Warsaw, she moved to Paris to study. With her husband Pierre she studied radioactivity, a term she coined, and discovered the elements polonium and radium.','She won the Nobel Prize in Physics in 1903, shared with Pierre Curie and Henri Becquerel, and the Nobel Prize in Chemistry in 1911. During World War I she helped develop mobile X-ray units for field hospitals.']}
);
Object.assign(MORE, {
 'Minoan Civilization': "Arthur Evans began excavating Knossos in 1900. The legend of the Minotaur's labyrinth is often linked to the palace, though the link is speculative.",
 'Kingdom of Kush': "Sudan has more pyramids than Egypt, though the Kushite ones are smaller and steeper.",
 'Maurya Empire': "Megasthenes, a Greek envoy to Chandragupta's court, wrote an account of India called the Indica; only fragments survive.",
 'Gupta Empire': "Nalanda, which grew with Gupta support, became one of the world's earliest large centres of learning.",
 'Chola Empire': "The tower (vimana) of the Brihadisvara Temple rises about 66 metres and is built largely of granite.",
 'Abbasid Caliphate': "The mathematician al-Khwarizmi, who worked in Baghdad, gave us the word “algorithm” through the Latin form of his name.",
 'Viking Age': "Norse buildings at L'Anse aux Meadows in Newfoundland, dated to about 1000 CE, are the earliest confirmed European presence in North America.",
 'Maratha Empire': "Maratha forts such as Raigad, Sinhagad and Pratapgad, mostly on hilltops, were central to its defence.",
 'Songhai Empire': "Timbuktu's Sankore mosque-university was a centre of scholarship during Songhai rule.",
 'Meiji Japan': "Within about 30 years Japan built a railway network and a modern school system, and sent students abroad to study Western science and law.",
 'Hammurabi': "The stele of the Code of Hammurabi was found at Susa in 1901–02 and is now in the Louvre in Paris.",
 'Ramesses II': "The Abu Simbel temples were moved to higher ground in the 1960s to save them from the rising waters of Lake Nasser.",
 'Hannibal': "Hannibal's double-envelopment tactic at Cannae is still studied in military academies.",
 'Augustus': "The month of August is named after him.",
 'Aryabhata': "India's first satellite, launched in 1975, was named Aryabhata in his honour.",
 'Charlemagne': "He promoted a clear handwriting style, Carolingian minuscule, which later shaped the lower-case letters we use today.",
 'Saladin': "Europeans admired him as a model of chivalry, and the Ayyubid dynasty he founded ruled Egypt until 1250.",
 'Rajaraja Chola I': "The Brihadisvara Temple, a UNESCO World Heritage Site, is part of the “Great Living Chola Temples”.",
 'Shivaji': "He is credited with building a navy to guard the Konkan coast, and the sea fort of Sindhudurg was built under him around 1664–67.",
 'Galileo Galilei': "In 1992 the Catholic Church formally acknowledged that its handling of Galileo's case had been mistaken.",
 'Mahatma Gandhi': "His birthday, 2 October, is observed as Gandhi Jayanti in India and as the International Day of Non-Violence worldwide.",
 'Sardar Vallabhbhai Patel': "The Statue of Unity, unveiled in 2018, is about 182 metres tall and is among the tallest statues in the world.",
 'Albert Einstein': "He moved to the United States in 1933 and worked at the Institute for Advanced Study in Princeton until his death.",
 'Marie Curie': "She remains the only person to have won Nobel Prizes in two different scientific fields."
});
Object.assign(TR.gu.c, {
 'Minoan Civilization':['મિનોઅન સંસ્કૃતિ','આશરે ઇ.સ.પૂ. 3000 – 1100','ક્રીટ ટાપુ પરની કાંસ્ય યુગની દરિયાઈ વેપારી સંસ્કૃતિ.','આર્થર ઇવાન્સે 1900માં નોસોસનું ખોદકામ શરૂ કર્યું. મિનોટોરના ભુલભુલામણીની દંતકથાને ઘણી વાર આ મહેલ સાથે જોડવામાં આવે છે, જોકે આ જોડાણ અનુમાનિત છે.'],
 'Kingdom of Kush':['કુશનું રાજ્ય','આશરે ઇ.સ.પૂ. 1070 – ઇ.સ. 350','ઇજિપ્તની દક્ષિણે આવેલું શક્તિશાળી નુબિયન રાજ્ય, જેણે એક સમયે ઇજિપ્ત પર શાસન કર્યું.','સુદાનમાં ઇજિપ્ત કરતાં વધુ પિરામિડ છે, જોકે કુશના પિરામિડ નાના અને વધુ ઢાળવાળા છે.'],
 'Maurya Empire':['મૌર્ય સામ્રાજ્ય','ઇ.સ.પૂ. 322 – 185','ચંદ્રગુપ્ત અને અશોક હેઠળ એક થયેલું ભારતનું પ્રથમ મહાન સામ્રાજ્ય.','ચંદ્રગુપ્તના દરબારમાં ગ્રીક રાજદૂત મેગેસ્થેનિસે “ઇન્ડિકા” નામે ભારતનું વર્ણન લખ્યું; તેના માત્ર અંશો ટકી રહ્યા છે.'],
 'Gupta Empire':['ગુપ્ત સામ્રાજ્ય','આશરે ઇ.સ. 320 – 550','ભારતીય વિજ્ઞાન, ગણિત અને કલાનો સુવર્ણ યુગ.','ગુપ્તોના ટેકાથી વિકસેલું નાલંદા વિશ્વનાં સૌથી પ્રારંભિક મોટાં વિદ્યા-કેન્દ્રોમાંનું એક બન્યું.'],
 'Chola Empire':['ચોલ સામ્રાજ્ય','આશરે ઇ.સ. 848 – 1279','દક્ષિણ ભારતની નૌકા સત્તા અને મંદિર-નિર્માતાઓ.','બૃહદીશ્વર મંદિરનું શિખર (વિમાન) આશરે 66 મીટર ઊંચું છે અને મુખ્યત્વે ગ્રેનાઇટથી બનેલું છે.'],
 'Abbasid Caliphate':['અબ્બાસી ખિલાફત','ઇ.સ. 750 – 1258','એવી ખિલાફત, જેની રાજધાની બગદાદ જ્ઞાનનું વિશ્વ-કેન્દ્ર બની.','બગદાદમાં કામ કરતા ગણિતશાસ્ત્રી અલ-ખ્વારિઝ્મીના નામના લેટિન રૂપ પરથી “અલ્ગોરિધમ” શબ્દ આવ્યો.'],
 'Viking Age':['વાઇકિંગ યુગ','આશરે ઇ.સ. 793 – 1066','નોર્સ નાવિકો, લૂંટારા, વેપારીઓ અને વસાહતીઓ.','કેનેડાના ન્યૂફાઉન્ડલેન્ડમાં લ’આન્સ ઓ મીડોઝ ખાતે આશરે ઇ.સ. 1000ની નોર્સ ઇમારતો મળી છે; ઉત્તર અમેરિકામાં યુરોપિયન હાજરીનો તે સૌથી જૂનો પુષ્ટ પુરાવો છે.'],
 'Maratha Empire':['મરાઠા સામ્રાજ્ય','ઇ.સ. 1674 – 1818','મુઘલ શાસનને પડકારનાર અને સમગ્ર ભારતમાં વિસ્તરેલી ડેક્કનની સત્તા.','રાયગઢ, સિંહગઢ અને પ્રતાપગઢ જેવા મરાઠા કિલ્લા, મોટા ભાગે પહાડી ટોચ પર, તેના સંરક્ષણનું કેન્દ્ર હતા.'],
 'Songhai Empire':['સોંગહાઈ સામ્રાજ્ય','આશરે ઇ.સ. 1464 – 1591','પશ્ચિમ આફ્રિકાના ઇતિહાસનું સૌથી મોટું સામ્રાજ્ય.','તિમ્બક્ટુની સાંકોરે મસ્જિદ-વિશ્વવિદ્યાલય સોંગહાઈ શાસન દરમિયાન વિદ્વત્તાનું કેન્દ્ર હતી.'],
 'Meiji Japan':['મેઇજી જાપાન','ઇ.સ. 1868 – 1912','જાપાનનું ઝડપથી આધુનિક ઔદ્યોગિક રાજ્યમાં રૂપાંતર.','આશરે 30 વર્ષમાં જાપાને રેલવે નેટવર્ક અને આધુનિક શિક્ષણ-વ્યવસ્થા બનાવી, અને પશ્ચિમી વિજ્ઞાન અને કાયદાના અભ્યાસ માટે વિદ્યાર્થીઓને વિદેશ મોકલ્યા.']
});
Object.assign(TR.gu.f, {
 'Hammurabi':['હમ્મુરાબી','બેબિલોનનો રાજા','શાસન આશરે ઇ.સ.પૂ. 1792 – 1750','પોતાની કાયદા-સંહિતા માટે યાદ કરાતો બેબિલોનિયન રાજા.','હમ્મુરાબીની સંહિતાનો સ્તંભ 1901–02માં સુસા ખાતેથી મળ્યો હતો અને હવે પેરિસના લુવ્રમાં છે.'],
 'Ramesses II':['રામેસસ બીજા','ઇજિપ્તના ફારુન','આશરે ઇ.સ.પૂ. 1303 – 1213','ઇજિપ્તના સૌથી લાંબા શાસન કરનાર અને પ્રસિદ્ધ ફારુનોમાંના એક.','1960ના દાયકામાં નાસર સરોવરના વધતા પાણીથી બચાવવા અબુ સિમ્બેલનાં મંદિરોને ઊંચા સ્થળે ખસેડાયાં.'],
 'Hannibal':['હેનિબાલ','કાર્થેજનો સેનાપતિ','ઇ.સ.પૂ. 247 – આશરે 183','યુદ્ધ-હાથીઓ સાથેની સેના લઈ આલ્પ્સ પાર કરી રોમ સામે લડનાર.','કાન્નાઈ ખાતે હેનિબાલની ઘેરાબંધીની રણનીતિનો અભ્યાસ આજે પણ લશ્કરી અકાદમીઓમાં થાય છે.'],
 'Augustus':['ઓગસ્ટસ','પ્રથમ રોમન સમ્રાટ','ઇ.સ.પૂ. 63 – ઇ.સ. 14','ગૃહયુદ્ધો પૂરાં કરી રોમન સામ્રાજ્યની સ્થાપના કરનાર.','ઓગસ્ટ મહિનાનું નામ તેમના પરથી પડ્યું.'],
 'Aryabhata':['આર્યભટ્ટ','ગણિતશાસ્ત્રી અને ખગોળશાસ્ત્રી','ઇ.સ. 476 – આશરે 550','ગુપ્ત યુગના ભારતીય વિદ્વાન, જેમણે “આર્યભટીય” લખ્યું.','ભારતનો પ્રથમ ઉપગ્રહ, જે 1975માં છોડાયો, તેમના સન્માનમાં “આર્યભટ્ટ” નામે ઓળખાયો.'],
 'Charlemagne':['શાર્લમેન','ફ્રેન્કનો રાજા અને સમ્રાટ','ઇ.સ. 748 – 814','પશ્ચિમ યુરોપના મોટા ભાગને એક કરી ઇ.સ. 800માં સમ્રાટ તરીકે તાજપોશી પામ્યા.','તેમણે “કેરોલિંગિયન માઇનસ્ક્યુલ” નામની સ્પષ્ટ લેખનશૈલી પ્રોત્સાહિત કરી, જેણે આજના નાના અક્ષરોને આકાર આપ્યો.'],
 'Saladin':['સલાહુદ્દીન','ઇજિપ્ત અને સીરિયાના સુલતાન','આશરે ઇ.સ. 1137 – 1193','અય્યુબી વંશના સ્થાપક, જેમણે 1187માં જેરુસલેમ પાછું મેળવ્યું.','યુરોપિયનો તેમને શૌર્યના આદર્શ તરીકે માનતા, અને તેમણે સ્થાપેલા અય્યુબી વંશે ઇજિપ્ત પર 1250 સુધી શાસન કર્યું.'],
 'Rajaraja Chola I':['પ્રથમ રાજરાજ ચોલ','ચોલ સામ્રાજ્યના સમ્રાટ','આશરે ઇ.સ. 947 – 1014','ચોલ રાજ્યને મોટી ભૂમિ અને નૌકા સત્તા બનાવનાર.','યુનેસ્કો વિશ્વ વારસા સ્થળ બૃહદીશ્વર મંદિર “ગ્રેટ લિવિંગ ચોલ ટેમ્પલ્સ”નો ભાગ છે.'],
 'Shivaji':['છત્રપતિ શિવાજી','મરાઠા સામ્રાજ્યના સ્થાપક','ઇ.સ. 1630 – 1680','સ્વતંત્ર મરાઠા રાજ્યની સ્થાપના કરી અને 1674માં છત્રપતિ તરીકે રાજ્યાભિષેક પામ્યા.','કોંકણ કિનારાના રક્ષણ માટે તેમણે નૌકાદળ બનાવ્યું, અને સિંધુદુર્ગ દરિયાઈ કિલ્લો તેમના હેઠળ આશરે 1664–67માં બંધાયો.'],
 'Galileo Galilei':['ગેલિલિયો ગેલિલી','ખગોળશાસ્ત્રી અને ભૌતિકશાસ્ત્રી','ઇ.સ. 1564 – 1642','દૂરબીનથી આકાશને નવી દૃષ્ટિએ દર્શાવનાર.','1992માં કૅથલિક ચર્ચે સ્વીકાર્યું કે ગેલિલિયોના કેસને સંભાળવામાં તેની ભૂલ થઈ હતી.'],
 'Mahatma Gandhi':['મહાત્મા ગાંધી','ભારતના સ્વતંત્રતા આંદોલનના નેતા','ઇ.સ. 1869 – 1948','અહિંસક પ્રતિકાર દ્વારા ભારતમાં બ્રિટિશ શાસનનો અંત લાવવામાં મદદ કરનાર નેતા.','તેમનો જન્મદિન 2 ઑક્ટોબર ભારતમાં ગાંધી જયંતી તરીકે અને વિશ્વભરમાં આંતરરાષ્ટ્રીય અહિંસા દિવસ તરીકે ઊજવાય છે.'],
 'Sardar Vallabhbhai Patel':['સરદાર વલ્લભભાઈ પટેલ','ભારતના પ્રથમ નાયબ વડા પ્રધાન અને રાજપુરુષ','ઇ.સ. 1875 – 1950','“ભારતના લોહપુરુષ”, જેમણે દેશી રજવાડાંઓને એક કર્યાં.','2018માં અનાવરણ થયેલી સ્ટેચ્યુ ઑફ યુનિટી આશરે 182 મીટર ઊંચી છે અને વિશ્વની સૌથી ઊંચી પ્રતિમાઓમાંની એક છે.'],
 'Albert Einstein':['આલ્બર્ટ આઇન્સ્ટાઇન','સૈદ્ધાંતિક ભૌતિકશાસ્ત્રી','ઇ.સ. 1879 – 1955','સાપેક્ષતાનો સિદ્ધાંત આપી આધુનિક ભૌતિકશાસ્ત્ર બદલનાર.','તેઓ 1933માં અમેરિકા ગયા અને મૃત્યુ સુધી પ્રિન્સ્ટનની ઇન્સ્ટિટ્યૂટ ફૉર ઍડ્વાન્સ્ડ સ્ટડીમાં કામ કર્યું.'],
 'Marie Curie':['મેરી ક્યુરી','ભૌતિકશાસ્ત્રી અને રસાયણશાસ્ત્રી','ઇ.સ. 1867 – 1934','બે જુદા વિજ્ઞાનોમાં નોબેલ પારિતોષિક જીતનાર પ્રથમ વ્યક્તિ.','તે આજે પણ બે જુદાં વૈજ્ઞાનિક ક્ષેત્રોમાં નોબેલ પારિતોષિક જીતનાર એકમાત્ર વ્યક્તિ છે.']
});
Object.assign(TR.gu.ui, {
 'Eras':'યુગો','Explore History by Era':'યુગો પ્રમાણે ઇતિહાસ શોધો',
 'Five great ages of history. Choose an era to open its gate and meet its civilizations and people.':'ઇતિહાસના પાંચ મહાન યુગો. કોઈ યુગ પસંદ કરી તેનો દરવાજો ખોલો અને તેની સંસ્કૃતિઓ તથા વ્યક્તિઓને મળો.',
 'All eras':'બધા યુગો','Entering':'પ્રવેશ','civilizations':'સંસ્કૃતિઓ','figures':'વ્યક્તિઓ',
 'The Ancient World':'પ્રાચીન વિશ્વ','The Classical Age':'શાસ્ત્રીય યુગ','The Medieval World':'મધ્યયુગીન વિશ્વ','The Early Modern Age':'પ્રારંભિક આધુનિક યુગ','The Modern World':'આધુનિક વિશ્વ',
 'c. 3500 – 500 BCE':'આશરે ઇ.સ.પૂ. 3500 – 500','500 BCE – 500 CE':'ઇ.સ.પૂ. 500 – ઇ.સ. 500','500 – 1450 CE':'ઇ.સ. 500 – 1450','1450 – 1800 CE':'ઇ.સ. 1450 – 1800','1800 CE – today':'ઇ.સ. 1800 – આજ સુધી',
 'The first cities, the invention of writing and the great river-valley civilizations.':'પ્રથમ શહેરો, લેખનની શોધ અને મહાન નદી-ખીણ સંસ્કૃતિઓ.',
 'Empires and thinkers of Greece, Rome, Persia, India and China shape the ancient world.':'ગ્રીસ, રોમ, પર્શિયા, ભારત અને ચીનનાં સામ્રાજ્યો અને ચિંતકો પ્રાચીન વિશ્વને ઘડે છે.',
 'Caliphates, Mongol horsemen, Viking ships and rich trading empires link continents.':'ખલીફાતો, મોંગોલ ઘોડેસવારો, વાઇકિંગ જહાજો અને સમૃદ્ધ વેપારી સામ્રાજ્યો ખંડોને જોડે છે.',
 'Gunpowder empires, great voyages and the Renaissance open a new age of exploration.':'ગનપાઉડર સામ્રાજ્યો, મહાન સફરો અને પુનરુજ્જીવન શોધખોળના નવા યુગની શરૂઆત કરે છે.',
 'Revolutions, independence movements and science reshape the modern world.':'ક્રાંતિઓ, સ્વતંત્રતા ચળવળો અને વિજ્ઞાન આધુનિક વિશ્વને નવો આકાર આપે છે.'
});

