class ObjCamera extends Obj {
  /**
   *Creates an instance of ObjCamera.
   * @memberof ObjCamera
   */
  constructor() {
    // 基底クラスのコンストラクタをコール
    super();

    // 変数定義
    // 座標
    this.pos = null; //this.camera.position.clone();
    // 回転
    this.targetPos = new THREE.Vector3(0, 0, 0); //this.camera.rotation.clone();
    // 拡縮
    this.scale = new THREE.Vector3(0, 0, 0);

    // 注視点とかもいるかな
    this.targetPos = new THREE.Vector3(0, 0, 0);
    // 更新用の関数
    this.UpdateFunc = () => {};

    // 移動先の情報など
    // 移動開始時の座標
    this.originPos = new THREE.Vector3(0, 0, 0);
    // 移動開始時の角度
    this.originTargetPos = new THREE.Vector3(0, 0, 0);
    // 現在の座標と目標座標の差分
    this.diffPos = new THREE.Vector3(0, 0, 0);
    // 現在の注視点と目標注視点の差分
    this.diffTargetPos = new THREE.Vector3(0, 0, 0);

    // 移動時間
    this.moveTime = 0.0;
    // 経過時間
    this.elapsedTime = 0.0;

    // 移動完了通知
    this.NoticeEndMove = () => {};
  }


  /**
   *座標などの情報を反映
   *
   * @memberof ObjCamera
   */
  UpdateCameraInfo(){
    // 座標
    this.pos = this.camera.position.clone();
  }

  /**
   *移動関連の情報初期化
   *
   * @memberof ObjCamera
   */
  InitMoveInfo() {
    this.moveTime = 0.0;
    this.elapsedTime = 0.0;
    this.originPos.set(0.0, 0.0, 0.0);
    this.originTargetPos.set(0.0, 0.0, 0.0);
    this.diffPos.set(0.0, 0.0, 0.0);
    this.diffTargetPos.set(0.0, 0.0, 0.0);
  }

  /**
   *透視投影カメラ
   *
   * @param {number} fov 視野角
   * @param {number} aspectRatio アスペクト比率
   * @param {number} near ニアクリップ
   * @param {number} far　ファークリップ
   * @memberof ObjCamera
   */
  SetPerspectiveCamera(fov, aspectRatio, near, far) {
    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
  }

  /**
   *更新処理
   *
   * @memberof ObjCamera
   */
  Update() {
    // カメラの情報を取得し反映
    this.UpdateCameraInfo();
    // 更新用の関数実行
    this.UpdateFunc();
  }

  /**
   *描画（座標反映処理）
   *
   * @memberof ObjCamera
   */
  Draw() {
    this.camera.position.set(this.pos.x, this.pos.y, this.pos.z);
  }

  // 移動処理
  Move(dstPos, dstTargetPos, moveTime) {
    // 移動情報の初期化
    this.InitMoveInfo();

    // 現在の座標/角度を保存
    this.originPos = this.pos;
    // オービットコントロールからターゲットを取得かな・・・
    this.originTargetPos = this.targetPos;
    // 目標座標/角度との現在の座標/角度の差分算出
    this.diffPos = SubVector3(dstPos, this.pos);
    this.diffTargetPos = SubVector3(dstTargetPos, this.targetPos);
    // 移動時間を設定
    this.moveTime = moveTime;

    this.UpdateFunc = this.UpdateMove;
  }

  /**
   *移動更新処理
   *
   * @memberof ObjCamera
   */
  UpdateMove() {
    // 経過時間更新
    this.elapsedTime += TimeManager.instance.GetDeltaTime();
    // 移動時間と経過時間の割合を算出
    let ratio = this.elapsedTime / this.moveTime;

    // 移動時間分経過しているか確認
    if (ratio >= 1.0) {
      // 座標などを目標値に設定
      this.pos = AddVector3(this.originPos, this.diffPos);
      this.rot = AddVector3(this.originTargetPos, this.diffTargetPos);
      // 更新処理を初期化
      this.UpdateFunc = () => {};

      // 移動完了通知を出す
      this.NoticeEndMove();
      // 移動官僚通知を初期化
      this.NoticeEndMove = ()=>{};
      return;
    }

    // 移動開始前の座標/角度に経過時間の割合分の差分情報を加算
    let workPos = this.diffPos.clone();
    let workRot = this.diffTargetPos.clone();
    workPos.multiplyScalar(ratio);
    workRot.multiplyScalar(ratio);
    this.pos = AddVector3(this.originPos, workPos);
    this.rot = AddVector3(this.originTargetPos, workRot);
  }

  /**
   *座標設定
   *
   * @param {Vector3} dstPos 設定座標
   * @memberof ObjCamera
   */
  SetPos(dstPos) {
    this.pos = dstPos;
  }

  /**
   *回転量設定
   *
   * @param {Vector3} dstRot 設定回転量
   * @memberof ObjCamera
   */
  SetRot(dstRot) {
    this.rot = dstRot;
  }
}
