function log(val, message) {
    if (message) console.log(message);
    console.log(JSON.stringify(val));
    return val;
  }
  
  

var app = angular.module('myApp', []);
  
app.controller('myCtrl', function($scope) {
  $scope.log = log;
  $scope.content = (function() {
    var hebrewText =
	[
      ['אֶת־חֻקֶּֽיךָ אֶשְׁמֹר',  'מָתַי אָבוֹא וְאֶרְאֶה',  'יַצֵּב גְּבוּל הַר־מוֹר',  'יִסַּח כָּל־בֵּית גֵּאֶה'],
      ['בְּבֹא כָל־יִשְׂרָאֵל',  'לֵרָאוֹת פְּנֵי אֲדוֹנָיו',  'וְיִהְיוּ צוֹבְאֵי אֲרִיאֵל',  'דּוֹר מְבַקְשֵׁי פָנָיו'],
      ['גְּדוֹר פִּרְצָתֵֽנוּ',  'מִבְצָרֵֽנוּ תְאַמֵּץ',  'סֵֽתֶר הֱוֵה־לָֽנוּ',  'כַּלֵּה שֹׁד וָמֵץ'],
      ['דּוֹבֲבִים בְּכָל־צַד',  'מְקַבְּלִים שְׂכַר דָּבָר',  'פָּרָשַׁת מֶֽלֶךְ כֵּיצַד',  'כְּאִלּוּ נַעֲשָׂה כְבָר'],
      ['הַקְהֵל מוֹצְאֵי יוֹם־טוֹב',  'מִקֵּץ שְׁנַת הַשְּׁמִטָּה',  'קְרִיאַת לֶֽקַח־טוֹב',  'בְּעֶזְרַת נָשִׁים לְמַֽטָּה'],
      ['וְכֹל פָּטוּר מֵרְאִיָּה',  'אֵינוֹ שׁוֹמֵֽעַ קְרִיאָה',  'לְבַד מֵאִשָּׁה רְאוּיָה',  'וְכָל־טַף בְּלִי טוּמְאָה'],
      ['זְמַנָּהּ כַּאֲשֶׁר הִגִּֽיעַ',  'בְּבִימַת עֵץ עוֹסְקִים',  'וְלֹא קֺֽדֶם שֶׁהִגִּֽיעַ',  'שֶׁלֹּא יְהוּ דְחוּקִים'],
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
			'For our breach construct a wall',
			'Our stronghold do give might',
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
			'Hands to the head of the assembly',
			'To elevate the king\'s role'
		],
		[
			'To the second kohen it then pasess',
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
			'Until the the Shema\'s conclusion',
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
			'Nota B\'thochenu he does recite',
			'Then prays regarding the services',
			'With your people Israel find delight',
			'The thanksgiving parayer he blesses'
		],
		[
			'The festival blessing gets mention',
			'Then beseaches, continuing on',
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
			'Eternal joy will them encircle',
			'Your redeemed will come back',
			'Also uplift your Tabernacle',
			'In old age they will not slack'
		],
		[
			'Those desiring Your salvation aquire',
			'Tell them, "Return; be near"',
			'Build Jerusalem, burnt by fire',
			'Spread piece upon her there'
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
  
  $scope.letters = function(bayith, other) {
    var number = bayith.acrostic || 0;
    var text = bayith.content;
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
