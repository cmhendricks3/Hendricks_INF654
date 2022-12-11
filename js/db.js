
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getFirestore,
        collection,
        getDocs,
        addDoc,
        doc,
        deleteDoc,
        updateDoc,
        enableIndexedDbPersistence,
        getAuth,
        createUserWithEmailAndPassword
       } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-TkawIXttE0iC9Xfg9wXJ2OgNNwgK-UI",
  authDomain: "recipe-advisor-pwa.firebaseapp.com",
  projectId: "recipe-advisor-pwa",
  storageBucket: "recipe-advisor-pwa.appspot.com",
  messagingSenderId: "716397411258",
  appId: "1:716397411258:web:e935e98b8eec6a7cc03b83",
  measurementId: "G-LTY3CG2M32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log('persistence failed');
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log('persistence is not available');
      }
  });

const form = document.querySelector('.add-pantry-item'); 

if(window.location.pathname == "/pages/pantry.html"){
  const pantry = getDocs(collection(db, "pantry")).then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      
      renderPantryItem(doc.data(), doc.id);
    })
  })
  
  form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "pantry"), {
        ingredient: form.ingredient.value
    })
    //instance.close();
  })
  //delete pantry items
  const pantryContainer = document.querySelector('.pantry')
  console.log(pantryContainer);
  pantryContainer.addEventListener('click', (e) => {
    //e.stopPropagation();
    const id = e.target.getAttribute('data-id');
    console.log(id);
    if(e.target.tagName === "I"){
      deleteDoc(doc(db, 'pantry', id));
    }
  })
}
const auth = getAuth(app);

const signupForm = document.querySelector('.sign-up form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm['sign-up-email'].value;
  const password = signupForm['sign-up-password'].value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

})
