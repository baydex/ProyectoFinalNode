module.exports = (res, _code, _message) => {
    return res.status(200).json({ code: _code, message: _message})
}