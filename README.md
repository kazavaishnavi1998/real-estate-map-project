🏠 **An Interactive Map Application for Real Estate Prospecting**

This project is designed to empower real estate brokers with data-driven insights, location-based search capabilities, and map visualizations to efficiently identify new leads and prospects. Built with modern web technologies like Next.js, TypeScript, Mapbox, and GraphQL, the application provides a seamless experience for exploring properties and visualizing geographic data.

📸**Live Demo and Visuals**: https://github.com/user-attachments/assets/1781529e-2426-4b9a-ace0-a281571fda1e

<img width="959" alt="image" src="https://github.com/user-attachments/assets/af25c397-781f-4599-9271-9d040290e880" />

The screenshot above shows how a user can search for an address using the search bar. Once an address is selected, the application displays property details, geolocation on the map.


⚙️ **Setup and Usage Instructions**
**Prerequisites**
1) Node.js >= 18.x
2) npm / yarn
3) Mapbox account and access token
4) Google API token
5) Graphql end point url

**Local Development Steps**
1) Clone the repository: git clone https://github.com/your-username/real-estate-map-project.git
2) Navigate to the project directory: cd real-estate-map-project  
3) Install dependencies: npm install
4) Start development server: npm run dev
5) Visit http://localhost:3000 to view the app deployed on vercel.
6) Deploy to Vercel: Install Vercel CLI if you haven't already: npm install -g vercel
7) Deploy your project: vercel
8) Visit your deployed app on Vercel: using the url http://localhost:3000

   
🛠 **Technologies and Tools**
**Core Stack**
Framework	- Next.js: App Router-based frontend using TypeScript

Styling	- Tailwind CSS:	Utility-first CSS framework

Fonts- next/font with Geist:	Optimized custom font loading

Deployment- Vercel:	Serverless deployment & CI/CD

Mapping	- Mapbox GL JS:	Interactive maps and custom tilesets


🗺**Mapbox GL**
Used for rendering high-performance interactive maps.
Tilesets were created in Mapbox Studio and uploaded to be used as layers.
Docs: Mapbox Studio, Mapbox GL JS

🔌**GraphQL + Apollo Client**
GraphQL enables efficient and flexible querying of backend data to get ParcelIds and also get zone information and other information from the ParcelId.
Apollo Client manages queries and local cache for real-time map updates and search filters.
Docs: GraphQL, Apollo Client

📍**Google APIs**
Used for:
Geocoding API: Convert addresses into latitude/longitude.
Docs: Geocoding API Docs
Street View API: Show panoramic street views of properties.
Docs: Street View API Docs


📌**Project Management**

Task and sprint tracking managed via Trello:
🔗 **Trello Board**: https://trello.com/b/mfeUlGmk/real-estate-map-project






