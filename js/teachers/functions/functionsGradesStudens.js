// Variable Global
let categories = [];

//Funcion para seleccionar el nivel de los estudiantes
function generateSelectLevel() {
    return `
        <h2 class="text-center mt-3 mb-4 display-6">Add & View Grades</h2>
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-6">
                <div class="input-group">
                    <select class="custom-select form-control form-control-lg" id="select-level">
                        <option selected value="">Choose a level...</option>
                        <option value="Freshman">Freshman</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Kinder">Kinder</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

// Funcion para filtrar lista de estudiantes
function generateFilterStudents() {
    return `
        <div class="container mt-5 mb-4">
            <div class="row">
                <div class="col-12">
                    <div class="row">

                        <div class="col-12 col-sm-6 col-md-3 mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="height: 100%;"><i class="fas fa-sort"></i></span>
                                </div>
                                <select class="custom-select form-control" id="filter-lastanme" style="width: 150px;">
                                    <option selected value="">Sort by Lastname...</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-12 col-sm-6 col-md-3 mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="height: 100%;"><i class="fas fa-filter"></i></span>
                                </div>
                                <select class="custom-select form-control" id="filter-round" style="width: 150px;">
                                    <option selected value="">Filter by Turn...</option>
                                    <option value="A.M">A.M</option>
                                    <option value="P.M">P.M</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-3 mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" style="height: 100%;"><i class="fas fa-filter"></i></span>
                                </div>
                                <select class="custom-select form-control" id="filter-learning" style="width: 150px;">
                                    <option selected value="">Filter by Path Learning...</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Python">Python</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-3 mb-3">
                            <div class="input-group">
                            <button class="btn btn-outline-danger form-control" style="width: 150px;" id="clear-filter"><i class="fas fa-times"></i> Clear Filters</button>     
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        `;
}

// Función para mostrar los estudiantes en la tabla
function displayGrades(students) {
    let table = `
        <div class="d-flex justify-content-end mb-3">
            <button class='btn btn-primary d-flex justify-content-center align-items-center save-grades-button' style='width: 150px;'>
                <span>Save grades</span>
            </button>
        </div>
        
        <div class="scrollbar" id="scrollbar-top">
            <div style='min-width: 2000px;'></div>
        </div>

        <div class="table-responsive scrollbar" id="scrollbar-bottom">

            <table class="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Name</th>
    `;

    // Agrega las columnas de categorías
    for (let category in categories) {
        for (let i = 1; i <= categories[category]; i++) {
            table += `<th scope="col">${category} ${i}</th>`;
        }
    }

    // Agrega la columna de Average
    table += `<th scope="col">Average</th></tr></thead><tbody id="table-grades" class="table-group-divider">`;

    // Agrega un número de índice para cada estudiante
    let index = 1; // Inicia el índice en 1
    students.forEach((student) => {
        table += `<tr><td>${index}</td><td>${student.Lastname}</td><td>${student.Name}</td>`; // Agrega el índice a la fila
        index++; // Incrementa el índice para el próximo estudiante
        
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

        <div class="d-flex justify-content-end mt-3">
            <button class='btn btn-primary d-flex justify-content-center align-items-center save-grades-button' style='width: 150px;'>
                <span>Save grades</span>
            </button>
        </div>
    `;

    document.getElementById('table-container').innerHTML = table;

    // Después de que la tabla se haya añadido al DOM
    let tableWidth = document.querySelector('#scrollbar-bottom table').offsetWidth;
    document.querySelector('#scrollbar-top div').style.minWidth = `${tableWidth}px`;

    let scrollbarTop = document.getElementById('scrollbar-top');
    let scrollbarBottom = document.getElementById('scrollbar-bottom');
    
    scrollbarTop.onscroll = function() {
        scrollbarBottom.scrollLeft = scrollbarTop.scrollLeft;
    };
    
    scrollbarBottom.onscroll = function() {
        scrollbarTop.scrollLeft = scrollbarBottom.scrollLeft;
    };

    // Agrega un controlador de eventos al botón de guardar calificaciones
    let saveGradesButton = document.querySelectorAll('.save-grades-button');
    saveGradesButton.forEach(button => {
        button.addEventListener('click', function(){
            // Deshabilita el boton y muestra el indice de carga
            button.disabled = true;
            button.innerHTML =  `
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
                    button.disabled = false;
                    button.innerHTML = 'Save grades';
                }, selectedLevel);
            }, selectedLevel);
        });
    });

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

        // Ordena la lista de estudiantes
        var sortedStudents = students.sort(function(a, b) {
            if (lastname === 'asc') {
                return a.Lastname.localeCompare(b.Lastname);
            } else if (lastname === 'desc') {
                return b.Lastname.localeCompare(a.Lastname);
            } else {
                return 0;
            }
        });

       // Filtra la lista de estudiantes ordenada
       var filteredStudents = sortedStudents.filter(function(student) {
        var matchesTurn = !turn || student.Turn === turn;
        var matchesPathLearning = !pathLearning || student['Path Learning'].toLowerCase() === pathLearning.toLowerCase();
    
        console.log('Student:', student);
        console.log('Matches Turn:', matchesTurn);
        console.log('Matches Path Learning:', matchesPathLearning);
    
        return matchesTurn && matchesPathLearning;
    });

        console.log('Filtered students:', filteredStudents);

        // Muestra los estudiantes filtrados en la tabla
        displayGrades(filteredStudents);
    }
}

// Función para obtener la lista de estudiantes del nivel seleccionado
function getStudentsDataByLevel(callback, level) {
    db.collection("users").get().then((querySnapshot) => {
        const students = [];
        categories = {}; // Reinicia las categorías
        querySnapshot.forEach((doc) => {
            const student = doc.data();
            if (student.Role === 'Student' && student.Category === level) {
                student.id = doc.id;
                students.push(student);

                // Agrega las categorías del estudiante a las categorías
                for (let category in student) {
                    if (typeof student[category] === 'object' && student[category] !== null) {
                        // Solo cuenta las propiedades que terminan con un número
                        let gradeKeys = Object.keys(student[category]).filter(key => /\d+$/.test(key));
                        categories[category] = gradeKeys.length;
                    }
                }
            }
        });
        callback(students);
    });

    
}


// Función para construir la página completa de estudiantes por nivel
function buildGradePage() {
    const selectLevel = generateSelectLevel();
    const buttonAddStudent = generateButtonAddStudent("#addGradesModal", "add-grades-button", "Add Grades Categories");
    const filterStudents = generateFilterStudents();
    const fullHTML = `${selectLevel} ${buttonAddStudent} ${filterStudents} <div id="table-container"></div>`;
    document.getElementById('main-content').innerHTML = fullHTML;

    const addButton = document.getElementById('add-grades-button');
    const levelSelect = document.getElementById('select-level');

    // Inicialmente, deshabilita el botón hasta que se seleccione un nivel
    addButton.disabled = true;

    // Habilita el botón cuando se selecciona un nivel
    levelSelect.addEventListener('change', function() {
        addButton.disabled = this.value === '';
        const selectedLevel = this.value; // Obtén el nivel seleccionado
        getStudentsDataByLevel(displayGrades, selectedLevel); // Pasa el nivel seleccionado como segundo argumento
    });
}

