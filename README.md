# Wanderlust – Airbnb Clone 🏡

Wanderlust is a full-stack hotel and property booking web application inspired by Airbnb. It allows users to explore property listings, view detailed information, create their own listings, and share reviews.

The project is built using Node.js, Express.js, MongoDB, and EJS, following the MVC architecture.

## ✨ Features

- **User Authentication:** Secure signup and login functionality using Passport.js.
- **Property Listings:** Browse available properties with images and detailed descriptions.
- **Create Listings:** Authenticated users can create and manage their own property listings.
- **Edit & Delete Listings:** Listing owners can update or delete their properties.
- **Reviews & Ratings:** Users can leave reviews and ratings for properties.
- **Authorization:** Access control to ensure only authorized users can modify their listings and reviews.
- **Session Management:** Persistent login sessions and flash messages for user feedback.
- **Image Uploads:** Property images managed using Cloudinary.
- **Interactive Maps:** Display property locations using Mapbox/MapLibre integration.

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript
- EJS (Embedded JavaScript Templates)
- Bootstrap

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication & Security**
- Passport.js
- Passport-Local
- Express-Session
- Connect-Flash

**Cloud & Integrations**
- Cloudinary (Image Storage)
- Mapbox / MapLibre (Maps)

## 📂 Project Structure

```text
Wanderlust/
│
├── controllers/       # Application business logic
├── models/            # MongoDB schemas and models
├── routes/            # Express routes
├── views/             # EJS templates
├── public/            # CSS, JavaScript, and static assets
├── utils/             # Utility functions and error handling
├── middleware.js      # Authentication and authorization middleware
├── app.js             # Main application entry point
├── schema.js          # Input validation schemas
├── cloudConfig.js     # Cloudinary configuration
└── package.json       # Dependencies and scripts
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ayush0831/Wanderlust.git
cd Wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory.

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
```

### 4. Start the application

```bash
node app.js
```

Open your browser and visit:

```text
http://localhost:8080
```

## 🔐 Security

- Password-based authentication using Passport.js.
- Session-based user authentication.
- Authorization middleware for protected operations.
- Server-side input validation.
- Environment variables for sensitive credentials.

## 🚀 Future Improvements

- Online payment integration.
- Advanced property search and filtering.
- Booking and reservation management.
- Wishlist functionality.
- Improved mobile responsiveness.

## 👨‍💻 Author

**Ayush Vishwakarma**

- GitHub: [@ayush0831](https://github.com/ayush0831)

---

*This project is developed for educational purposes and is inspired by Airbnb. It is not affiliated with or endorsed by Airbnb.*
