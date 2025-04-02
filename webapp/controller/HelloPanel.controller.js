sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.HelloPanel", {

		 // Declare oDialog as a property of the controller
		 oDialog: null,
		onButtonClosePress: function () {
			// Close the dialog
			const oDialog = this.byId("idhelloDialog");
			if (oDialog) {
				oDialog.close();
			}
		},
		onButtonSayHelloPress() {
			// read msg from i18n model
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			const sRecipient = this.getView().getModel().getProperty("/recipient/name");
			const sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},

		async onButtonOpenDialogPress() {
			// create dialog lazily
			this.oDialog ??= await this.loadFragment({
				name: "ui5.walkthrough.view.HelloDialog"
			});

			this.oDialog.open();
		},

		onCloseDialog() {
			// note: We don't need to chain to the pDialog promise, since this event handler
			// is only called from within the loaded dialog itself.
			this.byId("idhelloDialog").close();
		}
	});

});