class Game {
    constructor(canvas, width, height, caseSize, assets) {
        this.map = new Map(canvas, 10, 10, caseSize, assets);
        this.canvas = canvas;
        this.map.display();
        this.width = width;
        this.height = height;
        this.caseSize = caseSize;
    }

    //=====================initialisation du jeu=====================
    async start() {
        this.currentPlayerId = 1;
        this.count = 0;
        do {
            let currentPlayer = this.map["player" + ((this.count % 2) + 1)];
            this.updateAccessible(currentPlayer);
            await this.movePlayer(currentPlayer);
            this.count++;
            console.log("round:", this.count);
            this.updatePlayerDistance();
        } while (this.MovementIsFinished());
    }


    MovementIsFinished() {
        if (this.startFight)
            return true;
        else {
            return false;
        }

    }

    updatePlayerDistance() {
        let player1 = this.map.player1;
        let player2 = this.map.player2;
        let distanceX = (player1.x - player2.x) ** 2;
        let distanceY = (player1.y - player2.y) ** 2;

        let distance = (distanceX + distanceY) ** 0.5;
        console.log("distance:", distance);

        if (distance <= 1) {
            this.startFight();
        }
    }


    //=====================combat=====================



    async startFight() { //initialise le combat et  contient les fonctions de ce dernier
        console.log("fight start");
        this.currentPlayerId = 1;
        this.count = 0;
        do {
            let currentPlayer = this.map["player" + ((this.count % 2) + 1)];

            await this.onClickFight(currentPlayer); // attent le clic sur le bouton d'attaque ou defense
            this.count++;
            console.log("fightround:", this.count, "joueur:", currentPlayer);
        } while (!this.isFinished());

    }
    isFinished() {
        let player1Life = this.map.player1.life;
        let player2Life = this.map.player2.life;
        if ((player1Life || player2Life) === 0) {
            return true;
        } else {
            return false;
        }
    }


    async onClickFight(currentPlayer) { //lit les click sur bouton suivant le joueur qui joue 

        let clickFight = await EventListenerPromisify.waitClickFight();
        let clickDefense = await EventListenerPromisify.waitClickDefense();
        if (clickFight) {
            this.updatePlayerLife(currentPlayer);
            console.log("attaque!");
        } else if (clickDefense) {
            this.updatePlayerDefense(currentPlayer);
        }

    }

    updatePlayerLife(currentPlayer) { // met a jour la vie restante du joueur

        let updatedPlayer1Life = this.map.player1.life - this.map.player2.weapon.damage;
        let updatedPlayer2Life = this.map.player2.life - this.map.player1.weapon.damage;


        if (currentPlayer === this.map.player1) {
            updatedPlayer2Life;
            console.log("player 2, vie restante:", updatedPlayer2Life);
        } else if (currentPlayer === this.map.player2) {
            updatedPlayer1Life;
            console.log("player 1, vie restante:", updatedPlayer1Life);
        }
    }
    updatePlayerDefense() {
        console.log("defense");
    }


    //=====================deplacements=====================


    async movePlayer(currentPlayer) {
        let aCase = undefined;
        do {
            const positionCaseClicked = await this.waitClickOnMap();

            aCase = this.map.grid[positionCaseClicked.y][positionCaseClicked.x];
        } while (!aCase.isAccessible);

        this.updateAccessible(currentPlayer, true);

        let currentPosition = {
            x: currentPlayer.x,
            y: currentPlayer.y
        };
        let moveAxis = (currentPlayer.x === aCase.x) ? 'y' : 'x';
        let moveDirection = ((aCase)[moveAxis] > (currentPlayer)[moveAxis]) ? 1 : -1;
        for ((currentPosition)[moveAxis] += moveDirection;
            (currentPosition)[moveAxis] !== (aCase)[moveAxis] + moveDirection;
            (currentPosition)[moveAxis] += moveDirection) {
            await new Promise(resolve => {
                setTimeout(resolve, 250);
            });
            this.changeCase(currentPlayer, this.map.grid[currentPosition.y][currentPosition.x]);
            this.map.display();
        }

    }

    changeCase(currentPlayer, aCase) {
        if (currentPlayer.weaponToLet) {
            console.log(currentPlayer.weaponToLet);
            currentPlayer.weaponToLet.x = currentPlayer.x;
            currentPlayer.weaponToLet.y = currentPlayer.y;
            this.map.grid[currentPlayer.y][currentPlayer.x] = currentPlayer.weaponToLet;

            currentPlayer.weaponToLet = undefined;
        } else {
            this.map.grid[currentPlayer.y][currentPlayer.x] = new Empty(currentPlayer.x, currentPlayer.y);
        }

        if (aCase instanceof Weapon) {
            currentPlayer.weaponToLet = currentPlayer.weapon;
            currentPlayer.weapon = aCase;
        }
        this.map.grid[aCase.y][aCase.x] = currentPlayer;
        currentPlayer.x = aCase.x;
        currentPlayer.y = aCase.y;
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


}