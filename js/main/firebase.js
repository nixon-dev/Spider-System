// TODO: Replace the following with your app's Firebase project configuration
        // See: https://support.google.com/firebase/answer/7015592
        const firebaseConfig = {
            apiKey: "AIzaSyAdKtlf7sSGLkXxDbqSWUSj3VgoOuy3Zr8",
            authDomain: "my-personal-projects-c6a9c.firebaseapp.com",
            projectId: "my-personal-projects-c6a9c",
            storageBucket: "my-personal-projects-c6a9c.appspot.com",
            messagingSenderId: "332561821570",
            appId: "1:332561821570:web:2e6f733747fc486709a99b"
        };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        // Initialize Cloud Firestore and get a reference to the service
        const db = firebase.firestore(app);
        // Initialize Firebase Authentication and get a reference to the service
        const auth = firebase.auth(app);
        