const colorPicker = document.getElementById('colorPicker');
const colorDiv = document.getElementById('colorDiv');
const hexColorInput = document.getElementById('hexColor');
const rgbColorInput = document.getElementById('rgbColor');
const hslColorInput = document.getElementById('hslColor');
const cmykColorInput = document.getElementById('cmykColor');
const rybColorInput = document.getElementById('rybColor');
const hslaColorInput = document.getElementById('hslaColor');
const hwbColorInput = document.getElementById('hwbColor');

colorPicker.addEventListener('input', function() {
    const selectedColor = colorPicker.value;
    colorDiv.style.backgroundColor = selectedColor;

    // Convertir el valor seleccionado en diferentes formatos de color
    const hexColor = selectedColor;
    const rgbColor = hexToRgb(hexColor);
    const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
    const cmykColor = rgbToCmyk(rgbColor.r, rgbColor.g, rgbColor.b);
    const rybColor = rgbToRyb(rgbColor.r, rgbColor.g, rgbColor.b);

    // Mostrar los valores en los input de texto correspondientes
    hexColorInput.value = hexColor;
    rgbColorInput.value = `(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
    hslColorInput.value = `(${Math.round(hslColor.h)}, ${Math.round(hslColor.s * 100)}%, ${Math.round(hslColor.l * 100)}%)`;
    cmykColorInput.value = `(${cmykColor.c}, ${cmykColor.m}, ${cmykColor.y}, ${cmykColor.k})`;
    rybColorInput.value = `(${rybColor.r}, ${rybColor.y}, ${rybColor.b})`;
    hslaColorInput.value = `(${Math.round(hslColor.h)}, ${Math.round(hslColor.s * 100)}%, ${Math.round(hslColor.l * 100)}%, 1)`;
    hwbColorInput.value = `(${Math.round(hslColor.h)}, ${Math.round(hslColor.l * 100)}%, ${Math.round(1 - hslColor.s * 100)}%)`;
});

// Función para convertir un valor hexadecimal en RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Función para convertir RGB en HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: h * 360, s, l };
}

// Función para convertir RGB en CMYK
function rgbToCmyk(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

// Función para convertir RGB en RYB
function rgbToRyb(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    const w = Math.min(r, g, b);
    r = r - w;
    g = g - w;
    b = b - w;
    const max = Math.max(r, g, b);

    if (max === 0) {
        return { r: r * 255, y: g * 255, b: b * 255 };
    }

    const n = Math.min(1 - r, 1 - g, 1 - b);
    const v = 1 - max;
    const y = n - v;
    const i = 1 / (n - v);

    return { r: Math.round((r + y) * 255), y: Math.round((y + v) * 255), b: Math.round((b + v) * 255) };
}