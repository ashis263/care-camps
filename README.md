
<h1><img src="src/assets/icon.png"  alt="CareCamps Logo"  width="50"  /> CareCamps</h1>

<p><strong>A health camp management platform</strong> that allows organizers to add and manage health camps while participants can join, pay for, and manage their camp registrations. Built using the <strong>MERN stack</strong>, with authentication via Firebase, secure API endpoints using JSON Web Token (JWT), and Stripe for payment processing.</p>

<h2>🚀 Technologies Used</h2>
<p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>
<hr>

<h2>✨ Core Features</h2>
<ul>
  <li>✅ Browse available health camps on the homepage and camp listings page.</li>
  <li>✅ <strong>User Authentication</strong> with Firebase (Login & Registration).</li>
  <li>✅ <strong>Camp Management</strong>: Organizers can add, update, and delete camps.</li>
  <li>✅ <strong>Camp Registration</strong>: Users can join and manage their registered camps.</li>
  <li>✅ <strong>Payment System</strong>: Secure payments powered by Stripe.</li>
  <li>✅ <strong>Role-Based Dashboards</strong>: Separate dashboards for organizers and participants.</li>
  <li>✅ <strong>Secure API</strong>: JWT-based authentication and Axios interceptors for enhanced security.</li>
  <li>✅ <strong>Search, Sorting & Pagination</strong>: Optimized server-side performance for fast UI updates.</li>
</ul>
<hr>

<h2>📦 Dependencies</h2>
<ul>
  <li><strong>Frontend:</strong>
    <ul>
      <li>react (^18.3.1)</li>
      <li>react-dom (^18.3.1)</li>
      <li>react-router-dom (^6.28.1)</li>
      <li>react-icons (^5.4.0)</li>
      <li>swiper (^11.2.1)</li>
      <li>sweetalert2 (^11.15.10)</li>
    </ul>
  </li>
  <li><strong>Authentication:</strong>
    <ul>
      <li>firebase (^11.1.0)</li>
    </ul>
  </li>
  <li><strong>Styling:</strong>
    <ul>
      <li>tailwindcss (^3.4.17)</li>
      <li>daisyui (^4.12.23)</li>
      <li>animate.css (^4.1.1)</li>
    </ul>
  </li>
  <li><strong>Payments:</strong>
    <ul>
      <li>@stripe/react-stripe-js (^3.1.1)</li>
      <li>@stripe/stripe-js (^5.5.0)</li>
    </ul>
  </li>
  <li><strong>Other:</strong>
    <ul>
      <li>axios (^1.7.9)</li>
      <li>lottie-react (^2.4.0)</li>
      <li>moment (^2.30.1)</li>
      <li>react-awesome-stars-rating (^0.16.2)</li>
      <li>react-datetime-picker (^6.0.1)</li>
      <li>react-helmet-async (^2.0.5)</li>
      <li>react-hook-form (^7.54.2)</li>
      <li>react-responsive-modal (^6.4.2)</li>
      <li>recharts (^2.15.0)</li>
    </ul>
  </li>
</ul>
<p><em>(Full dependencies list available in <code>package.json</code>.)</em></p>
<hr>

<h2>🛠️ Installation & Running Locally</h2>
<p>Follow these steps to set up <strong>CareCamps</strong> on your local machine:</p>

<h3>1️⃣ Clone the Repository</h3>
<pre><code>git clone https://github.com/ashis263/care-camps.git
cd care-camps</code></pre>

<h3>2️⃣ Install Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>3️⃣ Set Up Environment Variables</h3>
<p>Create a <code>.env.local</code> file and add the following:</p>
<pre><code>VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLIC_KEY</code></pre>
<p><em>(Replace with your actual Firebase and Stripe credentials.)</em></p>

<h3>4️⃣ Start the Development Server</h3>
<pre><code>npm run dev</code></pre>
<p>The project will run at <code>http://localhost:5173/</code> by default.</p>
<hr>

<h2>🌐 Live Demo</h2>
<ul>
  <li>🚀 <a href="https://care-camps.web.app/">Firebase Deployment</a></li>
  <li>🚀 <a href="https://care-camps.netlify.app/">Netlify Deployment</a></li>
</ul>
<hr>

<h2>🔑 Organizer Credentials</h2>
<ul>
  <li><strong>Email:</strong> admin@care.camps</li>
  <li><strong>Password:</strong> asdfgH</li>
</ul>
<hr>

<h2>🤝 Contribution</h2>
<p>Feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you’d like to improve.</p>
<hr>

<h2>📸 Screenshot</h2>
<img src="src/assets/screenshot.png"  alt="screenshot" />
