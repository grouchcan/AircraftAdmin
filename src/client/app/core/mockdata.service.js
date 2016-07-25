(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('mockdata', mockdata);


	function mockdata() {
		var service = {
			getUnqueuedAircraft: getUnqueuedAircraft,
			getQueuedAircraft: getQueuedAircraft
		};
		return service;


		function getUnqueuedAircraft() {

			var unqueuedAircraft = [

				{id: 'JB1345', name: 'JetBlue 1345', type: 'Passenger', size: 'Small'},
				{id: 'D534', name: 'Delta 534', type: 'Passenger', size: 'Large'},
				{id: 'FEDX12', name: 'FedEx 12', type: 'Cargo', size: 'Small'},
				{id: 'UPS7234', name: 'UPS 7234', type: 'Cargo', size: 'Large'},
				{id: 'ALA23', name: 'Alaskan Airlines 23', type: 'Passenger', size: 'Small'},
				{id: 'UN564', name: 'United 564', type: 'Passenger', size: 'Large'},
				{id: 'US2351', name: 'USAir 2351', type: 'Cargo', size: 'Small'}
			];

			return unqueuedAircraft;

		}

		function getQueuedAircraft() {

			var queuedAircraft = [

				{id: 'VA254', name: 'Virgin America 254', type: 'Passenger', size: 'Small'},
				{id: 'JB556', name: 'JetBlue 556', type: 'Passenger', size: 'Small'},
				{id: 'UPS672', name: 'UPS 672', type: 'Cargo', size: 'Small'},
				{id: 'FEDX447', name: 'FedEx 447', type: 'Cargo', size: 'Large'},
				{id: 'SW111', name: 'SouthWest 111', type: 'Passenger', size: 'Large'}
			];

			return queuedAircraft;

		}
	}

})();

