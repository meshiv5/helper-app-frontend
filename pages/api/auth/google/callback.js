const connectdb = require('../../../../config/db');
const passport = require('passport');

const callback = async (req, res) => {
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false,
    });
};

export default connectdb(callback);
