// Función para mostrar los estudiantes en la tabla
function displayGrades(students) {
    let table = `
        <button class='btn btn-primary d-flex justify-content-end align-items-center save-grades-button' style='width: 150px;'>
            <span>Save grades</span>
        </button>

        <div class="scrollbar" id="scrollbar-top">
            <div style='min-width: 2000px;'></div>
        </div>

        <div class="table-responsive scrollbar" id="scrollbar-bottom">

            <table class="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Lastname</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
    `;

    // Agrega las columnas de categorías
    for (let category in categories) {
        for (let i = 1; i <= categories[category]; i++) {
            table += `<th scope="col">${category} ${i}</th>`;
        }
    }

    // Agrega la columna de Average
    table += `<th scope="col">Average</th></tr></thead><tbody id="table-grades" class="table-group-divider">`;

    students.forEach((student) => {
        table += `<tr><td>${student.Lastname}</td><td>${student.Name}</td><th scope="row">${student.Email}</th>`;
        
        let total = 0;
        let count = 0;

        for (let category in categories) {
            for (let i = 1; i <= categories[category]; i++) {
                // Obtiene la nota existente
                let grade = _.get(student, `${category}.${category} ${i}`, '');
                if (grade) {
                    total += parseFloat(grade);
                    count++;
                }
                table += `<td><input type="text" class="form-control grade-input" id="${category} ${i}-${student.id}" value="${grade}" style='width:85px;'></td>`;
            }
        }

        let average = count > 0 ? total / count : 0;
        table += `<td><input type="text" class="form-control" value="${average.toFixed(2)}" readonly style='width:70px;'></td>`;
        
        table += `</tr>`;
    });

    table += ` 
                </tbody>
            </table>

        </div>

        <button class='btn btn-primary d-flex justify-content-end align-items-center save-grades-button' style='width: 150px;'>
            <span>Save grades</span>
        </button>
    `;

    document.getElementById('table-container').innerHTML = table;

    let scrollbarTop = document.getElementById('scrollbar-top');
    let scrollbarBottom = document.getElementById('scrollbar-bottom');
    
    scrollbarTop.onscroll = function() {
        scrollbarBottom.scrollLeft = scrollbarTop.scrollLeft;
    };
    
    scrollbarBottom.onscroll = function() {
        scrollbarTop.scrollLeft = scrollbarBottom.scrollLeft;
    };

    // Agrega un controlador de eventos al botón 'save-grades-button'
    let saveGradesButton = document.getElementById('save-grades-button');
    if (!saveGradesButton.onclick) {
        saveGradesButton.addEventListener('click', function() {
            // Deshabilita el botón y muestra el indicador de carga
            saveGradesButton.disabled = true;
            saveGradesButton.innerHTML = `
            <div class="container-loading">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;

            // Obtén el nivel seleccionado
            const selectedLevel = document.getElementById('select-level').value;
        
            // Obtén la lista de estudiantes para el nivel seleccionado
            getStudentsDataByLevel((students) => {
                // Recorre cada estudiante
                students.forEach((student) => {
                    // Crea un objeto para almacenar las actualizaciones de las calificaciones
                    let gradeUpdates = {};

                    // Para cada estudiante, recorre cada categoría
                    for (let category in categories) {
                        for (let i = 1; i <= categories[category]; i++) {
                            // Obtiene la nota del campo de entrada correspondiente
                            let gradeInput = document.getElementById(`${category} ${i}-${student.id}`);
                            let grade = parseFloat(gradeInput.value);
                            if (!isNaN(grade)) {
                                // Agrega la actualización de la calificación al objeto
                                gradeUpdates[`${category}.${category} ${i}`] = grade;
                            }
                        }
                    }

                    // Actualiza todas las calificaciones a la vez
                    db.collection('users').doc(student.id).update(gradeUpdates).then(() => {
                        console.log('Grades saved successfully.');
                    }).catch((error) => {
                        console.error('Error saving grades: ', error);
                    });
                });

                // Después de guardar todas las calificaciones, obtén la lista de estudiantes para el nivel seleccionado
                getStudentsDataByLevel((students) => {
                    // Muestra las calificaciones
                    displayGrades(students);

                    // Habilita el botón y oculta el indicador de carga
                    saveGradesButton.disabled = false;
                    saveGradesButton.innerHTML = 'Save grades';
                }, selectedLevel);
            }, selectedLevel);
        });
    }

    // Después de crear la tabla...
    document.querySelectorAll('.grade-input').forEach((input) => {
        input.addEventListener('input', function() {
            // Obtiene el ID del estudiante y la categoría del ID del campo de entrada
            const parts = this.id.split('-');
            const categoryNumber = parts[0].split(' ');
            const category = categoryNumber[0];
            const studentId = parts[1];

            // Obtiene la nueva calificación
            let grade = parseFloat(this.value);

            // Formatea la calificación con un decimal y la convierte en una cadena
            grade = grade.toFixed(1);

            // Actualiza la calificación en Firebase
            if (!isNaN(grade)) {
                const docRef = db.collection('users').doc(studentId);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        docRef.update({
                            [`${category}.${category} ${categoryNumber[1]}`]: grade
                        }).then(() => {
                            console.log('Grade updated successfully.');
                        }).catch((error) => {
                            console.error('Error updating grade: ', error);
                        });
                    } else {
                        console.error('No such document!');
                    }
                }).catch((error) => {
                    console.error('Error getting document:', error);
                });
            }
        });
    });

    // Agrega un controlador de eventos a los filtros: 
    var filterLastname = document.getElementById('filter-lastanme');
    var filterRound = document.getElementById('filter-round');
    var filterLearning = document.getElementById('filter-learning');
    var clearFilter = document.getElementById('clear-filter');

    // Agrega un controlador de eventos a cada filtro
    filterLastname.addEventListener('change', updateGradesTable);
    filterRound.addEventListener('change', updateGradesTable);
    filterLearning.addEventListener('change', updateGradesTable);

    // Agrega un controlador de eventos al botón de limpiar filtros
    clearFilter.addEventListener('click', function() {
        // Restablece los valores de los filtros
        filterLastname.value = '';
        filterRound.value = '';
        filterLearning.value = '';

        // Actualiza la tabla de calificaciones
        updateGradesTable();
    });

    // Función para actualizar la tabla de calificaciones
    function updateGradesTable() {
        // Obtén los valores actuales de los filtros
        var lastname = filterLastname.value;
        var turn = filterRound.value;
        var pathLearning = filterLearning.value;

        // Filtra la lista de estudiantes
        var filteredStudents = students.filter(function(student) {
            return (!lastname || student.Lastname === lastname) &&
                (!turn || student.Turn === turn) &&
                (!pathLearning || student['Path Learning'] === pathLearning);
        });

        // Muestra los estudiantes filtrados en la tabla
        displayGrades(filteredStudents);
    }
}