document.addEventListener('DOMContentLoaded', (event) => {
  //GLOBAL VARIABLES
  const studentSignupButton = document.getElementById('buttonStudent');
  const teacherSignupButton = document.getElementById('buttonTeacher');  

  //FUNCTION OF SUCCESSFUL REGISTRATION
  function onSuccessfulRegistration() {
      // Hide the signup form
      document.getElementById('signup-form').style.display = 'none';
      // Show the signin form
      document.getElementById('signin-form').style.display = 'block';
  }

  async function registerUser(role) {
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;

      // Check if email or password is empty
      if (!email || !password) {
          showMessage("Email or Password should not be empty", "error");
          return;
      }
      if (password !== confirmPassword) {
          showMessage("Password and Confirm Password should match", "error");
          return;
      }

      try {
        const credentials = await auth.createUserWithEmailAndPassword(email, password);
        // Save the user's role and email in the database
        await db.collection('users').doc(credentials.user.uid).set({ 'Role': role, 'Email': email });
        showMessage("Account created successfully");
        onSuccessfulRegistration();

      } catch (error) {
          if(error.code === "auth/email-already-in-use"){
              showMessage("Email already in use", "error");
          } else if(error.code === "auth/invalid-email"){
              showMessage("Invalid Email", "error");
          } else if(error.code === "auth/weak-password"){
              showMessage("Password should be at least 6 characters", "error");
          } else{
              showMessage(error.message, "error");
          }
      }  
  }

  //EVENT LISTENERS FOR SIGNUP BUTTONS OF STUDENT
  studentSignupButton.addEventListener('click', (e) => {    
      e.preventDefault();
      registerUser('Student');
  });        

  //EVENT LISTENERS FOR SIGNUP BUTTONS OF TEACHER
  teacherSignupButton.addEventListener('click', (e) => {    
      e.preventDefault();
      registerUser('Teacher');
  });   
});
