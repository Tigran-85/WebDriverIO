const { Given, When, Then } = require("@wdio/cucumber-framework");
const searchPage = require("../pageobjects/searchPage");

Given(/^Open web page$/, async () => {
  await searchPage.visit();
});

When(/^Choose section (.*)$/, async (section) => {
  await searchPage.chooseSection(section);
});

When(/^Type Name into search field (.*)$/, async (value1) => {
  await searchPage.search(value1);
});

When(/^Press enter$/, async () => {
  await browser.keys('Enter')
});

Then(
  /^Products should be found with success message (.*)$/,
  async (message) => {
    await searchPage.getSuccessMessage(message);
  }
);

// When(/^Click on first item apears on the screen$/, async () => {
//   await searchPage.clickFirstItem();
// });

Then(
  /^Products with the Apple name should be found in title (.*) (.*)$/,
  async (value1, value2) => {
    await searchPage.checkFirstElement(value1, value2);
  }
);

Then(/^Products should be found with failed message (.*)$/, async (message) => {
	await searchPage.getFailedMessage(message);
});

When(/^Click on `Ցուցադրել բոլոր արդյունքները` on the results dropdown$/, async () => {
	await searchPage.shortProductsShow.click()
});


Then(/^There is a message and numbers exist (.*)$/, async (message) => {
	await searchPage.checkProductResultNumber(message)
});


Then(/^Check the length of input text$/, async () => {
	await searchPage.getSearchInputValue();
});

Then(/^The Search Input should be deleted$/, async () => {
	await searchPage.checkInputValueDelete();
});

Then(/^Observe the Search tab to show initial message (.*)$/, async (value) => {
	await searchPage.checkSearchPlaceHolder(value);
});







