(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('queuingservice', queuingservice);

	queuingservice.$inject = ["precedenceservice"];

	function queuingservice(precedenceservice) {
		var queue = [];
		var aircraftStatusMap = {};

		var service = {
			enqueue: enqueue,
			dequeue: dequeue,
			bulkEnqueue: bulkEnqueue,
			emptyQueue: emptyQueue,
			resetStatusMap: resetStatusMap,
			getCurrentQueue: getCurrentQueue,
			getAircraftQueueStatus: getAircraftQueueStatus,
			bulkUpdateQueueStatus: bulkUpdateQueueStatus,
			getAvailableAircraft: getAvailableAircraft
		};

		return service;

		function bulkEnqueue(aircrafts) {
			for (var i = 0, l = aircrafts.length; i < l; i++) {
				enqueue(aircrafts[i])
			}
		}

		function bulkUpdateQueueStatus(aircrafts, isQueued) {
			isQueued = (isQueued === true);
			for(var i = 0, l = aircrafts.length; i < l; i++) {
				aircrafts[i].queued = isQueued;
				updateQueuedStatusMap(aircrafts[i]);
			}
		}

		function enqueue(aircraft) {
			if (!aircraftStatusMap[aircraft.id] || !aircraftStatusMap[aircraft.id].queued) {
				var precedenceNumber = precedenceservice.getPrecedenceNumber(aircraft);
				aircraft.precedenceNumber = precedenceNumber;
				aircraft.queued = true;
				insertAircraftAtProperPosition(aircraft);
				updateQueuedStatusMap(aircraft);
			}

		}

		function dequeue() {
			var nextAircraft = queue.shift();
			nextAircraft.queued = false;
			updateQueuedStatusMap(nextAircraft);

			return nextAircraft;
		}

		function getCurrentQueue() {
			return queue;
		}

		function emptyQueue() {
			return queue = [];
		}

		function getAircraftQueueStatus() {
			return aircraftStatusMap;
		}

		function getAvailableAircraft() {
			var availableAircraft = [];
			for (var aircraft in aircraftStatusMap) {
				if (aircraftStatusMap[aircraft].queued === false) {
					availableAircraft.push(aircraftStatusMap[aircraft]);
				}
			}
			return availableAircraft;
		}

		function insertAircraftAtProperPosition(aircraft) {
			var aircraftPrecedenceNumber = aircraft.precedenceNumber;
			var currentPrecedenceNumber;
			var queueLength = queue.length;

			if (queueLength) {
				if (queue[queueLength - 1].precedenceNumber >= aircraftPrecedenceNumber) {
					queue[queueLength] = aircraft;
				}
				else {
					for (var i = 0; i < queueLength; i++) {
						currentPrecedenceNumber = queue[i].precedenceNumber;
						if (aircraftPrecedenceNumber > currentPrecedenceNumber) {
							queue.splice(i, 0, aircraft);
							break;
						}
					}
				}
			} else {
				queue[0] = aircraft;
			}
		}


		function updateQueuedStatusMap(aircraft) {
			aircraftStatusMap[aircraft.id] = aircraft;
		}

		function resetStatusMap() {
			aircraftStatusMap = {};
		}


	}

})();

