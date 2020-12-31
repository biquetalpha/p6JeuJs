class Player extends ACase {
    constructor(playerId, x, y, assets, life, weapon) {
        super(x, y, assets);
        this.playerId = playerId;
        this.life = life;
        this.weapon = weapon;

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