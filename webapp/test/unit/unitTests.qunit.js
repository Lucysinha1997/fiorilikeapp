/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"fiorilikeapp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
