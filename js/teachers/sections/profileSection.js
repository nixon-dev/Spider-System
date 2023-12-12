document.getElementById('profile-teacher').addEventListener('click', function() {
    var formHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <form id="profile-form" class="custom-form">
                <div class="row">
                    <div class="upload-image mb-3 col-12 text-center">
                        <label for="profile-picture"><i class="fas fa-user user-profile custom-icon"></i></label>
                        <p  class='text' id="textRol">Rol: <span id="printRole"></span></p>
                    </div>
                </div>

                <div class="row">
                <div class="input-container mb-3 col-12 col-lg-6">
                    <label for="email" class='text mb-2'>Email</label>
                    <input class="input form-control form-control-lg" type="email" id="email" name="email">
                </div>
                <div class="input-container mb-3 col-12 col-lg-6">
                    <label for="first-name" class='text mb-2'>Name</label>
                    <input class="input form-control form-control-lg" type="text" id="first-name" name="first-name">
                </div>
            </div>

            <div class="row">
            <div class="input-container mb-3 col-12 col-lg-6">
                <label for="last-name" class='text mb-2'>Lastname</label>
                <input class="input form-control form-control-lg" type="text" id="last-name" name="last-name">
            </div>

            <div class="input-container mb-3 col-12 col-lg-6">
                <label id="label-subject" for="subject" class='text mb-2'>Subject</label>
                <select id="subject" class="input form-select form-select-lg" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="English">English</option>
                    <option value="Math">Math</option>
                    <option value="Programming">Programming</option>
                    <option value="Spanish">Spanish</option>
                </select>
            </div>
        </div>

        <div class="row">
        <div class="input-container mb-3 col-12 col-lg-6">
            <label id="label-course-category" for="course-category" class='text mb-2'>Category:</label>
            <select id="course-category" class="input form-select form-select-lg" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="Freshman">Freshman</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
            </select>
        </div>
            <div class="input-container mb-3 col-12 col-lg-6">
                <label for="school" class='text mb-2'>School</label>
                <input class="input form-control form-control-lg" type="text" id="school" name="school">
            </div>
        </div>

        <div class="row">
            <div class="input-container mb-3 col-12">
                    <label for="Aboutme" class="form-label text mb-2">About me</label>
                    <textarea class="input form-control form-control-lg textarea" id="About me" rows="3"></textarea>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-lg-6">
                    <input id="saveChanges" type="submit" value="Save Changes" class="btn btn-primary btn-fixed-width">
                </div>
           </div>
          </form>
        </div>
        `;

    document.getElementById('content-teacher').innerHTML = formHTML;

        // Obtiene el usuario actualmente logueado
        const user = auth.currentUser;
        if (user) {
            // El usuario está logueado
            // Puedes acceder a los datos del usuario con user.email, user.displayName, etc.
            // Para obtener datos adicionales del usuario, puedes hacer una solicitud a tu base de datos

            // Obtiene los datos del usuario de la base de datos
            db.collection('users').doc(user.uid).onSnapshot((doc) => {
                if (doc.exists) {
                    const userData = doc.data();

                    // Ahora puedes usar userData para llenar tus campos
                    const emailInput = document.getElementById('email');
                    emailInput.value = user.email; // email del usuario
                    emailInput.readOnly = true; // Hace que el input de email sea de solo lectura
                    document.getElementById('printRole').textContent = userData.Role; // rol del usuario

                   // Para recuperar los datos
                    document.getElementById('first-name').value = userData['Name'] || '';
                    document.getElementById('last-name').value = userData['Lastname'] || '';
                    document.getElementById('school').value = userData['School'] || '';
                    document.getElementById('About me').value = userData['About me'] || '';
                    document.getElementById('subject').value = userData['Subject'] || '';
                    document.getElementById('course-category').value = userData['Category'] || '';
                } else {
                    // El documento no existe
                    // Maneja este caso como quieras
                }
            });
        } else {
            // No hay usuario logueado
            // Maneja este caso como quieras
        }
  

    // Selecciona todos los inputs, selects, textareas y los iconos de edición
    const inputs = document.querySelectorAll('.input-container input, .input-container select, .input-container textarea');

    // Selecciona el botón "Save Changes"
    const saveChangesButton = document.querySelector('#saveChanges');

    saveChangesButton.addEventListener('click', function(event) {
        event.preventDefault();
    
        // Cambia todos los inputs, selects y textareas a readonly o editable
        inputs.forEach(input => {
            // Excluye el input de email
            if (input.id !== 'email') {
                if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
                    input.readOnly = !input.readOnly;
                } else if (input.tagName === 'SELECT') {
                    input.disabled = !input.disabled;
                }
            }
        });
    
        // Cambia el texto y la clase del botón
        if (saveChangesButton.value === 'Save Changes') {
            saveChangesButton.value = 'Edit';
            saveChangesButton.classList.remove('btn-primary');
            saveChangesButton.classList.add('btn-warning', 'btn-fixed-width');

        // Crear un objeto vacío para almacenar los datos del formulario
        var formData = {
            'Email': document.getElementById('email').value,
            'Name': document.getElementById('first-name').value,
            'Lastname': document.getElementById('last-name').value,
            'School': document.getElementById('school').value,
            'About me': document.getElementById('About me').value,
            'Subject': document.getElementById('subject').value,
            'Category': document.getElementById('course-category').value
        };

        // Obtener el usuario actualmente logueado
        const user = auth.currentUser;

        if (user) {
            // Guardar el objeto en la base de datos del usuario
            db.collection('users').doc(user.uid).set(formData, { merge: true });
        }
        
        } else {
            saveChangesButton.value = 'Save Changes';
            saveChangesButton.classList.remove('btn-warning');
            saveChangesButton.classList.add('btn-primary', 'btn-fixed-width');
        }
    });
});