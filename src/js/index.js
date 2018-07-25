// Con Gmail de Google
document.getElementById('btn-google').addEventListener('click', (event) =>{
  authGoogle();
});
document.getElementById('btn-facebook').addEventListener('click', (event) =>{
  authFacebook();
});// Por hacer

const authGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  authentificating(provider);
};

const authFacebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  authentificating(provider);
};

const authentificating = (provider) =>{
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // Da el Token de acceso a Google. Usar para acceder a la API de Google
    var token = result.credential.accessToken;
    // Datos del usuario logeado
    var user = result.user;

    // if (user =="USUARIO1" && password=="CONTRASEÑA1") {
    //   window.location= 'home.html';

    console.log(result);
  }).catch(function(error) {
    // enerar error
    var errorCode = error.code;
    var errorMessage = error.message;
    // Este email ya esta en uso
    var email = error.email;
    console.log(email);
    // Los permisos del firebase.auth.AuthCredential ya fueron usados.
    var credential = error.credential;
    console.log(credential);
  });
};

// Registro por correo

const registrar = (email, password, userName) =>{
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      verificarEmail();
    })
    .catch(function(error) {
    // Manejo de errores
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};
const ingresar = (emailU, passwordU, nameU) =>{
  firebase.auth().signInWithEmailAndPassword(emailU, passwordU)
    .then(function() {
      observadorEmail(nameU);
    })
    .catch(function(error) {
    // Manejo de error
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
    });
};

const observadorEmail = (nameU)=>{
  console.log(nameU);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userSpace(nameU);
      // Usuario logeado
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log('Activo');
    } else {
      console.log('No hay usuario');
    }
  });
};
// observadorEmail();

const userSpace = (user)=>{
  let nameU = user;
  document.getElementById('container').innerHTML = `<p>${'Bienvenido'}${' '}${nameU}</p>
  <button type="button" id="buttonLogout" onclick="cerrar()">LogOut</button>`;
};
const cerrar = () =>{
  let contenido = document.getElementById('container');
  firebase.auth().signOut()
    .then(function() {
      console.log('Cerrar sesion');
      contenido.innerHTML = '';
    })
    .catch(function() {
      console.log(error);
    });
};

const verificarEmail = ()=>{
  let vefificarU = firebase.auth().currentUser;
  vefificarU.sendEmailVerification().then(function() {
    console.log('enviando email');
  }).catch(function() {
    console.log(error);
  });
};

document.getElementById('buttonRegistrar').addEventListener('click', (event) => {
  console.log("entra");
  let email = document.getElementById('userEmail').value;
  let password = document.getElementById('userPsw').value;
  let userName = document.getElementById('username').value;
  registrar(email, password, userName);
});
document.getElementById('buttonIngresar').addEventListener('click', (event) => {
  let emailU = document.getElementById('userEmail').value;
  let passwordU = document.getElementById('userPsw').value;
  let nameU = document.getElementById('username').value;
  ingresar(emailU, passwordU, nameU);
});
/* const userPrintSpace = document.getElementById('obj');
let database = firebase.database().ref().child('obj');
database.on('value', snap => console.log(snap.val()));*/
