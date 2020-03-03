// 2
// [1,2]
// [4,3]
// 3
// [1,2,3]
// [8,9,4]
// [7,6,5]
class CircleRoute {
    constructor() {

    }
    /**方向 东南西北 (决定了方向变换的关系)*/
    private dirArr = [0, 1, 2, 3];
    private width = 5;
    private height = 5;
    private mCurIdxX = 0;
    private mCurIdxY = 0;
    private mCurDir = 0;
    private mCurArr = [];
    private resMap = [];

    //检测下一个方向
    private getNextDir(mCurIdxX, mCurIdxY) {
        let curIdx = this.mCurDir;
        let _isChange: boolean = false;
        switch (curIdx) {
            case 0:
                _isChange = mCurIdxX + 1 >= this.width || this.resMap[mCurIdxX][this.mCurIdxX + 1]
                break;
            case 1:
                _isChange = mCurIdxY + 1 >= this.height || this.resMap[mCurIdxY + 1][this.mCurIdxX]
                break;
            case 2:
                _isChange = mCurIdxX <= 0 || this.resMap[mCurIdxX][this.mCurIdxX - 1]
                break;
            case 3:
                _isChange = mCurIdxY <= 0 || this.resMap[mCurIdxY - 1][this.mCurIdxX]
                break;
        }
        if (_isChange) {
            curIdx = this.dirArr[(curIdx + 1)%4];
        }
        this.mCurDir = curIdx;
        return curIdx;
    };
    /**step从1开始 */
    private nextStep(_step) {
        var _nextDir = this.getNextDir(this.mCurIdxX, this.mCurIdxY);
        switch (_nextDir) {
            case 0: //东
                this.mCurIdxX++;
                this.mCurArr[this.mCurIdxX] = _step;
                break;
            case 1: //南
                this.mCurIdxY++;
                var _curArr = this.resMap[this.mCurIdxY];
                this.mCurArr = _curArr;
                _curArr[this.mCurIdxX] = _step;
                break;
            case 2: //西
                this.mCurIdxX--;
                this.mCurArr[this.mCurIdxX] = _step;
                break;
            case 3: //北
                this.mCurIdxY--;
                var _curArr = this.resMap[this.mCurIdxY];
                this.mCurArr = _curArr;
                this.mCurArr[this.mCurIdxX] = _step;
                break;
        }
    };
    private generateMap(n) {
        var _res = [];
        for (var i = 0; i < n; i++) {
            var _item = [];
            for (var j = 0; j < n; j++) {
                _item.push(0);
            }
            _res.push(_item);
        }
        this.resMap = _res;
    }
    start(n = this.width) {
        this.generateMap(n);
        this.mCurArr = this.resMap[0];
        var _totalStep = Math.pow(n, 2);
        this.mCurArr[0] = 1;
        for (var i = 1; i < _totalStep; i++) {
            this.nextStep(i + 1);
        }
        return this.resMap;
    }
}
new CircleRoute().start();
