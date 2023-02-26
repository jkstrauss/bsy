function log(val, message) {
    if (message) console.log(message);
    console.log(JSON.stringify(val));
    return val;
  }



var app = angular.module('myApp', ['ngSanitize']);

app.controller('myCtrl', function($scope) {
  $scope.log = log;
  var endNotes = []
  $scope.notes = (stanza) => stanza != null ? endNotes.filter(n => n[0] == stanza) : endNotes
  $scope.noteStanzas = () => [...new Set($scope.notes().map(it => it[0]))]
  $scope.content = []
  $scope.stanzaLetter = (stanza) => 'אבגדהוזחטיכלמנסעפצקרשת'[stanza - 1]

  $scope.doNote = function(note) {
    const contentTarget =
      note[0] < 1 ? $scope.intro[note[1] - 1] :
      note[0] > 22 ? $scope.end :
      $scope.content[note[0] - 1][note[1] - 1].content

   return contentTarget.replace(
    /־/g, ' '
  ).replace(
    /[^ﭏא-ת" ]/g, ''
  ).replace(
    new RegExp (
        '([^ ]+ ){'+(note[2] -1 )+'}(([^ ]+ ){'+(note[3]-1)+'}[^ ]+).*'
      ),
      '$2'
  );
  };

  $scope.letters = function(stanza, obj, other) {
    var bayith = stanza[$scope.displayOption.bayith(obj)];
   var number = bayith.acrostic || 0;
   const fields = {hebrew:'content',english:'englishContent'}
    var text = bayith[fields[$scope.displayOption.language(obj)]]
        .replace(/(([\u05d0-\u05ea][\u05b0-\u05c2\u05af]*\u05c4)+)/g, '<span class="familyName">$1</span>')
        .replace(/\u05c4/g, '');
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

  $scope.punctuation = obj => {
     const lang = $scope.displayOption.language(obj)
     const last = $scope.displayOption.last(obj.column, obj.line)
     return lang == 'english' ?
        (last ? '.' : '') :
       (last ? ':' : '.')
  }

  $scope.init = function() {
     fetch('hakhel.md')
      .then(it => it.text())
      .then(it => {
         $scope.intro = it.split(/\n\n/)
            .splice(0, 3)
            .map(l => l.replace(/\[.*?\]/g, ''))
            .map(l => l.replace(/# /g, ''))

         const allText = it.split(/\n/)
             .splice(6)
            .join('\n')
            .split('\n\n')
         $scope.end = allText.splice(44)[0].replace(/\[.*?\]/g, '')
         const hebrewText = allText
         .filter((l, li) => li % 2 == 0)
         .splice(0, 22)
         .map(l => l.replace(/\[.*?\]/g, ''))
         .map(l => l.split(/\\\n/)
            .map((b, bi) => { return {
               acrostic: (bi % 2) == 0 ?
                  b
                     .replace(/^(([\u05d0-\u05ea][\u05b0-\u05c2]*\u05c4)+).*/, '$1')
                     .replace(/[^\u05c4]/g, '')
                     .length :
                  0,
               content: b
               .replace(/\u0592/g, '')}}))
             var result = [];
         const englishText = allText
         .filter((l, li) => li % 2)
         .splice(0, 22)
         .map(l => l.split(/\\\n/))

         $scope.content = hebrewText
            .map((stanza, stanzaIndex) =>
               stanza.map((bayith, bayithIndex) => ({
                  content: bayith.content,
                  englishContent: englishText[stanzaIndex][bayithIndex],
                  acrostic: bayith.acrostic})))
         endNotes =
            it.split(/\r?\n/)
               .map(n => n.match(/\[\^(?<note>(?<stanza>\d+)\.(?<bayith>\d+)(\.(?<word>\d))?(-(?<endWord>\d+))?)\]: (?<text>.*)/))
               .filter(n => n)
               .map(n => n.groups)
               .map(n => [n.stanza - 0, n.bayith - 0, (n.word || 0) - 0, n.word ? (n.endWord ? (n.endWord - n.word) + 1 : 1) : 0, n.text])
         $scope.$apply()
      })
  }

  $scope.displayOptions = [
    {
      name: 'translateHalfStanza',
      offsetAcrostic: true,
      display: 'Translation in parralel (half stanza)',
      lines: [0, 1],
      bayith: obj => (obj.line * 2) + ((obj.column + Math.floor(obj.column / 2)) % 2),
      language: obj => obj.column < 2 ? 'hebrew' : 'english',
      last: obj => obj.line == 1 && [1, 2].includes(obj.column)
   }, {
      name: 'hebrew',
      display: 'Hebrew Only',
      languageEqualSize: true,
      lines: [0],
      bayith: obj => obj.column,
      language: () => 'hebrew',
      last: obj => obj.column == 3
   }, {
      name: 'facingPage',
      display: 'Translation on Facing Page',
      languageEqualSize: true,
      pages: [0, 1],
      lines: [0],
      bayith: obj => obj.page == 0 ? obj.column : 3 - obj.column,
      language: obj => obj.page == 0 ? 'hebrew' : 'english',
      last: obj => obj.column == 3
   }, {
      name: 'interlinear',
      languageEqualSize: true,
      display: 'Interlinear',
      lines: [0, 1],
      bayith: obj => obj.column,
      language: obj => obj.line == 0 ? 'hebrew' : 'english',
      last: obj => obj.line == 0 && obj.column == 3
   }
  ]
  $scope.noteOptions = [
    {
      name: 'all',
      display: 'Compact End Notes',
      text: true,
      notes: true
   }, {
      name: 'all-split',
      display: 'Split End Notes',
      text: true,
      notes: true,
      split: true
   }, {
      name: 'interleaved',
      display: 'Interleaved',
      text: true,
      interleaved: true
   }, {
      name: 'notes',
      display: 'Compact Notes Only',
      notes: true
   }, {
      name: 'notes',
      display: 'Split Notes Only',
      notes: true,
      split: true
   }, {
      name: 'text',
      display: 'Text Only',
      text: true
   }
  ]
  $scope.displayOption = $scope.displayOptions[0]
  $scope.noteOption = $scope.noteOptions[0]
});
