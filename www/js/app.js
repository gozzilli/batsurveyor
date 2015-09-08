// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.controller(function($scope, $ionicActionSheet, $timeout) {

  $scope.updateSelection = function($event, id) {
    var checkbox = $event.target;
    var action = (checkbox.checked ? 'add' : 'remove');
    console.log(action+id);
    updateSelected(action, id);
  };
  
  $scope.isSelected = function(id) {
    console.log(id);
    return $scope.selected.indexOf(id) >= 0;
  };
  
  $scope.settingsList = [
    { text: "Wireless", checked: true },
    { text: "GPS", checked: false },
    { text: "Bluetooth", checked: false }
  ];

})

//.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {
//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs)
//    if(window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
//    if(window.StatusBar) {
//      StatusBar.styleDefault();
//    }
//  });
//})


angular.module('starter', ['ionic'])

.controller('MainCtrl', function($scope) {
  
  $scope.surveyToggle = true;

  
  $scope.startSurvey = function () {
    if ($scope.surveyToggle) {
      app.initialize();
    } else {
      audioRecorder.stopAudioRecorder();
    }
    
  };


  
});

var loading = angular.module('LoadingApp', ['ionic'])
.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  
});

