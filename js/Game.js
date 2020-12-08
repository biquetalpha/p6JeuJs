class Game {
    constructor(canvas, width, height, caseSize, assets) {
        this.map = new Map(canvas, 10, 10, caseSize, assets);
        this.canvas = canvas;

        this.map.display();


        this.width = width;
        this.height = height;
        this.caseSize = caseSize;
    }
    async start() {
        this.currentPlayerId = 1;

        do {
            let currentPlayer = undefined;
            if (this.currentPlayerId === 1) {
                currentPlayer = this.map.player1;
            } else {
                currentPlayer = this.map.player2;
            }

            this.updateAccessible(currentPlayer);
            await this.movePlayer(currentPlayer);
        } while (!this.isFinished());
    }

    isFinished() {
        return true;
    }



    async movePlayer(currentPlayer) {
        let aCase = undefined;
        do {
            const positionCaseClicked = await this.waitClickOnMap();

            aCase = this.map.grid[positionCaseClicked.y][positionCaseClicked.x];
        } while (!aCase.isAccessible);


        this.updateAccessible(currentPlayer, true);
        this.updateCatchable(currentPlayer, true)
        this.map.grid[currentPlayer.y][currentPlayer.x] = new Empty(currentPlayer.x, currentPlayer.y);
        this.map.grid[aCase.y][aCase.x] = currentPlayer;
        this.map.display();
    }

    async waitClickOnMap() {
        const event = await EventListenerPromisify.waitClick(this.canvas);

        let boundingClientRect = this.canvas.getBoundingClientRect();
        return new Position(
            Math.floor((event.clientX - boundingClientRect.x) / this.caseSize),
            Math.floor((event.clientY - boundingClientRect.y) / this.caseSize)
        );
    }

    updateAccessible(currentPlayer) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const acase = this.map.grid[y][x];
                acase.isAccessible = false;
            }
        }

        let isAccessibleTop = true;
        let isAccessibleBottom = true;
        let isAccessibleLeft = true;
        let isAccessibleRight = true;
        for (let offset = 1; offset <= 3; offset++) {
            if (currentPlayer.y - offset >= 0) {
                const acaseTop = this.map.grid[currentPlayer.y - offset][currentPlayer.x];

                if (isAccessibleTop) {
                    if (acaseTop.isSolid()) {
                        isAccessibleTop = false;
                    } else {
                        acaseTop.isAccessible = true;
                    }
                }
            }
            if (currentPlayer.y + offset < this.height) {
                const acaseBottom = this.map.grid[currentPlayer.y + offset][currentPlayer.x];

                if (isAccessibleBottom) {
                    if (acaseBottom.isSolid()) {
                        isAccessibleBottom = false;
                    } else {
                        acaseBottom.isAccessible = true;
                    }
                }
            }
            if (currentPlayer.x - offset >= 0) {
                const acaseLeft = this.map.grid[currentPlayer.y][currentPlayer.x - offset];

                if (isAccessibleLeft) {
                    if (acaseLeft.isSolid()) {
                        isAccessibleLeft = false;
                    } else {
                        acaseLeft.isAccessible = true;
                    }
                }
            }
            if (currentPlayer.x + offset < this.width) {
                const acaseRight = this.map.grid[currentPlayer.y][currentPlayer.x + offset];

                if (isAccessibleRight) {
                    if (acaseRight.isSolid()) {
                        isAccessibleRight = false;
                    } else {
                        acaseRight.isAccessible = true;
                    }
                }
            }
            this.map.display();

        }
    }

    updateCatchable(currentPlayer) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const acase = this.map.grid[y][x];
                acase.isCatchable = false;
            }
        }

        let isCatchableTop = true;
        let isCatchableBottom = true;
        let isCatchableLeft = true;
        let isCatchableRight = true;
        for (let offset = 1; offset <= 3; offset++) {
            if (currentPlayer.y - offset >= 0) {
                const acaseTop = this.map.grid[currentPlayer.y - offset][currentPlayer.x];
                if (isCatchableTop) {
                    if (acaseTop.isAccessible === true) {
                        if (acaseTop.isCatchable()) {
                            isCatchableTop = true;
                        }
                    }
                }

            }
            if (currentPlayer.y + offset < this.height) {
                const acaseBottom = this.map.grid[currentPlayer.y + offset][currentPlayer.x];
                if (isCatchableBottom) {
                    if (acaseBottom.isAccessible === true) {
                        if (acaseBottom.isCatchable()) {
                            isCatchableBottom = true;
                        }
                    }
                }
            }
            if (currentPlayer.x - offset >= 0) {
                const acaseLeft = this.map.grid[currentPlayer.y][currentPlayer.x - offset];
                if (isCatchableLeft) {
                    if (acaseLeft.isAccessible === true) {
                        if (acaseLeft.isCatchable()) {
                            isCatchableLeft = true;
                        }
                    }
                }
            }
            if (currentPlayer.x + offset < this.width) {
                const acaseRight = this.map.grid[currentPlayer.y][currentPlayer.x + offset];
                if (isCatchableRight) {
                    if (acaseRight.isAccessible === true) {
                        if (acaseRight.isCatchable()) {
                            isCatchableRight = true;
                        }
                    }
                }
            }

        }

        this.map.display();
    }

}