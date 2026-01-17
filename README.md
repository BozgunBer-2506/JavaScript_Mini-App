# User Directory App

A lightweight web application that fetches and displays random user profiles from the RandomUser API with real-time search filtering.

## Features
- **Fetch Users**: Load 10 random user profiles from RandomUser API
- **Real-time Search**: Filter users by name instantly as you type
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful error messages and retry functionality
- **Loading States**: Visual feedback during data fetching

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: [RandomUser API](https://randomuser.me/api)
- **Async**: Fetch API with async/await

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
```bash
git clone <repository-url>
cd user-directory
```

### Usage
1. Open `index.html` in your browser
2. Click the **"User laden"** button to fetch users
3. Type in the search field to filter by first or last name

## Code Highlights

### Async Data Fetching
```javascript
const loadUsers = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    allUsers = data.results;
};
```

### Array Filtering
```javascript
const filtered = allUsers.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(term);
});
```

### Safe DOM Manipulation
Uses `createElement()` and `textContent` instead of `innerHTML` to prevent XSS attacks.

## File Structure
```
├── index.html      # HTML structure
├── style.css       # Styling and layout
├── app.js          # JavaScript logic
└── README.md       # This file
```

## Learning Outcomes
This project demonstrates:
- ✅ Async/await for API calls
- ✅ DOM manipulation with vanilla JavaScript
- ✅ Array methods (filter, forEach, map)
- ✅ Event handling (click, input, keydown)
- ✅ ES6+ features (const/let, arrow functions, destructuring, template literals)
- ✅ Error handling with try/catch
- ✅ Responsive CSS with Flexbox and Grid

## Future Enhancements
- [ ] Add sorting by name or country
- [ ] Implement pagination for more users
- [ ] Add user profile modal on click
- [ ] Save favorite users with localStorage
- [ ] Dark mode toggle

## License
MIT License

## Copyright
Crafted by **The_Bozgun**  
Copyright © 2026. All rights reserved.