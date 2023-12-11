function loadGradesStudent() {
    let gradesContainer = `
    `;

    document.getElementById('content-student').innerHTML = gradesContainer;
    showGrades();
}

document.getElementById('grades-student').addEventListener('click', loadGradesStudent);

    // Obtiene la tabla de estudiantes
    let contentStudent = document.getElementById("content-student");

    // Function to generate grades HTML
    function generateGradesHTML(gradesData, gradeType) {
        let gradesHTML = '';
        if (gradesData) {
            gradesHTML = '<div class="d-flex flex-column flex-md-row align-items-center justify-content-center">';
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
                    gradesHTML += `<div class="p-2 text-center"><strong>${grade}:</strong> <br><span class="${gradeClass}">${gradesData[grade]}</span></div>`;
                }
            }
            gradesHTML += '</div>';
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
                        let contentStudent = document.getElementById("content-student");
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

        
                            contentStudent.innerHTML = `
                               <div class='container'>
                                <div class="title-grades display-4 mb-4"><h2>Grades Information</h2></div>

                                <div class="flex-container">
                                    <div class="flex-row">
                                        <div class="flex-header" style='text-align: center;'>Your Grades</div>
                                    </div>
                                    <div class="flex-row">
                                        <div class="flex-cell cell-header grades-category">VNC Grades (40%)</div>
                                        <div class="flex-cell cell-grades grades">${vncGrades}</div>
                                    </div>
                                    <div class="flex-row">
                                        <div class="flex-cell cell-header grades-category">Quiziz Grades (25%)</div>
                                        <div class="flex-cell cell-grades grades">${quizesGrades}</div>
                                    </div>
                                    <div class="flex-row">
                                        <div class="flex-cell cell-header grades-category">Project Grades (25%)</div>
                                        <div class="flex-cell cell-grades grades">${projectGrades}</div>
                                    </div>
                                    <div class="flex-row">
                                        <div class="flex-cell cell-header grades-category">PLM Grades (10%)</div>
                                        <div class="flex-cell cell-grades grades">${plmGrades}</div>
                                    </div>
                                    <div class="flex-row">
                                        <div style='text-align: center;' class="flex-header flex-average">Your Average is: <br><span id="average" class="${averageClass}"> ${weightedAverage.toFixed(2)}</span></div>
                                    </div>
                                </div>
                             </div>
                        `;
                        });
                        
                    }
                });
            }else{
                console.log("No user logged in");
            }
    };
