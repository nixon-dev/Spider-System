
// Funcion para recuperar los datos de los estudiantes por nivel
function getGradesDataByLevel(level, callback) {
    db.collection("users").where("Role", "==", "Student").where("Category", "==", level)
    .get()
    .then((querySnapshot) => {
        const students = [];
        querySnapshot.forEach((doc) => {
            const student = doc.data();
            student.id = doc.id;
            students.push(student);
        });
        callback(students);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

// Agrega un controlador de eventos para el cambio en 'select-level-grades'
selectLevel.addEventListener('change', function(e) {
    // Borra todas las filas existentes
    newGradesCategory.innerHTML = '';

    // Crea un objeto vacío para almacenar las categorías que ya has procesado
    const processedCategories = {};

    // Obtén los datos de Firebase para todos los estudiantes en el nivel seleccionado
    getGradesDataByLevel(e.target.value, function(students) {
        // Para cada estudiante
        students.forEach(student => {
            // Para cada propiedad en los datos del estudiante
            for (const property in student) {
                // Si la propiedad no es una categoría, ignórala
                if (property === 'Role' || property === 'Category' || property === 'id' || typeof student[property] !== 'object') continue;

                // Si la propiedad es una categoría y no está en el objeto de categorías procesadas
                if (!processedCategories[property]) {
                    // Crea una nueva fila
                    createGradeRow();

                    // Llena los campos con los datos de la categoría
                    const newRow = newGradesCategory.lastChild;
                    newRow.querySelector('.select-category').value = property;
                    newRow.querySelector('.input-quantity').value = Object.keys(student[property]).length - 1; // Resta 1 para excluir 'Percentage'
                    newRow.querySelector('.input-percentage').value = student[property].Percentage;

                    // Agrega la categoría al objeto de categorías procesadas
                    processedCategories[property] = true;
                }
            }
        });
    });
});



// Function to normalize decimal value
function normalizeDecimal(value) {
    return value.replace(',', '.');
}

// Function to clamp grade value
function clampGrade(value) {
    value = normalizeDecimal(value);
    let numValue = parseFloat(value);
    if (!isNaN(numValue)) {
        if (numValue < 2.0) {
            return "2.0";
        } else if (numValue > 5.0) {
            return "5.0";
        } else {
            return numValue.toFixed(1);
        }
    }
    return value;
}

// Add event listener to grade input fields
document.addEventListener('change', function(e) {
    if (e.target.id === 'grade') {
        e.target.value = clampGrade(e.target.value);
    }
});
