

// GET  Homepage


exports.homepage = async (req, res) => {
    res.render('index', { title : '오레오조 베이커리 - Home' })
}
