
//SECTION MAIN HOME

function loadHomeSection() {
    let homeContainer =  `
            <!-- Section main Box -->
            <div class="container-fluid mt-5 container">
            <!-- Welcome message -->
            <div class="text-center">
                <h1 class="display-4">Welcome to Spider System</h1>
                <p class="lead">"Empowering the Future, One Student at a Time"</p>
            </div>

            <!-- Cards -->
            <div class="row mt-5">
                <!-- Home card -->
                <div class="col-sm-12 col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-home fa-2x mb-3 text-primary"></i>
                                <h5 class="card-title">Home</h5>
                                <p class="card-text">Access the main screen.</p>
                            </div>
                        </div>
                </div>
                
                <!-- Profile card -->
                <div class="col-sm-12 col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-user fa-2x mb-3 text-primary"></i>
                                <h5 class="card-title">Profile</h5>
                                <p class="card-text">View and edit your profile.</p>
                            </div>
                        </div>
                </div>

                <!-- Add student card -->
                <div class="col-sm-12 col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-user-plus fa-2x mb-3 text-primary"></i>
                                <h5 class="card-title">Add Student</h5>
                                <p class="card-text">Add a new student.</p>
                            </div>
                        </div>
                </div>

                <!-- View grade card -->
        <div class="col-sm-12 col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-eye fa-2x mb-3 text-primary"></i>
                        <h5 class="card-title">View Grades</h5>
                        <p class="card-text">View student grades.</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('content-teacher').innerHTML = homeContainer;

    // Get all the cards
    let cards = document.querySelectorAll('.card');

    // Add a click event to each card
    cards.forEach(function(card, index) {
        card.addEventListener('click', function(e) {
            // Prevent the default link behavior
            e.preventDefault();

            // Get the sections
            let sections = document.querySelectorAll('#home-teacher, #profile-teacher, #students-teacher, #grades-teacher');

            // Simulate a click on the corresponding section
            sections[index].click();
        });
    });
}

// Carga la sección de inicio cuando se carga la página
loadHomeSection();

// También puedes llamar a loadHomeSection cuando se hace clic en la sección de inicio en la barra lateral
document.getElementById('home-teacher').addEventListener('click', loadHomeSection);

