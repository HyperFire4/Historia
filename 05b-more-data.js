/* ============ UPDATE 8: more civilizations and people ============
   To add your own later, copy one line in addC (civilization) or addF (person) below and edit it.
   The photo comes from the Wikipedia article named in the 'photo' field; the gold emblem shows until it loads. */
Object.assign(ART, {
  crown: '<path d="M42 140L32 76L72 106L100 60L128 106L168 76L158 140Z"/><path d="M42 156H158"/><circle cx="32" cy="70" r="5"/><circle cx="100" cy="52" r="5"/><circle cx="168" cy="70" r="5"/>',
  scroll: '<path d="M60 52H146a10 10 0 0 1 10 10V132a22 22 0 0 1-22 22H66a14 14 0 0 1-14-14V60a8 8 0 0 1 8-8Z"/><path d="M52 140a14 14 0 0 0 14 14M76 82H134M76 104H134M76 126H116"/>',
  star: '<circle cx="100" cy="100" r="40"/><circle cx="100" cy="100" r="6"/>' + R(16, (i, a) => `<path d="M${100+50*Math.cos(a)} ${100+50*Math.sin(a)}L${100+(i%2?64:80)*Math.cos(a)} ${100+(i%2?64:80)*Math.sin(a)}"/>`),
  compass: '<circle cx="100" cy="100" r="64"/><circle cx="100" cy="100" r="54"/><path d="M100 36V52M100 148V164M36 100H52M148 100H164M126 74L110 110L74 126L90 90Z"/>',
  ship: '<path d="M36 124H164L146 152H54Z"/><path d="M100 124V44M100 52L146 118H100M100 62L62 118H100"/>',
  arch: '<path d="M36 160V98a64 64 0 0 1 128 0V160M68 160V102a32 32 0 0 1 64 0V160M24 160H176M100 34V46"/>'
});
const EMB = {phoenicia:['ship',195], olmec:['maya',130], assyria:['mesopotamia',20], carthage:['ship',5], parthia:['arch',260], aksum:['arch',75],
  teotihuacan:['maya',300], srivijaya:['ship',170], zimbabwe:['mesopotamia',100], song:['china',160], safavid:['ottoman',210], tokugawa:['china',340],
  nefertiti:['crown',310], tutankhamun:['crown',45], pericles:['greece',215], socrates:['scroll',235], chanakya:['scroll',28], hypatia:['star',190],
  khwarizmi:['scroll',150], battuta:['compass',25], kublai:['crown',225], razia:['crown',350], avicenna:['scroll',120],
  copernicus:['star',50], newton:['star',210], elizabeth:['crown',330], tipu:['crown',140], napoleon:['crown',230],
  vivekananda:['scroll',20], ambedkar:['scroll',215], tagore:['scroll',280], ramanujan:['star',110], mandela:['scroll',60]};
const EXTRA_MORE = {};
const addC = (era, n, p, f, w, s, d1, d2, more, lat, lon, at, centres, known, legacy) => {
  KEY[f] = EMB[f] || ['egypt', 38];
  civs.push({n, p, f, w, s, d: [d1, d2]}); ERA_OF[n] = era; MORE[n] = more;
  EXTRA_MORE[n] = {lat, lon, at, tiles: [['Major centres', centres], ['Known for', known], ['Legacy', legacy]]};
};
const addF = (era, n, t, e, f, w, s, d1, d2, more, lat, lon, at, bl, born, known, legacy) => {
  KEY[f] = EMB[f] || ['egypt', 38];
  figures.push({n, t, e, f, w, s, d: [d1, d2]}); ERA_OF[n] = era; MORE[n] = more;
  EXTRA_MORE[n] = {lat, lon, at, tiles: [[bl, born], ['Known for', known], ['Legacy', legacy]]};
};

/* ---- civilizations: era, name, dates, key, photo, summary, paragraph 1, paragraph 2, did you know, lat, lon, place, centres, known for, legacy ---- */
addC(0, 'Phoenician City-States', 'c. 1500 – 300 BCE', 'phoenicia', 'Byblos', 'Seafaring merchant cities on the Lebanese coast that spread the alphabet.',
 'Phoenicia was a group of independent city-states, including Tyre, Sidon and Byblos, on the eastern Mediterranean coast. Its sailors traded timber, glass and a costly purple dye made from sea snails.',
 'Phoenician traders founded colonies from Cyprus to Spain, among them Carthage. Their alphabet of 22 letters, written without vowels, was adapted by the Greeks and became an ancestor of the Latin alphabet.',
 'The Greeks called these people Phoinikes, a name often linked to their word for the purple-red colour of Tyrian dye.', 33.27, 35.2, 'Eastern Mediterranean coast, modern Lebanon',
 'Tyre, Sidon, Byblos', 'Sea trade, purple dye, the alphabet', 'Their alphabet inspired the Greek and Latin scripts');
addC(0, 'Olmec Civilization', 'c. 1200 – 400 BCE', 'olmec', 'Olmec_colossal_heads', 'Mesoamerica’s earliest major civilization, famous for colossal stone heads.',
 'The Olmec lived on the Gulf Coast of Mexico, with major centres at San Lorenzo and La Venta. They built ceremonial centres, carved basalt monuments and worked with natural rubber.',
 'Seventeen colossal heads are known, carved from volcanic basalt, and some stand over three metres tall. Later Mesoamerican cultures shared ideas such as pyramids and calendars, though how much they owe to the Olmec is still debated.',
 'The name “Olmec”, an Aztec word meaning “rubber people”, was given long after the civilization ended. What the Olmec called themselves is unknown.', 18.1, -94.04, 'Gulf Coast of Mexico',
 'San Lorenzo, La Venta, Tres Zapotes', 'Colossal stone heads, early ceremonial centres', 'Often called a “mother culture” of Mesoamerica, though historians debate the term');
addC(0, 'Assyrian Empire', 'c. 911 – 609 BCE', 'assyria', 'Lamassu', 'A fearsome Near Eastern empire with a great library at Nineveh.',
 'The Neo-Assyrian Empire grew from northern Mesopotamia and, at its height in the 7th century BCE, ruled from Egypt to western Iran. Its army used iron weapons, siege engines and cavalry, and it moved conquered peoples across the empire.',
 'King Ashurbanipal gathered tens of thousands of clay tablets in a library at Nineveh, preserving works such as the Epic of Gilgamesh. Nineveh fell to a Babylonian and Median alliance in 612 BCE, and the empire ended soon after.',
 'Ashurbanipal’s library was rediscovered in the 1850s, and most of its tablets are kept in the British Museum.', 36.36, 43.15, 'Northern Iraq, near modern Mosul',
 'Ashur, Nimrud, Nineveh', 'Iron armies, palace reliefs, the library of Ashurbanipal', 'Its library saved many Mesopotamian texts for later readers');
addC(1, 'Carthage', 'c. 814 – 146 BCE', 'carthage', 'Carthage', 'A Phoenician colony that became Rome’s greatest rival.',
 'Carthage was founded, according to tradition, by settlers from Tyre in 814 BCE on the coast of modern Tunisia. It grew into a rich naval and trading power that controlled much of the western Mediterranean.',
 'Carthage fought Rome in the three Punic Wars (264 – 146 BCE). Hannibal’s march across the Alps nearly defeated Rome, but in 146 BCE Rome destroyed the city.',
 'The popular story that Romans salted Carthage’s fields appears in no ancient source and was added much later.', 36.85, 10.32, 'Gulf of Tunis, modern Tunisia',
 'Carthage, Utica', 'Naval power, Hannibal, the Punic Wars', 'Its fall made Rome the master of the western Mediterranean');
addC(1, 'Parthian Empire', 'c. 247 BCE – 224 CE', 'parthia', 'Hatra', 'A horse-riding empire that controlled the Silk Road between Rome and China.',
 'Parthia rose in what is now north-eastern Iran and by the 2nd century BCE ruled from Mesopotamia to the Iranian plateau. It lay between Rome and Han China and taxed the trade that passed along the Silk Road.',
 'Its mounted archers defeated a Roman army at Carrhae in 53 BCE. The empire was overthrown in 224 CE by the Sasanians, who founded a new Persian dynasty.',
 'Parthian archers were famous for firing backwards while pretending to retreat, the origin of the phrase “parting shot”.', 37.95, 58.2, 'Iran and Mesopotamia, from Nisa to Ctesiphon',
 'Nisa, Hecatompylos, Ctesiphon', 'Horse archers, Silk Road trade', 'A rival to Rome for over two centuries');
addC(1, 'Kingdom of Aksum', 'c. 100 – 940 CE', 'aksum', 'Obelisk_of_Axum', 'An East African trading kingdom whose stone obelisks still stand.',
 'Aksum, in the highlands of modern Ethiopia and Eritrea, controlled trade between the Roman world, Arabia and India through its Red Sea port of Adulis. It minted its own gold, silver and bronze coins.',
 'King Ezana adopted Christianity in the 4th century, making Aksum one of the earliest Christian kingdoms. Its carved stone stelae, some over 20 metres tall, mark royal tombs.',
 'The Obelisk of Axum was taken to Rome in 1937, returned to Ethiopia in 2005 and re-erected in 2008.', 14.13, 38.72, 'Tigray highlands, Ethiopia',
 'Aksum, Adulis, Yeha', 'Red Sea trade, coins, giant stelae', 'Helped shape Ethiopia’s Christian tradition and its Ge’ez script');
addC(1, 'Teotihuacan', 'c. 100 BCE – 550 CE', 'teotihuacan', 'Teotihuacan', 'A vast planned city with towering pyramids in the Valley of Mexico.',
 'Teotihuacan, north-east of modern Mexico City, was laid out on a grid along the Avenue of the Dead. At its peak, around 450 CE, it may have held more than 100,000 people, making it one of the largest cities in the world.',
 'The Pyramid of the Sun and the Pyramid of the Moon dominate the site. The city was burned and abandoned around 550 CE, and the Aztecs, who found its ruins centuries later, called it the birthplace of the gods.',
 'Nobody knows what its people called the city or what language they spoke; the name Teotihuacan comes from the later Aztecs.', 19.69, -98.84, 'Valley of Mexico, near Mexico City',
 'Avenue of the Dead, Pyramid of the Sun, Pyramid of the Moon', 'A planned grid city, giant pyramids, wall murals', 'Its art and trade influenced cities as far as the Maya region');
addC(2, 'Srivijaya', 'c. 650 – 1300 CE', 'srivijaya', 'Muaro_Jambi_Temple_Compounds', 'A Buddhist sea empire that controlled the Strait of Malacca.',
 'Srivijaya was a maritime empire centred on Sumatra, with its capital near modern Palembang. By controlling the Strait of Malacca, it taxed ships passing between India and China.',
 'It was an important centre of Buddhist learning. The Chinese monk Yijing stayed there in the 7th century to study and copy texts before continuing to India.',
 'The Chola king Rajendra I attacked Srivijaya’s ports around 1025 CE, a rare overseas naval campaign by an Indian empire.', 2.99, 104.75, 'Sumatra, modern Indonesia',
 'Palembang, Jambi', 'Sea trade, Buddhist scholarship', 'Spread the Malay language and Buddhism across Southeast Asia');
addC(2, 'Great Zimbabwe', 'c. 1100 – 1450 CE', 'zimbabwe', 'Great_Zimbabwe', 'A stone-walled trading city in southern Africa.',
 'Great Zimbabwe was the capital of a Shona-speaking kingdom that grew rich from gold and cattle, trading with Swahili ports on the Indian Ocean coast. At its height it may have held 10,000 people or more.',
 'Its dry-stone walls, built without mortar, rise to about 11 metres in the Great Enclosure. The site was abandoned by about 1450, and the modern country of Zimbabwe took its name from it.',
 'The Great Enclosure’s outer wall is about 250 metres long, one of the largest ancient structures in sub-Saharan Africa.', -20.27, 30.93, 'Masvingo Province, Zimbabwe',
 'Great Enclosure, Hill Complex, Valley Ruins', 'Mortar-free stone walls, gold trade', 'Gave independent Zimbabwe its name in 1980');
addC(2, 'Song Dynasty', '960 – 1279 CE', 'song', 'Along_the_River_During_the_Qingming_Festival', 'A China of printing, paper money and some of the world’s biggest cities.',
 'The Song dynasty ruled China from 960 to 1279 and saw rapid growth in farming, trade and cities. Its capitals, Kaifeng and later Hangzhou, were among the largest cities in the world.',
 'Song China used the magnetic compass for navigation, made gunpowder weapons, and printed books with movable type, invented by Bi Sheng around 1040. It also issued some of the first government paper money.',
 'The painter Zhang Zeduan’s scroll “Along the River During the Qingming Festival” is over five metres long and shows everyday life in a Song city.', 30.27, 120.17, 'Kaifeng and Hangzhou, China',
 'Kaifeng, Hangzhou', 'Movable type, paper money, the compass', 'A leap in technology and trade that shaped later China');
addC(3, 'Safavid Empire', '1501 – 1736', 'safavid', 'Naqsh-e_Jahan_Square', 'A Persian empire that made Shia Islam Iran’s state religion.',
 'Shah Ismail I founded the Safavid dynasty in 1501 and made Twelver Shia Islam the state religion of Iran. The empire fought the Ottomans to the west and the Uzbeks to the north-east.',
 'Shah Abbas I (r. 1588 – 1629) moved the capital to Isfahan and rebuilt it with grand squares, mosques and bridges. Afghan invaders captured Isfahan in 1722, and the dynasty ended in 1736.',
 'Isfahan’s Naqsh-e Jahan Square, built under Shah Abbas I, is among the largest city squares in the world and a UNESCO World Heritage Site.', 32.65, 51.68, 'Isfahan, Iran',
 'Tabriz, Qazvin, Isfahan', 'Isfahan’s architecture, Persian carpets, a Shia state', 'Shaped modern Iran’s borders and religious identity');
addC(3, 'Tokugawa Japan', '1603 – 1868', 'tokugawa', 'Himeji_Castle', 'Two and a half centuries of peace under the shoguns of Edo.',
 'After winning the Battle of Sekigahara in 1600, Tokugawa Ieyasu became shogun in 1603 and ruled from Edo, now Tokyo. His family kept Japan at peace for more than 250 years.',
 'Japan limited contact with the outside world, trading only through a few ports such as Nagasaki. The period saw kabuki theatre, woodblock prints and a growing city culture, until Commodore Perry’s visit in 1853 pressed Japan to open and the shogunate ended in 1868.',
 'Hokusai’s “Great Wave off Kanagawa” was printed around 1831, during this period.', 35.68, 139.69, 'Edo (Tokyo), Japan',
 'Edo, Kyoto, Osaka', 'Shogunate peace, woodblock prints, kabuki', 'Prepared the ground for Meiji Japan’s rapid change');

/* ---- people: era, name, title, dates, key, photo, summary, paragraph 1, paragraph 2, did you know, lat, lon, place, first tile label, first tile text, known for, legacy ---- */
addF(0, 'Nefertiti', 'Queen of Egypt', 'c. 1370 – c. 1330 BCE', 'nefertiti', 'Nefertiti', 'Queen beside Akhenaten, remembered for her famous painted bust.',
 'Nefertiti was the chief wife of Pharaoh Akhenaten, who tried to shift Egypt’s worship to a single sun god, the Aten. Art shows her as an unusually powerful royal partner.',
 'Her limestone bust, found at Amarna in 1912, is now in the Neues Museum in Berlin. What happened to her late in Akhenaten’s reign is unclear.',
 'Her name is usually translated as “the beautiful one has come”.', 27.65, 30.9, 'Amarna, Egypt', 'Lived', 'Amarna, Akhenaten’s new capital', 'The Berlin bust, the Amarna period', 'One of the best-known faces of ancient Egypt');
addF(0, 'Tutankhamun', 'Pharaoh of Egypt', 'c. 1341 – 1323 BCE', 'tutankhamun', 'Tutankhamun', 'The boy king whose tomb was found almost intact.',
 'Tutankhamun became pharaoh as a child, at about nine years old, and died about ten years later. During his reign Egypt returned to its traditional gods after Akhenaten’s religious changes.',
 'Howard Carter discovered his tomb in the Valley of the Kings in 1922. It held more than 5,000 objects, including a gold funerary mask.',
 'His tomb was far smaller than those of the great pharaohs, which helped it survive almost intact.', 25.74, 32.6, 'Valley of the Kings, Luxor, Egypt', 'Ruled', 'Egypt, c. 1332 – 1323 BCE', 'The golden mask, the tomb found in 1922', 'The 1922 discovery made ancient Egypt a worldwide fascination');
addF(1, 'Pericles', 'Athenian statesman', 'c. 495 – 429 BCE', 'pericles', 'Pericles', 'Leader of Athens during its golden age.',
 'Pericles led Athens for about three decades. He supported democracy by paying citizens for public service, so poorer men could take part in government.',
 'He oversaw the building of the Parthenon on the Acropolis and led Athens at the start of the Peloponnesian War. He died of the plague in 429 BCE.',
 'The historian Thucydides recorded Pericles’ famous funeral speech praising Athenian democracy, though the words are Thucydides’ own version.', 37.97, 23.73, 'Athens, Greece', 'Born', 'Athens, c. 495 BCE', 'The Parthenon, the Funeral Oration', 'His age is called the Golden Age of Athens');
addF(1, 'Socrates', 'Greek philosopher', 'c. 470 – 399 BCE', 'socrates', 'Socrates', 'Asked questions that changed how people think.',
 'Socrates taught in the streets of Athens by questioning people about justice, virtue and knowledge, a method now called the Socratic method. He wrote nothing himself.',
 'We know him mainly through his student Plato. In 399 BCE an Athenian jury convicted him of impiety and of corrupting the young, and he died by drinking hemlock.',
 'According to Plato, he said he was wise only because he knew that he did not know.', 37.97, 23.73, 'Athens, Greece', 'Born', 'Athens, c. 470 BCE', 'The Socratic method, the trial of 399 BCE', 'Plato and Aristotle built on his ideas');
addF(1, 'Chanakya', 'Adviser and political thinker', 'c. 4th – 3rd century BCE', 'chanakya', 'Chanakya', 'The strategist linked to the Arthashastra and to Chandragupta Maurya.',
 'Chanakya, also called Kautilya, is traditionally named as the adviser who helped Chandragupta Maurya take power and found the Maurya Empire around 322 BCE.',
 'The Arthashastra, a text on statecraft, economics and war, is traditionally credited to Kautilya, though historians think it took shape over time and may have several authors.',
 'Taxila, in present-day Pakistan, was a famous centre of learning in the ancient world and is traditionally linked to his teaching.', 25.61, 85.14, 'Pataliputra (Patna), India', 'Based in', 'Pataliputra, the Maurya capital', 'The Arthashastra, advising Chandragupta', 'Still studied for its ideas on government and strategy');
addF(1, 'Hypatia', 'Mathematician and philosopher', 'died 415 CE', 'hypatia', 'Hypatia', 'Taught mathematics and philosophy in Alexandria.',
 'Hypatia was a respected teacher in Roman Alexandria, where she lectured on mathematics, astronomy and philosophy. She is said to have edited and commented on earlier works on mathematics and astronomy.',
 'In 415 CE she was killed by a mob during a period of political and religious conflict in the city. Her murder shocked contemporaries, and she has become a lasting symbol of learning.',
 'None of her own writings survive; what we know comes from later authors and from her student Synesius.', 31.2, 29.92, 'Alexandria, Egypt', 'Lived', 'Alexandria, Roman Egypt', 'Teaching mathematics and astronomy', 'A symbol of scholarship and free thought');
addF(2, 'Al-Khwarizmi', 'Mathematician and astronomer', 'c. 780 – c. 850 CE', 'khwarizmi', 'Al-Khwarizmi', 'His books gave us the words “algebra” and “algorithm”.',
 'Al-Khwarizmi worked at the House of Wisdom in Baghdad under the Abbasid caliphs. His book on calculation by completion and balancing (al-jabr) laid out methods for solving equations, and the word “algebra” comes from it.',
 'His writings helped spread the Hindu-Arabic numerals, including zero, to the wider Islamic world and later to Europe. The word “algorithm” comes from the Latinized form of his name.',
 'His algebra began as a practical tool, used for dividing inheritances and measuring land.', 33.31, 44.37, 'Baghdad, Iraq', 'Origin', 'The Khwarazm region, Central Asia', 'Algebra, Hindu-Arabic numerals', 'Gave mathematics two of its core words');
addF(2, 'Ibn Battuta', 'Traveller and writer', '1304 – c. 1368 CE', 'battuta', 'Ibn_Battuta', 'Moroccan scholar who travelled across much of the known world.',
 'Ibn Battuta left Tangier in 1325 to make the pilgrimage to Mecca and kept travelling for about 29 years. His journeys took him across North Africa, the Middle East, East Africa, Central and South Asia, and, by his account, to China.',
 'He served for several years as a judge in the Delhi Sultanate. His account, the Rihla, was dictated after his return to Morocco and is a key source on the 14th-century world.',
 'Estimates of his total journey reach around 120,000 km, about three times the distance around the Earth.', 35.78, -5.8, 'Tangier, Morocco', 'Born', 'Tangier, 1304', 'The Rihla, journeys across Afro-Eurasia', 'His book describes the 14th-century world in rich detail');
addF(2, 'Kublai Khan', 'Mongol emperor and founder of the Yuan dynasty', '1215 – 1294 CE', 'kublai', 'Kublai_Khan', 'Grandson of Genghis Khan who became emperor of China.',
 'Kublai Khan was a grandson of Genghis Khan. He became Great Khan in 1260 and in 1271 declared the Yuan dynasty, ruling China from the new capital Khanbaliq, now Beijing.',
 'After defeating the Southern Song in 1279 he ruled all of China. He encouraged trade and issued paper money, and travellers such as Marco Polo claimed to have visited his court.',
 'Two Mongol invasion attempts on Japan, in 1274 and 1281, both failed, partly because of storms the Japanese later called kamikaze, “divine wind”.', 39.9, 116.4, 'Khanbaliq (Beijing), China', 'Born', 'Mongolia, 1215', 'Founding the Yuan dynasty, ruling all of China', 'Ended the long division of China and linked it to the wider Mongol world');
addF(2, 'Razia Sultana', 'Sultan of Delhi', 'r. 1236 – 1240 CE', 'razia', 'Razia_Sultana', 'The only woman to rule the Delhi Sultanate.',
 'Razia became Sultan of Delhi in 1236 after her father Iltutmish named her his heir over her brothers. She led armies, held court in public and issued coins in her own name.',
 'Some nobles opposed a woman ruler, and she was overthrown in 1240. She died that year while trying to regain her throne.',
 'She is said to have preferred the title “Sultan” to “Sultana”, to rule in her own right rather than as a ruler’s wife.', 28.61, 77.21, 'Delhi, India', 'Born', 'Budaun, Uttar Pradesh', 'Ruling Delhi in her own right', 'A rare woman sovereign in medieval South Asia');
addF(2, 'Ibn Sina (Avicenna)', 'Physician and philosopher', 'c. 980 – 1037 CE', 'avicenna', 'Avicenna', 'Wrote the medical textbook used for centuries.',
 'Ibn Sina was born near Bukhara, in present-day Uzbekistan, and became a physician as a teenager. He wrote hundreds of works on medicine, philosophy and science.',
 'His Canon of Medicine, completed around 1025, was a standard textbook in both Islamic lands and Europe for several hundred years.',
 'The Canon suggested keeping the sick apart to stop illness spreading, long before germs were understood.', 39.77, 64.42, 'Bukhara, Uzbekistan', 'Born', 'Near Bukhara, c. 980', 'The Canon of Medicine', 'Shaped medical teaching in the Islamic world and Europe');
addF(3, 'Nicolaus Copernicus', 'Astronomer', '1473 – 1543 CE', 'copernicus', 'Nicolaus_Copernicus', 'Proposed that the Earth moves around the Sun.',
 'Copernicus, a Polish astronomer and canon, developed a model in which the Earth and the other planets travel around the Sun, challenging the long-held view of an Earth-centred universe.',
 'His book “On the Revolutions of the Heavenly Spheres” was published in 1543, the year he died. It helped begin what is now called the Scientific Revolution.',
 'Aristarchus of Samos had suggested a Sun-centred system in the 3rd century BCE, but it won little support at the time.', 54.36, 19.68, 'Frombork, Poland', 'Born', 'Toruń, 1473', 'The Sun-centred model', 'A turning point in astronomy and science');
addF(3, 'Isaac Newton', 'Mathematician and physicist', '1643 – 1727 CE', 'newton', 'Isaac_Newton', 'Explained motion and gravity with a few mathematical laws.',
 'Newton’s “Principia”, published in 1687, set out the three laws of motion and the law of universal gravitation, showing that one set of rules governs motion on Earth and in the heavens.',
 'He also developed calculus, independently of Gottfried Leibniz, made key discoveries about light and colour, and served as Master of the Royal Mint.',
 'In 1668 he built a reflecting telescope that used a mirror instead of a lens, a design still used in many telescopes today.', 52.2, 0.12, 'Cambridge, England', 'Born', 'Woolsthorpe, England, 1643', 'The Principia, calculus, optics', 'Laid the foundations of classical physics');
addF(3, 'Elizabeth I', 'Queen of England and Ireland', '1533 – 1603 CE', 'elizabeth', 'Elizabeth_I', 'Ruled England for 44 years in an age of exploration and theatre.',
 'Elizabeth became queen in 1558 and ruled for 44 years. She steadied a country divided by religion and supported English trade and exploration.',
 'In 1588 an English fleet and bad weather defeated the Spanish Armada. Her reign also saw the playwrights William Shakespeare and Christopher Marlowe at work in London.',
 'She never married, and the “Virgin Queen” became part of her public image; the American state of Virginia was named in her honour.', 51.5, -0.13, 'London, England', 'Born', 'Greenwich, 1533', 'The Armada victory of 1588, the Elizabethan age', 'Her reign is remembered as an English golden age');
addF(3, 'Tipu Sultan', 'Ruler of Mysore', '1751 – 1799 CE', 'tipu', 'Tipu_Sultan', 'Ruler of Mysore who resisted the East India Company and used war rockets.',
 'Tipu Sultan succeeded his father Hyder Ali as ruler of Mysore in 1782 and fought several wars against the British East India Company. He modernised his army, state finances and trade.',
 'Mysorean rockets with iron casings were used against British forces and later studied by British engineers. Tipu was killed defending his capital Srirangapatna in 1799.',
 '“Tipu’s Tiger”, a mechanical toy of a tiger attacking a soldier, is now kept in the Victoria and Albert Museum in London.', 12.42, 76.68, 'Srirangapatna, Karnataka, India', 'Born', 'Devanahalli, 1751', 'Mysore rockets, resistance to the East India Company', 'Remembered in India as a determined opponent of colonial expansion');
addF(4, 'Napoleon Bonaparte', 'French general and emperor', '1769 – 1821 CE', 'napoleon', 'Napoleon', 'Rose from the French Revolution to rule much of Europe.',
 'Napoleon seized power in France in 1799 and crowned himself emperor in 1804. His armies won famous victories, and by 1810 France controlled or influenced most of continental Europe.',
 'His Civil Code of 1804 shaped legal systems across the world. After the disastrous invasion of Russia in 1812 he was defeated at Waterloo in 1815 and exiled to Saint Helena, where he died in 1821.',
 'Napoleon was of about average height for a Frenchman of his time; the “short” myth partly comes from confusion between French and English units.', 41.92, 8.74, 'Ajaccio, Corsica, France', 'Born', 'Ajaccio, Corsica, 1769', 'The Civil Code, the Napoleonic Wars', 'Spread ideas of legal equality and reshaped Europe’s borders');
addF(4, 'Swami Vivekananda', 'Monk and philosopher', '1863 – 1902 CE', 'vivekananda', 'Swami_Vivekananda', 'Introduced Indian philosophy to the world and inspired a generation.',
 'Born Narendranath Datta in Kolkata, he became the chief disciple of the saint Ramakrishna. His 1893 speech at the Parliament of the World’s Religions in Chicago, opening with “Sisters and Brothers of America”, made him famous.',
 'He founded the Ramakrishna Mission in 1897 to combine spiritual practice with education and service to the poor. He died in 1902 at the age of 39.',
 'India celebrates his birthday, 12 January, as National Youth Day.', 22.57, 88.36, 'Kolkata, India', 'Born', 'Kolkata, 1863', 'The Chicago speech of 1893, the Ramakrishna Mission', 'Inspired many leaders of India’s reform and independence movements');
addF(4, 'B. R. Ambedkar', 'Jurist, economist and social reformer', '1891 – 1956 CE', 'ambedkar', 'B._R._Ambedkar', 'Chief architect of the Indian Constitution and champion of equal rights.',
 'Born into a Dalit family in Mhow, in present-day Madhya Pradesh, Ambedkar overcame severe discrimination to earn doctorates from Columbia University and the London School of Economics. He campaigned for the rights of Dalits and other excluded groups.',
 'He chaired the Drafting Committee of the Constitution of India, adopted in 1949, and became independent India’s first Law Minister. In 1956 he converted to Buddhism with hundreds of thousands of followers in Nagpur.',
 'His birthday, 14 April, is observed in India as Ambedkar Jayanti.', 19.02, 72.84, 'Mumbai, Maharashtra, India', 'Born', 'Mhow, 1891', 'Drafting the Constitution, the fight for social justice', 'His ideas shape India’s guarantees of equality');
addF(4, 'Rabindranath Tagore', 'Poet, writer and polymath', '1861 – 1941 CE', 'tagore', 'Rabindranath_Tagore', 'First non-European to win the Nobel Prize in Literature.',
 'Tagore wrote poems, plays, novels, essays and thousands of songs in Bengali. In 1913 he became the first non-European to receive the Nobel Prize in Literature, for his collection “Gitanjali”.',
 'He founded the school at Santiniketan, later Visva-Bharati University, and wrote the words and music of the national anthems of both India and Bangladesh.',
 'In 1919 he gave up his knighthood to protest the Jallianwala Bagh massacre.', 23.68, 87.68, 'Santiniketan, West Bengal, India', 'Born', 'Kolkata, 1861', 'Gitanjali, Santiniketan, two national anthems', 'His songs, stories and school remain central to Bengali culture');
addF(4, 'Srinivasa Ramanujan', 'Mathematician', '1887 – 1920 CE', 'ramanujan', 'Srinivasa_Ramanujan', 'Self-taught genius whose formulas still surprise mathematicians.',
 'Ramanujan grew up in Tamil Nadu and taught himself advanced mathematics from a few books. In 1913 he wrote to the English mathematician G. H. Hardy, who invited him to Cambridge.',
 'He worked on infinite series, continued fractions and number theory, filled notebooks with thousands of results, and was elected a Fellow of the Royal Society in 1918. He died in 1920 at the age of 32.',
 'The number 1729, the smallest number that is the sum of two cubes in two different ways, is called the Hardy–Ramanujan number.', 10.96, 79.38, 'Kumbakonam, Tamil Nadu, India', 'Born', 'Erode, Tamil Nadu, 1887', 'Infinite series, number theory, the notebooks', 'His results are still used in fields from mathematics to physics');
addF(4, 'Nelson Mandela', 'Anti-apartheid leader and president', '1918 – 2013 CE', 'mandela', 'Nelson_Mandela', 'Led South Africa from apartheid to democracy.',
 'Mandela helped lead the African National Congress in the struggle against apartheid. In 1964 he was sentenced to life imprisonment and spent 27 years in jail, most of them on Robben Island.',
 'Released in 1990, he shared the 1993 Nobel Peace Prize with F. W. de Klerk and in 1994 became South Africa’s first president elected in fully democratic elections.',
 'His clan name, Madiba, is still used affectionately in South Africa.', -26.2, 28.04, 'Johannesburg, South Africa', 'Born', 'Mvezo, Eastern Cape, 1918', 'Fighting apartheid, 27 years in prison, the presidency', 'A global symbol of reconciliation and justice');

facts.push(
 'Ashurbanipal’s library at Nineveh held tens of thousands of clay tablets, and the best-preserved copies of the Epic of Gilgamesh come from it.',
 'Around 450 CE, Teotihuacan may have had more than 100,000 residents, making it one of the largest cities in the world at that time.',
 'The word “algorithm” comes from the name of al-Khwarizmi, a mathematician who worked in Baghdad in the 9th century.',
 'Srinivasa Ramanujan, who had almost no formal training in advanced mathematics, wrote to G. H. Hardy in 1913 and was invited to Cambridge.',
 'The dry-stone walls of Great Zimbabwe were built without mortar, and the Great Enclosure’s outer wall is about 250 metres long.',
 'The Obelisk of Axum was taken to Rome in 1937 and only returned to Ethiopia in 2005.'
);
