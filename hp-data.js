/* HISTORIA data for search, map and quiz. Edit names so they match your site's cards.
   n=name, t=civ|fig, p=period, la/lo=latitude/longitude, r=region, b=short blurb, k=extra search words */
window.HP_DATA={
periods:["Ancient","Medieval","Early Modern"],
colors:{"Ancient":"#d4af37","Medieval":"#7fb5ff","Early Modern":"#e88a6a"},
items:[
{n:"Mesopotamia",t:"civ",p:"Ancient",la:33.3,lo:44.4,r:"Iraq",b:"Land between the Tigris and Euphrates; home of Sumer and early cuneiform writing.",k:"sumer babylon iraq"},
{n:"Ancient Egypt",t:"civ",p:"Ancient",la:29.98,lo:31.13,r:"Egypt",b:"Nile civilization of pharaohs, pyramids and hieroglyphs.",k:"pharaoh pyramid nile"},
{n:"Indus Valley",t:"civ",p:"Ancient",la:27.33,lo:68.14,r:"Pakistan / India",b:"Planned cities such as Mohenjo-daro and Harappa, mature phase c. 2600-1900 BCE.",k:"harappa mohenjo daro"},
{n:"Ancient Greece",t:"civ",p:"Ancient",la:37.97,lo:23.73,r:"Greece",b:"City-states like Athens and Sparta; philosophy, theatre and early democracy.",k:"athens sparta"},
{n:"Roman Empire",t:"civ",p:"Ancient",la:41.9,lo:12.5,r:"Italy",b:"From a city on the Tiber to an empire around the Mediterranean.",k:"rome"},
{n:"Ancient China",t:"civ",p:"Ancient",la:34.34,lo:108.94,r:"China",b:"Dynasties from Shang to Han; the Qin unified China in 221 BCE.",k:"qin han shang"},
{n:"Persian Empire",t:"civ",p:"Ancient",la:29.93,lo:52.89,r:"Iran",b:"The Achaemenid Empire, founded by Cyrus the Great; Persepolis was a ceremonial capital.",k:"achaemenid cyrus iran"},
{n:"Maya Civilization",t:"civ",p:"Ancient",la:20.68,lo:-88.57,r:"Mexico / Central America",b:"Mesoamerican city-states with advanced astronomy and a hieroglyphic script.",k:"mayan chichen itza"},
{n:"Byzantine Empire",t:"civ",p:"Medieval",la:41.01,lo:28.98,r:"Turkey",b:"The Eastern Roman Empire, centred on Constantinople until 1453.",k:"constantinople eastern rome"},
{n:"Mongol Empire",t:"civ",p:"Medieval",la:47.2,lo:102.84,r:"Mongolia",b:"Founded by Genghis Khan in 1206; the largest contiguous land empire in history.",k:"genghis khan"},
{n:"Mali Empire",t:"civ",p:"Medieval",la:16.77,lo:-3.0,r:"West Africa",b:"West African empire famed for gold and Timbuktu; Mansa Musa ruled in the 1300s.",k:"mansa musa timbuktu"},
{n:"Vijayanagara Empire",t:"civ",p:"Medieval",la:15.335,lo:76.462,r:"India",b:"South Indian empire (1336-1646) whose capital Hampi is a UNESCO World Heritage Site.",k:"hampi"},
{n:"Ottoman Empire",t:"civ",p:"Early Modern",la:40.19,lo:29.06,r:"Turkey",b:"Founded c. 1299; captured Constantinople in 1453 and lasted until 1922.",k:"osman turkey"},
{n:"Aztec Empire",t:"civ",p:"Early Modern",la:19.43,lo:-99.13,r:"Mexico",b:"Triple Alliance centred on Tenochtitlan; fell to Spanish-led forces in 1521.",k:"tenochtitlan mexica"},
{n:"Inca Empire",t:"civ",p:"Early Modern",la:-13.52,lo:-71.97,r:"Peru",b:"Largest empire of pre-Columbian America, centred on Cusco.",k:"cusco machu picchu andes"},
{n:"Mughal Empire",t:"civ",p:"Early Modern",la:27.18,lo:78.04,r:"India",b:"Founded by Babur in 1526; Agra is home to the Taj Mahal.",k:"babur taj mahal"},
{n:"Ashoka",t:"fig",p:"Ancient",la:25.61,lo:85.14,r:"India",b:"Mauryan emperor (c. 268-232 BCE) who embraced Buddhism after the Kalinga war.",k:"maurya"},
{n:"Alexander the Great",t:"fig",p:"Ancient",la:40.76,lo:22.52,r:"Macedonia",b:"Macedonian king, born at Pella in 356 BCE, who built a vast empire by age 32.",k:"macedon"},
{n:"Cleopatra",t:"fig",p:"Ancient",la:31.2,lo:29.92,r:"Egypt",b:"Cleopatra VII, the last active ruler of Ptolemaic Egypt.",k:"ptolemy alexandria"},
{n:"Shivaji",t:"fig",p:"Early Modern",la:18.23,lo:73.44,r:"Maharashtra, India",b:"Founder of the Maratha Empire; crowned at Raigad in 1674.",k:"chhatrapati maratha raigad"},
{n:"Akbar",t:"fig",p:"Early Modern",la:27.09,lo:77.67,r:"India",b:"Mughal emperor (r. 1556-1605) known for administration and the policy of sulh-i-kul.",k:"mughal fatehpur sikri"}
],
quiz:[
{p:"Ancient",q:"Which writing system, developed in Sumer, is among the earliest known?",o:["Hieroglyphs","Cuneiform","Runes","Linear A"],a:1,e:"Cuneiform began in Sumer around 3300-3000 BCE, pressed into clay with a reed."},
{p:"Ancient",q:"The Rosetta Stone helped scholars decipher which script?",o:["Egyptian hieroglyphs","Maya glyphs","Cuneiform","Indus script"],a:0,e:"Its text in Greek, Demotic and hieroglyphs let Champollion crack hieroglyphs in 1822."},
{p:"Ancient",q:"Which city-state is regarded as the birthplace of democracy?",o:["Sparta","Corinth","Athens","Thebes"],a:2,e:"Athens developed direct democracy in the 5th century BCE."},
{p:"Medieval",q:"Who was proclaimed Genghis Khan in 1206, founding the Mongol Empire?",o:["Kublai","Temujin","Ogedei","Timur"],a:1,e:"Temujin united the Mongol tribes and took the title Genghis Khan."},
{p:"Medieval",q:"In which year did Constantinople fall to the Ottomans?",o:["1204","1389","1453","1526"],a:2,e:"Mehmed II captured the city on 29 May 1453, ending the Byzantine Empire."},
{p:"Medieval",q:"Which ruler of the Mali Empire became famous for his 1324 pilgrimage to Mecca?",o:["Sundiata Keita","Mansa Musa","Askia Muhammad","Sonni Ali"],a:1,e:"Mansa Musa's lavish gold-spending journey was remembered across the Mediterranean world."},
{p:"Early Modern",q:"Who founded the Mughal Empire after the First Battle of Panipat in 1526?",o:["Babur","Akbar","Humayun","Shah Jahan"],a:0,e:"Babur defeated Ibrahim Lodi at Panipat."},
{p:"Early Modern",q:"Which empire was centred on the city of Cusco?",o:["Aztec","Maya","Inca","Olmec"],a:2,e:"Cusco was the capital of the Inca Empire, known as Tawantinsuyu."},
{p:"Early Modern",q:"Tenochtitlan was the capital of which empire?",o:["Aztec","Inca","Ottoman","Mughal"],a:0,e:"It stood on an island in Lake Texcoco, where Mexico City is today."}
]};
