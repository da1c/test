class Button2D extends Obj2D{

  /**
   *Creates an instance of Button2D.
   * @param {*} sizeX Xサイズ
   * @param {*} sizeY Yサイズ
   * @param {*} textValue テキストの内容 
   * @param {*} fontSize フォントサイズ
   * @memberof Button2D
   */
  constructor( posX, posY,sizeX, sizeY, textValue, fontSize, color, groupID){

    super();

    // コンテナに座標設定
    this.container.x = posX;
    this.container.y = posY;

    // 枠作成
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill("blue"); // 赤色で描画するように設定
    var harfSizeX = sizeX * 0.5;
    var harfSizeY = sizeY * 0.5;
    this.shape.graphics.drawRoundRect(-harfSizeX, -harfSizeY, sizeX, sizeY, 10, 10); //半径 100px の円を描画
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
    this.text.x = 0;
    this.text.y = 0;

    // グループID設定
    this.groupID = groupID;

    // ボタンマネージャーに登録し、IDを取得
    this.ID = ButtonManager.instance.regist(this);

    // ボタンの種類識別ID
    this.kindID = ButtonManager.instance.enumButtonID.Button2D;
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


  /**
   *ボタンの座標更新
   *
   * @param {number} posX x座標
   * @param {number} posY y座標
   * @memberof Button2D
   */
  SetPos(posX,posY){
    // コンテナに座標設定
    this.container.x = posX;
    this.container.y = posY;
  }


  /**
   *ボタンの種類確認
   *
   * @param {*} targetKindID
   * @returns
   * @memberof Button2D
   */
  CheckButtonKind(targetKindID){
    return this.kindID == targetKindID;
  }


}