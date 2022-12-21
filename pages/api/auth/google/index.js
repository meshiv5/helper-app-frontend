const connectdb = require('../../../../config/db');
const passport = require('passport');

const google = async (req, res) => {
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    });
};

export default connectdb(google);
