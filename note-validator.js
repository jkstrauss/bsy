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
  extract = (n) => {
	 const groups = n
		.match(/(\[\^(?<stanza>\d+)\.(?<bayith>\d+)(\.(?<start>\d+)(-(?<end>\d+))?)?\])?/)
		.groups
	groups.word = groups.end || groups.start
	return groups
  }
  compare = (aOrig, bOrig) => {
	  const a = extract(aOrig)
	  const b = extract(bOrig)
	  if(a.stanza < b.stanza) return true
	  if(a.bayith < b.bayith) return true
	  if(a.word && b.word && a.word < b.word) return true
	  if(a.word && !b.word) return true
	  return false
  }
  
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
				const outOfOrderText = it.match(/\[\^[^\]]*\](?!:)/g)
				    .flatMap((n, i, a) => {
						return i == 0 || compare(a[i -1], n) ? [] : [n]
					})
				const outOfOrderNotes = it.match(/\[\^[^\]]*]?\](?=:)/g)
				    .flatMap((n, i, a) => {
						return i == 0 || compare(a[i -1], n) ? [] : [a[i -1]]
					})
				$scope.notes = it.match(/\[\^[^\]]*\]/g)
					.reduce((a, n) => a.includes(n) ? a : a.concat([n]), [])
					.map(n => {
						const replaced = n.replace(/([\[\.\]\^])/g, '\\$1')
						const textReferences = it.match(new RegExp(`${replaced}(?!:)`, 'g')) || []
						const notes = it.match(new RegExp(`${replaced}:`, 'g')) || []
						return {
							key: n,
							textReferences: textReferences,
							notes: notes,
							outOfOrderText: outOfOrderText.filter(o => o == n),
							outOfOrderNotes: outOfOrderNotes.filter(o => o == n)
						}
					})
					.filter(n => (n.textReferences.length != 1) || (n.notes.length != 1) || n.outOfOrderText.length || n.outOfOrderNotes.length)
				$scope.$apply()
			})
	  }
  }
 
});
