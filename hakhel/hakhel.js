function log(val, message) {
    if (message) console.log(message);
    console.log(JSON.stringify(val));
    return val;
  }
  
  

var app = angular.module('myApp', []);
  
app.controller('myCtrl', function($scope) {
  $scope.log = log;
  $scope.endNotes = []
  $scope.content = []
  
  $scope.bayith = function(stanza, line, column) {
	return stanza[(line * 2) + ((column + Math.floor(column / 2)) % 2)];
  }
  
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
			const letters = Array.from('אבגדהוזחטיכלמנסעפצקרשת').map((l, i) => ({l:l,v:i < 10 ? i + 1 : i < 19 ? (i - 8) * 10 : (i - 17) * 100}))
			const gematria = (s) => Array.from(s).map(c => (letters.find(l => l.l == c) || {}).v || 0).reduce((a, b) => a + b, 0)

			$scope.content = hebrewText
				.map((stanza, stanzaIndex) =>
					stanza.map((bayith, bayithIndex) => ({
						content: bayith.content,
						englishContent: englishText[stanzaIndex][bayithIndex],
						acrostic: bayith.acrostic})))
			$scope.endNotes =
				it.split(/\r?\n/)
					.map(l => l.match(/\[\^(?<stanza>[א-ת]+)\.(?<bayith>[א-ת]+)(\.(?<word>[א-ת]))?(-(?<endWord>[א-ת]+))?\]: (?<text>.*)/))
					.filter(l => l)
					.map(l => l.groups)
					.map(l => [gematria(l.stanza), gematria(l.bayith), gematria(l.word || ''), l.word ? (l.endWord ? (gematria(l.endWord) - gematria(l.word)) + 1 : 1) : 0, l.text])
			$scope.$apply()
		})
  }
});
