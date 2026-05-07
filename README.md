# 📚 RentalBook - Modern Book Rental Platform

A comprehensive book rental management system built with Next.js 15, TypeScript, MongoDB, and NextAuth. RentalBook provides a seamless experience for browsing, renting, and managing book rentals with user authentication and a beautiful modern UI.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

### 🔐 Authentication
- **Google OAuth** integration with NextAuth
- Secure user sessions and profile management
- Protected routes and API endpoints

### 📖 Book Management
- Browse extensive book catalog with search and filters
- Detailed book information (title, author, genre, description, ISBN)
- Book availability tracking in real-time
- High-quality book cover images
- Rating and review system

### 🎯 Rental System
- Easy book rental process
- Track active rentals and rental history
- Due date management and overdue notifications
- Return book functionality
- Rental pricing calculation

### 💼 User Dashboard
- Personal rental history
- Favorite books collection
- User activity tracking
- Dashboard statistics and insights

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark/Light theme support
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Loading states and error handling

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15.3.5 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (motion)
- **UI Components:** Custom React components

### Backend
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js with Google Provider
- **API:** Next.js API Routes (REST)
- **Password Hashing:** bcryptjs

### Developer Tools
- **Linting:** ESLint with Next.js config
- **Package Manager:** npm
- **Development:** Turbopack for faster builds

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud instance like MongoDB Atlas)
- **Google OAuth credentials** (for authentication)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/SRAJAN-00/rentalbook.git
cd rentalbook
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookrental?retryWrites=true&w=majority

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **Set up MongoDB**
- Create a MongoDB database (locally or on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Update the `MONGODB_URI` in your `.env.local` file

5. **Set up Google OAuth**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- Copy Client ID and Client Secret to `.env.local`

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
rentalbook/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                # NextAuth configuration
│   │   ├── books/               # Book CRUD operations
│   │   ├── rentals/             # Rental management
│   │   └── seed/                # Database seeding
│   ├── books/                   # Books listing page
│   ├── dashboard/               # User dashboard
│   ├── components/              # Reusable UI components
│   ├── contexts/                # React contexts
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # Business logic services
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── lib/                         # Core utilities
│   └── mongodb.ts               # MongoDB connection
├── models/                      # Mongoose schemas
│   ├── Book.ts                  # Book model
│   ├── Rental.ts                # Rental model
│   ├── User.ts                  # User model
│   ├── Review.ts                # Review model
│   ├── Fav.ts                   # Favorites model
│   └── Activity.ts              # Activity model
├── middleware.ts                # Next.js middleware
├── types/                       # TypeScript type definitions
├── public/                      # Static assets
└── data/                        # Sample/seed data
```

## 🔑 Key Features Implementation

### Authentication Flow
1. User clicks "Sign in with Google"
2. NextAuth redirects to Google OAuth
3. User authorizes the application
4. NextAuth creates a session
5. User is redirected to dashboard

### Rental Flow
1. Browse books and view details
2. Click "Rent Now" on available books
3. Confirm rental duration and pricing
4. Book is added to active rentals
5. Available copies are decremented
6. Return book when done

## 🧪 Testing

The application includes various debugging and testing endpoints:
- `/debug-books` - Debug book data
- `/seed-test` - Test database seeding
- `/examples` - Component examples

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SRAJAN-00/rentalbook)

### Deploy on Other Platforms

The application can also be deployed on:
- **Netlify** - Configure build command: `npm run build`
- **Railway** - Auto-detects Next.js
- **Docker** - Create a Dockerfile with Node.js base image

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**SRAJAN**
- GitHub: [@SRAJAN-00](https://github.com/SRAJAN-00)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Hosting platform

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [documentation](STRUCTURE_GUIDE.md)

---

Made with ❤️ by SRAJAN
