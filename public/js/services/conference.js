angular.module('conferenceService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Conference', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/conference');
			}
		}
	}]);