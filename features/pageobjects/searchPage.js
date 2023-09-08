const { expect, $ } = require("@wdio/globals");

class SearchPage {
  atLeastOneExpectationMatched = false;

  async visit() {
    await browser.url("https://buy.am/");
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

  get productBrand() {
    return $('//span[contains(text(), "Բրենդ")]/following-sibling::a');
  }

  get productColor() {
    return $('//span[contains(text(), "Գույն")]/following-sibling::a');
  }

  get productDescription() {
    return $('//div[@class="product--description im-collapse-content"]');
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

  // async clickFirstItem() {
  //   (await this.firstItem).click();
  // }

  async checkFirstElement(value1, value2) {
    value1 = value1.toLocaleLowerCase();
    value2 = value2.toLocaleLowerCase();

    let atLeastOneExpectationMatched = false;

    const text = (await this.firstItem.getText()).toLocaleLowerCase();

    if (value1.includes(" ")) {
      const words1 = value1.split(" ");
console.log(text, value2);
      if (
        text.includes(words1[0]) || text.includes(words1[1]) ||
        text.includes(value2)
        ) {
        atLeastOneExpectationMatched = true;
      }
    } else if (value1.includes("-")) {
      const words1 = value1.split("-");
      if (text.includes(words1[0]) || text.includes(words1[1])) {
        atLeastOneExpectationMatched = true;
      }
    } else {
      if (text.includes(value1) || text.includes(value2)) {
        atLeastOneExpectationMatched = true;
      }
    }

    await expect(atLeastOneExpectationMatched).toBe(true);
  }
}

module.exports = new SearchPage();
