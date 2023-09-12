const { expect, $ } = require("@wdio/globals");
const Page = require("./page");

class SearchPage extends Page {

  async open() {
    await super.open();
    await browser.maximizeWindow();
  }

  get allSection() {
    return $(
      '//div[@id="searchCategorySelectionBox"]//span[contains(text(), "Բաժիններ")]'
    );
  }

  get all() {
    return $(
      '//div[@id="searchCategorySelectionBox"]//ul/li[contains(text(), "Բոլորը")]'
    );
  }

  get supermarket() {
    return $(
      '//div[@id="searchCategorySelectionBox"]//ul/li/span[contains(text(), "Սուպերմարկետ")]'
    );
  }

  get restaurant() {
    return $(
      '//div[@id="searchCategorySelectionBox"]//ul/li/span[contains(text(), "Ռեստորաններ")]'
    );
  }

  get shops() {
    return $(
      '//div[@id="searchCategorySelectionBox"]//ul/li/span[contains(text(), "Խանութներ")]'
    );
  }

  get pharmacy() {
    return $(
      '//div[@id="searchCategorySelectionBox"]//ul/li/span[contains(text(), "Դեղատուն")]'
    );
  }

  get enterName() {
    return $('//form[@class="main-search--form"]//input[2]');
  }

  get successMessage() {
    return $('//h1[@class="search--headline"]');
  }

  get failMessage() {
    return $('//div[@class="alert--content"]');
  }

  get firstItem() {
    return $(
      '//div[@class="listing--container"]//div[@class="product--box box--minimal"][1]//a[@class="product--title"]'
    );
  }

  get productTitle() {
    return $('//h1[@class="product--title"]');
  }

  get shortProductsShow() {
    return $(
      '//ul[@class="results--list"]/li[@class="entry--all-results block-group result--item"]/a'
    );
  }

  get productResultsNumber() {
    return $(
      '//ul[@class="results--list"]/li[@class="entry--all-results block-group result--item"]/span'
    );
  }

  async checkSearchPlaceHolder(value) {
    const placeholder = await this.enterName.getAttribute("placeholder");

    expect(placeholder).toEqual(value);
  }

  async getSearchInputValue() {
    const text = await this.enterName.getValue();

    expect(text.length).toEqual(30);
  }

  async checkInputValueDelete() {
    const text = await this.enterName.clearValue();

    expect(text).toBe(null);
  }

  async checkProductResultNumber(message) {
    const text = await this.productResultsNumber.getText();

    const words = text.split(" ");

    expect(isNaN(words[0])).toBe(false);
    expect(words[1]).toEqual(message);
  }

  async chooseSection(section) {
    await this.allSection.click();
    await this[section].click();
  }

  async search(value1) {
    await this.enterName.setValue(value1);
  }

  async getSuccessMessage(message) {
    const text = await this.successMessage.getText();
    await expect(text).toContain(message);
  }

  async getFailedMessage(message) {
    const text = await this.failMessage.getText();
    await expect(text).toContain(message);
  }


  async checkFirstElement(value1, value2) {
    const lowerValue1 = value1.toLocaleLowerCase();
    const lowerValue2 = value2.toLocaleLowerCase();
    const text = (await this.firstItem.getText()).toLocaleLowerCase();

    const contains = (str) => text.includes(str);

    const checkValue = (str) => {
      if (str.includes(" ")) {
        const words = str.split(" ");
        return words.some(contains);
      } else if (str.includes("-")) {
        const words = str.split("-");
        return words.some(contains);
      }
      return contains(str);
    };

    const atLeastOneExpectationMatched =
      checkValue(lowerValue1) || checkValue(lowerValue2);

    await expect(atLeastOneExpectationMatched).toBe(true);
  }
}

module.exports = new SearchPage();
