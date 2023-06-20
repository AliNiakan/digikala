const multer = require('multer')
const mkdirp = require('mkdirp')
const express = require('express')
const app = express()


const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let day = new Date().getDay()
        let dir = `./public/uploads/images/${year}/${month}/${day}`
        mkdirp(dir).then(cb(null, dir))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const uploadImage = multer({
    storage: imageStorage
})



module.exports = { uploadImage }