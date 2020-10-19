// @see https://stackoverflow.com/a/8809472
export function uuid() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// @see https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/math/random
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Gets the width + height of a DOM element
function getElementSize(element) {
    return [
        element.width.baseVal.value,
        element.height.baseVal.value
    ];
}

// translate mouse position pixel coordinates → viewport coordinates
export function pixelToViewport(pixelX, pixelY, viewportElement, maxViewportX, maxViewportY) {
    const [viewPortX, viewPortY] = [...getElementSize(viewportElement)];

    // translate the pixel coordinates to the viewport coordinates
    let x = Math.ceil((pixelX / viewPortX) * maxViewportX);
    let y = Math.ceil((pixelY / viewPortY) * maxViewportY) - 1; // for some reason y is off by 1
    if (y < 0) y = 0;

    return [x, y];
}
