angular.module('conferenceController', ["ngSanitize", "ngCsv"])

	// inject the service factory into our controller
 .controller('mainController', ['$scope','$http','Conference', function($scope, $http, Conference) {
		$scope.currentPage = 1,
		$scope.itemPerPage = 30;
		// GET =====================================================================
		Conference.get()
			.success(function(data) {
			   // $scope.getArray = [{a: 1, b:2}, {a:3, b:4}];                            
				$scope.data = data;
				$scope.confdata= data.slice(0, (($scope.currentPage++) * $scope.itemPerPage));
				$scope.conference = buildConferenceData(data);
			}).error(function (data) {
			 //   NotificationFactory.showError();
			});

		
		$scope.add= function(){
		//	$scope.confdata = data.slice(0, (($scope.currentPage++) * $scope.itemPerPage));
		}
		
		$scope.getOranizationName = function(emails, id){
			var i = 0;
			var organization;
			while(organization == undefined && i < emails.length){
				organization = $scope.conference.speakers[emails[i++]].organization;
			}
			return organization || id;
			
		}
		
		$scope.getSessionNum = function(emails){
			var i = 0; 
			var sessionNum = 0;
			while( $scope.conference.speakers[emails[i]] != undefined){
				sessionNum+= $scope.conference.speakers[emails[i]]["sessions"].length;
				i++;
			}
			return sessionNum;			
		}

		$scope.getArray =  function() {   
			 var uploadData = angular.copy($scope.data);

			for(var i in uploadData ){
				var session = uploadData[i];
				delete session["speakerInfo"];
			}
		    return uploadData;                            

		}
		
		
		
	}])
	.directive("scroll", function () {
    return  function (scope, element, attr) {

    	document.getElementById('contentSection').addEventListener("scroll", function(event) {
    		if(scope.content == "showDetail"){
                body = document.getElementById("contentSection");

        		var height = Math.max( body.clientHeight, body.scrollHeight, body.offsetHeight);
        	    if ((body.scrollTop + body.offsetHeight)  > (height-500)) {
        			if((scope.currentPage +1)*scope.itemPerPage < scope.data.length){
        				scope.confdata = scope.data.slice(0, ((scope.currentPage++) * scope.itemPerPage));
        			}
        	    }
        	    scope.$apply();

    		}
                         
    	});
        
    }
});
////////////////


var buildConferenceData = function(data){
	var speakers = {};
	var organizations = {};

	for (var i in data){
		var id = data[i].id;

		var speakerInfo = data[i].speakerInfo;
		for (var j in speakerInfo){

			var email = speakerInfo[j].email;
			var unfoundEmail = false;
			if(email == undefined || email.length ==0){
				unfoundEmail = true;
			}
			// build speakers hash
			var speaker = hashAdd(speakers, unfoundEmail? (speakerInfo[j].name != undefined? speakerInfo[j].name :"") : email, speakerInfo[j], false);
			if(speaker["sessions"]== undefined){
				speaker["sessions"] = [id];
			}else{
				speaker["sessions"].push(id);
			}
			// build organization hash
			if(!unfoundEmail){
				//hashAdd(organizations, (email.organizationName() || speakerInfo[j].organization), email.trim(), true);
				hashAdd(organizations, speakerInfo[j].organization, email.trim(), true);
			}else if(speakerInfo[j].organization != undefined){
				
				hashAdd(organizations, speakerInfo[j].organization, unfoundEmail? (speakerInfo[j].name != undefined? speakerInfo[j].name.trim() :"") : email.trim(), true);
			}
		}
		
	}
	return {speakers: speakers, organizations: organizations};
	
};

String.prototype.organizationName = function() {
	if(this.indexOf("@")  == -1){
		console.log("not a email: " + this);
		return null;
		
	}else{
		return this.substring((this.indexOf("@") + 1));
	}
};

function hashAdd(map, key, value, append){
	key = key.trim().toLowerCase();
	if(map[key] == undefined){
		if(append){
			map[key] = [value];
		}else{
			map[key] = value;	
		}
	}else{
		if(append){
			map[key].push(value);
		}
		
	}
	return map[key];
}
