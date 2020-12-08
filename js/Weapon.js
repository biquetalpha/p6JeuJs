class Weapon extends ACase {

    constructor(x, y, asset, damage) {
        super(x, y, asset);
        this.damage = damage;

    }

    isCatchable() {
        return true;
    }

}