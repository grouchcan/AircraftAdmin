!function(){"use strict";function e(e,t){e.state("admin",{url:"/admin",templateUrl:"app/aircraftAdmin/admin.html"}).state("status",{url:"/status",templateUrl:"app/aircraftQueue/status.html"}),t.otherwise("admin")}function t(e,t,a,r){function n(){e("leftNav").toggle()}function i(e){t.go(e)}function u(){c.bootedUp=!0,r.bulkUpdateQueueStatus(a.loadUnqueuedAircraft()),r.bulkEnqueue(a.loadQueuedAircraft()),i("admin")}var c=this;c.toggleNavList=n,c.navigate=i,c.bootSystem=u,c.bootedUp=!1}angular.module("airTraffic",["ngMaterial","ui.router","app.admin","app.status","app.core"]).config(e).controller("NavController",t),e.$inject=["$stateProvider","$urlRouterProvider"],t.$inject=["$mdSidenav","$state","dataservice","queuingservice"]}(),function(){"use strict";angular.module("app.core",[])}(),function(){"use strict";function e(e){function t(){return e.getUnqueuedAircraft()}function a(){return e.getQueuedAircraft()}var r={loadUnqueuedAircraft:t,loadQueuedAircraft:a};return r}angular.module("app.core").factory("dataservice",e),e.$inject=["mockdata"]}(),function(){"use strict";function e(){function e(){var e=[{id:"JB1345",name:"JetBlue 1345",type:"Passenger",size:"Small"},{id:"D534",name:"Delta 534",type:"Passenger",size:"Large"},{id:"FEDX12",name:"FedEx 12",type:"Cargo",size:"Small"},{id:"UPS7234",name:"UPS 7234",type:"Cargo",size:"Large"},{id:"ALA23",name:"Alaskan Airlines 23",type:"Passenger",size:"Small"},{id:"UN564",name:"United 564",type:"Passenger",size:"Large"},{id:"US2351",name:"USAir 2351",type:"Cargo",size:"Small"}];return e}function t(){var e=[{id:"VA254",name:"Virgin America 254",type:"Passenger",size:"Small"},{id:"JB556",name:"JetBlue 556",type:"Passenger",size:"Small"},{id:"UPS672",name:"UPS 672",type:"Cargo",size:"Small"},{id:"FEDX447",name:"FedEx 447",type:"Cargo",size:"Large"},{id:"SW111",name:"SouthWest 111",type:"Passenger",size:"Large"}];return e}var a={getUnqueuedAircraft:e,getQueuedAircraft:t};return a}angular.module("app.core").factory("mockdata",e)}(),function(){"use strict";function e(){function e(e){var t=0,a=e.type,r=e.size,n="Passenger",i="Cargo",u="Small",c="Large";if(a===n)if(r===c)t=4;else{if(r!==u)throw"Unknown Aircraft type";t=3}else if(a===i)if(r===c)t=2;else{if(r!==u)throw"Unknown Aircraft type";t=1}return t}var t={getPrecedenceNumber:e};return t}angular.module("app.core").factory("precedenceservice",e)}(),function(){"use strict";function e(e){function t(e){for(var t=0,a=e.length;t<a;t++)r(e[t])}function a(e,t){t=t===!0;for(var a=0,r=e.length;a<r;a++)e[a].queued=t,d(e[a])}function r(t){if(!f[t.id]||!f[t.id].queued){var a=e.getPrecedenceNumber(t);t.precedenceNumber=a,t.queued=!0,s(t),d(t)}}function n(){var e=m.shift();return e.queued=!1,d(e),e}function i(){return m}function u(){return m=[]}function c(){return f}function l(){var e=[];for(var t in f)f[t].queued===!1&&e.push(f[t]);return e}function s(e){var t,a=e.precedenceNumber,r=m.length;if(r){if(m[r-1].precedenceNumber>=a)m[r]=e;else for(var n=0;n<r;n++)if(t=m[n].precedenceNumber,a>t){m.splice(n,0,e);break}}else m[0]=e}function d(e){f[e.id]=e}function o(){f={}}var m=[],f={},p={enqueue:r,dequeue:n,bulkEnqueue:t,emptyQueue:u,resetStatusMap:o,getCurrentQueue:i,getAircraftQueueStatus:c,bulkUpdateQueueStatus:a,getAvailableAircraft:l};return p}angular.module("app.core").factory("queuingservice",e),e.$inject=["precedenceservice"]}(),function(){"use strict";angular.module("app.admin",["app.core","ngMaterial"])}(),function(){"use strict";function e(e,t){function a(){c()}function r(e){var t=e?s.availableAircraft.filter(n(e)):s.availableAircraft;return t}function n(e){var t=angular.lowercase(e);return function(e){return 0===angular.lowercase(e.name).indexOf(t)}}function i(t){var a="Enqueued Aircraft: "+t.name;e.enqueue(t),c(),s.selectedAircraft=null,s.searchText="",l(a)}function u(){var t=e.dequeue();if(t)var a="Dequeued Aircraft: "+t.name;else a="No more aircraft to dequeue";l(a),c()}function c(){s.availableAircraft=e.getAvailableAircraft()}function l(e){t.showSimple(e)}var s=this;s.availableAircraft=[],s.currentSelectedAircraft=null,s.selectedAircraft=null,s.querySearch=r,s.enqueueAircraft=i,s.dequeueAircraft=u,a()}angular.module("app.admin").controller("AdminController",e),e.$inject=["queuingservice","$mdToast"]}(),function(){"use strict";angular.module("app.status",["app.core","ngMaterial"])}(),function(){"use strict";function e(e){function t(){a.currentAircraftQueue=e.getCurrentQueue()}var a=this;a.currentAircraftQueue=[],t()}angular.module("app.status").controller("StatusController",e),e.$inject=["queuingservice"]}(),angular.module("app.core").run(["$templateCache",function(e){e.put("app/aircraftAdmin/admin.html",'<div ng-controller="AdminController as vm"><md-content layout=row><md-autocomplete class=md-autocomplete md-no-cache=vm.noCache md-selected-item=vm.selectedAircraft md-search-text=vm.searchText md-selected-item-change=vm.selectedItemChange(aircraft) md-items="aircraft in vm.querySearch(vm.searchText)" md-item-text=aircraft.name md-min-length=0 placeholder="Select an Aircraft to Enqueue" md-menu-class=aircraftSelectCustomTemplate><md-item-template><div class=aircraft-name><i class="material-icons nav-icon">flight_takeoff</i> <span class=aircraft-name>{{aircraft.name}}</span></div><div class=aircraft-details><span class=aircraft-size>Size: {{aircraft.size}}</span> <span class=aircraft-type>Type: {{aircraft.type}}</span></div></md-item-template></md-autocomplete></md-content><md-button ng-click=vm.enqueueAircraft(vm.selectedAircraft) ng-disabled=!vm.selectedAircraft class="md-raised md-primary enqueue-button">Enqueue Selected Aircraft</md-button><md-button ng-click=vm.dequeueAircraft() class="md-raised md-primary md-warn dequeue-button">Dequeue Aircraft</md-button></div>'),e.put("app/aircraftQueue/status.html",'<md-table-container ng-controller="StatusController as vm"><table class=status-table md-table><thead class=status-table-header><tr><th md-column class=md-column-header>Position</th><th md-column class=md-column-header>Aircraft</th><th md-column class=md-column-header>Type</th><th md-column class=md-column-header>Size</th></tr></thead><tbody md-body><tr ng-repeat="aircraft in vm.currentAircraftQueue track by aircraft.id"><td md-cell class=md-cell>{{ $index + 1 }}</td><td md-cell class=md-cell>{{ aircraft.name }}</td><td md-cell class=md-cell>{{ aircraft.type }}</td><td md-cell class=md-cell>{{ aircraft.size }}</td></tr></tbody></table></md-table-container>')}]);