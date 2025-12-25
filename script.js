console.log(events);

const categoryColors = {
  news: "#fb9a99",
  article: "#cab2d6",
  event: "#a6cee3"
};

const categoryLabelsGeo = {
  news: "ახალი ამბავი",
  article: "სტატია",
  event: "მოვლენა"
};

let currentIndex = 0;
let currentFilteredEvents = events;

const container = document.getElementById("timeline");
const scrollArea = document.querySelector(".timeline-scroll-wrapper");
const fixedEventBox = document.getElementById("fixedEventBox");

// Check for URL path or hash on page load and navigate to that event
window.addEventListener('load', () => {
  let eventSlug = null;
  
  // Check if we're on an event page path like /event/event-2004-01-01/
  const pathMatch = window.location.pathname.match(/\/event\/([^\/]+)/);
  if (pathMatch) {
    eventSlug = pathMatch[1];
  }
  // Fallback to hash format for backwards compatibility
  else if (window.location.hash) {
    eventSlug = window.location.hash.substring(1);
  }
  
  if (eventSlug) {
    const eventIndex = events.findIndex(e => e.slug === eventSlug);
    if (eventIndex !== -1) {
      currentIndex = eventIndex;
    }
  }
  renderTimeline(events);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.eventSlug) {
    const eventIndex = events.findIndex(ev => ev.slug === e.state.eventSlug);
    if (eventIndex !== -1) {
      currentIndex = eventIndex;
      highlightAndCenter(currentIndex);
    }
  } else {
    // If no state, check the URL
    const pathMatch = window.location.pathname.match(/\/event\/([^\/]+)/);
    if (pathMatch) {
      const eventIndex = events.findIndex(ev => ev.slug === pathMatch[1]);
      if (eventIndex !== -1) {
        currentIndex = eventIndex;
        highlightAndCenter(currentIndex);
      }
    }
  }
});

function renderTimeline(filteredEvents) {
  currentFilteredEvents = filteredEvents;
  container.innerHTML = `
    <div class="timeline-line"></div>
    <div class="timeline-buffer left"></div>
    <div class="timeline-buffer right"></div>
  `;

  if (filteredEvents.length === 0) {
    fixedEventBox.style.display = "none";
    return;
  }

  const startDate = new Date("2003-12-01");
  const dates = filteredEvents.map(e => new Date(e.date));
  const endDate = new Date(Math.max(...dates));
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

  const pixelsPerDay = window.innerWidth / 440;
  const timelineWidth = Math.max(window.innerWidth, totalDays * pixelsPerDay + 400);
  container.style.width = timelineWidth + "px";
  container.style.position = "relative";

  filteredEvents.forEach((event, i) => {
    const eventDate = new Date(event.date);
    const daysSinceStart = (eventDate - startDate) / (1000 * 60 * 60 * 24);
    const left = daysSinceStart * pixelsPerDay;

    const wrapper = document.createElement("div");
    wrapper.classList.add("timeline-wrapper");
    wrapper.dataset.index = i;
    wrapper.style.position = "absolute";
    wrapper.style.left = `${left}px`;
    wrapper.style.transform = "translateX(-50%)";

    const point = document.createElement("div");
    point.className = "timeline-point";

    point.addEventListener("click", () => {
      currentIndex = i;
      highlightAndCenter(i);
      updateURL(event);
    });

    const georgianMonths = [
      "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
      "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"
    ];
    const georgianDate = `${eventDate.getDate()} ${georgianMonths[eventDate.getMonth()]}`;
    
    const label = document.createElement("div");
    label.className = "timeline-label";
    label.innerHTML = `
      <div class="timeline-title">${event.title}</div>
      <div class="timeline-date">${georgianDate}</div>
    `;

    wrapper.appendChild(point);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });

  requestAnimationFrame(() => {
    highlightAndCenter(currentIndex);
    const timelineLine = container.querySelector(".timeline-line");
    if (timelineLine) {
      timelineLine.style.width = container.scrollWidth + "px";
    }
    renderTicks(startDate, endDate, pixelsPerDay);
  });
}

function highlightAndCenter(index) {
  const wrappers = document.querySelectorAll(".timeline-wrapper");
  const selected = wrappers[index];
  if (!selected) return;

  wrappers.forEach((w, i) => {
    if (i === index) {
      w.classList.add("highlight");
      w.classList.remove("dimmed");
      w.style.zIndex = 10;
    } else {
      w.classList.remove("highlight");
      w.classList.add("dimmed");
      w.style.zIndex = 1;
    }
  });

  const containerWidth = scrollArea.clientWidth;
  const targetCenter = selected.offsetLeft + selected.offsetWidth / 2;
  let scrollTo = targetCenter - containerWidth / 2;
  scrollTo = Math.max(0, Math.min(scrollTo, scrollArea.scrollWidth - containerWidth));

  scrollArea.scrollTo({ left: scrollTo, behavior: "smooth" });

  showEvent(currentFilteredEvents[index]);
}

function updateURL(event) {
  const newURL = `/event/${event.slug}/`;
  window.history.pushState({ eventSlug: event.slug }, '', newURL);
  updateMetaTags(event);
}

function updateMetaTags(event) {
  const eventURL = `${window.location.origin}${window.location.pathname}#${event.slug}`;
  const description = stripHTML(event.description).substring(0, 200) + '...';
  const imageURL = event.image || 'https://raw.githubusercontent.com/gkankia/The-History-of-Urban-Mobility-Governance-in-Tbilisi/refs/heads/main/img/%E1%83%99%E1%83%95%E1%83%98%E1%83%A0%E1%83%98%E1%83%A1%20%E1%83%9E%E1%83%90%E1%83%9A%E1%83%98%E1%83%A2%E1%83%A0%E1%83%90%20-3%202004.png';

  // Update Open Graph tags
  setMetaTag('og:title', event.title);
  setMetaTag('og:description', description);
  setMetaTag('og:image', imageURL);
  setMetaTag('og:url', eventURL);

  // Update Twitter Card tags
  setMetaTag('twitter:title', event.title);
  setMetaTag('twitter:description', description);
  setMetaTag('twitter:image', imageURL);

  // Update page title
  document.title = `${event.title} | პოსტრევოლუციური მმართველობა`;
  
  // Update canonical URL
  document.getElementById('og-url')?.setAttribute('content', eventURL);
}

function setMetaTag(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.querySelector(`meta[name="${property}"]`);
  }
  
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    if (property.startsWith('og:')) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

function stripHTML(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function showEvent(event) {
  const targetDate = event.date;
  const sameDateEvents = currentFilteredEvents.filter(e => e.date === targetDate);

  fixedEventBox.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("event-group");

  if (sameDateEvents.length === 1) {
    wrapper.classList.add("single-event");
  }

  sameDateEvents.forEach(ev => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.style.position = "relative";
  
    const hasMedia = ev.image || ev.video;
  
    const mediaHTML = hasMedia
      ? `
        <div class="event-image-container">
          ${ev.video 
            ? `<div class="event-video-wrapper">
                 <iframe class="event-video" src="${ev.video}" frameborder="0" allowfullscreen></iframe>
               </div>`
            : `<img src="${ev.image}" alt="${ev.title}" class="event-image" />`}
        </div>
      `
      : "";
  
    const contentDiv = document.createElement("div");
    contentDiv.className = "event-content";
    contentDiv.style.position = 'relative';
    
    const scrollWrapper = document.createElement("div");
    scrollWrapper.className = "event-content-scroll";
    scrollWrapper.style.cssText = `
      height: 100%;
      overflow-y: auto;
      padding: 1rem;
    `;
  
    const dateFormatted = new Date(ev.date).toLocaleDateString("ka-GE");
    
    let categoryBadge = "";
    if (ev.category) {
      const categoryLabel = categoryLabelsGeo[ev.category] || ev.category;
      const categoryColor = categoryColors[ev.category] || "#888";
      categoryBadge = `<span class="category-label" style="background-color: ${categoryColor};">${categoryLabel}</span>`;
    }
  
    let sourcesHtml = "";
    if (ev.source) {
      if (Array.isArray(ev.source)) {
        sourcesHtml = ev.source.map(src =>
          src.url
            ? `<a href="${src.url}" target="_blank">${src.name}</a>`
            : src.name
        ).join(", ");
      } else {
        sourcesHtml = ev.source.url
          ? `<a href="${ev.source.url}" target="_blank">${ev.source.name}</a>`
          : ev.source.name;
      }
    }
  
    scrollWrapper.innerHTML = `
      <h3>${ev.title}</h3>
      <p>
        <strong>${dateFormatted}</strong>
        ${categoryBadge}
      </p>
      <p class="event-description">${ev.description}</p>
      ${sourcesHtml ? `<p class="event-source">წყარო: ${sourcesHtml}</p>` : ""}
    `;
    
    contentDiv.appendChild(scrollWrapper);
    
    const fadeOverlay = document.createElement('div');
    fadeOverlay.className = 'scroll-fade-overlay';
    fadeOverlay.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10;
    `;
    contentDiv.appendChild(fadeOverlay);
  
    if (!hasMedia && sameDateEvents.length === 1) {
      card.classList.add("centered-text");
    }
  
    card.innerHTML = mediaHTML;
    card.appendChild(contentDiv);
    
    // Add share button
    const shareWrapper = document.createElement("div");
    shareWrapper.className = "share-wrapper";
    
    shareWrapper.innerHTML = `
      <button class="share-button" aria-label="გაზიარება">გაზიარება</button>
      <div class="share-menu">
        <button data-action="copy">🔗 ბმული</button>
        <button data-action="facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="16" height="16"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12v-9.294H9.294V11.06H12V8.412c0-2.708 1.645-4.182 4.045-4.182 1.153 0 2.142.086 2.428.124v2.816h-1.666c-1.306 0-1.557.621-1.557 1.531v2.01h3.115l-.406 3.647H15.25V24h7.425c.73 0 1.325-.594 1.325-1.324V1.325C24 .593 23.406 0 22.675 0z"/></svg> Facebook</button>
        <button data-action="linkedin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0077B5" width="16" height="16"><path d="M22.225 0H1.771C.792 0 0 .77 0 1.719v20.563C0 23.23.792 24 1.771 24H22.23c.978 0 1.77-.77 1.77-1.719V1.719C24 .77 23.208 0 22.225 0zM7.08 20.452H3.542V9H7.08v11.452zM5.31 7.557c-1.136 0-2.057-.922-2.057-2.058 0-1.136.92-2.058 2.057-2.058s2.058.922 2.058 2.058c0 1.136-.922 2.058-2.058 2.058zm15.141 12.895h-3.537v-5.518c0-1.314-.027-3.004-1.831-3.004-1.833 0-2.115 1.434-2.115 2.915v5.607h-3.537V9h3.395v1.561h.049c.473-.896 1.631-1.84 3.358-1.84 3.592 0 4.253 2.366 4.253 5.444v6.287z"/></svg> LinkedIn</button>
      </div>
    `;
    
    card.appendChild(shareWrapper);

    const shareButton = shareWrapper.querySelector(".share-button");
    const shareMenu = shareWrapper.querySelector(".share-menu");

    shareButton.addEventListener("click", (e) => {
      e.stopPropagation();
      shareMenu.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      shareMenu.classList.remove("open");
    });

    shareMenu.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        handleShareAction(ev, btn.dataset.action);
        shareMenu.classList.remove("open");
      });
    });

    function handleShareAction(event, action) {
      // All sharing now uses the same clean URL
      const shareUrl = `https://mobilitytrajectories.netlify.app/event/${event.slug}/`;
      const title = event.title;
      const text = stripHTML(event.description).substring(0, 200) + "…";
    
      if (action === "copy") {
        navigator.clipboard.writeText(shareUrl);
        showToast("ბმული დაკოპირებულია");
      }
    
      if (action === "facebook") {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "width=600,height=400"
        );
      }
    
      if (action === "linkedin") {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "width=600,height=400"
        );
      }
    }

    function showToast(message) {
      const toast = document.createElement("div");
      toast.className = "share-toast";
      toast.textContent = message;
      document.body.appendChild(toast);
    
      toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.85);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'IBM Plex Mono', monospace;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
    
      requestAnimationFrame(() => toast.style.opacity = 1);
    
      setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => toast.remove(), 300);
      }, 2000);
    }
  
    if (ev.charts && Array.isArray(ev.charts)) {
      ev.charts.forEach((chartObj, chartIndex) => {
        const chartContainer = document.createElement("div");
        chartContainer.className = "chart-container";
  
        const chartTitle = document.createElement("h4");
        chartTitle.textContent = chartObj.chart_title;
        chartContainer.appendChild(chartTitle);
  
        const canvas = document.createElement("canvas");
        canvas.id = `chart-${ev.date}-${chartIndex}`;
        chartContainer.appendChild(canvas);
  
        card.appendChild(chartContainer);
  
        requestAnimationFrame(() => {
          const ctx = canvas.getContext("2d");
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: chartObj.labels,
              datasets: [{
                label: chartObj.label || "მონაცემები",
                data: chartObj.data,
                backgroundColor: chartObj.colors || ["#3498db", "#e74c3c", "#2ecc71"]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
              },
              scales: {
                x: {
                  ticks: {
                    display: true,
                    color: "#000",
                    font: {
                      size: 12,
                      family: "'IBM Plex Mono', monospace"
                    }
                  },
                  grid: {
                    display: false,
                    drawBorder: false
                  }
                },
                y: {
                  ticks: { stepSize: 10, max: 100 },
                  grid: {
                    display: false,
                    drawBorder: false
                  }
                }
              }
            }
          });
        });
      });
    }
  
    wrapper.appendChild(card);
  });

  fixedEventBox.appendChild(wrapper);
  
  requestAnimationFrame(() => {
    updateScrollIndicators();
    
    document.querySelectorAll('.event-content-scroll').forEach(scroll => {
      scroll.addEventListener('scroll', updateScrollIndicators);
    });
  });
  
  // Update meta tags for sharing
  updateMetaTags(event);
}

function updateScrollIndicators() {
  document.querySelectorAll('.event-content').forEach((content) => {
    const scrollWrapper = content.querySelector('.event-content-scroll');
    const fadeOverlay = content.querySelector('.scroll-fade-overlay');
    
    if (!fadeOverlay || !scrollWrapper) return;
    
    const hasScroll = scrollWrapper.scrollHeight > scrollWrapper.clientHeight;
    const isAtBottom = scrollWrapper.scrollHeight - scrollWrapper.scrollTop <= scrollWrapper.clientHeight + 5;
    
    if (hasScroll && !isAtBottom) {
      fadeOverlay.style.opacity = '1';
    } else {
      fadeOverlay.style.opacity = '0';
    }
  });
}

function renderTicks(startDate, endDate, pixelsPerDay) {
  const ticksContainer = document.createElement("div");
  ticksContainer.className = "timeline-tick";
  ticksContainer.style.position = "absolute";
  ticksContainer.style.top = "0";
  ticksContainer.style.left = "0";
  ticksContainer.style.height = "100%";
  ticksContainer.style.width = container.scrollWidth + "px";
  ticksContainer.style.pointerEvents = "none";
  container.appendChild(ticksContainer);

  let yearStart = new Date(startDate.getFullYear(), 0, 1);
  while (yearStart <= endDate) {
    const daysSinceStart = (yearStart - startDate) / (1000 * 60 * 60 * 24);
    const left = daysSinceStart * pixelsPerDay;

    const tick = document.createElement("div");
    tick.className = "year-tick";
    tick.style.position = "absolute";
    tick.style.left = `${left}px`;
    tick.style.top = "0";
    tick.style.width = "2px";
    tick.style.height = "100%";
    tick.style.backgroundColor = "rgba(0, 0, 0, 1)";
    tick.style.zIndex = 0;

    const label = document.createElement("div");
    label.className = "year-label";
    label.innerText = yearStart.getFullYear();
    tick.appendChild(label);

    ticksContainer.appendChild(tick);
    yearStart.setFullYear(yearStart.getFullYear() + 1);
  }

  const specialTicks = {
    "": { label: "rose revolution", color: "#3498db" },
    "": { label: "არჩევნები", color: "#f39c12" }
  };

  let current = new Date(startDate);
  current.setDate(1);

  while (current <= endDate) {
    const daysSinceStart = (current - startDate) / (1000 * 60 * 60 * 24);
    const left = daysSinceStart * pixelsPerDay;

    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;
    const isSpecial = specialTicks[key];

    const tick = document.createElement("div");
    tick.className = "timeline-tick";
    tick.style.left = `${left}px`;
    tick.style.position = "absolute";
    tick.style.top = "50%";
    tick.style.width = "1px";
    tick.style.height = "10px";
    tick.style.transform = "translateY(-50%)";
    tick.style.backgroundColor = isSpecial ? isSpecial.color : "rgba(0, 0, 0, 0.3)";
    tick.style.zIndex = 0;

    if (isSpecial) {
      const label = document.createElement("div");
      label.className = "tick-label";
      label.innerHTML = `
        <div style="font-weight: bold;">${isSpecial.label}</div>
        <div>${current.toLocaleDateString("ka-GE", {
          day: "2-digit", month: "short", year: "numeric"
        })}</div>
      `;
      label.style.position = "absolute";
      label.style.top = "130%";
      label.style.left = "50%";
      label.style.transform = "translateX(-50%)";
      label.style.fontSize = "0.7rem";
      label.style.whiteSpace = "nowrap";
      label.style.color = isSpecial.color;
      label.style.textAlign = "center";
    
      tick.appendChild(label);
    }

    ticksContainer.appendChild(tick);
    current.setMonth(current.getMonth() + 1);
  }

  let minorCurrent = new Date(startDate);
  while (minorCurrent <= endDate) {
    const daysSinceStart = (minorCurrent - startDate) / (1000 * 60 * 60 * 24);
    const left = daysSinceStart * pixelsPerDay;

    const tick = document.createElement("div");
    tick.className = "timeline-minor-tick";
    tick.style.left = `${left}px`;
    tick.style.position = "absolute";
    tick.style.top = "50%";
    tick.style.height = "6px";
    tick.style.transform = "translateY(-50%)";
    tick.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    tick.style.zIndex = 0;

    ticksContainer.appendChild(tick);
    minorCurrent.setDate(minorCurrent.getDate() + 7);
  }

  let dailyCurrent = new Date(startDate);
  while (dailyCurrent <= endDate) {
    const daysSinceStart = (dailyCurrent - startDate) / (1000 * 60 * 60 * 24);
    const left = daysSinceStart * pixelsPerDay;

    const tick = document.createElement("div");
    tick.className = "timeline-daily-tick";
    tick.style.left = `${left}px`;
    tick.style.position = "absolute";
    tick.style.top = "50%";
    tick.style.transform = "translateY(-50%)";
    tick.style.zIndex = 0;

    ticksContainer.appendChild(tick);
    dailyCurrent.setDate(dailyCurrent.getDate() + 1);
  }
}

function applyFilters() {
  const selectedYear = document.getElementById("yearFilter").value;

  const filtered = events.filter(event => {
    const year = new Date(event.date).getFullYear().toString();
    return selectedYear === "All" || year === selectedYear;
  });

  currentIndex = 0;
  renderTimeline(filtered);
}

document.getElementById("yearFilter").addEventListener("change", applyFilters);

document.getElementById("left-scroll").addEventListener("click", () => {
  const prevIndex = findNextUniqueDateIndex(currentIndex, -1);
  if (prevIndex !== currentIndex) {
    currentIndex = prevIndex;
    highlightAndCenter(currentIndex);
    updateURL(currentFilteredEvents[currentIndex]);
  }
});

document.getElementById("right-scroll").addEventListener("click", () => {
  const nextIndex = findNextUniqueDateIndex(currentIndex, +1);
  if (nextIndex !== currentIndex) {
    currentIndex = nextIndex;
    highlightAndCenter(currentIndex);
    updateURL(currentFilteredEvents[currentIndex]);
  }
});

document.getElementById("left-scroll").addEventListener("mouseenter", () => {
  const prevIndex = findNextUniqueDateIndex(currentIndex, -1);
  const preview = document.getElementById("left-preview");
  if (prevIndex !== currentIndex) {
    preview.textContent = currentFilteredEvents[prevIndex].title;
    preview.style.display = "block";
  }
});

document.getElementById("left-scroll").addEventListener("mouseleave", () => {
  document.getElementById("left-preview").style.display = "none";
});

document.getElementById("right-scroll").addEventListener("mouseenter", () => {
  const nextIndex = findNextUniqueDateIndex(currentIndex, +1);
  const preview = document.getElementById("right-preview");
  if (nextIndex !== currentIndex) {
    preview.textContent = currentFilteredEvents[nextIndex].title;
    preview.style.display = "block";
  }
});

document.getElementById("right-scroll").addEventListener("mouseleave", () => {
  document.getElementById("right-preview").style.display = "none";
});

function findNextUniqueDateIndex(startIndex, direction) {
  const currentDate = currentFilteredEvents[startIndex].date;
  let i = startIndex + direction;

  while (
    i >= 0 &&
    i < currentFilteredEvents.length &&
    currentFilteredEvents[i].date === currentDate
  ) {
    i += direction;
  }

  return (i >= 0 && i < currentFilteredEvents.length) ? i : startIndex;
}

const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");

aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "block";
});

closeAbout.addEventListener("click", () => {
  aboutModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    const nextIndex = findNextUniqueDateIndex(currentIndex, +1);
    if (nextIndex !== currentIndex) {
      currentIndex = nextIndex;
      highlightAndCenter(currentIndex);
      updateURL(currentFilteredEvents[currentIndex]);
    }
  } else if (e.key === "ArrowLeft") {
    const prevIndex = findNextUniqueDateIndex(currentIndex, -1);
    if (prevIndex !== currentIndex) {
      currentIndex = prevIndex;
      highlightAndCenter(currentIndex);
      updateURL(currentFilteredEvents[currentIndex]);
    }
  }
});

window.addEventListener('resize', updateScrollIndicators);