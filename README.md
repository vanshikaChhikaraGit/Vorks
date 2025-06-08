# 🛠️ Home Services Booking Platform

A full-stack web application where users can browse and book various home services (e.g., cleaning, maintenance, repair, gardening, car wash, etc.), and service providers can manage the services they offer.

---

![image](https://github.com/user-attachments/assets/e223a01e-4e22-40ab-964b-ece64c423991)

![image](https://github.com/user-attachments/assets/1735e3b5-aa07-4d15-83a2-1795ebb54519)

![image](https://github.com/user-attachments/assets/0cf949bb-5fe7-4de2-97e8-e7e3fc2bb9dc)

![image](https://github.com/user-attachments/assets/dbbb6948-1c1e-49cf-84d8-f8da8cc20f90)

![image](https://github.com/user-attachments/assets/ead6722f-3b99-434d-9cba-cf3e31121133)

![image](https://github.com/user-attachments/assets/ca7329b2-48e7-4157-9ec3-1eef1dae4e24)

![image](https://github.com/user-attachments/assets/27d46ee5-ca10-45c4-b045-18d5c924906e)

![image](https://github.com/user-attachments/assets/6476db01-761b-4751-ade8-0c32121db802)




## 🚀 Features

### 🧑‍💼 For Customers:
- Browse a wide variety of home services across multiple categories.
- Add services to cart using React Context API.
- Make payments seamlessly via Razorpay integration.
- Switch between dark and light modes.
- Secure authentication using JWT.
- Responsive and user-friendly UI.

### 🛠️ For Providers:
- Create, view, edit, and delete services in their dashboard.
- Manage services across all categories.
- Authentication-protected API routes for providers.

---

## 🧱 Tech Stack

- **Frontend:** React, Tailwind CSS, React Context API
- **Backend:** Node.js, tRPC
- **Authentication:** JWT-based Auth
- **Database:** [Specify DB - e.g., PostgreSQL / MongoDB]
- **Payments:** Razorpay Integration
- **Routing:** App and API routes with tRPC
- **Deployment:** [e.g., Vercel, Railway, Render]

---

## 🔐 Authentication

- JWT is used to protect both user and provider routes.
- Separate authentication flows and API routes for customers and providers.

---

## 💳 Payments

- Integrated Razorpay to handle secure online payments.
- Customers can pay directly from the cart before service confirmation.

---

## 💡 Challenges Faced

- Designing a flexible and scalable **database schema** to support multiple service categories and user types (customer/provider).
- **Integrating Razorpay**, managing dynamic service prices, and handling secure payment flow.
- Managing separate roles and routes for **provider vs. customer**.
- Structuring API routes using **tRPC** effectively for both frontend and backend interaction.


---

## 🛠️ Local Development

### Prerequisites:
- Node.js
- Yarn / npm
- [Specify DB] running locally or via cloud (e.g., Neon Tech)

### Setup:


# Install dependencies
```bash
cd client && npm install
cd ../server && npm install
```
# Setup environment variables
# - DB connection string
# - JWT secret
# - Razorpay keys
# - Cloudinary Keys

# Run the app
```bash
npm run dev   # From root
```

