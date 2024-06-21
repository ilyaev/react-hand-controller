"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickElementByCoordinates = exports.getClickElement = exports.calculateAngleBetweenLines = exports.vectorSubtract = exports.distance3d = exports.distance = void 0;
const distance = (x1, y1, x2, y2) => {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};
exports.distance = distance;
const distance3d = (x1, y1, z1, x2, y2, z2) => {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const zDiff = z2 - z1;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff + zDiff * zDiff);
};
exports.distance3d = distance3d;
const vectorSubtract = (a, b) => {
    return a.map((v, i) => v - b[i]);
};
exports.vectorSubtract = vectorSubtract;
const calculateAngleBetweenLines = (x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) => {
    // Calculate the vectors representing the lines
    const vector1 = {
        x: x2 - x1,
        y: y2 - y1,
        z: z2 - z1,
    };
    const vector2 = {
        x: x4 - x3,
        y: y4 - y3,
        z: z4 - z3,
    };
    // Calculate the dot product of the vectors
    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    // Calculate the magnitudes of the vectors
    const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y + vector1.z * vector1.z);
    const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y + vector2.z * vector2.z);
    // Calculate the angle using the dot product formula
    const angleInRadians = Math.acos(dotProduct / (magnitude1 * magnitude2));
    // Convert the angle to degrees
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
};
exports.calculateAngleBetweenLines = calculateAngleBetweenLines;
function getClickElement(x, y) {
    let element = document.elementFromPoint(x, y);
    // If the element is a canvas, keep searching for elements behind it
    while (element && element.tagName.toLowerCase() === "canvas") {
        element = element.parentElement;
    }
    return element;
}
exports.getClickElement = getClickElement;
function clickElementByCoordinates(x, y, detail = 0) {
    // Get the element at the specified coordinates.
    let element = getClickElement(x, y);
    // Create a mouse event to simulate a click.
    const clickEvent = new MouseEvent("click", {
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true,
        detail,
    });
    // Dispatch the click event on the element.
    if (element) {
        element.dispatchEvent(clickEvent);
    }
    else {
        console.error(`No element found at coordinates: ${x}, ${y}`);
    }
}
exports.clickElementByCoordinates = clickElementByCoordinates;
