const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.PORT;
const mongo = require('mongoose');
const taskRoutes = require('./routes/taskRouter');
const user = require('./routes/user');
const { login } = require('./controller/auth');
const project = require('./routes/project');
const epic = require('./routes/epic');
const story = require('./routes/story');


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
app.use('/users',user);
app.use('/projects',project);
app.use('/stories',story);
app.post('/login', login);
app.use('/epics', epic)

