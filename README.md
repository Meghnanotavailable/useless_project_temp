<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# PINK PIXEL AUTOPSY🎯


## Basic Details
### Team Name: [pink pixels]


### Team Members
- Team Lead: Meghna R Kartha- [KMEA Engineering College]
- Member 2: Aayisha Nizam - [KMEA Engineering College]

Project Description

Pink Pixel Autopsy is a ridiculous browser-based "medical diagnostic" application that scans images and live camera feeds for suspicious amounts of hot pink pixels.

It calculates the number of completely fictional "brain cells" supposedly destroyed by pink exposure, complete with live diagnostics, heatmaps, sound effects, glitch effects, and a casualty leaderboard.

The Problem (that doesn't exist)

Modern society has a serious and completely imaginary problem:

Nobody knows how many brain cells they lose when looking at too much pink.

Is a Barbie-themed image dangerous? Is an entirely pink room medically concerning? What happens when your camera detects 99% pink?

Science has, unfortunately, failed to answer these extremely important questions.

The Solution (that nobody asked for)

We created Pink Pixel Autopsy — a highly questionable medical instrument that:

Detects suspicious pink pixels in images.
Scans live camera footage in real time.
Calculates fictional brain-cell casualties.
Assigns increasingly ridiculous medical diagnoses.
Shows a live pink exposure heatmap.
Produces Geiger-counter-style audio clicks.
Makes the interface shake and glitch when pink levels become dangerously high.
Maintains a local leaderboard of the biggest fictional brain-cell casualties.

No actual brain cells are harmed during the procedure.

Technical Details
Technologies/Components Used

For Software:

Languages used
HTML5
CSS3
JavaScript
Frameworks used
None — built using vanilla web technologies
Libraries used
Web Audio API
Canvas API
MediaDevices / getUserMedia API
Browser LocalStorage API
Tools used
Visual Studio Code
Web Browser
VS Code Live Server / Python HTTP Server
Git/GitHub

For Hardware:

No additional hardware required.
A computer/laptop with a modern web browser is sufficient.
A webcam is required only for the Live Camera Scanner feature.
Implementation
For Software:
Installation

Clone or download the project repository and open the project folder.

No external packages or dependencies are required.

The project structure is:

pink-pixel-autopsy/
│
├── index.html
├── style.css
├── script.js
└── README.md
Run

The application can be run directly by opening:

index.html

For the Live Camera Scanner, it is recommended to run the project through a local server.

Using Python:

python -m http.server 8000

Then open:

http://localhost:8000

Alternatively, the project can be launched using VS Code Live Server.

Project Documentation
For Software:
How It Works

The application has two main scanning modes:

1. Upload Image Mode

The user selects an image from their device.

The application:

Loads the image onto an HTML Canvas.
Reads the image pixel data.
Examines the RGB values of each pixel.
Identifies pixels that satisfy the pink detection conditions.
Calculates the percentage of pink pixels.
Converts the detected pink pixels into fictional brain-cell casualties.
Assigns a humorous diagnostic stage.
Displays the final autopsy report.
2. Live Camera Scanner

The application can access the user's webcam through the browser.

The camera feed is continuously sampled and analyzed in real time.

A smaller 160 × 120 analysis buffer is used to reduce processing requirements and maintain smooth performance.

The system then estimates the pink exposure of the original camera frame using a scaling factor.

Pink Pixel Detection

A pixel is classified as suspiciously pink when its RGB values satisfy:

red > 180 &&
red > (green * 1.2) &&
blue > green &&
alpha > 0

This allows the application to detect bright pink, hot pink, neon rose, and similar colors while reducing detection of neutral colors and ordinary warm tones.

Mathematical Calculations
Pink Exposure Percentage

The percentage of pink pixels is calculated using:

Exposure (%) =
(Pink Pixels / Total Pixels) × 100

For example, if an image contains 10,000 pixels and 2,000 are detected as pink:

Exposure = (2,000 / 10,000) × 100
         = 20%

The patient is therefore diagnosed with Stage 3: Barbiecore Exposure.

Fictional Brain Cell Casualties

The application calculates:

Brain Cells Lost = round(Pink Pixels × 0.75)

The value 0.75 is completely fictional and has absolutely no medical meaning.

Camera Scaling

The live camera uses a smaller analysis frame:

160 × 120

The application estimates the number of pink pixels in the full-resolution video using:

Scale Factor =
(Video Width × Video Height) /
(Sample Width × Sample Height)

The estimated fictional casualties are then calculated using:

Estimated Loss =
round(Pink Pixels × Scale Factor × 0.75)
Diagnostic Stages
Stage	Exposure Range	Diagnosis	Description
1	0–5%	Mild Pink Exposure	Minor exposure to suspiciously pink imagery. Brain function appears mostly normal.
2	5–15%	Pink Contamination	Elevated pink levels detected. Cognitive function may be mildly compromised.
3	15–30%	Barbiecore Exposure	Patient has entered the Barbiecore danger zone. Immediate exposure to something beige is recommended.
4	30–50%	Severe Pinkification	A dangerous amount of pink has entered the visual system. Brain activity is becoming suspiciously fabulous.
5	50–70%	Terminal Barbie Syndrome	Critical pink exposure detected. Patient may soon begin speaking exclusively in pastel.
6	70–85%	Chronic Slay Disorder	Patient has exceeded medically recommended levels of slay. Brain cells are filing complaints.
7	85–99%	Pink Singularity	The image is approaching complete pink domination. Medical science has no answers.
∞	99–100%	THE PINK HAS WON	Maximum pink detected. There is nothing left to diagnose.
Main Features
🩷 Real-Time Pink Detection

Continuously analyzes live camera frames and calculates pink exposure in real time.

🔥 Pink Heatmap

Detected pink areas can be highlighted using a visual heatmap overlay.

This allows users to see exactly where the application thinks the dangerous pink contamination is located.

🔊 Geiger Audio

The application uses the Web Audio API to generate synthetic Geiger-counter-style sounds.

As pink exposure increases, the clicks become more frequent and intense.

📹 Camera Controls

The Live Camera Scanner includes:

Start/Stop Camera
Front/Back Camera switching
Heatmap ON/OFF
Sound ON/OFF
Freeze Frame & Perform Autopsy
🧠 Live Brain Cell Telemetry

The camera scanner displays:

Live Pink Exposure
Live Brain Cells at Risk
Current Diagnostic Stage
Live Scanner status
⚠️ Glitch Effects

When pink exposure becomes extremely high, the interface activates visual glitch and shake effects to indicate a fictional medical emergency.

🏆 Casualty Leaderboard

The application stores high scores using browser localStorage.

The leaderboard records users with the highest fictional brain-cell casualties and automatically expires casualty records after one hour.

Screenshots

![Screenshot1](Add screenshot of the main Pink Pixel Autopsy interface here)

The main application interface showing patient information, image upload controls, and the autopsy section.

![Screenshot2](Add screenshot of the live camera scanner here)

The Live Camera Scanner showing real-time pink exposure, brain-cell telemetry, scanner HUD, and heatmap detection.

![Screenshot3](Add screenshot of the autopsy result here)

The final autopsy report showing pink exposure percentage, fictional brain-cell casualties, and diagnostic stage.

Diagrams

![Workflow](Add your workflow/architecture diagram here)

Workflow showing the process from image/camera input → pixel analysis → pink detection → exposure calculation → brain-cell casualty calculation → diagnostic result.

Project Workflow
              ┌──────────────────┐
              │  Image / Camera  │
              │      Input       │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Canvas / Frame   │
              │    Processing    │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ RGB Pixel        │
              │ Analysis         │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Pink Pixel       │
              │ Detection        │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Pink Exposure %  │
              │   Calculation    │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Fictional Brain  │
              │ Cell Calculation │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Diagnostic Stage │
              │ & Final Report   │
              └────────┬─────────┘
                       │
              ┌────────┴────────┐
              ▼                 ▼
       ┌──────────────┐  ┌──────────────┐
       │ Heatmap /    │  │ Leaderboard  │
       │ Sound / HUD  │  │ localStorage │
       └──────────────┘  └──────────────┘
Project Demo
Video

https://meghnanotavailable.github.io/Pink-pixel-autopsy/

The demo demonstrates the complete Pink Pixel Autopsy workflow, including image uploading, pink-pixel detection, fictional brain-cell calculation, diagnostic stages, live camera scanning, heatmap visualization, audio feedback, and leaderboard functionality.

Additional Demos

https://meghnanotavailable.github.io/Pink-pixel-autopsy/


License & Attribution
Created for comedic and educational purposes.
No actual medical diagnosis is performed.
No actual brain cells are harmed.
Released under the MIT License.

Made with ❤️, questionable medical science, and way too many pink pixels at TinkerHub Useless Projects.

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



