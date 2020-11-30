let canvas = document.querySelector('#board');
canvas.width = 600;
canvas.height = 600;

if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('No Canvas Element');
}
start(canvas);


async function start(canvas) {
    let assetsLoader = new AssetLoader();
    await assetsLoader.initAssets();

    if (!assetsLoader.assets) {
        throw new Error('Assets not loaded');
    }

    let game = new Game(canvas, 10, 10, assetsLoader.assets);
    game.start();


}