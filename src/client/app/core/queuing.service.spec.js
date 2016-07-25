"use strict";

describe("Queueing service", function () {
	var queuingservice;

	var aircraftData = [

		{id: 'JB1345', name: 'JetBlue 1345', type: 'Passenger', size: 'Small'},
		{id: 'D534', name: 'Delta 534', type: 'Passenger', size: 'Large'},
		{id: 'FEDX12', name: 'FedEx 12', type: 'Cargo', size: 'Small'},
		{id: 'UPS7234', name: 'UPS 7234', type: 'Cargo', size: 'Large'},
		{id: 'ALA23', name: 'Alaskan Airlines 23', type: 'Passenger', size: 'Small'},
		{id: 'UN564', name: 'United 564', type: 'Passenger', size: 'Large'},
		{id: 'US2351', name: 'USAir 2351', type: 'Cargo', size: 'Small'}
	];


	beforeEach(module("app.core"));

	beforeEach(inject(function (_queuingservice_) {
		queuingservice = _queuingservice_;
	}));

	it("should have an enqueue method", function () {
		expect(queuingservice.enqueue).toBeDefined();
	});

	it("should have a dequeue method", function() {
		expect(queuingservice.dequeue).toBeDefined();
	});

	it("should have a getCurrentQueue method", function() {
		expect(queuingservice.getCurrentQueue).toBeDefined();
	});

	it("should properly queue aircraft based on precedence rules", function() {
		var resultingQueue;
		queuingservice.emptyQueue();

		for (var i = 0, l = aircraftData.length; i < l; i++) {
			queuingservice.enqueue(aircraftData[i]);
		}
		resultingQueue = queuingservice.getCurrentQueue();

		expect(resultingQueue.length).toBe(7);
		expect(resultingQueue[0].id).toBe("D534");
		expect(resultingQueue[1].id).toBe("UN564");
		expect(resultingQueue[2].id).toBe("JB1345");
		expect(resultingQueue[3].id).toBe("ALA23");
		expect(resultingQueue[4].id).toBe("UPS7234");
		expect(resultingQueue[5].id).toBe("FEDX12");
		expect(resultingQueue[6].id).toBe("US2351");

	});

	it("should properly bulk queue aircraft based on precedence rules", function() {
		var resultingQueue;
		queuingservice.emptyQueue();

		queuingservice.bulkEnqueue(aircraftData);

		resultingQueue = queuingservice.getCurrentQueue();

		expect(resultingQueue.length).toBe(7);
		expect(resultingQueue[0].id).toBe("D534");
		expect(resultingQueue[1].id).toBe("UN564");
		expect(resultingQueue[2].id).toBe("JB1345");
		expect(resultingQueue[3].id).toBe("ALA23");
		expect(resultingQueue[4].id).toBe("UPS7234");
		expect(resultingQueue[5].id).toBe("FEDX12");
		expect(resultingQueue[6].id).toBe("US2351");

	});

	it("should return unqueued aircraft", function() {
		var resultingQueue;
		queuingservice.emptyQueue();

		queuingservice.bulkEnqueue(aircraftData);

		resultingQueue = queuingservice.getCurrentQueue();

		expect(resultingQueue.length).toBe(7);
		expect(resultingQueue[0].id).toBe("D534");
		expect(resultingQueue[1].id).toBe("UN564");
		expect(resultingQueue[2].id).toBe("JB1345");
		expect(resultingQueue[3].id).toBe("ALA23");
		expect(resultingQueue[4].id).toBe("UPS7234");
		expect(resultingQueue[5].id).toBe("FEDX12");
		expect(resultingQueue[6].id).toBe("US2351");

	});

	it("should properly dequeue aircraft", function() {
		var resultingQueue;
		var dequeuedItem = null;
		queuingservice.emptyQueue();

		for (var i = 0, l = aircraftData.length; i < l; i++) {
			queuingservice.enqueue(aircraftData[i]);
		}
		dequeuedItem = queuingservice.dequeue();

		resultingQueue = queuingservice.getCurrentQueue();

		expect(dequeuedItem.id).toBe("D534");
		expect(resultingQueue.length).toBe(6);
		expect(resultingQueue[0].id).toBe("UN564");
	});

	it("should return available (unqueued) aircraft", function() {
		var availableAircraft;

		queuingservice.emptyQueue();
		queuingservice.resetStatusMap();

		queuingservice.bulkUpdateQueueStatus(aircraftData, false);

		availableAircraft = queuingservice.getAvailableAircraft();

		expect(availableAircraft.length).toBe(7);

		queuingservice.bulkUpdateQueueStatus([aircraftData[3]], true);
		availableAircraft = queuingservice.getAvailableAircraft();

		expect(availableAircraft.length).toBe(6);

	});
	
});