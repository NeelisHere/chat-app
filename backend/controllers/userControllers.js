const login = (req, res) => {
    console.log(`[endpoint working] inside: api/v1/users/login`.cyan)
    res.json({
        success: true,
        data: req.body
    })
}
const register = () => {
    console.log(`[endpoint working] inside: api/v1/users/register`.blue.bold)
}

module.exports={ login, register }