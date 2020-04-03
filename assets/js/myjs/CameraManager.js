

/**
 *カメラ管理クラス
 *
 * @class CameraManager
 */
class CameraManager{


    /**
     *Creates an instance of CameraManager.
     * @memberof CameraManager
     */
    constructor(){
      // クラスのインスタンスを保存
      CameraManager.instance = this;
      this.MainCameraObj = null;

      // オービット
      this.orbitControl = null;

    }

  /**
   * メインカメラ作成
   *
   * @param {number} fov 視野角
   * @param {number} aspectRatio アスペクト比率
   * @param {number} near ニアクリップ
   * @param {number} far　ファークリップ
   * @memberof CameraManager
   */
  CreateMainCamera( fov, aspectRatio, near, far, cameraPos,lookAtPos){
    // カメラ作成
    this.MainCameraObj = new ObjCamera();
    // 透視投影のカメラ設定
    this.MainCameraObj.SetPerspectiveCamera(fov, aspectRatio, near, far, cameraPos, lookAtPos);
  }

  
  /**
   *オービットコントロールの作成
   * @param {camera} camera
   * @param {*} canvas
   * @memberof CameraManager
   */
  CreateOrbitControl(camera, canvas){

    this.orbitControl = new THREE.OrbitControls( camera, canvas );
  
    this.orbitControl.enableDamping = true;
    this.orbitControl.dampingFactor = 0.05;
    this.orbitControl.screenSpacePanning = false;
  
    this.orbitControl.minDistance = 10;
    this.orbitControl.maxDistance = 500;
    // パンの無効化
    this.orbitControl.enablePan = false;

    //this.orbitControl.saveState();
  }

  /**
   *Orbitコントロールの注視点設定
   *
   * @param {Vector3} targetPos　注視点
   * @memberof CameraManager
   */
  SetOrbitTarget(targetPos){

    this.orbitControl.target = targetPos.clone();
  }

  /**
   *オービットコントロールの更新
   *
   * @memberof CameraManager
   */
  UpdateOrbitControl(){
    this.orbitControl.update();
  }

  GetOrbitTarget(){
    return this.orbitControl.target.clone();
  }

  /**
   *メインカメラの座標更新
   *
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @memberof CameraManager
   */
  MoveMainCamera( posX, posY, posZ ){
    this.MainCameraObj.SetPos(posX, posY, posZ);
  }

  /**
   *メインカメラのオブジェクトからカメラ取得
   *
   * @returns カメラ
   * @memberof CameraManager
   */
  GetMainCamera(){
    return this.MainCameraObj.camera;
  }

  log(no){
    console.log('No.' + no +'-MainCameraPos:');
    console.log( this.MainCameraObj.camera.position);
  }

}

// 本体のインスタンス定義
CameraManager.instance = null;