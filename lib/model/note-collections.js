const Model = require('../../mongoose/schema.js');

class Collections{
    constructor(){
    }
     create(data){
       const newModel = new Model(data);
       return newModel.save();
    }

    get(){
     return Model.find()
    }

    delete(id){
        return Model.deleteOne({id})
    }
}

module.exports = Collections;