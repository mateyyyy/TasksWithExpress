const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.PORT;
const mongo = require('mongoose');
const taskRoutes = require('./routes/taskRouter');

console.log(process.env.PORT)

mongo.connect(process.env.MONGOCONEXION,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado a MongoDB correctamente");
    app.listen(port, () => {
        console.log(`Servidor corriendo...`);
    });
})
.catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
});

app.use(express.json());
app.use('/tasks',taskRoutes);

app.get('/',
    (req, res) => res.send('Hola como te va')
)

app.get('/projects',
    (req, res ,next) => (
        console.log(req),
        res.send('asd'))
)

