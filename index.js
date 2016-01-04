'use strict';

const async    = require('async');           // 同期
const asciify  = require('asciify');         // AA
const inquirer = require("inquirer");        // 対話
const client   = require('cheerio-httpcli'); // 通信
const fs       = require('fs');              // 画像保存
const request  = require('request');         // 画像リクエスト

let main = () => {
  let tasks = [title, q1, q2, q3];
  async.waterfall(tasks, () => {
    console.log("IMGDL has been completed.");
  });
};

/**
 * タイトルのAA。
 * @param  {Function} callback 次タスク
 */
let title = callback => {
  asciify("IMGDL", {font: "small"}, (err, msg) => {
    if(err) return;
    console.log(msg);
    callback(null);
  });
};

/**
 * WebサイトのURL入力フォーム。
 * @param  {Function} callback 次タスク
 */
let q1 = callback => {
  inquirer.prompt(
    {
      type     : "input",
      name     : "input",
      message  : "Enter the URL :",
      default  : "http://ikakode.herokuapp.com/power",
      validate : value => {
        return value.trim() ? true : "The input content is incorrect";
      }
    },
    answer => {
      let url = answer.input;
      client.fetch(url, {}, (err, $, res) => {
        callback(null, $, url);
      });
    }
  );
};


/**
 * 指定範囲(セレクター)入力フォーム。
 * @param  {Object}   $        jQueryライクなオブジェクト
 * @param  {String}   url      Q1で入力されたURL文字列
 * @param  {Function} callback 次タスク
 */
let q2 = ($, url, callback) => {
  inquirer.prompt(
    {
      type     : "input",
      name     : "input",
      message  : "Input the Selectors :",
      default  : "body",
      validate : value => {
        return value.trim() ? true : "The input content is incorrect";
      }
    },
    answer => {
      let selectors = answer.input;
      let $imgs = $(selectors).find('img');
      let urls = [];
      $imgs.each((index, img) => {
        let src = $(img).attr("src");
        if (isRelativePath(src)) {
          src = getDomain(url) + src;
        }
        urls.push(src);
      });
      callback(null, urls);
    }
  );

  let isRelativePath = url => {
    return url.substring(0, 4) !== 'http';
  };

  let getDomain = url => {
    return url.match(/^[https]+:\/{2}([0-9a-z\.\-:]+?):?[0-9]*?\//i)[0];
  }
};

/**
 * 拡張子選択フォーム。
 * @param  {Array}   urls      画像URL配列
 * @param  {Function} callback 次タスク
 */
let q3 = (urls, callback) => {
  inquirer.prompt([
    {
      type: "checkbox",
      message: "Select the Extensions :",
      name: "extensions",
      choices: [
        {
          name: "png",
          checked: true
        },
        {
          name: "jpeg"
        },
        {
          name: "gif"
        },
        {
          name: "svg"
        }
      ],
      validate: answer => {
        if (answer.length < 1) {
          return "You must choose at least one extension.";
        }
        return true;
      }
    }
  ], answers => {
    let extentions = answers.extensions;
    for (let i = 0; i < urls.length; i++) {
      if (isDownloadable(urls[i], extentions)) {
        request
          .get(urls[i])
          .pipe(fs.createWriteStream(getImageName(urls[i])));
      }
    }
    callback();
  });

  let isDownloadable = (url, extentions) => {
    let extension = url.split(".")[url.split(".").length - 1].toLowerCase();
    for (let i = 0; i < extentions.length; i++) {
      if (extentions[i] === extension) {
        return true;
      }
    }
    return false;
  }

  let getImageName = url => {
    return url.split("/")[url.split("/").length - 1];
  };
}

main();
