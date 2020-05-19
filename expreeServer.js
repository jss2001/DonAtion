const express = require('express')
const app = express()
const path = require('path')
var request = require('request')
var mysql      = require('mysql');
const DATE_FORMATER = require( 'dateformat' );


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0525',
  database : 'fintech'
});
 
connection.connect();


app.set('views', path.join(__dirname, 'views')); // ejs file location
app.set('view engine', 'ejs'); //select view template engine


app.use(express.static(path.join(__dirname, 'public'))); // to use static asset (design)
app.use(express.json());
app.use(express.urlencoded({extended:false}));//ajax로 데이터 전송하는 것을 허용s

// root 라우터
app.get('/', function (req, res) {
    res.render('index');
})

//기부리스트
app.get('/charityList', function(req, res) {
    var sql = "SELECT * FROM charity"
    connection.query(sql, function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else{
            console.log(result);
            for(var i = 0; i < result.length; i++){
                result[i].startdate = DATE_FORMATER(result[i].startdate, "yyyy-mm-dd" );
                result[i].enddate = DATE_FORMATER( result[i].enddate, "yyyy-mm-dd" );
                result[i].percent = Math.round((result[i].current_amount / result[i].target_amount) * 100);
            }
            res.render('charityList', {charityList : result});
        }
    })
})

//기부처 상세보기
app.get('/charityDetail/:charityid', function(req, res) {
    var charityid = req.params.charityid;
    var sql = "SELECT * FROM charity where idcharity = ?"
    console.log(charityid);
    connection.query(sql, [charityid], function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else{
            console.log(result);
            result[0].startdate = DATE_FORMATER(result[0].startdate, "yyyy-mm-dd" );
            result[0].enddate = DATE_FORMATER( result[0].enddate, "yyyy-mm-dd" );
            result[0].percent = Math.round((result[0].current_amount / result[0].target_amount) * 100);
            res.render('charityDetail', {charity : result});
        }
    })
})

app.listen(3000);