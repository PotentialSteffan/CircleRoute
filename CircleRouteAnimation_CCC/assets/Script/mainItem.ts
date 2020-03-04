const { ccclass, property } = cc._decorator;
@ccclass
export default class mainItem extends cc.Component{
    @property(cc.Sprite)
    spriteColor:cc.Sprite = null;
}