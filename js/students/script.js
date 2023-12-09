document.getElementById('toggle-sidebar').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar-student');
    var content = document.getElementById('content-student');

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