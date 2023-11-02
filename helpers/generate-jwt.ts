const jwt = require('jsonwebtoken');

export const generateJWT = (uid: string) => {

  return new Promise ((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '1d'
    }, ( err: Error, token: string) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el Token')
      } else {
        resolve(token);
      }
    })
  })
}