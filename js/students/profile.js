// Function to show student info
function showStudentInfo() {
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

                    contentStudent.innerHTML = `
                        <div class="d-flex justify-content-center align-items-center container-profile">
                            <form id="profile-form-student" class="container custom-form">
                                <div class="row">
                                    <div class="upload-image mb-3 col-12 text-center">
                                        <label for="profile-picture"><i class="fas fa-user user-profile custom-icon"></i></label>
                                        <p id="textRol">Role: <span id="roleStudent"></span></p>
                                        <p id="textRol" style='font-weight: bold;'><span id="emailStudent"></span></p>
                                    </div>
                                </div>
                        
                                <div class="row">
                                    <div class="input-container mb-3 col-12 col-lg-6">
                                        <label for="first-name">Name</label>
                                        <input class="form-control form-control-lg" type="text" id="nameStudent" name="first-name" readonly>
                                    </div>
                                            
                                    <div class="input-container mb-3 col-12 col-lg-6">
                                        <label for="last-name">Lastname</label>
                                        <input class="form-control form-control-lg" type="text" id="lastnameStudent" name="last-name" readonly>
                                    </div>      
                                </div>
                        
                                <div class="row"> 
                                    <div class="input-container mb-3 col-12 col-lg-6">
                                        <label id="label-course-category" for="course-category">Path Learning:</label>
                                        <input class="form-control form-control-lg" type="text" id="pathLearningStudent" name="pathlearning" readonly>
                                    </div>
                                
                                    <div class="input-container mb-3 col-12 col-lg-6">
                                        <label for="school">Turn</label>
                                        <input class="form-control form-control-lg" type="text" id="turnStudent" name="turn" readonly>
                                    </div>   
                                </div>
                        
                                <div class="row">

                                    <div class="input-container mb-3 col-12 col-lg-6">
                                        <label for="school">Level</label>
                                        <input class="form-control form-control-lg" type="text" id="levelStudent" name="level" readonly>
                                    </div>

                                    <div class="input-container mb-3 col-12 col-lg-6 position-relative">
                                        <label for="passwordStudent">Password</label>
                                        <input class="form-control form-control-lg" type="password" id="passwordStudent" name="password" readonly>
                                        <button id="togglePassword" class="position-absolute toggle-password" type="button"><i class="fa fa-eye"></i></button>
                                    </div>

                                </div>
                                <!--Code Button Submit
                                <div class="row">
                                    <div class="col-12 d-flex justify-content-end">
                                        <input id="saveChangesStudent" type="submit" value="Save Changes" class="btn btn-primary btn-fixed-width">
                                    </div>
                                </div>
                                -->
                            </form>
                        </div>
                    `;

                    // Get the input elements
                    let roleStudent = document.getElementById('roleStudent'); 
                    let emailStudent = document.getElementById('emailStudent');
                    let nameStudent = document.getElementById('nameStudent');
                    let lastnameStudent = document.getElementById('lastnameStudent');
                    let pathLearningStudent = document.getElementById('pathLearningStudent');
                    let turnStudent = document.getElementById('turnStudent');
                    let levelStudent = document.getElementById('levelStudent');
                    let passwordStudent = document.getElementById('passwordStudent');

                    // Update the values of the input elements
                    roleStudent.textContent = data.Role;
                    emailStudent.textContent = data.Email;
                    nameStudent.value = data.Name;
                    lastnameStudent.value = data.Lastname;
                    pathLearningStudent.value = data['Path Learning'];
                    turnStudent.value = data.Turn;
                    levelStudent.value = data.Category;
                    passwordStudent.value = data.Password;

                    document.getElementById('togglePassword').addEventListener('click', function (e) {
                        const passwordInput = document.getElementById('passwordStudent');
                        const togglePasswordButton = document.getElementById('togglePassword');
                        if (passwordInput.type === "password") {
                            passwordInput.type = "text";
                            togglePasswordButton.innerHTML = '<i class="fa fa-eye"></i>';
                        } else {
                            passwordInput.type = "password";
                            togglePasswordButton.innerHTML = '<i class="fa fa-eye-slash"></i>';
                        }
                    });
                });
            }
        });
    }
}

// Agrega un controlador de eventos de clic a la sección de perfil
document.getElementById('profile-student').addEventListener('click', showStudentInfo); // Asegúrate de que 'profile-section' es el ID correcto de tu sección de perfil
