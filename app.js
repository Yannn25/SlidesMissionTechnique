document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    
    // Variables de contrôle
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Initialisation
    init();
    
    // Fonction d'initialisation
    function init() {
        // Afficher le nombre total de slides
        totalSlidesElement.textContent = totalSlides;
        
        // Afficher la première slide
        updateCurrentSlide();
        
        // État initial des boutons de navigation
        updateNavigationButtons();
        
        // Gestionnaires d'événements pour les boutons
        prevBtn.addEventListener('click', goToPreviousSlide);
        nextBtn.addEventListener('click', goToNextSlide);
        
        // Naviguer avec les touches flèches
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToPreviousSlide();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
            }
        });
    }
    
    // Aller à la slide précédente
    function goToPreviousSlide() {
        if (currentSlideIndex > 0) {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex--;
            slides[currentSlideIndex].classList.add('active');
            updateCurrentSlide();
            updateNavigationButtons();
        }
    }
    
    // Aller à la slide suivante
    function goToNextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex++;
            slides[currentSlideIndex].classList.add('active');
            updateCurrentSlide();
            updateNavigationButtons();
        }
    }
    
    // Mettre à jour l'affichage du numéro de slide actuel
    function updateCurrentSlide() {
        currentSlideElement.textContent = currentSlideIndex + 1;
    }
    
    // Activer/désactiver les boutons selon la position
    function updateNavigationButtons() {
        // Désactiver le bouton "Précédent" si on est à la première slide
        prevBtn.disabled = currentSlideIndex === 0;
        
        // Désactiver le bouton "Suivant" si on est à la dernière slide
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }

    // Ajout d'une fonction pour aller directement à une slide spécifique
    // (pourrait être utile pour ajouter une table des matières cliquable dans le futur)
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = index;
            slides[currentSlideIndex].classList.add('active');
            updateCurrentSlide();
            updateNavigationButtons();
        }
    }
    
    // Exposer les fonctions pour un usage potentiel dans la console (debug)
    window.presentationControls = {
        next: goToNextSlide,
        previous: goToPreviousSlide,
        goTo: goToSlide,
        getCurrentSlide: () => currentSlideIndex + 1,
        getTotalSlides: () => totalSlides
    };
});