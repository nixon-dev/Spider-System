
//SECTION MAIN HOME
function loadHomeStudent() {
    let homeContainer =  `
            <!-- Section main Box -->
            <div class="container-fluid mt-5">
            <!-- Welcome message -->
            <div class="text-center">
                <h1 class="text-center fs-1 fs-sm-2 fs-md-3 fs-lg-4 fs-xl-5" id="welcome-message"><span id="user-name"></span> <i class="fa-solid fa-face-laugh-wink" style="color: #ffd333;"></i></h1>
                <p class="lead">"Shaping Your Future, One Lesson at a Time"</p>
            </div>

            <!-- Cards -->
            <div class="row mt-5">
                <!-- Home card -->
                <div class="col-sm-12 col-md-6 mb-4">
                    <div class="card h-100" id="home-card">
                        <div class="card-body text-center">
                            <i class="fas fa-home fa-2x mb-3 text-primary"></i>
                            <h5 class="card-title">Home</h5>
                            <p class="card-text">Access the main screen.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Profile card -->
                <div class="col-sm-12 col-md-6 mb-4">
                    <div class="card h-100" id="profile-card">
                        <div class="card-body text-center">
                            <i class="fas fa-user fa-2x mb-3 text-primary"></i>
                            <h5 class="card-title">Profile</h5>
                            <p class="card-text">View your profile.</p>
                        </div>
                    </div>
                </div>


                <!-- Grades card -->
                <div class="col-sm-12 col-md-6 mb-4">
                    <div class="card h-100" id="grades-card">
                        <div class="card-body text-center">
                            <i class="fas fa-book-open fa-2x mb-3 text-primary"></i>
                            <h5 class="card-title">Grades</h5>
                            <p class="card-text">View your grades.</p>
                        </div>
                    </div>
                </div>

                <!-- Homework card -->
                <div class="col-sm-12 col-md-6 mb-4">
                    <div class="card h-100" id="homework-card">
                        <div class="card-body text-center">
                            <i class="fas fa-pencil-alt fa-2x mb-3 text-primary"></i>
                            <h5 class="card-title">Homework</h5>
                            <p class="card-text">View homework</p>
                        </div>
                    </div>
                </div>
            </div>
    `;

    document.getElementById('content-student').innerHTML = homeContainer;

    // Get all the cards
    let cards = document.querySelectorAll('.card');

    // Add a click event to each card
    cards.forEach(function(card, index) {
        card.addEventListener('click', function(e) {
            // Prevent the default link behavior
            e.preventDefault();

            // Call the corresponding function based on the index
            switch (index) {
                case 0:
                    loadHomeStudent();
                    break;
                case 1:
                    showStudentInfo();
                    break;
                case 2:
                    loadGradesStudent();
                    break;
                case 3:
                    loadHomeworkStudent();
                    break;
            }
        });
    });

    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    let name = "Welcome, " + doc.data().Name;
                    let index = 0;
    
                    function animateName() {
                        document.getElementById('user-name').textContent += name[index];
                        index++;
                        if (index < name.length) {
                            setTimeout(animateName, 200);
                        } else {
                            // Almacena el texto animado en la sessionStorage cuando la animación se completa
                            sessionStorage.setItem('animatedText', name);
                        }
                    }
    
                    // Si el texto animado ya está en la sessionStorage, úsalo
                    // Si no, ejecuta la animación
                    if (sessionStorage.getItem('animatedText')) {
                        document.getElementById('user-name').textContent = sessionStorage.getItem('animatedText');
                    } else {
                        animateName();
                    }
                } else {
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
}

// Carga la sección de inicio cuando se carga la página
loadHomeStudent();

// Agrega un evento de clic a cada elemento de la barra lateral
document.getElementById('home-student').addEventListener('click', loadHomeStudent);
