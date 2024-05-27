const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
//const {doc, setDoc, addDoc, collection, getDocs} = require("firebase/firestore")

const serviceAccount = require('./nodefirestoreteste-firebase-adminsdk-eg1g9-c3155d8fc2.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = require("./firebase/firebase.js")
var {doc, setDoc, addDoc, collection, getDocs, getDoc, updateDoc} = require("firebase/firestore")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

//
app.get("/consulta", function(req, res){
    getDocs(collection(db, 'agendamentos')).then((data) => {
        var agendamentos = []

        data.forEach((docs) => {
            agendamentos.push({id: docs.id, data: docs.data()})
        })

        res.render('consulta', { agendamentos: agendamentos})
    }).catch(function(erro){
        console.log("Ocorreu um erro: "+ erro)
    })
})
//

app.get("/editar/:id", function(req, res){
    getDoc(doc(db, "agendamentos", req.params.id)).then((data) => {
        var agendamentos = {id: data.id, data: data.data()}

        res.render('editar', { agendamento: agendamentos})
    }).catch((erro)=>{
        console.log("Ocorreu um erro: "+ erro)
    })


})

app.get("/excluir/:id", function(req, res){
    const { /*doc,*/ deleteDoc, getDoc } =  require("firebase/firestore");
    //const endereco = getDoc(doc(db, "agendamentos", req.params.id))

    deleteDoc(doc(db, "agendamentos", req.params.id)).then(()=> {
        res.redirect("/consulta")
    }).catch((erro)=>{
        console.log("Ocorreu um erro: "+ erro)
    })
})

app.post("/cadastrar", function(req, res){
    addDoc(collection(db, "agendamentos"), {
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then((data)=> {
        console.log("Added document")
        res.redirect("/")
    })
})

app.post("/atualizar", function(req, res){
    const refEndereco = doc(db, "agendamentos", req.body.id)
    updateDoc(refEndereco, {
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then((data)=> {
        console.log("document updated")
        res.redirect("/consulta")
    })
})

app.listen(8081, function(){
    console.log("Servidor ativo!")
})