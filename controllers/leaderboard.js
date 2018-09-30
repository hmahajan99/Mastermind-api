const getLeaderboard = (req, res, db) => {

  db.select('name','entries').from('users').orderBy('entries', 'desc').limit(5)
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(err => res.status(400).json('error getting leaderboard'))

}


module.exports = {
  getLeaderboard
}