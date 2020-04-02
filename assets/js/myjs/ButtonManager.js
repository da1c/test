class ButtonManager{

  // 疑似3Dボタン管理
  
  
  /**
   *Creates an instance of ButtonManager.
   * @memberof ButtonManager
   */
  constructor(){
    // インスタンスの登録
    ButtonManager.instance = this;
  }

  Init(){
    // ボタン配列のメモリを確保
    this.buttonArray = new Array();
  }

  // ボタン作成
  regist(button){
    // ボタンを配列に登録
    this.buttonArray.push(button);
  }

  // 削除
  remove(button){

  }


  // 

}

// マネージャーのインスタンスの作成
ButtonManager.instance = null;
