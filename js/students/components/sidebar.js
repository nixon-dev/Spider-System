// Función para actualizar los estilos en función del tamaño de la ventana y del estado del sidebar
function updateStyles() {
    var sidebar = document.getElementById('sidebar-student');
    var content = document.getElementById('content-student');
    var footer = document.getElementById('footer');
    var menuIcon = document.getElementById('menu-icon');

    if (window.innerWidth <= 768) {
        sidebar.classList.add('active');
        content.style.width = '100%';
        content.style.marginLeft = '0';
        footer.style.marginLeft = '0';
        menuIcon.style.display = 'block';
    } else {
        content.style.marginLeft = sidebar.classList.contains('active') ? '80px' : '250px';
        footer.style.marginLeft = sidebar.classList.contains('active') ? '80px' : '250px'; 
    }
}

// Al cargar la página
window.addEventListener('DOMContentLoaded', updateStyles);

// Al cambiar el tamaño de la ventana
window.addEventListener('resize', updateStyles);

document.getElementById('toggle-student').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar-student');
    var content = document.getElementById('content-student');
    var footer = document.getElementById('footer'); 
    var menuIcon = document.getElementById('menu-icon');

    // Agrega o quita la clase 'active' al sidebar
    sidebar.classList.toggle('active');

    // Muestra u oculta el ícono de menú
    menuIcon.style.display = sidebar.classList.contains('active') && window.innerWidth <= 768 ? 'block' : 'none';

    if (window.innerWidth <= 768) {
        // En pantallas pequeñas, el contenido principal ocupa todo el ancho de la pantalla
        content.style.width = '100%';
        content.style.marginLeft = '0';
    } else if (sidebar.classList.contains('active')) {
        // Si el sidebar está activo (colapsado), ajusta el margen izquierdo del contenido principal a 80px
        content.style.marginLeft = '80px';
        footer.style.marginLeft = '80px';
    } else {
        // Si el sidebar no está activo (expandido), ajusta el margen izquierdo del contenido principal a 250px
        content.style.marginLeft = '250px';
        footer.style.marginLeft = '250px';
    }
});

// Agrega un evento de clic al ícono de menú
document.getElementById('menu-icon').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar-student');
    var menuIcon = document.getElementById('menu-icon');

    // Agrega o quita la clase 'active' al sidebar
    sidebar.classList.toggle('active');

    // Muestra u oculta el ícono de menú
    menuIcon.style.display = sidebar.classList.contains('active') && window.innerWidth <= 768 ? 'block' : 'none';
    
});

// Agrega un evento de clic a cada sección del sidebar
var sections = document.querySelectorAll('#sidebar-student div');
sections.forEach(function(section) {
    section.addEventListener('click', function() {
        var sidebar = document.getElementById('sidebar-student');
        var content = document.getElementById('content-student');
        var menuIcon = document.getElementById('menu-icon');
        var body = document.body;

        // En pantallas pequeñas, colapsa el sidebar, muestra el contenido de la sección y muestra el ícono de menú
        if (window.innerWidth <= 768) {
            sidebar.classList.add('active');
            content.style.width = '100%';
            content.style.marginLeft = '0';
            menuIcon.style.display = 'block';

            // Muestra la barra de desplazamiento cuando haces clic en una sección
            body.style.overflow = 'auto';
        }
    });

    
});

document.getElementById('darkmode').addEventListener('click', function() {
    console.log("Click event triggered"); // Esto se imprimirá en la consola cuando se haga clic en el botón de modo oscuro

    document.body.classList.toggle('dark-mode');
    let darkmode = document.getElementById('icon-moom');
    let lightmode = document.getElementById('icon-sun');
    let modeText = document.querySelector('#darkmode span');

    if (document.body.classList.contains('dark-mode')) {
        console.log("Dark mode activated"); // Esto se imprimirá en la consola cuando se active el modo oscuro

        lightmode.style.display = 'block';
        darkmode.style.display = 'none';
        modeText.textContent = 'Light Mode';
        modeText.classList.add('text-lightmode');
        modeText.classList.remove('text-warning');
    } else {
        console.log("Dark mode deactivated"); // Esto se imprimirá en la consola cuando se desactive el modo oscuro

        lightmode.style.display = 'none';
        darkmode.style.display = 'block';
        modeText.textContent = 'Dark Mode';
        modeText.classList.add('text-warning');
        modeText.classList.remove('text-lightmode');
    }
});