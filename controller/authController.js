const passport = require('passport')
const validator = require('validator')
const User = require('../model/User')

module.exports = {
  getLogin: (req, res) => {
    if (req.user) {
      return res.redirect('/notes')
    }
    res.render('login.ejs')
  },
  postLogin: (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      console.log('hello')
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        //console.log('cool')
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        console.log('cool')
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/notes')
      })
    })(req, res, next)

  },
  getSignup: (req, res) => {
    if (req.user) {
      return res.redirect('/notes')
    }
    res.render('signup.ejs')
  },


  postSignup: async (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })

    // try{
    const doesExistEmail = await User.findOne({ email: req.body.email })
    const doesExistUsername = await User.findOne({ email: req.body.username })
    if (doesExistEmail || doesExistUsername) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
    }
    user.save()
    return res.redirect("../notes")
    // (err, existingUser) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   if (existingUser) {
    //     req.flash("errors", {
    //       msg: "Account with that email address or username already exists.",
    //     });
    //     return res.redirect("../signup");
    //   }
    // } catch(err){
    //   console.error(err)
    // }
    // } catch(err){
    //   console.log(err)
  }

}