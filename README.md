Official Site for Lab Informatika Universitas Udayana

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase project setup with Admin SDK

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/razikdontcare/labinformatika.git
   cd labinformatika
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Copy the example environment file and fill in the required values:
   ```sh
   cp .env.example .env.local
   ```

4. Open `.env.local` and set the necessary environment variables:
   ```dotenv
   API_URL="your_api_url"
   AUTH_FIREBASE_PROJECT_ID="your_firebase_project_id"
   AUTH_FIREBASE_CLIENT_EMAIL="your_firebase_client_email"
   AUTH_FIREBASE_PRIVATE_KEY="your_firebase_private_key"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
   NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
   NEXT_PUBLIC_FIREBASE_DATABASE_URL="your_firebase_database_url"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
   ```

### Running the Project

1. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1. Build the project:
   ```sh
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```sh
   npm start
   # or
   yarn start
   ```

### Deployment

Follow the deployment guide for your hosting provider. Ensure that all environment variables are set correctly in the production environment.

## Contributors

- [Razik](https://github.com/razikdontcare)
