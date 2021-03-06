const {db} = require('../util/admin');
const firebase = require('firebase');
const {validateSignupData,validateLoginData} = require('../util/helpers')

const config = require('../util/config');
firebase.initializeApp(config);

exports.signup = (req,res)=>{
    const newUser = {
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        name:req.body.name,
        company:req.body.company,        
    }
    
    const {valid,errors} = validateSignupData(newUser)    

    if(!valid) return res.status(400).json(errors);

    firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then(idToken => {
        token  = idToken;
        const userCredentials = {
            email:newUser.email,
            name:newUser.name,
            company:newUser.company,
            createdAt: new Date().toISOString(),
            userId
        };
        return db.doc(`/users/${newUser.email}`).set(userCredentials);
    })
    .then(()=> {
        return res.status(201).json({token});
    })
    .catch(err =>{
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({email:'email is already in use'})
        }
        else{
            return res.status(500).json({error:err.code});
        }
    })
}

exports.login = (req,res) => {
    const user = {
        email : req.body.email,
        password : req.body.password
    }

    const {valid,errors} = validateLoginData(user)    

    if(!valid) return res.status(400).json(errors);
    console.log('passed validation');
    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
    .then(data => data.user.getIdToken())
    .then(token => res.json({token}))
    .catch(err => {
        console.log(err);
        if(err.code === 'auth/wrong-password' ){
            return res.status(403).json({general:'Wrong credentials'})    
        }
        return res.status(500).json({error:err.code})
    })
}

exports.getAuthenticatedUser = (req,res) => {
    let userData = {};
    db.doc(`/users/${req.user.email}`).get()
    .then(doc =>{
        if(doc.exists){
            userData.credentials = doc.data();
            return db.collection('Requests').where('user','==',req.user.email).get()
        }
    })
    .then(data => {
        userData.requests = [];
        data.forEach(doc => {
            userData.requests.push(doc.data());
            return res.json(userData);
        });
    })
}