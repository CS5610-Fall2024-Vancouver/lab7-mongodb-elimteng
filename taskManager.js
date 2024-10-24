// Import the MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://elicmcc:tm123456@cluster0.3xn9e.mongodb.net/';
const client = new MongoClient(uri);

// Function to perform CRUD operations
async function run() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        // Access the taskManagerDB database and tasks collection
        const database = client.db('taskManagerDB');
        const tasksCollection = database.collection('tasks');

        // Insert a new task
        const task1 = {
            title: 'Complete MongoDB CRUD activity',
            description: 'Write a Node.js script that performs CRUD operations in MongoDB Atlas',
            completed: false,
            dueDate: '2024-11-15'
        };
        
        // Add three tasks to the tasks collection
        const tasks = [
            task1,
            {
                title: 'Read Node.js documentation',
                description: 'Familiarize with Node.js core concepts and features',
                completed: false,
                dueDate: '2024-11-01'
            },
            {
                title: 'Implement a REST API',
                description: 'Create a RESTful API using Express.js',
                completed: false,
                dueDate: '2024-11-10'
            }
        ];
        const insertResult = await tasksCollection.insertMany(tasks);
        console.log('Inserted tasks:', insertResult.insertedCount);

        // Query the tasks collection to retrieve all tasks
        const allTasks = await tasksCollection.find({}).toArray();
        console.log('All Tasks:');
        allTasks.forEach(task => {
            console.log(`Title: ${task.title}, Description: ${task.description}, Completed: ${task.completed}, Due Date: ${task.dueDate}`);
        });

        // Update a task by setting its completed status to true
        const updateResult = await tasksCollection.updateOne(
            { title: 'Complete MongoDB CRUD activity' }, // filter
            { $set: { completed: true } } // update
        );
        console.log('Updated Task Count:', updateResult.modifiedCount);

        // Delete a task based on its title
        const deleteResult = await tasksCollection.deleteOne({ title: 'Read Node.js documentation' });
        console.log('Deleted Task Count:', deleteResult.deletedCount);

        // Handle multiple tasks at once by inserting an array of tasks
        const additionalTasks = [
            {
                title: 'Deploy Node.js application',
                description: 'Deploy the application on Heroku',
                completed: false,
                dueDate: '2024-11-20'
            },
            {
                title: 'Create a personal portfolio',
                description: 'Build a portfolio website showcasing projects',
                completed: false,
                dueDate: '2024-11-30'
            }
        ];
        const insertAdditionalResult = await tasksCollection.insertMany(additionalTasks);
        console.log('Inserted additional tasks:', insertAdditionalResult.insertedCount);

        // Query and print tasks that are due in the future
        const futureTasks = await tasksCollection.find({ dueDate: { $gt: new Date().toISOString().split('T')[0] } }).toArray();
        console.log('Future Tasks:');
        futureTasks.forEach(task => {
            console.log(`Title: ${task.title}, Due Date: ${task.dueDate}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection to the database
        await client.close();
        console.log('Connection to MongoDB closed');
    }
}

// Run the CRUD operations
run();
