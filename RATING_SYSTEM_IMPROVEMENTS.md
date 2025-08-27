# Rating System Improvements - One Rating Per User Per Work

## Overview
This document describes the improvements made to the rating system to ensure that each user can only rate a work once, with the ability to update their rating.

## Backend Implementation

### Database Schema
The rating system uses a unique compound index on `{ userId: 1, workId: 1 }` in the Rating model:

```javascript
// models/rating.js
ratingSchema.index({ userId: 1, workId: 1 }, { unique: true });
```

This ensures that each user can only have one rating per work in the database.

### API Endpoints

#### 1. Submit/Update Rating
- **Endpoint**: `POST /api/ratings`
- **Description**: Creates a new rating or updates existing rating
- **Implementation**: Uses `findOneAndUpdate` with `upsert: true`

```javascript
const rating = await Rating.findOneAndUpdate(
  { userId: req.user.id, workId },
  { $set: { ratingValue } },
  { new: true, upsert: true, setDefaultsOnInsert: true }
);
```

#### 2. Get User Rating
- **Endpoint**: `GET /api/ratings/user/:workId`
- **Description**: Retrieves the current user's rating for a specific work

#### 3. Get Average Rating
- **Endpoint**: `GET /api/ratings/average/:workId`
- **Description**: Gets the average rating and count for a work

## Frontend Implementation

### Key Features

#### 1. Rating Status Tracking
- Added `hasRated` state to track if user has already rated
- Automatically detects existing ratings on page load
- Shows different UI states based on rating status

#### 2. Visual Feedback
- **Before Rating**: Shows "قيّم هذا العمل" (Rate this work)
- **After Rating**: Shows "تقييمك الحالي: X/5" (Your current rating: X/5)
- **Rating Button**: Changes from "قيّم الفيلم" to "تحديث التقييم" (Update rating)

#### 3. Star Display Logic
- **User's Rating**: Full yellow stars for user's rating
- **Average Rating**: Semi-transparent yellow stars for average
- **Unrated**: Gray stars

#### 4. Statistics Section
- Shows "قيّمت" (Rated) badge next to average rating
- Displays user's personal rating when available
- Visual indicators for rating status

### State Management

```javascript
const [myRating, setMyRating] = useState(0);
const [hasRated, setHasRated] = useState(false);
const [avgRating, setAvgRating] = useState({ average: 0, count: 0 });
```

### Rating Functions

#### 1. submitRating(val)
- Used for first-time ratings
- Checks if user has already rated
- Shows alert if trying to rate again
- Updates `hasRated` state to true

#### 2. updateRating(val)
- Used for updating existing ratings
- Allows changing rating value
- Updates both user rating and average

### User Experience Improvements

#### 1. Clear Messaging
- Arabic messages explaining rating status
- Instructions for updating ratings
- Loading states and error handling

#### 2. Visual Indicators
- Green "قيّمت" badge for rated works
- Different button styles for rated vs unrated
- Star highlighting for user's rating

#### 3. Responsive Design
- Works on all screen sizes
- Touch-friendly rating buttons
- Accessible star ratings

## Testing

### Manual Testing
1. **First Rating**: User can rate a work normally
2. **Second Rating Attempt**: Shows alert message
3. **Rating Update**: User can change their rating
4. **Visual Feedback**: UI updates correctly
5. **Statistics**: Shows correct rating information

### Automated Testing
Use the provided test file `test_rating_system.js` to verify:
- Rating submission
- Rating updates
- User rating retrieval
- Average rating calculation

## Error Handling

### Frontend Errors
- Network errors during rating submission
- Invalid rating values
- Authentication errors
- Server unavailability

### Backend Errors
- Invalid work ID
- Rating value out of range (1-5)
- Database constraint violations
- Authentication failures

## Security Considerations

1. **Authentication Required**: All rating operations require valid JWT token
2. **User Validation**: Backend validates user identity
3. **Input Validation**: Rating values must be 1-5
4. **Work Validation**: Work must exist before rating

## Future Enhancements

1. **Rating History**: Show user's rating history
2. **Rating Analytics**: More detailed rating statistics
3. **Rating Notifications**: Notify when ratings are updated
4. **Bulk Rating**: Rate multiple works at once
5. **Rating Comments**: Add text comments to ratings

## API Response Examples

### Successful Rating Submission
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "userId": "64f8a1b2c3d4e5f6a7b8c9d2",
  "workId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "ratingValue": 4,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### User Rating Response
```json
{
  "ratingValue": 4
}
```

### Average Rating Response
```json
{
  "average": 4.25,
  "count": 8
}
```

## Conclusion

The improved rating system ensures data integrity by preventing duplicate ratings while providing a smooth user experience for rating and updating works. The system is robust, secure, and provides clear feedback to users about their rating status.
