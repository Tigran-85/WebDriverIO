const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect, $ } = require("@wdio/globals");
const searchPage = require('../pageobjects/searchPage');

Given(/^Open web page$/, async () => {
   await searchPage.visit();
});

When(/^Choose section all$/, async () => {
	await searchPage.allSection;
});

When(/^Enter Name into search field (.*)$/, async (value1) => {
   await searchPage.search(value1);
});

Then(
  /^Products should be found with success message (.*)$/,
  async (message) => {
    await searchPage.getSuccessMessage(message);
  }
);

When(/^Click on first item apears on the screen$/, async () => {
    await searchPage.clickFirstItem;
});

Then(
  /^Products with the Apple name should be found in title (.*) (.*)$/,
  async (value1, value2) => {
    await searchPage.checkFirstElement(value1,value2);
  }
);
