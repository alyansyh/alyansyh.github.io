/**
 * ==============================================================================
 * LOGIKA UTAMA WEBSITE PORTOFOLIO (Vanilla JavaScript)
 * ==============================================================================
 * Menangani rendering dinamis proyek & sertifikat, filter kategori otomatis,
 * pencarian real-time, lightbox modal interaktif, dan dark/light mode toggle.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initScrollSpy();
  initProjects();
  initCertificates();
  initLightbox();
  initScrollReveal();
});

/* ==============================================================================
   1. MODUL PROYEK (Dynamic Rendering, Filter Kategori Otomatis, Fallback)
   ============================================================================== */
function initProjects() {
  const filterContainer = document.getElementById('project-filter-container');
  const gridContainer = document.getElementById('projects-grid');

  if (!gridContainer) return;

  // Pastikan data projects ada dari /js/projects.js
  const projectList = (typeof projects !== 'undefined' && Array.isArray(projects)) ? projects : [];

  if (projectList.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📂</div>
        <h3 class="empty-state-title">Belum ada proyek yang ditambahkan</h3>
        <p class="empty-state-desc">Buka file <code>/js/projects.js</code> untuk menambahkan proyek portofolio pertama Anda.</p>
      </div>
    `;
    return;
  }

  // 1. Ekstraksi kategori unik secara dinamis dari data proyek
  const categories = ['Semua', ...new Set(projectList.map(item => item.category).filter(Boolean))];

  // 2. Render tombol filter kategori
  if (filterContainer) {
    filterContainer.innerHTML = categories.map((cat, index) => `
      <button 
        type="button" 
        class="filter-btn ${index === 0 ? 'active' : ''}" 
        data-category="${escapeHtml(cat)}"
        aria-label="Filter proyek kategori ${escapeHtml(cat)}">
        ${escapeHtml(cat)}
      </button>
    `).join('');

    // Event listener untuk tombol filter
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');
      renderProjectsGrid(selectedCategory, projectList, gridContainer);
    });
  }

  // 3. Render awal seluruh proyek
  renderProjectsGrid('Semua', projectList, gridContainer);
}

/**
 * Render grid kartu proyek berdasarkan kategori yang dipilih
 */
function renderProjectsGrid(category, projectList, container) {
  const filtered = category === 'Semua' 
    ? projectList 
    : projectList.filter(p => p.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">Tidak ada proyek untuk kategori "${escapeHtml(category)}"</h3>
        <p class="empty-state-desc">Silakan pilih kategori lain atau tambahkan proyek baru di kategori ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((proj, index) => {
    // Tombol Demo: Hanya tampil jika demoLink diisi & tidak kosong
    const hasDemo = proj.demoLink && proj.demoLink.trim() !== '';
    const demoButtonHtml = hasDemo ? `
      <a href="${escapeHtml(proj.demoLink)}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-primary btn-sm"
         title="Buka Demo Online ${escapeHtml(proj.title)}">
        <span>Live Demo</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    ` : '';

    // Tombol Source Code: Hanya tampil jika sourceLink diisi & tidak kosong
    const hasSource = proj.sourceLink && proj.sourceLink.trim() !== '';
    const sourceButtonHtml = hasSource ? `
      <a href="${escapeHtml(proj.sourceLink)}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-outline btn-sm"
         title="Buka Repositori Kode ${escapeHtml(proj.title)}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>Source Code</span>
      </a>
    ` : '';

    // Badges Tech Stack
    const techBadgesHtml = Array.isArray(proj.tech) 
      ? proj.tech.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('') 
      : '';

    // Image path with fallback
    const imgSrc = proj.image && proj.image.trim() !== '' 
      ? escapeHtml(proj.image) 
      : 'assets/images/projects/placeholder-project.svg';

    return `
      <article class="project-card reveal-on-scroll" style="animation-delay: ${index * 80}ms">
        <div class="card-media-wrapper" 
             tabindex="0"
             role="button"
             aria-label="Perbesar gambar proyek ${escapeHtml(proj.title)}"
             onclick="openProjectLightbox(${index})">
          <img 
            src="${imgSrc}" 
            alt="Screenshot proyek ${escapeHtml(proj.title)}" 
            class="card-media-img" 
            loading="lazy" 
            onerror="handleProjectImageError(this)"
          />
          <span class="category-floating-badge">${escapeHtml(proj.category || 'Proyek')}</span>
          <div class="zoom-hint-overlay">
            <span class="zoom-hint-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              Klik untuk memperbesar
            </span>
          </div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${escapeHtml(proj.title)}</h3>
          <p class="card-desc">${escapeHtml(proj.description)}</p>
          <div class="tech-badges-list">
            ${techBadgesHtml}
          </div>
          <div class="card-actions">
            ${demoButtonHtml}
            ${sourceButtonHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Fallback jika gambar proyek gagal dimuat
 */
function handleProjectImageError(imgElement) {
  imgElement.onerror = null; // hindari loop jika fallback juga tidak ditemukan
  imgElement.src = 'assets/images/projects/placeholder-project.svg';
}

/* ==============================================================================
   2. MODUL SERTIFIKAT (Dynamic Rendering, Pencarian, PDF Buttons, Fallback)
   ============================================================================== */
let currentCertificatesList = [];

function initCertificates() {
  const searchInput = document.getElementById('cert-search-input');
  const searchClearBtn = document.getElementById('cert-search-clear');
  const filterContainer = document.getElementById('cert-filter-container');
  const gridContainer = document.getElementById('certificates-grid');

  if (!gridContainer) return;

  currentCertificatesList = (typeof certificates !== 'undefined' && Array.isArray(certificates)) 
    ? certificates 
    : [];

  if (currentCertificatesList.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📜</div>
        <h3 class="empty-state-title">Belum ada sertifikat yang ditambahkan</h3>
        <p class="empty-state-desc">Buka file <code>/js/certificates.js</code> untuk menambahkan sertifikat keahlian Anda.</p>
      </div>
    `;
    return;
  }

  // 1. Ekstraksi penerbit unik untuk tombol filter ringkas
  const issuers = ['Semua', ...new Set(currentCertificatesList.map(c => c.issuer).filter(Boolean))];
  let activeIssuer = 'Semua';

  if (filterContainer) {
    filterContainer.innerHTML = issuers.map((iss, index) => `
      <button 
        type="button" 
        class="filter-btn ${index === 0 ? 'active' : ''}" 
        data-issuer="${escapeHtml(iss)}"
        aria-label="Filter penerbit ${escapeHtml(iss)}">
        ${escapeHtml(iss)}
      </button>
    `).join('');

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeIssuer = btn.getAttribute('data-issuer');
      filterAndRenderCertificates(searchInput ? searchInput.value : '', activeIssuer, gridContainer);
    });
  }

  // 2. Pencarian Real-Time (Search by title or issuer)
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (searchClearBtn) {
        searchClearBtn.style.display = query ? 'flex' : 'none';
      }
      filterAndRenderCertificates(query, activeIssuer, gridContainer);
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
        filterAndRenderCertificates('', activeIssuer, gridContainer);
      });
    }
  }

  // 3. Render awal
  filterAndRenderCertificates('', 'Semua', gridContainer);
}

/**
 * Filter gabungan pencarian dan penerbit
 */
function filterAndRenderCertificates(query, selectedIssuer, container) {
  const q = query.toLowerCase();

  const filtered = currentCertificatesList.filter(cert => {
    const matchIssuer = selectedIssuer === 'Semua' || cert.issuer === selectedIssuer;
    const matchQuery = !q || 
      (cert.title && cert.title.toLowerCase().includes(q)) || 
      (cert.issuer && cert.issuer.toLowerCase().includes(q));
    return matchIssuer && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔎</div>
        <h3 class="empty-state-title">Sertifikat tidak ditemukan</h3>
        <p class="empty-state-desc">Tidak ada sertifikat yang cocok dengan kata kunci "${escapeHtml(query)}".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((cert, index) => {
    // Tombol Verifikasi Kredensial: Hanya tampil jika credentialLink diisi
    const hasCred = cert.credentialLink && cert.credentialLink.trim() !== '';
    const credButtonHtml = hasCred ? `
      <a href="${escapeHtml(cert.credentialLink)}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-emerald btn-sm btn-full-row"
         title="Verifikasi keaslian kredensial di situs ${escapeHtml(cert.issuer)}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
        <span>Verifikasi Kredensial</span>
      </a>
    ` : '';

    // Handle Gambar Preview / PDF Fallback
    const hasPreviewImage = cert.image && cert.image.trim() !== '';
    let previewHtml = '';

    if (hasPreviewImage) {
      previewHtml = `
        <div class="card-media-wrapper" 
             tabindex="0"
             role="button"
             aria-label="Perbesar sertifikat ${escapeHtml(cert.title)}"
             onclick="openCertLightbox(${index})">
          <img 
            src="${escapeHtml(cert.image)}" 
            alt="Sertifikat ${escapeHtml(cert.title)}" 
            class="card-media-img" 
            loading="lazy" 
            onerror="handleCertImageError(this, ${index})"
          />
          <div class="zoom-hint-overlay">
            <span class="zoom-hint-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="14" y2="11"></line></svg>
              Klik untuk memperbesar
            </span>
          </div>
        </div>
      `;
    } else {
      // Jika user belum punya gambar preview, tampilkan fallback kartu berikon PDF
      previewHtml = `
        <div class="cert-pdf-fallback" 
             tabindex="0"
             role="button"
             aria-label="Buka dokumen PDF ${escapeHtml(cert.title)}"
             onclick="openCertLightbox(${index})">
          <div class="cert-pdf-icon">📄</div>
          <span class="cert-pdf-fallback-text">Dokumen PDF Resmi</span>
        </div>
      `;
    }

    // Nama file untuk atribut download
    const pdfFilename = cert.pdf ? cert.pdf.split('/').pop() : 'sertifikat.pdf';

    return `
      <article class="certificate-card reveal-on-scroll" style="animation-delay: ${index * 80}ms">
        ${previewHtml}
        <div class="card-content">
          <div class="cert-meta-row">
            <span class="cert-issuer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ${escapeHtml(cert.issuer)}
            </span>
            <span class="cert-date">${escapeHtml(cert.date)}</span>
          </div>
          <h3 class="card-title">${escapeHtml(cert.title)}</h3>
          <div class="cert-actions-grid">
            <a href="${escapeHtml(cert.pdf)}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="btn btn-primary btn-sm"
               title="Buka dokumen PDF di tab baru">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Lihat Sertifikat</span>
            </a>
            <a href="${escapeHtml(cert.pdf)}" 
               download="${escapeHtml(pdfFilename)}" 
               class="btn btn-outline btn-sm"
               title="Unduh file PDF">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download PDF</span>
            </a>
            ${credButtonHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Fallback jika gambar preview sertifikat gagal dimuat
 */
function handleCertImageError(imgElement, certIndex) {
  imgElement.onerror = null;
  // Ganti container dengan fallback elegan kartu PDF
  const parent = imgElement.closest('.card-media-wrapper');
  if (parent) {
    parent.className = 'cert-pdf-fallback';
    parent.onclick = () => openCertLightbox(certIndex);
    parent.innerHTML = `
      <div class="cert-pdf-icon">📄</div>
      <span class="cert-pdf-fallback-text">Dokumen PDF Resmi</span>
    `;
  }
}

/* ==============================================================================
   3. MODAL LIGHTBOX GLOBAL (Proyek & Sertifikat)
   ============================================================================== */
let lightboxModal = null;
let lightboxImg = null;
let lightboxTitle = null;
let lightboxDesc = null;
let lightboxBadges = null;
let lightboxActions = null;

function initLightbox() {
  lightboxModal = document.getElementById('global-lightbox');
  if (!lightboxModal) return;

  lightboxImg = document.getElementById('lightbox-img');
  lightboxTitle = document.getElementById('lightbox-title');
  lightboxDesc = document.getElementById('lightbox-desc');
  lightboxBadges = document.getElementById('lightbox-badges');
  lightboxActions = document.getElementById('lightbox-actions');

  const closeBtn = document.getElementById('lightbox-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Klik di latar belakang luar untuk menutup
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Tutup dengan tombol Escape di keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function openProjectLightbox(index) {
  if (typeof projects === 'undefined' || !projects[index]) return;
  const p = projects[index];

  const imgSrc = p.image && p.image.trim() !== '' 
    ? p.image 
    : 'assets/images/projects/placeholder-project.svg';

  lightboxImg.src = imgSrc;
  lightboxImg.alt = p.title;
  lightboxTitle.textContent = p.title;
  lightboxDesc.textContent = p.description;

  // Badges
  const techHtml = Array.isArray(p.tech) 
    ? p.tech.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('') 
    : '';
  lightboxBadges.innerHTML = `
    <span class="section-tag">${escapeHtml(p.category || 'Proyek')}</span>
    ${techHtml}
  `;

  // Action buttons
  let actionHtml = '';
  if (p.demoLink && p.demoLink.trim() !== '') {
    actionHtml += `
      <a href="${escapeHtml(p.demoLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <span>Buka Live Demo</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    `;
  }
  if (p.sourceLink && p.sourceLink.trim() !== '') {
    actionHtml += `
      <a href="${escapeHtml(p.sourceLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
        <span>Lihat Source Code</span>
      </a>
    `;
  }
  lightboxActions.innerHTML = actionHtml;

  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openCertLightbox(index) {
  if (typeof certificates === 'undefined' || !certificates[index]) return;
  const c = certificates[index];

  const imgSrc = c.image && c.image.trim() !== '' 
    ? c.image 
    : 'assets/images/certificates/placeholder-cert.svg';

  lightboxImg.src = imgSrc;
  lightboxImg.alt = c.title;
  lightboxTitle.textContent = c.title;
  lightboxDesc.textContent = `Diterbitkan oleh ${c.issuer} pada ${c.date}. Klik tombol di bawah untuk melihat dokumen PDF resmi atau memverifikasi keabsahan kredensial.`;

  lightboxBadges.innerHTML = `
    <span class="cert-issuer">★ ${escapeHtml(c.issuer)}</span>
    <span class="cert-date">${escapeHtml(c.date)}</span>
  `;

  let actionHtml = `
    <a href="${escapeHtml(c.pdf)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
      <span>Lihat Dokumen PDF Lengkap</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
  `;

  if (c.credentialLink && c.credentialLink.trim() !== '') {
    actionHtml += `
      <a href="${escapeHtml(c.credentialLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-emerald">
        <span>Verifikasi Kredensial Resmi</span>
      </a>
    `;
  }
  lightboxActions.innerHTML = actionHtml;

  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==============================================================================
   4. TEMA GELAP / TERANG (DARK / LIGHT MODE TOGGLE)
   ============================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    toggleBtn.textContent = isLight ? '🌙' : '☀️';
  });
}

/* ==============================================================================
   5. NAVIGASI MOBILE (HAMBURGER MENU)
   ============================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Tutup menu saat salah satu link diklik
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ==============================================================================
   5b. SCROLL SPY (menu navbar menyala sesuai section yang sedang dilihat)
   ============================================================================== */
function initScrollSpy() {
  if (!('IntersectionObserver' in window)) return;

  const links = document.querySelectorAll('.nav-link');
  const sections = [...links]
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ==============================================================================
   6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ============================================================================== */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

  // Amati elemen yang baru dibuat secara dinamis
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.classList && node.classList.contains('reveal-on-scroll')) {
            observer.observe(node);
          }
          node.querySelectorAll && node.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        }
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

/* ==============================================================================
   UTILITAS PENCEGAH XSS (Sanitasi String)
   ============================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}