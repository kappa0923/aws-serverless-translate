// index.js
'use strict';

/**
 * @desc TranslateText.
 */
class TranslateText {
  /**
   * @desc Constructor
   */
  constructor() {
    this.srcTextInput = document.getElementById("translateSourceInput");
    this.dstTextOutput = document.getElementById("translateDestinationOutput");
    this.translateButton = document.getElementById('translateButton');

    this.translateButton.addEventListener('click', this.translateClicked.bind(this));
  }

  /**
   * 日本語から英語に翻訳する
   * @param {String} srcText 翻訳する文章
   */
  async translate(srcText) {
    // TODO : 翻訳API呼び出し
    const translateUrl = '';
    const param = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        "message": srcText
      })
    };

    return fetch(translateUrl, param)
      .then(response => {
        return response.text();
      })
      .then(res => {
        console.log(res);
        const text = JSON.parse(res);
        console.log(text);
        return text.message;
      });
  }

  /**
   * 翻訳を押したときの挙動
   * @param {Object} event uploadイベントハンドラー
   */
  async translateClicked(event) {
    event.preventDefault();
    if (!this.srcTextInput.value) {
      console.error('Empty input.');
      window.alert('原文を入力してください。');
      return;
    }

    // TODO: アップロード処理を実装
    const text = await this.translate(this.srcTextInput.value);
    console.log(text);
    this.dstTextOutput.value = text;
  }
}

window.onload = () => {
  // Initializes TranslateText class.
  window.translateText = new TranslateText();
};
