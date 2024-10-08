const Task = require('../model/task'); // Asegúrate de que Task sea el modelo, no el esquema
const mockData = require('../MOCK_DATA.json');

module.exports.createTask = (req, res) => {
    const task = ({
        'id': req.body.id,
        'title': req.body.title,
        'description': req.body.description,
        'start': req.body.start,
        'end': req.body.end,
        'status': req.body.status,
        'geo-long': req.body['geo-long'],
        'geo-lat ': req.body['geo-lat']
    });

    mockData.push(task);
    res.send('Tarea agregada');
};

module.exports.getTasks = (req, res) => {
    res.json(mockData);
}


module.exports.getSpecificTask = (req, res) => {

    const idBusqueda = req.params.id;
    let found = -1;
    for(let i=0;i<mockData.length;i++){
        if(mockData[i].id == idBusqueda){
            found = i;
            break;
        }
    }
    if(found!=-1){
        res.json(mockData[found]);
    }
    else{
        res.status(401).send('Task not found');

    }

}



module.exports.deleteATask = (req, res) => {
    const idBusqueda = req.params.id;
    let found = -1;
    for(let i=0;i<mockData.length;i++){
        if(mockData[i].id == idBusqueda){
            found = i;
            break;
        }
    }

    if(found!=-1){
        mockData.pop(mockData[found]);
        res.json('Task deleted');
    }
    else{
        res.status(401).send('Task not found');
    }
}
