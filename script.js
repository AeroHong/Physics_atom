// --- General Tab Switching Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
            const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const tabId = button.dataset.tab;
            showTab(tabId);
        });
    });

    // Show the initial tab (e.g., "intro-content")
    showTab('intro-content');

    // --- Session 1: Electric Force (Static Electricity Lab) ---
    const staticLab = document.getElementById('static-lab');
    const balloon = document.getElementById('balloon');
    const chargeBtn = document.getElementById('charge-btn');
    let isCharged = false;
    let paperScraps = [];

    // Create paper scraps
    function createPaperScraps(count = 20) {
        if (!staticLab) return; // Exit if the lab container isn't found
        staticLab.innerHTML = ''; // Clear previous scraps
        paperScraps = []; // Reset array
        for (let i = 0; i < count; i++) {
            const scrap = document.createElement('div');
            scrap.classList.add('paper-scrap');
            scrap.style.left = `${Math.random() * 90 + 5}%`; // Random horizontal position
            scrap.style.top = `${Math.random() * 90 + 5}%`;   // Random vertical position
            scrap.textContent = '📄';
            staticLab.appendChild(scrap);
            paperScraps.push(scrap);
        }
    }

    // Function to attract paper scraps
    function attractPaperScraps() {
        if (!isCharged || !balloon || !staticLab) return;

        const labRect = staticLab.getBoundingClientRect();
        const balloonRect = balloon.getBoundingClientRect();
        const balloonCenterX = balloonRect.left + balloonRect.width / 2 - labRect.left;
        const balloonCenterY = balloonRect.top + balloonRect.height / 2 - labRect.top;

        paperScraps.forEach(scrap => {
            const scrapRect = scrap.getBoundingClientRect();
            const scrapCenterX = scrapRect.left + scrapRect.width / 2 - labRect.left;
            const scrapCenterY = scrapRect.top + scrapRect.height / 2 - labRect.top;

            const distanceX = balloonCenterX - scrapCenterX;
            const distanceY = balloonCenterY - scrapCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Attract if within a certain range
            if (distance < 100) { // Adjust attraction range as needed (pixels)
                const forceMagnitude = (100 - distance) / 100; // Stronger attraction closer
                const angle = Math.atan2(distanceY, distanceX);

                const currentLeft = parseFloat(scrap.style.left);
                const currentTop = parseFloat(scrap.style.top);

                // Apply a slight shift towards the balloon
                const newLeft = currentLeft + Math.cos(angle) * forceMagnitude * 1.5; // Adjust attraction speed
                const newTop = currentTop + Math.sin(angle) * forceMagnitude * 1.5; // Adjust attraction speed

                scrap.style.left = `${Math.max(0, Math.min(100, newLeft))}%`;
                scrap.style.top = `${Math.max(0, Math.min(100, newTop))}%`;
                scrap.style.transform = `scale(1.1)`; // Slightly larger when attracted
            } else {
                scrap.style.transform = `scale(1)`;
            }
        });
    }

    // Charge button handler
    if (chargeBtn) {
        chargeBtn.addEventListener('click', () => {
            isCharged = true;
            balloon.classList.add('charged');
            
            // Clear any existing interval to prevent multiple running
            if (window.attractionInterval) {
                clearInterval(window.attractionInterval);
            }

            // Periodically attract paper scraps for a dynamic effect
            window.attractionInterval = setInterval(attractPaperScraps, 100);

            // Reset after 10 seconds
            setTimeout(() => {
                isCharged = false;
                balloon.classList.remove('charged');
                clearInterval(window.attractionInterval);
                paperScraps.forEach(scrap => {
                    scrap.style.transform = `scale(1)`;
                    // Optionally reset positions slightly
                    scrap.style.left = `${Math.random() * 90 + 5}%`;
                    scrap.style.top = `${Math.random() * 90 + 5}%`;
                });
            }, 10000); // 10 seconds
        });
    }

    // Initialize paper scraps for Session 1 when the page loads
    if (staticLab) {
        createPaperScraps();
    }


    // --- Session 2: Atom Models (Visualization) ---
    const atomModelVisualization = document.getElementById('atom-model-visualization');
    const atomModelButtons = document.querySelectorAll('.atom-model-btn');
    const modelName = document.getElementById('model-name');
    const modelYear = document.getElementById('model-year');
    const modelAnalogy = document.getElementById('model-analogy');
    const modelFeatures = document.getElementById('model-features');

    const atomModels = {
        dalton: {
            name: '돌턴의 원자 모형',
            year: '1803년',
            analogy: '더 이상 쪼갤 수 없는 단단한 공',
            features: '물질의 최소 단위로, 더 이상 쪼개지지 않는다고 생각했어요. 마치 레고 블록의 기본 조각 같아요.',
            render: () => {
                if (!atomModelVisualization) return;
                atomModelVisualization.innerHTML = `
                    <div class="nucleus" style="background-color: #64748b; width: 80px; height: 80px; font-size: 3em;">⚫</div>
                `;
            }
        },
        thomson: {
            name: '톰슨의 원자 모형',
            year: '1897년',
            analogy: '건포도 박힌 푸딩',
            features: '원자 전체가 양전하를 띠는 균일한 구(푸딩)이고, 그 안에 음전하를 띠는 전자(건포도)가 박혀 있다고 생각했어요.',
            render: () => {
                if (!atomModelVisualization) return;
                atomModelVisualization.innerHTML = `
                    <div class="nucleus" style="background-color: #fca5a5; width: 150px; height: 150px; font-size: 1.2rem;">+ Pudding</div>
                    <div class="electron" style="top: 20%; left: 30%;">e-</div>
                    <div class="electron" style="top: 50%; left: 70%;">e-</div>
                    <div class="electron" style="top: 70%; left: 40%;">e-</div>
                `;
            }
        },
        rutherford: {
            name: '러더퍼드의 원자 모형',
            year: '1911년',
            analogy: '태양계 모형',
            features: '원자 중심에 양전하를 띠는 아주 작고 무거운 핵이 있고, 전자들은 그 주위를 공전한다고 생각했어요. 원자의 대부분은 빈 공간이에요.',
            render: () => {
                if (!atomModelVisualization) return;
                atomModelVisualization.innerHTML = `
                    <div class="nucleus" style="background-color: #ef4444; width: 40px; height: 40px; font-size: 1.5rem;">+</div>
                    <div class="orbit" style="width: 150px; height: 150px; top: 25px; left: 25px;"></div>
                    <div class="orbit" style="width: 100px; height: 100px; top: 50px; left: 50px;"></div>
                    <div class="electron" style="top: 10px; left: 50%; transform: translateX(-50%); animation: orbit1 4s linear infinite;">e-</div>
                    <div class="electron" style="top: 100px; left: 10px; transform: translateX(-50%); animation: orbit2 3s linear infinite;">e-</div>
                `;
            }
        },
        bohr: {
            name: '보어의 원자 모형',
            year: '1913년',
            analogy: '계단식 아파트 또는 행성 모형',
            features: '전자들은 특정한 에너지 준위(궤도)에서만 존재하며, 각 궤도마다 정해진 에너지를 가져요. 전자가 궤도를 이동할 때만 에너지를 흡수하거나 방출해요.',
            render: () => {
                if (!atomModelVisualization) return;
                atomModelVisualization.innerHTML = `
                    <div class="nucleus" style="background-color: #1d4ed8; width: 30px; height: 30px; font-size: 1.25rem;">N</div>
                    <div class="orbit" style="width: 80px; height: 80px; top: 60px; left: 60px; border-color: #60a5fa;"></div>
                    <div class="orbit" style="width: 130px; height: 130px; top: 35px; left: 35px; border-color: #22c55e;"></div>
                    <div class="orbit" style="width: 180px; height: 180px; top: 10px; left: 10px; border-color: #ef4444;"></div>
                    <div class="electron" id="bohr-electron-s2" style="top: 100px; left: 70px; animation: none;">e-</div>
                `;
            }
        }
    };

    function updateAtomModel(modelKey) {
        const model = atomModels[modelKey];
        if (model) {
            modelName.textContent = model.name;
            modelYear.textContent = model.year;
            modelAnalogy.textContent = `'${model.analogy}'`;
            modelFeatures.textContent = model.features;
            model.render();

            // Update button active state
            atomModelButtons.forEach(btn => {
                if (btn.dataset.model === modelKey) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    if (atomModelVisualization) {
        atomModelButtons.forEach(button => {
            button.addEventListener('click', () => {
                updateAtomModel(button.dataset.model);
            });
        });
        // Set initial model
        updateAtomModel('dalton');
    }

    // Keyframe animations for Rutherford model electrons
    // This is already in the CSS, no need to add dynamically in JS unless truly necessary
    // for runtime manipulation of keyframes, which is not the case here.


    // --- Session 3: Electron Energy Levels (Bohr Model Simulation) ---
    const bohrModelEnergy = document.getElementById('bohr-model-energy');
    const energyAbsorbBtn = document.getElementById('energy-absorb-btn');
    const energyEmitBtn = document.getElementById('energy-emit-btn');
    const energyStatus = document.getElementById('energy-status');
    let currentEnergyLevel = 1; // n=1 is ground state

    function renderBohrModelEnergySim() {
        if (!bohrModelEnergy) return;
        bohrModelEnergy.innerHTML = `
            <div class="nucleus">N</div>
            <div class="orbit" style="width: 80px; height: 80px; top: 60px; left: 60px;"></div>
            <div class="orbit" style="width: 130px; height: 130px; top: 35px; left: 35px;"></div>
            <div class="orbit" style="width: 180px; height: 180px; top: 10px; left: 10px;"></div>
            <div class="electron" id="sim-electron-s3">e-</div>
        `;
        updateElectronPosition();
    }

    function updateElectronPosition() {
        const electron = document.getElementById('sim-electron-s3');
        if (!electron) return;

        let topPos, leftPos, transformX, transformY;

        // Positions relative to the atom-visualization-container
        // These are tuned to place the electron *on* the orbit line
        const containerWidth = 300; // from CSS
        const containerHeight = 200; // from CSS
        const nucleusSize = 25; // from CSS

        switch (currentEnergyLevel) {
            case 1: // Innermost orbit (radius 40px from center of nucleus)
                topPos = containerHeight / 2 - (nucleusSize / 2) - 40;
                leftPos = containerWidth / 2 - (nucleusSize / 2) - 40;
                break;
            case 2: // Middle orbit (radius 65px from center of nucleus)
                topPos = containerHeight / 2 - (nucleusSize / 2) - 65;
                leftPos = containerWidth / 2 - (nucleusSize / 2) - 65;
                break;
            case 3: // Outermost orbit (radius 90px from center of nucleus)
                topPos = containerHeight / 2 - (nucleusSize / 2) - 90;
                leftPos = containerWidth / 2 - (nucleusSize / 2) - 90;
                break;
            default:
                currentEnergyLevel = 1; // Fallback to ground state
                topPos = containerHeight / 2 - (nucleusSize / 2) - 40;
                leftPos = containerWidth / 2 - (nucleusSize / 2) - 40;
        }

        // Apply position to the electron
        electron.style.top = `${topPos + electron.offsetHeight / 2}px`; // Adjust for electron's own size
        electron.style.left = `${leftPos + electron.offsetWidth / 2}px`; // Adjust for electron's own size
        electron.style.transform = `translateY(${topPos}px) translateX(${leftPos}px)`;


        // Update status text
        if (energyStatus) {
            if (currentEnergyLevel === 1) {
                energyStatus.innerHTML = '<p>전자가 n=1 궤도 (바닥 상태) 에 있습니다.</p>';
            } else {
                energyStatus.innerHTML = `<p class="text-orange-600">전자가 n=${currentEnergyLevel} 궤도 (들뜬 상태) 에 있습니다.</p>`;
            }
        }
    }

    if (energyAbsorbBtn) {
        energyAbsorbBtn.addEventListener('click', () => {
            if (currentEnergyLevel < 3) { // Max 3 energy levels for simplicity
                currentEnergyLevel++;
                updateElectronPosition();
                if (bohrModelEnergy) {
                    bohrModelEnergy.style.backgroundColor = '#d1fae5'; // Light green flash
                    setTimeout(() => bohrModelEnergy.style.backgroundColor = '#e8f5e9', 300);
                }
            } else {
                alert('더 이상 높은 에너지 준위로 이동할 수 없습니다!');
            }
        });
    }

    if (energyEmitBtn) {
        energyEmitBtn.addEventListener('click', () => {
            if (currentEnergyLevel > 1) { // Cannot go below ground state
                currentEnergyLevel--;
                updateElectronPosition();
                if (bohrModelEnergy) {
                    bohrModelEnergy.style.backgroundColor = '#eef2ff'; // Light blue flash
                    setTimeout(() => bohrModelEnergy.style.backgroundColor = '#e8f5e9', 300);
                }
            } else {
                alert('전자가 이미 바닥 상태에 있습니다!');
            }
        });
    }

    if (bohrModelEnergy) {
        renderBohrModelEnergySim(); // Initial render for Bohr model simulation
    }

    // --- Session 3: Flame Test Chart (using Chart.js) ---
    const flameTestChartCanvas = document.getElementById('flameTestChart');
    if (flameTestChartCanvas) {
        const ctx = flameTestChartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['리튬 (Li)', '나트륨 (Na)', '칼륨 (K)', '구리 (Cu)', '스트론튬 (Sr)', '바륨 (Ba)'],
                datasets: [{
                    label: '불꽃 반응 색깔',
                    data: [100, 100, 100, 100, 100, 100], // Dummy data for bar height
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.8)',   // Lithium: Red
                        'rgba(255, 165, 0, 0.8)', // Sodium: Orange
                        'rgba(128, 0, 128, 0.8)', // Potassium: Lilac/Purple
                        'rgba(0, 128, 0, 0.8)',   // Copper: Green
                        'rgba(255, 69, 0, 0.8)',  // Strontium: Red-Orange
                        'rgba(173, 255, 47, 0.8)' // Barium: Green-Yellow
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 1)',
                        'rgba(255, 165, 0, 1)',
                        'rgba(128, 0, 128, 1)',
                        'rgba(0, 128, 0, 1)',
                        'rgba(255, 69, 0, 1)',
                        'rgba(173, 255, 47, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false, // Hide Y-axis labels
                        max: 120 // Adjust max height for visual
                    },
                    x: {
                        grid: {
                            display: false // Hide X-axis grid lines
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide legend
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ' (고유한 불꽃색)';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500, // Animation duration
                    easing: 'easeOutQuart' // Easing function
                }
            }
        });
    }
    // ...existing code...

// 부드러운 스크롤 및 탭 활성화
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();

    // 탭 활성화 표시
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    // 탭 콘텐츠 활성화
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    const targetId = this.getAttribute('data-tab');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      // 부드러운 스크롤
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ...existing code...
});
