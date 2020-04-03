/**
 * CrreateJSのステージ作成
 *
 * @class StageManager
 */
class StageManager {

  /**
   *Creates an instance of StageManager.
   * @memberof StageManager
   */
  constructor() {
    // インスタンスの保存
    StageManager.instance = this;

    this.width = 0;
    this.height = 0;
  }

  /**
   *初期化処理
   * @memberof StageManager
   */
  Init(canvasID, width, height) {
    // Stage作成
    this.stage = new createjs.Stage(canvasID);

    this.width = width;
    this.height = height;
  }

  /**
   *Stageにオブジェクト追加
   * @param {*} obj
   * @memberof StageManager
   */
  AddObj(obj) {
    this.stage.addChild(obj);
  }

  /**
   *ステージ更新
   * @memberof StageManager
   */
  UpdateStage() {
    this.stage.update();
  }
}

// インスタンス定義
StageManager.instance = null;
