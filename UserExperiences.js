const express = require('express');
const router = express.Router()
const db = require('../../models')

const UserExperience = require('../models/Summary');
const Book = require('../models/Book');
const User = require*('../models/User');


router.post('/', (req,res) => {     // assumes req.body structure of {bookInfo: {title: XXX, author: XXX, etc}, userExperienceInfo: {rating: X, status: XXXX, etc}}

    const createUserExperience = (bookId) => {    // will be called later in the route, depending on whether the relevant Book is found or created
        req.body.userExperienceInfo.bookId = bookId;
        db.UserExperience.create({req.body.userExperienceInfo}) 
        // may want to refactor later to make sure bookId&userId combo is unique, so that user doesn't accidentally review the same book twice
        .then(createdUserExperience => {
            res.send({createdUserExperience})
        })
        .catch(err => {
            res.send({error: `Error in userExperience router Create method while creating userExperience: ${err}`});
        })
    }

    //Look for book with same title as new userExperience's book.  If it doesn't exist, create it.  Return its id here,
    //then create the new userExperience using the above function.
    db.Book.findOne({title: req.body.bookInfo.title})
        .select("_id")
        .then(foundBook => {
            if (foundBook){
                createUserExperience(foundBook._id);
            } else {              
                db.Book.create({req.body.bookInfo})
                    .then(createdBook => {
                        createUserExperience(createdBook._id);
                    })
                    .catch(err => { 
                        res.send({error: `Error in userExperience route Create method while creating Book: ${err}`});
                    })
            }
        })
        .catch(err => { 
            res.send({error: `Error in userExperience route Create method while finding Book: ${err}`})
        })
})