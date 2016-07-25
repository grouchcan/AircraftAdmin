(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('precedenceservice', precedenceservice);


	function precedenceservice() {

		var service = {
			getPrecedenceNumber: getPrecedenceNumber
		};

		return service;


		function getPrecedenceNumber(aircraft) {
			var precedenceNumber = 0;
			var acType = aircraft.type;
			var acSize = aircraft.size;
			var PASSENGER = "Passenger";
			var CARGO = "Cargo";
			var SMALL_SIZE = "Small";
			var LARGE_SIZE = "Large";

			if (acType  === PASSENGER) {
				if (acSize === LARGE_SIZE ) {
					precedenceNumber = 4
				} else if (acSize === SMALL_SIZE) {
					precedenceNumber = 3
				} else {
					throw "Unknown Aircraft type"
				}
			} else if (acType === CARGO) {
				if (acSize === LARGE_SIZE ) {
					precedenceNumber = 2
				} else if (acSize === SMALL_SIZE) {
					precedenceNumber = 1
				} else {
					throw "Unknown Aircraft type"
				}
			}

			return precedenceNumber;
		}
	}

})();