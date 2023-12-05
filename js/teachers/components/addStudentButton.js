/*CÓDIGO PARA AÑADIR UN NUEVO ESTUDIANTE A FIREBASE POR MEDIO DEL BOTON ADD STUDENT*/

document.getElementById('save-student-button').addEventListener('click', function() {
    // Obtén el modal y crea una nueva instancia de modal

    // Recoger los valores de los campos del formulario
    let email = document.getElementById('email-student').value;
    let name = document.getElementById('name-student').value;
    let lastname = document.getElementById('lastname-student').value;
    let turn = document.getElementById('turn-student').value;
    let pathLearning = document.getElementById('path-learning-student').value;
    let category = document.getElementById('category-student').value;

    // Verificar si todos los campos están llenos
    if (!email || !name || !lastname || !turn || !pathLearning || !category) {
        alert('Por favor, llena todos los campos antes de añadir un estudiante.');
        return;
    }

    // Generar una contraseña temporal
    let password = Math.random().toString(36).slice(-8);
    if (password.length < 6) {
        password += 'b'.repeat(6 - password.length);
    }

    // Crear un objeto estudiante con los valores recogidos y la contraseña
    let student = {
        Email: email,
        Name: name,
        Lastname: lastname,
        Turn: turn,
        Category: category,
        "Path Learning": pathLearning,
        Role : 'Student',
        Password: password, // Añadir la contraseña al objeto estudiante
        isFirstLogin: true // Añadir la propiedad isFirstLogin
    };

     // Verificar si ya existe un estudiante con el mismo correo electrónico
    db.collection('users').where('Email', '==', email).get().then((querySnapshot) => {
        if (!querySnapshot.empty) {
            console.error('Ya existe un estudiante con este correo electrónico');
        } else {
            // Crear una cuenta de autenticación para el estudiante
            auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
                console.log('Cuenta de autenticación creada con éxito');

                // Guardar el objeto estudiante en la base de datos de Firebase
                db.collection('users').doc(credentials.user.uid).set(student).then(() => {
                    console.log('Estudiante guardado con éxito');
                }).catch((error) => {
                    console.error('Error al guardar el estudiante: ', error);
                });

            }).catch((error) => {
                console.error('Error al crear la cuenta de autenticación: ', error);
            });

            // Limpiar los campos de entrada
            document.getElementById('email-student').value = '';
            document.getElementById('name-student').value = '';
            document.getElementById('lastname-student').value = '';
            document.getElementById('turn-student').value = '';
            document.getElementById('path-learning-student').value = '';
            document.getElementById('category-student').value = '';
        }
    }).catch((error) => {
        console.error('Error al verificar el correo electrónico: ', error);
    });
    

});