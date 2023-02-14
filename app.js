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
    [2, 17, 14],
    [14, 10, 4],
    [11, 24, 13]
];
//Use the Euclidean Algorithm and multiply by the GCD
/* Real Inverse Key uses mod 61
const cipKeyInv = [
    [34, 115, -72],
    [-138, -128, 188],
    [226, 139, -218]
];
*/

const cipKeyInv = [
    [38, 30, 22],
    [31, 54, 17],
    [24, 45, 48]
];



const conversion = new Map([
    ["a", 0],["b", 1],["c", 2],["d", 3],["e", 4],["f", 5],["g", 6],["h", 7],
    ["i", 8],["j", 9],["k", 10],["l", 11],["m", 12],["n", 13],["o", 14],["p", 15],
    ["q", 16],["r", 17],["s", 18],["t", 19],["u", 20],["v", 21],["w", 22],["x", 23],
    ["y", 24],["z", 25],["A", 26],["B", 27],["C", 28],["D", 29],["E", 30],["F", 31],
    ["G", 32],["H", 33],["I", 34],["J", 35],["K", 36],["L", 37],["M", 38],["N", 39],
    ["O", 40],["P", 41],["Q", 42],["R", 43],["S", 44],["T", 45],["U", 46],["V", 47],
    ["W", 48],["X", 49],["Y", 50],["Z", 51],["0", 52],["1", 53],["2", 54],["3", 55],
    ["4", 56],["5", 57],["6", 58],["7", 59],["8", 60],["9", 61],["@", 62],["&", 63],
    [";", 64],[":", 65],["%", 66]
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
                var patientID = encryptPatientID(uid);
                set(ref(db, 'Users/' + uid), {
                    userID: uid,
                    patientID: patientID,
                    userFirstName: userFirstName,
                    userLastName: userLastName,
                    userEmail: userEmail,
                    userType: userType,
                    userCountry: "Your Country?",
                    userAge: "Your Age?",
                    userBio: "User Biography",
                    userPsychologist: "Your Psychologist?",
                    userPsychologistID: "Your Psychologist's ID?",
                    userJournals: userFirstName + "'s Journals",
                    userLastUpdate: "",
                    userPriorityLevel: "",
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
                    userBio: "User Biography",
                    userPatients: userFirstName + "'s Patients",
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
        update(ref(db, 'Users/' + localUserID), {
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
        update(ref(db, 'Users/' + localUserID), {
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
                var decryptedID = decryptPatientID(patientID);
                console.log(decryptedID);
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

//First try passing a string, encrypting and decrypting it
//Save the mod result 
function encryptPatientID(ID){
    console.log(ID);
    //Split userID into groups of 3, and last group would have 1 character
    //Put groups into an array
    //Loop array from first to second last group
    //Encrypt each group using the key
    var resultArray = [];
    var newID = "";
    var charIntArray = [];
    var temp;
    var resultInt = 0;
    var tempInt;
    for(var i = 0; i < ID.length; i++)
    {
        temp = ID.charAt(i);
        tempInt = conversion.get(temp);
        charIntArray.push(tempInt);
    }
    console.log(charIntArray);

    for(var i = 0; i < charIntArray.length - 1; i = i + 3){
        let vectorArray = [charIntArray[i], charIntArray[i+1], charIntArray[i+2]];
        
        for(var j = 0; j < cipKey.length; j++){
            for(var k = 0; k < cipKey[0].length; k++){
                resultInt = resultInt + vectorArray[k] * cipKey[j][k];
            }
            resultArray.push(resultInt);
            resultInt = 0;
        }
    }
    resultArray.push(charIntArray[charIntArray.length - 1]);    
    console.log(resultArray);
    
   
    for(var i = 0; i < resultArray.length; i++){
        resultInt = (resultArray[i] + 1) % 67; //add 1 to result and mod 67 just to make it a little more difficult to crack
        let charKey = [...conversion.entries()]
            .filter(({ 1: value }) => value === resultInt)
            .map(([key]) => key);        
        temp = charKey[0];
        newID = newID + temp;
    }
    console.log(newID);
    return newID;

}  
window.encryptPatientID = encryptPatientID;

function decryptPatientID(ID){
    var resultArray = [];
    var decryptedID = "";
    var vectorArray = [];
    var charIntArray = [];
    var resultInt = 0;
    var temp;
    var tempInt;
    for(var i = 0; i < ID.length; i++)
    {
        temp = ID.charAt(i);
        tempInt = conversion.get(temp) - 1; //subtracting 1 because we added 1 at the end of the encryption
        charIntArray.push(tempInt);
    }
    
    for(var i = 0; i < charIntArray.length - 1; i = i + 3){
        let vectorArray = [charIntArray[i], charIntArray[i+1], charIntArray[i+2]];
        
        for(var j = 0; j < cipKeyInv.length; j++){
            for(var k = 0; k < cipKeyInv[0].length; k++){
                resultInt = resultInt + vectorArray[k] * cipKeyInv[j][k];
            }
            resultArray.push(resultInt);
            resultInt = 0;
        }
    }
    resultArray.push(charIntArray[charIntArray.length - 1]);    
    console.log(resultArray);
    
   
    for(var i = 0; i < resultArray.length; i++){
        resultInt = resultArray[i] % 67;
        let charKey = [...conversion.entries()]
            .filter(({ 1: value }) => value === resultInt)
            .map(([key]) => key);        
        temp = charKey[0];
        decryptedID = decryptedID + temp;
    }
    console.log(decryptedID);
    return decryptedID;
    
}    
window.decryptPatientID = decryptPatientID;

function addPatient(patientID){
    //First check if patient already exists in Admin's database

    var localUserID = sessionStorage.userID;
    var decryptedID = decryptPatientID(patientID);
    get(child(myRef, decryptedID)).then((snapshot) => {
        if (snapshot.exists()) {
            var profile = snapshot.val();
            var userFName = profile.userFirstName;
            var userLName = profile.userLastName;
            var userEmail = profile.userEmail;
            var userAge = profile.userAge;
            var userCtry = profile.userCountry;
            var patientID = profile.patientID;
            var userPsychName = profile.userPsychologist;
            var userPsychID = profile.userPsychologistID;
            var patientJournals = profile.userJournals;
            var patientLastUpdate = profile.userLastUpdate;
            var patientPriorityLevel = profile.userPriorityLevel;

            console.log(patientID);

            get(child(myRef, localUserID)).then((snapshot) => {
                if (snapshot.exists()) {
                    var profile2 = snapshot.val();
                    userPsychName = profile2.userFirstName + " " + profile2.userLastName;
                    console.log(userPsychName);

                    update(ref(db, 'Users/' + decryptedID), {
                        userPsychologist: userPsychName,
                        userPsychologistID: localUserID,
                    });
                    console.log("Psychologist Name Updated");
                    userPsychID = localUserID;
                    console.log(userPsychID);
        
                    update(ref(db, 'Users/' + localUserID + '/userPatients/' + patientID), {
                        patientFirstName: userFName,
                        patientLastName: userLName,
                        patientEmail: userEmail,
                        patientPsychologist: userPsychName,
                        patientPsychID: userPsychID,
                        patientAge: userAge,
                        patientCountry: userCtry,
                        patientID: patientID,
                        patientJournals: patientJournals,
                        patientLastUpdate: patientLastUpdate,
                        patientPriorityLevel: patientPriorityLevel,
                    });
                    console.log("Patient Added");
                    window.location.reload();
                }
            });
        } 
    });
    
}
window.addPatient = addPatient;

function updatePatientJournal(divElement, patientID){
    let journal = document.getElementById(divElement).innerHTML;
    console.log(journal);
    //var patientID = decryptPatientID(patientID);
    //var patientRef = ref(myRef, "Patients/" + patientID + "/journal");
    //set(patientRef, journal);
    getModelAnalysis(journal);
}
window.updatePatientJournal = updatePatientJournal;

function loadPatients(){
    var userID = sessionStorage.userID;
    var myRef = ref(db, 'Users/' + userID);

    get(child(myRef, '/userPatients')).then((snapshot) => {
        if (snapshot.exists()) {
            var profiles = snapshot.val()
            Object.keys(profiles).forEach(function(userKey) {
                const user = profiles[userKey];
                const keys = Object.keys(user);
                // keys.forEach(function(key) {
                //     const value = user[key];
                //     console.log(key, value);
                // });
                const firstName = user.patientFirstName;
                const lastName = user.patientLastName;
                const email = user.patientEmail;
                const age = user.patientAge;
                const country = user.patientCountry;
                const patientID = user.patientID;
                const patientPsychName = user.patientPsychologist;
                const patientPsychID = user.patientPsychID;
                const patientJournals = user.patientJournals;
                const patientLastUpdate = user.patientLastUpdate;
                const patientPriorityLevel = user.patientPriorityLevel;

                let card = document.createElement("div");
                card.id = `patient${patientID}`;
                card.classList.add("card");
                card.innerHTML = `
                <div class="cardRow">
                <h4 onclick="redirectAdminToPatientJournal('${patientID}')"><b>${firstName} ${lastName}</b></h4>
                <a onclick="redirectPatientSettings('${patientID}')" class="modifySettingsBtn"><i class="bx bx-cog"></i></a>
                </div>
                <p id="${patientID}ID">${patientID}</p>
                <p>Last Update: ${patientLastUpdate} </p>
                <p>Priority Level: ${patientPriorityLevel} </p>
                `

                let container = document.querySelector("#patientFlex");
                container.appendChild(card);

                console.log(firstName, lastName, email, age, country, patientID, patientPsychName, patientPsychID, patientJournals, patientLastUpdate, patientPriorityLevel);
                
            });
        }
    });
}
window.loadPatients = loadPatients;

function getModelAnalysis(journal){
    var localUserID = sessionStorage.userID;
    var encryptedID = encryptPatientID(localUserID);
    query({"inputs": `${journal}`}).then((response) => {
        const lines = response[0];

        const firstLabel = lines[0].label;
        const firstScore = lines[0].score;

        const secondLabel = lines[1].label;
        const secondScore = lines[1].score;

        const thirdLabel = lines[2].label;
        const thirdScore = lines[2].score;
        
        var analysisResult = "1. " + firstLabel + ": " + firstScore + "\n" + "2. " + secondLabel + ": " + secondScore + "\n" + "3. " + thirdLabel + ": " + thirdScore;
        console.log(analysisResult);

        var dateObj = new Date();
        var seconds = dateObj.getUTCSeconds();
        var minutes = dateObj.getUTCMinutes();
        var hours = dateObj.getUTCHours();
        var day = dateObj.getUTCDate();
        var month = dateObj.getUTCMonth() + 1; //Months in terms of 1 to 12
        var year = dateObj.getUTCFullYear();     
        var userPsychID = "";
        

        var newDate = new Date(month + "/"  + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " UTC");
        var localDate = newDate.toLocaleString("en-US", {timeZone: "America/New_York"});
        var dateLength = localDate.length - 12;
        var refDate = (localDate.replaceAll('/', '-')).substring(0, dateLength);

        //Consider 1 digit vs 2 digit for day and month - Use firebase timeStamp method and keep everything in firebase in UTC
        console.log(localDate); 
        console.log(refDate);
        console.log(journal);
        //save PsychologistID in user's database and update journals there too 
        
        update(ref(db, 'Users/' + localUserID + "/patientJournals/" + refDate), {
            Journal: journal,
            Results: analysisResult,
            Date: localDate
        });

        get(child(myRef, localUserID)).then((snapshot) => {
            if (snapshot.exists()) {
                userPsychID = snapshot.val().userPsychologistID;
                update(ref(db, 'Users/' + userPsychID + "/userPatients/" + encryptedID + "/patientJournals/" + refDate), {
                    Journal: journal,
                    Results: analysisResult,
                    Date: localDate,
                });     
                update(ref(db, 'Users/' + userPsychID + "/userPatients/" + encryptedID), {
                    patientPriorityLevel: "",
                    patientLastUpdate: "",
                });        
            } 
            }).catch((error) => {
            console.error(error);
            });
        
    });
}
window.getModelAnalysis = getModelAnalysis;

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}



