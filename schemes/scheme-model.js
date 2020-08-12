const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    // addStep,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({id})
        .first()
}

function findSteps(id) {
    return db('steps')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions', 'steps.id')
        .join('schemes', 'schemes.id', 'steps.scheme_id')
        .orderBy('steps.step_number')
        .where({ scheme_id: id })

        
        // .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions' )
        // .join('schemes')
        // .orderBy('steps.step_number')
        // .where('schemes.id', id)
        
}

function add(schemeData) {
    return db('schemes')
        .insert(schemeData, 'id')
        .returning('id')
        .then(ids => {
            return findById(ids[0])
        })

}

// function addStep(stepData) {
// return db('steps')
//         .insert(stepData, 'id')
//         .returning('id')
//         .then(ids => {
//             return findById(ids[0])
//         })
// }

function update(changes, id) {
    return db('schemes')
        .where({id})
        .update(changes)
        .then(() => {
            return findById(id)
        })
}

function remove(id) {
    return db('schemes')
        .where({id})
        .del()
}