IMGDL
==

画像ダウンロード用のコマンドラインインターフェースです。  
Node.jsで動作します。

![キャプチャー](https://raw.githubusercontent.com/wiki/qazsato/cli-imgdl/image.png)

機能
--
- 任意のWebサイトから画像を一括でDLできます。
- CSSセレクタを入力することで、対象範囲を限定することができます。(デフォルトはbody配下全て)
- 拡張子を選択することで、対象拡張子を限定することができます。(デフォルトはpngのみ)

使用方法
--

- [Node.js](https://nodejs.org/en/)をインストールします。
- 任意のローカルディレクトリにリポジトリを作成します。  
```
git clone https://github.com/qazsato/cli-imgdl.git
```
- IMGDLに必要なnpmモジュールをインストールします。  
```
cd cli-imgdl
npm install
```
- IMGDLを起動します。  
```
npm start
```
- ターミナルにIMGDLのAAが表示されたらOK。
