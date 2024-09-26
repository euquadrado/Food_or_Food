const images = [
    'imagens/1.webp',
    'imagens/15.webp',
    'imagens/2.jpeg',
    'imagens/3.jpeg',
    'imagens/4.jpeg',
    'imagens/5.jpeg',
    'imagens/6.jpeg',
    'imagens/7.jpeg',
    'imagens/8.jpeg',
    'imagens/9.jpeg',
    'imagens/10.jpeg',
    'imagens/11.jpeg',
    'imagens/12.jpeg',
    'imagens/13.jpeg',
    'imagens/14.jpeg',
    'imagens/16.jpeg',
    'imagens/17.jpeg',
    'imagens/18.jpeg',
    'imagens/19.jpeg',
    'imagens/20.jpeg',
    'imagens/21.jpeg',
    'imagens/22.jpeg',

    
    
    
];

let lastChosenImage = '';
let currentImageA = '';
let currentImageB = '';
let usedImages = new Set();

window.onload = function() {
    const imageA = document.getElementById('imageA');
    const imageB = document.getElementById('imageB');

    
    loadNewImages();
}

function getUniqueRandomImage(exclude = '') {
    let availableImages = images.filter(img => !usedImages.has(img) && img !== exclude);

    if (availableImages.length === 0) {
        // Se não há imagens disponíveis, retorna null
        return null;
    }

    let randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    usedImages.add(randomImage);
    return randomImage;
}

function loadNewImages() {
    const imageA = document.getElementById('imageA');
    const imageB = document.getElementById('imageB');

    // Se já foram usadas todas as imagens, exibe a imagem vencedora
    if (usedImages.size >= images.length) {
        showFinalChoice();
        return;
    }

    let newImageA = getUniqueRandomImage();
    let newImageB = getUniqueRandomImage(newImageA);

    // Se não há imagens novas, exibe a imagem vencedora
    if (newImageB === null) {
        showFinalChoice();
        return;
    }

    imageA.src = newImageA;
    imageB.src = newImageB;
}

function chooseOption(option) {
    const imageA = document.getElementById('imageA');
    const imageB = document.getElementById('imageB');

    if (option === 'A') {
        lastChosenImage = imageA.src;
        currentImageB = getUniqueRandomImage(currentImageA);

        if (currentImageB === null) {
            // Não há mais imagens novas para exibir, mostrar a imagem vencedora
            showFinalChoice();
            return;
        }

        imageB.src = currentImageB;
    } else {
        lastChosenImage = imageB.src;
        currentImageA = getUniqueRandomImage(currentImageB);

        if (currentImageA === null) {
            // Não há mais imagens novas para exibir, mostrar a imagem vencedora
            showFinalChoice();
            return;
        }

        imageA.src = currentImageA;
    }
}

function showFinalChoice() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <h2>Sua Comida Favorita:</h2>
        <img src="${lastChosenImage}" alt="Sua Comida Favorita: " style="
            max-width: 80%; /* Ajuste a largura máxima conforme necessário */
            max-height: 80vh; /* Ajuste a altura máxima conforme necessário */
            object-fit: contain; /* Mantém a imagem proporcional sem cortar */
            border-radius: 5px; 
            margin-top: 10px;
        ">
    `;



    
    document.getElementById('buttons').style.display = 'none';
}
