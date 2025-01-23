# ImgToAsciiJS

ImgToAscii is a JavaScript library that converts images to ASCII art. It supports both colored and non-colored ASCII art.

## Installation

To use ImgToAscii, simply import the ImgToAscii.js file into your project. 

## Usage

Here is an example of how to use ImgToAscii:
```javascript
import ImgToAscii from "./ImgToAscii.js";

let img = new Image();
img.src = 'img.png';
img.width = 100;
img.height = 100;
img.onload = () => {
    const ascii = ImgToAscii(img);
    const coloredAscii = ImgToAscii(img, true);
    const coloredAsciiDotted = ImgToAscii(img, true, true);
    ascii.width = 300;
    ascii.height = 300;
    coloredAscii.width = 300;
    coloredAscii.height = 300;
    coloredAsciiDotted.width = 300;
    coloredAsciiDotted.height = 300;
    document.body.appendChild(ascii);
    document.body.appendChild(coloredAscii);
    document.body.appendChild(coloredAsciiDotted);
};
```

In this example:  
An image is loaded from img.png.
The image is converted to ASCII art using the ImgToAscii function.
Both non-colored and colored ASCII art versions are created.
A colored and dotted ASCII art is also created.
The ASCII art images are resized to 300x300 pixels.
The ASCII art images are appended to the document body.
