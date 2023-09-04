const { $ } = require("@wdio/globals");

class SearchPage {
  async visit() {
    await browser.url("https://buy.am/");
  }

  get allSection() {
    return $(
      '//div[@id="searchCategorySelectionBox"]//span[contains(text(), "Բոլորը")]'
    );
  }

  get enterName() {
    return $('//form[@class="main-search--form"]//input[2]');
  }

  get message() {
    return $('//h1[@class="search--headline"]');
  }

  get clickFirstItem() {
    return $('//div[@class="listing"]/div[1]').click();
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

  async search(value1) {
    await this.enterName.setValue(value1);
    await browser.keys("Enter");
  }

  async getSuccessMessage(message) {
    const text = await this.message.getText();
    expect(text).toContain(message);
  }

  async checkFirstElement(value1, value2) {
    let atLeastOneExpectationMatched = false;
    value1 = value1.toLocaleLowerCase();
    value2 = value2.toLocaleLowerCase();

    if (value1.includes(" ")) {
      const words1 = value1.split(" ");

      for (let i = 0; i < words1.length; i++) {
        expect(await this.checkFirstElement(words1[i], value2)).toBe(true);
      }
    }

    async function checkElementExisting(el) {
      if (el) {
        const text = await el.getText();
        if (
          text.toLocaleLowerCase().includes(value1) ||
          text.toLocaleLowerCase().includes(value2)
        ) {
          atLeastOneExpectationMatched = true;
        }
      }
    }

    await checkElementExisting(await this.productTitle);

    try {
      await checkElementExisting(await this.productBrand);
    } catch (error) {
      console.log(error);
    }

    try {
      await checkElementExisting(await this.productColor);
    } catch (error) {
      console.log(error);
    }

    try {
      await checkElementExisting(await this.productDescription);
    } catch (error) {
      console.log(error);
    }

    expect(atLeastOneExpectationMatched).toBe(true);
  }
}

module.exports = new SearchPage();
