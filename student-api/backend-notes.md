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