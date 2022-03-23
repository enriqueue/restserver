const { request, response } = require('express');

const getController = (req = request, res = response) => {
    res.json({
        msg: 'get - controller'
    });
}

const postController = (req = request, res = response) => {
    res.json({
        msg: 'post - controller'
    });
}

const putController = (req = request, res = response) => {
    res.json({
        msg: 'put - controller'
    });
}

const deleteController = (req = request, res = response) => {
    res.json({
        msg: 'delete - controller'
    });
}

module.exports = {
    getController, 
    postController, 
    putController, 
    deleteController
}