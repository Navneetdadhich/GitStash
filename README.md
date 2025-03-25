# GitStash

GitStash is a MERN-based web application that provides users with detailed GitHub statistics. It features GitHub authentication, a sleek UI powered by Tailwind CSS, and the ability to generate and download a JPG file of the stats.

## Features
- **GitHub Authentication** – Secure login using your GitHub account.
- **GitHub Stats Display** – View detailed insights into your repositories, contributions, and overall activity.
- **JPG Export** – Easily generate and download an image of your GitHub stats.
- **Tailwind CSS UI** – A modern and responsive design for a seamless user experience.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** GitHub OAuth
- **Hosting:** Render

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gitstash.git
   ```

2. Navigate to the project directory:
   ```bash
   cd gitstash
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file:
   ```env
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Usage
1. Sign in using your GitHub account.
2. View your GitHub stats in an interactive dashboard.
3. Generate and download an image of your stats to share.

## Live Demo
Check out the live version of GitStash: [GitStash](https://gitstash.onrender.com)

## Contributing
Pull requests are welcome! Feel free to open an issue for feature requests or bug reports.

## License
This project is licensed under the MIT License.
