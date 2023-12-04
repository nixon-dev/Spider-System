document.getElementById("logout-icon").addEventListener("click", function() {
    auth.signOut().then(() => {
      // Redirige al usuario a la página de inicio de sesión después de cerrar la sesión
      window.location.href = "../public/index.html";
    }).catch((error) => {
      // Maneja los errores aquí
      console.error(error);
    });
});

  auth.onAuthStateChanged(user => {
    if (user) {
        // El usuario está autenticado, puedes mostrar las calificaciones
        showGrades();

        // Obtén los datos del usuario de Firebase
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                // Obtiene el nombre del usuario
                let name = "Welcome, " + doc.data().Name;

                // Inicializa el índice
                let index = 0;

                // Crea la función de animación
                function animateName() {
                    // Agrega el carácter en la posición del índice al elemento HTML
                    document.getElementById('user-name').textContent += name[index];

                    // Incrementa el índice
                    index++;

                    // Si el índice es menor que la longitud de la cadena, llama a la función después de un retraso
                    if (index < name.length) {
                        setTimeout(animateName, 200);  // 500ms de retraso entre cada carácter
                    }
                }

                // Llama a la función por primera vez
                animateName();
            } else {
                // El documento no existe
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    } else {
        // El usuario no está autenticado
        console.log("No user logged in");
    }
});

// Obtiene la tabla de estudiantes
let tableGrades = document.getElementById("tableGrade");

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

// Function to generate grades HTML
function generateGradesHTML(gradesData, gradeType) {
    let gradesHTML = '';
    if (gradesData) {
        gradesHTML = '<table class="w-100"><tr>';
        let sortedKeys = Object.keys(gradesData).sort((a, b) => {
            let matchA = a.match(/\d+/);
            let matchB = b.match(/\d+/);
            if (matchA && matchB) {
                return matchA[0] - matchB[0];
            } else {
                return 0;
            }
        });
        for (let grade of sortedKeys) {
            // Check if the grade name contains a number
            if (/\d/.test(grade)) {
                let gradeClass = getGradeClass(gradesData[grade]);
                gradesHTML += `<td class="border"><strong>${grade}:</strong> <br><span class="${gradeClass}">${gradesData[grade]}</span></td>`;
            }
        }
        gradesHTML += '</tr></table>';
    }
    return gradesHTML;
}

// Function to show grades
function showGrades() {
    if (auth.currentUser) {
        const email = auth.currentUser.email;
        console.log(email)
        db.collection("users").where("Email", "==", email)
        .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    let tableGrade = document.getElementById("tableGrade");
                    let data = doc.data();
                    console.log(data); 

                    let vncGrades = generateGradesHTML(data.VNC, 'VNC');
                    let quizesGrades = generateGradesHTML(data.QUIZIZ, 'QUIZIZ');
                    let projectGrades = generateGradesHTML(data.PROJECT, 'PROJECT');
                    let plmGrades = generateGradesHTML(data.PLM, 'PLM');

                    // Calculate the weighted average
                    let weightedAverage = calculateWeightedAverage(data);

                    // Get the grade class for the average
                    let averageClass = getGradeClass(weightedAverage);

    
                        tableGrade.innerHTML = `
                                <table class="table mb-5 table-animation fixed-layout">
                                <thead>
                                    <tr>
                                        <th scope="col" colspan="6" class="navy-blue">Personal Information</th>
                                    </tr>
                                    <tr class="row-header">
                                        <th scope="col">Email</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Lastname</th>
                                        <th scope="col">Turn</th>
                                        <th scope="col">Path Learning</th>
                                        <th scope="col">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">${doc.data().Email}</th>
                                        <td>${doc.data().Name}</td>
                                        <td>${doc.data().Lastname}</td>
                                        <td>${doc.data().Turn}</td>
                                        <td>${doc.data()['Path Learning']}</td>
                                        <td>${doc.data().Category}</td>
                                    </tr>
                                    <tr class="row-header">
                                        <th scope="col" colspan="6" class="navy-blue">Your Grades</th>
                                    </tr>
                                    <tr>
                                        <td colspan="6" class="border">
                                            <div class="flex-row">
                                                <div class="flex-cell no-border header">VNC Grades (40%)</div>
                                                <div class="flex-cell no-border header">Quiziz Grades (25%)</div>
                                                <div class="flex-cell no-border header">Project Grades (25%)</div>
                                                <div class="flex-cell no-border header">PLM Grades (10%)</div>
                                            </div>
                                            <div class="flex-row">
                                                <div class="flex-cell no-border"><span class="${getGradeClass(vncGrades)}">${vncGrades}</span></div>
                                                <div class="flex-cell no-border"><span class="${getGradeClass(quizesGrades)}">${quizesGrades}</span></div>
                                                <div class="flex-cell no-border"><span class="${getGradeClass(projectGrades)}">${projectGrades}</span></div>
                                                <div class="flex-cell no-border"><span class="${getGradeClass(plmGrades)}">${plmGrades}</span></div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="custom-row-height">
                                    <th class="navy-blue align-right" colspan="6">Your Average is: <br><span id="average" class="${averageClass}"> ${weightedAverage.toFixed(2)}</span></th>
                                    </tr>
                                </tfoot>
                            </table>
                    `;
                    });
                    
                }
            });
        }else{
            console.log("No user logged in");
        }
};

