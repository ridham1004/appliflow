# AppliFlow 🚀  
*Your AI-powered assistant for streamlined, customized job applications.*

![AppliFlow Logo](assets/AppliFlow_Logo.png)

## ✨ What is AppliFlow?

**AppliFlow** is a Chrome extension and companion web app designed to make job applications fast, smart, and effortless. With Gemini AI, Google Docs integration, and ATS optimization tools, AppliFlow helps you tailor resumes and cover letters directly to job descriptions—no copy-paste chaos, no formatting headaches.

---

## ⚙️ Features

### 🔹 Chrome Extension
- 📎 Upload and scan resumes, cover letters, and job descriptions
- 💡 Smart suggestions for resume improvements and tailored cover letters
- 🔁 Persistent AI session per job until manually reset
- 📋 Copy-paste ready Workday experience entries
- 🧾 Auto-formatted date ranges for application portals
- 📄 Drag and drop PDF/Word files directly into job applications

### 🔹 Website Dashboard
- 🔐 Google login + Drive integration
- 💾 Save resume/cover letter versions in Drive
- 📊 Set preferences for resume tone, job type, industry
- 📈 ATS Optimization Score
- 📚 Job Tracker Panel
- 🧠 Impact Statement Generator

---

## 🧠 Tech Stack

| Area              | Tech Used                   |
|-------------------|-----------------------------|
| Frontend (Web)    | Next.js, Tailwind CSS       |
| Chrome Extension  | JavaScript, CSS, HTML5      |
| AI Engine         | Gemini Pro API              |
| Auth & Storage    | Firebase Auth, Google Drive |
| Backend (Optional)| Firebase Functions or Express.js |

---

## 🗂️ Folder Structure (Monorepo)
appliflow/
├── chrome-extension/
│   └── README.md  ← (optional, later)
├── website/
│   └── README.md  ← (optional, later)
├── assets/
│   └── AppliFlow_Logo.png
├── README.md      ✅ (Main README with all info)
├── .gitignore
└── LICENSE


## 🚀 Usage

1. Clone or download this repo
2. Open `chrome://extensions` in your browser
3. Enable **Developer Mode**
4. Click **Load Unpacked** and select this folder
5. Click the AppliFlow icon to open the popup

## 🔮 What's Coming Next

- Integration with Gemini AI for resume analysis and cover letter generation
- Google Docs/Drive sync for resume uploads
- ATS score analyzer based on job description parsing
- Full dashboard with job application tracker
