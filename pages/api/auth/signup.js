const connectdb = require('../../../config/db');
const userModel = require('../../../models/user.model');
const argon2 = require('argon2');

const signup = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const { name, email, password } = req.body;
            await userModel.create({
                name,
                email,
                password: await argon2.hash(password),
            });
            return res.status(201).send('Account created');
        } else {
            return res.status(405).send('Method not allowed');
        }
    } catch {
        return res.status(400).send('Bad request');
    }
};

export default connectdb(signup);
