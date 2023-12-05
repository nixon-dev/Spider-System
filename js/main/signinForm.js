const loginButton = document.getElementById('loginButton');
let role;

async function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const loadingElement = document.getElementById('loading');

  // Check if email or password is empty
  if (!email || !password) {
      showMessage("Email or Password should not be empty", "error");
      return;
  }

  try {
      const credentials = await auth.signInWithEmailAndPassword(email, password);
      console.log(credentials)
      showMessage("Welcome " + credentials.user.email);

      // Retrieve the user's role from the database
      const userDoc = await db.collection('users').doc(credentials.user.uid).get();
      if (userDoc.exists) {
          role = userDoc.data().Role;
          console.log(role)
          // Resto del código...
      } else {
          console.error('No existe un documento para este usuario');
      }

      // Show loading element
      loadingElement.style.display = 'block';

      setTimeout(() => {

        // Redirect to the appropriate page based on the user's role
        if (role === 'Student') {
            window.location.href = "students.html";
        } else if (role === 'Teacher') {
            window.location.href = "teacher.html";
        }
      }, 1000);
  } catch (error) {
      if(error.code === "auth/invalid-login-credentials"){
          showMessage("Invalid Email or Password", "error");
      } else{
          showMessage(error.message, "error");
      }
  }  
}

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  loginUser();
});        

