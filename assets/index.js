"use strict";

window.addEventListener("DOMContentLoaded", init);

var width = 900;
var height = 900;

async function init() {
  // 画面サイズ
  //var THREE = require("three");

  // レンダラー作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#Canvas3D"),
    antialias: true
  });

  // 背景色の設定(初期化時の背景)  試しに赤色に設定
  renderer.setClearColor( 0x880000 );

  // 画面のリサイズ処理もここで行うようにする

  // デバイスピクセル比の設定
  renderer.setPixelRatio(window.devicePixelRatio);
  // レンダラーのサイズ指定
  renderer.setSize(width, height);

  // ここで初期化処理を行う

  // 各マネージャーの作成/初期化 -------------------------------------------
  var sceneManager = new SceneManager();
  sceneManager.Init();
  // TaskManger作成
  var taskManager = new TaskManager();
  taskManager.Init();
  // Objectマネージャー作成
  var objManager = new ObjectManager();
  objManager.Init();
  // Stageマネージャー作成
  var stageManager = new StageManager();
  stageManager.Init("Canvas2D");

  // Resorceマネージャーの作成
  var resourceManager = new ResourceManager();

  // カメラマネージャー作成
  var cameraManager = new CameraManager();
  cameraManager.CreateMainCamera(45, width / height, 1, 1000);

  // カメラの座標更新
  cameraManager.MainCameraObj.SetPos(new THREE.Vector3(0, 5, +30));

  // Timeマネージャー作成
  var timeManager = new TimeManager();

  // --------------------------------------------------------------

  // タッチ操作のカメラの作成
  // タッチ検出用のDivを取得
  var canvas2D = document.getElementById('Canvas2D');
  var orbit = new THREE.OrbitControls( cameraManager.GetMainCamera(), canvas2D );
  orbit.target.set(0,0,0);

  orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  orbit.dampingFactor = 0.05;
  orbit.screenSpacePanning = false;

  orbit.minDistance = 100;
  orbit.maxDistance = 500;
  // パンの無効化
  orbit.enablePan = false;
  
  //orbit.maxPolarAngle = Math.PI / 2;


  // 平行光源
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 1; // 光の強さを倍に
  light.position.set(1, 1, 1);

  // ライト追加
  sceneManager.AddObj(light);

  // モデルの読み込み
  let testModelPath = "./assets/resource/model/kitchen.fbx";
  resourceManager.LoadModel(testModelPath, obj => {});
  // ロード待ちが必要
  // asyncで読み込めるようにする
  await sleep(2000);

  // ここで作成
  var taskObjArray = new Array();

  let workPos = new THREE.Vector3(0, 0, 0);
  let addVec = new THREE.Vector3(20, 0, 30);
  for (let index = 0; index < 2; index++) {
    let testModel = resourceManager.GetModel(testModelPath);
    let taskObj = new TaskQuestionRoot();
    taskObj.Init(workPos.x, workPos.y, workPos.z, "適当", testModel, null);
    // オブジェクトのリストに追加
    taskObjArray.push(taskObj);

    // 追加座標の更新
    workPos.add(addVec);
  }

  // インデックス
  var questionIDX = 0;
  cameraManager.MainCameraObj.SetPos(GetNextCameraPos());

  //床用のObj3D作成
  //let groundObj = new Obj3D();
  //groundObj.SetMesh(groundMesh);
  //groundObj.SetPos(new THREE.Vector3(0, 0, 0));
  // シーンに追加
  //sceneManager.AddObj(groundMesh);

  // ここでフロー開始
  // ほぼイベントドリブンにする
  // フローの進行
  Flow.Init();
  init2D();
  // 初回実行
  tick();

  // フレームごとの更新処理
  function tick() {
    // 次のフレームの更新処理を登録
    requestAnimationFrame(tick);

    // Timeマネージャー更新
    timeManager.UpdateTime();
    // 更新処理
    taskManager.Update();

    // ボタン表示判定。座標の移動
    // Obejctの座標反映
    objManager.Draw();

    orbit.update();

    // レンダリング
    renderer.render(SceneManager.instance.scene, cameraManager.GetMainCamera());
  }

  // 2D初期化
  function init2D() {
    // テキストの表示
    // 座標はCanvasのサイズから算出
    var test = new Button2D(250, 750, 100, 100, "YES", 25, "Black");
    test.AddEvent("click", clickTest);
    stageManager.AddObj(test.container);

    var test2 = new Button2D(550, 750, 100, 100, "NO", 25, "Blue");
    test2.AddEvent("click", clickTest2);
    stageManager.AddObj(test2.container);

    //clickTest2();
    // Stageの描画を更新します
    stageManager.UpdateStage();

    // click時の処理
    function clickTest() {
      console.log("clickTest");

      questionIDX += 1;
      cameraManager.MainCameraObj.Move(
        GetNextCameraPos(),
        new THREE.Vector3(0, 0, 0),
        1
      );

      // Stageの描画を更新します
      stageManager.UpdateStage();
    }

    function clickTest2() {
      console.log("clickTest2");
      //
      questionIDX += 1;
      cameraManager.MainCameraObj.Move(
        GetNextCameraPos(),
        new THREE.Vector3(0, 0, 0),
        1
      );

      // Stageの描画を更新します
      stageManager.UpdateStage();
    }
  }

  // 現在のインデックスのカメラの座標をい取得
  function GetNextCameraPos() {
    if (taskObjArray.length <= questionIDX) {
      questionIDX = 0;
    }

    let taskTarget = taskObjArray[questionIDX];
    let cameraPos = taskTarget.GetCameraPos();
    console.log(cameraPos);
    return cameraPos.clone();
  }
}

// 処理待ち応急処置
async function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay);
  });
}
