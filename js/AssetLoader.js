class AssetLoader {
    async initAssets() {
        this.assets = {
            background: await this.createAsset('img/map/background.png'),
            walls: [{
                asset: await this.createAsset('img/map/wall.png')
            }, {
                asset: await this.createAsset('img/map/wall2.png')
            }, {
                asset: await this.createAsset('img/map/wall3.png')
            }, {
                asset: await this.createAsset('img/map/wall4.png')
            }],
            weapons: [{
                asset: await this.createAsset('img/weapon/weapon1.png'),
                damage: 15,
                ammo: 10,
                range: 2
            }, {
                asset: await this.createAsset('img/weapon/weapon2.png'),
                damage: 25,
                ammo: 10,
                range: 2
            }, {
                asset: await this.createAsset('img/weapon/weapon3.png'),
                damage: 35,
                ammo: 5,
                range: 5
            }, {
                asset: await this.createAsset('img/weapon/weapon4.png'),
                damage: 45,
                ammo: 10,
                range: 4
            }],
            player1: await this.createAsset('img/player/player1.png'),
            player2: await this.createAsset('img/player/player2.png'),
            step: await this.createAsset('img/map/step.png')
        };
    }

    createAsset(url) {
        return new Promise((resolve) => {
            var canvas = new Image();
            canvas.src = url;
            canvas.addEventListener('load', function() {
                resolve(canvas);
            }, false);
        });

    }

}