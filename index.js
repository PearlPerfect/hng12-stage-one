require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Function to check if a number is prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
  const digits = num.toString().split("");
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), power), 0);
  return sum === num;
};

// Function to get the digit sum
const digitSum = (num) => {
  return num.toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
};

// Function to fetch a fun fact from Numbers API
const getFunFact = async (num) => {
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    return response.data;
  } catch (error) {
    return "No fun fact available";
  }
};

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
  const number = req.query.number;

  // Validate input
  if (!number || isNaN(number)) {
    return res.status(400).json({
      number: number,
      error: true,
    });
  }

  const num = parseInt(number);

  // Determine properties
  let properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  // Fetch fun fact
  const funFact = await getFunFact(num);

  // Construct response
  const response = {
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties: properties,
    digit_sum: digitSum(num),
    fun_fact: funFact,
  };

  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
