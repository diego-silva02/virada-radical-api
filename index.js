const express = require("express");
const cors = require("cors");
const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyApwlecSaMi3KiUvpFUhoouC4_JK5gl8NQ",
    authDomain: "virada-db.firebaseapp.com",
    projectId: "virada-db",
    storageBucket: "virada-db.appspot.com",
    messagingSenderId: "831984676947",
    appId: "1:831984676947:web:b96a9b41c532c4029216a6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const Participants = db.collection("participants");

const app = express();

app.use(express.json())
app.use(cors());

app.post('/participants', async (req, res) => {
    const data = req.body;
    await Participants.add(data);

    res.status(201).send({msg: "Participante criado com sucesso"})
});

app.get('/participants', async (req, res) => {
    const snapshot = await Participants.get();
    const filteredParticipants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    res.send(filteredParticipants);
});

app.get('/participants/:id', async (req, res) => {
    const id = req.params.id;
    const snapshot = await Participants.get();
    const filteredParticipants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    const participant = filteredParticipants.filter(p => {
        return p.id == id
    })

    res.send(participant);
});

app.put('/participants/:id', async (req, res) => {
    const id = req.params.id;
    await Participants.doc(id).update(req.body);

    res.send({msg: "Participante atualizado com sucesso"});
});

app.delete('/participants/:id', async (req, res) => {
    const id = req.params.id;
    await Participants.doc(id).delete();

    res.send({msg: "Participante deletado com sucesso"});
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Aplicação rodando em http://localhost:3000");
})