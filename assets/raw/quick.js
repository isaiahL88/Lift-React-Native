const fs = require('fs');
const readline = require('readline');

// File paths
const csvFilePath = './assets/raw/exercise_data.csv';
const jsonFilePath = './assets/raw/exercise_data2.json';

// Create an empty array to store CSV data
let exercises = [];

// Create a readline interface to read the CSV file line by line
const rl = readline.createInterface({
    input: fs.createReadStream(csvFilePath),
    output: process.stdout,
    terminal: false
});

// Read each line of the CSV file
rl.on('line', function (line) {
    // Split the line into an array of values
    let values = line.split('*');

    // Assuming each line has two values (e.g., exercise name and duration)
    if (values.length === 2) {
        // Create an object with the values and push it to the exerciseData array
        exercises.push({ name: values[0], type: values[1] });
    }
});

// When the readline interface reaches the end of the file, save the data as JSON
rl.on('close', function () {
    // Convert the exerciseData array to JSON format
    let jsonData = JSON.stringify(exercises, null, 2);

    // Write the JSON data to a new file
    fs.writeFile(jsonFilePath, jsonData, 'utf8', function (err) {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('JSON file saved successfully!');
        }
    });
});