Middleware ek function hai jo Request aur Controller ke beech execute hota hai.

const middleware = (req, res, next) => {

    next();

}

Middleware ke 3 Rules
1. next() → Request ko aage bhejta hai.

2. res.send() / res.json() → Response bhejkar request khatam kar deta hai.

3. Agar next() bhi nahi aur response bhi nahi,
   to request wahi atak jaati hai.


Execution Flow

Client
   │
   ▼
Middleware
   │
next()
   ▼
Route
   │
   ▼
Controller
   │
   ▼
Response

===*************===

Golden Rule (Ye notebook me likh lo) 

Code	Result

fetch()	Promise<Response>
await fetch()	Response
response.json()	Promise<JSON>
await response.json()	Actual JSON Data



==========***********===========

Rule 1
async function test() {
    return 10;
}

⬇

Promise.resolve(10)
Rule 2
async function test() {
    throw new Error();
}

⬇

Promise.reject(error)
Rule 3
async function test() {

    try {
        ...
    } catch(err) {

        return "Recovered";

    }

}

⬇

Promise.resolve("Recovered")

Kyunki error handle ho gayi.


===========***=============

Schema = Blueprint

Model = Database se baat karne ka interface

Schema → Model → CRUD Operations → MongoDB

===========***===========

Function    =>  Return
fetch() =>  Promise<Response>
response.json() =>   Promise<JSON>
mongoose.connect()  =>  Promise
Student.create()    =>  Promise<Student>
Student.find()  =>    Promise<Array> ✅
Student.findById()  =>  Promise<Student>