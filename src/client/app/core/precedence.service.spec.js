"use strict";

describe("Precedence service", function () {
	var precedenceservice;

	var aircraftData = [

		{id: 'JB1345', name: 'JetBlue 1345', type: 'Passenger', size: 'Small'},
		{id: 'D534', name: 'Delta 534', type: 'Passenger', size: 'Large'},
		{id: 'FEDX12', name: 'FedEx 12', type: 'Cargo', size: 'Large'},
		{id: 'UPS7234', name: 'UPS 7234', type: 'Cargo', size: 'Large'},
		{id: 'AlA23', name: 'Alaskan Airlines 23', type: 'Passenger', size: 'Small'},
		{id: 'UN564', name: 'United 564', type: 'Passenger', size: 'Large'},
		{id: 'US2351', name: 'USAir 2351', type: 'Cargo', size: 'Small'}
	];


	beforeEach(module("app.core"));

	beforeEach(inject(function (_precedenceservice_) {
		precedenceservice = _precedenceservice_;
	}));

	it("should have a getPrecedenceNumber Method", function () {
		expect(precedenceservice.getPrecedenceNumber).toBeDefined();
	});

	it("should return the proper precedence number for a Passenger and Large aircraft", function() {
		expect(precedenceservice.getPrecedenceNumber(aircraftData[1])).toBe(4);
	});

	it("should return the proper precedence number for a Passenger and Small aircraft", function() {
		expect(precedenceservice.getPrecedenceNumber(aircraftData[0])).toBe(3);
	});

	it("should return the proper precedence number for a Cargo and Large aircraft", function() {
		expect(precedenceservice.getPrecedenceNumber(aircraftData[2])).toBe(2);
	});

	it("should return the proper precedence number for a Cargo and Small aircraft", function() {
		expect(precedenceservice.getPrecedenceNumber(aircraftData[6])).toBe(1);
	});

});