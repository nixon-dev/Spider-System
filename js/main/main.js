document.getElementById('register-link').addEventListener('click', function(e) {
    e.preventDefault();
  
    // Hide the signin form
    document.getElementById('signin-form').style.display = 'none';
  
    // Show the signup form
    document.getElementById('signup-form').style.display = 'block';
});


// Function to calculate the average of a set of grades
function calculateAverage(grades) {
    let sum = 0;
    let count = 0;
    for (let grade in grades) {
        // Check if the grade name contains a number
        if (/\d/.test(grade)) {
            sum += parseFloat(grades[grade]);
            count++;
        }
    }
    return sum / count;
}

// Function to calculate the weighted average of a set of grades
function calculateWeightedAverage(student) {
    let total = 0;
    let totalPercentage = 0;
    for (let category in student) {
        // Check if the category is an object and contains grades
        if (typeof student[category] === 'object' && student[category] !== null) {
            let categoryAverage = calculateAverage(student[category]);
            let categoryPercentage = parseFloat(student[category].Percentage) / 100;
            total += categoryAverage * categoryPercentage;
            totalPercentage += categoryPercentage;
        }
    }
    return total / totalPercentage;
}

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
