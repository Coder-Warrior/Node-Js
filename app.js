const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/schems");
const Mydatac = require("./models/schemaforc");
app.set('view engine', 'ejs')
app.use(express.static('public'));
var moment = require('moment');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  Mydatac.find().then((result) => {
    res.render("home", {arr: result, moment: moment})
  }).catch((err) => console.log(err));
})

app.get('/user/any.ejs', (req, res) => {
  res.render("user/any");
});

app.get('/user/login.ejs', (req, res) => {
  res.render("user/login");
});

app.post('/user/login.ejs', (req, res) => {
  console.log(req.body);
  const mydatac = new Mydatac(req.body);
  Mydatac.create(req.body).then(res.redirect('/')).catch((err) => {console.log(err)});
});

app.post('/search', (req, res) => {
Mydatac.find({age: 33}).then(
  (result) => {console.log(result)}
).catch(
  (err) => {console.log(err)}
);
});

app.get('/edit/:id', (req, res) => {
  Mydatac.findById(req.params.id).then((result) => {
    res.render("user/edity", {arr: result, moment: moment})
  }).catch((err) => {console.log(err)})
});

app.get('/user/:id', (req, res) => {
  Mydatac.findById(req.params.id).then((result) => {
    res.render("user/show", {arr: result, moment: moment})
  }).catch((err) => {console.log(err)})
});

app.delete("/edit/:id", (req, res) => {
  Mydatac.findByIdAndDelete(req.params.id).then(() => {
  res.redirect("/");
  }).catch((err) => console.log(err));
}); 

app.put("/edit/:id", (req, res) => {
  Mydatac.findByIdAndUpdate(req.params.id, req.body).then(() => {
  res.redirect("/");
  }).catch((err) => console.log(err));
}); 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb+srv://first:7wLP4QxtxvBgS1Pk@cluster0.r0yuulq.mongodb.net/all-datas?retryWrites=true&w=majority')
.then(() => {
  console.log("connected");
})
.catch((err) => {console.log(err)});