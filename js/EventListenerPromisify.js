class EventListenerPromisify {
    static async waitClick(canvas) {
        let mouseEvent = await new Promise(resolve => {
            canvas.addEventListener('click', ev => {
                resolve(ev);
            }, { once: true });
        });

        return mouseEvent;
    }
    static async waitClickFight() {
        let player1AttackButton = document.getElementById("Player1Attack");

        let mouseEvent = await new Promise(resolve => {
            player1AttackButton.addEventListener('click', ev => {
                resolve(ev);
            }, { once: true });
        });

        return mouseEvent;
    }
    static async waitClickDefense() {
        let player1DefenseButton = document.getElementById("Player1Defense");
        let mouseEvent = await new Promise(resolve => {
            player1DefenseButton.addEventListener('click', ev => {
                resolve(ev);
            }, { once: true });
        });

        return mouseEvent;
    }
}