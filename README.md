IMGDL
==

画像ダウンロード用のコマンドラインインターフェースです。  
Node.jsで動作します。

![キャプチャー](https://raw.githubusercontent.com/wiki/qazsato/cli-imgdl/image.png)

機能
--
1. 任意のWebサイトから画像を一括でDLできます。
2. CSSセレクタを入力することで、対象範囲を限定することができます。(デフォルトはbody配下全て)
3. 拡張子を選択することで、対象拡張子を限定することができます。(デフォルトはpngのみ)

使用方法
--
1. [Node.js](https://nodejs.org/en/)をインストールします。
2. 任意のローカルディレクトリにリポジトリを作成します。
        git clone https://github.com/qazsato/cli-imgdl.git
3. IMGDLに必要なnpmモジュールをインストールします。
        cd cli-imgdl
        npm install
4. IMGDLを起動します。
        npm start
5. ターミナルにIMGDLのAAが表示されたらOK。
