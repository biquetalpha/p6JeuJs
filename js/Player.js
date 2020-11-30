class Player extends ACase {
    constructor(playerId, x, y, assets, life, damage) {
        super(x, y, assets);
        this.playerId = playerId;
        this.life = life;
        this.damage = damage;
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