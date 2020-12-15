class Map {

    constructor(canvas, width, height, caseSize, assets) {
        this.assets = assets;
        this.canvas = canvas;
        this.grid = [];
        for (let y = 0; y < height; y++) {
            this.grid.push([]);
            for (let x = 0; x < width; x++) {
                this.grid[y].push(new Empty(x, y));
            }
        }
        this.caseSize = caseSize;
        this.canvas.width = width * this.caseSize;
        this.canvas.height = height * this.caseSize;

        this.initWalls();
        this.initWeapons();
        this.initPlayers();

        console.log(this.grid);
    }
    get height() {
        return this.grid.length;
    }

    get width() {
        return this.grid[0].length;
    }
    isEmpty(x, y) {
        return this.grid[y][x] instanceof Empty;
    }

    initWalls() {
        const nbWalls = getRandom(10, 15);
        const wallsAsset = this.assets.walls;

        for (let i = 0; i < nbWalls; i++) {
            let { x, y } = this.findEmptyCase();
            const wallAsset = wallsAsset[getRandom(0, wallsAsset.length - 1)];
            this.grid[y][x] = new Wall(x, y, wallAsset.asset);
        }
    }
    initWeapons() {
        const nbWeapons = getRandom(4, 8);
        const weaponsAsset = this.assets.weapons;

        for (let i = 0; i < nbWeapons; i++) {
            let { x, y } = this.findEmptyCase();
            const weaponAsset = weaponsAsset[getRandom(1, weaponsAsset.length - 1)];
            this.grid[y][x] = new Weapon(x, y, weaponAsset);
        }
    }

    initPlayers() {

        let { x: x1, y: y1 } = this.findEmptyCase();

        this.player1 = new Player(1, x1, y1, this.assets.player1, 100,
            new Weapon(0, 0, this.assets.weapons[0], 10));
        this.grid[y1][x1] = this.player1;


        let { x: x2, y: y2 } = this.findEmptyCase();

        this.player2 = new Player(2, x2, y2, this.assets.player2, 100,
            new Weapon(0, 0, this.assets.weapons[0], 10));
        this.grid[y2][x2] = this.player2;
    }
    findEmptyCase() {
        let x = 0;
        let y = 0;

        do {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        } while (!this.isEmpty(x, y));

        return { x, y };
    }


    display() {
        let context = this.canvas.getContext('2d');

        if (context === null) {
            throw new Error('Context isn\'t good');
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let acase = this.grid[y][x];

                context.drawImage(this.assets.background, x * this.caseSize, y * this.caseSize, this.caseSize, this.caseSize);
                if (acase.isAccessible) {
                    context.drawImage(this.assets.step, x * this.caseSize, y * this.caseSize, this.caseSize, this.caseSize);
                }

                if (acase.asset) {
                    context.drawImage(acase.asset, x * this.caseSize, y * this.caseSize, this.caseSize, this.caseSize);
                }
            }
        }
    }



}