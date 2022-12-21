const connectdb = require('../../../config/db');
const userModel = require('../../../models/user.model');
const argon2 = require('argon2');
const signToken = require('../../../controllers/signToken');

const login = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const { email, password } = req.body;
            const user = await userModel.findOne({
                email,
            });
            if (await argon2.verify(user.password, password)) {
                const token = signToken(user);
                return res
                    .status(200)
                    .send({ token, message: 'Login success' });
            }
            return res.status(401).send('Unauthorized');
        } else {
            return res.status(405).send('Method not allowed');
        }
    } catch {
        return res.status(400).send('Bad request');
    }
};

export default connectdb(login);
