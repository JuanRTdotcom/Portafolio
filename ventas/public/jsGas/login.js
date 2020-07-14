/////////////connection firebase
firebase.initializeApp({
    apiKey: "AIzaSyDnFJ6_xuYx6Mez6VwK81O46yJV390uv9o",
    authDomain: "ropa-be1a8.firebaseapp.com",
    projectId: "ropa-be1a8"
  });
  var db = firebase.firestore();
  //////////////////////////////
 

 
  function desactivar(){
    var loader=document.getElementById('load')
    loader.textContent=""
    loader.setAttribute('class','loader')
    loader.setAttribute('disabled','')
}
function activar(){
 
    var loader=document.getElementById('load')
    loader.textContent="Ingresar"
    loader.removeAttribute('class')
    loader.removeAttribute('disabled')
}
document.getElementById('ingresar').addEventListener('click',()=>{
    desactivar()
    var us=document.getElementById('user').value
    var con=document.getElementById('contra').value

    if(us=='' || con==''){
        activar()
        Swal.fire(
            'Error',
            'Campos vacíos',
            'error'
          )
         
    }else{

var validaUsuarios = db.collection('usuario').where('user', '==', us).where('pass','==', con);
validaUsuarios.get().then(function (querySnapshot) {
   if(querySnapshot.empty==false){
        document.cookie='user = '+us;
        window.location="./dashboard.html";

   }else{
       activar()
    Swal.fire(                  'Error',
                                'Credenciales incorrectas',
                                'error'
                              )
   }
 
});

    }
})

// ////
// function desactivar(){
//     var loader=document.getElementById('load')
//     loader.textContent=""
//     loader.setAttribute('class','loader')
//     loader.setAttribute('disabled','')
// }
// function activar(){
 
//     var loader=document.getElementById('load')
//     loader.textContent="Ingresar"
//     loader.removeAttribute('class')
//     loader.removeAttribute('disabled')
// }
// document.getElementById('ingresar').addEventListener('click',function(){
    
//     desactivar()
//     var user=document.getElementById('user').value.trim()
//         var contra=document.getElementById('contra').value.trim()

//     if(user=='' || contra==''){
//         activar()
//         Swal.fire(
//             'LLENAR DATOS',
//             'Campos vacíos',
//             'warning'
//         )
//     }else{

        
//         var docRef = db.collection("clic").doc(user);

//         docRef.get().then(function(doc) {
//             if (doc.exists) {
//                 if(doc.data().Contrasenia==contra){
                    
//                     debugger
//                     //if(!e) e= window.event;
//                     document.cookie='user = '+user;
//                     //console.log(document.cookie)
                    

//                    window.location="./dashboard.html"
//                 }else{
//                     activar()
//                     Swal.fire(
//                         'CONTRASEÑA INCORRECTA',
//                         'Error de contraseña',
//                         'error'
//                     )
//                 }
                 



//             } else {
//                 activar()
//                 Swal.fire(
//             'USUARIO INCORRECTO',
//             'El usuario no existe',
//             'error'
//         )
//             }
//         }).catch(function(error) {
//            // console.log("Error getting document:", error);
//         });
//     }
    
   
//    // window.location="index.html";
// })