const { ccclass, property } = cc._decorator;
import mainItem from './mainItem'
import CircleRoute from './MainLogic';
@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Layout)
    layout: cc.Layout = null;
    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    private mArrArr:Array<Array<cc.Node>> = [];
    start() {
        let n = 100;
        for (let i = 0; i < n; i++) {
            let _item = cc.instantiate(this.prefab);
            let _x = i%10;
            let _y = Math.floor(i/10);
            if(!this.mArrArr[_y])this.mArrArr[_y] = [];
            this.mArrArr[_y][_x] = _item;
            // _item.getComponent(mainItem).spriteColor.node.color = cc.color(0,0,0)
            this.layout.node.addChild(_item);
        }
        this.isBegin = true;

    }
    private mCR:CircleRoute = new CircleRoute();
    private getNextItem(x){
        if(x === 0){
            return this.mArrArr[0][0];
        }
        let _res = this.mCR.nextStep(x);
        return this.mArrArr[_res.y][_res.x];
    }
    private mPreTime: number = 0;
    // private mP: number = 0;
    private isBegin: boolean = false;
    private mIdx: number = 0;
    update() {
        if (this.isBegin && this.mIdx <= 100) {
            let _dur: number;
            if (this.mPreTime === 0) {
                this.mPreTime = new Date().getTime();
                return;
            }
            _dur = new Date().getTime() - this.mPreTime;
            if(_dur>=50){
                // this.layout.node.children[this.mIdx].getComponent(mainItem).spriteColor.node.color = cc.color(0, 0, 0);
                this.getNextItem(this.mIdx).getComponent(mainItem).spriteColor.node.color = cc.color(0, 0, 0);
                this.mIdx++;
                this.mPreTime = new Date().getTime();
            }
        }
    }
}
