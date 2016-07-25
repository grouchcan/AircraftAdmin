(function() {
	'use strict';

	angular
		.module('app.admin')
		.controller('AdminController', AdminController);

	AdminController.$inject = ["queuingservice", "$mdToast"];

	function AdminController(queuingservice, $mdToast) {
		var vm = this;
		vm.availableAircraft = [];
		vm.currentSelectedAircraft = null;
		vm.selectedAircraft = null;
		vm.querySearch  = querySearch;
		vm.enqueueAircraft = enqueueAircraft;
		vm.dequeueAircraft = dequeueAircraft;

		activate();

		function activate() {
			updateAvailableAircraft();
		}

		function querySearch(query) {
			var results  = query ? vm.availableAircraft.filter( createFilterFor(query) ) : vm.availableAircraft;

			return results;
		}

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(aircraft) {
				return (angular.lowercase(aircraft.name).indexOf(lowercaseQuery) === 0);
			};
		}

		function enqueueAircraft(aircraft) {
			var message = "Enqueued Aircraft: " + aircraft.name;
			queuingservice.enqueue(aircraft);
			updateAvailableAircraft();
			vm.selectedAircraft = null;
			vm.searchText = ''
			showToastMessage(message);
		}

		function dequeueAircraft() {
			var dequeuedAircraft = queuingservice.dequeue();
			if (dequeuedAircraft) {
				var message = "Dequeued Aircraft: " + dequeuedAircraft.name
			} else {
				message = "No more aircraft to dequeue";
			}
			showToastMessage(message);
			updateAvailableAircraft();
		}

		function updateAvailableAircraft() {
			vm.availableAircraft = queuingservice.getAvailableAircraft();
		}

		function showToastMessage(message) {
			$mdToast.showSimple(message);
		}

	}
})();