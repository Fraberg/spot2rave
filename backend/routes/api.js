const Pet = require('../models/pet');
const express = require('express');
const path = require('path')

const router = express.Router();

// router.post('/pet/new', upload.single('image'), (req, res) => {
//     if (!req.file) {

//         console.log("Please include a pet image");
//         return res.send({
//             success: false
//         });

//     } else {
//         const host = req.get('host')
//         const imageUrl = req.protocol + "://" + host + '/' + req.file.path;

//         Pet.create({
//             name: req.body.name,
//             type: req.body.type,
//             description: req.body.description,
//             imageUrl
//         }, (err, pet) => {
//             if (err) {
//                 console.log('CREATE error: ' + err);
//                 res.status(500).send('Error')
//             } else {
//                 res.status(200).json(pet)
//             }
//         })
//     }
// })

// router.get('/pet/:_id', (req, res) => {
//     Pet.findById(req.params._id, (err, pet) => {
//         if (err) {
//             console.log('RETRIEVE error: ' + err);
//             res.status(500).send('Error');
//         } else if (pet) {
//             res.status(200).json(pet)
//         } else {
//             res.status(404).send('Item not found')
//         }
//     })
// })

// router.get('/pets', (req, res) => {
//     const pets = Pet.find({}, (err, pets) => {
//         if (err) {
//             console.log('RETRIEVE error: ' + err);
//             res.status(500).send('Error');
//         } else if (pets) {
//             res.status(200).json(pets);
//         }
//     })
// })

module.exports = router;