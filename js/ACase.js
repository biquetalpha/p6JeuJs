class ACase {


    constructor(x, y, asset) {
        this.x = x;
        this.y = y;
        this.asset = asset;
        this.isAccessible = false;
        this.isCatchable = false;
    }


    isSolid() {
        return false;
    }
    isCatchable() {
        return false;
    }

}