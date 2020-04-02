class Button2D extends Obj2D{

  /**
   *Creates an instance of Button2D.
   * @param {*} sizeX Xサイズ
   * @param {*} sizeY Yサイズ
   * @param {*} textValue テキストの内容 
   * @param {*} fontSize フォントサイズ
   * @memberof Button2D
   */
  constructor( posX, posY,sizeX, sizeY, textValue, fontSize, color){

    super();

    // コンテナに座標設定
    this.container.x = posX;
    this.container.y = posY;

    // 枠作成
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill("white"); // 赤色で描画するように設定
    this.shape.graphics.drawRoundRect(0, 0, sizeX, sizeY, 10, 10); //半径 100px の円を描画
    // コンテナに追加
    this.container.addChild(this.shape);
    this.shape.x = 0; // X 座標 200px の位置に配置
    this.shape.y = 0; // Y 座標 200px の位置に配置

    // テキスト作成
    this.text = new createjs.Text(textValue, fontSize + "px serif", color);
    // 垂直方向。中央寄せにする
    this.text.textBaseline = "middle";
    // 水平方向
    this.text.textAlign = "center";

    // テキストをコンテナに追加
    this.container.addChild(this.text);
    this.text.x = sizeX * 0.5;
    this.text.y = sizeY * 0.5;

  }

  
  /**
   *テキストの設定
   *
   * @param {*} text
   * @memberof Button2D
   */
  SetText( text )
  {
    this.text.text = text;
  }

  /**
   *更新処理
   *
   * @memberof Button2D
   */
  Update(){
    // 表示状態の場合更新処理を行う
    if(this.shape.isVisible){

    }
  }

  
  /**
   *表示設定
   *
   * @param {boolean} setValue 表示フラグ
   * @memberof Button2D
   */
  SetVisible( setValue ){
    this.shape.visible = setValue;
    this.text.visible = setValue;
  }


}