//Initializing Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3JYhwYKcEm-dnr7TclgsDdFaE7Zc9eNk",
    authDomain: "feelgoodai-9be1d.firebaseapp.com",
    projectId: "feelgoodai-9be1d",
    storageBucket: "feelgoodai-9be1d.appspot.com",
    messagingSenderId: "899624703195",
    appId: "1:899624703195:web:5e917a531f34f748d6e8fe",
    measurementId: "G-ME91XMRKNP"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
import { getDatabase, ref, set, child, get, push, update } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, onAuthStateChanged, signOut, sendEmailVerification, updateEmail, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
const db = getDatabase();
    
//Logs whether the user is signed in or not
const auth = getAuth();
var myRef = ref(db, 'Users');
var getUserType;
const cipKey = [
    [1, 17, 14],
    [14, 10, 4],
    [11, 24, 13]
];
const conversion = new Map([
    ["a", 0],["b", 1],["c", 2],["d", 3],["e", 4],["f", 5],["g", 6],["h", 7],
    ["i", 8],["j", 9],["k", 10],["l", 11],["m", 12],["n", 13],["o", 14],["p", 15],
    ["q", 16],["r", 17],["s", 18],["t", 19],["u", 20],["v", 21],["w", 22],["x", 23],
    ["y", 24],["z", 25],["A", 26],["B", 27],["C", 28],["D", 29],["E", 30],["F", 31],
    ["G", 32],["H", 33],["I", 34],["J", 35],["K", 36],["L", 37],["M", 38],["N", 39],
    ["O", 40],["P", 41],["Q", 42],["R", 43],["S", 44],["T", 45],["U", 46],["V", 47],
    ["W", 48],["X", 49],["Y", 50],["Z", 51],["0", 52],["1", 53],["2", 54],["3", 55],
    ["4", 56],["5", 57],["6", 58],["7", 59],["8", 60],["9", 61],
  ]);


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

//All the check functions just make sure something valid was entered
function checkUserFirstName()
{
    var userFirstName = document.getElementById("userFirstName").value;
    var flag = false;
    if(userFirstName === "")
        flag = true;
    if(flag)
        document.getElementById("userFirstNameError").style.display = "block";
    else
        document.getElementById("userFirstNameError").style.display = "none";
}
window.checkUserFirstName = checkUserFirstName;

function checkUserLastName()
{
    var userLastName = document.getElementById("userLastName").value;
    var flag = false;
    if(userLastName === "")
        flag = true;
    if(flag)
        document.getElementById("userLastNameError").style.display = "block";
    else
        document.getElementById("userLastNameError").style.display = "none";
}
window.checkUserLastName = checkUserLastName;

function checkUserEmail()
{
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag = true;
    if(userEmail.value.match(userEmailFormate))
        flag = false;
    if(flag)
        document.getElementById("userEmailError").style.display = "block";
    else
        document.getElementById("userEmailError").style.display = "none";
}
window.checkUserEmail = checkUserEmail;

function checkUserPassword()
{
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag = true;
    if(userPassword.value.match(userPasswordFormate))
        flag = false;
    if(flag)
        document.getElementById("userPasswordError").style.display = "block";
    else
        document.getElementById("userPasswordError").style.display = "none";
}
window.checkUserPassword = checkUserPassword;

//Signs Up users taking input values entered and creating credentials
function signUp()
{
    var userFirstName = document.getElementById("userFirstName").value;
    var userLastName = document.getElementById("userLastName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userType = document.getElementById("userType").value;
    var userFirstNameFormatValidate = /^([A-Za-z.\s_-])/;    
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    //Matching to make sure inputs are in proper format
    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormatValidate);
    var checkUserEmailValid = userEmail.match(userEmailFormatValidate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormatValidate);

    if(checkUserFirstNameValid == null)
        return checkUserFirstName();
    else if(userLastName === "")
        return checkUserLastName();
    else if(checkUserEmailValid == null)
        return checkUserEmail();
    else if(checkUserPasswordValid == null)
        return checkUserPassword();
    else
        //Creating User and saving data
        createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) =>
        {
            var user = userCredential.user;
            var uid;
            if (user != null) 
                uid = user.uid;
            //The child where this data is saved
            if(userType === "Patient"){
                console.log("Patient");
                set(ref(db, 'Users/' + uid), {
                    userID: uid,
                    userFirstName: userFirstName,
                    userLastName: userLastName,
                    userEmail: userEmail,
                    userType: userType,
                    userCountry: "Your Country?",
                    userAge: "Your Age?",
                    userBio: "User Biography",
                    userPsychologist: "Your Psychologist?"
                  });
            }else{
                console.log("Administrator");
                set(ref(db, 'Users/' + uid), {
                    userID: uid,
                    userFirstName: userFirstName,
                    userLastName: userLastName,
                    userEmail: userEmail,
                    userType: userType,
                    userCountry: "Your Country?",
                    userProfession: "Your Profession?",
                    userBio: "User Biography"
                  });
            }
            sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            });
            console.log("Account Created");
            window.location = 'signIn.html';
            //window.location.replace("signIn.html");
        }).catch((error) => 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            document.getElementById("userSignUpError").innerHTML = errorMessage;
        });
}
window.signUp = signUp;

//Checking Email and Password Formats and showing a message if incorrect
function checkUserInEmail()
{
    var userInEmail = document.getElementById("userInEmail");
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag = true;
    if(userInEmail.value.match(userEmailFormatValidate))
        flag = false;
    if(flag)
        document.getElementById("userInEmailError").style.display = "block";
    else
        document.getElementById("userInEmailError").style.display = "none";
}
window.checkUserInEmail = checkUserInEmail;

function checkUserInPassword()
{
    var userInPassword = document.getElementById("userInPassword");
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag = true;
    if(userInPassword.value.match(userPasswordFormatValidate))
        flag = false;
    if(flag)
        document.getElementById("userInPasswordError").style.display = "block";
    else
        document.getElementById("userInPasswordError").style.display = "none";
}
window.checkUserInPassword = checkUserInPassword;

//Signs in users taking input values and matching with saved credentials in database
function signIn()
{
    var userInEmail = document.getElementById("userInEmail").value;
    var userInPassword = document.getElementById("userInPassword").value;
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userInEmail.match(userEmailFormatValidate);
    var checkUserPasswordValid = userInPassword.match(userPasswordFormatValidate);

    if(checkUserEmailValid == null)
        return checkUserInEmail();
    else if(checkUserPasswordValid == null)
        return checkUserInPassword();
    else
    {
        console.log("Signing in, please wait.");
        signInWithEmailAndPassword(auth, userInEmail, userInPassword).then((userCredential) => 
        {
            console.log("Sign In Successful");
            const user = userCredential.user;
            onAuthStateChanged(auth, (user) => 
            {
                sessionStorage.userID = user.uid;
                console.log(user.uid);
                if (user) 
                {
                    get(child(myRef, user.uid)).then((snapshot) => {
                        if (snapshot.exists()) {
                          getUserType = snapshot.val().userType;
                          console.log(getUserType);
                          sessionStorage.userType = getUserType;    
                          if(getUserType == "Administrator")
                            window.location = 'adminHome.html';
                          else
                            window.location = 'patientHome.html';
                        } else {
                          console.log("No data available");
                        }
                      }).catch((error) => {
                        console.error(error);
                      });
                }
            });
        //Errors will be logged in console and shown to user (eg: User not found in database)
        }).catch((error) => 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            document.getElementById("userLoginError").innerHTML = errorMessage;

        });
    }
}
window.signIn = signIn;
//Take input values from user and saves a user profile (Setting data not updating)
function saveProfileAdmin()
{
    let userFirstName = document.getElementById("userFirstName").value 
    let userLastName = document.getElementById("userLastName").value 
    let userEmail = document.getElementById("userEmail").value 
    let userProfession = document.getElementById("userProfession").value 
    let userCountry = document.getElementById("userCountry").value  
    var userFirstNameFormatValidate = /^([A-Za-z.\s_-])/; 
    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormatValidate);
    if(checkUserFirstNameValid == null)
        return checkUserFirstName();
    else if(userLastName === "")
        return userUserLastName();
    else
    {
        var localUserID = sessionStorage.userID;
        set(ref(db, 'Users/' + localUserID), {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            userProfession: userProfession,
            userCountry: userCountry,
            userID: localUserID,
            userType: "Administrator",
            userBio: "User Bio"
          });
          updateEmail(auth.currentUser, userEmail).then(() => {
            // Email updated!
            console.log("Email Updated");
            }).catch((error) => {
            // An error occurred
            console.log(error);
            });
        console.log("Profile Updated");
        getProfileAdmin();
    }
}
window.saveProfileAdmin = saveProfileAdmin;

function getProfileAdmin(){
    var localUserID = sessionStorage.userID;
    get(child(myRef, localUserID)).then((snapshot) => {
            if (snapshot.exists()) {
                var profile = snapshot.val();
                var userFName = profile.userFirstName;
                var userLName = profile.userLastName;
                var userEmail = profile.userEmail;
                var userProfession = profile.userProfession;
                var userCtry = profile.userCountry;

                document.getElementById("userFirstName").value = userFName;
                document.getElementById("userLastName").value = userLName;
                document.getElementById("userEmail").value = userEmail;
                document.getElementById("userProfession").value = userProfession;
                document.getElementById("userCountry").value = userCtry; 
                console.log("Profile Retrieved");
            } 
            }).catch((error) => {
            console.error(error);
            });

}
window.getProfileAdmin = getProfileAdmin;

function saveProfilePatient()
{
    let userFirstName = document.getElementById("userFirstName").value 
    let userLastName = document.getElementById("userLastName").value 
    let userEmail = document.getElementById("userEmail").value 
    let userPsychologist = document.getElementById("userPsychologist").innerHTML; 
    let userAge = document.getElementById("userAge").value 
    let userCountry = document.getElementById("userCountry").value  
    var userFirstNameFormatValidate = /^([A-Za-z.\s_-])/; 
    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormatValidate);
    if(checkUserFirstNameValid == null)
        return checkUserFirstName();
    else if(userLastName === "")
        return userUserLastName();
    else
    {
        var localUserID = sessionStorage.userID;
        set(ref(db, 'Users/' + localUserID), {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            userPsychologist: userPsychologist,
            userAge: userAge,
            userCountry: userCountry,
            userID: localUserID,
            userType: "Patient",
            userBio: "User Bio"
          });
            updateEmail(auth.currentUser, userEmail).then(() => {
            // Email updated!
            console.log("Email Updated");
            }).catch((error) => {
            // An error occurred
            console.log(error);
            });

        console.log("Profile Updated");
        getProfilePatient();
    }
}
window.saveProfilePatient = saveProfilePatient;

function getProfilePatient(){
    var localUserID = sessionStorage.userID;
    get(child(myRef, localUserID)).then((snapshot) => {
            if (snapshot.exists()) {
                var profile = snapshot.val();
                var userFName = profile.userFirstName;
                var userLName = profile.userLastName;
                var userEmail = profile.userEmail;
                var userAge = profile.userAge;
                var userCtry = profile.userCountry;
                var userID = profile.userID;
                var userPsychologist = profile.userPsychologist;

                document.getElementById("userFirstName").value = userFName;
                document.getElementById("userLastName").value = userLName;
                document.getElementById("userEmail").value = userEmail;
                document.getElementById("userAge").value = userAge;
                document.getElementById("userCountry").value = userCtry; 
                var patientID = encryptPatientID(userID);
                document.getElementById("patientID").innerText = patientID;
                document.getElementById("userPsychologist").innerText = userPsychologist;
                console.log("Profile Retrieved");
            } 
            }).catch((error) => {
            console.error(error);
            });

}
window.getProfilePatient = getProfilePatient;

function checkUserSignedIn(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          sessionStorage.userID = user.uid;    
          console.log(user + "Signed In")
        }
        else {
          console.log("User Not Signed In")
          window.location = "signIn.html";
          
        }
      })
}
window.checkUserSignedIn = checkUserSignedIn;

function checkAdminSignedIn(){
    onAuthStateChanged(auth, (user) => 
            {
                if (user) 
                {
                    get(child(myRef, user.uid)).then((snapshot) => {
                        if (snapshot.exists()) {
                          getUserType = snapshot.val().userType;
                          console.log(getUserType);
                          sessionStorage.userType = getUserType;    
                          if(getUserType == "Administrator")
                            console.log("Admin Signed In");
                          else
                            window.location = 'signIn.html';
                        } 
                      }).catch((error) => {
                        console.error(error);
                      });
                }
                else
                    window.location = 'signIn.html';
            });
}
window.checkAdminSignedIn = checkAdminSignedIn;

function checkPatientSignedIn(){
    onAuthStateChanged(auth, (user) => 
    {
        if (user) 
        {
            get(child(myRef, user.uid)).then((snapshot) => {
                if (snapshot.exists()) {
                  getUserType = snapshot.val().userType;
                  console.log(getUserType);
                  sessionStorage.userType = getUserType;    
                  if(getUserType == "Patient")
                    console.log("Patient Signed In");
                  else
                    window.location = 'signIn.html';
                } 
              }).catch((error) => {
                console.error(error);
              });
        }
        else
            window.location = 'signIn.html';
    });
}
window.checkPatientSignedIn = checkPatientSignedIn;


function signInRedirect(){
    signOut(auth).then(() => {

    }).catch((error) => {
    });  
    window.location = "signIn.html";
}
window.signInRedirect = signInRedirect;

function homeRedirect(){
    if(sessionStorage.userType == "Administrator")
        window.location = "adminHome.html";
    else if(sessionStorage.userType == "Patient")
        window.location = "patientHome.html";
    else
        window.location = "signIn.html";
}
window.homeRedirect = homeRedirect;

function settingsRedirect(){
    if(sessionStorage.userType == "Administrator")
        window.location = "adminSettings.html";
    else if(sessionStorage.userType == "Patient")
        window.location = "patientSettings.html";
    else
        window.location = "signIn.html";
}
window.settingsRedirect = settingsRedirect;

function redirectPatientSettings(patientID){
    //Use patient ID to get patient information and display it on the page
    window.location = "modifyPatientSettings.html";
}
window.redirectPatientSettings = redirectPatientSettings;

function redirectAdminToPatientJournal(patientID){
    //Use patient ID to get patient information and display it on the page
    window.location = "adminPatientJournal.html";
}
window.redirectAdminToPatientJournal = redirectAdminToPatientJournal;


function generateRandomPatientID(){

}
window.generateRandomPatientID = generateRandomPatientID;

function sendUserReset()
{
    var userEmail = document.getElementById("userInEmail").value;
    console.log(userEmail);
    const auth = getAuth();
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        // Password reset email sent!
        document.getElementById("resetPasswordSuccess").style.display = "block";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
}
window.sendUserReset = sendUserReset;

function encryptPatientID(ID){
    var newID = "";
    for(var i = 0; i < ID.length; i++)
    {
        var temp = ID.charAt(i);
        var tempInt = ID.charCodeAt(i);
        tempInt = tempInt + 1;

        for(var j = 0; j < cipKey.length; j++){
            for(var k = 0; k < cipKey[0].length; k++){
                tempInt = tempInt + tempInt * cipKey[j][k]
            }
        }
        tempInt = tempInt % 61;
        console.log(tempInt);
        let charKey = [...conversion.entries()]
            .filter(({ 1: value }) => value === tempInt)
            .map(([key]) => key);        
        console.log(charKey);
        temp = charKey[0];
        newID = newID + temp;
    }
    console.log(ID);
    return newID;

}    
window.encryptPatientID = encryptPatientID;

function decryptPatientID(ID){
    //get the value of the charKey (Each character in the ID)
    //Reverse the matrix encryption process using the reverse matrix and subtracting
    //Subtract 1 from the tempInt

    
    
}    
window.decryptPatientID = decryptPatientID;
