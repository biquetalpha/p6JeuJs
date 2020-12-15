class Player extends ACase {
    constructor(playerId, x, y, assets, life) {
        super(x, y, assets);
        this.playerId = playerId;
        this.life = life;

    }
    isSolid() {
        return true;
    }
    isCatchable() {
        return false;
    }
    istarget() {
        return true;
    }
}