# HandsOn

## 📌 Project Overview
HandsOn is a community-driven social volunteering platform designed to connect individuals with meaningful social impact opportunities. Users can discover and join volunteer-driven events, post requests for community help, form teams for large-scale initiatives, and track their impact. The platform encourages social responsibility, collaboration, and recognition of contributions.

## Git Repository

[Server Git](<https://github.com/aaliahammedpriom/hands-on-volunteering-platform-server>)

## 🛠 Technologies Used
- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Routing**: React Router
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **API Requests**: Axios
- **Authentication**: JWT && Firebase

## ✨ Features
- User registration and profile management
- Browse, filter, and join volunteer events
- Create and manage community help requests
- One-click event registration
- Team formation for large-scale initiatives (Bonus)
- Volunteer impact tracking with leaderboards (Bonus)

## 📊 Database Schema
- **Users**: Stores user profiles, skills, and supported causes
- **Events**: Contains event details, participants, and categories
- **Requests**: Tracks community help requests and responses
- **Teams** (Bonus): Manages public and private team memberships
- **Impact Logs** (Bonus): Records volunteer hours and contributions

## ⚙ Setup  Client Side Instructions
1. **Clone the client repository**:
   ```sh
   git clone https://github.com/aaliahammedpriom/hands-on-volunteering-platform-client.git
   cd handson-client
   ```
``
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Configure environment variables**:
   - Create a `.env` file in the root directory and add Firebase configuration details
   ```env
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
   ```
4. **Run the development server**:
   ```sh
   npm run dev
   ```

## 🔗 API Documentation

The frontend interacts with a RESTful backend built with Express.js and MongoDB.

### **User Authentication**
- `POST /jwt` – Generate JWT token
- `POST /users` – Register a new user
- `GET /users/:uid` – Get user details by UID
- `GET /users` – Search users by email
- `GET /user/:email` – Get user details by email
- `PATCH /update/:uid` – Update user details
- `PATCH /users/log` – Increment user log count

### **Events**
- `POST /events` – Create a new event
- `GET /events` – Fetch all events (supports filtering by location, category, and availability)
- `GET /events/user/:uid` – Fetch events created by a user (requires authentication)
- `GET /events/:id` – Get event details by ID (requires authentication)

### **Community Help Requests**
- `POST /communityhelp` – Create a new help request (requires authentication)
- `GET /communityhelp` – Fetch all community help requests (supports filtering by location, urgency, and availability)
- `POST /communityhelpmessage` – Send a message related to a community help request (requires authentication)
- `GET /communityhelpmessage/:creator` – Fetch messages sent to a community help request creator (requires authentication)

### **Contributions**
- `POST /contribution` – Join a contribution (requires authentication)
- `GET /contribution` – Fetch all contributions
- `GET /contribution/user/:uid` – Fetch contributions by a specific user (requires authentication)

### **Teams**
- `POST /team` – Create a new team (requires authentication)
- `GET /team` – Fetch all teams (supports leaderboard sorting)
- `GET /teamowner` – Fetch teams owned by a user (requires authentication)
- `GET /teamdetails` – Fetch team details by ID (requires team permission verification)

### **Team Requests**
- `POST /teamrequest` – Send a team join request (requires authentication)
- `PATCH /teamrequest` – Update team join request status (requires authentication)
- `GET /teamrequest/:id` – Fetch approved team requests by team ID (requires authentication)

### **Team Discussions**
- `POST /teamdiscussion` – Create a discussion post in a team (requires authentication)
- `GET /teamdiscussion/:id` – Fetch discussion posts by team ID (requires authentication)


## 🚀 Running the Project
### Locally
```sh
npm run dev
```
### Production Build
```sh
npm run build
```
The build files will be generated in the `dist/` folder and can be deployed to a hosting service of your choice.

---
📢 Contributions are welcome! If you'd like to improve HandsOn, feel free to submit a pull request. 🎉

# hands-on-volunteering-platform-client
