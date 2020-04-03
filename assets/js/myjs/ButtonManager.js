class ButtonManager {
  // 疑似3Dボタン管理

  /**
   *Creates an instance of ButtonManager.
   * @memberof ButtonManager
   */
  constructor() {
    // インスタンスの登録
    ButtonManager.instance = this;
    // ボタンID付与用
    this.buttonIDCount = 0;

    // ボタン識別子
    this.enumButtonID = {
      Button2D : 1,
      Button3D : 2,
    };

    // ボタン親子関係リストが必要か・・・
    // とりあえず、ボタンに親のIDを持たせる・・・応急処置
  }

  Init() {
    // ボタン配列のメモリを確保
    this.buttonArray = new Array();
  }

  // ボタン作成
  regist(button) {
    // ボタンを配列に登録
    this.buttonArray.push(button);
    this.buttonIDCount ++;
    return this.buttonIDCount;
  }

  // 削除
  remove(button) {}

  /**
   *指定したグループIDのボタンに表示状態を設定
   *
   * @param {number} ID
   * @param {bool} isVisible
   * @memberof ButtonManager
   */
  SetVisible(groupID, isVisible) {
    this.buttonArray.forEach(element => {
      // グループIDが一致するか確認
      if (element.groupID == groupID) {
        // 表示設定を反映
        element.SetVisible(isVisible);
      }
    });
  }
}

// マネージャーのインスタンスの作成
ButtonManager.instance = null;
