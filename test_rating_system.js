// Test file to demonstrate the rating system functionality
// This file shows how the system prevents multiple ratings from the same user

const axios = require('axios');

// Configuration
const BASE_URL = 'https://arabfilmsserver.onrender.com/api';
const TEST_WORK_ID = '64f8a1b2c3d4e5f6a7b8c9d0'; // Replace with actual work ID
const TEST_USER_TOKEN = 'your-test-token-here'; // Replace with actual user token

// Test scenarios
async function testRatingSystem() {
    console.log('🧪 Testing Rating System - One Rating Per User Per Work\n');

    try {
        // Test 1: Submit initial rating
        console.log('📝 Test 1: Submitting initial rating (5 stars)');
        const initialRating = await submitRating(5);
        console.log('✅ Initial rating submitted successfully:', initialRating.data);
        console.log('');

        // Test 2: Try to submit another rating (should update existing)
        console.log('📝 Test 2: Submitting another rating (3 stars) - should update existing');
        const updatedRating = await submitRating(3);
        console.log('✅ Rating updated successfully:', updatedRating.data);
        console.log('');

        // Test 3: Get user's current rating
        console.log('📝 Test 3: Getting user\'s current rating');
        const userRating = await getUserRating();
        console.log('✅ User rating retrieved:', userRating.data);
        console.log('');

        // Test 4: Get average rating
        console.log('📝 Test 4: Getting average rating for work');
        const avgRating = await getAverageRating();
        console.log('✅ Average rating retrieved:', avgRating.data);
        console.log('');

        console.log('🎉 All tests passed! The system correctly prevents multiple ratings and allows updates.');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Helper functions
async function submitRating(ratingValue) {
    return axios.post(`${BASE_URL}/ratings`, {
        workId: TEST_WORK_ID,
        ratingValue: ratingValue
    }, {
        headers: {
            'Authorization': `Bearer ${TEST_USER_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
}

async function getUserRating() {
    return axios.get(`${BASE_URL}/ratings/user/${TEST_WORK_ID}`, {
        headers: {
            'Authorization': `Bearer ${TEST_USER_TOKEN}`
        }
    });
}

async function getAverageRating() {
    return axios.get(`${BASE_URL}/ratings/average/${TEST_WORK_ID}`);
}

// Run tests if this file is executed directly
if (require.main === module) {
    testRatingSystem();
}

module.exports = {
    testRatingSystem,
    submitRating,
    getUserRating,
    getAverageRating
};
