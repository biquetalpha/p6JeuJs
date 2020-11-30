class Weapon extends ACase {

    constructor(x, y, asset, damage, ammo, range) {
        super(x, y, asset);
        this.damage = damage;
        this.ammo = ammo;
        this.range = range;
    }


    isSolid() {
        return false;
    }
    isCatchable() {
        return true;
    }

}