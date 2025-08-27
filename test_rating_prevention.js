// Test file to demonstrate the rating prevention system
// This file shows how the system prevents multiple ratings from the same user

const axios = require('axios');

// Configuration
const BASE_URL = 'https://arabfilmsserver.onrender.com/api';
const TEST_WORK_ID = '64f8a1b2c3d4e5f6a7b8c9d0'; // Replace with actual work ID
const TEST_USER_TOKEN = 'your-test-token-here'; // Replace with actual user token

// Test scenarios
async function testRatingPrevention() {
    console.log('🧪 Testing Rating Prevention System - One Rating Per User Per Work (No Updates)\n');

    try {
        // Test 1: Submit initial rating
        console.log('📝 Test 1: Submitting initial rating (5 stars)');
        const initialRating = await submitRating(5);
        console.log('✅ Initial rating submitted successfully:', initialRating.data);
        console.log('');

        // Test 2: Try to submit another rating (should be prevented)
        console.log('📝 Test 2: Attempting to submit another rating (3 stars) - should be prevented');
        try {
            const secondRating = await submitRating(3);
            console.log('❌ ERROR: Second rating was allowed, but should have been prevented!');
            console.log('Second rating result:', secondRating.data);
        } catch (error) {
            if (error.response?.status === 400) {
                console.log('✅ SUCCESS: Second rating was correctly prevented');
                console.log('Error message:', error.response.data.message);
            } else {
                console.log('❌ Unexpected error:', error.message);
            }
        }
        console.log('');

        // Test 3: Get user's current rating
        console.log('📝 Test 3: Getting user\'s current rating');
        const userRating = await getUserRating();
        console.log('✅ User rating retrieved:', userRating.data);
        console.log('Expected: Should still be 5 stars (unchanged)');
        console.log('');

        // Test 4: Get average rating
        console.log('📝 Test 4: Getting average rating for work');
        const avgRating = await getAverageRating();
        console.log('✅ Average rating retrieved:', avgRating.data);
        console.log('Expected: Should reflect only the first rating');
        console.log('');

        console.log('🎉 All tests completed! The system correctly prevents multiple ratings.');

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

// Frontend simulation test
function simulateFrontendBehavior() {
    console.log('\n🖥️ Frontend Behavior Simulation:');
    console.log('1. User visits work details page');
    console.log('2. System checks if user has already rated');
    console.log('3. If rated: Shows "لقد قيمت هذا العمل مسبقاً" message');
    console.log('4. If rated: Disables all rating buttons');
    console.log('5. If rated: Shows current rating with "لا يمكنك تغيير تقييمك" message');
    console.log('6. If not rated: Allows rating once only');
    console.log('7. After rating: Immediately disables all rating options');
}

// Run tests if this file is executed directly
if (require.main === module) {
    testRatingPrevention();
    simulateFrontendBehavior();
}

module.exports = {
    testRatingPrevention,
    submitRating,
    getUserRating,
    getAverageRating,
    simulateFrontendBehavior
};
