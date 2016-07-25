(function () {
	'use strict';

	angular.module('airTraffic', [
		'ngMaterial',
		'ui.router',
		'app.admin',
		'app.status',
		'app.core'
	])
	.config(config)
	.controller('NavController', NavController);

	config.$inject = ["$stateProvider", "$urlRouterProvider"];

	function config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('admin', {
				url: '/admin',
				templateUrl: 'app/aircraftAdmin/admin.html'
			})
			.state('status', {
				url: '/status',
				templateUrl: 'app/aircraftQueue/status.html'

			});

		$urlRouterProvider.otherwise('admin');

	}


	NavController.$inject = ["$mdSidenav", "$state", "dataservice", "queuingservice"];

	function NavController($mdSidenav, $state, dataservice, queuingservice) {
		var vm = this;
		vm.toggleNavList = toggleNavList;
		vm.navigate = navigate;
		vm.bootSystem = bootSystem;
		vm.bootedUp = false;

		function toggleNavList() {
			$mdSidenav('leftNav').toggle();
		}

		function navigate(state) {
			$state.go(state);
		}

		function bootSystem() {
			vm.bootedUp = true;
			queuingservice.bulkUpdateQueueStatus(dataservice.loadUnqueuedAircraft());
			queuingservice.bulkEnqueue(dataservice.loadQueuedAircraft());
			navigate("admin");
		}

	}
})();