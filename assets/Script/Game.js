// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pipeUpPrefab: {
            default: null,
            type: cc.Prefab
        },
        pipeDownPrefab: {
            default: null,
            type: cc.Prefab
        },
        land: {
            default: null,
            type: cc.Node
        },
        bird: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            type: cc.Node
        },
        genSpan: 1.5
    },

    onLoad() {
        this.bird.getComponent("Bird").game = this;
        cc.director.getPhysicsManager().enabled = true;
        this.lifeTime = 0;
        this.genCount = 0;
        this.openInput();
    },

    onDestroy() {
        this.cancelInput();
    },

    onPress() {
        var rigidBody = this.bird.getComponent(cc.RigidBody);
        var rotateUp = cc.rotateTo(0.2, -30).easing(cc.easeCubicActionOut());
        var rotateDown = cc.rotateTo(0.3, 30).easing(cc.easeCubicActionIn());
        rigidBody.node.runAction(cc.sequence(rotateUp, rotateDown));
        rigidBody.linearVelocity = {x: 0, y: 500};
    },

    openInput() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onPress, this);
    },

    cancelInput() {
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onPress, this);
    },

    update(dt) {
        if (this.bird.position.x < -this.node.width / 2
            || this.bird.position.x > this.node.width / 2
            || this.bird.position.y < -this.node.height / 2
            || this.bird.position.y > this.node.height / 2) {
            cc.director.loadScene("menu");
        } else {
            this.lifeTime += dt;
            this.genCount += dt;
            if (this.genCount >= this.genSpan) {
                this.genCount = 0
                this.genWall();
            }
            this.score.getComponent(cc.Label).string = this.lifeTime.toFixed(2);
        }
    },

    genWall() {
        var pipeUp = cc.instantiate(this.pipeUpPrefab);
        var pipeDown = cc.instantiate(this.pipeDownPrefab);
        this.setPos(pipeUp, pipeDown);
        this.node.addChild(pipeUp);
        this.node.addChild(pipeDown);
        this.land.zIndex = 1;
        this.score.zIndex = 2;
    },

    setPos(pipeUp, pipeDown) {
        var yposDown = Math.random() * this.node.height / 2 - this.node.height / 8;
        var yposUp;
        var gapLevel = Math.random() * 4;
        if (gapLevel <= 1) {
            yposUp = yposDown - this.node.height / 4;
        } else {
            yposUp = yposDown - this.node.height / 6;
        }
        pipeUp.setPosition(cc.v2(this.node.width / 2 + pipeUp.width, yposUp));
        pipeDown.setPosition(cc.v2(this.node.width / 2 + pipeDown.width, yposDown));
    }

});
