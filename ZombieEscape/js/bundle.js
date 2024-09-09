(function () {
    'use strict';

    class EventManager {
        static init() {
            if (!EventManager._disp) {
                EventManager._disp = new Laya.EventDispatcher();
            }
        }
        static event(type, data) {
            var result = EventManager._disp.event(type, data);
            return result;
        }
        static on(type, caller, listener, args) {
            var result = EventManager._disp.on(type, caller, listener, args);
            return result;
        }
        static once(type, caller, listener, args) {
            var result = EventManager._disp.once(type, caller, listener, args);
            return result;
        }
        static off(type, caller, listener, onceOnly) {
            var result = EventManager._disp.off(type, caller, listener, onceOnly);
            return result;
        }
        static offAll(type) {
            var result = EventManager._disp.offAll(type);
            return result;
        }
        static isMouseEvent(type) {
            var result = EventManager._disp.isMouseEvent(type);
            return result;
        }
        static hasListener(type) {
            var result = EventManager._disp.hasListener(type);
            return result;
        }
    }

    class EventType {
    }
    EventType.UserDataChange = 'UserDataChange';
    EventType.ControllerEvent = 'ControllerEvent';
    EventType.UpdateStep = 'UpdateStep';
    EventType.UpdateKillNum = 'UpdateKillNum';
    EventType.UpdateAttack = 'UpdateAttack';
    EventType.UpdatePointer = 'UpdatePointer';
    EventType.UpdateKillBtn = 'UpdateKillBtn';
    EventType.OnStateExit = 'OnStateExit';
    EventType.UseSkill = 'UseSkill';
    EventType.ShowWrongTip = 'ShowWrongTip';
    EventType.OnStateTrigger = 'OnStateTrigger';
    EventType.AttackMove = 'AttackMove';
    EventType.AttackDamage = 'AttackDamage';
    EventType.EnemyAttack = 'EnemyAttack';
    EventType.AttackEnd = 'AttackEnd';
    EventType.ShowCombo = 'ShowCombo';
    EventType.BigBlood = 'BigBlood';
    EventType.AttackNotEnoughTip = 'AttackNotEnoughTip';
    EventType.ConnectTip = 'ConnectTip';
    EventType.PlayerRevive = 'PlayerRevive';
    EventType.ShowBossAttackDiff = 'ShowBossAttackDiff';
    EventType.UpdateShopList = 'UpdateShopList';
    EventType.UpdateMainPlayer = 'UpdateMainPlayer';
    EventType.UpdateTask = 'UpdateTask';
    EventType.NewGuideEvent = 'NewGuideEvent';
    EventType.ShowPlayerPointer = 'ShowPlayerPointer';
    EventType.PopTip = 'PopTip';
    EventType.UpdateRed = 'UpdateRed';
    EventType.MainRedUpdate = 'MainRedUpdate';

    class UserData {
        constructor(data = null) {
            this.gold = 500;
            this.level = 1;
            this.PlayLevel = 1;
            this.isFull = 0;
            this.playerID = 0;
            this.playerUnlock = [1, 0, 0, 0, 0];
            this.weaponID = 0;
            this.weaponType = 0;
            this.weaponUnlock = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];
            this.weaponLevel = [0, 0, 0, 0, 0];
            this.propNum = [0, 0, 0, 0];
            this.freeLotteryTimestamp = 0;
            this.signDay = 0;
            this.signTimestamp = 0;
            this.signRec = [0, 0, 0, 0, 0, 0, 0];
            this.dayTaskRefreshTimestamp = 0;
            this.dayTaskId = [0, 0, 0];
            this.dayTaskCountRec = [0, 0, 0];
            this.dayTaskReceiveRec = [0, 0, 0];
            this.achieveTaskCountRec = [0, 0, 0, 0, 0, 0];
            this.achieveTaskReceiveRec = [0, 0, 0, 0, 0, 0];
            this.achieveTaskStage = [0, 0, 0, 0, 0, 0];
            this.roleQualityList = [1, 1, 1, 1, 1];
            if (data) {
                for (const key in data) {
                    if (data.hasOwnProperty(key) && data[key]) {
                        this[key] = data[key];
                    }
                }
            }
            this.updateSign();
            this.updateDayTask();
        }
        static get instance() {
            if (!UserData._instance) {
                let storage = Laya.LocalStorage.getItem(UserData._name);
                if (storage) {
                    storage = JSON.parse(storage);
                }
                UserData._instance = new UserData(storage);
            }
            return UserData._instance;
        }
        onDataChange(key) {
            Laya.LocalStorage.setItem(UserData._name, JSON.stringify(this));
            EventManager.event(EventType.UserDataChange, key);
        }
        finishTask(type, id, num) {
            if (type == 0) {
                let index = this.dayTaskId.indexOf(id);
                if (index != -1) {
                    this.dayTaskCountRec[index] += num;
                    this.onDataChange("dayTaskCountRec");
                }
            }
            else {
                this.achieveTaskCountRec[id] += num;
                this.onDataChange("achieveTaskCountRec");
            }
        }
        updateSign() {
            if (this.signTimestamp > 0) {
                let nowTime = Date.now();
                if ((nowTime - this.signTimestamp) > 24 * 3600 * 1000) {
                    if (this.signRec[this.signDay] == 1) {
                        this.signDay++;
                        if (this.signDay == 7) {
                            this.signDay = 0;
                            this.signRec = [0, 0, 0, 0, 0, 0, 0];
                        }
                        this.onDataChange("signDay");
                        this.onDataChange("signRec");
                    }
                }
            }
        }
        updateDayTask() {
        }
    }
    UserData._name = 'UserData';

    var View = Laya.View;
    var Dialog = Laya.Dialog;
    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var pages;
        (function (pages) {
            class adIconUI extends Scene {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren();
                    this.createView(adIconUI.uiView);
                }
            }
            adIconUI.uiView = { "type": "Scene", "props": { "width": 120, "runtime": "pageruntimes/AdIconRuntime.ts", "height": 160 }, "compId": 2, "child": [{ "type": "Box", "props": { "y": 80, "x": 60, "width": 120, "height": 160, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 120, "var": "gameIcon", "skin": "comp/image.png", "height": 120 }, "compId": 3 }, { "type": "Label", "props": { "y": 155, "x": 60, "var": "gameName", "fontSize": 30, "color": "#ffffff", "centerX": 0, "bottom": 5 }, "compId": 4 }] }], "animations": [{ "nodes": [{ "target": 5, "keyframes": { "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "rotation", "index": 0 }, { "value": 20, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "rotation", "index": 15 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "rotation", "index": 30 }, { "value": -20, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "rotation", "index": 45 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "rotation", "index": 60 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "rotation", "index": 80 }] } }], "name": "ani1", "id": 1, "frameRate": 60, "action": 2 }], "loadList": ["comp/image.png"], "loadList3D": [] };
            pages.adIconUI = adIconUI;
            REG("ui.pages.adIconUI", adIconUI);
            class countUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/count");
                }
            }
            pages.countUI = countUI;
            REG("ui.pages.countUI", countUI);
            class freeTryUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/freeTry");
                }
            }
            pages.freeTryUI = freeTryUI;
            REG("ui.pages.freeTryUI", freeTryUI);
            class loadUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/load");
                }
            }
            pages.loadUI = loadUI;
            REG("ui.pages.loadUI", loadUI);
            class moneyAddUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/moneyAdd");
                }
            }
            pages.moneyAddUI = moneyAddUI;
            REG("ui.pages.moneyAddUI", moneyAddUI);
            class nativeAdUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/nativeAd");
                }
            }
            pages.nativeAdUI = nativeAdUI;
            REG("ui.pages.nativeAdUI", nativeAdUI);
            class playUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/play");
                }
            }
            pages.playUI = playUI;
            REG("ui.pages.playUI", playUI);
            class recommendUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/recommend");
                }
            }
            pages.recommendUI = recommendUI;
            REG("ui.pages.recommendUI", recommendUI);
            class recommend1UI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/recommend1");
                }
            }
            pages.recommend1UI = recommend1UI;
            REG("ui.pages.recommend1UI", recommend1UI);
            class shopUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/shop");
                }
            }
            pages.shopUI = shopUI;
            REG("ui.pages.shopUI", shopUI);
            class treasureUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("pages/treasure");
                }
            }
            pages.treasureUI = treasureUI;
            REG("ui.pages.treasureUI", treasureUI);
        })(pages = ui.pages || (ui.pages = {}));
    })(ui || (ui = {}));

    class AdIconRuntime extends ui.pages.adIconUI {
        constructor() {
            super(...arguments);
            this.data = null;
        }
        onAwake() {
            this.on(Laya.Event.MOUSE_DOWN, this, this.onBtnClick);
            this.initIcon();
            Laya.timer.loop(10000, this, () => {
                this.initIcon();
            });
        }
        onBtnClick(e) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                mpsdk.Ad.click(this.data);
                AdIconRuntime.isTry = true;
                localStorage.setItem("adJumpTimestamp", Date.now().toString());
            }
        }
        onShow() {
            this.initIcon();
            if (AdIconRuntime.isTry) {
                AdIconRuntime.isTry = false;
                AdIconRuntime.jumpSuccess = false;
                let outTime = Number(localStorage.getItem("adJumpTimestamp"));
                if (outTime && outTime > 0) {
                    if (Date.now() - outTime >= 15 * 1000) {
                        UserData.instance.gold += 300;
                        UserData.instance.onDataChange("gold");
                    }
                }
            }
        }
        onHide() {
            if (AdIconRuntime.isTry) {
                AdIconRuntime.jumpSuccess = true;
            }
        }
        initIcon() {
            mpsdk.Ad.getRecommendInfo().then((data) => {
                this.data = data;
                this.gameIcon.skin = this.data.icon;
                this.gameName.text = this.data.title;
            });
        }
        onDestroy() {
            Laya.timer.clearAll(this);
        }
    }
    AdIconRuntime.isTry = false;
    AdIconRuntime.jumpSuccess = false;

    class GameDataManager {
        constructor() {
            this.playerBornPoint = null;
            this.enemyBornPointList = [];
            this.pointRoadList = [];
            this.jumpPoint = null;
            this.isCount = false;
            this.isFalse = false;
            this.isStart = false;
            this.killNum = 0;
            this.allowKill = true;
            this.liveNum = 0;
            this.canShot = true;
            this.fps = 60;
        }
        static get Instance() {
            if (this._instance == null)
                this._instance = new GameDataManager();
            return this._instance;
        }
        init() {
            this.fps = 60;
            this.canShot = true;
            this.killNum = 0;
            this.liveNum = 0;
            this.isCount = false;
            this.isStart = false;
            this.isFalse = false;
            this.allowKill = true;
            window["GameDataManager"] = this;
        }
    }

    class Scene$1 {
    }
    Scene$1.play = "pages/play.scene";
    Scene$1.main = "pages/main.scene";
    Scene$1.shop = "pages/shop.scene";
    Scene$1.count = "pages/count.scene";
    Scene$1.setting = "pages/setting.scene";
    Scene$1.lottery = "pages/lottery.scene";
    Scene$1.reward = "pages/reward.scene";
    Scene$1.task = "pages/task.scene";
    Scene$1.sign = "pages/sign.scene";
    Scene$1.moneyAdd = "pages/moneyAdd.scene";
    Scene$1.freeTry = "pages/freeTry.scene";
    Scene$1.recommend = "pages/recommend.scene";
    Scene$1.recommend1 = "pages/recommend1.scene";
    Scene$1.treasure = "pages/treasure.scene";
    class EventType$1 {
    }
    EventType$1.GameStart = "GameStart";
    EventType$1.ReturnMain = "ReturnMain";
    EventType$1.GameAgain = "GameAgain";
    EventType$1.ZombieDeath = "ZombieDeath";
    EventType$1.PlayerDeath = "PlayerDeath";
    EventType$1.MouseEvent = "MouseEvent";
    EventType$1.UpdateUseGun = "UpdateUseGun";
    EventType$1.KillEnemy = "KillEnemy";
    EventType$1.FreeTry = "FreeTry";
    EventType$1.onShow = "onShow";
    EventType$1.onHide = "onHide";
    EventType$1.ShareSuccess = "ShareSuccess";

    class ShaderManager {
        constructor() {
        }
        static init() {
            if (ShaderManager._instance == null) {
                ShaderManager._instance = new ShaderManager;
                Laya.loader.load("shaderconfig.json", Laya.Handler.create(this, (shaderconfig) => {
                    for (const key in shaderconfig) {
                        if (shaderconfig.hasOwnProperty(key)) {
                            const arr = shaderconfig[key];
                            for (let index = 0; index < arr.length; index++) {
                                let obj = arr[index];
                                let shadervariant = new Laya.ShaderVariant(Laya.Shader3D.find(key), obj.subShaderIndex, obj.passIndex, obj.defineNames);
                                Laya.Shader3D.debugShaderVariantCollection.add(shadervariant);
                            }
                        }
                    }
                    Laya.Shader3D.debugShaderVariantCollection.compile();
                }));
            }
        }
    }
    ShaderManager._instance = null;

    class MathTool {
        static getRandom(min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        }
    }

    class LoadViewRuntime extends ui.pages.loadUI {
        constructor() {
            super(...arguments);
            this.finish1 = false;
            this.finish2 = false;
        }
        onAwake() {
            this.registerPlatformEvent();
            mpsdk.init(7556, '7556').then(openid => {
                console.log('获得openid', openid);
                mpsdk.Report.reportLogin(UserData.instance.gold, UserData.instance.level);
                mpsdk.Hack.getOpenLevel("0.0.1", 7556).then(openStatus => {
                    window["wudian"] = openStatus["wudian"];
                    window["bannertime"] = openStatus["bannertime"];
                    if (openStatus["bannertime"])
                        AllPlatformAdMgr.Instance.adIntervalsTime = Number(openStatus["bannertime"]);
                    AllPlatformAdMgr.Instance.noAd = false;
                    AllPlatformAdMgr.Instance.init();
                });
            }).catch(e => {
                console.log('初始化失败.', e);
            });
            this.openWxShare();
            ShaderManager.init();
            this.loadBox.width = Laya.stage.width;
            this.loadBox.height = Laya.stage.height;
            this.spineBox.width = Laya.stage.width;
            this.spineBox.height = Laya.stage.height;
            UIConfig.popupBgAlpha = 0.8;
            Laya.MouseManager.multiTouchEnabled = false;
            this.finish1 = true;
            this.createRes();
            let time1 = 0;
            let progress = 0;
            this.setProgress(progress);
            Laya.timer.frameLoop(1, this, () => {
                if (this.finish1 && this.finish2) {
                    this.setProgress(1);
                    this.finish1 = false;
                    this.finish2 = false;
                    Laya.timer.clearAll(this);
                    Laya.Scene.open(Scene$1.play, true, null);
                }
                else {
                    if (time1 < 2500) {
                        time1 += Laya.timer.delta;
                    }
                    if (time1 >= 2500) {
                        time1 = 2500;
                    }
                    this.setProgress(time1 / 3000);
                }
            });
        }
        onDestroy() {
            Laya.timer.clearAll(this);
        }
        setProgress(progress) {
            this.progressLabel.text = Math.floor(100 * progress) + "%";
            this.progressMask.x = (progress - 1) * this.progressBar.width;
        }
        createRes() {
            let mainResList = ["Enemy1.lh", "Enemy2.lh", "Enemy3.lh", "Enemy4.lh", "Enemy5.lh", "Player1.lh", "Player2.lh", "Player3.lh", "Player4.lh", "Player5.lh", "MainCamera.lh", "Fx_Explosion.lh", "Fx_Gethit.lh", "Fx_Impact.lh", "MainCamera.lh"];
            let weapon = `Gun${UserData.instance.weaponType * 3 + UserData.instance.weaponID + 1}.lh`;
            UserData.instance.PlayLevel = UserData.instance.level;
            if (UserData.instance.isFull) {
                UserData.instance.PlayLevel = MathTool.getRandom(5, 8);
            }
            let levelName = `Level${UserData.instance.PlayLevel}.ls`;
            mainResList.push(weapon);
            mainResList.push(levelName);
            ResManager.create(mainResList).then(() => {
                this.finish2 = true;
            });
        }
        openWxShare() {
            if (window.wx) {
                wx.showShareMenu({
                    withShareTicket: true,
                    menus: ["shareAppMessage", "shareTimeline"],
                });
                LoadViewRuntime.shareSuccess = false;
                wx.onShareAppMessage(function () {
                    const shareInfo = {
                        serial: 0,
                        title: '僵尸入侵！帮助队友逃出生天！',
                        image: "https://cdn.xxtch.com/ZombieEscape/share.png",
                        scoreValue: 0,
                    };
                    LoadViewRuntime.shareSuccess = true;
                    return mpsdk.Share.commonShare(shareInfo, null, () => LoadViewRuntime.shareSuccess = false, this);
                });
            }
        }
        registerPlatformEvent() {
            if (Laya.Browser.onMiniGame) {
                Laya.MiniAdpter.window.wx.onShow(() => {
                    console.log("OnShow");
                    EventManager.event(EventType$1.onShow);
                    setTimeout(() => {
                        if (LoadViewRuntime.shareSuccess) {
                            LoadViewRuntime.shareSuccess = false;
                            EventManager.event(EventType$1.ShareSuccess, null);
                        }
                        Laya.timer.frameOnce(5, this, () => {
                            EventManager.offAll(EventType$1.ShareSuccess);
                        });
                    }, 500);
                });
                Laya.MiniAdpter.window.wx.onHide(() => {
                    console.log("OnHide");
                    EventManager.event(EventType$1.onHide);
                });
            }
        }
    }
    LoadViewRuntime.shareSuccess = false;

    class PlatFormManager {
        static init() {
            PlatFormManager.CUR_PLATFORM = PlatFormManager.BROWSER;
            let u = window.navigator.userAgent;
            if (u.indexOf("OPPO") == -1 &&
                u.indexOf("MiniGame") > -1 &&
                "wx" in window) {
                if ("tt" in window) {
                    PlatFormManager.CUR_PLATFORM = PlatFormManager.TT;
                }
                else if ("qq" in window) {
                    PlatFormManager.CUR_PLATFORM = PlatFormManager.QQ;
                }
                else {
                    PlatFormManager.CUR_PLATFORM = PlatFormManager.WX;
                }
            }
            if (u.indexOf("OPPO") > -1 && u.indexOf("MiniGame") > -1) {
                PlatFormManager.CUR_PLATFORM = PlatFormManager.OPPO;
            }
            if (u.indexOf("VVGame") > -1) {
                PlatFormManager.CUR_PLATFORM = PlatFormManager.VIVO;
            }
            console.log("当前小游戏运行平台", PlatFormManager.CUR_PLATFORM);
        }
    }
    PlatFormManager.CUR_PLATFORM = null;
    PlatFormManager.OPPO = "OPPO";
    PlatFormManager.VIVO = "VIVO";
    PlatFormManager.WX = "WX";
    PlatFormManager.TT = "TT";
    PlatFormManager.QQ = "QQ";
    PlatFormManager.BROWSER = "BROWSER";

    class ResManager {
        constructor() {
            ResManager._resMap = new Map();
            if (PlatFormManager.CUR_PLATFORM == PlatFormManager.WX) {
                ResManager._remote = "https://cdn.xxtch.com/ZombieEscape/res/wx/";
                ResManager._resBasePath = wx.env.USER_DATA_PATH + "/cache/res/";
                ResManager._fileSystemManager = wx.getFileSystemManager();
                ResManager._downloadFile = wx.downloadFile;
                ResManager._loadSubpackage = wx.loadSubpackage;
                ResManager._fileSystemManager.access({
                    path: ResManager._resBasePath,
                    fail: () => {
                        ResManager._fileSystemManager.mkdirSync(ResManager._resBasePath, true);
                    },
                });
            }
            else if (PlatFormManager.CUR_PLATFORM == PlatFormManager.QQ) {
                ResManager._remote = "https://h5game.99aly.com/5agamewx/alywx/swzb/qq/";
                ResManager._resBasePath = qq.env.USER_DATA_PATH + "/cache/res/";
                ResManager._fileSystemManager = qq.getFileSystemManager();
                ResManager._downloadFile = qq.downloadFile;
                ResManager._loadSubpackage = qq.loadSubpackage;
                ResManager._fileSystemManager.access({
                    path: ResManager._resBasePath,
                    fail: () => {
                        ResManager._fileSystemManager.mkdirSync(ResManager._resBasePath, true);
                    },
                });
            }
            else if (PlatFormManager.CUR_PLATFORM == PlatFormManager.OPPO ||
                PlatFormManager.CUR_PLATFORM == PlatFormManager.VIVO) {
                ResManager._remote = "https://cdn.xxtch.com/ZombieEscape/res/oppo/";
                ResManager._resBasePath = qg.env.USER_DATA_PATH + "/cache/res/";
                ResManager._fileSystemManager = qg.getFileSystemManager();
                ResManager._downloadFile = qg.downloadFile;
                ResManager._loadSubpackage = qg.loadSubpackage;
                ResManager._fileSystemManager.access({
                    path: ResManager._resBasePath,
                    fail: () => {
                        ResManager._fileSystemManager.mkdirSync(ResManager._resBasePath, true);
                    },
                });
            }
        }
        static init() {
            return new Promise((resolve) => {
                if (ResManager._instance == null) {
                    ResManager._instance = new ResManager();
                    let zipVersion = Laya.LocalStorage.getItem("zipVersion");
                    if (zipVersion) {
                        ResManager._zipVersion = JSON.parse(zipVersion);
                    }
                    let resconfigUrl = "resconfig.json";
                    if (PlatFormManager.CUR_PLATFORM == PlatFormManager.WX) {
                        let platform = "wx";
                        let version = "1.0";
                        resconfigUrl =
                            ResManager._remote + `resconfig_${platform}_${version}.json`;
                        resconfigUrl += "?ran=" + Math.random() * 1000000;
                    }
                    else if (PlatFormManager.CUR_PLATFORM == PlatFormManager.QQ) {
                        let platform = "qq";
                        let version = "1.0";
                        resconfigUrl =
                            ResManager._remote + `resconfig_${platform}_${version}.json`;
                        resconfigUrl += "?ran=" + Math.random() * 1000000;
                    }
                    else if (PlatFormManager.CUR_PLATFORM == PlatFormManager.OPPO) {
                        let platform = "oppo";
                        let version = "1.0";
                        resconfigUrl =
                            ResManager._remote + `resconfig_${platform}_${version}.json`;
                        resconfigUrl += "?ran=" + Math.random() * 1000000;
                    }
                    else if (PlatFormManager.CUR_PLATFORM == PlatFormManager.VIVO) {
                        let platform = "vivo";
                        let version = "1.0";
                        resconfigUrl =
                            ResManager._remote + `resconfig_${platform}_${version}.json`;
                        resconfigUrl += "?ran=" + Math.random() * 1000000;
                    }
                    Laya.loader.load(resconfigUrl, Laya.Handler.create(this, (resconfig) => {
                        if (typeof resconfig == "string")
                            resconfig = JSON.parse(resconfig);
                        for (const key in resconfig) {
                            if (resconfig.hasOwnProperty(key)) {
                                let respackage = resconfig[key];
                                let files = respackage[0];
                                for (let i = 0; i < files.length; i++) {
                                    let file = files[i];
                                    if (respackage[1] == "local" || respackage[1] == "sub") {
                                        let url = "res/" + key + "/" + file;
                                        if (PlatFormManager.CUR_PLATFORM == PlatFormManager.OPPO &&
                                            respackage[1] == "sub") {
                                            url = key + "/" + file;
                                        }
                                        ResManager._resMap.set(file, new Res(file, key, respackage[1], url));
                                    }
                                    else {
                                        let url = ResManager._resBasePath + file;
                                        ResManager._resMap.set(file, new Res(file, key + "_" + respackage[2], respackage[1], url));
                                    }
                                }
                            }
                        }
                        console.log(ResManager._resMap);
                        resolve();
                    }));
                }
            });
        }
        static getRes(name) {
            let res = ResManager._resMap.get(name);
            if (!res)
                console.error(name);
            return Laya.loader.getRes(ResManager._resMap.get(name).url);
        }
        static getResClone(name) {
            return Laya.loader.getRes(ResManager._resMap.get(name).url).clone();
        }
        static download(names, progressCb = null) {
            return new Promise((resolve) => {
                let subnames = [];
                let zipnames = [];
                for (let j = 0; j < names.length; j++) {
                    let name = names[j];
                    let res = ResManager._resMap.get(name);
                    if (!res) {
                        console.error("找不到资源", name);
                    }
                    if (res.location == "sub") {
                        if (subnames.indexOf(res.bundleName) == -1) {
                            if (ResManager._loadedSubNames.indexOf(res.bundleName) == -1) {
                                subnames.push(res.bundleName);
                            }
                        }
                    }
                    else if (res.location == "net") {
                        if (zipnames.indexOf(res.bundleName) == -1) {
                            let dirname = res.bundleName.split("_")[0];
                            let version = res.bundleName.split("_")[1];
                            if (ResManager._zipVersion[dirname] != version) {
                                zipnames.push(res.bundleName);
                            }
                        }
                    }
                }
                ResManager._loadSubpackages(subnames, progressCb).then(() => {
                    ResManager._downloadFiles(zipnames, progressCb).then(() => {
                        resolve();
                    });
                });
            });
        }
        static create(names, progressCb = null) {
            return new Promise((resolve) => {
                ResManager.download(names, progressCb).then(() => {
                    let ress = [];
                    for (let j = 0; j < names.length; j++) {
                        ress.push(ResManager._resMap.get(names[j]));
                    }
                    ResManager._createRes(ress, ress.length, progressCb).then(() => {
                        resolve();
                    });
                });
            });
        }
        static _createRes(ress, originalLength, progressCb = null) {
            return new Promise((resolve) => {
                if (ress.length > 0) {
                    let res = ress.shift();
                    let baseName = res.name.split(".")[0];
                    let progressVal = (originalLength - ress.length - 1) / originalLength;
                    progressCb &&
                        progressCb({ type: "create", progress: progressVal, name: baseName });
                    Laya.loader.create(res.url, Laya.Handler.create(this, () => {
                        progressVal = (originalLength - ress.length) / originalLength;
                        progressCb &&
                            progressCb({
                                type: "create",
                                progress: progressVal,
                                name: baseName,
                            });
                        ResManager._createRes(ress, originalLength, progressCb).then(() => {
                            resolve();
                        });
                    }), Laya.Handler.create(this, (value) => {
                        progressCb &&
                            progressCb({
                                type: "create",
                                progress: progressVal,
                                name: baseName,
                            });
                    }));
                }
                else {
                    resolve();
                }
            });
        }
        static loadSpines(names) {
            return new Promise((resolve) => {
                let spines = [];
                if (names && names.length > 0) {
                    let name = names.shift();
                    ResManager.download([name]).then(() => {
                        let skeleton = new Laya.Skeleton();
                        spines.push(skeleton);
                        skeleton.load(ResManager._resMap.get(name).url, Laya.Handler.create(this, () => {
                            ResManager.loadSpines(names).then((spine) => {
                                resolve(spines.concat(spine));
                            });
                        }));
                    });
                }
                else {
                    resolve(spines);
                }
            });
        }
        static loadFonts(names) {
            return new Promise((resolve) => {
                if (names && names.length > 0) {
                    let name = names.shift();
                    ResManager.download([name]).then(() => {
                        let font = new Laya.BitmapFont();
                        font.loadFont(ResManager._resMap.get(name).url, Laya.Handler.create(this, (bitmapFont) => {
                            bitmapFont.setSpaceWidth(10);
                            bitmapFont.autoScaleSize = true;
                            Laya.Text.registerBitmapFont(name.split(".")[0], bitmapFont);
                            ResManager.loadFonts(names).then(() => {
                                resolve();
                            });
                        }, [font]));
                    });
                }
                else {
                    resolve();
                }
            });
        }
        static playSound(url, loops = 1, complete = null, soundClass = null, startTime = 0) {
            ResManager.download([url]).then(() => {
                if (ResManager.soundOpen) {
                    return Laya.SoundManager.playSound(ResManager._resMap.get(url).url, loops, complete, soundClass, startTime);
                }
            });
        }
        static stopSound(url) {
            Laya.SoundManager.stopSound(ResManager._resMap.get(url).url);
        }
        static playMusic(url, loops = 0, complete = null, startTime = 0) {
            ResManager.download([url]).then(() => {
                if (ResManager.musicOpen) {
                    return Laya.SoundManager.playMusic(ResManager._resMap.get(url).url, loops, complete, startTime);
                }
            });
        }
        static _loadSubpackages(names, progressCb = null) {
            return new Promise((resolve) => {
                if (names.length > 0) {
                    let name = names.shift();
                    let progressVal = 0;
                    progressCb &&
                        progressCb({
                            type: "download",
                            progress: progressVal,
                            location: "sub",
                            name: name,
                        });
                    console.log("loadSubpackageStart" + name);
                    let loadObj = {
                        name: name,
                        success: (res) => {
                            ResManager._loadedSubNames.push(name);
                            progressVal = 1;
                            progressCb &&
                                progressCb({
                                    type: "download",
                                    progress: progressVal,
                                    location: "sub",
                                    name: name,
                                });
                            ResManager._loadSubpackages(names, progressCb).then(() => {
                                resolve();
                            });
                        },
                        fail: (res) => {
                            console.log("loadSubpackageFail", JSON.stringify(res), name);
                        },
                    };
                    console.log(loadObj);
                    const loadTask = ResManager._loadSubpackage(loadObj);
                    loadTask.onProgressUpdate((res) => {
                        progressVal = res.progress > progressVal ? res.progress : progressVal;
                        progressVal = progressVal < 1 ? progressVal : 1;
                        progressCb &&
                            progressCb({
                                type: "download",
                                progress: progressVal,
                                location: "sub",
                                name: name,
                                totalBytesWritten: res.totalBytesWritten,
                                totalBytesExpectedToWrite: res.totalBytesExpectedToWrite,
                            });
                    });
                }
                else {
                    resolve();
                }
            });
        }
        static _downloadFiles(names, progressCb = null) {
            return new Promise((resolve) => {
                if (names.length > 0) {
                    let name = names.shift();
                    let dirname = name.split("_")[0];
                    let version = name.split("_")[1];
                    let progressVal = 0;
                    progressCb &&
                        progressCb({
                            type: "download",
                            progress: progressVal,
                            location: "net",
                            name: dirname,
                        });
                    let zipPath = ResManager._resBasePath + name + ".zip";
                    const loadTask = ResManager._downloadFile({
                        url: ResManager._remote + name + ".zip",
                        filePath: zipPath,
                        success: (res) => {
                            if (res.statusCode === 200) {
                                ResManager._fileSystemManager.unzip({
                                    zipFilePath: zipPath,
                                    targetPath: ResManager._resBasePath,
                                    success: (res) => {
                                        ResManager._zipVersion[dirname] = version;
                                        Laya.LocalStorage.setItem("zipVersion", JSON.stringify(ResManager._zipVersion));
                                        progressVal = 1;
                                        progressCb &&
                                            progressCb({
                                                type: "download",
                                                progress: progressVal,
                                                location: "net",
                                                name: dirname,
                                            });
                                        ResManager._fileSystemManager.unlink({ filePath: zipPath });
                                        ResManager._downloadFiles(names, progressCb).then(() => {
                                            resolve();
                                        });
                                    },
                                    fail: (res) => { },
                                });
                            }
                        },
                        fail: (res) => { },
                    });
                    loadTask.onProgressUpdate((res) => {
                        let curProgressVal = res.progress / 100;
                        progressVal =
                            curProgressVal > progressVal ? curProgressVal : progressVal;
                        progressVal = progressVal < 1 ? progressVal : 1;
                        progressCb &&
                            progressCb({
                                type: "download",
                                progress: progressVal,
                                location: "net",
                                name: dirname,
                            });
                    });
                }
                else {
                    resolve();
                }
            });
        }
        static manualShare() {
            const defaultShareInfo = {
                serial: 1,
                title: '我子弹贼多',
                image: "https://cdn.xxtch.com/ZombieEscape/share.png",
                scoreValue: 0,
            };
            const shareInfo = mpsdk.Share.commonShare(defaultShareInfo, null, () => LoadViewRuntime.shareSuccess = false, this);
            LoadViewRuntime.shareSuccess = true;
            wx.shareAppMessage(shareInfo);
        }
    }
    ResManager._instance = null;
    ResManager._fileSystemManager = null;
    ResManager._resBasePath = null;
    ResManager._downloadFile = null;
    ResManager._loadSubpackage = null;
    ResManager._remote = "";
    ResManager._resMap = null;
    ResManager._loadedSubNames = [];
    ResManager._zipVersion = {};
    ResManager.musicOpen = true;
    ResManager.soundOpen = true;
    ResManager.vibrateOpen = true;
    class Res {
        constructor(name, bundleName, location, url) {
            this._location = null;
            this._bundleName = null;
            this._url = null;
            this._name = null;
            this._name = name;
            this._location = location;
            this._bundleName = bundleName;
            this._url = url;
        }
        get location() {
            return this._location;
        }
        get bundleName() {
            return this._bundleName;
        }
        get url() {
            return this._url;
        }
        get name() {
            return this._name;
        }
    }

    var Platform;
    (function (Platform) {
        Platform["unknown"] = "unknown";
        Platform["qq"] = "qq";
        Platform["wechat"] = "wx";
        Platform["tt"] = "tt";
        Platform["oppo"] = "oppo";
        Platform["vivo"] = "vivo";
        Platform["editor"] = "editor";
    })(Platform || (Platform = {}));
    class AllPlatformAdMgr {
        constructor() {
            this.platform = Platform.unknown;
            this.adUnitId_Config = {
                wx: {
                    bannerId: "adunit-83215d8b1a2f38eb",
                    videoId: "adunit-b4de8f4a9aede4eb",
                    interstitialId: "adunit-9d7d6675ccfc7d20",
                    gridId: "adunit-b385e0ce46d92ee2",
                    customId: "adunit-ba09c5372a4594a7",
                },
                qq: {
                    bannerId: "ad2918d389e3686713d15e9dd4aa85b2",
                    videoId: "f643227e68419423ff634b594dc139a8",
                    appBoxId: [
                        "8795f01ae515971a67967322f0a8bbfe",
                        "e7543f1deacad96dff7ad9a1d919c7bf",
                    ],
                    blockId: "89bd30f53749f7b662ab31b5e8ee7614",
                    interstitialId: "fc02726f82ae326434122b8d01664d58",
                },
                tt: {
                    bannerId: null,
                    videoId: null,
                },
                oppo: {
                    appId: "30523283",
                    nativeId: [
                        "316928",
                        "316929",
                        "316930",
                    ],
                    videoId: "316927",
                    bannerId: null,
                    interstitialId: null,
                    boxId: null,
                },
                vivo: {
                    appId: "100012178",
                    nativeId: [
                        "fa3581708725480992aa5885d48a8a4c",
                        "c19765a97fef4481b9eaffd06d033fd4",
                        "29beaf0e15d0413b8b593cddd36c283c",
                        "a28c6641cdc34f4299513f829ccc6c04",
                        "5bad1eae21d547c9bb0ab28979b3d13b",
                        "48be9800f7da4cbc80bee9cfa0dd9323",
                        "94b31ba1dd614c28835f34e6fee80501",
                        "4d4d53ee56b54ac789c2f4ac04702cbf",
                        "a592cb77f0314063ac30acd8703c147e",
                        "181f8927cad849af82b7bb886ed7f494",
                    ],
                    videoId: "081915e69c89445698fa91eb33a14442",
                    bannerId: "0b2a4a8ed49d4b63897237331c9c5e19",
                    interstitialId: "72e488c74a584e028551f6c8ecd6dc55",
                },
            };
            this.recommendConfig = [
                {
                    name: "我冲的贼快",
                    appId: "30444933",
                    pkgName: "com.wcdzk.xxtch.nearme.gamecenter",
                },
                {
                    name: "兽王争霸",
                    appId: "30428233",
                    pkgName: "com.monsterking.xxtch.nearme.gamecenter",
                },
                {
                    name: "撞飞糖豆人",
                    appId: "30439515",
                    pkgName: "com.zftdr.xxtch.nearme.gamecenter",
                },
                {
                    name: "音速少女",
                    appId: "30348185",
                    pkgName: "com.speedgirl.xxtch.nearme.gamecenter",
                },
                {
                    name: "肥仔大冲撞",
                    appId: "30439517",
                    pkgName: "com.fzdcz.xxtch.nearme.gamecenter",
                },
                {
                    name: "剁手狂欢",
                    appId: "30439516",
                    pkgName: "com.xx.cutmyhand.nearme.gamecenter",
                },
            ];
            this.adUnitId_Banner = null;
            this.adUnitId_Video = null;
            this.adUnitId_AppBox = null;
            this.adUnitId_BlockAd = null;
            this.adUnitId_Interstitial = null;
            this.adUnitId_Native = null;
            this.adUnitId_OppoBox = null;
            this.adUnitId_Custom = null;
            this.adUnitId_Grid = null;
            this.rewardedVideoAd = null;
            this.bannerAd = null;
            this.interstitialAd = null;
            this.gridAd = null;
            this.customAd = null;
            this.appBoxs = null;
            this.blockAd = null;
            this.nativeAd = [];
            this.nativeAdData = [];
            this.showAdList = [];
            this.boxAdSelf = null;
            this.boxAdOfficial = null;
            this.banner_Width = 300;
            this.banner_Height = 120;
            this.margin_Bottom = 0;
            this.nativeLoadTime = 0;
            this.video_OnLoad_Callback = null;
            this.video_OnClose_Callback = null;
            this.native_OnLoad_Callback = null;
            this.adList = [];
            this.noAd = false;
            this.isCheat = 0;
            this.isShowNative = 0;
            this.exchangeTime = 0;
            this.delayTime = 0;
            this.defaultOpen = 0;
            this.oppoLimit = 0;
            this.oppoShowBanner = 0;
            this.boxTimeLimit = 4;
            this.boxType = 0;
            this.isOfficial = 1;
            this.freeTry = 1;
            this.showVideoEventId = 0;
            this.isOld = 0;
            this.forceAd = 0;
            this.forceTimeDelay = 3 * 60 * 1000;
            this.forceTimeLeft = 1;
            this.tryDelayTime = 0;
            this.packDelayTime = 0;
            this.reportShowPer = [];
            this.reportShowTimeLeft = 2;
            this.refreshNativeTimeDelay = [];
            this.nativePer = [100, 10, 100, 50, 50, 1];
            this.isNativeInsertShow = false;
            this.mistakeSwitch = 0;
            this.mistakeTimeDelay = 0;
            this.pullTimeDelay = 60;
            this.secondReportPer = 0;
            this.thirdReportPer = 0;
            this.nativeRefreshTimeDelay = 10;
            this.thirdNativeBelong = 0;
            this.improveExpPer = 0.3;
            this.rewardPurplePer = 0.02;
            this.moneyGodPer = 0;
            this.adIntervalsTime = 30;
        }
        static get Instance() {
            if (this._instance == null)
                this._instance = new AllPlatformAdMgr();
            window["AllPlatformAdMgr"] = this._instance;
            return this._instance;
        }
        getPlatform() {
            if (window["wx"]) {
                this.platform = Platform.wechat;
                if (window["tt"]) {
                    this.platform = Platform.tt;
                }
                if (window["qq"]) {
                    this.platform = Platform.qq;
                }
            }
            else if (window["qg"]) {
                let _systemInfo = qg.getSystemInfoSync();
                if (_systemInfo.brand == "OPPO") {
                    this.platform = Platform.oppo;
                }
                else if (_systemInfo.brand == "vivo") {
                    this.platform = Platform.vivo;
                }
            }
            else {
                this.platform = Platform.editor;
            }
        }
        init() {
            this.getPlatform();
            this.initAdId();
            this.getCheatState().then(() => {
                this.initAdComponent();
            });
        }
        initAdId() {
            switch (this.platform) {
                case Platform.wechat:
                    this.adUnitId_Video = this.adUnitId_Config.wx.videoId;
                    this.adUnitId_Banner = this.adUnitId_Config.wx.bannerId;
                    this.adUnitId_Interstitial = this.adUnitId_Config.wx.interstitialId;
                    this.adUnitId_Custom = this.adUnitId_Config.wx.customId;
                    this.adUnitId_Grid = this.adUnitId_Config.wx.gridId;
                    break;
                case Platform.qq:
                    this.adUnitId_Video = this.adUnitId_Config.qq.videoId;
                    this.adUnitId_Banner = this.adUnitId_Config.qq.bannerId;
                    this.adUnitId_AppBox = this.adUnitId_Config.qq.appBoxId;
                    this.adUnitId_BlockAd = this.adUnitId_Config.qq.blockId;
                    this.adUnitId_Interstitial = this.adUnitId_Config.qq.interstitialId;
                    break;
                case Platform.tt:
                    this.adUnitId_Video = this.adUnitId_Config.tt.videoId;
                    this.adUnitId_Banner = this.adUnitId_Config.tt.bannerId;
                    break;
                case Platform.oppo:
                    this.adUnitId_Video = this.adUnitId_Config.oppo.videoId;
                    this.adUnitId_Interstitial = this.adUnitId_Config.oppo.interstitialId;
                    this.adUnitId_Native = this.adUnitId_Config.oppo.nativeId;
                    this.adUnitId_Banner = this.adUnitId_Config.oppo.bannerId;
                    this.adUnitId_OppoBox = this.adUnitId_Config.oppo.boxId;
                    break;
                case Platform.vivo:
                    this.adUnitId_Video = this.adUnitId_Config.vivo.videoId;
                    this.adUnitId_Interstitial = this.adUnitId_Config.vivo.interstitialId;
                    this.adUnitId_Native = this.adUnitId_Config.vivo.nativeId;
                    this.adUnitId_Banner = this.adUnitId_Config.vivo.bannerId;
                    break;
                default:
                    break;
            }
        }
        initAdComponent() {
            switch (this.platform) {
                case Platform.wechat:
                    this.initVideoAd();
                    this.initBannerAd();
                    this.initInterstitialAd();
                    this.initGridAd();
                    this.initCustomAd();
                    break;
                case Platform.qq:
                    this.initVideoAd();
                    this.initBannerAd();
                    this.initAppBox();
                    this.initBlockAd();
                    this.initInterstitialAd();
                    break;
                case Platform.tt:
                    break;
                case Platform.oppo:
                    this.initVideoAd();
                    this.initBannerAd();
                    this.initNativeAd();
                    this.initBox();
                    this.refreshNativeAd();
                    this.refreshNativeAd1(0);
                    this.updateReportShowTimeLeft();
                    break;
                case Platform.vivo:
                    this.initVideoAd();
                    this.initBannerAd();
                    this.initNativeAd();
                    this.initInterstitialAd();
                    this.refreshNativeAd();
                    this.refreshNativeAd1(0);
                    this.updateReportShowTimeLeft();
                    break;
                default:
                    break;
            }
        }
        getCheatState() {
            return new Promise(resolve => {
                let configUrl = this.getAdconfigUrl();
                Laya.loader.load(configUrl, Laya.Handler.create(this, (adconfig) => {
                    if (!adconfig)
                        return;
                    this.isCheat = adconfig.isCheat;
                    this.isShowNative = adconfig.isShowNative;
                    this.exchangeTime = adconfig.exchangeTime;
                    this.delayTime = adconfig.delayTime;
                    this.defaultOpen = adconfig.defaultOpen;
                    this.oppoLimit = adconfig.oppoLimit;
                    this.oppoShowBanner = adconfig.oppoShowBanner;
                    this.isOfficial = adconfig.isOfficial;
                    this.freeTry = adconfig.freeTry ? adconfig.freeTry : 0;
                    this.isOld = adconfig.isOld ? adconfig.isOld : 0;
                    this.forceAd = adconfig.forceAd ? adconfig.forceAd : 0;
                    this.tryDelayTime = adconfig.tryDelayTime ? adconfig.tryDelayTime : 0;
                    this.mistakeSwitch = adconfig.mistakeSwitch
                        ? adconfig.mistakeSwitch
                        : 0;
                    this.mistakeTimeDelay = adconfig.mistakeTimeDelay
                        ? adconfig.mistakeTimeDelay
                        : 0;
                    this.packDelayTime = adconfig.packDelayTime
                        ? adconfig.packDelayTime
                        : 0;
                    if (this.forceAd) {
                        Laya.timer.once(2 * 60 * 1000, this, () => {
                            this.forceTimeDelay = 0;
                        });
                    }
                    this.reportShowPer = adconfig.reportShowPer
                        ? adconfig.reportShowPer
                        : this.reportShowPer;
                    this.refreshNativeTimeDelay = adconfig.refreshNativeTimeDelay
                        ? adconfig.refreshNativeTimeDelay
                        : this.refreshNativeTimeDelay;
                    this.nativePer = adconfig.nativePer
                        ? adconfig.nativePer
                        : this.nativePer;
                    this.pullTimeDelay = adconfig.pullTimeDelay ? adconfig.pullTimeDelay : this.pullTimeDelay;
                    this.secondReportPer = adconfig.secondReportPer ? adconfig.secondReportPer : this.secondReportPer;
                    this.thirdReportPer = adconfig.thirdReportPer ? adconfig.thirdReportPer : this.thirdReportPer;
                    this.nativeRefreshTimeDelay = adconfig.nativeRefreshTimeDelay ? adconfig.nativeRefreshTimeDelay : this.nativeRefreshTimeDelay;
                    this.thirdNativeBelong = adconfig.thirdNativeBelong ? adconfig.thirdNativeBelong : this.thirdNativeBelong;
                    this.adUnitId_Native = adconfig.nativeId ? adconfig.nativeId : this.adUnitId_Native;
                    this.improveExpPer = adconfig.improveExpPer ? adconfig.improveExpPer : this.improveExpPer;
                    this.rewardPurplePer = adconfig.rewardPurplePer ? adconfig.rewardPurplePer : this.rewardPurplePer;
                    this.moneyGodPer = adconfig.moneyGodPer ? adconfig.moneyGodPer : this.moneyGodPer;
                    resolve();
                }));
            });
        }
        getAdconfigUrl() {
            let baseUrl = "https://cdn.xxtch.com";
            let projectName = "ZombieEscape";
            let version = "1.0";
            return `${baseUrl}/${projectName}/adconfig/adconfig_${this.platform}_${version}.json?ran=${Math.floor(Math.random() * 1000000)}`;
        }
        initBox() {
            if (!this.adUnitId_OppoBox)
                return;
            if (this.platform === Platform.oppo) {
                Laya.timer.once(this.boxTimeLimit * 60 * 1000, this, () => {
                    this.boxTimeLimit = 0;
                });
                this.boxAdSelf = new Laya.Image("ads/Ui_Commontuijian.png");
                this.boxAdSelf.width = Laya.stage.width;
                this.boxAdSelf.height = 275;
                for (let i = 0; i < this.recommendConfig.length; i++) {
                    let data = this.recommendConfig[i];
                    if (data.appId == this.adUnitId_Config.oppo.appId) {
                        let image = new Laya.Image("ads/icon" + data.appId + ".png");
                        image.anchorY = 0.5;
                        image.y = 168;
                        image.width = image.height = 128;
                        image.x = 52 + (128 + 20) * i;
                        image.on(Laya.Event.CLICK, this, () => {
                            qg.navigateToMiniGame({ pkgName: data.pkgName });
                        });
                        this.boxAdSelf.addChild(image);
                    }
                }
                if (qg.getSystemInfoSync().platformVersionCode >= 1076) {
                    this.boxAdOfficial = qg.createGameBannerAd({
                        adUnitId: this.adUnitId_OppoBox,
                    });
                    this.boxAdOfficial.onError((err) => {
                        console.error(err);
                    });
                    this.boxAdOfficial.onLoad((res) => {
                        console.log(res);
                    });
                }
            }
        }
        showBox() {
            if (!this.boxAdSelf && !this.boxAdOfficial)
                return;
            if (this.isOfficial) {
                if (this.boxAdOfficial) {
                    this.boxAdOfficial.show();
                }
                else {
                    this.boxAdSelf.x = 0;
                    this.boxAdSelf.y = Laya.stage.height - this.boxAdSelf.height;
                    Laya.stage.addChild(this.boxAdSelf);
                }
            }
            else {
                this.boxAdSelf.x = 0;
                this.boxAdSelf.y = Laya.stage.height - this.boxAdSelf.height;
                Laya.stage.addChild(this.boxAdSelf);
            }
        }
        hideBox() {
            if (!this.boxAdSelf && !this.boxAdOfficial)
                return;
            if (this.isOfficial) {
                if (this.boxAdOfficial) {
                    this.boxAdOfficial.hide();
                }
                else {
                    Laya.stage.removeChild(this.boxAdSelf);
                }
            }
            else {
                Laya.stage.removeChild(this.boxAdSelf);
            }
        }
        initBlockAd() {
            if (!this.adUnitId_BlockAd)
                return;
            if (this.platform === Platform.qq) {
                let _blockAd = this.blockAd;
                if (_blockAd)
                    _blockAd.destroy();
                let _systemInfo = qq.getSystemInfoSync();
                this.blockAd = qq.createBlockAd({
                    adUnitId: this.adUnitId_BlockAd,
                    style: { left: 0, top: 0 },
                    size: 5,
                    orientation: "landscape",
                });
                _blockAd = this.blockAd;
                _blockAd.onError((res) => {
                    console.log(res);
                });
                _blockAd.onResize((res) => {
                    console.log(res);
                    let _top = _systemInfo.screenHeight - res.height - 300 / _systemInfo.pixelRatio;
                    let _left = (_systemInfo.screenWidth - res.width) / 2;
                    _blockAd.style.top = _top;
                    _blockAd.style.left = _left;
                });
            }
        }
        showBlockAd() {
            if (!this.blockAd)
                return;
            this.blockAd.show();
        }
        hideBlockAd() {
            if (!this.blockAd)
                return;
            this.initBlockAd();
        }
        getBannerStyle() {
            if (!this.bannerAd)
                return;
            if (this.platform == Platform.qq) {
                let _bannerAd = this.bannerAd;
                return _bannerAd.style;
            }
        }
        initGridAd() {
            if (!this.adUnitId_Grid)
                return;
            if (this.platform == Platform.wechat) {
                let _systemInfo = wx.getSystemInfoSync();
                this.gridAd = wx.createGridAd({ adUnitId: this.adUnitId_Grid, adIntervals: 30, style: { left: 0, top: 50, width: 150, height: 100 }, adTheme: "white", gridCount: 5 });
                this.gridAd.onResize((res) => {
                    console.log(res);
                });
            }
        }
        initCustomAd() {
            if (!this.adUnitId_Custom)
                return;
            if (this.platform == Platform.wechat) {
                let _systemInfo = wx.getSystemInfoSync();
                this.customAd = wx.createCustomAd({ adUnitId: this.adUnitId_Custom, adIntervals: 30, style: { left: _systemInfo.screenWidth - 80, top: _systemInfo.screenHeight / 2 - 300, fixed: false } });
            }
        }
        initBannerAd() {
            if (!this.adUnitId_Banner)
                return;
            if (this.platform === Platform.wechat) {
                let _bannerAd = this.bannerAd;
                if (_bannerAd)
                    _bannerAd.destroy();
                let _systemInfo = wx.getSystemInfoSync();
                this.banner_Width = _systemInfo.screenWidth;
                let _left = (_systemInfo.screenWidth - this.banner_Width) / 2;
                let _top = _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                this.bannerAd = wx.createBannerAd({
                    adUnitId: this.adUnitId_Banner,
                    adIntervals: this.adIntervalsTime,
                    style: {
                        left: _left,
                        top: _top,
                        width: this.banner_Width,
                        height: this.banner_Height,
                    },
                });
                _bannerAd = this.bannerAd;
                _bannerAd.onError((res) => {
                    console.log(res);
                });
                _bannerAd.onResize((res) => {
                    this.banner_Height = res.height;
                    _bannerAd.style.top =
                        _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                });
            }
            else if (this.platform === Platform.qq) {
                let _bannerAd = this.bannerAd;
                if (_bannerAd)
                    _bannerAd.destroy();
                let _systemInfo = qq.getSystemInfoSync();
                let _left = (_systemInfo.screenWidth - this.banner_Width) / 2;
                let _top = _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                this.bannerAd = qq.createBannerAd({
                    adUnitId: this.adUnitId_Banner,
                    style: {
                        left: _left,
                        top: _top,
                        width: this.banner_Width,
                        height: this.banner_Height,
                    },
                });
                _bannerAd = this.bannerAd;
                _bannerAd.onResize((res) => {
                    this.banner_Height = res.height;
                    _bannerAd.style.top =
                        _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                });
            }
            else if (this.platform === Platform.tt) {
                this.banner_Width = 208;
                let _systemInfo = tt.getSystemInfoSync();
                let _left = (_systemInfo.screenWidth - this.banner_Width) / 2;
                let _top = _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                let _bannerAd = this.bannerAd;
                if (_bannerAd)
                    _bannerAd.destory();
                this.bannerAd = tt.createBannerAd({
                    adUnitId: this.adUnitId_Banner,
                    adIntervals: 30,
                    style: { left: _left, top: _top, width: this.banner_Width },
                });
                _bannerAd = this.bannerAd;
                _bannerAd.onError((res) => {
                    console.log(res);
                });
                _bannerAd.onResize((res) => {
                    this.banner_Height = res.height;
                    _bannerAd.style.top =
                        _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                });
            }
            else if (this.platform === Platform.oppo) {
                let _bannerAd = this.bannerAd;
                if (_bannerAd)
                    return;
                let _systemInfo = qg.getSystemInfoSync();
                this.banner_Width = _systemInfo.screenWidth;
                let _left = (_systemInfo.screenWidth - this.banner_Width) / 2;
                let _top = _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                this.bannerAd = qg.createBannerAd({
                    adUnitId: this.adUnitId_Banner,
                    style: {
                        left: _left,
                        top: _top,
                        width: this.banner_Width,
                        height: this.banner_Height,
                    },
                });
                _bannerAd = this.bannerAd;
                _bannerAd.onError((res) => {
                    console.error(res);
                });
                _bannerAd.onResize((res) => {
                    this.banner_Height = res.height;
                    this.banner_Width = res.width;
                    _bannerAd.style.top =
                        _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                    _bannerAd.style.width = res.width;
                    _bannerAd.style.left = (_systemInfo.screenWidth - res.width) / 2;
                });
            }
            else if (this.platform === Platform.vivo) {
                let _bannerAd = this.bannerAd;
                if (_bannerAd)
                    return;
                let _systemInfo = qg.getSystemInfoSync();
                this.banner_Width = _systemInfo.screenWidth;
                let _left = (_systemInfo.screenWidth - this.banner_Width) / 2;
                let _top = _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                this.bannerAd = qg.createBannerAd({
                    posId: this.adUnitId_Banner,
                    style: {
                        left: _left,
                        top: _top,
                        width: this.banner_Width,
                        height: this.banner_Height,
                    },
                });
                _bannerAd = this.bannerAd;
                _bannerAd.onError((res) => {
                    console.error(res);
                });
                _bannerAd.onResize((res) => {
                    this.banner_Height = res.height;
                    this.banner_Width = res.width;
                    _bannerAd.style.top =
                        _systemInfo.screenHeight - this.banner_Height - this.margin_Bottom;
                    _bannerAd.style.width = res.width;
                    _bannerAd.style.left = (_systemInfo.screenWidth - res.width) / 2;
                });
            }
        }
        initVideoAd() {
            if (!this.adUnitId_Video)
                return;
            switch (this.platform) {
                case Platform.wechat:
                    this.rewardedVideoAd = wx.createRewardedVideoAd({
                        adUnitId: this.adUnitId_Video,
                    });
                    let rewardedVideoAd_wx = this.rewardedVideoAd;
                    rewardedVideoAd_wx.onError((res) => {
                        console.log(res);
                    });
                    rewardedVideoAd_wx.onClose((res) => {
                        if (res.isEnded) {
                            this.video_OnClose_Callback && this.video_OnClose_Callback();
                            if (this.showVideoEventId) {
                                this.showVideoEventId = 0;
                            }
                        }
                        else {
                            if (this.showVideoEventId) {
                                this.showVideoEventId = 0;
                            }
                        }
                        mpsdk.Report.reportVideoTimeEvent();
                        this.video_OnClose_Callback = null;
                    });
                    break;
                case Platform.qq:
                    this.rewardedVideoAd = qq.createRewardedVideoAd({
                        adUnitId: this.adUnitId_Video,
                    });
                    let rewardedVideoAd_qq = this.rewardedVideoAd;
                    rewardedVideoAd_qq.onError((res) => {
                        console.log(res);
                    });
                    rewardedVideoAd_qq.onClose((res) => {
                        if (res.isEnded) {
                            this.video_OnClose_Callback && this.video_OnClose_Callback();
                            if (qq.aly) {
                                if (window["videoPosition"]) {
                                    qq.aly.videoDot(window["videoPosition"], "success");
                                    window["videoPosition"] = undefined;
                                }
                            }
                        }
                        else {
                            if (qq.aly) {
                                if (window["videoPosition"]) {
                                    qq.aly.videoDot(window["videoPosition"], "fail");
                                    window["videoPosition"] = undefined;
                                }
                            }
                        }
                        this.video_OnClose_Callback = null;
                    });
                    break;
                case Platform.tt:
                    this.rewardedVideoAd = tt.createRewardedVideoAd({
                        adUnitId: this.adUnitId_Video,
                    });
                    let rewardedVideoAd_tt = this.rewardedVideoAd;
                    rewardedVideoAd_tt.onError((res) => {
                        console.log(res);
                    });
                    break;
                case Platform.oppo:
                    this.rewardedVideoAd = qg.createRewardedVideoAd({
                        adUnitId: this.adUnitId_Video,
                    });
                    let rewardedVideoAd_qg = this.rewardedVideoAd;
                    rewardedVideoAd_qg.onError((res) => {
                        console.error(res);
                        qg.showToast({ title: `视频广告加载失败`, icon: "none" });
                    });
                    rewardedVideoAd_qg.onClose((res) => {
                        if (res.isEnded) {
                            this.video_OnClose_Callback && this.video_OnClose_Callback();
                        }
                        else {
                        }
                    });
                    rewardedVideoAd_qg.onLoad(() => {
                        rewardedVideoAd_qg.show();
                    });
                    break;
                case Platform.vivo:
                    this.rewardedVideoAd = qg.createRewardedVideoAd({
                        posId: this.adUnitId_Video,
                    });
                    let rewardedVideoAd_vivo = this.rewardedVideoAd;
                    rewardedVideoAd_vivo.onError((res) => {
                        console.error(res);
                        qg.showToast({ title: `视频广告加载失败`, icon: "none" });
                    });
                    rewardedVideoAd_vivo.onClose((res) => {
                        rewardedVideoAd_vivo.load();
                        if (res.isEnded) {
                            this.video_OnClose_Callback && this.video_OnClose_Callback();
                        }
                        else {
                        }
                        Laya.SoundManager.musicMuted = false;
                    });
                    rewardedVideoAd_vivo.onLoad(() => { });
                    break;
                default:
                    break;
            }
        }
        initAppBox() {
            if (!this.adUnitId_AppBox)
                return;
            this.appBoxs = [];
            for (let i = 0; i < this.adUnitId_AppBox.length; i++) {
                let appBoxId = this.adUnitId_AppBox[i];
                let appBox = qq.createAppBox({ adUnitId: appBoxId });
                this.appBoxs.push(appBox);
            }
        }
        initInterstitialAd() {
            if (!this.adUnitId_Interstitial)
                return;
            switch (this.platform) {
                case Platform.wechat:
                    this.interstitialAd = wx.createInterstitialAd({
                        adUnitId: this.adUnitId_Interstitial,
                    });
                    this.interstitialAd.onError((res) => {
                        console.log(res);
                    });
                    break;
                case Platform.qq:
                    this.interstitialAd = qq.createInterstitialAd({
                        adUnitId: this.adUnitId_Interstitial,
                    });
                    let interAd_qq = this.interstitialAd;
                    interAd_qq.onError((res) => {
                        console.error("qq插屏广告加载失败", res);
                    });
                    interAd_qq.onLoad(() => {
                        console.log("qq插屏广告加载成功");
                    });
                    break;
                case Platform.oppo:
                    this.interstitialAd = qg.createInsertAd({
                        adUnitId: this.adUnitId_Interstitial,
                    });
                    let interAd_qg = this.interstitialAd;
                    interAd_qg.onError((res) => {
                        console.error("oppo插屏广告加载失败", res);
                    });
                    interAd_qg.onLoad(() => {
                        console.log("oppo插屏广告加载成功");
                    });
                    break;
                default:
                    break;
            }
        }
        initNativeAd() {
            if (!this.adUnitId_Native ||
                (this.platform != Platform.oppo && this.platform != Platform.vivo))
                return;
            if (this.nativeAd.length > 0) {
                for (let i = 0; i < this.nativeAd.length; i++) {
                    this.nativeAd.shift().destroy();
                }
                this.nativeAdData = [];
                this.showAdList = [];
            }
            if (this.platform == Platform.oppo) {
                this.reportShowPer = [];
                this.refreshNativeTimeDelay = [];
                for (let i = 0; i < this.adUnitId_Native.length; i++) {
                    let native = qg.createNativeAd({ adUnitId: this.adUnitId_Native[i] });
                    this.nativeAd.push(native);
                    this.nativeAdData.push([]);
                    this.showAdList.push([]);
                    this.loadNativeAd(i);
                    this.reportShowPer.push(1);
                    this.refreshNativeTimeDelay.push(0);
                }
            }
            else if (this.platform == Platform.vivo) {
                for (let i = 0; i < this.adUnitId_Native.length; i++) {
                    let index = i;
                    Laya.timer.once(5000 * index, this, () => {
                        let native = qg.createNativeAd({
                            posId: this.adUnitId_Native[index],
                        });
                        this.nativeAd.push(native);
                        this.nativeAdData.push([]);
                        this.showAdList.push([]);
                        this.loadNativeAd(index);
                        this.reportShowPer.push(1);
                        this.refreshNativeTimeDelay.push(0);
                    });
                }
            }
        }
        loadNativeAd(index, force = false) {
            return new Promise((resolve) => {
                let nativeAd = this.nativeAd[index];
                let adList = this.nativeAdData[index];
                let onErrorCb = (res) => {
                    console.error("oppo原生广告出错" + index, res);
                    nativeAd.offError(onErrorCb);
                    nativeAd.offLoad(onLoadCb);
                    resolve();
                };
                let onLoadCb = (res) => {
                    console.log("oppo原生广告加载成功" + index, res);
                    this.nativeLoadTime++;
                    if (this.nativeLoadTime == 2) {
                        Laya.timer.once(45000, this, () => {
                            this.nativeLoadTime = 0;
                        });
                    }
                    for (let j = 0; j < res.adList.length; j++) {
                        let adNew = res.adList[j];
                        if (adList.length > 0) {
                            for (let i = 0; i < adList.length; i++) {
                                let adExist = adList[i];
                                if (adExist.adId != adNew.adId) {
                                    adList.push(adNew);
                                }
                            }
                        }
                        else {
                            adList.push(adNew);
                        }
                    }
                    nativeAd.offError(onErrorCb);
                    nativeAd.offLoad(onLoadCb);
                    resolve();
                };
                nativeAd.onError(onErrorCb);
                nativeAd.onLoad(onLoadCb);
                if (force) {
                    nativeAd.load();
                }
                else {
                    if (adList.length > 0) {
                        resolve();
                    }
                    else {
                        nativeAd.load();
                    }
                }
            });
        }
        refreshNativeAd() {
            for (let i = 0; i < this.nativeAd.length; i++) {
                let timeDelay = this.refreshNativeTimeDelay[i];
                if (timeDelay > 0) {
                    let adIndex = i;
                    Laya.timer.loop(timeDelay * 1000, this, () => {
                        this.loadNativeAd(adIndex, true);
                    });
                }
            }
        }
        refreshNativeAd1(index) {
            if (this.nativeRefreshTimeDelay > 0) {
                Laya.timer.loop(this.nativeRefreshTimeDelay * 1000, this, () => {
                    this.showNativeAd(index, null);
                });
            }
        }
        showNativeAd(index, callback) {
            if (this.platform == Platform.editor)
                return;
            index = index < this.nativeAd.length ? index : 0;
            this.loadNativeAd(index).then(() => {
                let adList = this.nativeAdData[index];
                let showList = this.showAdList[index];
                for (let i = 0; i < adList.length; i++) {
                    let ad = adList[adList.length - 1 - i];
                    if (showList.indexOf(ad) == -1) {
                        if (callback)
                            callback(ad);
                        return;
                    }
                }
                if (callback)
                    callback(null);
            });
        }
        hideNativeAd(index, ad) {
            index = index < this.nativeAd.length ? index : 0;
            let showList = this.showAdList[index];
            if (!showList)
                return;
            let indexInShow = showList.indexOf(ad);
            console.log("hideNativeAd", indexInShow);
            if (indexInShow != -1)
                showList.splice(indexInShow, 1);
        }
        reportNativeAdClick(index, ad) {
            index = index < this.nativeAd.length ? index : 0;
            let showList = this.showAdList[index];
            let adList = this.nativeAdData[index];
            if (!showList || !adList)
                return;
            let indexInShow = showList.indexOf(ad);
            let indexInAd = adList.indexOf(ad);
            console.log("reportNativeAdClick", indexInShow, indexInAd);
            if (indexInShow != -1)
                showList.splice(indexInShow, 1);
            if (indexInAd != -1)
                adList.splice(indexInAd, 1);
            if (this.platform == Platform.oppo) {
                let ad1 = [0];
                let ad2 = [1];
                if (this.thirdNativeBelong == 0) {
                    ad1.push(2);
                }
                else {
                    ad2.push(2);
                }
                if (ad1.indexOf(index) != -1) {
                }
                else if (ad2.indexOf(index) != -1) {
                    this.nativeAd[index].reportAdShow({ adId: ad.adId });
                    this.reportShowTimeLeft--;
                    if (Math.random() < this.secondReportPer) {
                        this.reportShowTimeLeft--;
                        Laya.timer.once(10000, this, () => {
                            this.nativeAd[index].reportAdShow({ adId: ad.adId });
                        });
                    }
                    if (Math.random() < this.thirdReportPer) {
                        this.reportShowTimeLeft--;
                        Laya.timer.once(20000, this, () => {
                            this.nativeAd[index].reportAdShow({ adId: ad.adId });
                        });
                    }
                }
                else {
                }
            }
            this.nativeAd[index].reportAdClick({ adId: ad.adId });
        }
        reportNativeAdShow(index, ad) {
            index = index < this.nativeAd.length ? index : 0;
            if (this.platform == Platform.vivo) {
                this.nativeAd[index].reportAdShow({ adId: ad.adId });
            }
            else if (this.platform == Platform.oppo) {
                let ad1 = [0];
                let ad2 = [1];
                if (this.thirdNativeBelong == 0) {
                    ad1.push(2);
                }
                else {
                    ad2.push(2);
                }
                if (ad1.indexOf(index) != -1) {
                    if (this.reportShowTimeLeft > 0) {
                        this.reportShowTimeLeft--;
                        this.nativeAd[index].reportAdShow({ adId: ad.adId });
                    }
                }
                else if (ad2.indexOf(index) != -1) {
                }
                else {
                }
            }
        }
        updateReportShowTimeLeft() {
            Laya.timer.loop(this.pullTimeDelay * 1000, this, () => {
                this.reportShowTimeLeft++;
            });
        }
        showBannerAd() {
            if (!this.bannerAd && this.platform == Platform.oppo && this.oppoShowBanner)
                return;
            if (this.noAd)
                return;
            switch (this.platform) {
                case Platform.wechat:
                    let bannerAd_wx = this.bannerAd;
                    bannerAd_wx && bannerAd_wx.show();
                    break;
                case Platform.qq:
                    let bannerAd_qq = this.bannerAd;
                    bannerAd_qq && bannerAd_qq.show();
                    break;
                case Platform.tt:
                    let bannerAd_tt = this.bannerAd;
                    bannerAd_tt && bannerAd_tt.show();
                    break;
                case Platform.oppo:
                    let bannerAd_oppo = this.bannerAd;
                    bannerAd_oppo && bannerAd_oppo.show();
                    break;
                case Platform.vivo:
                    let bannerAd_vivo = this.bannerAd;
                    bannerAd_vivo && bannerAd_vivo.show();
                    break;
                default:
                    break;
            }
        }
        showVideoAd(callback) {
            if (this.platform === Platform.editor || this.noAd) {
                callback && callback();
            }
            else {
                if (!this.rewardedVideoAd) {
                    return;
                }
                this.video_OnClose_Callback = callback;
                switch (this.platform) {
                    case Platform.wechat:
                        let videoAd_wx = this.rewardedVideoAd;
                        videoAd_wx.show().catch((reason) => {
                            if (this.showVideoEventId) {
                                this.showVideoEventId = 0;
                            }
                            console.log("微信视频播放失败原因", reason);
                            wx.showToast({
                                icon: "none",
                                title: "视频播放失败",
                                duration: 1500,
                            });
                            ResManager.manualShare();
                        });
                        break;
                    case Platform.qq:
                        if (qq.aly) {
                            if (window["videoPosition"]) {
                                qq.aly.videoDot(window["videoPosition"], "show");
                            }
                        }
                        let videoAd_qq = this.rewardedVideoAd;
                        videoAd_qq.show().catch((reason) => {
                            console.log("qq视频播放失败原因", reason);
                            window["videoPosition"] = undefined;
                            qq.showToast({
                                icon: "none",
                                title: "视频播放失败",
                                duration: 1500,
                            });
                        });
                        break;
                    case Platform.tt:
                        let videoAd_tt = this.rewardedVideoAd;
                        if (callback)
                            videoAd_tt.onClose((res) => {
                                if (res.isEnded) {
                                    if (callback)
                                        callback();
                                }
                                else {
                                }
                            });
                        videoAd_tt.show().catch((reason) => { });
                        break;
                    case Platform.oppo:
                        let videoAd_qg = this.rewardedVideoAd;
                        videoAd_qg.load();
                        break;
                    case Platform.vivo:
                        Laya.SoundManager.musicMuted = true;
                        let videoAd_vivo = this.rewardedVideoAd;
                        videoAd_vivo.show();
                        break;
                    default:
                        break;
                }
            }
        }
        showAppBox(index) {
            if (this.platform == Platform.editor)
                return;
            switch (this.platform) {
                case Platform.qq:
                    let appBox = this.appBoxs[index];
                    appBox.load().then(() => {
                        appBox.show();
                    });
                    break;
                default:
                    break;
            }
        }
        showInterstitialAd(callback) {
            if (callback && this.platform === Platform.editor)
                callback();
            if (!this.interstitialAd && this.platform != Platform.vivo)
                return;
            switch (this.platform) {
                case Platform.wechat:
                    let interAd_wx = this.interstitialAd;
                    interAd_wx.show();
                    break;
                case Platform.qq:
                    let interAd_qq = this.interstitialAd;
                    interAd_qq.show();
                    break;
                case Platform.oppo:
                    let interAd_qg = this.interstitialAd;
                    interAd_qg.onClose(() => {
                        interAd_qg.load();
                        if (callback)
                            callback();
                    });
                    interAd_qg.show();
                    break;
                case Platform.vivo:
                    this.interstitialAd = qg.createInterstitialAd({
                        posId: this.adUnitId_Interstitial,
                    });
                    let interAd_vivo = this.interstitialAd;
                    interAd_vivo.onError((res) => {
                        console.error("vivo插屏广告加载失败", res);
                    });
                    interAd_vivo.onLoad(() => {
                        console.log("vivo插屏广告加载成功");
                    });
                    interAd_vivo.show();
                    break;
                default:
                    break;
            }
        }
        hideBannerAd() {
            if (!this.bannerAd ||
                (this.platform == Platform.oppo && this.oppoShowBanner))
                return;
            switch (this.platform) {
                case Platform.wechat:
                    let bannerAd_wx = this.bannerAd;
                    bannerAd_wx.hide();
                    break;
                case Platform.qq:
                    let bannerAd_qq = this.bannerAd;
                    bannerAd_qq.hide();
                    break;
                case Platform.tt:
                    let bannerAd_tt = this.bannerAd;
                    bannerAd_tt.hide();
                    break;
                case Platform.oppo:
                    let bannerAd_qg = this.bannerAd;
                    bannerAd_qg.hide();
                    break;
                case Platform.vivo:
                    let bannerAd_vivo = this.bannerAd;
                    bannerAd_vivo.hide();
                    break;
                default:
                    break;
            }
        }
        showGridAd() {
            if (this.gridAd)
                this.gridAd.show();
        }
        hideGridAd() {
            if (this.gridAd)
                this.gridAd.hide();
        }
        showCustomAd() {
            if (this.customAd)
                this.customAd.show();
        }
        hideCustomAd() {
            if (this.customAd)
                this.customAd.hide();
        }
        compareVersion(v1, v2) {
            v1 = v1.split(".");
            const len = Math.max(v1.length, v2.length);
            while (v1.length < len) {
                v1.push("0");
            }
            while (v2.length < len) {
                v2.push("0");
            }
            for (let i = 0; i < len; i++) {
                const num1 = parseInt(v1[i]);
                const num2 = parseInt(v2[i]);
                if (num1 > num2) {
                    return 1;
                }
                else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }
    }

    class CountDialogRuntime extends ui.pages.countUI {
        constructor() {
            super(...arguments);
            this.reward = 0;
            this.btnType = 0;
            this.listData = null;
            this.slideDir = 0;
        }
        onAwake() {
            if (GameDataManager.Instance.liveNum == 0) {
                this.winBox.visible = false;
                this.lostBox.visible = true;
                this.setBtnType(2);
            }
            else {
                this.winBox.visible = true;
                this.lostBox.visible = false;
                this.reward = GameDataManager.Instance.killNum;
                this.goldNum.value = 'x' + this.reward;
                this.setBtnType(0);
                CountDialogRuntime.showCount++;
                if (UserData.instance.level == 2) {
                    mpsdk.Report.reportEvent(1, "通关第2关");
                }
                else if (UserData.instance.level == 3) {
                    mpsdk.Report.reportEvent(2, "通关第3关");
                }
                else if (UserData.instance.level == 4) {
                    mpsdk.Report.reportEvent(3, "通关第4关");
                }
                else if (UserData.instance.level == 5) {
                    mpsdk.Report.reportEvent(4, "通关第5关");
                }
            }
            this.showCheckBtn(false);
            this.nativeAd.bg.skin = "ad/Ui_JiesuanAd.png";
            this.nativeAd.setContentBoxStyle({ left: 10, right: 10, top: 10, bottom: 10 });
            this.registerNativeEvent();
            this.nativeAd.showNative({
                index: 0
            });
            EventManager.on(EventType$1.onHide, this, this.onHide);
            EventManager.on(EventType$1.onShow, this, this.onShow);
            this.showGuesslikeList();
            this.guessLikeList.hScrollBarSkin = null;
            this.guessLikeList.mouseHandler = Laya.Handler.create(this, this.onListMouseHandler, null, false);
            this.slideDir = 1;
            Laya.timer.frameLoop(1, this, this.onFrameLoop);
        }
        onListMouseHandler(e, index) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                let data = this.listData[index];
                mpsdk.Ad.click(data);
                CountDialogRuntime.isTry = true;
                localStorage.setItem("countGuessLikeTimestamp", Date.now().toString());
            }
        }
        onOpened() {
            this.checkAd.on(Laya.Event.CLICK, this, this.onBtnEvent);
            this.receive.on(Laya.Event.CLICK, this, this.onBtnEvent);
            this.winMoreMoney.on(Laya.Event.CLICK, this, this.onBtnEvent);
            this.lostSure.on(Laya.Event.CLICK, this, this.onBtnEvent);
            this.again.on(Laya.Event.CLICK, this, this.onBtnEvent);
            if (window["wudian"] == "1" && (this.btnType == 0 || this.btnType == 1)) {
                Laya.Scene.open(Scene$1.treasure, false);
            }
            else {
                AllPlatformAdMgr.Instance.showCustomAd();
                AllPlatformAdMgr.Instance.showGridAd();
                AllPlatformAdMgr.Instance.showBannerAd();
            }
        }
        onClosed() {
            AllPlatformAdMgr.Instance.hideBannerAd();
            AllPlatformAdMgr.Instance.hideCustomAd();
            AllPlatformAdMgr.Instance.hideGridAd();
        }
        onDestroy() {
            EventManager.off(EventType$1.onHide, this, this.onHide);
            EventManager.off(EventType$1.onShow, this, this.onShow);
            EventManager.off(EventType$1.ShareSuccess, this, this.videoSuccessCallback);
            Laya.timer.clearAll(this);
        }
        onBtnEvent(e) {
            if (e.target == this.checkAd) {
                this.nativeAd.runClick();
            }
            else if (e.target == this.receive) {
                UserData.instance.gold += this.reward;
                UserData.instance.onDataChange("gold");
                mpsdk.Report.reportGold(this.reward, UserData.instance.gold, '过关奖励', 4);
                this.close();
                if (UserData.instance.level < 8) {
                    UserData.instance.level++;
                    UserData.instance.onDataChange("level");
                    if (UserData.instance.level == 8) {
                        UserData.instance.isFull = 1;
                        UserData.instance.onDataChange("isFull");
                    }
                }
                EventManager.event(EventType$1.ReturnMain, true);
                if (AllPlatformAdMgr.Instance.isCheat > Math.random()) {
                    Laya.MouseManager.enabled = false;
                    Laya.Scene.load(Scene$1.recommend1, Laya.Handler.create(this, (recommend) => {
                        recommend.contentBox.width = Laya.stage.width;
                        recommend.contentBox.height = Laya.stage.height;
                        recommend.width = Laya.stage.width;
                        recommend.height = Laya.stage.height;
                        recommend.isShowEffect = false;
                        recommend.open(false);
                        Laya.MouseManager.enabled = true;
                    }));
                }
            }
            else if (e.target == this.winMoreMoney) {
                EventManager.on(EventType$1.ShareSuccess, this, this.videoSuccessCallback);
                AllPlatformAdMgr.Instance.showVideoAd(this.videoSuccessCallback.bind(this));
            }
            else if (e.target == this.lostSure) {
                this.close();
                EventManager.event(EventType$1.ReturnMain, false);
            }
            else if (e.target == this.again) {
                this.close();
                EventManager.event(EventType$1.GameAgain);
            }
        }
        videoSuccessCallback() {
            UserData.instance.gold += this.reward * 2;
            UserData.instance.onDataChange("gold");
            mpsdk.Report.reportGold(this.reward * 2, UserData.instance.gold, '过关奖励', 4);
            this.close();
            if (UserData.instance.level < 8) {
                UserData.instance.level++;
                UserData.instance.onDataChange("level");
                if (UserData.instance.level == 8) {
                    UserData.instance.isFull = 1;
                    UserData.instance.onDataChange("isFull");
                }
            }
            EventManager.event(EventType$1.ReturnMain, true);
        }
        setBtnType(type) {
            this.checkAd.visible = false;
            this.receive.visible = false;
            this.winMoreMoney.visible = false;
            this.lostSure.visible = false;
            this.again.visible = false;
            this.btnType = type;
            if (type == 0) {
                this.winMoreMoney.x = 219;
                this.winMoreMoney.y = 962;
                this.winMoreMoney.visible = true;
                this.checkAd.x = 391;
                this.checkAd.y = 796;
                this.checkAd.skin = "ad/Btn_look.png";
                this.checkAd.visible = true;
                this.receive.visible = true;
                this.receive.skin = "ad/Btn_Get.png";
                this.receive.x = 319;
                this.receive.y = 1086;
            }
            else if (type == 1) {
                this.winMoreMoney.x = 391;
                this.winMoreMoney.y = 796;
                this.winMoreMoney.visible = true;
                this.checkAd.x = 295;
                this.checkAd.y = 908;
                this.checkAd.skin = "ad/Btn_look3.png";
                this.checkAd.visible = true;
                this.receive.visible = true;
                this.receive.skin = "ad/Btn_Get2.png";
                this.receive.x = 65;
                this.receive.y = 796;
            }
            else if (type == 2) {
                this.checkAd.x = 390;
                this.checkAd.y = 796;
                this.checkAd.skin = "ad/Btn_look2.png";
                this.checkAd.visible = true;
                this.lostSure.visible = true;
                this.lostSure.x = 320;
                this.lostSure.y = 908;
                this.lostSure.skin = "ad/Btn_Sure.png";
                this.again.visible = true;
            }
        }
        registerNativeEvent() {
            this.nativeAd.nativeHandler = Laya.Handler.create(this, (p1, p2) => {
                if (p1 && p1 == "show") {
                    if (p2) {
                        this.showCheckBtn(true);
                    }
                    else {
                        this.showCheckBtn(false);
                    }
                }
                else if (p1 && p1 == "hide") {
                    this.showCheckBtn(false);
                }
            }, null, false);
        }
        showCheckBtn(bool) {
            this.checkAd.visible = bool;
            if (this.btnType == 0) {
                if (bool) {
                    this.winMoreMoney.x = 65;
                }
                else {
                    this.winMoreMoney.x = 219;
                }
            }
            else if (this.btnType == 2) {
                if (bool) {
                    this.again.x = 65;
                }
                else {
                    this.again.x = 219;
                }
            }
        }
        showGuesslikeList() {
            mpsdk.Ad.getSuggestList(false, 0, 100).then((data) => {
                this.listData = data;
                let adDatas = [];
                for (let i = 0; i < this.listData.length; i++) {
                    adDatas.push({
                        icon: { skin: this.listData[i].icon },
                        title: { text: this.listData[i].title },
                    });
                }
                this.guessLikeList.array = adDatas;
                this.guessLikeList.refresh();
            });
        }
        onShow() {
            if (CountDialogRuntime.isTry) {
                CountDialogRuntime.isTry = false;
                CountDialogRuntime.jumpSuccess = false;
                let outTime = Number(localStorage.getItem("countGuessLikeTimestamp"));
                if (outTime && outTime > 0) {
                    if (Date.now() - outTime >= 15 * 1000) {
                        UserData.instance.gold += 300;
                        UserData.instance.onDataChange("gold");
                    }
                }
            }
        }
        onHide() {
            if (CountDialogRuntime.isTry) {
                CountDialogRuntime.jumpSuccess = true;
            }
        }
        onFrameLoop() {
            if (this.guessLikeList.scrollBar.max > 0) {
                if (this.slideDir == 1) {
                    this.guessLikeList.scrollBar.value += 0.2;
                    if (this.guessLikeList.scrollBar.value >= this.guessLikeList.scrollBar.max) {
                        this.slideDir = 2;
                    }
                }
                else if (this.slideDir == 2) {
                    this.guessLikeList.scrollBar.value -= 0.2;
                    if (this.guessLikeList.scrollBar.value <= this.guessLikeList.scrollBar.min) {
                        this.slideDir = 1;
                    }
                }
            }
        }
    }
    CountDialogRuntime.showCount = 0;
    CountDialogRuntime.isTry = false;
    CountDialogRuntime.jumpSuccess = false;

    class NativeAdRuntime extends ui.pages.nativeAdUI {
        constructor() {
            super(...arguments);
            this.ad = null;
            this.index = -1;
            this.nativeHandler = null;
            this.style = null;
        }
        onAwake() {
            this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.closeBtn.on(Laya.Event.CLICK, this, this.onMouseDown);
            this.scaleX = this.scaleY = 0;
            this.title.left = this.desc.left = this.icon.x + this.icon.width + 5;
        }
        onMouseDown(e) {
            e.stopPropagation();
            if (e.target == this) {
                this.runClick();
            }
            else if (e.target == this.closeBtn) {
                AllPlatformAdMgr.Instance.hideNativeAd(this.index, this.ad);
                this.scaleX = this.scaleY = 0;
                if (this.nativeHandler)
                    this.nativeHandler.runWith(["hide", false]);
            }
            this.index = -1;
            this.ad = null;
        }
        showNative(res) {
            if (!AllPlatformAdMgr.Instance.isShowNative)
                return;
            AllPlatformAdMgr.Instance.showNativeAd(res.index, (adList) => {
                if (!adList) {
                    if (this.nativeHandler)
                        this.nativeHandler.runWith(["show", false]);
                    return;
                }
                if (!this.style && res.style)
                    this.style = res.style;
                if (this.style && this.style.height)
                    this.height = this.style.height;
                if (this.style && this.style.width)
                    this.width = this.style.width;
                if (this.style && this.style.x)
                    this.x = this.style.x;
                if (this.style && this.style.y)
                    this.y = this.style.y;
                this.icon.width = this.contentBox.height;
                this.scaleX = this.scaleY = 1;
                if (this.nativeHandler)
                    this.nativeHandler.runWith(["show", true]);
                this.index = res.index;
                this.ad = adList;
                if (this.ad.icon != "") {
                    this.icon.skin = this.ad.icon;
                    this.title.text = this.ad.title;
                    if (this.ad.desc.length > 9) {
                        this.desc.text = this.ad.desc.slice(0, 9);
                    }
                    else {
                        this.desc.text = this.ad.desc;
                    }
                    this.banner.visible = false;
                    this.icon.visible = this.title.visible = this.desc.visible = true;
                }
                else if (this.ad.iconUrlList.length > 0) {
                    this.icon.skin = this.ad.iconUrlList[0];
                    this.title.text = this.ad.title;
                    if (this.ad.desc.length > 9) {
                        this.desc.text = this.ad.desc.slice(0, 9);
                    }
                    else {
                        this.desc.text = this.ad.desc;
                    }
                    this.banner.visible = false;
                    this.icon.visible = this.title.visible = this.desc.visible = true;
                }
                else if (this.ad.imgUrlList.length > 0) {
                    this.banner.visible = true;
                    this.banner.skin = this.ad.imgUrlList[0];
                    this.icon.visible = this.title.visible = this.desc.visible = false;
                }
                this.logoImage.skin = this.ad.logoUrl;
                if (this.style && this.style.isIcon) {
                    this.title.visible = false;
                    this.desc.visible = false;
                    this.icon.width = this.contentBox.width;
                }
                this.title.left = this.desc.left = this.icon.x + this.icon.width + 5;
            });
        }
        hideNative() {
            if (this.index >= 0 && this.ad) {
                AllPlatformAdMgr.Instance.hideNativeAd(this.index, this.ad);
                this.scaleX = this.scaleY = 0;
                if (this.nativeHandler)
                    this.nativeHandler.runWith(["hide", false]);
                this.index = -1;
                this.ad = null;
            }
        }
        setContentBoxStyle(style) {
            this.contentBox.left = style.left;
            this.contentBox.right = style.right;
            this.contentBox.top = style.top;
            this.contentBox.bottom = style.bottom;
        }
        onDestroy() {
            this.hideNative();
        }
        runClick() {
            AllPlatformAdMgr.Instance.reportNativeAdClick(this.index, this.ad);
            AllPlatformAdMgr.Instance.hideNativeAd(this.index, this.ad);
            this.scaleX = this.scaleY = 0;
            let curIndex = this.index;
            Laya.timer.once(2500, this, () => {
                this.showNative({ index: curIndex });
            });
            if (this.nativeHandler)
                this.nativeHandler.runWith(["hide", false]);
        }
    }

    class FreeTryDialogRuntime extends ui.pages.freeTryUI {
        constructor() {
            super(...arguments);
            this.gunId = 0;
            this.isSend = false;
        }
        onAwake() {
            this.showCheckBtn(false);
            this.nativeAd.bg.skin = "ad/Ui_TryAd.png";
            this.nativeAd.setContentBoxStyle({ left: 10, right: 10, top: 10, bottom: 10 });
            this.registerNativeEvent();
            this.nativeAd.showNative({
                index: 1
            });
            this.noThanks.visible = false;
        }
        onOpened() {
            this.checkAd.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.freeTry.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.noThanks.on(Laya.Event.CLICK, this, this.onBtnClick);
            if (AllPlatformAdMgr.Instance.delayTime > 0) {
                Laya.timer.once(AllPlatformAdMgr.Instance.delayTime * 1000, this, () => {
                    this.noThanks.visible = true;
                });
            }
            else {
                this.noThanks.visible = true;
            }
            AllPlatformAdMgr.Instance.showBannerAd();
        }
        onClosed() {
            AllPlatformAdMgr.Instance.hideBannerAd();
        }
        onBtnClick(e) {
            if (e.target == this.noThanks) {
                this.close();
                EventManager.event(EventType$1.FreeTry, [false, this.gunId]);
            }
            else if (e.target == this.freeTry) {
                EventManager.on(EventType$1.ShareSuccess, this, this.videoSuccessCallback);
                AllPlatformAdMgr.Instance.showVideoAd(this.videoSuccessCallback.bind(this));
            }
            else if (e.target == this.checkAd) {
                this.nativeAd.runClick();
            }
        }
        videoSuccessCallback() {
            if (this.isSend)
                return;
            this.isSend = true;
            EventManager.event(EventType$1.FreeTry, [true, this.gunId]);
            this.close();
        }
        registerNativeEvent() {
            this.nativeAd.nativeHandler = Laya.Handler.create(this, (p1, p2) => {
                if (p1 && p1 == "show") {
                    if (p2) {
                        this.showCheckBtn(true);
                    }
                    else {
                        this.showCheckBtn(false);
                    }
                }
                else if (p1 && p1 == "hide") {
                    this.showCheckBtn(false);
                }
            }, null, false);
        }
        showCheckBtn(bool) {
            this.checkAd.visible = bool;
            if (bool) {
                this.freeTry.x = 20;
            }
            else {
                this.freeTry.x = 168;
            }
        }
        setGunId(id) {
            this.gunId = id;
            this.gunImage.skin = `shop/Ui_${id + 1}.png`;
        }
    }

    class MoneyAddDialogRuntime extends ui.pages.moneyAddUI {
        onAwake() {
        }
        onOpened() {
            this.videoGet.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.noThanks.on(Laya.Event.CLICK, this, this.onBtnClick);
            AllPlatformAdMgr.Instance.showBannerAd();
        }
        onClosed() {
            AllPlatformAdMgr.Instance.hideBannerAd();
        }
        onBtnClick(e) {
            if (e.target == this.noThanks) {
                this.close();
            }
            else if (e.target == this.videoGet) {
                EventManager.once(EventType$1.ShareSuccess, this, this.videoSuccessCallback);
                AllPlatformAdMgr.Instance.showVideoAd(this.videoSuccessCallback.bind(this));
            }
        }
        videoSuccessCallback() {
            UserData.instance.gold += 100;
            UserData.instance.onDataChange("gold");
            mpsdk.Report.reportGold(100, UserData.instance.gold, '看视频增加');
            this.close();
        }
    }

    class StageManager {
        constructor() {
            UIConfig.closeDialogOnSide = false;
            Laya.Scene.root;
            Laya.Dialog.manager.name = 'DialogRoot';
            StageManager._GameSceneRoot = new Laya.Sprite;
            StageManager._GameSceneRoot.name = 'GameSceneRoot';
            StageManager._GameUIRoot = new Laya.Sprite;
            StageManager._GameUIRoot.name = 'GameUIRoot';
            StageManager._UpRoot = new Laya.Sprite;
            StageManager._UpRoot.name = 'UpRoot';
            StageManager._UpDialogRoot = new Laya.Sprite;
            StageManager._UpDialogRoot.name = 'UpDialogRoot';
            StageManager._UI3D = new Laya.Sprite;
            let layers = [StageManager._GameSceneRoot, StageManager._GameUIRoot, Laya.Scene.root, StageManager._UpRoot, Laya.Dialog.manager, StageManager._UpDialogRoot];
            for (let i = 0; i < layers.length; i++) {
                let layer = layers[i];
                layer.zOrder = i + 1;
                if (layer != Laya.Scene.root && layer != Laya.Dialog.manager) {
                    Laya.stage.addChild(layer);
                }
            }
            Laya.stage.updateZOrder();
        }
        static init() {
            if (!StageManager._StageManager) {
                StageManager._StageManager = new StageManager();
            }
        }
        static get UI3D() {
            return StageManager._UI3D;
        }
        static get GameSceneRoot() {
            return StageManager._GameSceneRoot;
        }
        static get GameUIRoot() {
            return StageManager._GameUIRoot;
        }
        static get UpRoot() {
            return StageManager._UpRoot;
        }
        static get UpDialogRoot() {
            return StageManager._UpDialogRoot;
        }
    }

    class LayaTool {
        static findNodeByUrl(parent, url) {
            let names = url.split('/');
            let node = parent;
            for (let i = 0; i < names.length; i++) {
                node = node.getChildByName(names[i]);
            }
            return node;
        }
        static findNodeByName(parent, name) {
            for (let i = 0; i < parent.numChildren; i++) {
                let child = parent.getChildAt(i);
                if (child.name == name) {
                    return child;
                }
                else {
                    return this.findNodeByName(child, name);
                }
            }
        }
        static findNodeByType(parent, type) {
            for (let i = 0; i < parent.numChildren; i++) {
                let child = parent.getChildAt(i);
                if (child instanceof type) {
                    return child;
                }
                else {
                    return this.findNodeByType(child, type);
                }
            }
        }
        static findNodesByType(parent, type) {
            let nodes = [];
            for (let i = 0; i < parent.numChildren; i++) {
                let child = parent.getChildAt(i);
                if (child instanceof type) {
                    nodes.push(child);
                }
                if (child.numChildren > 0) {
                    nodes = nodes.concat(this.findNodeByType(child, type));
                }
            }
            return nodes;
        }
        static getComponent(node, componentType) {
            return node.getComponent(componentType);
        }
        static getComponents(node, componentType) {
            return node.getComponents(componentType);
        }
        static getComponentInChildren(node, componentType) {
            for (let i = 0; i < node.numChildren; i++) {
                let child = node.getChildAt(i);
                let component = this.getComponent(child, componentType);
                if (component) {
                    return component;
                }
                else {
                    return this.getComponentInChildren(child, componentType);
                }
            }
        }
        static getComponentsInChildren(node, componentType) {
            for (let i = 0; i < node.numChildren; i++) {
                let child = node.getChildAt(i);
                let components = this.getComponents(child, componentType);
                if (components) {
                    return components;
                }
                else {
                    return this.getComponentsInChildren(child, componentType);
                }
            }
        }
        static tweenTo(target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
            let tweenObj = {};
            for (const key in props) {
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    tweenObj[key + 'Start'] = target.transform[key].clone();
                    let diff = new Laya.Vector3();
                    Laya.Vector3.subtract(props[key], target.transform[key], diff);
                    tweenObj[key + 'Diff'] = diff;
                }
            }
            let tweenTarget = { value: 0 };
            return Laya.Tween.to(tweenTarget, {
                value: 1, update: Laya.Handler.create(this, () => {
                    for (const key in props) {
                        if (Object.prototype.hasOwnProperty.call(props, key)) {
                            let now = new Laya.Vector3();
                            let scaleDiff = new Laya.Vector3();
                            Laya.Vector3.scale(tweenObj[key + 'Diff'], tweenTarget.value, scaleDiff);
                            Laya.Vector3.add(tweenObj[key + 'Start'], scaleDiff, now);
                            if (target && target.transform) {
                                target.transform[key] = now;
                            }
                        }
                    }
                }, null, false)
            }, duration, ease, complete, delay, coverBefore, autoRecover);
        }
        static convert3DTo2DPosition(camera, position) {
            let out = new Laya.Vector4;
            camera.viewport.project(position, camera.projectionViewMatrix, out);
            return new Laya.Vector2(out.x / Laya.stage.clientScaleX, out.y / Laya.stage.clientScaleY);
        }
    }

    class Scene3DBase extends Laya.Script3D {
        onAwake() {
            this.scene3d = this.owner;
            this.camera = LayaTool.findNodeByUrl(this.scene3d, "MainCamera/MainCamera");
            this.clearNode = new Laya.Sprite3D;
            this.clearNode.name = "clearNode";
            this.scene3d.addChild(this.clearNode);
        }
        onDestroy() {
            this.clearNode.destroy();
            this.scene3d.removeSelf();
        }
        convert3DTo2DPosition(position) {
            let out = new Laya.Vector4;
            this.camera.viewport.project(position, this.camera.projectionViewMatrix, out);
            return new Laya.Vector2(out.x / Laya.stage.clientScaleX, out.y / Laya.stage.clientScaleY);
        }
    }

    class CameraScriptF extends Laya.Script3D {
        constructor() {
            super();
            this.camera = undefined;
        }
        onSetAttr() {
        }
        onAwake() {
            this.camera = this.owner;
            this.Start();
        }
        onEnable() {
        }
        onDisable() {
        }
        Start() {
            var ManualWidth = 720;
            var ManualHeight = 1600;
            var manualHeight;
            if (Laya.stage.height / Laya.stage.width < ManualHeight / ManualWidth) {
                manualHeight = Math.round(ManualWidth / Laya.stage.width * Laya.stage.height);
            }
            else {
                manualHeight = ManualHeight;
            }
            var scale = manualHeight / ManualHeight;
            this.camera.fieldOfView *= scale;
            window["cameraScale"] = scale;
        }
        onUpdate() {
        }
    }

    class DropBall extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.v0 = 0;
            this.endY = 0;
            this.gameObject = null;
            this.g = 9.8;
            this.v = 0;
            this.theta = 0;
            this.v0x = 0;
            this.v0y = 0;
            this.originalX = 0;
            this.originalY = 0;
        }
        onAwake() {
            this.gameObject = this.owner;
            this.endY = 0;
        }
        onUpdate() {
            if (this.gameObject.transform.position.y > this.endY) {
                let t = Laya.timer.delta / 1000;
                this.v0 += this.g * t;
                let position = this.gameObject.transform.position.clone();
                position.y -= this.v0 * t + 1 / 2 * this.g * t * t;
                if (position.y < this.endY) {
                    position.y = this.endY;
                    ResManager.playSound("ball.mp3");
                }
                this.gameObject.transform.position = position;
            }
        }
        onUpdateTheta() {
            this.v0x = this.v * Math.cos(this.theta);
            this.v0y = this.v * Math.sin(this.theta);
        }
        getPointByTime(t) {
            let moveDisX = this.v0x * t;
            let moveDisY = this.v0y * t + 1 / 2 * this.g * t * t;
            let point = new Laya.Vector2;
            point.x = this.originalX + moveDisX;
            point.y = this.originalY + moveDisY;
            return point;
        }
    }

    class ActorBaseState {
    }
    ActorBaseState.none = 'None';
    ActorBaseState.stand = 'Stand';
    ActorBaseState.death = 'Death';
    ActorBaseState.damage = 'Damage';
    ActorBaseState.run = 'Run';
    ActorBaseState.attack = 'Attack';

    class AnimatorStateScript extends Laya.AnimatorStateScript {
        constructor() {
            super();
        }
        onStateEnter() {
            if (this.stateEnterHandler)
                this.stateEnterHandler.runWith(this.name);
        }
        onStateUpdate() {
            if (this.stateUpdateHandler)
                this.stateUpdateHandler.runWith(this.name);
        }
        onStateExit() {
            if (this.stateExitHandler)
                this.stateExitHandler.runWith(this.name);
        }
    }

    class AnimatorTriggerScript extends Laya.Script3D {
        Ani_Event(param1, param2, param3) {
            if (this.stateTriggerHandler)
                this.stateTriggerHandler.runWith([param1, param2, param3]);
        }
    }

    class ActorBase extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.animator = null;
            this.physicsCollider = null;
            this.rigidbody3D = null;
            this._curState = ActorBaseState.none;
            this._animationId = null;
            this.sign = null;
            this.actorData = null;
            this.gameObject = null;
        }
        onAwake() {
            this.sign = ActorBase.name;
            this.animator = this.owner.getComponent(Laya.Animator);
            this.gameObject = this.owner;
            if (!this.animator) {
                this.animator = LayaTool.getComponentInChildren(this.owner, Laya.Animator);
            }
            if (this.animator) {
                let triggerScript = this.animator.owner.addComponent(AnimatorTriggerScript);
                triggerScript.stateTriggerHandler = Laya.Handler.create(this, this.onStateTrigger, null, false);
                this._states = this.animator.getControllerLayer(0)["_states"];
                for (let i = 0; i < this._states.length; i++) {
                    let state = this._states[i];
                    let script = state.addScript(AnimatorStateScript);
                    script.name = state.name;
                    script.stateEnterHandler = Laya.Handler.create(this, this.onStateEnter, null, false);
                    script.stateUpdateHandler = Laya.Handler.create(this, this.onStateUpdate, null, false);
                    script.stateExitHandler = Laya.Handler.create(this, this.onStateExit, null, false);
                }
            }
            this.physicsCollider = this.owner.getComponent(Laya.PhysicsCollider);
            this.rigidbody3D = this.owner.getComponent(Laya.Rigidbody3D);
        }
        onEnable() {
            this.onRegisterCustomEvent();
        }
        onDisable() {
            this.onCancelCustomEvent();
        }
        onCollisionEnter(collision) { }
        onCollisionStay(collision) { }
        onCollisionExit(collision) { }
        onTriggerEnter(other) { }
        onTriggerStay(other) { }
        onTriggerExit(other) { }
        onStateEnter(name) { }
        onStateUpdate(name) { }
        onStateExit(name) { }
        onStateTrigger(param1, param2, param3) { }
        onRegisterCustomEvent() { }
        onCancelCustomEvent() { }
        changeActorState(newState, id) {
            if (newState == this._curState && this._animationId == id)
                return;
            this.onAnimationChange(newState + id);
            this._curState = newState;
            this._animationId = id;
        }
        onAnimationChange(name) {
            if (this.animator)
                this.animator.play(name, 0, 0);
        }
        onRecovery() {
            this.owner.removeSelf();
            Laya.Pool.recover(this.sign, this);
        }
        onInit(data) {
            this.actorData = data;
        }
        onDamage(value) {
            if (this.actorData.hp == 0)
                return;
            this.actorData.hp -= value;
            if (this.actorData.hp <= 0) {
                this.actorData.hp = 0;
                this.changeActorState(ActorBaseState.death, '');
            }
        }
        get curState() {
            return this._curState;
        }
        get animationId() {
            return this._animationId;
        }
    }

    class Runner extends ActorBase {
        constructor() {
            super(...arguments);
            this.moveSpeed = 0.08;
            this.translation = new Laya.Vector3;
            this.startPoint = null;
            this.targetPoint = null;
            this.lastTargetPoint = null;
            this.targetPosition = new Laya.Vector3;
            this.targetIndex = -1;
            this.lastIndex = 0;
            this.isDeath = false;
            this.curRotate = 0;
            this.targetRotate = 0;
            this.rotateNow = 0;
            this.rotateAim = 0;
            this.rotateSpeed = 5;
            this.valueSign = 1;
            this.isTurn = false;
            this.isJump = false;
            this.isEnd = false;
            this.v0 = 0;
            this.g = 20;
            this.endY = 0;
            this.cheaseTarget = null;
            this.isRunToJumpPoint = false;
            this.isJumpPlane = false;
        }
        onAwake() {
            super.onAwake();
            this.endY = -20;
        }
        onUpdate() {
            if (!GameDataManager.Instance.isStart)
                return;
            if (this.isDeath)
                return;
            if (this.isJumpPlane)
                return;
            if (this.isRunToJumpPoint) {
                if (this.gameObject.transform.position.z < GameDataManager.Instance.jumpPoint.transform.position.z) {
                    this.isRunToJumpPoint = false;
                    if (this.gameObject.name.indexOf("Player") != -1) {
                        this.isJumpPlane = true;
                        this.changeActorState("Jump", "");
                    }
                    else {
                        this.isJump = true;
                        this.gameObject.getChildByName("Shadow").active = false;
                    }
                }
                let rag = (this.rotateNow - 90) * Math.PI / 180;
                this.translation.x = this.moveSpeed * Laya.timer.delta / (1000 / 60) * Math.cos(rag);
                this.translation.z = -this.moveSpeed * Laya.timer.delta / (1000 / 60) * Math.sin(rag);
                this.gameObject.transform.translate(this.translation, false);
            }
            if (this.isJump) {
                if (this.gameObject.transform.position.y > this.endY) {
                    let t = Laya.timer.delta / 1000;
                    this.v0 += this.g * t;
                    let position = this.gameObject.transform.position.clone();
                    position.y -= this.v0 * t + 1 / 2 * this.g * t * t;
                    if (position.y < this.endY)
                        position.y = this.endY;
                    this.gameObject.transform.position = position;
                }
                else {
                    this.isDeath = true;
                    this.sendDeathEvent();
                }
                let rag = (this.rotateNow - 90) * Math.PI / 180;
                this.translation.x = this.moveSpeed * Laya.timer.delta / (1000 / 60) * Math.cos(rag);
                this.translation.z = -this.moveSpeed * Laya.timer.delta / (1000 / 60) * Math.sin(rag);
                this.gameObject.transform.translate(this.translation, false);
            }
            else {
                if (this.targetPoint && this.lastTargetPoint != this.targetPoint) {
                    var rotate = (this.rotateNow + 360) % 360;
                    let rotating = false;
                    this.rotateSpeed = 5 * 60 / GameDataManager.Instance.fps;
                    if (Math.abs(rotate - this.rotateAim) > Laya.MathUtils3D.zeroTolerance) {
                        rotating = true;
                        this.isTurn = true;
                        if (Math.abs(rotate - this.rotateAim) < this.rotateSpeed) {
                            this.gameObject.transform.rotate(new Laya.Vector3(0, this.rotateAim - rotate, 0), false, false);
                            this.rotateNow = this.rotateAim;
                        }
                        else if (Math.abs(rotate - this.rotateAim) > 360 - this.rotateSpeed) {
                            if (this.rotateAim > 180) {
                                this.gameObject.transform.rotate(new Laya.Vector3(0, this.rotateAim - rotate - 360, 0), false, false);
                                this.rotateNow = this.rotateAim;
                            }
                            else {
                                this.gameObject.transform.rotate(new Laya.Vector3(0, this.rotateAim - rotate + 360, 0), false, false);
                                this.rotateNow = this.rotateAim;
                            }
                        }
                        else if (Math.abs(rotate - this.rotateAim) > 180) {
                            if (this.rotateAim > 180) {
                                this.gameObject.transform.rotate(new Laya.Vector3(0, -this.rotateSpeed, 0), false, false);
                                this.rotateNow = (this.rotateNow - this.rotateSpeed) % 360;
                            }
                            else {
                                this.gameObject.transform.rotate(new Laya.Vector3(0, this.rotateSpeed, 0), false, false);
                                this.rotateNow = (this.rotateNow + this.rotateSpeed) % 360;
                            }
                        }
                        else {
                            if (this.rotateAim > this.rotateNow) {
                                this.gameObject.transform.rotate(new Laya.Vector3(0, this.rotateSpeed, 0), false, false);
                                this.rotateNow = (this.rotateNow + this.rotateSpeed) % 360;
                            }
                            else {
                                this.gameObject.transform.rotate(new Laya.Vector3(0, -this.rotateSpeed, 0), false, false);
                                this.rotateNow = (this.rotateNow - this.rotateSpeed) % 360;
                            }
                        }
                    }
                    let distance = Laya.Vector3.distance(this.gameObject.transform.position, this.targetPosition);
                    if (this.targetIndex == GameDataManager.Instance.pointRoadList.length - 1) {
                        if (distance < 5) {
                            this.setTargetIndex(++this.targetIndex);
                        }
                    }
                    else {
                        if (distance < 1) {
                            this.setTargetIndex(++this.targetIndex);
                        }
                    }
                    if (!rotating) {
                        if (this.isTurn) {
                            this.isTurn = false;
                            let randomStart = this.gameObject.transform.position.clone();
                            let randomTarget = this.targetPosition;
                            let rotateAim = this.getAimRotate(randomStart, randomTarget);
                            this.gameObject.transform.rotate(new Laya.Vector3(0, rotateAim - this.rotateNow, 0), false, false);
                            this.rotateAim = (rotateAim + 360) % 360;
                            this.rotateNow = (rotateAim + 360) % 360;
                        }
                    }
                    if (this.cheaseTarget) {
                        let distance = Laya.Vector3.distance(this.cheaseTarget.gameObject.transform.position, this.gameObject.transform.position);
                        if (distance > 1 || this.cheaseTarget.isJump || this.cheaseTarget.isDeath) {
                            this.cheaseTarget = null;
                        }
                    }
                    let rag = (this.rotateNow - 90) * Math.PI / 180;
                    this.translation.x = this.moveSpeed * Laya.timer.delta / (1000 / 60) * Math.cos(rag);
                    this.translation.z = -this.moveSpeed * Laya.timer.delta / (1000 / 60) * Math.sin(rag);
                    this.gameObject.transform.translate(this.translation, false);
                }
                else {
                }
            }
        }
        getAimRotate(pos1, pos2) {
            var posNeedx = pos2.x - pos1.x;
            var posNeedz = pos2.z - pos1.z;
            let rotateAim = Math.atan2(posNeedx, posNeedz) * 180 / Math.PI;
            return rotateAim;
        }
        setTargetIndex(index) {
            this.targetIndex = index;
            if (this.targetIndex < GameDataManager.Instance.pointRoadList.length) {
                let firstSet = false;
                if (this.targetPoint) {
                    this.startPoint = this.targetPoint;
                    this.lastTargetPoint = this.targetPoint;
                    this.moveSpeed = 0.08 + 0.02 * Math.random();
                }
                else {
                    firstSet = true;
                }
                this.targetPoint = GameDataManager.Instance.pointRoadList[this.targetIndex];
                let randomStart = this.gameObject.transform.position.clone();
                let randomTarget = this.getRandomPosRound(this.targetPoint.transform.position, 2.7);
                let rotateAim = this.getAimRotate(randomStart, randomTarget);
                this.targetPosition = randomTarget;
                if (firstSet) {
                    this.gameObject.transform.rotate(new Laya.Vector3(0, rotateAim, 0), false, false);
                    this.rotateAim = (rotateAim + 360) % 360;
                    this.rotateNow = (rotateAim + 360) % 360;
                }
                else {
                    this.rotateAim = (rotateAim + 360) % 360;
                    this.valueSign = Math.sign(this.targetRotate - this.curRotate);
                }
            }
            else {
                this.isEnd = true;
                this.targetPoint = null;
            }
        }
        getRandomPosRound(pos, radius) {
            let position = new Laya.Vector3;
            position.x = pos.x - radius + 2 * radius * Math.random();
            position.z = pos.z - radius + 2 * radius * Math.random();
            return position;
        }
        getLookQuaternion(self, target, up, isLocal = false) {
            let eye;
            if (isLocal) {
                eye = self.localPosition;
                if (Math.abs(eye.x - target.x) < Laya.MathUtils3D.zeroTolerance && Math.abs(eye.y - target.y) < Laya.MathUtils3D.zeroTolerance && Math.abs(eye.z - target.z) < Laya.MathUtils3D.zeroTolerance)
                    return self.localRotation;
                let localRotation = new Laya.Quaternion;
                Laya.Quaternion.lookAt(self.localPosition, target, up, localRotation);
                localRotation.invert(localRotation);
                return localRotation.clone();
            }
            else {
                var worldPosition = self.position;
                eye = worldPosition;
                if (Math.abs(eye.x - target.x) < Laya.MathUtils3D.zeroTolerance && Math.abs(eye.y - target.y) < Laya.MathUtils3D.zeroTolerance && Math.abs(eye.z - target.z) < Laya.MathUtils3D.zeroTolerance)
                    return self.rotation.clone();
                let rotation = new Laya.Quaternion;
                Laya.Quaternion.lookAt(worldPosition, target, up, rotation);
                rotation.invert(rotation);
                return rotation;
            }
        }
        getVector3Angle(from, to) {
            let value = Laya.Vector3.dot(from, to) / (Laya.Vector3.scalarLength(from) * Laya.Vector3.scalarLength(to));
            let angle = Math.acos(value) * 180 / Math.PI;
            let nVec = new Laya.Vector3;
            Laya.Vector3.cross(from, to, nVec);
            let up = new Laya.Vector3(0, 1, 0);
            if (Laya.Vector3.dot(nVec, up) < 0) {
                return -angle;
            }
            else {
                return angle;
            }
        }
        getNormalizeAngle(angle) {
            let normalizeEulerY = angle % 360;
            if (normalizeEulerY >= 180 && normalizeEulerY < 360) {
                normalizeEulerY = normalizeEulerY - 360;
            }
            else if (normalizeEulerY > -360 && normalizeEulerY <= -180) {
                normalizeEulerY = normalizeEulerY + 360;
            }
            return normalizeEulerY;
        }
        getVector2Angle(from, to) {
            let angle = Math.acos(this.vec2Cross(from, to) / (this.vec2ScalerLength(from) * this.vec2ScalerLength(to)));
            if (this.vec2Cross(from, to) < 0) {
                return -angle;
            }
            else {
                return angle;
            }
        }
        vec2Dot(left, right) {
            return left.x * right.x + left.y * right.y;
        }
        vec2Cross(left, right) {
            return left.x * right.y - left.y * right.x;
        }
        vec2ScalerLength(vec2) {
            return Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
        }
        setCheaseTarget(target) {
            this.cheaseTarget = target;
            if (this.targetIndex <= this.cheaseTarget.targetIndex) {
                if (this.targetIndex == this.cheaseTarget.targetIndex) {
                    let rotateAim = this.getAimRotate(this.gameObject.transform.position, this.cheaseTarget.targetPosition);
                    this.rotateAim = (rotateAim + 360) % 360;
                }
                else {
                    this.setTargetIndex(this.cheaseTarget.targetIndex);
                }
            }
        }
        setJumpPlane() {
            this.isRunToJumpPoint = true;
            let randomStart = this.gameObject.transform.position.clone();
            let randomTarget = GameDataManager.Instance.jumpPoint.transform.position;
            let rotateAim = this.getAimRotate(randomStart, randomTarget);
            this.targetPosition = randomTarget;
            this.gameObject.transform.rotate(new Laya.Vector3(0, rotateAim - this.rotateNow, 0), false, false);
            this.rotateAim = (rotateAim + 360) % 360;
            this.rotateNow = (rotateAim + 360) % 360;
        }
        setJumpDie() {
            this.isRunToJumpPoint = true;
            let randomStart = this.gameObject.transform.position.clone();
            let randomTarget = GameDataManager.Instance.jumpPoint.transform.position;
            let rotateAim = this.getAimRotate(randomStart, randomTarget);
            this.targetPosition = randomTarget;
            this.gameObject.transform.rotate(new Laya.Vector3(0, rotateAim - this.rotateNow, 0), false, false);
            this.rotateAim = (rotateAim + 360) % 360;
            this.rotateNow = (rotateAim + 360) % 360;
        }
        sendDeathEvent() { }
        ;
    }

    class People extends Runner {
        onAwake() {
            super.onAwake();
            let index = MathTool.getRandom(1, 2);
            this.changeActorState("Run", "" + index);
        }
        onUpdate() {
            super.onUpdate();
        }
        sendDeathEvent() {
            EventManager.event(EventType$1.PlayerDeath, this);
        }
    }

    class Zombie extends Runner {
        onAwake() {
            super.onAwake();
            let index = MathTool.getRandom(1, 3);
            this.changeActorState("Run", "" + index);
            let floatValue = 0.02;
            this.moveSpeed = this.moveSpeed + floatValue * Math.random();
        }
        onStateExit(name) {
            if (name == "Death") {
                Laya.timer.once(1000, this, () => {
                    if (this.gameObject && !this.gameObject.destroyed) {
                        this.gameObject.removeSelf();
                        Laya.Pool.recover(this.gameObject.name + ".lh", this.gameObject);
                    }
                });
            }
        }
        onUpdate() {
            super.onUpdate();
        }
        sendDeathEvent() {
            EventManager.event(EventType$1.ZombieDeath, this);
        }
    }

    class GameSceneLogic extends Scene3DBase {
        constructor() {
            super(...arguments);
            this.curShotCd = 0;
            this.fullShotCd = 100;
            this.isShooting = false;
            this.zombieList = [];
            this.peopleList = [];
            this.touchPoint = new Laya.Vector2;
            this.ray = new Laya.Ray(new Laya.Vector3, new Laya.Vector3);
            this.hitResult = new Laya.HitResult();
            this.gunNode = null;
            this.gunPoint = null;
            this.gunAnimator = null;
            this.frontSight = null;
            this.diffX = 0;
            this.diffY = 0;
            this.destX = Laya.stage.width / 2;
            this.destY = Laya.stage.height / 2;
            this.angleRatioX = 0;
            this.angleRatioY = 0;
            this.cameraDiff = new Laya.Vector3;
            this.cameraParent = null;
            this.zombieHouseIndex = 0;
            this.enemyBornTimeCount = 0;
            this.enemyBornDelayList = [];
            this.enemyBornNumList = [];
            this.enemyBornTargetIndexList = [];
            this.oilList = [];
            this.ballList = [];
            this.linkList = [];
            this.bridgeList = [];
            this.end = null;
            this.dropBall = [];
            this.fingerSpine = null;
            this.damageBridgeList = [];
            this.cameraOriginalPos = null;
            this.playerBornHouse = null;
            this.enemyBornHouse = [];
            this.isCameraRound = true;
            this.planeNode = null;
            this.isPlayCameraEnd = false;
            this.gunEffect = null;
            this.curFrame = 0;
            this.timeCount = 0;
        }
        onAwake() {
            super.onAwake();
            Laya.timer.scale = 1;
            this.initScenePoint();
            this.initSceneProp();
            if (!UserData.instance.isFull) {
                this.uploadLevel();
            }
            this.planeNode = this.scene3d.getChildByName("Plane");
            this.planeNode.active = false;
            Laya.MouseManager.enabled = false;
            ResManager.loadSpines(["Ui_gun.sk"]).then((spines) => {
                Laya.MouseManager.enabled = true;
                this.frontSight = spines[0];
                this.frontSight.x = Laya.stage.width / 2;
                this.frontSight.y = Laya.stage.height / 2;
                this.frontSight.visible = false;
                StageManager.GameUIRoot.addChild(this.frontSight);
            });
            this.cameraParent = this.scene3d.getChildByName("MainCamera");
            this.cameraParent.transform.position = this.playerBornHouse.transform.position.clone();
            if (!this.camera.getComponent(CameraScriptF)) {
                this.camera.addComponent(CameraScriptF);
            }
            this.gunEffect = LayaTool.findNodeByUrl(this.cameraParent, "Gun/GunPoint/Fx_Muzzleflare");
            this.gunEffect.active = false;
            this.camera.transform.localPosition = new Laya.Vector3(1.7, 28, -23);
            this.camera.transform.localRotation = new Laya.Quaternion(0, 0.9063079, 0.4226183, 0);
            this.cameraOriginalPos = this.cameraParent.transform.position.clone();
            this.gunNode = this.cameraParent.getChildByName("Gun");
            this.gunPoint = this.gunNode.getChildByName("GunPoint");
            this.gunAnimator = this.gunNode.getComponent(Laya.Animator);
            this.gunAnimator.play("GunStand", 0, 0);
            this.addGun();
            this.showGun(false);
            this.angleRatioX = 24 / Laya.stage.width;
            this.angleRatioY = 50 / Laya.stage.height;
            window["GameSceneLogic"] = this;
            Laya.MouseManager.enabled = false;
            ResManager.loadSpines(["quan.sk"]).then((spines) => {
                Laya.MouseManager.enabled = true;
                this.fingerSpine = spines[0];
                this.fingerSpine.x = Laya.stage.width / 2;
                this.fingerSpine.y = Laya.stage.height - 300;
                this.fingerSpine.play(0, true, false, 0);
                StageManager.GameUIRoot.addChild(this.fingerSpine);
            });
            EventManager.on(EventType$1.PlayerDeath, this, this.onPlayerDeath);
            EventManager.on(EventType$1.ZombieDeath, this, this.onZombieDeath);
            EventManager.on(EventType$1.MouseEvent, this, this.onControllerEvent);
            EventManager.on(EventType$1.UpdateUseGun, this, this.addGun);
            EventManager.on(EventType$1.FreeTry, this, this.onFreeTry);
        }
        cameraRound() {
            if (this.isCameraRound) {
                this.cameraParent.transform.rotate(new Laya.Vector3(0, Laya.timer.delta / 1000 / 10, 0));
            }
        }
        onDestroy() {
            super.onDestroy();
            Laya.timer.clearAll(this);
            this.destroyPool("Fx_Explosion.lh");
            this.destroyPool("popKill");
            this.destroyPool("Fx_Gethit.lh");
            this.destroyPool("Fx_Impact.lh");
            this.destroyPool("Player1.lh");
            this.destroyPool("Player2.lh");
            this.destroyPool("Player3.lh");
            this.destroyPool("Player4.lh");
            this.destroyPool("Player5.lh");
            this.destroyPool("Enemy1.lh");
            this.destroyPool("Enemy2.lh");
            this.destroyPool("Enemy3.lh");
            this.destroyPool("Enemy4.lh");
            this.destroyPool("Enemy5.lh");
            this.returnSceneProp();
            if (this.fingerSpine)
                this.fingerSpine.destroy();
            if (this.frontSight)
                this.frontSight.destroy();
            EventManager.off(EventType$1.PlayerDeath, this, this.onPlayerDeath);
            EventManager.off(EventType$1.ZombieDeath, this, this.onZombieDeath);
            EventManager.off(EventType$1.MouseEvent, this, this.onControllerEvent);
            EventManager.off(EventType$1.UpdateUseGun, this, this.addGun);
            EventManager.off(EventType$1.FreeTry, this, this.onFreeTry);
        }
        destroyPool(sign) {
            let pool = Laya.Pool.getPoolBySign(sign);
            for (let i = 0; i < pool.length; i++) {
                pool[i].destroy();
            }
            Laya.Pool.clearBySign(sign);
        }
        onPlayerDeath(people) {
            this.peopleList.splice(this.peopleList.indexOf(people), 1);
            people.isDeath = true;
            people.changeActorState("Death", "");
        }
        onZombieDeath(zombie) {
            this.zombieList.splice(this.zombieList.indexOf(zombie), 1);
            this.setZombieDeath(zombie);
        }
        gameStart() {
            this.isShooting = true;
            this.showGun(true);
            Laya.timer.once(800, this, () => {
                GameDataManager.Instance.isStart = true;
                this.createPeople();
                let averagePosition = this.getAveragePosition();
                Laya.Vector3.subtract(this.cameraParent.transform.position, averagePosition, this.cameraDiff);
            });
        }
        onControllerEvent(type, stageX, stageY) {
            if (type == Laya.Event.MOUSE_DOWN) {
                if (!GameDataManager.Instance.canShot)
                    return;
                this.curShotCd = this.fullShotCd;
                if (this.frontSight) {
                    this.diffX = stageX - this.frontSight.x;
                    this.diffY = stageY - this.frontSight.y;
                }
                if (this.fingerSpine && this.fingerSpine.visible) {
                    this.fingerSpine.visible = false;
                    this.isCameraRound = false;
                    LayaTool.tweenTo(this.cameraParent, { rotationEuler: new Laya.Vector3(0, 0, 0) }, 500, Laya.Ease.sineOut);
                    let isfree = this.showFreeTry();
                    if (!isfree) {
                        this.gameStart();
                    }
                }
                else {
                    this.isShooting = true;
                }
            }
            else if (type == Laya.Event.MOUSE_MOVE) {
                this.destX = stageX - this.diffX;
                this.destY = stageY - this.diffY;
                if (this.destX < 0)
                    this.destX = 0;
                if (this.destX > Laya.stage.width)
                    this.destX = Laya.stage.width;
                if (this.destY < 0)
                    this.destY = 0;
                if (this.destY > Laya.stage.height)
                    this.destY = Laya.stage.height;
            }
            else if (type == Laya.Event.MOUSE_UP) {
                this.gunEffect.active = false;
                this.isShooting = false;
                this.gunAnimator.play("GunStand", 0, 0);
            }
        }
        onUpdate() {
            this.calculateFps();
            if (GameDataManager.Instance.isCount)
                return;
            this.updateGunPos();
            this.updateShot();
            if (!GameDataManager.Instance.isStart) {
                this.cameraRound();
                return;
            }
            this.createZombie();
            this.cameraFollow();
            this.updateBallKill();
            this.judgeKill();
            this.judgeFinish();
            this.judgeJump();
            this.updateCheaseTarget();
            this.judgePlayerNearEnd();
        }
        updateShot() {
            if (this.isShooting) {
                if (this.curShotCd > 0) {
                    this.curShotCd -= Laya.timer.delta;
                    if (this.curShotCd <= 0) {
                        this.curShotCd = this.fullShotCd;
                        this.shot();
                    }
                }
            }
        }
        updateBallKill() {
            for (let i = 0; i < this.dropBall.length; i++) {
                let drop = this.dropBall[i];
                this.ballDamage(drop.gameObject.transform.position.clone(), 4.5 * Math.sqrt(2));
            }
        }
        shot() {
            this.gunEffect.active = false;
            Laya.timer.frameOnce(1, this, () => {
                this.gunEffect.active = true;
            });
            let index = MathTool.getRandom(1, 2);
            let gunMp3 = `gun${index}.mp3`;
            ResManager.playSound(gunMp3);
            if (this.frontSight) {
                this.touchPoint.x = this.frontSight.x;
                this.touchPoint.y = this.frontSight.y;
            }
            let newPoint = new Laya.Vector2(this.touchPoint.x * Laya.stage.clientScaleX, this.touchPoint.y * Laya.stage.clientScaleY);
            this.camera.viewportPointToRay(newPoint, this.ray);
            this.gunAnimator.play("GunAttack", 0, 0);
            if (this.scene3d.physicsSimulation.rayCast(this.ray, this.hitResult)) {
                let owner = this.hitResult.collider.owner;
                if (owner) {
                    if (owner.name != "Floor") {
                        if (!owner.destroyed) {
                            if (owner.name.indexOf("Lianzi") != -1) {
                                owner.active = false;
                                let item = this.scene3d.getChildByName("Item");
                                let ball = item.getChildByName(owner.name.replace("Lianzi", "Ball"));
                                let drop = ball.addComponent(DropBall);
                                this.dropBall.push(drop);
                            }
                            else if (owner.name.indexOf("Oil") != -1) {
                                if (this.frontSight)
                                    this.frontSight.play(0, false, true, 0);
                                ResManager.playSound("oil.mp3");
                                owner.active = false;
                                let hit = this.createEffect("Fx_Explosion.lh", owner.transform.position.clone());
                                Laya.timer.once(2000, this, () => {
                                    hit.removeSelf();
                                    Laya.Pool.recover(hit.name + ".lh", hit);
                                });
                                Laya.timer.once(100, this, () => {
                                    this.ballDamage(owner.transform.position, 7);
                                });
                            }
                            else if (owner.name.indexOf("Muban") != -1 && this.damageBridgeList.indexOf(owner) == -1) {
                                if (this.frontSight)
                                    this.frontSight.play(0, false, true, 0);
                                ResManager.playSound("muban.mp3");
                                this.damageBridgeList.push(owner);
                                let animator = owner.getChildByName("Muban").getComponent(Laya.Animator);
                                animator.play("Death", 0, 0);
                            }
                            else if (owner.name.indexOf("Enemy") != -1) {
                                if (this.frontSight)
                                    this.frontSight.play(0, false, true, 0);
                                let zombie = owner.getComponent(Zombie);
                                let index = this.zombieList.indexOf(zombie);
                                if (index != -1) {
                                    this.zombieList.splice(index, 1);
                                    this.setZombieDeath(zombie);
                                    let hit = this.createEffect("Fx_Gethit.lh", this.hitResult.point);
                                    Laya.timer.once(2000, this, () => {
                                        hit.removeSelf();
                                        Laya.Pool.recover(hit.name + ".lh", hit);
                                    });
                                }
                            }
                            else if (owner.name.indexOf("FloorTrigger") != -1) {
                                let impact = this.createEffect("Fx_Impact.lh", this.hitResult.point);
                                Laya.timer.once(2000, this, () => {
                                    impact.removeSelf();
                                    Laya.Pool.recover(impact.name + ".lh", impact);
                                });
                            }
                        }
                    }
                    else {
                    }
                }
            }
            else {
            }
        }
        popKill(pos) {
            pos.y += 1;
            let vec2 = this.convert3DTo2DPosition(pos);
            let tl = Laya.Pool.getItem("popKill");
            if (!tl) {
                tl = new Laya.Animation();
            }
            tl.x = vec2.x;
            tl.y = vec2.y;
            tl.loadAnimation("pages/popKill.ani", Laya.Handler.create(this, () => {
                StageManager.GameUIRoot.addChild(tl);
                tl.play();
                tl.on(Laya.Event.COMPLETE, this, () => {
                    tl.removeSelf();
                    Laya.Pool.recover("popKill", tl);
                });
            }));
        }
        createRole(type) {
            let role = null;
            let modelName = `Player${MathTool.getRandom(1, 5)}.lh`;
            if (type == 1) {
                modelName = `Enemy${MathTool.getRandom(1, 5)}.lh`;
            }
            let model = Laya.Pool.getItem(modelName);
            if (!model) {
                model = ResManager.getResClone(modelName);
            }
            else {
                model.transform.position = new Laya.Vector3;
                model.transform.localRotationEuler = new Laya.Vector3;
            }
            if (type == 0) {
                let people = model.getComponent(People);
                if (people)
                    people.destroy();
                role = model.addComponent(People);
            }
            else {
                let zombie = model.getComponent(Zombie);
                if (zombie)
                    zombie.destroy();
                role = model.addComponent(Zombie);
            }
            this.clearNode.addChild(model);
            return role;
        }
        createPeople() {
            for (let i = 0; i < 5; i++) {
                let people = this.createRole(0);
                let position = this.getRandomPosRound(GameDataManager.Instance.playerBornPoint.transform.position, 2);
                people.gameObject.transform.position = position;
                people.startPoint = GameDataManager.Instance.playerBornPoint;
                people.setTargetIndex(0);
                this.peopleList.push(people);
            }
            let animator = this.scene3d.getChildByName("Door1").getComponent(Laya.Animator);
            animator.play("Open", 0, 0);
        }
        createZombie() {
            if (this.zombieHouseIndex < GameDataManager.Instance.enemyBornPointList.length) {
                this.enemyBornTimeCount += Laya.timer.delta;
                let targetTime = (this.enemyBornDelayList[this.zombieHouseIndex] + 500) * 1.33;
                if (this.enemyBornTimeCount >= targetTime) {
                    this.enemyBornTimeCount = 0;
                    let bornPoint = GameDataManager.Instance.enemyBornPointList[this.zombieHouseIndex];
                    let bornNum = this.enemyBornNumList[this.zombieHouseIndex] * 3;
                    bornNum = Math.floor(bornNum * GameDataManager.Instance.fps / 60);
                    let animator = this.scene3d.getChildByName("Door" + (this.zombieHouseIndex + 2)).getComponent(Laya.Animator);
                    animator.play("Open", 0, 0);
                    ResManager.playSound("shout.mp3");
                    let frameTime = Math.ceil(bornNum / 5);
                    let houseIndex = this.zombieHouseIndex;
                    let zombieBorn = () => {
                        let frameNum = 5;
                        if (frameTime == 1)
                            frameNum = bornNum;
                        for (let i = 0; i < frameNum; i++) {
                            let zombie = this.createRole(1);
                            let position = this.getRandomPosRound(bornPoint.transform.position, 2);
                            zombie.gameObject.transform.position = position;
                            zombie.startPoint = bornPoint;
                            zombie.setTargetIndex(this.enemyBornTargetIndexList[houseIndex]);
                            this.zombieList.push(zombie);
                        }
                        frameTime -= 1;
                        bornNum -= frameNum;
                        if (frameTime == 0)
                            Laya.timer.clear(this, zombieBorn);
                    };
                    Laya.timer.frameLoop(5, this, zombieBorn);
                    this.zombieHouseIndex++;
                }
            }
        }
        initScenePoint() {
            let point = this.scene3d.getChildByName("Point");
            GameDataManager.Instance.playerBornPoint = null;
            GameDataManager.Instance.enemyBornPointList = [];
            GameDataManager.Instance.pointRoadList = [];
            this.enemyBornTimeCount = 0;
            this.enemyBornDelayList = [];
            this.enemyBornNumList = [];
            this.enemyBornTargetIndexList = [];
            for (let i = 0; i < point.numChildren; i++) {
                let child = point.getChildAt(i);
                if (child.name.indexOf("PointRoad") != -1) {
                    GameDataManager.Instance.pointRoadList.push(child);
                }
                else if (child.name.indexOf("PointPlayerBron") != -1) {
                    GameDataManager.Instance.playerBornPoint = child;
                }
                else if (child.name.indexOf("PointEnemyBron") != -1) {
                    GameDataManager.Instance.enemyBornPointList.push(child);
                    let nameList = child.name.split("_");
                    let num = Number(nameList[1]);
                    let delay = Number(nameList[2]);
                    let targetIndex = Number(nameList[0][nameList[0].length - 1]);
                    this.enemyBornDelayList.push(delay);
                    this.enemyBornNumList.push(num);
                    this.enemyBornTargetIndexList.push(targetIndex);
                }
            }
            let lastRoadPoint = GameDataManager.Instance.pointRoadList[GameDataManager.Instance.pointRoadList.length - 1];
            GameDataManager.Instance.jumpPoint = lastRoadPoint.getChildByName("PointJump");
        }
        cameraFollow() {
            if (GameDataManager.Instance.isCount)
                return;
            if (this.isPlayCameraEnd)
                return;
            let averagePosition = this.getAveragePosition();
            let cameraPosition = new Laya.Vector3;
            let destPosition = new Laya.Vector3;
            Laya.Vector3.add(averagePosition, this.cameraDiff, destPosition);
            cameraPosition.x = this.cameraParent.transform.position.x + (destPosition.x - this.cameraParent.transform.position.x) * Laya.timer.delta / 1000 * 3;
            cameraPosition.z = this.cameraParent.transform.position.z + (destPosition.z - this.cameraParent.transform.position.z) * Laya.timer.delta / 1000 * 3;
            this.cameraParent.transform.position = cameraPosition;
        }
        getAveragePosition() {
            let position = new Laya.Vector3;
            let count = 0;
            for (let i = 0; i < this.peopleList.length; i++) {
                let people = this.peopleList[i];
                if (!people.isDeath) {
                    position.x += people.gameObject.transform.position.x;
                    position.z += people.gameObject.transform.position.z;
                    count++;
                }
            }
            position.x /= count;
            position.z /= count;
            return position;
        }
        getRandomPosRound(pos, radius) {
            let position = new Laya.Vector3;
            position.x = pos.x - radius + 2 * radius * Math.random();
            position.z = pos.z - radius + 2 * radius * Math.random();
            return position;
        }
        ballDamage(center, radius) {
            for (let i = 0; i < this.zombieList.length;) {
                let zombie = this.zombieList[i];
                let zombiePos = zombie.gameObject.transform.position.clone();
                let distance = Laya.Vector3.distance(center, zombiePos);
                if (distance < radius) {
                    this.zombieList.splice(i, 1);
                    this.setZombieDeath(zombie);
                }
                else {
                    i++;
                }
            }
        }
        setZombieDeath(zombie) {
            zombie.isDeath = true;
            this.popKill(zombie.gameObject.transform.position.clone());
            zombie.changeActorState("Death", "");
            if (GameDataManager.Instance.allowKill && !GameDataManager.Instance.isFalse) {
                GameDataManager.Instance.killNum++;
                EventManager.event(EventType$1.KillEnemy);
            }
        }
        initSceneProp() {
            let scene = this.scene3d.getChildByName("Scene");
            this.end = scene.getChildByName("End");
            for (let i = 0; i < scene.numChildren; i++) {
                let child = scene.getChildAt(i);
                if (child.name.indexOf("House1") != -1) {
                    this.playerBornHouse = child;
                }
                else if (child.name.indexOf("House2") != -1) {
                    this.enemyBornHouse.push(child);
                }
            }
            let item = this.scene3d.getChildByName("Item");
            if (item) {
                for (let i = 0; i < item.numChildren; i++) {
                    let child = item.getChildAt(i);
                    if (child.name.indexOf("Lianzi") != -1) {
                        this.linkList.push(child);
                    }
                    else if (child.name.indexOf("Ball") != -1) {
                        this.ballList.push(child);
                    }
                    else if (child.name.indexOf("Muban") != -1) {
                        this.bridgeList.push(child);
                    }
                    else if (child.name.indexOf("Oil") != -1) {
                        this.oilList.push(child);
                    }
                }
            }
        }
        returnSceneProp() {
            this.cameraParent.transform.position = this.cameraOriginalPos;
            for (let i = 0; i < this.linkList.length; i++) {
                let link = this.linkList[i];
                link.active = true;
            }
            for (let i = 0; i < this.ballList.length; i++) {
                let ball = this.ballList[i];
                let position = ball.transform.position;
                ball.transform.position = new Laya.Vector3(position.x, 5, position.z);
                let dropBall = ball.getComponent(DropBall);
                if (dropBall)
                    dropBall.destroy();
            }
            for (let i = 0; i < this.oilList.length; i++) {
                let oil = this.oilList[i];
                oil.active = true;
            }
            for (let i = 0; i < this.bridgeList.length; i++) {
                let bridge = this.bridgeList[i];
                let animator = bridge.getChildByName("Muban").getComponent(Laya.Animator);
                animator.play("Stand", 0, 0);
            }
            for (let i = 0; i < this.enemyBornHouse.length; i++) {
                let animator = this.scene3d.getChildByName("Door" + (i + 2)).getComponent(Laya.Animator);
                animator.play("Open", 0, 0);
            }
            let animator = this.scene3d.getChildByName("Door1").getComponent(Laya.Animator);
            animator.play("Open", 0, 0);
        }
        createExplodeEffect(center) {
            Laya.timer.once(100, this, () => {
                this.ballDamage(center, 3);
            });
        }
        judgeKill() {
            if (GameDataManager.Instance.isCount)
                return;
            for (let i = 0; i < this.peopleList.length;) {
                let people = this.peopleList[i];
                let isDeath = false;
                for (let j = 0; j < this.zombieList.length; j++) {
                    let zombie = this.zombieList[j];
                    let distance = Laya.Vector3.distance(people.gameObject.transform.position, zombie.gameObject.transform.position);
                    if (distance < 0.9 && !people.isRunToJumpPoint) {
                        isDeath = true;
                        break;
                    }
                }
                if (isDeath) {
                    this.peopleList.splice(i, 1);
                    people.isDeath = true;
                    people.changeActorState("Death", "");
                }
                else {
                    i++;
                }
            }
            if (0 == this.peopleList.length) {
                GameDataManager.Instance.isFalse = true;
                GameDataManager.Instance.liveNum = 0;
                GameDataManager.Instance.isCount = true;
                this.showGun(false);
                Laya.MouseManager.enabled = false;
                Laya.Scene.load(Scene$1.recommend, Laya.Handler.create(this, (recommend) => {
                    recommend.contentBox.width = Laya.stage.width;
                    recommend.contentBox.height = Laya.stage.height;
                    recommend.width = Laya.stage.width;
                    recommend.height = Laya.stage.height;
                    recommend.isShowEffect = false;
                    recommend.open(false);
                    Laya.MouseManager.enabled = true;
                    recommend.closeHandler = Laya.Handler.create(this, () => {
                        Laya.MouseManager.enabled = false;
                        Laya.Scene.open(Scene$1.count, false, null, Laya.Handler.create(this, () => {
                            Laya.MouseManager.enabled = true;
                        }));
                    });
                }));
            }
        }
        judgeFinish() {
            if (GameDataManager.Instance.isCount)
                return;
            let endCount = 0;
            for (let i = 0; i < this.peopleList.length; i++) {
                let people = this.peopleList[i];
                if (people.isEnd) {
                    endCount++;
                }
            }
            if (endCount == this.peopleList.length) {
                GameDataManager.Instance.liveNum = this.peopleList.length;
                GameDataManager.Instance.isCount = true;
            }
        }
        showGun(bool) {
            this.gunNode.active = bool;
            if (this.frontSight) {
                this.frontSight.visible = bool;
                if (bool)
                    this.frontSight.play(0, false, true, 0);
            }
        }
        updateGunPos() {
            if (!this.frontSight || !this.frontSight.visible)
                return;
            if (this.destX != this.frontSight.x) {
                this.frontSight.x = this.destX;
            }
            if (this.destY != this.frontSight.y) {
                this.frontSight.y = this.destY;
            }
            let rotationEuler = new Laya.Vector3;
            rotationEuler.x = -45 + (this.frontSight.y - Laya.stage.height / 2) * this.angleRatioY;
            rotationEuler.y = -(this.frontSight.x - Laya.stage.width / 2) * this.angleRatioX;
            rotationEuler.z = 0;
            this.gunNode.transform.localRotationEuler = rotationEuler;
        }
        onFreeTry(bool, index) {
            if (bool) {
                let i = Math.floor(index / 3);
                let j = index % 3;
                let weapon = `Gun${index + 1}.lh`;
                Laya.MouseManager.enabled = false;
                ResManager.create([weapon]).then(() => {
                    this.changeGun(i, j);
                    this.gameStart();
                    Laya.MouseManager.enabled = true;
                });
            }
            else {
                this.gameStart();
            }
        }
        addGun() {
            this.changeGun(UserData.instance.weaponType, UserData.instance.weaponID);
        }
        changeGun(type, id) {
            if (this.gunPoint.numChildren > 1) {
                for (let i = 0; i < this.gunPoint.numChildren; i++) {
                    let child = this.gunPoint.getChildAt(i);
                    if (child.name.indexOf("Gun") != -1) {
                        child.removeSelf();
                    }
                }
            }
            let weaponName = `Gun${type * 3 + id + 1}.lh`;
            let gun = ResManager.getRes(weaponName);
            this.gunPoint.addChild(gun);
            gun.transform.localPosition = new Laya.Vector3;
            gun.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
            this.gunNode.transform.localRotationEuler = new Laya.Vector3(-45, 0, 0);
            this.gunNode.transform.localPosition = new Laya.Vector3(1.3, 26, -22.5);
        }
        judgeJump() {
            let bridgeHalfSize = 3;
            for (let k = 0; k < this.damageBridgeList.length; k++) {
                let bridge = this.damageBridgeList[k];
                for (let i = 0; i < this.peopleList.length; i++) {
                    let people = this.peopleList[i];
                    if (people.gameObject.transform.position.x > bridge.transform.position.x - bridgeHalfSize &&
                        people.gameObject.transform.position.x < bridge.transform.position.x + bridgeHalfSize &&
                        people.gameObject.transform.position.z > bridge.transform.position.z - bridgeHalfSize &&
                        people.gameObject.transform.position.z < bridge.transform.position.z + bridgeHalfSize) {
                        if (!people.isJump) {
                            people.isJump = true;
                        }
                    }
                }
                for (let j = 0; j < this.zombieList.length; j++) {
                    let zombie = this.zombieList[j];
                    if (zombie.gameObject.transform.position.x > bridge.transform.position.x - bridgeHalfSize &&
                        zombie.gameObject.transform.position.x < bridge.transform.position.x + bridgeHalfSize &&
                        zombie.gameObject.transform.position.z > bridge.transform.position.z - bridgeHalfSize &&
                        zombie.gameObject.transform.position.z < bridge.transform.position.z + bridgeHalfSize) {
                        if (!zombie.isJump) {
                            zombie.isJump = true;
                        }
                    }
                }
            }
        }
        updateCheaseTarget() {
            for (let i = 0; i < this.peopleList.length; i++) {
                let people = this.peopleList[i];
                for (let j = 0; j < this.zombieList.length; j++) {
                    let zombie = this.zombieList[j];
                    let distance = Laya.Vector3.distance(people.gameObject.transform.position, zombie.gameObject.transform.position);
                    if (distance < 2 && !people.isDeath && !people.isJump) {
                        if (zombie.cheaseTarget == null) {
                            zombie.setCheaseTarget(people);
                            break;
                        }
                    }
                }
            }
        }
        judgePlayerNearEnd() {
            if (this.isPlayCameraEnd)
                return;
            let lastRoadPoint = GameDataManager.Instance.pointRoadList[GameDataManager.Instance.pointRoadList.length - 1];
            for (let i = 0; i < this.peopleList.length; i++) {
                let people = this.peopleList[i];
                let distance = Laya.Vector3.distance(people.gameObject.transform.position, lastRoadPoint.transform.position);
                if (distance < 15) {
                    if (GameDataManager.Instance.isCount)
                        return;
                    this.isPlayCameraEnd = true;
                    LayaTool.tweenTo(this.cameraParent, { position: lastRoadPoint.transform.position.clone() }, 2000, Laya.Ease.sineOut, Laya.Handler.create(this, () => {
                    }));
                    let cameraTip = this.cameraParent.getChildByName("CameraTip");
                    Laya.timer.scale = 0.3;
                    ResManager.playSound("plane.mp3");
                    LayaTool.tweenTo(this.gunNode, { localPosition: new Laya.Vector3(-0.4, 5.34, -11.7) }, 6000, Laya.Ease.sineOut);
                    LayaTool.tweenTo(this.camera, { localPosition: new Laya.Vector3(0, 7, -13), localRotationEuler: new Laya.Vector3(-25, 180, 0) }, 6000, Laya.Ease.sineOut, Laya.Handler.create(this, () => {
                        if (GameDataManager.Instance.isFalse)
                            return;
                        Laya.timer.scale = 1;
                        this.showGun(false);
                        let localEuler = cameraTip.transform.localRotationEuler.clone();
                        localEuler.y += 180;
                        this.camera.transform.localRotationEuler = localEuler;
                        this.camera.transform.localPosition = new Laya.Vector3(-15.43, 1.37, 3.86);
                        GameDataManager.Instance.canShot = false;
                        if (GameDataManager.Instance.isFalse)
                            return;
                        this.planeNode.active = true;
                        for (let i = 0; i < this.peopleList.length; i++) {
                            let people = this.peopleList[i];
                            people.setJumpPlane();
                        }
                        GameDataManager.Instance.allowKill = false;
                        Laya.timer.once(500, this, () => {
                            let zombieNum = this.zombieList.length;
                            let frameTime = Math.ceil(this.zombieList.length / 5);
                            let zombieIndex = 0;
                            let zombieBorn = () => {
                                let frameNum = 5;
                                if (frameTime == 1)
                                    frameNum = zombieNum;
                                for (let i = 0; i < frameNum; i++) {
                                    zombieIndex;
                                    let zombie = this.zombieList[zombieIndex];
                                    if (zombie)
                                        zombie.setJumpPlane();
                                    zombieIndex++;
                                }
                                frameTime -= 1;
                                zombieNum -= frameNum;
                                if (frameTime == 0)
                                    Laya.timer.clear(this, zombieBorn);
                            };
                            Laya.timer.frameLoop(10, this, zombieBorn);
                        });
                        Laya.timer.once(3000, this, () => {
                            if (GameDataManager.Instance.isFalse)
                                return;
                            let planeNode = LayaTool.findNodeByUrl(this.planeNode, "Bone001");
                            for (let i = 0; i < this.peopleList.length; i++) {
                                let people = this.peopleList[i];
                                people.gameObject.active = false;
                                planeNode.addChild(people.gameObject);
                            }
                            let animator = this.planeNode.getComponent(Laya.Animator);
                            animator.play("Fly", 0, 0);
                            Laya.timer.once(1000, this, () => {
                                if (GameDataManager.Instance.isFalse)
                                    return;
                                Laya.MouseManager.enabled = false;
                                Laya.Scene.load(Scene$1.recommend, Laya.Handler.create(this, (recommend) => {
                                    recommend.contentBox.width = Laya.stage.width;
                                    recommend.contentBox.height = Laya.stage.height;
                                    recommend.width = Laya.stage.width;
                                    recommend.height = Laya.stage.height;
                                    recommend.isShowEffect = false;
                                    recommend.open(false);
                                    Laya.MouseManager.enabled = true;
                                    recommend.closeHandler = Laya.Handler.create(this, () => {
                                        Laya.MouseManager.enabled = false;
                                        Laya.Scene.open(Scene$1.count, false, null, Laya.Handler.create(this, () => {
                                            Laya.MouseManager.enabled = true;
                                        }));
                                    });
                                }));
                            });
                        });
                    }));
                    break;
                }
            }
        }
        cameraChange(param = 0) {
        }
        unityEulerAngleToQuaternion(rotationEuler) {
            let quaternion = new Laya.Quaternion;
            let s1 = Math.sin(rotationEuler.y / 2 * Math.PI / 180);
            let c1 = Math.cos(rotationEuler.y / 2 * Math.PI / 180);
            let s2 = Math.sin(rotationEuler.z / 2 * Math.PI / 180);
            let c2 = Math.cos(rotationEuler.z / 2 * Math.PI / 180);
            let s3 = Math.sin(rotationEuler.x / 2 * Math.PI / 180);
            let c3 = Math.cos(rotationEuler.x / 2 * Math.PI / 180);
            quaternion.x = s1 * s2 * c3 + c1 * c2 * s3;
            quaternion.y = s1 * c2 * c3 - c1 * s2 * s3;
            quaternion.z = c1 * s2 * c3 - s1 * c2 * s3;
            quaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
            return quaternion;
        }
        createEffect(name, pos) {
            let effect = Laya.Pool.getItem(name);
            if (!effect) {
                effect = ResManager.getResClone(name);
            }
            this.clearNode.addChild(effect);
            effect.transform.position = pos;
            return effect;
        }
        calculateFps() {
            this.curFrame++;
            this.timeCount += Laya.timer.delta;
            if (this.curFrame == 5) {
                let average = this.timeCount / this.curFrame;
                this.curFrame = 0;
                this.timeCount = 0;
                GameDataManager.Instance.fps = 1000 / average;
            }
        }
        showFreeTry() {
            if (AllPlatformAdMgr.Instance.freeTry > 0 &&
                Math.random() < AllPlatformAdMgr.Instance.freeTry) {
                let unlockList = [];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (UserData.instance.weaponUnlock[i][j] == 0) {
                            unlockList.push(i * 3 + j);
                        }
                    }
                }
                if (unlockList.length > 0) {
                    let gunId = unlockList[MathTool.getRandom(0, unlockList.length - 1)];
                    Laya.Scene.load(Scene$1.freeTry, Laya.Handler.create(this, (freeTry) => {
                        freeTry.setGunId(gunId);
                        freeTry.open(false);
                    }));
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        }
        uploadLevel() {
            if (window["wx"]) {
                window["wx"].aldLevel.onSetLevel({
                    levelId: UserData.instance.level,
                    levelName: "第" + UserData.instance.level + "关"
                });
            }
        }
    }

    class PlayViewRuntime extends ui.pages.playUI {
        constructor() {
            super(...arguments);
            this.aniUp = false;
            this.isShowKill = false;
            this.killValue = 0;
            this.listData1 = [];
            this.slideDir2 = 0;
            this.isOpen = false;
        }
        onAwake() {
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this.controllerBox.width = Laya.stage.width;
            this.controllerBox.height = Laya.stage.height;
            this.initGameScene();
            this.updateLevelUi();
            this.goldLabel.text = UserData.instance.gold + "";
            this.ceBtn.on(Laya.Event.CLICK, this, this.onCeBtnClick);
            this.floatIcon1.gameName.visible = false;
            this.floatIcon2.gameName.visible = false;
            this.recommendPage.continueBtn.visible = false;
            this.recommendPage.bg.visible = false;
            this.ceBg.height = Laya.stage.height;
        }
        onCeBtnClick() {
            if (!this.isOpen) {
                this.isOpen = true;
                this.ceBtn.skin = "ADImg/celaanniu_2.png";
                Laya.Tween.to(this.ceBg, { x: 0 }, 500, Laya.Ease.sineOut, null, 0, true);
            }
            else {
                this.isOpen = false;
                this.ceBtn.skin = "ADImg/celaanniu_1.png";
                Laya.Tween.to(this.ceBg, { x: -627 }, 500, Laya.Ease.sineIn, null, 0, true);
            }
        }
        onOpened() {
            this.shopBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.shopBtn.on(Laya.Event.MOUSE_DOWN, this, this.onBtnClick);
            this.shopBtn.on(Laya.Event.MOUSE_MOVE, this, this.onBtnClick);
            this.shopBtn.on(Laya.Event.MOUSE_UP, this, this.onBtnClick);
            this.controllerBox.on(Laya.Event.MOUSE_DOWN, this, this.onThisEvent);
            this.controllerBox.on(Laya.Event.MOUSE_MOVE, this, this.onThisEvent);
            this.controllerBox.on(Laya.Event.MOUSE_UP, this, this.onThisEvent);
            ResManager.playMusic("bgm.mp3");
            this.playAni1(Laya.FrameAnimation.WRAP_POSITIVE);
            EventManager.on(EventType$1.GameAgain, this, this.onGameAgain);
            EventManager.on(EventType$1.ReturnMain, this, this.onReturnMain);
            EventManager.on(EventType$1.ReturnMain, this, this.onReturnMain);
            EventManager.on(EventType$1.KillEnemy, this, this.onKillEnemy);
            EventManager.on("UserDataChange", this, this.onDataChange);
            this.registerNativeEvent();
            this.getAuthorize();
            this.showRecommendToMP();
        }
        showRecommendToMP() {
            if (mpsdk.Account.isFromAD()) {
                Laya.MouseManager.enabled = false;
                Laya.Scene.load(Scene$1.recommend, Laya.Handler.create(this, (recommend) => {
                    recommend.contentBox.width = Laya.stage.width;
                    recommend.contentBox.height = Laya.stage.height;
                    recommend.width = Laya.stage.width;
                    recommend.height = Laya.stage.height;
                    recommend.isShowEffect = false;
                    recommend.open(false);
                    recommend.showRandomBtn();
                    Laya.MouseManager.enabled = true;
                }));
            }
        }
        onDataChange(name) {
            if (name == "gold") {
                this.goldLabel.text = UserData.instance.gold + "";
            }
        }
        onDestroy() {
            EventManager.off(EventType$1.GameAgain, this, this.onGameAgain);
            EventManager.off(EventType$1.ReturnMain, this, this.onReturnMain);
            EventManager.off(EventType$1.KillEnemy, this, this.onKillEnemy);
            EventManager.off("UserDataChange", this, this.onDataChange);
        }
        onThisEvent(e) {
            let type = e.type;
            let stageX = e.stageX;
            let stageY = e.stageY;
            Laya.timer.frameOnce(1, this, () => {
                EventManager.event(EventType$1.MouseEvent, [type, stageX, stageY]);
            });
            if (GameDataManager.Instance.isStart)
                return;
            if (this.aniUp)
                return;
            if (e.target == this.controllerBox) {
                this.aniUp = true;
                this.playAni1(Laya.FrameAnimation.WRAP_REVERSE);
            }
        }
        onBtnClick(e) {
            e.stopPropagation();
            ResManager.playSound("click.mp3");
            if (e.target == this.shopBtn && e.type == Laya.Event.CLICK) {
                Laya.Scene.open(Scene$1.shop, true, null);
            }
        }
        updateLevelUi() {
            let stage = Math.floor(UserData.instance.PlayLevel / 5);
            let levelData = [];
            for (let i = 0; i < 5; i++) {
                let level = stage * 5 + i + 1;
                let skin = "main/Ui_GuanKa2.png";
                if (level == UserData.instance.level) {
                    skin = "main/Ui_GuanKa3.png";
                }
                levelData.push({ "level": { text: level + "" }, "bg": { skin: skin } });
            }
            this.levelList.array = levelData;
            this.levelList.refresh();
        }
        playAni1(wrapMode) {
            if (this.ani1.isPlaying)
                return;
            Laya.MouseManager.enabled = false;
            this.ani1.wrapMode = wrapMode;
            this.ani1.play(0, false);
            this.ani1.on(Laya.Event.COMPLETE, this, () => {
                Laya.MouseManager.enabled = true;
            });
        }
        onReturnMain(isNext) {
            this.aniUp = false;
            this.playAni1(Laya.FrameAnimation.WRAP_POSITIVE);
            if (isNext) {
                let lastLevel = UserData.instance.PlayLevel;
                UserData.instance.PlayLevel = UserData.instance.level;
                if (UserData.instance.isFull) {
                    UserData.instance.PlayLevel = MathTool.getRandom(5, 8);
                }
                Laya.MouseManager.enabled = false;
                ResManager.create([`Level${UserData.instance.PlayLevel}.ls`]).then(() => {
                    this.updateLevelUi();
                    let lastLevelName = `Level${lastLevel}.ls`;
                    let lastGameScene = ResManager.getRes(lastLevelName);
                    if (lastGameScene) {
                        let lastSceneLogic = lastGameScene.getComponent(GameSceneLogic);
                        if (lastSceneLogic)
                            lastSceneLogic.destroy();
                    }
                    this.initGameScene();
                    Laya.MouseManager.enabled = true;
                });
            }
            else {
                this.initGameScene();
            }
        }
        onGameAgain() {
            this.initGameScene();
        }
        initGameScene() {
            GameDataManager.Instance.init();
            let levelName = `Level${UserData.instance.PlayLevel}.ls`;
            let gameScene = ResManager.getRes(levelName);
            let gameSceneLogic = gameScene.getComponent(GameSceneLogic);
            if (gameSceneLogic) {
                gameSceneLogic.destroy();
            }
            let camera = ResManager.getRes("MainCamera.lh");
            gameScene.addChild(camera);
            gameScene.addComponent(GameSceneLogic);
            StageManager.GameSceneRoot.addChild(gameScene);
            AllPlatformAdMgr.Instance.showInterstitialAd(null);
        }
        onKillEnemy() {
            this.killValue++;
            if (!this.isShowKill) {
                this.isShowKill = true;
                this.ani2.play(0, false);
            }
            else {
                Laya.timer.once(3000, this, this.onKillEnd, null, true);
            }
            this.killNum.value = this.killValue + "";
            this.ani4.play(0, false);
        }
        onKillEnd() {
            this.isShowKill = false;
            this.killValue = 0;
            this.ani3.play(0, false);
        }
        nativeLoop() {
            this.nativeAd.showNative({
                index: 2
            });
        }
        registerNativeEvent() {
            this.nativeAd.nativeHandler = Laya.Handler.create(this, (p1, p2) => {
                if (p1 && p1 == "show") {
                    if (p2) {
                        Laya.timer.clear(this, this.nativeLoop);
                    }
                    else {
                        Laya.timer.clear(this, this.nativeLoop);
                        Laya.timer.loop(AllPlatformAdMgr.Instance.nativeRefreshTimeDelay * 1000, this, this.nativeLoop);
                    }
                }
                else if (p1 && p1 == "hide") {
                    Laya.timer.clear(this, this.nativeLoop);
                    Laya.timer.loop(AllPlatformAdMgr.Instance.nativeRefreshTimeDelay * 1000, this, this.nativeLoop);
                }
            }, null, false);
        }
        getAuthorize() {
            if (window.wx) {
                if (Laya.LocalStorage.getItem("getUserInfo") != "1") {
                    Laya.LocalStorage.setItem("getUserInfo", "1");
                    const button = wx.createUserInfoButton({
                        type: "text",
                        text: "",
                        style: {
                            left: 0,
                            top: 0,
                            width: Laya.stage.width,
                            height: Laya.stage.height,
                        },
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            window["UserInfo"] = res.userInfo;
                            mpsdk.Account.setAccountInfo(res.userInfo);
                            mpsdk.Report.reportEvent(31, "0");
                        }
                        button.destroy();
                    });
                }
            }
        }
    }

    class RecommendDialogRuntime extends ui.pages.recommendUI {
        constructor() {
            super(...arguments);
            this.listData1 = [];
            this.listData2 = [];
            this.slideDir1 = 0;
            this.slideDir2 = 0;
            this.leftTime = 2;
            this.showBannering = false;
        }
        onAwake() {
            this.showGuesslikeList();
            this.list1.hScrollBarSkin = null;
            this.list1.array = [];
            this.list1.refresh();
            this.list1.mouseHandler = Laya.Handler.create(this, this.onList1MouseHandler, null, false);
            this.list2.array = [];
            this.list2.refresh();
            this.list2.vScrollBarSkin = null;
            this.list2.mouseHandler = Laya.Handler.create(this, this.onList2MouseHandler, null, false);
            this.slideDir1 = 1;
            this.slideDir2 = 1;
            this.continueBtn.on(Laya.Event.CLICK, this, this.onContinue);
            this.randomOneBtn.on(Laya.Event.CLICK, this, this.onRandomOneBtn);
            this.randomOneBtn.visible = false;
            this.continueBtn.visible = true;
        }
        showRandomBtn() {
            this.randomOneBtn.visible = true;
            this.continueBtn.visible = false;
            Laya.timer.once(1500, this, () => {
                this.randomOneBtn.visible = false;
                this.continueBtn.visible = true;
            });
        }
        onRandomOneBtn() {
            if (this.listData2.length > 0) {
                let data = this.listData2[MathTool.getRandom(0, this.listData2.length - 1)];
                mpsdk.Ad.click(data);
            }
        }
        onContinue() {
            this.close();
        }
        onList2MouseHandler(e, index) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                let data = this.listData2[index];
                mpsdk.Ad.click(data);
            }
        }
        onList1MouseHandler(e, index) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                let data = this.listData2[index];
                mpsdk.Ad.click(data);
            }
        }
        onFrameLoop() {
            if (this.list1.scrollBar.max > 0) {
                if (this.slideDir1 == 1) {
                    this.list1.scrollBar.value += 0.2;
                    if (this.list1.scrollBar.value >= this.list1.scrollBar.max) {
                        this.slideDir1 = 2;
                    }
                }
                else if (this.slideDir1 == 2) {
                    this.list1.scrollBar.value -= 0.2;
                    if (this.list1.scrollBar.value <= this.list1.scrollBar.min) {
                        this.slideDir1 = 1;
                    }
                }
            }
            if (this.list2.scrollBar.max > 0) {
                if (this.slideDir2 == 1) {
                    this.list2.scrollBar.value += 0.2;
                    if (this.list2.scrollBar.value >= this.list2.scrollBar.max) {
                        this.slideDir2 = 2;
                    }
                }
                else if (this.slideDir2 == 2) {
                    this.list2.scrollBar.value -= 0.2;
                    if (this.list2.scrollBar.value <= this.list2.scrollBar.min) {
                        this.slideDir2 = 1;
                    }
                }
            }
        }
        onOpened() {
        }
        showGuesslikeList() {
            Laya.timer.once(0, this, () => {
                mpsdk.Ad.getSuggestList(false, 0, 100).then((data) => {
                    Laya.timer.frameLoop(1, this, this.onFrameLoop);
                    this.listData1 = data;
                    let adDatas1 = [];
                    for (let i = 0; i < this.listData1.length; i++) {
                        adDatas1.push({
                            icon: { skin: this.listData1[i].icon },
                            title: { text: this.listData1[i].title },
                        });
                    }
                    this.list1.array = adDatas1;
                    this.list1.refresh();
                    let indexList = [];
                    for (let i = 0; i < this.listData1.length; i++) {
                        indexList.push(i);
                    }
                    for (let i = 0; i < this.listData1.length; i++) {
                        this.listData2.push(this.listData1[indexList.splice(MathTool.getRandom(0, indexList.length - 1), 1)[0]]);
                    }
                    let adDatas2 = [];
                    for (let i = 0; i < this.listData2.length; i++) {
                        adDatas2.push({
                            icon: { skin: this.listData2[i].icon },
                            title: { text: this.listData2[i].title },
                        });
                    }
                    this.list2.array = adDatas2;
                    this.list2.refresh();
                });
            });
        }
    }

    class Recommend1DialogRuntime extends ui.pages.recommend1UI {
        constructor() {
            super(...arguments);
            this.listData1 = [];
            this.listData2 = [];
            this.slideDir2 = 0;
            this.leftTime = 2;
            this.showBannering = false;
        }
        onAwake() {
            this.contentBox.width = Laya.stage.width;
            this.contentBox.height = Laya.stage.height;
            this.showGuesslikeList();
            this.list2.vScrollBarSkin = null;
            this.list2.mouseHandler = Laya.Handler.create(this, this.onList2MouseHandler, null, false);
            this.slideDir2 = 1;
            Laya.timer.frameLoop(1, this, this.onFrameLoop);
            this.continueBtn.on(Laya.Event.CLICK, this, this.onContinue);
        }
        onContinue() {
            if (mpsdk.Account.isFromAD()) {
                if (this.showBannering)
                    return;
                this.leftTime--;
                if (this.leftTime == 1) {
                    this.showBannering = true;
                    Laya.timer.once(1000, this, () => {
                        AllPlatformAdMgr.Instance.showBannerAd();
                        Laya.timer.once(500, this, () => {
                            AllPlatformAdMgr.Instance.hideBannerAd();
                            this.showBannering = false;
                        });
                    });
                }
                else {
                    this.close();
                }
            }
            else {
                this.close();
            }
        }
        onList2MouseHandler(e, index) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                let data = this.listData2[index];
                mpsdk.Ad.click(data);
            }
        }
        onList1MouseHandler(index, e) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                let data = this.listData1[index];
                mpsdk.Ad.click(data);
            }
        }
        onFrameLoop() {
            if (this.list2.scrollBar.max > 0) {
                if (this.slideDir2 == 1) {
                    this.list2.scrollBar.value += 0.2;
                    if (this.list2.scrollBar.value >= this.list2.scrollBar.max) {
                        this.slideDir2 = 2;
                    }
                }
                else if (this.slideDir2 == 2) {
                    this.list2.scrollBar.value -= 0.2;
                    if (this.list2.scrollBar.value <= this.list2.scrollBar.min) {
                        this.slideDir2 = 1;
                    }
                }
            }
        }
        onOpened() {
        }
        setRankData(box, data, playNum) {
            box.getChildByName("icon").skin = data.icon;
            box.getChildByName("title").text = data.title;
            box.getChildByName("playNum").text = playNum + "万人正在玩";
        }
        showGuesslikeList() {
            mpsdk.Ad.getExcitationList(true, 0, 100).then((datas) => {
                let playPeopleNumList = [];
                for (let i = 0; i < datas.length; i++) {
                    playPeopleNumList.push(MathTool.getRandom(1, 50));
                }
                playPeopleNumList.sort((a, b) => {
                    return b - a;
                });
                this.listData2 = [];
                this.listData1 = [];
                for (let i = 0; i < datas.length; i++) {
                    let data = datas[i];
                    if (i < 3) {
                        this.listData1.push(data);
                        if (i == 0) {
                            this.setRankData(this.num1Box, data, playPeopleNumList[i]);
                            this.num1Box.on(Laya.Event.MOUSE_DOWN, this, this.onList1MouseHandler, [i]);
                        }
                        else if (i == 1) {
                            this.setRankData(this.num2Box, data, playPeopleNumList[i]);
                            this.num2Box.on(Laya.Event.MOUSE_DOWN, this, this.onList1MouseHandler, [i]);
                        }
                        else if (i == 2) {
                            this.setRankData(this.num3Box, data, playPeopleNumList[i]);
                            this.num3Box.on(Laya.Event.MOUSE_DOWN, this, this.onList1MouseHandler, [i]);
                        }
                    }
                    else {
                        this.listData2.push(data);
                    }
                }
                let adDatas2 = [];
                for (let i = 0; i < this.listData2.length; i++) {
                    adDatas2.push({
                        icon: { skin: this.listData2[i].icon },
                        title: { text: this.listData2[i].title },
                        playNum: { text: playPeopleNumList[i + 3] + "万人正在玩" },
                        rankLabel: { text: (i + 4) + "" },
                    });
                }
                this.list2.array = adDatas2;
                this.list2.refresh();
            });
        }
    }

    class ShopDialogRuntime extends ui.pages.shopUI {
        constructor() {
            super(...arguments);
            this.unlockCost = 500;
            this.videoAdd = 100;
            this.scene3d = null;
            this.camera = null;
            this.playerPoint = null;
            this.listData = null;
            this.slideDir = 0;
        }
        onAwake() {
            this.box.width = Laya.stage.width;
            this.box.height = Laya.stage.height;
            this.updateShopList();
            this.goldCost.text = this.unlockCost + "";
            window["Shop"] = this;
            Laya.timer.frameLoop(1, this, this.onUpdate);
            this.shopList.vScrollBarSkin = null;
            this.goldLabel.text = UserData.instance.gold + "";
            this.showGuesslikeList();
            EventManager.on(EventType$1.onHide, this, this.onHide);
            EventManager.on(EventType$1.onShow, this, this.onShow);
            this.showGuesslikeList();
            this.guessLikeList.hScrollBarSkin = null;
            this.guessLikeList.mouseHandler = Laya.Handler.create(this, this.onListMouseHandler, null, false);
            this.slideDir = 1;
            Laya.timer.frameLoop(1, this, this.onFrameLoop);
        }
        onDestroy() {
            EventManager.off("UserDataChange", this, this.onDataChange);
            if (this.scene3d) {
                this.scene3d.removeSelf();
                this.scene3d.destroy();
            }
        }
        onUpdate() {
            if (this.playerPoint)
                this.playerPoint.transform.rotate(new Laya.Vector3(0, Laya.timer.delta / 1000 / 10, 0));
        }
        onOpened() {
            EventManager.on("UserDataChange", this, this.onDataChange);
            this.shopList.mouseHandler = Laya.Handler.create(this, this.onLiseMouseEvent, null, false);
            this.backBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.unlockBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.initShopShowScene();
            this.updatePlayer();
        }
        initShopShowScene() {
            if (!this.scene3d) {
                this.scene3d = new Laya.Scene3D();
                this.camera = new Laya.Camera();
                let light = new Laya.DirectionLight;
                this.scene3d.addChild(light);
                this.camera.clearFlag = Laya.CameraClearFlags.DepthOnly;
                this.camera.addComponent(CameraScriptF);
                this.playerPoint = new Laya.Sprite3D();
                this.playerPoint.transform.position = new Laya.Vector3(0, 3.5, -15);
                this.scene3d.addChild(this.camera);
                this.scene3d.addChild(this.playerPoint);
                this.sceneBox.addChild(this.scene3d);
            }
        }
        updatePlayer() {
            if (this.playerPoint.numChildren > 0) {
                this.playerPoint.destroyChildren();
            }
            let gunName = `Gun${UserData.instance.weaponType * 3 + UserData.instance.weaponID + 1}.lh`;
            let gun = ResManager.getResClone(gunName);
            gun.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
            this.playerPoint.transform.position = new Laya.Vector3(0, 3.5, -15);
            gun.transform.localPosition = new Laya.Vector3();
            this.playerPoint.addChild(gun);
            EventManager.event(EventType$1.UpdateUseGun);
        }
        onUpdateMainPlayer() {
            let list = [];
            let gunName = `Gun${UserData.instance.weaponType * 3 + UserData.instance.weaponID + 1}.lh`;
            list.push(gunName);
            Laya.MouseManager.enabled = false;
            ResManager.create(list).then(() => {
                this.updatePlayer();
                Laya.MouseManager.enabled = true;
            });
        }
        onBtnClick(e) {
            ResManager.playSound("click.mp3");
            if (e.target == this.backBtn) {
                this.close();
                if (this.scene3d) {
                    this.scene3d.active = false;
                }
            }
            else if (e.target == this.unlockBtn) {
                if (UserData.instance.gold >= this.unlockCost) {
                    UserData.instance.gold -= this.unlockCost;
                    UserData.instance.onDataChange("gold");
                    mpsdk.Report.reportGold(-this.unlockCost, UserData.instance.gold, '解锁武器');
                    let unlockList = [];
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (UserData.instance.weaponUnlock[i][j] == 0) {
                                unlockList.push([i, j]);
                            }
                        }
                    }
                    if (unlockList.length > 0) {
                        let randomUnlock = unlockList[MathTool.getRandom(0, unlockList.length - 1)];
                        UserData.instance.weaponUnlock[randomUnlock[0]][randomUnlock[1]] = 1;
                        UserData.instance.onDataChange("weaponUnlock");
                        this.updateShopList();
                    }
                }
                else {
                    if (AllPlatformAdMgr.Instance.isShowNative) {
                        Laya.Scene.open(Scene$1.moneyAdd, false);
                    }
                }
            }
        }
        onLiseMouseEvent(e, index) {
            if (e.type == Laya.Event.CLICK) {
                let i = Math.floor(index / 3);
                let j = index % 3;
                if (UserData.instance.weaponUnlock[i][j] == 1) {
                    if (i != UserData.instance.weaponType ||
                        j != UserData.instance.weaponID) {
                        UserData.instance.weaponType = i;
                        UserData.instance.weaponID = j;
                    }
                }
                this.updateShopList();
                this.onUpdateMainPlayer();
            }
        }
        onDataChange(name) {
            if (name == "gold") {
                this.goldLabel.text = UserData.instance.gold + "";
            }
        }
        updateShopList() {
            let shopDataArray = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let data = { "useTag": { visible: false }, "gun": { visible: false, skin: "" }, "bg": { skin: "shop/Ui_unlock.png" }, "ques": { visible: true } };
                    if (UserData.instance.weaponUnlock[i][j] == 1) {
                        data.ques.visible = false;
                        data.gun.visible = true;
                        data.gun.skin = `shop/Ui_${i * 3 + j + 1}.png`;
                    }
                    if (i == UserData.instance.weaponType &&
                        j == UserData.instance.weaponID) {
                        data.useTag.visible = true;
                        data.bg.skin = `shop/Ui_use.png`;
                    }
                    shopDataArray.push(data);
                }
            }
            this.shopList.array = shopDataArray;
            this.shopList.refresh();
        }
        showGuesslikeList() {
            mpsdk.Ad.getSuggestList(false, 0, 100).then((data) => {
                this.listData = data;
                let adDatas = [];
                for (let i = 0; i < this.listData.length; i++) {
                    adDatas.push({
                        icon: { skin: this.listData[i].icon },
                        title: { text: this.listData[i].title },
                    });
                }
                this.guessLikeList.array = adDatas;
                this.guessLikeList.refresh();
            });
        }
        onShow() {
            if (ShopDialogRuntime.isTry) {
                ShopDialogRuntime.isTry = false;
                ShopDialogRuntime.jumpSuccess = false;
                let outTime = Number(localStorage.getItem("shopGuessLikeTimestamp"));
                if (outTime && outTime > 0) {
                    if (Date.now() - outTime >= 15 * 1000) {
                        UserData.instance.gold += 300;
                        UserData.instance.onDataChange("gold");
                    }
                }
            }
        }
        onHide() {
            if (ShopDialogRuntime.isTry) {
                ShopDialogRuntime.jumpSuccess = true;
            }
        }
        onFrameLoop() {
            if (this.guessLikeList.scrollBar.max > 0) {
                if (this.slideDir == 1) {
                    this.guessLikeList.scrollBar.value += 0.2;
                    if (this.guessLikeList.scrollBar.value >= this.guessLikeList.scrollBar.max) {
                        this.slideDir = 2;
                    }
                }
                else if (this.slideDir == 2) {
                    this.guessLikeList.scrollBar.value -= 0.2;
                    if (this.guessLikeList.scrollBar.value <= this.guessLikeList.scrollBar.min) {
                        this.slideDir = 1;
                    }
                }
            }
        }
        onListMouseHandler(e, index) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                let data = this.listData[index];
                mpsdk.Ad.click(data);
                ShopDialogRuntime.isTry = true;
                localStorage.setItem("shopGuessLikeTimestamp", Date.now().toString());
            }
        }
    }
    ShopDialogRuntime.isTry = false;
    ShopDialogRuntime.jumpSuccess = false;

    class TreasureDialogRuntime extends ui.pages.treasureUI {
        constructor() {
            super(...arguments);
            this.isFade = false;
            this.isGiveReward = false;
        }
        onAwake() {
            this.contentBox.width = Laya.stage.width;
            this.contentBox.height = Laya.stage.height;
            this.progressBar.width = 0;
            Laya.timer.frameLoop(1, this, this.onFrameLoop);
            this.clickBtn.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.clickBtn.on(Laya.Event.MOUSE_UP, this, this.onClick);
        }
        onClick(e) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                if (this.progressBar.width < 420) {
                    this.progressBar.width += 420 * 0.08;
                    this.progressBar.width =
                        this.progressBar.width < 420 ? this.progressBar.width : 420;
                    this.isFade = false;
                    Laya.timer.once(100, this, () => {
                        this.isFade = true;
                    });
                }
                if (this.progressBar.width == 420) {
                    this.isFade = false;
                }
                if (this.progressBar.width >= 420 * 0.5 && this.isGiveReward == false) {
                    this.isGiveReward = true;
                    Laya.timer.clear(this, this.onFrameLoop);
                    AllPlatformAdMgr.Instance.showBannerAd();
                    Laya.timer.once(2000, this, () => {
                        UserData.instance.gold += 100;
                        UserData.instance.onDataChange("gold");
                        this.close();
                    });
                }
                Laya.Tween.to(this.clickBtn, { scaleX: 0.9, scaleY: 0.9 }, 500, Laya.Ease.sineOut);
            }
            else {
                Laya.Tween.to(this.clickBtn, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.sineIn);
            }
        }
        onOpened() {
            TreasureDialogRuntime.isOpen = true;
        }
        onFrameLoop() {
            if (this.progressBar.width > 0 && this.isFade) {
                this.progressBar.width -= 420 * 0.12 * Laya.timer.delta / 1000;
                this.progressBar.width = this.progressBar.width > 0 ? this.progressBar.width : 0;
            }
        }
        onClosed() {
            TreasureDialogRuntime.isOpen = false;
            AllPlatformAdMgr.Instance.showBannerAd();
        }
    }
    TreasureDialogRuntime.isOpen = false;

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("pageruntimes/AdIconRuntime.ts", AdIconRuntime);
            reg("pageruntimes/CountDialogRuntime.ts", CountDialogRuntime);
            reg("pageruntimes/NativeAdRuntime.ts", NativeAdRuntime);
            reg("pageruntimes/FreeTryDialogRuntime.ts", FreeTryDialogRuntime);
            reg("pageruntimes/LoadViewRuntime.ts", LoadViewRuntime);
            reg("pageruntimes/MoneyAddDialogRuntime.ts", MoneyAddDialogRuntime);
            reg("pageruntimes/PlayViewRuntime.ts", PlayViewRuntime);
            reg("pageruntimes/RecommendDialogRuntime.ts", RecommendDialogRuntime);
            reg("pageruntimes/Recommend1DialogRuntime.ts", Recommend1DialogRuntime);
            reg("pageruntimes/ShopDialogRuntime.ts", ShopDialogRuntime);
            reg("pageruntimes/TreasureDialogRuntime.ts", TreasureDialogRuntime);
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "pages/load.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class UIManager {
        constructor() {
            UIManager._uiMap = new Map;
        }
        static init() {
            if (!UIManager._UIManager) {
                UIManager._UIManager = new UIManager();
            }
        }
        static open(cls, closeOther = true) {
            let ui = UIManager._uiMap.get(cls.name);
            if (ui == null) {
                ui = new cls();
                UIManager._uiMap.set(cls.name, ui);
            }
            if (closeOther) {
                UIManager.closeAll(ui);
            }
            ui.open(closeOther);
            console.log(UIManager._uiMap);
            return ui;
        }
        static close(cls) {
            let ui = UIManager._uiMap.get(cls.name);
            if (ui) {
                ui.close();
                if (ui.autoDestroyAtClosed) {
                    UIManager._uiMap.set(cls.name, null);
                }
            }
            console.log(UIManager._uiMap);
        }
        static closeAll(ui) {
            UIManager._uiMap.forEach((v, k) => {
                if ((v && ui instanceof Laya.Dialog && v instanceof Laya.Dialog && ui != v) ||
                    (v && !(ui instanceof Laya.Dialog) && !(v instanceof Laya.Dialog) && ui != v)) {
                    v.close();
                    if (v.autoDestroyAtClosed) {
                        UIManager._uiMap.set(k, null);
                    }
                }
            });
        }
    }

    class GFrameWork {
        constructor() { }
        static init() {
            return new Promise(resolve => {
                UIConfig.closeDialogOnSide = false;
                UIConfig.popupBgAlpha = 0.5;
                EventManager.init();
                StageManager.init();
                UIManager.init();
                PlatFormManager.init();
                ResManager.init().then(() => {
                    resolve();
                });
            });
        }
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GFrameWork.init().then(() => {
                ResManager.loadFonts(["gold.fnt"]).then(() => {
                    GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
                });
            });
        }
    }
    new Main();

}());
