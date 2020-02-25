"use strict";

const AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
    console.log(event);
    const translate = new AWS.Translate({ apiVersion: '2017-07-01' });

    // リクエストからデータ取り出し
    let body = '';
    let srcMessage = '';
    if (event.body) {
        body = JSON.parse(event.body);
        srcMessage = body.message;
        console.log(srcMessage);
    }

    // Translateへのリクエストパラメータ
    const params = {
        SourceLanguageCode: 'ja',
        TargetLanguageCode: 'en',
        Text: srcMessage,
    };

    // 翻訳実行
    translate.translateText(params, (err, data) => {
        if (err) {
            console.error(err);
            const response = {
                statusCode: 200,
                body: JSON.stringify({ message: "Translation error." }),
            };
            callback(null, response);
            return;
        }

        console.log(data);
        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: data.TranslatedText }),
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
        callback(null, response);
    })
};
