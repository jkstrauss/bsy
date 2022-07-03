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
					.map(l => l.match(/\[\^(?<stanza>\d+)\.(?<bayith>\d+)(\.(?<word>\d))?(-(?<endWord>\d+))?\]: (?<text>.*)/))
					.filter(l => l)
					.map(l => l.groups)
					.map(l => [l.stanza - 0, l.bayith - 0, (l.word || 0) - 0, l.word ? (l.endWord ? (l.endWord - l.word) + 1 : 1) : 0, l.text])
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
