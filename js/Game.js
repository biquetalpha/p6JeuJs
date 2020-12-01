class Game {
    constructor(canvas, width, height, assets) {
        this.map = new Map(canvas, 10, 10, assets);
        this.canvas = canvas;

        this.map.display();


        this.width = width;
        this.height = height;
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


    async movePlayer() {
        // console.log(await EventListenerPromisify.waitClick(this.canvas)); 
        canvas.addEventListener('click', handleClick, false);

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            console.log(canvas, message);
        }, false);

        function handleClick() {


            console.log('you clicked');
        }

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

        }

        this.map.display();
    }
}