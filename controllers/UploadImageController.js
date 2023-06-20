const asyncHandler = require('express-async-handler')

// @desc Upload a image
// @route Post /upload_files
// @access Public
const upload = asyncHandler(async (req, res) => {
    if (req.file) {
        res.json({
            image: 'localhost:5000/' + req.file.path.replace(/\\/g, '/')
        })
        console.log(req.file.path.replace(/\\/g, '/'))
    }
})
module.exports = { upload }