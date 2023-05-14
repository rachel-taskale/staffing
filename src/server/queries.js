const client = require("./connection.js");

const getAll = () => {

  console.log('get all called')
  return Promise.all([getClients(), getStaff(), getRoles(), getEvents()])
};


// get all clients
const getClients = () => {
  return new Promise((resolve, reject) => {
    client.query("SELECT * FROM clients_list", 
    (err, result) => {
      if (!err) {
        return resolve(result.rows)
      } else {
        return reject()
      }
    });
  });
};

// get all staff
const getStaff = () => {
  return new Promise((resolve, reject) => {
    client.query("SELECT * FROM staff_list", 
    (err, result) => {
      if (!err) {
        return resolve(result.rows)
      } else {
        return reject(err)
      }
    });
  });
};

// get all roles
const getRoles = () => {
  return new Promise((resolve, reject) => {
    client.query("SELECT * FROM roles", 
    (err, result) => {
      if (!err) {
        return resolve(result.rows)
      } else {
        return reject(err)
      }
    });
  });
};

// get staff by id
const getStaffById = (id) =>{
    return new Promise((resolve, reject)=> {
        client.query(`SELECT * FROM staff_list WHERE staff_id = $1`, [id], 
        (err, result)=>{
            if (!err){
                return resolve(result.rows)
            }else{
                return reject(err)
            }
        })
    })
}


// add staff member
const addStaff = ({ staff_id, first_name, last_name, email, phone }) => {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO staff_list(staff_id, first_name, last_name, email, phone) VALUES($1, $2, $3, $4, $5)`,
        [staff_id, first_name, last_name, email, phone],
        (err, result) => {
          if (!err) {
            return resolve()
          } else {
            return reject(err)
          }
        }
      );
    });
  };

// add client
const addClient = ({ client_id, name, email, phone }) => {
    return new Promise((resolve, reject)=>{
        client.query(
            `INSERT INTO clients_list(client_id, name, email, phone) VALUES($1, $2, $3, $4)`,
            [client_id, name, email, phone],
            (err, result) => {
              if (!err) {
                return resolve()
              }else{
                return reject(err)
              }
        })
    })
}


// delete client
const deleteClient = (client_id) => {
  return new Promise((resolve, reject)=>{
    client.query(`DELETE FROM clients_list WHERE client_id = $1`, [client_id], 
    (err, result)=>{
      if (!err){
        return resolve()
      }else{
        return reject(err)
      }

    })
  })

}

// delete staff member
const deleteStaff= ({staff_id, first_name, last_name}) => {
  return new Promise((resolve, reject)=>{
    client.query(`DELETE FROM staff_list WHERE staff_id = $1 AND first_name = $2 AND last_name = $3`, [staff_id, first_name, last_name],
    (err, result)=>{
      if (!err){
        return resolve()
      }else{
        return reject(err)
      }
    })
  })
}

// assign role to client
const assignRole = ({staff_id, first_name, last_name, type_id}) =>{
  return new Promise((resolve, reject)=>{
    client.query(`INSERT INTO roles (staff_id, first_name, last_name, type_id) VALUES($1, $2, $3, $4)`, [staff_id, first_name, last_name, type_id],
    (err, result)=>{
      if (!err){
        return resolve()
      }else{
        return reject(err)
      }

    })
  })

}

// remove role from client
const removeRole = ({staff_id, first_name, last_name, type_id}) =>{
  return new Promise((resolve, reject)=>{
    client.query(`DELETE FROM roles WHERE staff_id = $1 AND first_name = $2 AND last_name = $3 AND type_id = $4`, [staff_id, first_name, last_name, type_id],
    (err, result)=>{
      if (!err){
        return resolve()
      }else{
        return reject(err)
      }

    })
  })

}


// get list of events
const getEvents = () =>{
  return new Promise((resolve, reject)=> {
      client.query(`SELECT * FROM events`, 
      (err, result)=>{
          if (!err){
              return resolve(result.rows)
          }else{
              return reject(err)
          }
      })
  })
}







module.exports = {
  getAll,
  getStaff,
  getClients,
  getStaffById,
  getRoles,
  addStaff,
  addClient,
  deleteClient,
  deleteStaff,
  assignRole,
  removeRole,
  getEvents
};
