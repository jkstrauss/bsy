function log(val, message) {
    if (message) console.log(message);
    console.log(JSON.stringify(val));
    return val;
  }
  
  

var app = angular.module('myApp', []);
  
app.controller('myCtrl', function($scope) {
  $scope.log = log;
  $scope.markdown = new URL(window.location.href).searchParams.get('markdown')
  $scope.error = false
  
    $scope.init = () => {
    if($scope.markdown) {
		fetch($scope.markdown)
		    .then(it => {
				if(!it.ok) {
					$scope.error = it.status
					$scope.$apply()
				} else {
					return it.text()
				}
			}).then(it => {
				$scope.notes = it.match(/\[\^.*?\]/g)
					.reduce((a, n) => a.includes(n) ? a : a.concat([n]), [])
					.map(n => {
						const replaced = n.replace(/([\[\.\]\^])/g, '\\$1')
						const textReference = it.match(new RegExp(`(?!\n)${replaced}(?!: )`, 'g'))
						return {key: n, textReference: textReference}
					})
				$scope.$apply()
			})
	  }
  }
 
  $scope.init2 = function() {
	  fetch('hakhel.md')
		.then(it => it.text())
		.then(it => {
			const hebrewRaw = it.split(/\r?\n\r?\n/)
				.filter((l, li) => li % 2 == 0)
				.splice(0, 22)
			const hebrewText = hebrewRaw
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
			
			const validate = new URL(window.location.href).searchParams.get('validate') == 'true'

			$scope.content = hebrewText
				.map((stanza, stanzaIndex) =>
					stanza.map((bayith, bayithIndex) => ({
						content: bayith.content,
						englishContent: englishText[stanzaIndex][bayithIndex],
						acrostic: bayith.acrostic})))
						
			if(validate) {
				hebrewRaw.join('\n')
					.match(/\[\^.*?]/g)
					.map(e => e.replace(/([[\.\^])/g, '\\$1'))
					.map(e => new RegExp('\n' + e + ': ', 'g'))
					.forEach(e => {
						const occurence = (it.match(e) || []).length
						if(occurence != 1) throw `Bad note: ${e}; Ocurrences: ${occurence}`
					})
			}

			endNotes =
				it.split(/\r?\n/)
					.map(n => n.match(/\[\^(?<note>(?<stanza>\d+)\.(?<bayith>\d+)(\.(?<word>\d))?(-(?<endWord>\d+))?)\]: (?<text>.*)/))
					.filter(n => n)
					.map(n => n.groups)
					.map(validate ?
						n => {
							const occurence = (hebrewRaw.join('\n').match(new RegExp(`\\[\\^${n.note.replace(/\./g, '\\.')}\\]`, 'g')) || []).length
							if(occurence != 1) throw `Bad note reference: ${n.note}; Ocurrences: ${occurence}`
							return n
						}:
						n => n)
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
