// Détecter le mode de couleur préféré et réagir aux changements
(function() {
    // Appliquer immédiatement pour éviter le flash
    applySystemTheme();
    
    // Détecteur de mode sombre
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Fonction qui gère le changement de mode
    function handleDarkModeChange(e) {
        const isDarkMode = e.matches;
        applyTheme(isDarkMode ? 'dark' : 'light');
    }
    
    // Fonction pour appliquer le thème actuel du système si aucun thème n'est sauvegardé
    function applySystemTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(isDarkMode ? 'dark' : 'light');
        }
    }
    
    // Fonction centrale pour appliquer un thème
    function applyTheme(theme) {
        const html = document.documentElement;
        
        // Supprimer les deux classes possibles
        html.classList.remove('dark', 'light');
        
        // Ajouter la classe appropriée
        html.classList.add(theme);
        localStorage.setItem('theme', theme);
        document.documentElement.style.colorScheme = theme;
        
        // Mettre à jour la meta tag theme-color
        const metaThemeColor = document.getElementById('theme-color');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#121212' : '#ffffff');
        }
        
        // Déclencher un événement personnalisé pour que React puisse le détecter
        const themeChangeEvent = new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        });
        document.dispatchEvent(themeChangeEvent);
        
        console.log(`Thème appliqué: ${theme}`);
    }
    
    // Utiliser addEventListener pour les navigateurs modernes
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    
    // Compatibilité pour Safari plus ancien qui utilise deprecated .addListener
    if (typeof darkModeMediaQuery.addListener === 'function') {
        darkModeMediaQuery.addListener(handleDarkModeChange);
    }
    
    // Vérifier s'il y a un thème enregistré au chargement
    document.addEventListener('DOMContentLoaded', function() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Appliquer selon les préférences système
            handleDarkModeChange(darkModeMediaQuery);
        }
    });
    
    // Écouter les changements de thème provenant de React
    document.addEventListener('reactThemeChange', function(e) {
        if (e.detail && (e.detail.theme === 'dark' || e.detail.theme === 'light')) {
            applyTheme(e.detail.theme);
        }
    });
    
    // Exposer la fonction applyTheme globalement pour permettre aux composants React de l'utiliser
    window.applyTheme = applyTheme;
})();
