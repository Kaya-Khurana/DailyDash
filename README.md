
# Daily Dash - Todo WebApp

A modern, responsive, and feature-rich Todo List web application to help you organize your daily tasks efficiently.

## Features

- **Add Tasks:** Quickly add new tasks with a title, target time, and optional recurring schedule.
- **Recurring Tasks:** Supports daily, weekly, and monthly recurring tasks.
- **Voice Input:** Add tasks using your voice (requires Chrome or browsers supporting `webkitSpeechRecognition`).
- **Smart Reminders:** Get browser notifications for upcoming tasks (requires notification permission).
- **Persistent Storage:** Tasks are saved in your browser's local storage.
- **Responsive Design:** Looks great on both desktop and mobile devices.
- **Pastel Card UI:** Tasks are displayed as colorful cards for easy viewing.

## Getting Started

### Prerequisites

- A modern web browser (Chrome recommended for voice input and notifications).

### Running Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/daily-dash.git
   cd daily-dash
   ```

2. **Open `index.html` in your browser:**
   - Double-click `index.html`  
   **OR**
   - Use a local server (recommended for some browser features):
     ```sh
     npx serve .
     ```
     Then open the provided URL in your browser.

## File Structure

- [`index.html`](index.html): Main HTML file.
- [`styles.css`](styles.css): CSS styles for the app.
- [`script.js`](script.js): JavaScript logic for task management, reminders, and UI.

## Usage

1. Enter your task in the "Task" field.
2. Optionally, set a target time and choose a recurring pattern.
3. Click **Add** or use the 🎤 button to add by voice.
4. Click a task card to mark it as completed. Recurring tasks will automatically create the next occurrence.
5. Click **Delete** to remove a task.

## Browser Support

- Voice input and notifications work best in Chrome.
- Other browsers may have limited support for these features.

## Screenshots
![Screenshot 2025-05-30 205710](https://github.com/user-attachments/assets/2f50c86b-e722-49aa-ab68-4bac631f972d)



Made with 💜 for productivity!
