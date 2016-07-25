(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('dataservice', dataservice);


	dataservice.$inject = ["mockdata"];

	function dataservice(mockdata) {

		var service = {
			loadUnqueuedAircraft: loadUnqueuedAircraft,
			loadQueuedAircraft: loadQueuedAircraft
		};

		return service;


		function loadUnqueuedAircraft() {
			return mockdata.getUnqueuedAircraft();
		}

		function loadQueuedAircraft() {
			return mockdata.getQueuedAircraft();
		}


	}
})();