const http = require('http');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Server configuration
const SERVER_PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${SERVER_PORT}`;

// Test user credentials
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'TestPass123'
};

// Test task data
const testTask = {
    title: 'Test Task',
    description: 'This is a test task',
    status: 'pending',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
};

let authToken = null;
let taskId = null;

console.log('Starting API tests...\n');

// Function to make HTTP requests
function makeRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = data ? JSON.parse(data) : {};
                    resolve({ statusCode: res.statusCode, headers: res.headers, data: jsonData });
                } catch (error) {
                    resolve({ statusCode: res.statusCode, headers: res.headers, data: data });
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (postData) {
            req.write(postData);
        }
        
        req.end();
    });
}

// Test 1: Server running
async function testServerRunning() {
    console.log('1. Testing if server is running...');
    
    try {
        const options = {
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/',
            method: 'GET'
        };
        
        const response = await makeRequest(options);
        if (response.statusCode === 200) {
            console.log('   ✓ Server is running\n');
            return true;
        } else {
            console.log('   ✗ Server is not responding correctly\n');
            return false;
        }
    } catch (error) {
        console.log('   ✗ Server is not running. Please start the server first.\n');
        return false;
    }
}

// Test 2: User Registration
async function testUserRegistration() {
    console.log('2. Testing user registration...');
    
    try {
        const postData = JSON.stringify(testUser);
        const options = {
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/auth/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        const response = await makeRequest(options, postData);
        if (response.statusCode === 200) {
            console.log('   ✓ User registration successful\n');
            return true;
        } else {
            console.log('   ✗ User registration failed:', response.data.message || response.data, '\n');
            return false;
        }
    } catch (error) {
        console.log('   ✗ Error during user registration:', error.message, '\n');
        return false;
    }
}

// Test 3: User Login
async function testUserLogin() {
    console.log('3. Testing user login...');
    
    try {
        const loginData = {
            email: testUser.email,
            password: testUser.password
        };
        
        const postData = JSON.stringify(loginData);
        const options = {
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        const response = await makeRequest(options, postData);
        if (response.statusCode === 200 && response.data.token) {
            authToken = response.data.token;
            console.log('   ✓ User login successful\n');
            return true;
        } else {
            console.log('   ✗ User login failed:', response.data.message || response.data, '\n');
            return false;
        }
    } catch (error) {
        console.log('   ✗ Error during user login:', error.message, '\n');
        return false;
    }
}

// Test 4: Add Task
async function testAddTask() {
    console.log('4. Testing add task...');
    
    if (!authToken) {
        console.log('   ✗ No auth token available. Skipping test.\n');
        return false;
    }
    
    try {
        const postData = JSON.stringify(testTask);
        const options = {
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/tasks/add',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'Authorization': `Bearer ${authToken}`
            }
        };
        
        const response = await makeRequest(options, postData);
        if (response.statusCode === 201) {
            taskId = response.data._id;
            console.log('   ✓ Task added successfully\n');
            return true;
        } else {
            console.log('   ✗ Failed to add task:', response.data.message || response.data, '\n');
            return false;
        }
    } catch (error) {
        console.log('   ✗ Error during task creation:', error.message, '\n');
        return false;
    }
}

// Test 5: Get Tasks
async function testGetTasks() {
    console.log('5. Testing get tasks...');
    
    if (!authToken) {
        console.log('   ✗ No auth token available. Skipping test.\n');
        return false;
    }
    
    try {
        const options = {
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/tasks/get',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };
        
        const response = await makeRequest(options);
        if (response.statusCode === 200) {
            console.log(`   ✓ Tasks retrieved successfully. Found ${response.data.length} task(s)\n`);
            return true;
        } else {
            console.log('   ✗ Failed to retrieve tasks:', response.data.message || response.data, '\n');
            return false;
        }
    } catch (error) {
        console.log('   ✗ Error during task retrieval:', error.message, '\n');
        return false;
    }
}

// Test 6: Update Task
async function testUpdateTask() {
    console.log('6. Testing update task...');
    
    if (!authToken || !taskId) {
        console.log('   ✗ No auth token or task ID available. Skipping test.\n');
        return false;
    }
    
    try {
        const updateData = {
            title: 'Updated Test Task',
            description: 'This is an updated test task',
            status: 'done'
        };
        
        const postData = JSON.stringify(updateData);
        const options = {
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/tasks/update',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'Authorization': `Bearer ${authToken}`
            }
        };
        
        const response = await makeRequest(options, postData);
        if (response.statusCode === 200) {
            console.log('   ✓ Task updated successfully\n');
            return true;
        } else {
            console.log('   ✗ Failed to update task:', response.data.message || response.data, '\n');
            return false;
        }
    } catch (error) {
        console.log('   ✗ Error during task update:', error.message, '\n');
        return false;
    }
}

// Test 7: Delete Task
async function testDeleteTask() {
    console.log('7. Testing delete task...');
    
    if (!authToken || !taskId) {
        console.log('   ✗ No auth token or task ID available. Skipping test.\n');
        return false;
    }
    
    try {
        const deleteData = {
            taskId: taskId
        };
        
        const postData = JSON.stringify(deleteData);
        const options = {
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/tasks/remove',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'Authorization': `Bearer ${authToken}`
            }
        };
        
        const response = await makeRequest(options, postData);
        if (response.statusCode === 200) {
            console.log('   ✓ Task deleted successfully\n');
            return true;
        } else {
            console.log('   ✗ Failed to delete task:', response.data.message || response.data, '\n');
            return false;
        }
    } catch (error) {
        console.log('   ✗ Error during task deletion:', error.message, '\n');
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log(`Running API tests against ${BASE_URL}\n`);
    
    const tests = [
        testServerRunning,
        testUserRegistration,
        testUserLogin,
        testAddTask,
        testGetTasks,
        testUpdateTask,
        testDeleteTask
    ];
    
    let passedTests = 0;
    
    for (const test of tests) {
        try {
            const result = await test();
            if (result) passedTests++;
        } catch (error) {
            console.log(`   ✗ Test failed with error: ${error.message}\n`);
        }
    }
    
    console.log(`\nTests completed: ${passedTests}/${tests.length} passed`);
    
    if (passedTests === tests.length) {
        console.log('🎉 All tests passed!');
    } else {
        console.log('❌ Some tests failed. Please check the output above.');
    }
}

// Run the tests
runAllTests();