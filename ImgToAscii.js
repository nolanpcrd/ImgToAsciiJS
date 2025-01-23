export default function ImgToAscii(img, colored = false, dotted = false) {
    let pixels = createPixelsArray(img);
    let characters = changeEachPixelToCharacter(pixels, dotted);
    return createAsciiCanvas(characters, img.width, img.height, colored);
}

function createPixelsArray(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, img.width, img.height);
    let imageData = context.getImageData(0, 0, img.width, img.height);
    let pixels = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const [r, g, b] = imageData.data.slice(i, i + 3);
        pixels.push([r, g, b]);
    }
    return pixels;
}

const characters = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."];

function getCharacterForPixel(pixel) {
    let grayscale = convertToGrayscale(pixel);
    let index = Math.floor((grayscale / 255) * (characters.length - 1));
    return characters[index];
}

function convertToGrayscale(pixel) {
    return 0.2126 * pixel[0]+ 0.7152 * pixel[1] + 0.0722 * pixel[2];
}

function changeEachPixelToCharacter(pixels, dotted) {
    if (dotted){
        return pixels.map(pixel => ({
            color: pixel,
            character: "o"
        }));
    }
    return pixels.map(pixel => ({
        color: pixel,
        character: getCharacterForPixel(pixel)
    }));
}

function createAsciiCanvas(pixels, width, height, colored) {
    const charWidth = 6;
    const charHeight = 10;

    const canvas = document.createElement("canvas");
    canvas.width = width * charWidth;
    canvas.height = height * charHeight;

    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = `${charHeight}px monospace`;
    context.textBaseline = "top";

    let x = 0;
    let y = 0;

    for (let i = 0; i < pixels.length; i++) {
        const { character, color } = pixels[i];
        if (colored){
            context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        }
        else {
            context.fillStyle = "black";
        }
        context.fillText(character, x, y);

        x += charWidth;
        if ((i + 1) % width === 0) {
            x = 0;
            y += charHeight;
        }
    }

    const img = new Image();
    img.src = canvas.toDataURL("image/png");
    img.width = width;
    img.height = height;
    return img;
}
