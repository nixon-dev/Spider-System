// Función para manejar los modales 
function handleModal(modalId, buttonId) {
    var modal = document.getElementById(modalId);
    var modalInstance = new bootstrap.Modal(modal, {});

    modal.addEventListener('show.bs.modal', function () {
        modal.classList.add('d-flex', 'align-items-center', 'justify-content-center');
    });

    modal.addEventListener('hidden.bs.modal', function () {
        modal.classList.remove('d-flex', 'align-items-center', 'justify-content-center');
    });

    document.getElementById(buttonId).addEventListener('click', function() {
        modalInstance.show();
    });
}


// Función para obtener la lista de estudiantes
function getStudentsData(callback) {
    db.collection("users").onSnapshot((querySnapshot) => {
        const students = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().Role === 'Student') {
                const student = doc.data();
                student.id = doc.id;
                students.push(student);
            }
        });
        callback(students);
    });
}


// Función para mostrar los estudiantes en la tabla
function displayStudents(students) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const studentNumber = index + 1;
        tableBody.innerHTML += `
            <tr>
                <th scope="row">${studentNumber}</th>
                <th scope="row">${student.Email}</th>
                <td>${student.Lastname}</td>
                <td>${student.Name}</td>
                <td>${student.Turn}</td>
                <td>${student['Path Learning']}</td>
                <td>${student.Category}</td>
                <td><button class="btn btn-danger delete-button" data-id="${student.id}">Delete</button></td>
                <td><button class="btn btn-warning edit-button" data-id="${student.id}">Edit</button></td>
            </tr>
        `;
    });

    // Agrega los event listeners a los botones de eliminar y editar
    document.querySelectorAll('.delete-button').forEach(function (button) {
        button.addEventListener('click', function () {
            const docId = this.getAttribute('data-id');
            db.collection('users').doc(docId).delete().then(() => {
                console.log('Document successfully deleted!');
                this.closest('tr').remove();
            }).catch((error) => {
                console.error('Error removing document: ', error);
            });
        });
    });

    document.querySelectorAll('.edit-button').forEach(function (button) {
        button.addEventListener('click', function () {
            const studentId = this.getAttribute('data-id');
            openEditModal(studentId);
        });
    });
}


// Función para abrir el modal de edición con los datos del estudiante
function openEditModal(studentId) {
    db.collection('users').doc(studentId).get().then((doc) => {
        const student = doc.data();
        document.getElementById('email-student-edit').value = student.Email;
        document.getElementById('name-student-edit').value = student.Name;
        document.getElementById('lastname-student-edit').value = student.Lastname;
        document.getElementById('turn-student-edit').value = student.Turn;
        document.getElementById('path-learning-student-edit').value = student['Path Learning'];
        document.getElementById('category-student-edit').value = student.Category;

        // Abre el modal de edición
        const modalElement = document.getElementById('editStudentModal');
        const modalInstance = new bootstrap.Modal(modalElement, {});
        modalInstance.show();

        // Evento de clic para el botón de edición
        document.getElementById('edit-student-button').addEventListener('click', function () {
            // Recoge los valores del formulario
            student.Email = document.getElementById('email-student-edit').value;
            student.Name = document.getElementById('name-student-edit').value;
            student.Lastname = document.getElementById('lastname-student-edit').value;
            student.Turn = document.getElementById('turn-student-edit').value;
            student["Path Learning"] = document.getElementById('path-learning-student-edit').value;
            student.Category = document.getElementById('category-student-edit').value;

            // Actualiza el documento
            db.collection('users').doc(studentId).set(student).then(() => {
                console.log('Estudiante actualizado con éxito');
                modalInstance.hide();
            }).catch((error) => {
                console.error('Error al actualizar el estudiante: ', error);
            });
        });
    });
}


// Función para manejar la búsqueda de estudiantes
function searchStudents() {
    const searchInput = document.getElementById('search-student-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function () {
        const searchQuery = searchInput.value.toLowerCase();

        getStudentsData(function (students) {
            const filteredStudents = students.filter((student) => {
                const studentName = student.Name.toLowerCase();
                const studentLastname = student.Lastname.toLowerCase();
                const studentEmail = student.Email.toLowerCase();

                return studentName.includes(searchQuery) || studentLastname.includes(searchQuery) || studentEmail.includes(searchQuery);
            });

            displayStudents(filteredStudents);
        });
    });
}


// Función para manejar la actualización de la tabla de estudiantes
function updateStudentTable() {
    const categorySelect = document.getElementById('filter-category');
    const orderSelect = document.getElementById('filter-order');
    const turnSelect = document.getElementById('filter-turn');
    const pathSelect = document.getElementById('filter-path');

    const filterOptions = [categorySelect, orderSelect, turnSelect, pathSelect];
    if (filterOptions.some(option => !option)) {
        console.error('One or more select elements not found');
        return;
    }

    const filterChangeHandler = () => {
        getStudentsData(function (students) {
            const selectedCategory = categorySelect.value;
            const selectedOrder = orderSelect.value;
            const selectedTurn = turnSelect.value;
            const selectedPath = pathSelect.value;

            let filteredStudents = students.filter((student) =>
                (selectedCategory === "" || student.Category === selectedCategory) &&
                (selectedTurn === "" || student.Turn === selectedTurn) &&
                (selectedPath === "" || student['Path Learning'] === selectedPath)
            );

            if (selectedOrder === 'asc') {
                filteredStudents.sort((a, b) => a.Lastname.localeCompare(b.Lastname));
            } else {
                filteredStudents.sort((a, b) => b.Lastname.localeCompare(a.Lastname));
            }

            displayStudents(filteredStudents);
        });
    };

    filterOptions.forEach(option => {
        option.addEventListener('change', filterChangeHandler);
    });

    // Agrega un event listener al botón "clear-filters"
    const clearFiltersButton = document.getElementById('clear-filters');
    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', () => {
            // Resetea todos los select a su valor por defecto
            filterOptions.forEach(option => {
                option.selectedIndex = 0;
            });

            // Actualiza la tabla
            filterChangeHandler();
        });
    }

    filterChangeHandler();
}

