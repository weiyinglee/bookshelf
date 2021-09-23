const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('../database/db')
const Books = mongoose.model('Books')

router.get('/get/all/:userId', (req, res, next) => {
  const { userId } = req.params
  Books
  .find({ userId })
  .exec((err, books) => {
    if (err) return res.json({ success: false, error: err })
    res.json({ success: true, books })
  })
})

router.get('/get/:bookId', (req, res, next) => {
  const { bookId } = req.params
  Books
  .findById(bookId)
  .exec((err, book) => {
    if (err) return res.json({ success: false, error: err })
    res.json({ success: true, book })
  })
})

router.post('/add/:userId', (req, res, next) => {
  const { userId } = req.params;
  const {
    title, authorName, finished, imageUrl,
    link, note,
  } = req.body
  const newBook = new Books({
    userId, title, authorName, finished, imageUrl,
    link, note,
  })
  newBook.save((err, book) => {
    if(err) return res.json({ success: false, error: err })
    res.json({ success: true })
  })
})

router.put('/edit/:bookId', (req, res, next) => {
  const { bookId } = req.params
  Books
  .findOneAndUpdate(
    { _id: bookId },
    { $set: req.body },
  ).exec((err, book) => {
    if (err) return res.json({ success: false, error: err })
    res.json({ success: true })
  })
})

router.delete('/delete/:bookId', (req, res, next) => {
  const { bookId } = req.params
  Books
  .findOneAndDelete({ _id: bookId })
  .exec((err) =>{
    if (err) return res.json({ success: false })
    res.json({ success: true })
  })
})

module.exports = router
