const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRouter');


app.listen(3000, () => {
    console.log(`Servidor corriendo...`);
});

app.use(express.json());
app.use('/tasks',taskRoutes);

app.get('/projects',
    (req, res ,next) => (
        console.log(req),
        res.send('asd'))
)

