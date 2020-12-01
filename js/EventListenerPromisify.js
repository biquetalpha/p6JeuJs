class EventListenerPromisify {
    static async waitClick(canvas) {
        let mouseEvent = await new Promise(resolve => {
            canvas.addEventListener('click', ev => {
                resolve(ev);
            }, { once: true });
        });

        return mouseEvent;
    }
}