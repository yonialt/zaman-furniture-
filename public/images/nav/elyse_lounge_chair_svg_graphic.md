<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 768" width="100%" height="100%">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#1e2229"/>
      <stop offset="60%" stop-color="#111317"/>
      <stop offset="100%" stop-color="#090a0c"/>
    </radialGradient>

    <!-- Floor Gradient -->
    <linearGradient id="floorGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#14171c"/>
      <stop offset="100%" stop-color="#08090b"/>
    </linearGradient>

    <!-- Chair Shadow -->
    <radialGradient id="dropShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Metal Leg Gradient -->
    <linearGradient id="metalLeg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a7356"/>
      <stop offset="30%" stop-color="#4a3e2e"/>
      <stop offset="70%" stop-color="#241e17"/>
      <stop offset="100%" stop-color="#0f0c0a"/>
    </linearGradient>

    <!-- Leather Main Body Gradients -->
    <linearGradient id="leatherBackRest" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#323842"/>
      <stop offset="30%" stop-color="#1e2228"/>
      <stop offset="70%" stop-color="#131519"/>
      <stop offset="100%" stop-color="#0a0b0d"/>
    </linearGradient>

    <linearGradient id="leatherCushion" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2b3039"/>
      <stop offset="40%" stop-color="#1a1c22"/>
      <stop offset="100%" stop-color="#0c0d10"/>
    </linearGradient>

    <linearGradient id="armrestRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3d4450"/>
      <stop offset="30%" stop-color="#20242b"/>
      <stop offset="80%" stop-color="#101216"/>
    </linearGradient>

    <!-- Rim Light / Highlights -->
    <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#707d93" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#20242b" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="520" fill="url(#bgGlow)"/>
  <rect y="520" width="1024" height="248" fill="url(#floorGrad)"/>

  <!-- Floor Horizon Line Blur -->
  <line x1="0" y1="520" x2="1024" y2="520" stroke="#1c2027" stroke-width="2" opacity="0.5"/>

  <!-- Shadow under the chair -->
  <ellipse cx="512" cy="620" rx="280" ry="60" fill="url(#dropShadow)"/>

  <!-- Chair Group -->
  <g id="ElyseLoungeChair">

    <!-- LEGS -->
    <!-- Back Left Leg -->
    <polygon points="480,550 488,550 484,600 480,600" fill="url(#metalLeg)" />
    <!-- Back Right Leg -->
    <polygon points="730,540 738,540 746,620 739,620" fill="url(#metalLeg)" />
    <!-- Front Left Leg -->
    <polygon points="262,535 272,535 264,640 255,640" fill="url(#metalLeg)" />
    <!-- Front Right Leg -->
    <polygon points="562,560 572,560 572,695 563,695" fill="url(#metalLeg)" />

    <!-- MAIN SHELL / BACKREST -->
    <path d="M232,320 
             C232,240 320,160 500,160 
             C680,160 780,220 790,320 
             C798,400 780,500 760,540 
             C650,560 350,560 232,500 
             Z" 
          fill="url(#leatherBackRest)" />

    <!-- Backrest Rim Light Highlight -->
    <path d="M232,320 C232,240 320,160 500,160 C600,160 700,190 755,240" 
          fill="none" stroke="url(#rimHighlight)" stroke-width="3" opacity="0.8"/>

    <!-- INNER BACKREST CREASES / FOLDS (Leather detail) -->
    <g opacity="0.25" stroke="#050607" stroke-width="4" stroke-linecap="round">
      <path d="M 450,200 C 460,280 470,350 475,400" />
      <path d="M 500,195 C 510,280 515,360 515,400" />
      <path d="M 550,200 C 555,275 550,350 545,400" />
      <path d="M 600,210 C 600,280 585,350 575,400" />
      <path d="M 650,225 C 640,290 620,350 605,400" />
    </g>

    <!-- LEFT ARMREST -->
    <path d="M232,320 
             C220,370 225,450 255,530 
             C280,545 380,530 430,490 
             C380,450 310,400 290,320 
             C270,300 240,300 232,320 Z" 
          fill="url(#leatherBackRest)" />

    <!-- RIGHT ARMREST (Outer & Front Profile) -->
    <path d="M600,350 
             C670,370 780,330 790,320 
             C798,410 780,510 750,545 
             C680,565 580,580 570,550 
             C560,490 570,410 600,350 Z" 
          fill="url(#armrestRight)" />
    
    <!-- Right Armrest Highlight Edge -->
    <path d="M600,350 C670,370 780,330 790,320 C798,400 780,500 750,545" 
          fill="none" stroke="#5d697c" stroke-width="2" opacity="0.5"/>

    <!-- SEAT CUSHION -->
    <path d="M250,515 
             C270,420 420,400 580,415 
             C650,420 730,450 750,525 
             C700,560 600,580 560,575 
             C430,580 290,560 250,515 Z" 
          fill="url(#leatherCushion)" />

    <!-- Seat Cushion Edge Highlight & Seam -->
    <path d="M250,515 C290,560 430,580 560,575 C600,580 700,560 750,525" 
          fill="none" stroke="#485363" stroke-width="3" opacity="0.6"/>
    
    <path d="M255,525 C295,570 435,588 563,582 C603,587 700,565 745,532" 
          fill="none" stroke="#090a0c" stroke-width="4" opacity="0.9"/>

    <!-- Bottom Cushion Base Frame Shadow -->
    <path d="M255,535 L260,545 C350,575 480,590 565,585 L745,538 L740,530" 
          fill="#101215" />
  </g>
</svg>