(function() {
	'use strict';

	angular
		.module('app.status')
		.controller('StatusController', StatusController);

	StatusController.$inject = ["queuingservice"];

	function StatusController(queuingservice) {
		var vm = this;
		vm.currentAircraftQueue = [];

		activate();

		function activate() {
			vm.currentAircraftQueue = queuingservice.getCurrentQueue();
		}
	}
})();