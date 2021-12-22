const express = require("express");
const app = express();
const connection = require('./databases/database');
const Questions = require('./databases/Questions');
const Answers = require('./databases/Answers');
const port = 3000;

//EJS
app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));

//Body-Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Sequelize
connection
    .authenticate()
    .then(() => {
        console.log("Connection between server and database successful")
    })
    .catch((error) => {
        console.log(error);
    })

//routes
app.get("/", (req,res) => {
    Questions.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then((question) => {
        res.render("index", {
            question:question
        });
    });
});

app.get("/ask", (req,res) => {
    res.render('ask');
});

app.get("/question/:id", (req,res) => {
    let id = req.params.id;
    Questions.findOne({
        where: {id:id}
    }).then((question) => {
        if(question != undefined) {

            Answers.findAll({
                where: {question_id:question.id}
            }).then((answers) => {
                res.render('question', {
                    question:question,
                    answers:answers
                });
            });
        } else {
            res.render('/');
        }
    });
});

app.post('/saveQuestion', (req,res) => {   
    let title = req.body.title;
    let description = req.body.description;

    Questions.create({
        title:title,
        description:description
    }).then(() => {
        res.redirect('/');
    });
});

app.post('/saveAnswer', (req,res) => {
    let name = req.body.name;
    let body = req.body.body;
    let question_id = req.body.question_id;

    Answers.create({
        name:name,
        body:body,
        question_id:question_id
    }).then(() => {
        res.redirect(`/question/${question_id}`)
    })
})

//server running
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})