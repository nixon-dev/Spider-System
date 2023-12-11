
//CODIGO PRINCIPAL DE LA PAGINA DE ADD STUDENT
document.getElementById('students-teacher').addEventListener('click', function() {
    buildStudentPage();//Este código imrpime el diseño de tabla de HTML para mostrar los datos del estudiante
    
    
    // Handle add student modal
    handleModal('addStudentModal', 'add-student-button');
    
    // Obtner los datos del estudiante y mostrarlos en la tabla
    getStudentsData(displayStudents);

    // Función para buscar estudiantes en la tabla por nombre, apellido o correo
    searchStudents();

    // Función para actualizar la tabla de estudiantes según el filtro seleccionado
    updateStudentTable();

});