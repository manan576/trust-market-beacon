
# Trust Mart 🛒

**Live Demo**: [https://trustmart-team-codecraft.vercel.app/](https://trustmart-team-codecraft.vercel.app/)

## Project Description

Trust Mart is an innovative e-commerce platform that revolutionizes online shopping by implementing **AI-powered trust scoring systems** for both customers and merchants. In today's digital marketplace, fake reviews and unreliable sellers are major concerns. Trust Mart addresses these issues by:

- **Customer Credibility Scoring**: Using machine learning to analyze customer behavior, purchase history, and review patterns to assign credibility scores
- **Merchant Trust Scoring**: Evaluating merchants based on delivery performance, product quality, customer service, and authenticity metrics
- **Real-time Score Updates**: Dynamic scoring that reflects current behavior and maintains marketplace integrity
- **Transparent Trust System**: Customers can see credibility scores on all reviews and merchant ratings on all products

This creates a more trustworthy shopping environment where genuine reviews are highlighted and reliable merchants are rewarded.

## 🚀 Key Features

- **Dynamic Product Catalog**: Browse products across multiple categories with real-time pricing from different merchants
- **AI-Powered Customer Credibility**: Machine learning model evaluates customer trustworthiness based on:
  - Purchase history and value
  - Review authenticity and sentiment
  - Account tenure and verification status
  - Star rating patterns
- **Merchant Trust Scoring**: Comprehensive merchant evaluation including:
  - Quality metrics (return rates, defect rates, authenticity)
  - Delivery performance (on-time delivery, shipping accuracy)
  - Customer service (response time, query resolution, satisfaction)
  - Review authenticity and sentiment analysis
- **Real-time Review System**: Submit reviews with automatic credibility score updates
- **Admin Management Pages**:
  - `/customer-management`: Simulate and test customer parameter updates to see credibility score changes
  - `/merchant-management`: Adjust merchant parameters to update trust scores across all their products
- **Verified Purchase Integration**: Purchase value automatically updates customer credibility when reviews are verified
- **Responsive Design**: Optimized for all device sizes with modern UI/UX

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript - Component-based UI development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Shadcn/UI** - High-quality, accessible UI components
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing
- **TanStack React Query** - Data fetching and state management
- **React Hook Form** - Form handling and validation

### Backend & Database
- **Supabase** - Backend-as-a-Service providing:
  - PostgreSQL database with Row Level Security (RLS)
  - Real-time subscriptions
  - Edge functions for serverless computing
  - Authentication system
- **Supabase Edge Functions** - Serverless functions for:
  - Customer credibility score calculations
  - Merchant trust score updates
  - Integration with external ML APIs

### Machine Learning & APIs
- **FastAPI** - External ML model API for credibility scoring
- **Custom ML Models** - Trained models for:
  - Customer credibility prediction
  - Review sentiment analysis
  - Purchase behavior analysis

### Deployment & Infrastructure
- **Vercel** - Frontend deployment and hosting
- **Supabase Cloud** - Database and backend services hosting
- **External ML API** - Hosted machine learning inference endpoints

## 🎯 How Scoring Systems Work

### Customer Credibility Score Updates
1. **Automatic Updates**: Every time a customer submits a review, their credibility score is automatically recalculated
2. **ML Model Input**: The system sends the following data to the ML API:
   - Review text content
   - Star rating given
   - Verified purchase status (0 or 1)
   - Customer tenure in months
   - Total purchase value in rupees
3. **Score Calculation**: The ML model returns a credibility score (0-100) based on behavior patterns
4. **Database Update**: The new score is stored in the customers table and displayed on all past and future reviews
5. **Purchase Value Increment**: For verified purchases, the customer's total purchase value increases by the product price

### Merchant Trust Score Updates
1. **Parameter Management**: Admins can update merchant parameters via `/merchant-management`
2. **ML Model Factors**: The system evaluates 16+ parameters including:
   - Quality metrics (return rates, defect rates, authenticity scores)
   - Delivery performance (on-time delivery, shipping accuracy)
   - Customer service (response time, satisfaction scores)
   - Review patterns (sentiment, authenticity, positive ratios)
3. **Real-time Updates**: Changes to parameters immediately trigger score recalculation
4. **Trust Tag Assignment**: Merchants receive tags (Excellent, Good, Moderate) based on their scores
5. **Cross-Product Impact**: Updated scores appear on all products sold by the merchant

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd trust-mart
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - The project uses Supabase for backend services
   - Supabase configuration is already set up in the codebase
   - No additional environment variables needed for basic functionality

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application will hot-reload on file changes

### Optional: Supabase Local Development
If you want to run Supabase locally:
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase instance
supabase start

# Apply migrations
supabase db reset
```

## 🌐 Deployed Links

- **Frontend**: [https://trustmart-team-codecraft.vercel.app/](https://trustmart-team-codecraft.vercel.app/)
- **Database**: Supabase Cloud (PostgreSQL)
- **Backend API**: Supabase Edge Functions
- **ML API**: External FastAPI service for credibility scoring

### Admin Pages (Simulation)
- **Customer Management**: [https://trustmart-team-codecraft.vercel.app/customer-management](https://trustmart-team-codecraft.vercel.app/customer-management)
- **Merchant Management**: [https://trustmart-team-codecraft.vercel.app/merchant-management](https://trustmart-team-codecraft.vercel.app/merchant-management)

## 📡 API Endpoints

### Supabase Database Tables
- `GET /products` - Fetch all products with merchant information
- `GET /categories` - Retrieve product categories
- `GET /customers` - Customer data and credibility scores
- `GET /merchants` - Merchant information and trust scores
- `GET /reviews` - Product reviews with credibility scores
- `POST /reviews` - Submit new product reviews

### Supabase Edge Functions

#### Customer Credibility Update
- **Endpoint**: `/functions/v1/update-customer-credibility`
- **Method**: POST
- **Purpose**: Recalculate customer credibility score using ML model
- **Triggers**: Automatically called when reviews are submitted
- **Input**: Customer ID, review data, purchase information
- **Output**: Updated credibility score and grade

#### Merchant Grade Update
- **Endpoint**: `/functions/v1/update-merchant-grade`
- **Method**: POST
- **Purpose**: Update merchant trust score based on performance metrics
- **Triggers**: Called from merchant management interface
- **Input**: Merchant ID and updated parameters
- **Output**: New trust score and grade classification

### External ML API Integration
- **Customer Credibility ML Model**: Processes customer behavior data to predict trustworthiness
- **Merchant Scoring Algorithm**: Evaluates merchant performance across multiple dimensions

## 🏗️ Project Architecture

The application follows a modern full-stack architecture:

1. **Frontend Layer**: React SPA with TypeScript for type safety
2. **API Layer**: Supabase Edge Functions for serverless backend logic
3. **Database Layer**: PostgreSQL with Row Level Security for data protection
4. **ML Layer**: External FastAPI services for intelligent scoring
5. **Deployment Layer**: Vercel for frontend, Supabase Cloud for backend

## 🎨 User Experience

Trust Mart is built from a **customer perspective**, focusing on:
- **Transparency**: Clear visibility of trust scores and credibility ratings
- **Ease of Use**: Intuitive interface for browsing and reviewing products
- **Trust Building**: Reliable information to make informed purchasing decisions
- **Real-time Updates**: Immediate reflection of scoring changes across the platform

## 👨‍💻 Development Team

**Team CodeCraft 2025**

---

*This project demonstrates the implementation of AI-powered trust systems in e-commerce, showcasing modern web development practices and machine learning integration.*
