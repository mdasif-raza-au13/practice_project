import express from 'express';
import path from 'path';
import bodyparser from 'body-parser';

const app = express();
const port = 1001;
const __dirname = path.resolve();
const user = [];

app.use(express.static(path.join(__dirname, "views")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "hbs");

const layout = path.join('layout','main');

app.get('/', (req, res) => {
    const data = {
        layout,
        user,
        title: 'Sign Up',
        name: '',
        email: '',
        number: '',
    };
    res.render('signup');
})

app.post('/signup', (req, res) => {
    const error = {};
    const data = {
        layout,
        title: 'Sign Up',
        ...req.body
    }
    if(!req.body.name) {
        error.name = 'Please enter the name';
        res.render('signup',{...data,error});
        return;
    }
    user.push(req.body);
    console.log(user);
    res.redirect('/');
})

app.get('/users',(req,res)=>{
    res.json({
        title:'User Listing',
        user
    });
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})