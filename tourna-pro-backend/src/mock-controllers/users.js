exports.getUser = function(req, res) {
  res.json({
    id: req.params.id,
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mario.rossi@domain.com',
    telephoneNumber: '1234567890',
    birthDate: '1996-14-10',
    gender: 'M',
    city: 'Cesena',
    userName: 'mariorossi',
    imageURL: 'https://pbs.twimg.com/profile_images/1238939034375852033/WVD5HR5G_400x400.jpg'
  })
}
