/**
 *3D空間の座標をもとに配置するボタン
 *
 * @class Button3D
 * @extends {Button2D}
 */
class Button3D extends Button2D {


  /**
   *Creates an instance of Button3D.
   * @param {*} posX
   * @param {*} posY
   * @param {*} sizeX
   * @param {*} sizeY
   * @param {*} textValue
   * @param {*} fontSize
   * @param {*} color
   * @param {*} groupID
   * @param {*} parentID
   * @param {*} targetPos
   * @memberof Button3D
   */
  constructor(
    posX,
    posY,
    sizeX,
    sizeY,
    textValue,
    fontSize,
    color,
    groupID,
    parentID,
    targetPos
  ) {
    // 基底クラスのコンストラクタ呼び出し
    super(posX, posY, sizeX, sizeY, textValue, fontSize, color);

    // 親のボタンID
    this.parentID = parentID;

    // 3D空間上の座標　この座標をもとに２D座標を算出する
    // 複製しないでポインタの状態で保持する、ボタン内で更新は行わない
    this.targetPos = targetPos;

    // カメラの情報も貰っておく
    this.camera = CameraManager.instance.GetMainCamera();

    // ボタンの種類識別ID
    this.kindID = ButtonManager.instance.enumButtonID.Button3D;

    
  }

  /**
   *更新処理
   *
   * @memberof Button3D
   */
  Update() {
    //
    if (!this.shape.isVisible) {
      return;
    }

    // 3D座標を元に2D座標の算出
    let pos2D = this.targetPos.clone();
    pos2D.project( this.camera );
    let posX = StageManager.instance.width * 0.5 * ( pos2D.x + 1.0);
    let posY = StageManager.instance.height * 0.5 * ( -pos2D.y + 1.0);
    // 座標更新
    this.SetPos(posX, posY);
  }
}
