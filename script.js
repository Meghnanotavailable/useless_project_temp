// ============================================================
// PINK PIXEL AUTOPSY
// COMPLETE JAVASCRIPT
// ============================================================


// ============================================================
// 1. GET HTML ELEMENTS
// ============================================================

const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const analyzeButton = document.getElementById("analyzeButton");
const report = document.getElementById("report");
const usernameInput = document.getElementById("username");
const leaderboard = document.getElementById("leaderboard");
const autopsyActionSection = document.getElementById("autopsyActionSection");

// Mode switcher elements
const tabUpload = document.getElementById("tabUpload");
const tabCamera = document.getElementById("tabCamera");
const uploadModeContainer = document.getElementById("uploadModeContainer");
const cameraModeContainer = document.getElementById("cameraModeContainer");

// Camera scanner elements
const cameraVideo = document.getElementById("cameraVideo");
const scannerOverlayCanvas = document.getElementById("scannerOverlayCanvas");
const cameraStatusOverlay = document.getElementById("cameraStatusOverlay");
const cameraStatusTitle = document.getElementById("cameraStatusTitle");
const cameraStatusSubtitle = document.getElementById("cameraStatusSubtitle");
const startCameraBtn = document.getElementById("startCameraBtn");
const scannerReticle = document.getElementById("scannerReticle");
const hudLiveTag = document.getElementById("hudLiveTag");
const hudDangerFlash = document.getElementById("hudDangerFlash");

// Live telemetry elements
const livePinkPercent = document.getElementById("livePinkPercent");
const livePinkMeter = document.getElementById("livePinkMeter");
const liveBrainCells = document.getElementById("liveBrainCells");
const liveStageBadge = document.getElementById("liveStageBadge");

// Camera controls toolbar elements
const toggleCameraBtn = document.getElementById("toggleCameraBtn");
const flipCameraBtn = document.getElementById("flipCameraBtn");
const toggleMaskBtn = document.getElementById("toggleMaskBtn");
const toggleSoundBtn = document.getElementById("toggleSoundBtn");
const captureAnalyzeBtn = document.getElementById("captureAnalyzeBtn");


// ============================================================
// 2. CREATE CANVAS & REAL-TIME ANALYSIS BUFFERS
// ============================================================

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// Dedicated offscreen canvas for high-performance live frame detection
const analysisCanvas = document.createElement("canvas");
const analysisCtx = analysisCanvas.getContext("2d", { willReadFrequently: true });
analysisCanvas.width = 160;
analysisCanvas.height = 120;

// Canvas for rendering smoothed heatmap overlay
const heatmapCanvas = document.createElement("canvas");
const heatmapCtx = heatmapCanvas.getContext("2d");
heatmapCanvas.width = 160;
heatmapCanvas.height = 120;


// ============================================================
// 2B. SCANNER STATE VARIABLES
// ============================================================

let currentMode = "upload"; // "upload" | "camera"
let cameraStream = null;
let isCameraRunning = false;
let currentFacingMode = "user"; // "user" | "environment"
let animFrameId = null;
let isHeatmapEnabled = true;
let isSoundEnabled = false;
let lastDetectTime = 0;
let lastBeepTime = 0;
let audioCtx = null;


// ============================================================
// 3. LEADERBOARD DATA
// ============================================================

let leaderboardData =
    JSON.parse(
        localStorage.getItem("pinkAutopsyLeaderboard")
    ) || [];


// ============================================================
// 4. DIAGNOSES
// ============================================================

const diagnoses = [

    {
        name: "Stage 1: Mild Pink Exposure",
        min: 0,
        max: 5,
        description:
            "Patient shows minor exposure to suspiciously pink imagery. Brain function appears mostly normal."
    },

    {
        name: "Stage 2: Pink Contamination",
        min: 5,
        max: 15,
        description:
            "Elevated pink levels detected. Cognitive function may be mildly compromised."
    },

    {
        name: "Stage 3: Barbiecore Exposure",
        min: 15,
        max: 30,
        description:
            "Patient has entered the Barbiecore danger zone. Immediate exposure to something beige is recommended."
    },

    {
        name: "Stage 4: Severe Pinkification",
        min: 30,
        max: 50,
        description:
            "A dangerous amount of pink has entered the visual system. Brain activity is becoming suspiciously fabulous."
    },

    {
        name: "Stage 5: Terminal Barbie Syndrome",
        min: 50,
        max: 70,
        description:
            "Critical pink exposure detected. Patient may soon begin speaking exclusively in pastel."
    },

    {
        name: "Stage 6: Chronic Slay Disorder",
        min: 70,
        max: 85,
        description:
            "Patient has exceeded medically recommended levels of slay. Brain cells are filing complaints."
    },

    {
        name: "Stage 7: Pink Singularity",
        min: 85,
        max: 99,
        description:
            "The image is approaching complete pink domination. Medical science has no answers."
    },

    {
        name: "Stage Infinity: THE PINK HAS WON",
        min: 99,
        max: 101,
        description:
            "The image has achieved maximum pink. There is no longer anything left to diagnose."
    }

];


// ============================================================
// 5. TREATMENTS
// ============================================================

const treatments = [

    "Touch grass immediately.",

    "Look at a boring spreadsheet for 10 minutes.",

    "Avoid pink objects for 24 hours.",

    "Consume one aggressively non-pink object.",

    "Drink water and reconsider your life choices.",

    "Seek immediate exposure to the color beige.",

    "Go outside. This is not a drill.",

    "Stare at a white wall for 5 minutes.",

    "Avoid Barbie-related media until cognitive function returns.",

    "Watch something aggressively boring.",

    "Take one hour away from Pinterest.",

    "Prescribed: 3 hours of touching grass.",

    "Patient requires emergency contact with reality."

];


// ============================================================
// 6. DOCTOR NOTES
// ============================================================

const doctorNotes = [

    "Patient appears to have survived the scan.",

    "Excessive pink detected.",

    "Cognitive damage cannot be independently verified.",

    "Further testing is completely unnecessary.",

    "Brain cells were contacted for comment but refused.",

    "The pink levels are concerning.",

    "Medical staff are currently pretending to understand these results.",

    "Patient should probably go outside.",

    "The medical team has decided to simply ignore these findings.",

    "This image raised several questions that nobody wants answered.",

    "Brain activity remains questionable.",

    "The patient made several poor visual decisions."

];


// ============================================================
// 7. MEMES
// ============================================================

const memes = [

    {
        max: 0,
        emoji: "🧠✨",
        title: "BRO ESCAPED",
        text:
            "0 brain cells lost. Somehow you survived the pink."
    },

    {
        max: 10000,
        emoji: "😌",
        title: "BARELY A SCRATCH",
        text:
            "Your brain cells looked at the image and said: 'We're fine.'"
    },

    {
        max: 50000,
        emoji: "😐",
        title: "I CAN FEEL MY IQ LEAVING",
        text:
            "It wasn't a huge loss, but your brain definitely noticed."
    },

    {
        max: 100000,
        emoji: "😟",
        title: "THIS IS GETTING CONCERNING",
        text:
            "Somewhere, several brain cells are packing their bags."
    },

    {
        max: 250000,
        emoji: "😭",
        title: "IT'S SO OVER",
        text:
            "The brain cells tried their best. They really did."
    },

    {
        max: 500000,
        emoji: "💀",
        title: "THERE GOES THE LAST BRAIN CELL",
        text:
            "Scientists are no longer sure whether the patient is thinking."
    },

    {
        max: 1000000,
        emoji: "☠️",
        title: "WE REGRET TO INFORM YOU",
        text:
            "Your remaining brain cells have requested a transfer."
    },

    {
        max: Infinity,
        emoji: "🪦",
        title: "BRAIN STATUS: GONE",
        text:
            "The medical team has stopped counting. There is nothing left to save."
    }

];


// ============================================================
// 8. GET MEME
// ============================================================

function getMeme(brainCellsLost, pinkPercentage) {

    if (pinkPercentage >= 99) {

        return {
            emoji: "👑🩷",
            title: "THE PINK HAS WON",
            text:
                "At this point the image is no longer pink. The image IS pink."
        };

    }

    for (const meme of memes) {

        if (brainCellsLost <= meme.max) {

            return meme;

        }

    }

    return memes[memes.length - 1];

}


// ============================================================
// 9. GET BADGE
// ============================================================

function getBadge(pinkPercentage, brainCellsLost) {

    if (pinkPercentage === 0) {

        return "🧠 Braincell Preservation Society";

    }

    if (pinkPercentage >= 99) {

        return "👑 THE PINK HAS WON";

    }

    if (pinkPercentage >= 85) {

        return "💀 Certified Pink-Brained";

    }

    if (pinkPercentage >= 70) {

        return "💅 Chronic Slay Survivor";

    }

    if (pinkPercentage >= 50) {

        return "🚨 Pink Emergency Patient";

    }

    if (pinkPercentage >= 30) {

        return "🎀 Barbiecore Veteran";

    }

    if (pinkPercentage >= 15) {

        return "🩷 Pink Enthusiast";

    }

    if (brainCellsLost >= 100000) {

        return "🧠 Casual Braincell Casualty";

    }

    return "🌸 Pink Exposure Rookie";

}


// ============================================================
// 10. GET DIAGNOSIS
// ============================================================

function getDiagnosis(percentage) {

    for (const diagnosis of diagnoses) {

        if (
            percentage >= diagnosis.min &&
            percentage < diagnosis.max
        ) {

            return diagnosis;

        }

    }

    return diagnoses[diagnoses.length - 1];

}


// ============================================================
// 11. GET SEVERITY
// ============================================================

function getSeverity(percentage) {

    if (percentage === 0) {

        return "🟢 PERFECTLY INTACT";

    }

    if (percentage < 5) {

        return "🟢 Negligible";

    }

    if (percentage < 15) {

        return "🟡 Mild";

    }

    if (percentage < 30) {

        return "🟠 Moderate";

    }

    if (percentage < 50) {

        return "🔴 Severe";

    }

    if (percentage < 70) {

        return "☠️ CATASTROPHIC";

    }

    return "💀 ABSOLUTELY UNNECESSARY";

}


// ============================================================
// 12. RANDOM ITEM
// ============================================================

function getRandomItem(array) {

    const randomIndex =
        Math.floor(Math.random() * array.length);

    return array[randomIndex];

}


// ============================================================
// 13. GENERATE PATIENT ID
// ============================================================

function generatePatientID() {

    const number =
        Math.floor(
            100000 + Math.random() * 900000
        );

    return "PXA-" + number;

}


// ============================================================
// 14. ESCAPE HTML
// ============================================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ============================================================
// 15. IMAGE UPLOAD
// ============================================================

imageInput.addEventListener(
    "change",
    function () {

        const file = imageInput.files[0];

        if (!file) {

            return;

        }

        const imageURL =
            URL.createObjectURL(file);

        imagePreview.src = imageURL;

        imagePreview.style.display = "block";

        report.innerHTML = "";

    }
);


// ============================================================
// 16. DISPLAY LEADERBOARD
// ============================================================

function displayLeaderboard() {

    if (!leaderboard) {

        return;

    }

    if (leaderboardData.length === 0) {

        leaderboard.innerHTML = `
            <p style="text-align: center;">
                No victims yet. Be the first.
            </p>
        `;

        return;

    }

    leaderboardData.sort(
        function (a, b) {
            return b.brainCellsLost - a.brainCellsLost;
        }
    );

    const topPlayers =
        leaderboardData.slice(0, 10);

    let html = `
        <h2>
            🏆 BRAIN CELL CASUALTY LEADERBOARD
        </h2>

        <p class="leaderboard-subtitle">
            The person who lost the most brain cells this hour
        </p>

        <div class="leaderboard-list">
    `;

    topPlayers.forEach(
        function (player, index) {

            let position;

            if (index === 0) {

                position = "🥇";

            } else if (index === 1) {

                position = "🥈";

            } else if (index === 2) {

                position = "🥉";

            } else {

                position = "#" + (index + 1);

            }

            html += `
                <div class="leaderboard-entry">

                    <span class="rank">
                        ${position}
                    </span>

                    <span class="player-name">
                        ${escapeHTML(player.username)}
                    </span>

                    <span class="player-badge">
                        ${player.badge}
                    </span>

                    <span class="player-score">
                        🧠
                        ${player.brainCellsLost.toLocaleString()}
                    </span>

                </div>
            `;

        }
    );

    html += `
        </div>
    `;

    leaderboard.innerHTML = html;

}


// ============================================================
// 17. ADD TO LEADERBOARD
// ============================================================

function addToLeaderboard(
    username,
    brainCellsLost,
    badge
) {

    leaderboardData.push({

        username: username,

        brainCellsLost: brainCellsLost,

        badge: badge,

        timestamp: Date.now()

    });

    leaderboardData.sort(
        function (a, b) {
            return b.brainCellsLost - a.brainCellsLost;
        }
    );

    leaderboardData =
        leaderboardData.slice(0, 50);

    localStorage.setItem(
        "pinkAutopsyLeaderboard",
        JSON.stringify(leaderboardData)
    );

    displayLeaderboard();

}


// ============================================================
// 18. LOADING SCREEN
// ============================================================

function showLoading() {

    report.innerHTML = `
        <div class="loading-screen">

            <h2>
                🧠 ANALYZING PATIENT...
            </h2>

            <p>
                Counting your poor decisions...
            </p>

            <div class="loading-bar-container">

                <div
                    id="loadingBar"
                    class="loading-bar"
                ></div>

            </div>

            <p id="loadingPercentage">
                0%
            </p>

        </div>
    `;

}


// ============================================================
// 19. LOADING ANIMATION
// ============================================================

function runLoadingAnimation(callback) {

    showLoading();

    const loadingBar =
        document.getElementById("loadingBar");

    const loadingPercentage =
        document.getElementById("loadingPercentage");

    let progress = 0;

    const interval =
        setInterval(
            function () {

                progress +=
                    Math.floor(
                        Math.random() * 8
                    ) + 2;

                if (progress >= 100) {

                    progress = 100;

                }

                if (loadingBar) {

                    loadingBar.style.width =
                        progress + "%";

                }

                if (loadingPercentage) {

                    loadingPercentage.textContent =
                        progress + "%";

                }

                if (progress >= 100) {

                    clearInterval(interval);

                    setTimeout(
                        function () {

                            callback();

                        },
                        300
                    );

                }

            },
            100
        );

}


// ============================================================
// 20. SCREEN SHAKE
// ============================================================

function triggerScreenShake() {

    document.body.classList.add(
        "screen-shake"
    );

    setTimeout(
        function () {

            document.body.classList.remove(
                "screen-shake"
            );

        },
        700
    );

}


// ============================================================
// 21. GLITCH EFFECT
// ============================================================

function triggerGlitch() {

    document.body.classList.add(
        "glitch-mode"
    );

    setTimeout(
        function () {

            document.body.classList.remove(
                "glitch-mode"
            );

        },
        1500
    );

}


// ============================================================
// 22. PERFECT BRAIN MESSAGE
// ============================================================

function showPerfectBrainMessage() {

    return `
        <div class="perfect-brain">

            <h2>
                🎉 CONGRATULATIONS
            </h2>

            <p class="big-message">
                Your brain is fully intact.
            </p>

            <p>
                And also this app was useless
                for you specifically.
            </p>

            <div class="brain-icon">
                🧠✨
            </div>

        </div>
    `;

}


// ============================================================
// 23. PERFORM AUTOPSY ON CANVAS (UNIFIED ENGINE)
// ============================================================

function performAutopsyOnCanvas(sourceCanvas, username) {

    runLoadingAnimation(
        function () {

            // GET PIXEL DATA
            const imageData =
                ctx.getImageData(
                    0,
                    0,
                    sourceCanvas.width,
                    sourceCanvas.height
                );

            const pixels =
                imageData.data;

            let pinkPixels = 0;

            // COUNT PINK PIXELS
            for (
                let i = 0;
                i < pixels.length;
                i += 4
            ) {

                const red =
                    pixels[i];

                const green =
                    pixels[i + 1];

                const blue =
                    pixels[i + 2];

                const alpha =
                    pixels[i + 3];

                if (alpha === 0) {
                    continue;
                }

                if (
                    red > 180 &&
                    red > green * 1.2 &&
                    blue > green
                ) {
                    pinkPixels++;
                }

            }

            // CALCULATE TOTAL PIXELS
            const totalPixels =
                sourceCanvas.width *
                sourceCanvas.height;

            // CALCULATE PINK PERCENTAGE
            const pinkPercentage =
                totalPixels > 0
                    ? (pinkPixels / totalPixels) * 100
                    : 0;

            // FICTIONAL BRAIN CELL LOSS
            const brainCellsLost =
                Math.round(
                    pinkPixels * 0.75
                );

            // GET RESULTS
            const diagnosis =
                getDiagnosis(
                    pinkPercentage
                );

            const severity =
                getSeverity(
                    pinkPercentage
                );

            const badge =
                getBadge(
                    pinkPercentage,
                    brainCellsLost
                );

            const meme =
                getMeme(
                    brainCellsLost,
                    pinkPercentage
                );

            const treatment =
                getRandomItem(
                    treatments
                );

            const doctorNote =
                getRandomItem(
                    doctorNotes
                );

            const patientID =
                generatePatientID();

            // DATE AND TIME
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            // =================================================
            // ZERO PINK RESULT
            // =================================================
            if (pinkPercentage === 0) {

                report.innerHTML = `
                    ${showPerfectBrainMessage()}

                    <div class="medical-report">

                        <h3>
                            🔬 IMAGE ANALYSIS
                        </h3>

                        <p>
                            <strong>
                                Total Pixels:
                            </strong>
                            ${totalPixels.toLocaleString()}
                        </p>

                        <p>
                            <strong>
                                Pink Pixels:
                            </strong>
                            0
                        </p>

                        <p>
                            <strong>
                                Pink Exposure:
                            </strong>
                            0.00%
                        </p>

                        <hr>

                        <h3>
                            🧠 BRAIN CELL RESULT
                        </h3>

                        <div class="brain-result">

                            <div class="brain-count-area">

                                <div class="brain-count-label">
                                    Fictional Brain Cells Lost
                                </div>

                                <div class="brain-cells">
                                    0
                                </div>

                                <p>
                                    fictional brain cells
                                </p>

                            </div>

                            <div class="meme-card">

                                <div class="meme-emoji">
                                    ${meme.emoji}
                                </div>

                                <div class="meme-title">
                                    ${meme.title}
                                </div>

                                <p class="meme-text">
                                    ${meme.text}
                                </p>

                            </div>

                        </div>

                        <hr>

                        <p>
                            <strong>
                                Achievement:
                            </strong>

                            <span class="achievement">
                                ${badge}
                            </span>
                        </p>

                        <hr>

                        <p class="report-by">
                            By Pink Pixels
                        </p>

                    </div>
                `;

                addToLeaderboard(
                    username,
                    brainCellsLost,
                    badge
                );

                report.scrollIntoView({ behavior: "smooth", block: "start" });
                return;

            }

            // =================================================
            // HIGH PINK EFFECT
            // =================================================
            if (pinkPercentage > 50) {

                triggerScreenShake();
                triggerGlitch();

            }

            // =================================================
            // NORMAL REPORT
            // =================================================
            report.innerHTML = `
                <div class="medical-report">

                    <h2>
                        🩺 PINK PIXEL AUTOPSY REPORT
                    </h2>

                    <hr>

                    <p>
                        <strong>
                            Patient:
                        </strong>
                        ${escapeHTML(username)}
                    </p>

                    <p>
                        <strong>
                            Patient ID:
                        </strong>
                        ${patientID}
                    </p>

                    <p>
                        <strong>
                            Scan Date:
                        </strong>
                        ${date}
                    </p>

                    <p>
                        <strong>
                            Scan Time:
                        </strong>
                        ${time}
                    </p>

                    <hr>

                    <h3>
                        🔬 IMAGE ANALYSIS
                    </h3>

                    <p>
                        <strong>
                            Image Width:
                        </strong>
                        ${sourceCanvas.width}px
                    </p>

                    <p>
                        <strong>
                            Image Height:
                        </strong>
                        ${sourceCanvas.height}px
                    </p>

                    <p>
                        <strong>
                            Total Pixels:
                        </strong>
                        ${totalPixels.toLocaleString()}
                    </p>

                    <p>
                        <strong>
                            Pink Pixels:
                        </strong>
                        ${pinkPixels.toLocaleString()}
                    </p>

                    <p>
                        <strong>
                            Pink Exposure:
                        </strong>
                        ${pinkPercentage.toFixed(2)}%
                    </p>

                    <hr>

                    <h3>
                        🧠 ESTIMATED BRAIN CELL LOSS
                    </h3>

                    <div class="brain-result">

                        <div class="brain-count-area">

                            <div class="brain-count-label">
                                Fictional Brain Cells Lost
                            </div>

                            <div class="brain-cells">
                                ${brainCellsLost.toLocaleString()}
                            </div>

                            <p>
                                fictional brain cells
                            </p>

                        </div>

                        <div class="meme-card">

                            <div class="meme-emoji">
                                ${meme.emoji}
                            </div>

                            <div class="meme-title">
                                ${meme.title}
                            </div>

                            <p class="meme-text">
                                ${meme.text}
                            </p>

                        </div>

                    </div>

                    <hr>

                    <h3>
                        🚨 SEVERITY
                    </h3>

                    <p class="severity">
                        ${severity}
                    </p>

                    <hr>

                    <h3>
                        🏅 ACHIEVEMENT UNLOCKED
                    </h3>

                    <p>
                        <span class="achievement">
                            ${badge}
                        </span>
                    </p>

                    <hr>

                    <h3>
                        🩺 DIAGNOSIS
                    </h3>

                    <h2>
                        ${diagnosis.name}
                    </h2>

                    <p>
                        ${diagnosis.description}
                    </p>

                    <hr>

                    <h3>
                        💊 RECOMMENDED TREATMENT
                    </h3>

                    <p>
                        ☑ ${treatment}
                    </p>

                    <hr>

                    <h3>
                        📋 DOCTOR'S NOTES
                    </h3>

                    <p>
                        "${doctorNote}"
                    </p>

                    <hr>

                    <p class="disclaimer">
                        ⚠️ THIS IS A FICTIONAL COMEDY REPORT.
                        NO ACTUAL MEDICAL DIAGNOSIS OR BRAIN
                        CELL ANALYSIS HAS BEEN PERFORMED.
                    </p>

                    <p class="report-by">
                        By Pink Pixels
                    </p>

                </div>
            `;

            // ADD SCORE
            addToLeaderboard(
                username,
                brainCellsLost,
                badge
            );

            report.scrollIntoView({ behavior: "smooth", block: "start" });

        }
    );

}


// ============================================================
// 23B. REAL-TIME GEIGER SOUND FEEDBACK
// ============================================================

function playGeigerPulse(percentage) {

    const now = Date.now();
    // Frequency of clicks increases with pink percentage (e.g. 600ms down to 65ms)
    const interval = Math.max(65, 600 - (percentage * 5.5));

    if (now - lastBeepTime < interval) {
        return;
    }

    lastBeepTime = now;

    try {

        if (!audioCtx) {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }

        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        if (audioCtx) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = "sine";
            // Pitch rises slightly with pink percentage
            osc.frequency.setValueAtTime(
                480 + (percentage * 5),
                audioCtx.currentTime
            );

            gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                audioCtx.currentTime + 0.03
            );

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.03);
        }

    } catch (e) {
        // Handled silently if audio context is restricted
    }

}


// ============================================================
// 23C. REAL-TIME IMAGE DETECTION LOOP
// ============================================================

function processCameraFrame(timestamp) {

    if (!isCameraRunning) {
        return;
    }

    animFrameId = requestAnimationFrame(processCameraFrame);

    // Throttle frame processing to ~25 FPS for optimal performance
    if (timestamp - lastDetectTime < 40) {
        return;
    }

    lastDetectTime = timestamp;

    if (cameraVideo.readyState < 2) {
        return;
    }

    const videoWidth = cameraVideo.videoWidth;
    const videoHeight = cameraVideo.videoHeight;

    if (!videoWidth || !videoHeight) {
        return;
    }

    // Synchronize overlay canvas with video display size
    const displayWidth = cameraVideo.clientWidth || 640;
    const displayHeight = cameraVideo.clientHeight || 480;

    if (
        scannerOverlayCanvas.width !== displayWidth ||
        scannerOverlayCanvas.height !== displayHeight
    ) {
        scannerOverlayCanvas.width = displayWidth;
        scannerOverlayCanvas.height = displayHeight;
    }

    const overlayCtx = scannerOverlayCanvas.getContext("2d");
    overlayCtx.clearRect(
        0,
        0,
        scannerOverlayCanvas.width,
        scannerOverlayCanvas.height
    );

    // Draw video frame to downscaled analysis canvas (160x120)
    const aw = analysisCanvas.width;
    const ah = analysisCanvas.height;
    analysisCtx.drawImage(cameraVideo, 0, 0, aw, ah);

    const frameData = analysisCtx.getImageData(0, 0, aw, ah);
    const data = frameData.data;
    const totalSamplePixels = aw * ah;
    let pinkPixels = 0;

    let heatmapData = null;
    if (isHeatmapEnabled) {
        heatmapData = heatmapCtx.createImageData(aw, ah);
    }

    // Pixel scan
    for (let i = 0; i < data.length; i += 4) {

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a > 0 && r > 180 && r > g * 1.2 && b > g) {

            pinkPixels++;

            if (heatmapData) {
                // Neon hot pink glow on detected pixels
                heatmapData.data[i] = 255;
                heatmapData.data[i + 1] = 20;
                heatmapData.data[i + 2] = 147;
                heatmapData.data[i + 3] = 180;
            }

        }

    }

    // Draw smoothed heatmap overlay if enabled
    if (isHeatmapEnabled && pinkPixels > 0 && heatmapData) {

        heatmapCtx.putImageData(heatmapData, 0, 0);

        overlayCtx.save();
        overlayCtx.globalAlpha = 0.7;
        overlayCtx.drawImage(
            heatmapCanvas,
            0,
            0,
            scannerOverlayCanvas.width,
            scannerOverlayCanvas.height
        );
        overlayCtx.restore();

    }

    // Calculate real-time metrics
    const pinkPercentage = (pinkPixels / totalSamplePixels) * 100;
    const scaleFactor = (videoWidth * videoHeight) / totalSamplePixels;
    const estimatedLoss = Math.round(pinkPixels * scaleFactor * 0.75);
    const diagnosis = getDiagnosis(pinkPercentage);

    // Update real-time HUD telemetry
    livePinkPercent.textContent = pinkPercentage.toFixed(2) + "%";
    livePinkMeter.style.width = Math.min(pinkPercentage, 100).toFixed(1) + "%";
    liveBrainCells.textContent = (pinkPercentage === 0 ? 0 : estimatedLoss).toLocaleString();
    liveStageBadge.textContent = diagnosis.name;

    // High pink danger border flash
    if (pinkPercentage > 50) {
        hudDangerFlash.classList.add("active");
    } else {
        hudDangerFlash.classList.remove("active");
    }

    // Audio geiger feedback
    if (isSoundEnabled && pinkPercentage > 0.5) {
        playGeigerPulse(pinkPercentage);
    }

}


// ============================================================
// 23D. CAMERA STREAM MANAGEMENT
// ============================================================

async function startCamera() {

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        cameraStatusOverlay.style.display = "flex";
        cameraStatusTitle.textContent = "Camera Not Supported";
        cameraStatusSubtitle.textContent =
            "Your browser or environment does not support media camera access. Please use the 'Upload Image' feature instead.";
        startCameraBtn.style.display = "none";
        return;
    }

    cameraStatusOverlay.style.display = "flex";
    cameraStatusTitle.textContent = "Connecting Camera...";
    cameraStatusSubtitle.textContent = "Requesting permission from your browser...";
    startCameraBtn.style.display = "none";

    try {

        if (cameraStream) {
            stopCamera();
        }

        const constraints = {
            video: {
                facingMode: currentFacingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        };

        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        cameraVideo.srcObject = cameraStream;

        await new Promise(function (resolve) {
            cameraVideo.onloadedmetadata = function () {
                cameraVideo.play();
                resolve();
            };
        });

        isCameraRunning = true;
        cameraStatusOverlay.style.display = "none";
        toggleCameraBtn.textContent = "⏹️ Stop Camera";
        toggleCameraBtn.classList.remove("active");

        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(processCameraFrame);

    } catch (err) {

        console.error("Camera access error:", err);
        isCameraRunning = false;
        cameraStatusOverlay.style.display = "flex";
        cameraStatusTitle.textContent = "Camera Unavailable or Blocked";

        if (
            err.name === "NotAllowedError" ||
            err.name === "PermissionDeniedError"
        ) {
            cameraStatusSubtitle.textContent =
                "Camera access permission was denied. Please allow camera permissions in your browser address bar and try again.";
        } else {
            cameraStatusSubtitle.textContent =
                "Could not connect to camera (" + (err.message || "Device error") + "). You can still use the 'Upload Image' tab!";
        }

        startCameraBtn.style.display = "inline-block";
        startCameraBtn.textContent = "🔄 Retry Camera";
        toggleCameraBtn.textContent = "▶️ Start Camera";

    }

}

function stopCamera() {

    if (cameraStream) {
        cameraStream.getTracks().forEach(function (track) {
            track.stop();
        });
        cameraStream = null;
    }

    isCameraRunning = false;
    cancelAnimationFrame(animFrameId);

    if (cameraVideo) {
        cameraVideo.srcObject = null;
    }

    const overlayCtx = scannerOverlayCanvas.getContext("2d");
    overlayCtx.clearRect(
        0,
        0,
        scannerOverlayCanvas.width,
        scannerOverlayCanvas.height
    );

    hudDangerFlash.classList.remove("active");

    cameraStatusOverlay.style.display = "flex";
    cameraStatusTitle.textContent = "Camera Scanner Paused";
    cameraStatusSubtitle.textContent =
        "Click 'Start Camera' to resume real-time detection.";
    startCameraBtn.style.display = "inline-block";
    startCameraBtn.textContent = "⚡ Start Camera";
    toggleCameraBtn.textContent = "▶️ Start Camera";

}

async function flipCamera() {

    currentFacingMode =
        currentFacingMode === "user" ? "environment" : "user";

    if (isCameraRunning) {
        await startCamera();
    }

}


// ============================================================
// 23E. MODE SWITCHING & CONTROLS
// ============================================================

function switchMode(mode) {

    currentMode = mode;

    if (mode === "upload") {

        tabUpload.classList.add("active");
        tabUpload.setAttribute("aria-selected", "true");
        tabCamera.classList.remove("active");
        tabCamera.setAttribute("aria-selected", "false");

        uploadModeContainer.style.display = "block";
        cameraModeContainer.style.display = "none";
        autopsyActionSection.style.display = "block";

        stopCamera();

    } else {

        tabCamera.classList.add("active");
        tabCamera.setAttribute("aria-selected", "true");
        tabUpload.classList.remove("active");
        tabUpload.setAttribute("aria-selected", "false");

        uploadModeContainer.style.display = "none";
        cameraModeContainer.style.display = "block";
        autopsyActionSection.style.display = "none";

        if (!isCameraRunning) {
            startCamera();
        }

    }

}

tabUpload.addEventListener("click", function () {
    switchMode("upload");
});

tabCamera.addEventListener("click", function () {
    switchMode("camera");
});

startCameraBtn.addEventListener("click", function () {
    startCamera();
});

toggleCameraBtn.addEventListener("click", function () {
    if (isCameraRunning) {
        stopCamera();
    } else {
        startCamera();
    }
});

flipCameraBtn.addEventListener("click", function () {
    flipCamera();
});

toggleMaskBtn.addEventListener("click", function () {
    isHeatmapEnabled = !isHeatmapEnabled;
    toggleMaskBtn.classList.toggle("active", isHeatmapEnabled);
    toggleMaskBtn.textContent = isHeatmapEnabled
        ? "✨ Heatmap: ON"
        : "✨ Heatmap: OFF";

    if (!isHeatmapEnabled) {
        const overlayCtx = scannerOverlayCanvas.getContext("2d");
        overlayCtx.clearRect(
            0,
            0,
            scannerOverlayCanvas.width,
            scannerOverlayCanvas.height
        );
    }
});

toggleSoundBtn.addEventListener("click", function () {
    isSoundEnabled = !isSoundEnabled;
    toggleSoundBtn.classList.toggle("active", isSoundEnabled);
    toggleSoundBtn.textContent = isSoundEnabled
        ? "🔊 Sound: ON"
        : "🔇 Sound: OFF";

    if (isSoundEnabled && !audioCtx) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
});


// ============================================================
// 23F. AUTOPSY TRIGGER BUTTONS
// ============================================================

// 1. Camera Snapshot & Autopsy
captureAnalyzeBtn.addEventListener("click", function () {

    if (!isCameraRunning || cameraVideo.readyState < 2) {
        alert("Please start the camera and wait for video feed before performing an autopsy!");
        return;
    }

    let username = "Anonymous";
    if (usernameInput) {
        username = usernameInput.value.trim();
    }
    if (!username) {
        username = "Anonymous";
    }

    // Set canvas dimensions to camera video natural size
    canvas.width = cameraVideo.videoWidth || 640;
    canvas.height = cameraVideo.videoHeight || 480;

    // Draw current camera frame to canvas
    ctx.drawImage(
        cameraVideo,
        0,
        0,
        canvas.width,
        canvas.height
    );

    performAutopsyOnCanvas(canvas, username);

});

// 2. Uploaded Image Autopsy
analyzeButton.addEventListener("click", function () {

    let username = "Anonymous";
    if (usernameInput) {
        username = usernameInput.value.trim();
    }
    if (!username) {
        username = "Anonymous";
    }

    // If currently in camera mode, capture from live video
    if (currentMode === "camera") {

        if (!isCameraRunning || cameraVideo.readyState < 2) {
            alert("Please start the camera first!");
            return;
        }

        canvas.width = cameraVideo.videoWidth || 640;
        canvas.height = cameraVideo.videoHeight || 480;

        ctx.drawImage(
            cameraVideo,
            0,
            0,
            canvas.width,
            canvas.height
        );

        performAutopsyOnCanvas(canvas, username);
        return;

    }

    // Upload mode
    if (!imageInput.files[0]) {
        alert("Please upload an image first!");
        return;
    }

    if (!imagePreview.complete) {
        alert("Please wait for the image to load.");
        return;
    }

    canvas.width = imagePreview.naturalWidth;
    canvas.height = imagePreview.naturalHeight;

    ctx.drawImage(
        imagePreview,
        0,
        0,
        canvas.width,
        canvas.height
    );

    performAutopsyOnCanvas(canvas, username);

});


// ============================================================
// 24. REMOVE OLD SCORES
// ============================================================

function removeOldScores() {

    const oneHour =
        60 * 60 * 1000;

    const currentTime =
        Date.now();

    leaderboardData =
        leaderboardData.filter(
            function (player) {

                return (
                    currentTime -
                    player.timestamp
                ) < oneHour;

            }
        );


    localStorage.setItem(
        "pinkAutopsyLeaderboard",
        JSON.stringify(leaderboardData)
    );


    displayLeaderboard();

}


// ============================================================
// 25. START LEADERBOARD
// ============================================================

removeOldScores();


// ============================================================
// 26. CHECK LEADERBOARD EVERY MINUTE
// ============================================================

setInterval(
    removeOldScores,
    60 * 1000
);


// ============================================================
// 27. CHECK INITIAL MODE (HASH OR QUERY PARAMS)
// ============================================================

if (
    window.location.hash === "#camera" ||
    window.location.search.includes("mode=camera")
) {
    switchMode("camera");
}


// ============================================================
// END OF JAVASCRIPT
// ============================================================