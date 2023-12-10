// Al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    var sidebar = document.getElementById('sidebar-student');
    var content = document.getElementById('content-student');
    var menuIcon = document.getElementById('menu-icon');

    // Si la pantalla es pequeña, colapsa el sidebar y muestra el ícono de menú
    if (window.innerWidth <= 768) {
        sidebar.classList.add('active');
        content.style.width = '100%';
        content.style.marginLeft = '0';
        menuIcon.style.display = 'block';
    }
});

document.getElementById('toggle-student').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar-student');
    var content = document.getElementById('content-student');
    var menuIcon = document.getElementById('menu-icon');

    // Agrega o quita la clase 'active' al sidebar
    sidebar.classList.toggle('active');

    // Muestra u oculta el ícono de menú
    menuIcon.style.display = sidebar.classList.contains('active') ? 'block' : 'none';

    if (window.innerWidth <= 768) {
        // En pantallas pequeñas, el contenido principal ocupa todo el ancho de la pantalla
        content.style.width = '100%';
        content.style.marginLeft = '0';
    } else if (sidebar.classList.contains('active')) {
        // Si el sidebar está activo (colapsado), ajusta el margen izquierdo del contenido principal a 80px
        content.style.marginLeft = '80px';
    } else {
        // Si el sidebar no está activo (expandido), ajusta el margen izquierdo del contenido principal a 250px
        content.style.marginLeft = '250px';
    }
});

// Agrega un evento de clic al ícono de menú
document.getElementById('menu-icon').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar-student');
    var menuIcon = document.getElementById('menu-icon');

    // Agrega o quita la clase 'active' al sidebar
    sidebar.classList.toggle('active');

    // Muestra u oculta el ícono de menú
    menuIcon.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
});

// Agrega un evento de clic a cada sección del sidebar
var sections = document.querySelectorAll('#sidebar-student div');
sections.forEach(function(section) {
    section.addEventListener('click', function() {
        var sidebar = document.getElementById('sidebar-student');
        var content = document.getElementById('content-student');
        var menuIcon = document.getElementById('menu-icon');

        // En pantallas pequeñas, colapsa el sidebar, muestra el contenido de la sección y muestra el ícono de menú
        if (window.innerWidth <= 768) {
            sidebar.classList.add('active');
            content.style.width = '100%';
            content.style.marginLeft = '0';
            menuIcon.style.display = 'block';
        }
    });
});

//FUNCTION TO PRINT THE COLOR ACORDING THE STUDENT'S GRADE
function getGradeClass(grade) {
    if (grade >= 0 && grade < 3.0) {
        return 'grade-low';
    } else if (grade >= 3.0 && grade < 4.0) {
        return 'grade-medium';
    } else if (grade >= 4.0 && grade <= 5.0) {
        return 'grade-high';
    } else {
        return '';
    }
}