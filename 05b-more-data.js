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

/* ---- Update 9: Prehistoric Era (era 5), more modern civilizations. Photos load from the Wikipedia article in the 'photo' field. ---- */
Object.assign(EMB, {pal:['hand',25], nean:['fossil',35], neo:['wheat',60], gobekli:['temple',35], mehr:['indus',30], bronzeage:['gear',28], ironage:['fort',210],
  sasan:['arch',275], delhisul:['ashoka',150], qing:['china',215], britemp:['ship',350], usa:['torch',215], ussr:['star',355], repindia:['ashoka',25], prc:['china',350], euro:['star',220]});
addC(5, 'Old Stone Age (Paleolithic)', 'c. 3 million – 11,700 years ago', 'pal', 'Paleolithic', 'Hunter-gatherers who made the first tools, tamed fire and painted caves.',
 'The Paleolithic is the longest chapter of human history. People lived in small mobile groups, hunting animals and gathering plants, and made tools by chipping stone. The earliest widely accepted stone tools, found in East Africa, are about 2.6 million years old.',
 'Over time people learned to control fire, build shelters, sew clothes with bone needles and make art. The age ended as the last Ice Age warmed, about 11,700 years ago.',
 'The word Paleolithic comes from Greek words meaning “old stone”.', -2.99, 35.35, 'Olduvai Gorge, Tanzania',
 'Olduvai Gorge, Blombos Cave, Lascaux', 'Stone tools, fire, cave art', 'The tools, fire and art of this age shaped everything that followed');
addC(5, 'Neanderthals', 'c. 400,000 – 40,000 years ago', 'nean', 'Neanderthal', 'A close human relative that lived in Ice Age Europe and western Asia.',
 'Neanderthals lived in Europe and western Asia and were adapted to cold climates. They made stone tools, used fire, hunted large animals and, in some places, buried their dead.',
 'They disappeared about 40,000 years ago, around the time modern humans spread into Europe. Many people today outside Africa carry a small share of Neanderthal DNA.',
 'The first Neanderthal fossil to be named was found in Germany’s Neander Valley in 1856; “Neanderthal” means “Neander valley”.', 51.23, 6.95, 'Neander Valley, near Düsseldorf, Germany',
 'Neander Valley, Shanidar Cave, La Chapelle-aux-Saints', 'Stone tools, fire, burials', 'Their DNA lives on in many people today');
addC(5, 'New Stone Age (Neolithic)', 'c. 10,000 – 3000 BCE (varies)', 'neo', 'Neolithic', 'The age when people took up farming and built the first villages.',
 'The Neolithic began in the Fertile Crescent around 10,000 BCE, when people began growing wheat and barley and herding sheep and goats. Farming let them stay in one place and live in villages.',
 'Neolithic people made pottery, polished stone tools and woven cloth. Farming arose independently in several regions, including China, Mesoamerica and the Andes, so the dates differ from place to place.',
 'The word Neolithic means “new stone”, after the polished stone tools of the period.', 36.5, 40.0, 'Fertile Crescent (Syria, Iraq, Türkiye)',
 'Jericho, Çatalhöyük, Mehrgarh', 'Farming, pottery, the first villages', 'Farming made towns, trade and later cities possible');
addC(5, 'Göbekli Tepe', 'c. 9500 – 8000 BCE', 'gobekli', 'Göbekli_Tepe', 'A hilltop of carved stone pillars, older than farming villages.',
 'Göbekli Tepe, in south-eastern Türkiye, has circles of T-shaped limestone pillars up to about five metres tall, many carved with animals such as foxes, boars and snakes. Its earliest layers date to about 9500 BCE.',
 'It was built by people who, as far as we know, did not yet farm. Archaeologists still debate its purpose, though many think it was a ritual or gathering place. It was deliberately buried around 8000 BCE.',
 'It is more than 6,000 years older than Stonehenge and became a UNESCO World Heritage Site in 2018.', 37.22, 38.92, 'Near Şanlıurfa, south-eastern Türkiye',
 'Göbekli Tepe, Karahan Tepe', 'T-shaped pillars, animal carvings', 'It suggests that monumental building may have come before farming');
addC(5, 'Mehrgarh', 'c. 7000 – 2500 BCE', 'mehr', 'Mehrgarh', 'An early farming settlement that came before the Indus cities.',
 'Mehrgarh, in Balochistan in modern Pakistan, is among the earliest known farming and herding sites in South Asia. Its earliest layers date to about 7000 BCE, with mud-brick houses and granaries.',
 'Its people grew wheat and barley, kept cattle, sheep and goats, and later made pottery and beads. Many archaeologists see it as an ancestor of the Indus Valley Civilization, which grew up nearby.',
 'Teeth from Mehrgarh with drilled holes are some of the earliest evidence of dentistry, about 9,000 years old.', 29.39, 67.6, 'Bolan region, Balochistan, Pakistan',
 'Mehrgarh, Nausharo', 'Early farming, mud-brick houses, pottery', 'A forerunner of the Indus Valley Civilization');
addC(5, 'Bronze Age', 'c. 3300 – 1200 BCE (varies)', 'bronzeage', 'Nebra_sky_disk', 'The age of the first bronze tools, cities and writing.',
 'Bronze, an alloy of copper and tin, gave people harder tools and weapons than stone or copper. The Bronze Age began around 3300 BCE in the Near East, and its dates differ from region to region.',
 'It saw the first cities, writing and long-distance trade in Mesopotamia, Egypt, the Indus Valley and China. Around 1200 BCE many Eastern Mediterranean societies collapsed, a period called the Late Bronze Age collapse, for reasons still debated.',
 'The Nebra sky disc, found in Germany and dated to about 1600 BCE, is one of the oldest known depictions of the cosmos.', 51.29, 11.58, 'Nebra, Germany',
 'Ur, Mohenjo-daro, Knossos, Anyang', 'Bronze tools, early cities, writing', 'Trade networks and early states grew in this age');
addC(5, 'Iron Age', 'c. 1200 – 500 BCE (varies)', 'ironage', 'Hallstatt_culture', 'The age when iron tools and weapons spread across the world.',
 'Iron ore is far more common than the tin needed for bronze, so iron tools and weapons spread widely after about 1200 BCE, starting in the Near East and Anatolia. The Iron Age begins at different times in different regions.',
 'Iron ploughs and axes helped clear land and grow more food. In Europe the Hallstatt and La Tène cultures flourished, and in South Asia the use of iron is often linked with the rise of early kingdoms.',
 'The Iron Pillar of Delhi, made around the 4th–5th century CE, is a famous example of rust-resistant ancient ironwork.', 47.56, 13.65, 'Hallstatt, Austria',
 'Hallstatt, La Tène, Anatolia', 'Iron tools and weapons, hillforts', 'Iron became the main metal of ancient and medieval states');
addC(1, 'Sasanian Empire', '224 – 651 CE', 'sasan', 'Taq-i_Kisra', 'The last Persian empire before the Arab conquests.',
 'Ardashir I overthrew the Parthians in 224 CE and founded the Sasanian Empire, ruling from Ctesiphon near modern Baghdad. Zoroastrianism was the state religion.',
 'The Sasanians fought long wars with Rome and then Byzantium. Weakened by these wars, the empire fell to Arab armies in the 640s, and its last king, Yazdegerd III, died in 651 CE.',
 'The Arch of Ctesiphon, built by the Sasanians, is often described as the largest single-span brick vault ever built.', 33.09, 44.58, 'Ctesiphon, near Baghdad, Iraq',
 'Ctesiphon, Firuzabad, Bishapur', 'Zoroastrian state religion, rock reliefs, silverwork', 'Its art and court culture influenced early Islamic civilization');
addC(2, 'Delhi Sultanate', '1206 – 1526 CE', 'delhisul', 'Qutb_Minar', 'Five dynasties that ruled much of northern India from Delhi.',
 'The Delhi Sultanate began in 1206 when Qutb ud-Din Aibak became its first sultan. Five dynasties ruled in turn: the Mamluk, Khalji, Tughlaq, Sayyid and Lodi.',
 'It expanded under rulers such as Alauddin Khalji and resisted Mongol invasions. Timur’s sack of Delhi in 1398 weakened it, and Babur’s victory at Panipat in 1526 ended it and led to Mughal rule.',
 'The Qutb Minar, begun around 1199, is about 73 metres tall and a UNESCO World Heritage Site.', 28.52, 77.19, 'Qutb complex, Delhi, India',
 'Delhi, Daulatabad, Multan', 'The Qutb Minar, new coinage and administration', 'It blended Persian and Indian traditions and shaped Indo-Islamic architecture');
addC(3, 'Qing Dynasty', '1644 – 1912 CE', 'qing', 'Summer_Palace', 'The last imperial dynasty of China, founded by the Manchus.',
 'The Manchu-led Qing dynasty took Beijing in 1644. In the 18th century, under emperors such as Kangxi and Qianlong, it expanded China’s borders to include Xinjiang, Tibet and Mongolia.',
 'In the 19th century the Opium Wars, the Taiping Rebellion and foreign pressure weakened it. The last emperor, Puyi, abdicated in 1912, ending more than 2,000 years of imperial rule in China.',
 'Qing men were required to wear a long braid, the queue, as a sign of submission to the dynasty.', 39.9, 116.4, 'Beijing, China',
 'Beijing, Shenyang, Chengde', 'The Forbidden City, a vast territory, porcelain and tea trade', 'Much of modern China’s territory was shaped under the Qing');
addC(4, 'British Empire', 'c. 1600 – 1997 CE', 'britemp', 'Gateway_of_India', 'The largest empire in history, once covering about a quarter of the world’s land.',
 'Britain’s overseas empire grew from trading posts and colonies in the 1600s. By the 1920s it ruled about a quarter of the world’s land and a large share of its people, with India as its most valuable possession.',
 'The empire spread trade, railways and the English language, but also brought conquest, slavery, forced labour and famine. After World War II most colonies became independent, and the handover of Hong Kong in 1997 is often seen as its end.',
 'The Gateway of India in Mumbai was built to mark the 1911 visit of King George V; the last British troops left India through it in 1948.', 18.92, 72.83, 'Gateway of India, Mumbai, India',
 'London, Calcutta, Cape Town, Hong Kong', 'Global trade, colonial rule, the Industrial Revolution', 'Its legacy of language, law and borders is still debated today');
addC(4, 'United States of America', '1776 CE – present', 'usa', 'Statue_of_Liberty', 'A republic born in revolution that became a global superpower.',
 'The Declaration of Independence in 1776 announced that thirteen British colonies were free. The Constitution, adopted in 1787, set up a federal republic with separated powers.',
 'The country expanded across North America, fought a Civil War (1861 – 1865) that ended slavery, and became a leading industrial power. After World War II it emerged as one of two superpowers alongside the Soviet Union.',
 'The Statue of Liberty, a gift from France, was dedicated in 1886.', 40.69, -74.04, 'Liberty Island, New York, USA',
 'Washington, D.C., New York, Philadelphia', 'The Constitution, industry, the Moon landing', 'Its economy, technology and culture shape the modern world');
addC(4, 'Soviet Union', '1922 – 1991 CE', 'ussr', 'Sputnik_1', 'A communist superpower that spanned eleven time zones.',
 'The Soviet Union was formed in 1922 after the Russian Revolution of 1917 and the civil war that followed. It was a one-party communist state with a planned economy, governed from Moscow.',
 'It played a major part in defeating Nazi Germany, launched the first satellite, Sputnik 1, in 1957 and sent Yuri Gagarin into space in 1961. After decades of Cold War rivalry with the United States, it dissolved in December 1991 into fifteen independent countries.',
 'At its height it covered about one-sixth of Earth’s land surface.', 55.75, 37.62, 'Moscow, Russia',
 'Moscow, Leningrad, Kyiv', 'Space exploration, the Cold War, a planned economy', 'Its breakup created fifteen new countries and ended the Cold War');
addC(4, 'Republic of India', '1947 CE – present', 'repindia', 'India_Gate', 'The world’s most populous democracy, independent since 1947.',
 'India became independent on 15 August 1947 and a republic on 26 January 1950, when its Constitution, drafted by a committee chaired by B. R. Ambedkar, came into force.',
 'Despite great diversity of languages, religions and regions, it has held regular national elections since 1951 – 52. Its space programme reached Mars orbit in 2014 and landed near the Moon’s south pole in 2023, and its economy is now among the world’s largest.',
 'Twenty-two languages are listed in the Eighth Schedule of India’s Constitution.', 28.61, 77.21, 'New Delhi, India',
 'New Delhi, Mumbai, Bengaluru', 'Democracy, the Constitution, a space programme', 'Its independence movement inspired decolonisation across Asia and Africa');
addC(4, 'People’s Republic of China', '1949 CE – present', 'prc', 'Pudong', 'A country that rebuilt after a century of upheaval and became a major economy.',
 'The People’s Republic of China was proclaimed by Mao Zedong in Beijing on 1 October 1949, after the Chinese Civil War. The early decades brought land reform, the Great Leap Forward and the Cultural Revolution, with famine and great upheaval.',
 'From 1978, Deng Xiaoping’s reforms opened the economy to markets and trade. China has since become the world’s second-largest economy and a leading manufacturer, and hundreds of millions of people have risen out of extreme poverty.',
 'Shanghai’s Pudong district was largely farmland in 1990; today it has one of the world’s best-known skylines.', 39.9, 116.4, 'Beijing, China',
 'Beijing, Shanghai, Shenzhen', 'Economic reform, manufacturing, high-speed rail', 'Its rise has reshaped global trade and technology');
addC(4, 'European Union', '1993 CE – present', 'euro', 'Berlaymont_building', 'A union of European countries that share a single market and many laws.',
 'The EU grew out of the European Coal and Steel Community of 1951 and the 1957 Treaty of Rome. The Maastricht Treaty created the European Union on 1 November 1993.',
 'It has a single market and free movement of people, goods and money, and many members use the euro as their currency. It has 27 member states; the United Kingdom left in 2020.',
 'The European Union received the Nobel Peace Prize in 2012.', 50.84, 4.38, 'Brussels, Belgium',
 'Brussels, Strasbourg, Luxembourg', 'A single market, the euro, free movement', 'A new model of countries sharing sovereignty after centuries of war');


/* ---- Update 9: more historical figures ---- */
Object.assign(EMB, {archimedes:['star',200], buddha:['ashoka',45], marcopolo:['compass',220], harsha:['ashoka',70], shahjahan:['mughal',20], shakespeare:['scroll',330], lincoln:['torch',215], churchill:['crown',350], lenin:['star',355], mao:['star',5], nehru:['ashoka',150], lovelace:['gear',280], bose:['torch',30], lakshmibai:['fort',350]});
addF(1, 'Archimedes', 'Mathematician and inventor', 'c. 287 – 212 BCE', 'archimedes', 'Archimedes', 'Greek scientist of Syracuse who explained buoyancy and the lever.',
 'Archimedes lived in Syracuse, Sicily. He worked out the principle of buoyancy, formulas for the area of a circle and the volume of a sphere, and the law of the lever.',
 'He designed machines that helped defend Syracuse against Rome. He was killed when the Romans captured the city in 212 BCE.',
 'He is said to have shouted “Eureka!” on finding the buoyancy principle in his bath, but that story was written down long after his death.', 37.07, 15.29, 'Syracuse, Sicily, Italy', 'Born', 'Syracuse, c. 287 BCE', 'Buoyancy, the lever, bounds for pi', 'His methods anticipated ideas of calculus');
addF(1, 'Gautama Buddha', 'Spiritual teacher and founder of Buddhism', 'c. 563 – 483 BCE (traditional dates)', 'buddha', 'Gautama_Buddha', 'Taught the path to end suffering; his teachings spread across Asia.',
 'Siddhartha Gautama was born into the Shakya clan at Lumbini, in present-day Nepal. According to tradition he left his sheltered life to search for an end to suffering.',
 'He is said to have gained enlightenment at Bodh Gaya, preached his first sermon at Sarnath and died at Kushinagar. His teachings spread across Asia, helped by rulers such as Ashoka.',
 'The dates above are traditional; some scholars place his life about a century later.', 27.47, 83.28, 'Lumbini, Nepal', 'Born', 'Lumbini, present-day Nepal', 'The Four Noble Truths, the Middle Way', 'Buddhism is followed by hundreds of millions of people today');
addF(2, 'Marco Polo', 'Venetian merchant and traveller', '1254 – 1324 CE', 'marcopolo', 'Marco_Polo', 'His book described the courts and cities of Asia for European readers.',
 'Marco Polo left Venice with his father and uncle around 1271 and travelled along the Silk Road to the court of Kublai Khan, where he stayed for many years.',
 'After returning in 1295, he dictated an account of his travels in a Genoese prison. The book inspired later explorers, though historians debate how much he saw himself.',
 'Christopher Columbus is known to have owned and annotated a copy of Marco Polo’s book.', 45.44, 12.33, 'Venice, Italy', 'Born', 'Venice, 1254', 'Travels to the court of Kublai Khan', 'His book opened Europe’s imagination to Asia');
addF(2, 'Harsha', 'Emperor of northern India', 'c. 590 – 647 CE', 'harsha', 'Harsha', 'Ruled much of northern India after the Gupta Empire.',
 'Harsha (Harshavardhana) became king of Thanesar in 606 CE and built a large kingdom in northern India with his capital at Kannauj. He was also a writer and a patron of learning.',
 'The Chinese Buddhist monk Xuanzang visited his court and described his generosity and the university at Nalanda. After Harsha died in 647 CE his empire broke up.',
 'Harsha is traditionally credited with writing three Sanskrit plays, including Ratnavali.', 27.05, 79.92, 'Kannauj, Uttar Pradesh, India', 'Born', 'Thanesar, c. 590', 'Kannauj, Xuanzang’s visit, support for Nalanda', 'A well-documented ruler of early medieval India');
addF(3, 'Shah Jahan', 'Mughal emperor', '1592 – 1666 CE', 'shahjahan', 'Shah_Jahan', 'Built the Taj Mahal and made Mughal architecture famous.',
 'Shah Jahan became the fifth Mughal emperor in 1628. His reign saw great building, including the Red Fort and Jama Masjid in Delhi and the Taj Mahal, begun in 1631 as a tomb for his wife Mumtaz Mahal.',
 'He founded the walled city of Shahjahanabad, now Old Delhi. In 1658 his son Aurangzeb took the throne, and Shah Jahan spent his last years confined in Agra Fort.',
 'The Taj Mahal took about 22 years to build and is a UNESCO World Heritage Site.', 27.17, 78.04, 'Agra, Uttar Pradesh, India', 'Born', 'Lahore, 1592', 'The Taj Mahal, the Red Fort, Shahjahanabad', 'He defined the high point of Mughal architecture');
addF(3, 'William Shakespeare', 'Playwright and poet', '1564 – 1616 CE', 'shakespeare', 'William_Shakespeare', 'England’s most famous writer, author of Hamlet and Romeo and Juliet.',
 'Born in Stratford-upon-Avon, Shakespeare became an actor and writer in London. He wrote about 37 plays, including Hamlet, Macbeth, Othello and Romeo and Juliet, and 154 sonnets.',
 'His company performed at the Globe Theatre, and his plays were collected in the First Folio in 1623, seven years after his death. His works have been translated into many languages.',
 'He is credited with popularising many English words and phrases, though some of those claims are exaggerated.', 52.19, -1.71, 'Stratford-upon-Avon, England', 'Born', 'Stratford-upon-Avon, 1564', 'Hamlet, Macbeth, the Globe Theatre', 'His plays are performed around the world today');
addF(4, 'Abraham Lincoln', '16th President of the United States', '1809 – 1865 CE', 'lincoln', 'Abraham_Lincoln', 'Led the United States through the Civil War and helped end slavery.',
 'Abraham Lincoln was born in a log cabin in Kentucky and became a lawyer in Illinois. He was elected president in 1860, and eleven Southern states then left the Union.',
 'He led the Union through the Civil War, issued the Emancipation Proclamation in 1863 and backed the 13th Amendment, which abolished slavery. He was shot at Ford’s Theatre on 14 April 1865 and died the next day.',
 'His Gettysburg Address of 1863 is only about 270 words long.', 38.89, -77.05, 'Lincoln Memorial, Washington, D.C., USA', 'Born', 'Near Hodgenville, Kentucky, 1809', 'The Civil War, the Emancipation Proclamation', 'Remembered for preserving the Union and ending slavery');
addF(4, 'Winston Churchill', 'Prime Minister of the United Kingdom', '1874 – 1965 CE', 'churchill', 'Winston_Churchill', 'Led Britain through most of World War II.',
 'Winston Churchill was a soldier, journalist and politician before he became Prime Minister in May 1940, as Nazi Germany swept across Europe.',
 'His speeches rallied Britain, and he worked with the United States and the Soviet Union against Germany. He lost the 1945 election, returned as Prime Minister in 1951 and won the Nobel Prize in Literature in 1953.',
 'Many historians strongly criticise his policies in India, including during the 1943 Bengal famine.', 51.84, -1.36, 'Blenheim Palace, England', 'Born', 'Blenheim Palace, 1874', 'Leading Britain in World War II, speeches, writing', 'A towering and much-debated figure of the 20th century');
addF(4, 'Vladimir Lenin', 'Revolutionary and first leader of the Soviet state', '1870 – 1924 CE', 'lenin', 'Vladimir_Lenin', 'Led the Bolsheviks in the 1917 October Revolution.',
 'Vladimir Lenin, born Vladimir Ulyanov, led the Bolshevik party. After the Russian Revolution of 1917 he headed the new Soviet government.',
 'He led the Bolsheviks to victory in the Russian Civil War and helped found the Soviet Union in 1922. A one-party state with harsh repression took shape under him, and he died in 1924.',
 'His embalmed body has been on display in a mausoleum in Moscow’s Red Square since 1924.', 54.32, 48.39, 'Ulyanovsk (formerly Simbirsk), Russia', 'Born', 'Simbirsk, 1870', 'The October Revolution, founding the Soviet state', 'His ideas, called Leninism, shaped communist movements worldwide');
addF(4, 'Mao Zedong', 'Chinese Communist leader', '1893 – 1976 CE', 'mao', 'Mao_Zedong', 'Founded the People’s Republic of China in 1949.',
 'Mao Zedong helped found the Chinese Communist Party in 1921 and led it through the Long March and the civil war against the Nationalists. He proclaimed the People’s Republic on 1 October 1949.',
 'He ruled until 1976. His Great Leap Forward (1958 – 62) was followed by a catastrophic famine, and the Cultural Revolution (1966 – 76) caused great upheaval. Historians estimate that tens of millions died in the famine.',
 'His portrait still hangs at Tiananmen, the entrance to the Forbidden City in Beijing.', 27.92, 112.53, 'Shaoshan, Hunan, China', 'Born', 'Shaoshan, Hunan, 1893', 'The Long March, founding the PRC, the Cultural Revolution', 'He remains a deeply debated figure in China and abroad');
addF(4, 'Jawaharlal Nehru', 'First Prime Minister of India', '1889 – 1964 CE', 'nehru', 'Jawaharlal_Nehru', 'Led India as Prime Minister from independence in 1947 until 1964.',
 'Jawaharlal Nehru, born in Allahabad (now Prayagraj), became a leader of the Indian National Congress and a close associate of Mahatma Gandhi. He spent about nine years in British prisons.',
 'He became India’s first Prime Minister on 15 August 1947 and gave the “Tryst with Destiny” speech. He promoted a democratic constitution, planned industrial growth, science institutions such as the IITs, and non-alignment in the Cold War.',
 'His birthday, 14 November, is celebrated as Children’s Day in India.', 25.43, 81.84, 'Prayagraj, Uttar Pradesh, India', 'Born', 'Allahabad, 1889', 'Tryst with Destiny, planning, non-alignment', 'He helped set up India’s democratic institutions');
addF(4, 'Ada Lovelace', 'Mathematician and early computing pioneer', '1815 – 1852 CE', 'lovelace', 'Ada_Lovelace', 'Wrote what is often called the first computer program.',
 'Ada Lovelace, daughter of the poet Lord Byron, studied mathematics and worked with Charles Babbage on his proposed Analytical Engine.',
 'In 1843 she published notes that included a method for the engine to calculate Bernoulli numbers, often called the first computer program, and she suggested such machines could work with more than numbers.',
 'The programming language Ada is named in her honour.', 51.51, -0.13, 'London, England', 'Born', 'London, 1815', 'Notes on the Analytical Engine', 'She is seen as a visionary of the computer age');
addF(4, 'Subhas Chandra Bose', 'Indian nationalist leader', '1897 – c. 1945 CE', 'bose', 'Subhas_Chandra_Bose', 'Led the Indian National Army and fought for independence from outside India.',
 'Born in Cuttack, Subhas Chandra Bose passed the Indian Civil Service exam but resigned in 1921 to join the freedom movement. He was twice elected president of the Congress but left it after differences with Gandhi.',
 'During World War II he sought foreign support, led the Indian National Army with Japanese help and formed the Provisional Government of Free India in 1943. He is reported to have died in a plane crash in Taiwan in August 1945; the details remain debated.',
 'He popularised the greeting “Jai Hind” and the slogan “Delhi Chalo”.', 20.46, 85.88, 'Cuttack, Odisha, India', 'Born', 'Cuttack, 1897', 'The Indian National Army, “Delhi Chalo”', 'Honoured across India as a symbol of the freedom struggle');
addF(4, 'Rani Lakshmibai', 'Queen of Jhansi', 'c. 1828 – 1858 CE', 'lakshmibai', 'Lakshmibai,_Rani_of_Jhansi', 'A leader of the 1857 uprising against the East India Company.',
 'Born Manikarnika in Varanasi, she married the ruler of Jhansi and became queen. After her husband’s death the East India Company refused to recognise her adopted son and annexed Jhansi in 1854 under the Doctrine of Lapse.',
 'In the Rebellion of 1857 she led the defence of Jhansi against British forces in 1858, then escaped and joined other rebel leaders. She died fighting near Gwalior in June 1858.',
 'She is remembered in the famous Hindi poem “Jhansi ki Rani” by Subhadra Kumari Chauhan.', 25.45, 78.57, 'Jhansi, Uttar Pradesh, India', 'Born', 'Varanasi, c. 1828', 'The siege of Jhansi, the Rebellion of 1857', 'A lasting symbol of courage and resistance in India');

facts.push(
 'Ashurbanipal’s library at Nineveh held tens of thousands of clay tablets, and the best-preserved copies of the Epic of Gilgamesh come from it.',
 'Around 450 CE, Teotihuacan may have had more than 100,000 residents, making it one of the largest cities in the world at that time.',
 'The word “algorithm” comes from the name of al-Khwarizmi, a mathematician who worked in Baghdad in the 9th century.',
 'Srinivasa Ramanujan, who had almost no formal training in advanced mathematics, wrote to G. H. Hardy in 1913 and was invited to Cambridge.',
 'The dry-stone walls of Great Zimbabwe were built without mortar, and the Great Enclosure’s outer wall is about 250 metres long.',
 'The Obelisk of Axum was taken to Rome in 1937 and only returned to Ethiopia in 2005.'
);
