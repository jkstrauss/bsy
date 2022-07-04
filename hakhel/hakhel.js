function log(val, message) {
    if (message) console.log(message);
    console.log(JSON.stringify(val));
    return val;
  }
  
  

var app = angular.module('myApp', []);
  
app.controller('myCtrl', function($scope) {
  $scope.log = log;
  var endNotes = []
  $scope.notes = (stanza) => stanza != null ? endNotes.filter(n => n[0] == stanza) : endNotes
  $scope.content = []

  $scope.doNote = function(note) {
	return $scope.content[note[0] - 1][note[1] - 1].content.replace(
    /־/g, ' '
  ).replace(
	/וֹ/g, 'ו'
  ).replace(
    /[^ﭏא-ת ]/g, ''
  ).replace(
    new RegExp (
        '([^ ]+ ){'+(note[2] -1 )+'}(([^ ]+ ){'+(note[3]-1)+'}[^ ]+).*'
      ),
      '$2'
  );
  };
  
  $scope.letters = function(stanza, line, column, other) {
    var bayith = stanza[$scope.displayOption.bayith(column, line)];
	var number = bayith.acrostic || 0;
	const fields = {hebrew:'content',english:'englishContent'}
    var text = bayith[fields[$scope.displayOption.language(column, line)]];
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

  $scope.punctuation = (column, line) => {
	  const lang = $scope.displayOption.language(column, line)
	  const last = $scope.displayOption.last(column, line)
	  return lang == 'english' ?
	     (last ? '.' : '') :
		 (last ? ':' : '.')
  }

  $scope.init = function() {
	  fetch('hakhel.md')
		.then(it => it.text())
		.then(it => {
			const hebrewText = it.split(/\r?\n\r?\n/)
			.filter((l, li) => li % 2 == 0)
			.splice(0, 22)
			.map(l => l.replace(/\[.*?\]/g, ''))
			.map(l => l.split(/\\\r?\n/)
				.map(b => { return {
					acrostic: b
						.replace(/[^*ﭏא-ת ]/g, '')
						.replace(/\*\*(.*)\*\*.*|.*/, '$1')
						.length,
					content: b
					.replaceAll('**', '')}}))
			    var result = [];
			const englishText = it.split(/\r?\n\r?\n/)
			.filter((l, li) => li % 2)
			.splice(0, 22)
			.map(l => l.split(/\\\r?\n/))

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
		bayith: (column, line) => (line * 2) + ((column + Math.floor(column / 2)) % 2),
		language: (column) => column < 2 ? 'hebrew' : 'english',
		last: (column, line) => line == 1 && [1, 2].includes(column)
	}, {
		name: 'hebrew',
		display: 'Hebrew Only',
		lines: [0],
		bayith: (column) => column,
		language: () => 'hebrew',
		last: (column) => column == 3
	}, {
		name: 'interlinear',
		languageEqualSize: true,
		display: 'Interlinear',
		lines: [0, 1],
		bayith: (column, line) => column,
		language: (column, line) => line == 0 ? 'hebrew' : 'english',
		last: (column, line) => line == 0 && column == 3
	}
  ]
  $scope.displayOption = $scope.displayOptions[0]
  $scope.printMode = false
});
