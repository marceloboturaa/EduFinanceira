document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica do Carrossel Automático
    const sliderTrack = document.querySelector('.slider-track');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    if (sliderTrack && galleryImages.length > 0) {
        // Limpa o track e adiciona as fotos da galeria
        sliderTrack.innerHTML = ''; 
        
        // Criamos duas vezes as imagens para o loop ser infinito e fluido
        const createImgs = () => {
            galleryImages.forEach(img => {
                const newImg = document.createElement('img');
                newImg.src = img.src;
                sliderTrack.appendChild(newImg);
            });
        };

        createImgs();
        createImgs(); // Dobra para o efeito "seamless"
    }

    // 2. Animações de Scroll (AOS manual simplificado)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.card, .bncc-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = '0.6s ease-out';
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Puxar imagens da galeria para o carrossel da Home
    const sliderTrack = document.querySelector('.slider-track');
    const galleryContainer = document.querySelector('.masonry-gallery');

    // Se estivermos na index, procuramos as fotos que estão listadas na galeria.html (ou via array)
    if (sliderTrack) {
        const photos = [
            "IMG_20260307_152257.jpg", "IMG_20260307_152438.jpg", "IMG_20260307_152625.jpg", 
            "IMG_20260307_152836.jpg", "IMG_20260307_153246.jpg", "IMG_20260307_153407.jpg",
            "IMG_20260307_154514.jpg", "IMG_20260307_154926.jpg", "IMG_20260307_155132.jpg"
            // O JS pode carregar todas as 59 aqui
        ];

        const content = photos.map(img => `<img src="imagens/${img}">`).join('');
        sliderTrack.innerHTML = content + content; // Duplica para o loop infinito
    }
});