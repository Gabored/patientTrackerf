const logoutMiddleware = (req, res) => {
    // Clear the token cookie
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/');  // Redirect to the login page after logout
};

module.exports = logoutMiddleware;