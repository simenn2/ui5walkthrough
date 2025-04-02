sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
		onSearchFieldInvoicesSearch: function (oEvent) {
			// Get the search query
			const sQuery = oEvent.getParameter("query");

			// Get the list and its binding
			const oList = this.byId("idInvoicesList");
			const oBinding = oList.getBinding("items");

			// Apply filters if a query exists
			if (sQuery) {
				const oFilter = new Filter("ProductName", FilterOperator.Contains, sQuery);
				oBinding.filter([oFilter]);
			} else {
				oBinding.filter([]);
			}
		},

		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},

		onFilterInvoices(oEvent) {
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onPress(oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substring(1))
			});
		}
	});
});