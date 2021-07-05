const db = require('../data/db-config')
const { orderBy } = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    updateSchemes,
    remove
}

function find(){
    return db('schemes')
}

function findById(id){
    return db('schemes').where({id}).first()
}

function findSteps(id){
    return db('steps as s')
        .select('schemes.scheme_name', 's.step_number', 's.instructions')
        .join('schemes', 's.scheme_id', 'schemes.id')
        .orderBy('s.step_number')
        .where({scheme_id: id})
}

function add(scheme){
    return db('schemes')
        .insert(scheme, 'id')
        .then(ids => {
            const id = ids[0]
            return findById(id)
        })
}

function updateSchemes(changes, id){
    return db('schemes')
        .where({id})
        .update(changes)
        .then(() => {
            return findById(id)
        })
}

function remove(id){
    return db('schemes')
        .where({id})
        .del()

}







// const db = require('../data/db-config')

// module.exports = {
//     find,
//     findById,
//     findSteps,
//     add,
//     addStep,
//     updateSchemes,
//     remove
// }

// function find(){
//     return db('schemes')
// }

// function findById(id){
//     return db('schemes')
//         .where({id})
//         .first()
// }

// function findSteps(id){
//     return db('steps')
//         .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
//         .join('schemes', 'schemes.id', 'steps.scheme_id')
//         .orderBy('steps.step_number')
//         .where({scheme_id: id})
// }

// function add(schemeData){

//     return db('schemes').insert(schemeData, "id")
//         .then(ids => {
//             const id = ids[0]
//             return findById(id)
//         })
// }

// function addStep(){
//     return
// }

// function updateSchemes(changes, id){
//     return db('schemes')
//         .where({id})
//         .update(changes)
//         .then(() => {
//             return findById(id)
//         })
// }

// function remove(id){
//     return db('schemes')
//         .where({ id })
//         .del()
// }