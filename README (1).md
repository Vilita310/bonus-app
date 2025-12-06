# 🌍 Global Explorer — Project Report  
*By Jing Cao*

Global Explorer is a simple yet visually engaging web application that allows users to search for any country and instantly view details such as its national flag, capital, region, and population. This project was built as part of my learning practice with **Next.js**.

---

## 🎯 Project Goal

The goal of this assignment/project was to:

- Practice using **Next.js App Router**
- Build an API-driven UI using `fetch()`
- Create a responsive and clean interface
- Improve my CSS layout and styling abilities
- Handle errors and edge cases gracefully

---

## 🧠 What I Designed & Why

### 1. **Simple, centered layout**  
I intentionally designed the UI to be clean and approachable.  
New learners (and general users) often feel overwhelmed, so I chose:

- A soft gradient background  
- A large centered title + emoji icon  
- A wide, rounded search bar  
- Clean card-based results  

The entire design focuses on **clarity and usability**.

---

### 2. **Emphasis on the search experience**  
I wanted the search bar to *feel lightweight*, so I added:

- Large rounded input  
- Smooth focus animation  
- A bright blue button for a clear call-to-action  

This was inspired by modern product landing pages.

---

### 3. **Card-based result design**

Each country is displayed in its own card with:

- Rounded corners  
- Shadow for depth  
- Region tags  
- Flag at the top  

The layout aims to make the country data **easy to scan and visually balanced**.

---

### 4. **Fixing distorted flags**

One unexpected issue occurred when a search returned **only one country**.  
Because the grid stretched to full width, the card also stretched and caused the flag to appear extremely wide and distorted.

This debugging experience taught me:

- How CSS Grid behaves differently with one vs. multiple elements  
- How `object-fit: cover` can break certain images  
- How to control image sizing without affecting layout  

The final fix was to use:

```css
object-fit: contain;
```

and add a fixed height to the flag container so flags always remain properly scaled.

---

## 🚧 Challenges & How I Overcame Them

### ❌ 1. Layout breaking with one search result  
3 cards looked perfect, but 1 card stretched full width and broke the UI.

💡 **Solution:** Restrict card width + use `object-fit: contain` for the flag.

---

### ❌ 2. Image scaling confusion  
Flags were being cropped incorrectly.

💡 **Solution:** Switching from `cover` to `contain` preserved the flag’s original proportions.

---

### ❌ 3. Responsive design inconsistencies  
Search bar looked too small on large screens and too big on mobile.

💡 **Solution:** Added `max-width` and `flex-wrap` for smoother scaling.

---

### ❌ 4. Handling countries with multiple API results  
Some searches (e.g., “United States”) return territories + the main country.

💡 I tested edge cases to ensure layout consistency for 1, 2, or 3+ cards.

---

## 🧪 What I Learned

- How to use the **Next.js App Router**
- How to style responsive layouts with modern CSS
- How small CSS properties can drastically affect appearance
- The importance of testing UI for different data states
- How to debug tricky layout issues
- How to refine a UI with thoughtful design decisions

This project strengthened both my **front-front engineering** and **visual design thinking**.

---

## 🚀 Running the Project

```bash
npm run dev
```

Then open:

http://localhost:3000

---

## 📦 Deployment

You can deploy this project using **Vercel**:

https://nextjs.org/docs/app/building-your-application/deploying

---

## 🎓 Final Reflection

Although the project looks simple, I learned a lot throughout the process:

- How to think through small design details  
- How to avoid layout breaking under different conditions  
- How to build a smooth and clean search experience  
- How to stay patient through frustrating UI bugs 😭  

Now, the interface feels polished and stable.  
This was a meaningful hands-on project that improved my skills in both coding and design.
