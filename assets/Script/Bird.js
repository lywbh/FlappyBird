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

    loadBird(resource) {
        var self = this;
        cc.loader.loadRes(resource, cc.SpriteFrame, function (err, spriteFrame) {
			if (self.node) {
				self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			}
        });
    },

    onLoad() {
        this.getComponent(cc.RigidBody).enabledContactListener = true;
    },

    update(dt) {
        this.node.angle = this.node.angle % 360;
        if (this.node.angle <= -25) {
            this.loadBird("bird2_0");
        } else if (this.node.angle >= 25) {
            this.loadBird("bird2_2");
        } else {
            this.loadBird("bird2_1");
        }
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        this.game.cancelInput();
    }
});
