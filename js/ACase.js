class ACase {


    constructor(x, y, asset) {
        this.x = x;
        this.y = y;
        this.asset = asset;
        this.isAccesible = false;
    }

    get assets() {
        return this.assets;
    }
    isSolid() {
        return false;
    }
}