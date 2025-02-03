# Number Classifier API

This API takes a number as input and returns interesting mathematical properties about it, along with a fun fact.

## Running Locally

1. Clone the repository: git clone `https://github.com/PearlPerfect/hng12-stage-one`
2. Install dependencies: npm install
3. Start the server: node index.js
## API Specification

**Endpoint:** 
`GET localhost:8000/api/classify-number?number=<number>` for local server
`GET https://hng12-stage-one.vercel.app/api/classify-number`

**Parameters:**

* `number` (required): An integer.

**Response (200 OK):**

``json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

**Response (400 Bad Request):**
``json
{
  "number": "alphabet",
  "error": true
}

## Testing
You can test the API using tools like Postman or curl. Example: curl "http://localhost:8000/api/classify-number?number=371"