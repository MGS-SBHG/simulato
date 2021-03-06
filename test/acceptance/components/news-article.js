'use strict';

module.exports = {
  type: 'NewsArticle',
  elements() {
    return [
      {
        name: 'newsArticle',
        selector: {
          type: 'getElementById',
          value: this.options.newsArticleId,
        },
      },
      {
        name: 'newsArticleImage',
        selector: {
          type: 'getElementById',
          value: `${this.options.newsArticleId}Image`,
        },
      },
      {
        name: 'newsArticleHeading',
        selector: {
          type: 'getElementById',
          value: `${this.options.newsArticleId}Heading`,
        },
      },
      {
        name: 'newsArticleText',
        selector: {
          type: 'getElementById',
          value: `${this.options.newsArticleId}Text`,
        },
      },
    ];
  },
  model() {
    return {
      displayed: 'newsArticle.isDisplayed',
      newsArticleImage: {
        displayed: 'newsArticleImage.isDisplayed',
      },
      newsArticleHeading: {
        displayed: 'newsArticleHeading.isDisplayed',
        text: 'newsArticleHeading.innerText',
      },
      newsArticleText: {
        displayed: 'newsArticleText.isDisplayed',
        text: 'newsArticleText.innerText',
      },
    };
  },
  actions() {
    return {
      CLICK_TO_VIEW_STORY: {
        preconditions(dataStore) {
          dataStore.store(`${this.name}HeadingText`, this.getFromPage(`${this.name}.newsArticleHeading.text`));
          dataStore.store(`${this.name}Text`, this.getFromPage(`${this.name}.newsArticleText.text`));

          return [
            ['isTrue', `pageState.${this.name}.displayed`],
            ['property', `dataStore`, `${this.name}HeadingText`],
            ['property', `dataStore`, `${this.name}Text`],
          ];
        },
        perform(callback) {
          driver.wait(() => {
            return driver.findElement(By.id(this.options.newsArticleId))
                .click()
                .then(() => true)
                .catch(() => false);
          }, 3000)
              .then(function() {
                callback();
              }, callback);
        },
        effects(expectedState, dataStore) {
          expectedState.stash();
          expectedState.createAndAddComponent({
            type: 'ViewStoryModal',
            name: `${this.options.newsArticleId}ViewModal`,
            state: {
              displayed: true,
              modalTitle: {
                displayed: true,
                text: dataStore.retrieve(`${this.name}HeadingText`),
              },
              modalBodyText: {
                displayed: true,
                text: dataStore.retrieve(`${this.name}Text`),
              },
              closeButton: {
                displayed: true,
                disabled: false,
              },
            },
            options: {
              newsArticleId: this.options.newsArticleId,
            },
          });
        },
      },
    };
  },
};
