# TRBAM Bluesky Dashboard

A comprehensive analytics dashboard for tracking and visualizing #TRBAM posts from Bluesky. The dashboard provides insights into post metrics, engagement stats, contributor analysis, and content trends.

## Features

- **Post Analytics**: Track total posts, likes, replies, and reposts
- **Engagement Metrics**: Visualize post frequency and engagement over time
- **Top Contributors**: Identify and rank the most active contributors
- **Content Analysis**: Review most liked and commented posts
- **Word Cloud**: Visualize popular topics and keywords from posts
- **Recent Posts Feed**: Browse the latest posts with pagination
- **Responsive Design**: Works seamlessly across devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- SQLite database with Bluesky posts data

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/trbam_bluesky_dashboard.git
cd trbam_bluesky_dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Database Setup

This project uses SQLite with Drizzle ORM. The database file should be located at:

```
src/app/api/posts/trbam_bluesky_posts.db
```

To generate and push database schema:

```bash
npm run db:generate
npm run db:push
```

## API Endpoints

The dashboard provides several API endpoints:

- `GET /api/posts` - Fetches paginated posts
- `GET /api/posts/allPostsSummary` - Retrieves analytics summary including total metrics, frequency data, and top contributors
- `GET /api/posts/popularWords` - Analyzes and returns word frequency data for visualization

## Technologies Used

- Next.js 15.x with App Router
- TypeScript
- Drizzle ORM with SQLite
- Tailwind CSS with shadcn/ui components
- dygraphs for time-series visualization
- Visx for word cloud visualization
- Lucide React for icons
- next-themes for dark/light mode

## Project Structure

- `src/app` - Next.js app router pages and API routes
- `src/components` - Reusable UI components and page sections
- `src/db` - Database connection and schema definitions
- `src/lib` - Utility functions and shared logic
- `src/types` - TypeScript type definitions

## Credits

- Developed by [Gaurab Chhetri](https://github.com/gauravfs-14)
- Supported by [AIT Lab](https://ait-lab.vercel.app)

## License

All rights reserved.
