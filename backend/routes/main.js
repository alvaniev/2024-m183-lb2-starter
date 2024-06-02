// moudule providing objects and functions for routing
const express = require('express');
// import controller functions
const userCtrl = require('../controllers/user');
const postingCtrl = require('../controllers/posting');
const mainCtrl = require('../controllers/main');

const router = express.Router();

router.post('/login', userCtrl.login);
// router.get('/users/:ids', userCtrl.getUsers);
router.get('/users', userCtrl.filterUsers);
router.get('/users/:id', userCtrl.getUser);
router.post('/users', userCtrl.signup);
router.delete('/users/:id', userCtrl.deleteUser);



router.get('/postings', postingCtrl.getToplevelPostings);
router.get('/postings/:id', postingCtrl.getPostingById);
router.get('/postings/:id/postings', postingCtrl.getSubPostings);
router.get('/users/:id/postings', postingCtrl.getPostingsOfAuthor);
// router.delete('/postings/:ids', ctrl.deletePostings);
router.post('/postings', postingCtrl.addToplevelPosting);
router.post('/postings/:id/postings', postingCtrl.addSubPosting);
router.post('/users/:id/votes', postingCtrl.vote);
router.delete('/users/:userId/votes/:postingId', postingCtrl.unvote);
router.get('/', mainCtrl.doNothing);


router.get('/hw', mainCtrl.getHelloWorld);
router.post('/pm', mainCtrl.postMessage);


//router.post('/signup', ctrl.postSignup);

//router.get('/toplevelpostings', ctrl.getTopLevelPostings);



module.exports = router;