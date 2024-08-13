/*global QUnit*/

sap.ui.define([
	"app/controller/Navigation.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Navigation Controller");

	QUnit.test("I should test the Navigation controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
