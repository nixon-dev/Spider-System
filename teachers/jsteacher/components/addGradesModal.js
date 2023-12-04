// Obtén los elementos necesarios
const addGradesCategory = document.getElementById('add-grades-category');
const selectLevel = document.getElementById('select-level-grades');
const newGradesCategory = document.getElementById('new-row-category');
const saveChangesButton = document.getElementById('add-grades');

// Función para crear una nueva fila de categoría de calificaciones
function createGradeRow() {
    const newRow = document.createElement('div');
    newRow.classList.add('row', 'grade-row');
    newRow.innerHTML = `
        <div class="col-sm-3">
            <label for="category" class="form-label">Select category</label>
            <select class="form-select select-category">
                <option selected value="">Choose category...</option>
                <option value="VNC">VNC</option>
                <option value="QUIZIZ">QUIZIZ</option>
                <option value="PROJECT">PROJECT</option>
                <option value="PLM">PLM</option>
                <option value="EXPOSITION">EXPOSITION</option>
                <option value="APRECIATION">APRECIATION</option>
            </select>
        </div>
        <div class="col-sm-3">
            <label for="quantify" class="form-label">Grades Quantity</label>
            <input type="number" class="form-control input-quantity">
        </div>
        <div class="col-sm-3">
            <label for="percentage" class="form-label">Percentage</label>
            <input type="number" class="form-control input-percentage">
        </div>
        <div class="col-sm-3 d-flex align-items-center justify-content-center">
            <i class="fas fa-trash-alt trash-category" style="margin-top: 30px;"></i>
        </div>
    `;
    newGradesCategory.appendChild(newRow);

     // Agrega un controlador de eventos al elemento 'select-category' que actualiza el atributo de datos 'category' cuando el usuario selecciona una categoría
     const selectCategoryElement = newRow.querySelector('.select-category');
     selectCategoryElement.addEventListener('change', function() {
         newRow.dataset.category = this.value;
     });
}

// Función para manejar el evento de clic en 'addGradesCategory'
function handleAddGradesCategoryClick(e) {
    e.preventDefault(); // Evitar que el formulario se envíe
    e.stopPropagation(); // Detener la propagación del evento

    if (selectLevel.value === '') {
        alert('Please choose a level first.');
    } else {
        createGradeRow();
    }
}

// Función para guardar los cambios en Firebase
function saveChangesToFirebase() {
    const gradeRows = document.querySelectorAll('.grade-row');

    gradeRows.forEach(row => {
        const selectCategory = row.querySelector('.select-category').value;
        const inputQuantity = parseInt(row.querySelector('.input-quantity').value);
        const inputPercentage = parseInt(row.querySelector('.input-percentage').value);

        if (selectCategory === '' || isNaN(inputQuantity) || isNaN(inputPercentage)) {
            alert('Please fill in all fields.');
        } else {
            const selectedLevel = selectLevel.value;

            getStudentsDataByLevel(function(students) {
                students.forEach(student => {
                    let updates = {};
                    updates[`${selectCategory}.Percentage`] = inputPercentage;

                    // Obtén la cantidad actual de columnas para la categoría seleccionada
                    let currentQuantity = 0;
                    if (student[selectCategory]) {
                        currentQuantity = Object.keys(student[selectCategory]).length - 1; // Restamos 1 para excluir el campo 'Percentage'
                    }

                    if (inputQuantity > currentQuantity) {
                        // Agrega las columnas adicionales
                        for (let i = currentQuantity + 1; i <= inputQuantity; i++) {
                            updates[`${selectCategory}.${selectCategory} ${i}`] = 0;
                        }
                    } else if (inputQuantity < currentQuantity) {
                        // Elimina las columnas adicionales
                        for (let i = currentQuantity; i > inputQuantity; i--) {
                            updates[`${selectCategory}.${selectCategory} ${i}`] = firebase.firestore.FieldValue.delete();
                        }
                    }

                    db.collection('users').doc(student.id).update(updates)
                    .then(() => {
                        console.log('Category ' + selectCategory + ' updated for ' + student.Name + ' ' + student.Lastname);
                    }).catch(error => {
                        console.error('Error updating category:', error);
                    });
                });
            }, selectedLevel);
        }
    });
}

// Función para manejar el evento de cambio en 'newGradesCategory'
function handleNewGradesCategoryChange(e) {
    if (e.target.classList.contains('select-category')) {
        const row = e.target.parentElement.parentElement;
        row.dataset.category = e.target.value; // Establece la categoría en el atributo de datos
    }
}

// Función para eliminar una fila de categoría de calificaciones
function deleteGradeRow(e) {
    if (e.target.classList.contains('trash-category')) {
        const row = e.target.parentElement.parentElement;
        const selectCategoryElement = row.querySelector('.select-category');
        const category = selectCategoryElement.value; // Obtiene la categoría del elemento select

        if (category) {
            // Desactiva el controlador de eventos
            newGradesCategory.removeEventListener('click', deleteGradeRow);

            // Obtén el nivel seleccionado
            const selectedLevel = selectLevel.value;

            // Elimina el campo en Firebase
            getStudentsDataByLevel(function(students) {
                students.forEach(student => {
                    db.collection('users').doc(student.id).update({
                        [category]: firebase.firestore.FieldValue.delete() // Usa la categoría como clave
                    }).then(() => {
                        console.log('Category ' + category + ' deleted for ' + student.Name + ' ' + student.Lastname);

                        // Reactiva el controlador de eventos
                        newGradesCategory.addEventListener('click', deleteGradeRow);
                    }).catch(error => {
                        console.error('Error deleting category:', error);
                    });
                });
            }, selectedLevel); // Pasa el nivel seleccionado como segundo argumento

            // Elimina la fila en la interfaz de usuario
            row.remove();
        } else {
            console.log('No category selected for this row:', row);
        }
    }
}

// Objeto para almacenar el porcentaje total para cada nivel
let totalPercentages = {};

// Función para verificar el porcentaje total
function checkTotalPercentage(e) {
    let selectLevel = document.getElementById('select-level-grades');
    let level = selectLevel.value;
    let percentageInputs = document.querySelectorAll('.input-percentage'); // Cambiado a selector de clase
    let totalPercentage = 0;
    
    percentageInputs.forEach(input => {
        totalPercentage += Number(input.value);
    });
    
    totalPercentages[level] = totalPercentage;
    
    if (totalPercentage > 100) {
        alert('Total percentage for ' + level + ' exceeds 100%. Please adjust the percentages.');
        e.target.value = ''; // Clear the input field
    }
}

// Agregar escuchas de eventos a elementos necesarios
function addEventListeners() {
    selectLevel.addEventListener('change', handleAddGradesCategoryClick);
    addGradesCategory.addEventListener('click', handleAddGradesCategoryClick);
    saveChangesButton.addEventListener('click', saveChangesToFirebase);
    newGradesCategory.addEventListener('change', handleNewGradesCategoryChange);
    newGradesCategory.addEventListener('click', deleteGradeRow);
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('input-percentage')) {
            checkTotalPercentage(e);
        }
    });
    selectLevel.addEventListener('change', function(e) {
        totalPercentages = {};
    });
}

// Llamada a la función para agregar escuchas de eventos
addEventListeners();
