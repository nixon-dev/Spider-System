
// JavaScript para abrir y cerrar el sidebar
document.getElementById('toggle-sidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

// JavaScript para abrir y cerrar el sidebar en pantallas pequeñas
document.querySelector('.menu').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

