# Fitness project

## About This Project
This is a fitness website I built to show workout plans, exercise guides, and sports news. It started as a portfolio project and I'll keep adding more features over time. My goal is to make something simple that people can actually use.

---

## What's Included

**Home Page**
A quick introduction to what this site is all about.

**News**
Shows the latest sports news. It pulls fresh stories automatically from a free sports news API so it always stays up to date.

**Exercise Search**
Type any exercise name, click search, and it shows you exactly how to do it properly. All the instructions come from a free exercise API.

**Men's Workout Plan**
Workout ideas for men — plus the same search tool so you can look up any exercise you want.

**Women's Workout Plan**
Workout ideas for women — same search feature here too, just type and find what you need.

**Gallery**
Some fitness photos and inspiration.

**About**
A bit of information about me and this project.

---

## What I Used
- **HTML5** — for all the page content
- **CSS3 and Bootstrap** — to make it look good and work on phones
- **JavaScript** — for the search buttons and showing API data
- **Free Exercise API** — brings you exercise guides and instructions
- **Free Sports News API** — brings you the latest sports news
- **Python (coming later)** — will be my backend for user accounts and storing data
- **Stripe (coming later)** — will handle payments for premium content when I add it

---

## The 5 Planes of UX Design

**1. Strategy**
I wanted to build something simple and useful. People should be able to find an exercise or read the news without getting confused. That's my main goal — keep it helpful first, then grow it.

**2. Scope**
Right now you have: home, news, exercise search, men's plan, women's plan, gallery, and about. Later I'll add: accounts, saved workouts, and premium content with payments. I'm building it step by step, not all at once.

**3. Structure**
Every page links back to the same menu. You're never more than one click away from where you need to go. I kept it simple — no deep menus or getting lost.

**4. Skeleton**
Navigation always sits at the top. Search boxes and buttons are where you expect them. Every page follows the same layout so it feels familiar wherever you go.

**5. Surface**
Clean and easy on the eyes. Clear text, good contrast, buttons that look like buttons. Nothing fancy — just easy to read and use.

---

## How It Works Now
Everything runs in your web browser. When you search for an exercise, JavaScript talks to the API, gets the information, and shows it on your screen. Same with the news — it fetches it fresh every time you load the page.

## What's Coming
I'm not done yet. Eventually I'll add a Python backend so people can save their workouts. Stripe will let me offer premium plans too. Those aren't ready right now but they're what I'm working toward.

---
## laptop Wireframe
Below is the laptop version home page how the content look like 
![Desktop fitness website wireframe showing a navy-blue home page header, a large strength and fitness feature section, and two workout plan cards. Visible text includes SALIM JAMSHIDI, Home, News, Fitness, YOUR NEXT CHAPTER STARTS HERE, Build your strength, Here we help you escape the matrix, liberate yourself, and Rise as an Alpha woman or Alpha male, Gallery, About me, Alpha Women workout plan, Alpha Males workout plan, Strength, Focus, Progress, and Click to start your journey. The energetic, high-contrast layout uses bright lime accents and motivational fitness imagery.](./assets/images/large.scree.jpeg)

## mobile wireframe 

below is hte mobile version homae page how the content look 
![Mobile fitness website wireframe on a dark blue phone-shaped layout. It shows the logo and name SALIM JAMSHIDI, Home, News, and Fitness navigation, a centered heading and two buttons, and Alpha Women and Alpha Males workout plan cards with fitness silhouettes. Visible text includes YOUR NEXT CHAPTER STARTS HERE, Build your strength, Gallery, About me, and Click to start your journey. The clean navy design with bright lime accents feels energetic and motivating.](./assets/images/mobile.wire.jpeg)

## How to Use
1. Open index.html in your browser
2. Use the menu to move around
3. Go to Men's or Women's plan — type an exercise name and hit search
4. Read the instructions and try it out
5. Check the News page for latest sports updates

---
# Testing & Validation

---

##  User Story Testing
User testing can be carried out with people who represent the site's intended audience. Ask each participant to try the tasks below without guidance, then record whether they completed each task and any feedback or difficulties.

| Test Task | Success Criteria | Result |
|---|---|---|
| Navigate to the News page and view the latest sports news | The participant finds the News page and can read and understand the news headlines | Done ✅ |
| Search for an exercise and view instructions | The participant types an exercise name, clicks search, and can clearly see how to perform that exercise | Done ✅ |
| View workout plans for men and women | The participant navigates to both Men's Plan and Women's Plan pages and can find the information they need | Done ✅ |
| Navigate the site easily on a phone screen | The participant can open the menu, read all text, and scroll without horizontal scrolling or cut-off content | Done ✅ |
| View the gallery and about pages | The participant finds both pages easily and all images load correctly | Done ✅ |

> All tasks completed successfully. Users found the site easy to navigate and understand.

---

##  Responsive Testing
Check each page at representative phone, tablet, and desktop viewport widths using browser developer tools. At each size, verify that navigation can be opened and used, text and images fit the screen, cards and sections reflow without overlap, and the footer is fully visible without horizontal scrolling.

| Viewport | Checks | Result |
|---|---|---|
| **Phone (320–767px)** | Open and use the collapsed navigation; check readable text, images, search boxes, and footer; confirm there is no horizontal scrolling or clipped content | Done ✅ |
| **Tablet (768–1199px)** | Check navigation, page layout, cards, content spacing, and footer for overlap or clipping | Done ✅ |
| **Desktop (1200px and wider)** | Check the expanded navigation, content alignment, images, and footer at both narrow and wide desktop widths | Done ✅ |

> Tested on Chrome and Safari. All pages adapt correctly across screen sizes.

---

##  Validation & Checks
Run the following checks before release and record the result for each:

| Check | How to Check | Result |
|---|---|---|
| **HTML Validity** | Validate each HTML page with the W3C Markup Validation Service. Review and fix any reported errors | Done ✅ — No major errors found |
| **CSS Validity** | Validate style.css with the W3C CSS Validation Service. Review and fix any reported errors | Done ✅ — No major errors found |
| **Navigation and Page Links** | Open each navigation link and confirm it loads the correct page; check that all buttons and links work as expected | Done ✅ — All links working correctly |
| **API Data Loading** | Check that the news and exercise APIs load data correctly and display without errors | Done ✅ — Data loads and displays properly |
| **Images and Accessibility Basics** | Check that all images load and have meaningful alternative text; test site navigation using only a keyboard | Done ✅ — Images have alt text and keyboard navigation works |

---

##  Bugs & Fixes

| Issue | Fix Applied |
|---|---|
| Images not showing | Corrected file paths and spelling |
| CSS not loading | Fixed link to stylesheet in all HTML pages |
| Mobile layout messy | Added proper viewport meta tag and responsive sizing rules |
| Links not working | Corrected file names and paths across all pages |
| API data not displaying | Fixed API endpoint URLs and added error handling messages |
| Text hard to read | Improved text colours, contrast, and spacing |

---

> ℹ️ **Note:** Bootstrap and external APIs are loaded from CDNs, so an internet connection is required for those features to work correctly.

My Portfolio Project
Learning and building one step at a time