﻿function log(val, message) {
    if (message) console.log(message);
    console.log(JSON.stringify(val));
    return val;
  }
  
  

var app = angular.module('myApp', []);
  
app.controller('myCtrl', function($scope) {
  $scope.log = log;
  $scope.endNotes = [
    [1,1,0,0, 'תהלים קי"ט ח'],
  [1,1,3,1, 'משמע עשיה בפועל וגם צפיה כמו ואביו שמר את הדבר'],
  [1,2,0,0, 'כעין תהלים מ"ב ג\''],
  [1,3,1,2, 'כעין משלי ט"ו כ"ה'],
  [1,3,1,1, 'יעמיד'],
  [1,3,3,2, 'הר המריה שהוא הר הבית'],
  [1,4,0,0, 'משלי שם'],
  [1,4,1,1, 'ענין איבוד'],
  [2,1,0,0, 'דברים ל"א י"א בדרך מליצה'],
  [2,2,0,0, 'כעין שם'],
  [2,3,0,0, 'כעין ישעיה כ"ט ז\' נאספים על אריאל למלחמה'],
  [2,3,3,1, 'כינוי למזבח או למקדש'],
  [2,4,0,0, 'כעין תהלים כ"ד ו\''],
  [3,3,0,0, 'כעין ישעיה ט"ז ד\''],
  [3,4,0,0, 'כעין שם'],
  [4,1,0,0, 'מדברים בכל רוחות העולם'],
  [4,2,1,2, 'יש להם שכר ונשלמה פרים שפתינו'],
  [4,2,3,1, 'יש בכוונה ב\' פשטים במילת דבר א\' שכר כמו עשיית הדבר בפועל וב\' שכר הדבור כמו וזה דבר השמטה'],
  [4,3,0,0, 'משנה סוטה דף מא והוא ענין הקהל שהוא על ידי המלך'],
  [5,3,0,0, 'כינוי לתורה כעין משלי ד\' ב\''],
  [5,4,3,1, 'עזרת נשים למטה בהר מעזרת ישראל'],
  [6,1,0,0, 'כל האמורים במשנה ריש חגיגה חרש שוטה עבד סומא חולה וזקן וכן שומע ואינו מדבר (שם דף ג\')'],
  [6,2,3,1, 'של הקהל'],
  [6,3,3,1, 'טהורה'],
  [6,4,0,0, 'הוא הדין שגדולים טמאים פטורים'],
  [7,1,1,1, 'של פרשת המלך'],
  [7,2,0,0, 'שעליה תהיה הקריאה'],
  [7,3,3,1, 'אין לעשותו'],
  [7,4,0,0, 'טעם הירושלמי למה אין עושין הקהל ביום טוה מפני דוחק העזרה' + 
  ' ותוספות פירשו משום דכתיב במועד ודרשינן בתוך המועד ולא בתחלתו ממש' + 
  ' ולזה יש לפרש שלא יהיו המקראות דחוקים'],
  [8,1,0,0, 'פרש"י בסוטה דף מ\' שמש'],
  [8,3,2,2, 'לפרש"י שם הוא מה שאנו קורין גבאי'],
  [8,4,0,0, 'שם בגמרא דף מ"א כולה משום כבוד המלך ופרש"י בדף מ\' שמראין את מעלותיו מעלה למעלה ממעלה'],
  [9,1,1,1, 'כמו נטלו'],
  [9,1,2,2, 'סגן כהן גדול'],
  [9,2,2,2, 'כהן גדול'],
  [9,3,2,1, 'משה'],
  [9,3,2,2, 'כאלו התורה אומרת כן כמו במשלי ח\' כד"ב ה\' קנני ' +
  'ועיין בדברי רש"ר הירש על דברים ל"א י\' שאפשר שכוונת הכתוב של תקרא את התורה הזאת' + 
  ' הוא לאותו ספר תורה שכתבו משה במקרא שלפני פניו באותה פרשה ויכתב משה את התורה' + 
  ' הזאת שנתנה בארון אם מותר להוציאו להקהל או שהוא קאי על ספר תורה שנתנה לשבט לוי' + 
  ' וכן משמע מרש"י ב"ב דף י"ד בפירוש. אשרי עין שראתה כתב ידו של משה רבינו ונזכה לראותה בב"א'],
  [9,4,2,2, 'שיש לו כתר על ראשו'],
  [10,1,0,0, 'משנה במסכת סוטה שם'],
  [10,2,0,0, 'שם. אם רצה לישב הרשות בידו'],
  [10,3,3,1, 'קודם הקריאה הנקרא למוד שנאמר למען ילמדון ודרשינן יְלַמֵּדוּן'],
  [10,4,0,0, 'רמב"ם פ"ג ה"ד מהלכות חגיגה'],
  [11,1,0,0, 'משנה שם שמתחיל מאלה הדברים שהוא תחלת הספר'],
  [11,1,1,2, 'כינוי למשנה תורה'],
  [11,2,0,0, 'פרשת שמע ישראל והיינו עד דברים ה\' ט\''],
  [11,3,0,0, 'שכר עשית המצות למען ירבו ימיכם וגו\''],
  [11,4,0,0, 'היינו דברים י"א יג-כא'],
  [12,2,0,0, 'לפרש"י על המשנה בסוטה שם קרא פרשת מעשר בפרשת ראה (דברים ט"ז כ"ב-כ"ט) סמוך' + 
  ' לפרשת מעשר בכי תבא (כ"ו י"ב-ט"ז) אע"פ שקורא אשימה עלי מלך (י"ז י"ד-כ\') שמקומו ביניהם אחר כן'],
  [12,3,3,1, 'מסירין אותו ממקומו'],
  [12,4,2,1, 'באמצע'],
  [12,4,3,1, 'מקום כתיבתו'],
  [13,2,0,0, 'כ"ז א\'-כ"ח ס"ט'],
  [13,3,1,1, 'לפניה ולאחריה'],
  [13,4,0,0, 'משנה בריש אלו נאמרין סוטה דף ל"ב והרמב"ם בהלכה ה\' כתב שגם בברכות דינא הכי'],
  [13,4,3,1, 'נאמרות'],
  [14,1,0,0, 'כמו שאר קורא בתורה'],
  [14,1,3,1, 'פותח ובמקרא ברוב מקומות הוא בענין פתיחת הפה'],
  [14,1,0,0, 'סדר הברכות נמצא ברמב"ם שם ה"ד'],
  [14,2,0,0, 'ברכת רצה עד שאותך לבדך ביראה נעבוד'],
  [14,3,0,0, 'היפוך של רצה וכו\' בעמך ישראל'],
  [14,4,0,0, 'ברכת מודים עד ולך נאה להודות'],
  [15,1,0,0, 'אתה בחרתנו עד מקדש ישראל והזמנים'],
  [15,3,3,1, 'המקדש הנקרא אהל מועד'],
  [15,4,2,2, 'היפוך השוכן בציון הנזכר ברמב"ם'],
  [16,1,0,0, 'כעין שמואל א ב\' י\' והוא תפלה על ישראל שתעמוד מלכותם'],
  [16,2,2,2, 'ברמב"ם הנוסח הבוחר בישראל'],
  [16,3,0,0, 'תפלה על הכהנים'],
  [16,3,2,2, 'דכהנים שלוחי דרחמנא נינהו במסכת קדושין דף כ"ג'],
  [16,4,0,0, 'וחותם מקדש הכהנים'],
  [17,1,0,0, 'לשון הרמב"ם מתחנן ומתפלל בה כפי מה שהוא יכול'],
  [17,3,0,0, 'עוד שם הושע ה\' את עמך ישראל שעמך צריכין להושע'],
  [17,4,0,0, 'זהו החתימה'],
  [18,1,0,0, 'חוזר ומפרש שבעת צאת העם עוד למלאכת הארץ'],
  [18,2,0,0, 'לשון הרמב"ם ה"ו לשמוע באימה ויראה וגילה ברעדה כיום שניתנה בו בסיני'],
  [18,3,2,1, 'זרע'],
  [18,3,3,1, 'בן יהודה ראש משפחת מלכות בית דוד כמו שמיוחס בסוף מגלת רות'],
  [18,4,3,1, 'כינוי להקב"ה'],
  [18,4,0,0, 'לשון הרמב"ם ויראה עצמו כאילו עתה נצטוה בה ומפי הגבורה שומעה שהמלך שליח הוא להשמיע דברי הﭏ'],
  [19,1,0,0, 'עכשיו מתפללין על הגאולה'],
  [19,1,1,1, 'שמע'],
  [19,1,3,1, 'קריאה כמו שאומרים בברכת גאלה בעת שועם אליו'],
  [19,2,3,1, 'אחת מסממני קטרת בשמות ל\' ל"ד'],
  [19,2,0,0, 'דברים ל"א י"ב בדרך מליצה אתה ה\' עשה ההקהל כי אנו מושבעין ועומדין שלא לעלות בחומה'],
  [19,4,0,0, 'שם'],
  [20,3,0,0, 'למענך עשה ולא לנו'],
  [20,4,3,1, 'ענין שבירה והשלכה כמו בברכת המינים תעקר ותשבר ותמגר'],
  [21,1,0,0, 'כעין ישעיה ל"ה י\' ונ"א י"א ושמחת עולם על ראשם'],
  [21,1,2,1, 'שלא תפסיק'],
  [21,1,3,1, 'על ראשם ככתר'],
  [21,2,0,0, 'שם ושם ופדויי ה\' ישובון וגו\''],
  [21,3,0,0, 'כעין עמוס ט\' י\''],
  [21,3,2,1, 'בית המקדש ורמז גם לחג הסכות'],
  [21,3,3,1, 'תגביה'],
  [21,4,0,0, 'כעין תהלים צ"ב ט"ו ולא תתקיים עוד קללת ונושמתם'],
  [22,2,1,1, 'אמור להם'],
  [22,2,3,1, 'פה'],
  [22,3,0,0, 'כעין תהלים קמ"ז ב\' בונה ירושלם ה\''],
  [22,4,0,0, 'מעין החתימה']
  ];
  $scope.content = (function() {
    var hebrewText =
	[
      ['אֶת־חֻקֶּֽיךָ אֶשְׁמֹר',  'מָתַי אָבוֹא וְאֶרְאֶה',  'יַצֵּב גְּבוּל הַר־מוֹר',  'יִסַּח כָּל־בֵּית גֵּאֶה'],
      ['בְּבֹא כָל־יִשְׂרָאֵל',  'לֵרָאוֹת פְּנֵי אֲדוֹנָיו',  'וְיִהְיוּ צוֹבְאֵי אֲרִיאֵל',  'דּוֹר מְבַקְשֵׁי פָנָיו'],
      ['גְּדוֹר פִּרְצָתֵֽנוּ',  'מִבְצָרֵֽנוּ תְאַמֵּץ',  'סֵֽתֶר הֱוֵה־לָֽנוּ',  'כַּלֵּה שֹׁד וָמֵץ'],
      ['דּוֹבֲבִים בְּכָל־צַד',  'מְקַבְּלִים שְׂכַר דָּבָר',  'פָּרָשַׁת מֶֽלֶךְ כֵּיצַד',  'כְּאִלּוּ נַעֲשָׂה כְבָר'],
      ['הַקְהֵל מוֹצְאֵי יוֹם־טוֹב',  'מִקֵּץ שְׁנַת הַשְּׁמִטָּה',  'קְרִיאַת לֶֽקַח־טוֹב',  'בְּעֶזְרַת נָשִׁים לְמַֽטָּה'],
      ['וְכֹל פָּטוּר מֵרְאִיָּה',  'אֵינוֹ שׁוֹמֵֽעַ קְרִיאָה',  'לְבַד מֵאִשָּׁה רְאוּיָה',  'וְכָל־טַף בְּלִי טוּמְאָה'],
      ['זְמַנָּהּ כַּאֲשֶׁר הִגִּֽיעַ',  'בְּבִימַת עֵץ עוֹסְקִים',  'וְקֹֽדֶם יֵשׁ לְהַמְנִֽיעַ',  'שֶׁלֹּא יְהוּ דְחוּקִים'],
      ['חַזַּן הַכְּנֶֽסֶת',  'נוֹטֵל בְּיָדוֹ תּוֹרָה',  'נוֹתֵן לְרֹאשׁ כְּנֶֽסֶת',  'לַרְבּוֹת בַּמֶּֽלֶךְ שְׂרָרָה'],
      ['טִלְטְלוֹ כֹהֵן שֵׁנִי',  'וְאַחֲרָיו כֹּהֵן הָרֹאשׁ',  'יִתֵּן חֶֽבֶר כְּתָבָֽנִי',  'לַמֶּֽלֶךְ, כֶּתֶר בָּרֹאשׁ'],
      ['יְקַבֵּל כְּשֶׁהוּא עוֹמֵד',  'בְּחִירָה לֵישֵׁב מִמֶּֽנּוּ',  'מְבָרֵךְ בְּבֺאוֹ לְלַמֵּד',  'אֲשֶׁר בָּֽחַר בָּֽנוּ'],
      ['כֵּֽפֶל תּוֹרָה מַתְחִיל',  'עַד סוֹף קְרִיאַת שְׁמַע',  'וְאֵת הָאָֽרֶץ תַּנְחִיל',  'אִם שָׁמֺֽעַ תִּשְׁמַע'],
      ['לְצָרֵף פַּרְשִׁיּוֹת מַעֲשֵׂר',  'בִּרְאֵה וּבְכִי תָבוֹא',  'שֹוֹם תָּשִׂים לְהָסֵר',  'אַף שֶׁבַּתָּֽוֶךְ מִכְתָּבוֹ'],
      ['מֶֽלֶךְ גּוֹמֵר אַזְהָרוֹת',  'בְּעִנְיַן בְּרָכוֹת וּקְלָלוֹת',  {content:'בְּרָכוֹת וְגַם תּוֹרוֹת', acrostic:2},  'בִּלְשׁוֹן־קֹֽדֶשׁ מְמֻלָּלוֹת'],
      ['נָטַע בְּתוֹכֵֽנוּ פּוֹצֶה',  'וּמִתְפַּלֵּל עַל עֲבוֹדוֹת',  'יִשְׂרָאֵל עַמְּךָ תִּרְצֶה',  'וּלְךָ נָאֶה לְהוֹדוֹת'],
      ['סוֹדֵר בִּרְכַּת הַמּוֹעֵד',  'וְשׁוֹאֵל אַחֲרֵי־כֵן',  'שְׁמֹר בֵּית מוֹעֵד',  'וְגוֹמֵר בְּצִיּוֹן שׁוֹכֵן'],
      ['עֺז תֵּן לְמַלְכוּתֶֽךָ',  'וְחוֹתֵם בּוֹחֵר בְּיִשְׂרָאֵל',  'רְצֵה שְׁלוּחֵי עֲבֺדָתֶֽךָ',  'מְבָרֲכֵי עַמְּךָ יִשְׂרָאֵל'],
      ['פּוֹתֵֽחַ פִּיו בְּשַׁוְעָה',  'עַד תְּפִלָּתוֹ כִּלָּה',  'אֶת־עַמְּךָ הוֹשִֽׁיעָה',  'בָּרוּךְ שׁוֹמֵֽעַ תְּפִלָּה'],
      ['צֵאת שַׁבַּת הָאָֽרֶץ',  'לִקְבּֽוֹעַ יִרְאָה בְרוּרָה',  'לִשְׁמֽוֹעַ נִין פֶּֽרֶץ',  'כְּמוֹ מִפִּי גְבוּרָה'],
      ['קְשׁוֹב עֵת שַׁוְּעָם',  'כְּמוֹ הַקְטָרַת נָטָף',  'הַקְהֵל אֶת־הָעָם',  'הָאֲנָשִׁים וְהַנָּשִׁים וְהַטָּף'],
      ['רַחֵם עַל יִשְׂרָאֵל',  'כָּל־הָאֶזְרָח וְהַגֵּר',  'לָֽמָּה יֹאמְרוּ אַיֵּה־ﭏֵ',  'גּוֹיִם אֲשֶׁר תְּמַגֵּר'],
      ['שִׂמְחַת עוֹלָם כַּתְּרֵם',  'פְּדוּיֶיךָ יְשׁוּבוּן',  'וְגַם סֻכָּתְךָ הָרֵם',  'בְּשֵׂיבָה עוֹד יְנוּבוּן'],
      ['תְּאֵבֵי יִשְׁעֲךָ קְנֵה',  'עֲנֵם גּֽוּשׁוּ הֲלֹם',  'יְרוּשָׁלִַם בְּנֵה',  'פְּרוֹשׂ עָלֶֽיהָ שָׁלוֹם']
    ];

	var englishText =
	[
		[
			'For your statutes, I am in suspense',
			'O when will I arrive and see',
			'He will erect \'round Moriah a fence',
			'Decimate the house of all haughty'
		],
		[
			'At the arrival of all Israel',
			'To appear before its Master',
			'And those previously ganged on Ariel',
			'Will be a generation wishing to find favor'
		],
		[
			'For our breach, construct a wall',
			'To our stronghold, do give might',
			'A shelter You will be for us all',
			'Finish off plunderer and parasite'
		],
		[
			'In every direction enunciating',
			'Receiving the reward of the matter',
			'How to read the chapter of the king',
			'Having been done to the letter'
		],
		[
			'The assembly - when the first day ends',
			'At the end of the sabbattical year',
			'The reading of the best of dividends',
			'In the women\'s forecourt - to hear'
		],
		[
			'All absolved from appearing',
			'Need not assemble to hear',
			'Besides women who are fitting',
			'And children - from impurity clear'
		],
		[
			'When the time comes, finally',
			'A wooden platform - they assemble',
			'But not prior or too early',
			'So the space will be ample'
		],
		[
			'The overseer of the assembly',
			'Lifts up the Torah scroll',
			'Hands it to the head of the assembly',
			'To elevate the king\'s role'
		],
		[
			'To the second kohen, it then pasess',
			'Subsequently, to the head kohen',
			'Who gives the scroll written by Moses',
			'To the king, crowned by his bretheren'
		],
		[
			'He accepts it while standing',
			'The choice to sit is his option',
			'Blessing at the start of the teaching',
			'He Who chose us as His nation'
		],
		[
			'He opens with Deutoronomy',
			'Until the Shema\'s conclusion',
			'Then, "You will have autonomy',
			'If, to His command is your attention"'
		],
		[
			'To combine the tithe topic',
			'In Re\'eh and in Ki Thavoh',
			'Postpone "A king, you wil pick"',
			'It is written in the middle, though'
		],
		[
			'The king concludes the warnings',
			'With "blessings and curses"',
			'The blessings and the readings',
			'In the Holy Tounge he expresses'
		],
		[
			'Nota B\'thochenu, he does recite',
			'Then prays regarding the services',
			'With your people Israel find delight',
			'The thanksgiving prayer he blesses'
		],
		[
			'The festival blessing gets mention',
			'Then beseeches, continuing on',
			'O guard the house of convocation',
			'And finishes, "Dweller of Zion"'
		],
		[
			'Give strength to Your regents',
			'And ends with, "Elector of Israel"',
			'Be kind to your priestly agents',
			'They who bless your nation Israel'
		],
		[
			'Opening his mouth with entreaties',
			'Until his prayer\'s conclusion',
			'O save your nation from calamities',
			'Blessed be The Listener of Supplication'
		],
		[
			'When the land concludes its resting',
			'Heaven\'s awe impressed with clarity',
			'By hearing Peretz\'s offspring',
			'As if from the mouth of the Deity'
		],
		[
			'Be attentive when they shout',
			'Like the Ketores\'s sweet scents',
			'Gather in the entire nation',
			'The men, women, and infants'
		],
		[
			'On Israel have much mercy',
			'The convert and the citizen',
			'Why tolerate the blasphemy',
			'Of those you wish to bludgeon'
		],
		[
			'Eternal joy around them encircle',
			'Your redeemed ones will come back',
			'Also uplift your Tabernacle',
			'In old age, they will not slack'
		],
		[
			'Those desiring Your salvation acquire',
			'Tell them, "Return; be near"',
			'Build Jerusalem, burnt by fire',
			'Spread peace upon her there'
		]
	];
    var result = [];
    angular.forEach(hebrewText, function(stanza, stanzaIndex){
      var newStanza = [];
      angular.forEach(stanza, function(bayith, bayithIndex){
        newStanza.push({
          content: angular.isString(bayith) ? bayith : bayith.content,
		  englishContent: englishText[stanzaIndex][bayithIndex],
          acrostic: angular.isString(bayith) ? (bayithIndex % 2 == 0 ? 1 : 0) : bayith.acrostic
        });
      });
      result.push(newStanza);
    });
  return result;
  })();
  
  $scope.bayith = function(stanza, line, column) {
	return stanza[(line * 2) + ((column + Math.floor(column / 2)) % 2)];
  }
  
  $scope.doNote = function(note) {
    return $scope.content[note[0] - 1][note[1] - 1].content.replace(
    /־/g, ' '
  ).replace(
    /[^א-ת ]/g, ''
  ).replace(
    new RegExp (
        '([^ ]+ ){'+(note[2] -1 )+'}(([^ ]+ ){'+(note[3]-1)+'}[^ ]+).*'
      ),
      '$2'
  );
  };
  
  $scope.letters = function(stanza, line, column, other) {
    var bayith = $scope.bayith(stanza, line, column);
	var number = bayith.acrostic || 0;
    var text = bayith[column < 2 ? 'content' : 'englishContent'];
	if(number == 0){
      return other ? text: '';
    }
    return text.replace(
      new RegExp(
        '^([^\u05d0-\u05ea]*([\u05d0-\u05ea][^\u05d0-\u05ea]*){' + number + '})(.*)$'
      ),
      other ? '$3' : '$1'
    );
  }

});
