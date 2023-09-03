const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect, $ } = require("@wdio/globals");

Given(/^Open web page$/, async () => {
  await browser.url("https://buy.am/");
});

When(/^Navigate to Search field$/, async () => {
  (await $('//form[@class="main-search--form"]//input[2]')).click();
});

When(/^Enter Name (.*)$/, async (value1) => {
  await $('//form[@class="main-search--form"]//input[2]').setValue(value1);
});

When(/^Click on Search icon or click enter$/, async () => {
  await $('//button[@class="main-search--button"]').click();
});

Then(
  /^Products should be found with success message (.*)$/,
  async (message) => {
    const element = await $('//h1[@class="search--headline"]');
    const text = await element.getText();
    expect(text).toContain(message);
  }
);

When(/^Click on first item apears on the screen$/, async () => {
  await $('//div[@class="listing"]/div[1]').click();
});

Then(
  /^Products with the Apple name should be found in title (.*) (.*)$/,
  async (value1, value2) => {
    if (va) {
      
    }
    let atLeastOneExpectationMatched = false;

    const element1 = await $('//h1[@class="product--title"]');
    if (element1) {
      const text = await element1.getText();
      if (text.toLocaleLowerCase().includes(value1 || value2)) {
        atLeastOneExpectationMatched = true;
      }
    }

    try {
      const element2 = await $(
        '//span[contains(text(), "Բրենդ")]/following-sibling::a'
      );
      if (element2) {
        const text = await element2.getText();
        if (text.toLocaleLowerCase().includes(value1 || value2)) {
          atLeastOneExpectationMatched = true;
        }
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const element3 = await $(
        '//div[@class="product--description im-collapse-content"]'
      );
      if (element3) {
        const text = await element3.getText();
        if (text.toLocaleLowerCase().includes(value1 || value2)) {
          atLeastOneExpectationMatched = true;
        }
      }
    } catch (error) {
      console.log(error);
    }

    expect(atLeastOneExpectationMatched).toBe(true);
  }
);
