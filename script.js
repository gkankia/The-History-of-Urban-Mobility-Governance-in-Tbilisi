console.log(events); // Check if the data loaded correctly

const categoryColors = {
  Policy: "#2980b9",
  Infrastructure: "#27ae60",
  Technology: "#e67e22",
  Governance: "#8e44ad"
};

let currentIndex = 0;
let currentFilteredEvents = events;

const container = document.getElementById("timeline");
const scrollArea = document.querySelector(".timeline-scroll-wrapper");
const fixedEventBox = document.getElementById("fixedEventBox");

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

  // ✅ NEW: Calculate dynamically to fit 1 year per screen width
  const pixelsPerDay = window.innerWidth / 440;

  const timelineWidth = Math.max(window.innerWidth, totalDays * pixelsPerDay + 400);
  container.style.width = timelineWidth + "px";
  container.style.position = "relative";

  // Add event points
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

  // ✅ Scroll to the first event or the start date
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

  // Remove all highlight/dimmed states first
  wrappers.forEach((w, i) => {
    if (i === index) {
      w.classList.add("highlight");
      w.classList.remove("dimmed");
      w.style.zIndex = 10; // bring to top
    } else {
      w.classList.remove("highlight");
      w.classList.add("dimmed");
      w.style.zIndex = 1; // send backward
    }
  });

  // Center selected
  const containerWidth = scrollArea.clientWidth;
  const targetCenter = selected.offsetLeft + selected.offsetWidth / 2;
  let scrollTo = targetCenter - containerWidth / 2;
  scrollTo = Math.max(0, Math.min(scrollTo, scrollArea.scrollWidth - containerWidth));

  scrollArea.scrollTo({ left: scrollTo, behavior: "smooth" });

  showEvent(currentFilteredEvents[index]);
}

function showEvent(event) {
  const targetDate = event.date;
  const sameDateEvents = currentFilteredEvents.filter(e => e.date === targetDate);

  fixedEventBox.innerHTML = ""; // Clear previous content

  const wrapper = document.createElement("div");
  wrapper.classList.add("event-group");

  // ✅ Apply 'single-event' class to the event group, not the fixed container
  if (sameDateEvents.length === 1) {
    wrapper.classList.add("single-event");
  }

  sameDateEvents.forEach(ev => {
    const card = document.createElement("div");
    card.className = "event-card";
  
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
  
    const dateFormatted = new Date(ev.date).toLocaleDateString("ka-GE");
  
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
  
    contentDiv.innerHTML = `
      <h3>${ev.title}</h3>
      <p><strong>${dateFormatted}</strong></p>
      <p class="event-description">${ev.description}</p>
      ${sourcesHtml ? `<p class="event-source">წყარო: ${sourcesHtml}</p>` : ""}
    `;
  
    if (!hasMedia && sameDateEvents.length === 1) {
      card.classList.add("centered-text");
    }
  
    card.innerHTML = mediaHTML;
    card.appendChild(contentDiv);
  
    // 🔹 Add charts if present
    if (ev.charts && Array.isArray(ev.charts)) {
      ev.charts.forEach((chartObj, chartIndex) => {
        const chartContainer = document.createElement("div");
        chartContainer.className = "chart-container";
  
        // Add chart title above the canvas
        const chartTitle = document.createElement("h4");
        chartTitle.textContent = chartObj.chart_title;
        chartContainer.appendChild(chartTitle);
  
        // Add canvas element
        const canvas = document.createElement("canvas");
        canvas.id = `chart-${ev.date}-${chartIndex}`;
        chartContainer.appendChild(canvas);
  
        card.appendChild(chartContainer);
  
        // Delay rendering until canvas is attached
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
                      family: "'IBM Plex Mono', monospace" // or just "monospace"
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

  fixedEventBox.appendChild(wrapper); // ✅ Append the correct wrapper with the right class
}

function renderTicks(startDate, endDate, pixelsPerDay) {
  const ticksContainer = document.createElement("div");
  ticksContainer.className = "timeline-tick";
  ticksContainer.style.position = "absolute";
  ticksContainer.style.top = "0";
  ticksContainer.style.left = "0";
  ticksContainer.style.height = "100%";
  ticksContainer.style.width = container.scrollWidth + "px"; // Full width
  ticksContainer.style.pointerEvents = "none";
  container.appendChild(ticksContainer);

  // 🗓️ Big year ticks at Jan 1st
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

  // 🌟 Special ticks to be labeled
  const specialTicks = {
    "": { label: "rose revolution", color: "#3498db" },
    "": { label: "არჩევნები", color: "#f39c12" }
  };

  // 🔸 Monthly ticks (some are labeled if special)
  let current = new Date(startDate);
  current.setDate(1);

  while (current <= endDate) {
    const daysSinceStart = (current - startDate) / (1000 * 60 * 60 * 24);
    const left = daysSinceStart * pixelsPerDay;

    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;    const isSpecial = specialTicks[key];

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

  // 🔹 Minor ticks every 7 days — no labels
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

  // 🔸 Tiny daily ticks (even smaller than minor ticks)
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
    dailyCurrent.setDate(dailyCurrent.getDate() + 1); // every day
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

// Trigger filter immediately on dropdown change
document.getElementById("yearFilter").addEventListener("change", applyFilters);

// Add hover preview for left arrow
document.getElementById("left-scroll").addEventListener("click", () => {
  const prevIndex = findNextUniqueDateIndex(currentIndex, -1);
  if (prevIndex !== currentIndex) {
    currentIndex = prevIndex;
    highlightAndCenter(currentIndex);
  }
});

document.getElementById("right-scroll").addEventListener("click", () => {
  const nextIndex = findNextUniqueDateIndex(currentIndex, +1);
  if (nextIndex !== currentIndex) {
    currentIndex = nextIndex;
    highlightAndCenter(currentIndex);
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

// Navigation utility
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

// About modal toggle
const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");

aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "block";
});

closeAbout.addEventListener("click", () => {
  aboutModal.style.display = "none";
});

// Optional: Close when clicking outside the modal
window.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.style.display = "none";
  }
});

// Optional: keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    const nextIndex = findNextUniqueDateIndex(currentIndex, +1);
    if (nextIndex !== currentIndex) {
      currentIndex = nextIndex;
      highlightAndCenter(currentIndex);
    }
  } else if (e.key === "ArrowLeft") {
    const prevIndex = findNextUniqueDateIndex(currentIndex, -1);
    if (prevIndex !== currentIndex) {
      currentIndex = prevIndex;
      highlightAndCenter(currentIndex);
    }
  }
});

window.addEventListener("load", () => renderTimeline(events));
