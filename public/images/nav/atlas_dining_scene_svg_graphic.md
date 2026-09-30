<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 576" width="100%" height="100%">
  <defs>
    <!-- Background / Wall Gradients -->
    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1e20"/>
      <stop offset="40%" stop-color="#2a2825"/>
      <stop offset="100%" stop-color="#141415"/>
    </linearGradient>

    <linearGradient id="warmWallLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#54493b" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#1a1816" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="floorGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#222326"/>
      <stop offset="100%" stop-color="#0f1012"/>
    </linearGradient>

    <!-- Table Top & Metal Base Gradients -->
    <linearGradient id="tableTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2d2b29"/>
      <stop offset="50%" stop-color="#403c37"/>
      <stop offset="100%" stop-color="#201f1d"/>
    </linearGradient>

    <linearGradient id="tableEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#191817"/>
      <stop offset="50%" stop-color="#282623"/>
      <stop offset="100%" stop-color="#121110"/>
    </linearGradient>

    <linearGradient id="bronzeBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5e4e3c"/>
      <stop offset="40%" stop-color="#3b3125"/>
      <stop offset="80%" stop-color="#211b14"/>
      <stop offset="100%" stop-color="#0f0c09"/>
    </linearGradient>

    <linearGradient id="bronzeBaseLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8a7358"/>
      <stop offset="50%" stop-color="#4a3e2f"/>
      <stop offset="100%" stop-color="#1f1a14"/>
    </linearGradient>

    <!-- Chair Upholstery & Frame -->
    <linearGradient id="chairFabric" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4a4744"/>
      <stop offset="100%" stop-color="#242321"/>
    </linearGradient>

    <linearGradient id="chairFrame" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c2a28"/>
      <stop offset="100%" stop-color="#121110"/>
    </linearGradient>

    <!-- Pendant Light Glow -->
    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff5e6" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#e6c89c" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#e6c89c" stop-opacity="0"/>
    </radialGradient>

    <!-- Soft Drop Shadow -->
    <radialGradient id="tableShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- BACKGROUND & ARCHITECTURE -->
  <rect width="1024" height="576" fill="url(#wallGrad)"/>

  <!-- Left Window / Patio View -->
  <rect x="130" y="15" width="470" height="410" fill="#14171a" stroke="#2a2d32" stroke-width="3"/>
  <!-- Window Glass Reflection / Dark Outdoor Wall -->
  <polygon points="135,20 600,20 600,420 135,420" fill="#181a1d"/>
  <path d="M 140,80 L 300,80 L 300,420 L 140,420 Z" fill="#202328" opacity="0.5"/>
  <line x1="300" y1="15" x2="300" y2="425" stroke="#25272b" stroke-width="4"/>

  <!-- Right Interior Wall Accent -->
  <polygon points="600,0 1024,0 1024,420 600,420" fill="url(#warmWallLight)"/>
  <rect x="840" y="30" width="55" height="390" fill="#2e2b27" opacity="0.4"/>

  <!-- Floor -->
  <polygon points="0,420 1024,420 1024,576 0,576" fill="url(#floorGrad)"/>
  <line x1="0" y1="420" x2="1024" y2="420" stroke="#0a0a0b" stroke-width="2"/>

  <!-- CEILING PENDANT LAMP -->
  <line x1="515" y1="0" x2="515" y2="110" stroke="#111" stroke-width="2"/>
  <ellipse cx="515" cy="118" rx="65" ry="12" fill="#1f2022"/>
  <ellipse cx="515" cy="120" rx="63" ry="8" fill="url(#lampGlow)"/>
  <ellipse cx="515" cy="135" rx="18" ry="5" fill="#18191b"/>

  <!-- SHADOW ON FLOOR -->
  <ellipse cx="512" cy="485" rx="340" ry="45" fill="url(#tableShadow)"/>

  <!-- BACK CHAIRS (FAR BACKGROUND) -->
  <!-- Back Chair 1 (Left-Center) -->
  <g id="back-chair-1">
    <rect x="260" y="305" width="80" height="45" rx="8" fill="url(#chairFabric)"/>
    <path d="M 265,350 L 260,400 M 335,350 L 340,400" stroke="url(#chairFrame)" stroke-width="3"/>
    <path d="M 260,350 L 340,350 L 335,385 L 265,385 Z" fill="#1f1e1c"/>
  </g>

  <!-- Back Chair 2 (Center) -->
  <g id="back-chair-2">
    <rect x="380" y="300" width="75" height="45" rx="8" fill="url(#chairFabric)"/>
    <path d="M 385,345 L 380,395 M 450,345 L 455,395" stroke="url(#chairFrame)" stroke-width="3"/>
    <path d="M 380,345 L 455,345 L 450,380 L 385,380 Z" fill="#1f1e1c"/>
  </g>

  <!-- Back Chair 3 (Right-Center) -->
  <g id="back-chair-3">
    <rect x="490" y="295" width="75" height="45" rx="8" fill="url(#chairFabric)"/>
    <path d="M 495,340 L 490,390 M 560,340 L 565,390" stroke="url(#chairFrame)" stroke-width="3"/>
    <path d="M 490,340 L 565,340 L 560,375 L 495,375 Z" fill="#1f1e1c"/>
  </g>

  <!-- Back Chair 4 (Far Right) -->
  <g id="back-chair-4">
    <rect x="700" y="295" width="80" height="45" rx="8" fill="url(#chairFabric)"/>
    <path d="M 705,340 L 695,390 M 775,340 L 785,390" stroke="url(#chairFrame)" stroke-width="3"/>
    <path d="M 700,340 L 780,340 L 775,375 L 705,375 Z" fill="#1f1e1c"/>
  </g>

  <!-- ATLAS TABLE ARCHITECTURAL BASE -->
  <!-- Left V-Leg Structure -->
  <polygon points="370,350 440,490 475,490 395,350" fill="url(#bronzeBase)"/>
  <polygon points="395,350 475,490 510,490 420,350" fill="url(#bronzeBaseLight)"/>
  
  <!-- Right V-Leg Structure -->
  <polygon points="650,350 540,490 505,490 625,350" fill="url(#bronzeBase)"/>
  <polygon points="625,350 505,490 470,490 595,350" fill="url(#bronzeBaseLight)"/>

  <!-- Central Crossing Joiner -->
  <polygon points="460,430 540,430 525,465 475,465" fill="#1a140f"/>

  <!-- TABLE TOP -->
  <!-- Lower Bevel/Thickness -->
  <polygon points="215,350 785,350 770,358 230,358" fill="url(#tableEdgeGrad)"/>
  <!-- Main Surface Slab -->
  <polygon points="210,320 790,320 785,350 215,350" fill="url(#tableTopGrad)"/>
  <!-- Surface Highlight Edge -->
  <line x1="210" y1="320" x2="790" y2="320" stroke="#635c54" stroke-width="1.5" opacity="0.8"/>

  <!-- TABLE DECORATION -->
  <!-- Vase & Branches -->
  <ellipse cx="485" cy="280" rx="16" ry="22" fill="#d9d2c9"/>
  <path d="M 485,258 C 480,230 460,200 445,180 M 475,220 C 490,200 500,190 505,185 M 480,240 C 465,225 450,220 440,215" stroke="#1c1917" stroke-width="2" fill="none"/>
  <!-- Small Sculptural Objects -->
  <path d="M 515,280 C 515,260 522,250 528,250 C 535,250 538,260 538,280 Z" fill="#383633"/>
  <path d="M 542,280 C 542,268 547,262 552,262 C 557,262 560,268 560,280 Z" fill="#242321"/>

  <!-- FOREGROUND CHAIRS -->
  <!-- Left Side Chair -->
  <g id="front-chair-left">
    <!-- Backrest -->
    <rect x="140" y="325" width="75" height="35" rx="6" fill="url(#chairFabric)"/>
    <path d="M 140,335 C 135,370 145,400 178,400 C 210,400 215,370 215,335" fill="none" stroke="url(#chairFrame)" stroke-width="4"/>
    <!-- Seat Cushion -->
    <path d="M 140,400 L 215,400 L 210,430 L 145,430 Z" fill="url(#chairFabric)"/>
    <!-- Legs -->
    <line x1="145" y1="430" x2="130" y2="520" stroke="url(#chairFrame)" stroke-width="4"/>
    <line x1="210" y1="430" x2="225" y2="520" stroke="url(#chairFrame)" stroke-width="4"/>
    <line x1="160" y1="430" x2="168" y2="490" stroke="url(#chairFrame)" stroke-width="3"/>
    <line x1="195" y1="430" x2="188" y2="490" stroke="url(#chairFrame)" stroke-width="3"/>
  </g>

  <!-- Front Left Center Chair -->
  <g id="front-chair-center-left">
    <rect x="585" y="325" width="85" height="40" rx="8" fill="url(#chairFabric)"/>
    <path d="M 585,335 C 580,380 590,405 627,405 C 665,405 670,380 670,335" fill="none" stroke="url(#chairFrame)" stroke-width="5"/>
    <!-- Seat -->
    <ellipse cx="627" cy="415" rx="42" ry="15" fill="url(#chairFabric)"/>
    <!-- Legs -->
    <line x1="590" y1="420" x2="585" y2="525" stroke="url(#chairFrame)" stroke-width="4"/>
    <line x1="665" y1="420" x2="678" y2="525" stroke="url(#chairFrame)" stroke-width="4"/>
    <line x1="605" y1="425" x2="615" y2="495" stroke="url(#chairFrame)" stroke-width="3"/>
    <line x1="650" y1="425" x2="642" y2="495" stroke="url(#chairFrame)" stroke-width="3"/>
  </g>

  <!-- Front Right Chair -->
  <g id="front-chair-right">
    <rect x="745" y="318" width="80" height="38" rx="8" fill="url(#chairFabric)"/>
    <path d="M 745,328 C 740,370 750,395 785,395 C 820,395 825,370 825,328" fill="none" stroke="url(#chairFrame)" stroke-width="4"/>
    <!-- Seat -->
    <ellipse cx="785" cy="405" rx="38" ry="14" fill="url(#chairFabric)"/>
    <!-- Legs -->
    <line x1="750" y1="410" x2="735" y2="505" stroke="url(#chairFrame)" stroke-width="4"/>
    <line x1="820" y1="410" x2="838" y2="505" stroke="url(#chairFrame)" stroke-width="4"/>
    <line x1="765" y1="412" x2="772" y2="480" stroke="url(#chairFrame)" stroke-width="3"/>
    <line x1="805" y1="412" x2="798" y2="480" stroke="url(#chairFrame)" stroke-width="3"/>
  </g>
</svg>