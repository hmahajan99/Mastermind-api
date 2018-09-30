const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const changePassword = (newPassword,userEmail,db, bcrypt) => {

  const newHash = bcrypt.hashSync(newPassword);
  db('login').where({email:userEmail})
    .update({hash: newHash})
    .returning('email')
    .then(email => console.log(email[0]))
    .catch(err => 'error')

}



const handlePasswordChange = (req, res, db, bcrypt) => {
  const {currentPassword,newPassword,userEmail} = req.body;
  
  if(userEmail === 'guest@gmail.com'){
    return res.json('Cant change password of guest account')
  }

  db.select('hash').from('login').where({email:userEmail})
    .then(data => {
      const hash = data[0].hash;
      const isValid = bcrypt.compareSync(currentPassword, hash);
      if(isValid){
        changePassword(newPassword,userEmail,db, bcrypt);
        return res.json('success')
      }else{
        return res.status(400).json('error changing password')
      }
    })
    .catch(err => res.status(400).json('error changing password'))  

}

const deleteAccount = (req, res, db, bcrypt) => {

    const {userEmail} = req.body;

    if(userEmail === 'guest@gmail.com'){
      return res.json('Cant delete guest account')
    }

    db.transaction(trx => {
      trx('login').where({email:userEmail})
      .del()
      .then( () => {
        return trx('users')
          .where({email:userEmail})
          .del()
      })
      .then( () => {
        trx.commit()
        res.json('success')
      })
      .catch(() => {
        trx.rollback()
        res.json('fail')  
      })
    })
    
}


module.exports = {
  handleProfileGet,
  handlePasswordChange,
  deleteAccount
}