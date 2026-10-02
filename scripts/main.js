/**
 * SINGH AKASH AND ASSOCIATES — CHARTERED ACCOUNTANTS
 * Comprehensive Controller & Interactive Practice Showcase
 */

(function () {
  "use strict";

  // Elements
  const needAssistanceBtn = document.getElementById("needAssistanceBtn");
  const assistanceModal = document.getElementById("assistanceModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const toastAlert = document.getElementById("toastAlert");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");
  const filterTabBtns = document.querySelectorAll(".filter-tab-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  /* 1. Toast Notification Utility */
  let toastTimer = null;
  function showToast(message) {
    if (!toastAlert) return;
    toastAlert.textContent = message;
    toastAlert.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastAlert.classList.remove("show");
    }, 4000);
  }

  /* 2. Interactive Service Category Filtering */
  if (filterTabBtns && filterTabBtns.length > 0) {
    filterTabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterTabBtns.forEach(function (b) { b.classList.remove("active"); });
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        if (serviceCards && serviceCards.length > 0) {
          serviceCards.forEach(function (card) {
            const cardCat = card.getAttribute("data-category");
            if (filterValue === "all" || cardCat === filterValue) {
              card.style.display = "flex";
              card.style.opacity = "1";
            } else {
              card.style.display = "none";
              card.style.opacity = "0";
            }
          });
        }
      });
    });
  }

  /* 3. Pre-fill Service from Service Card or Directory Click */
  window.prefillService = function (serviceName) {
    const select = document.getElementById("consultService");
    const consultSection = document.getElementById("consultation-form");
    if (!select) return;

    let matched = false;
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === serviceName || select.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
        select.selectedIndex = i;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Create option if custom specific sub-service
      const newOpt = document.createElement("option");
      newOpt.value = serviceName;
      newOpt.text = serviceName;
      select.add(newOpt);
      select.value = serviceName;
    }

    // Highlight select input
    select.style.borderColor = "#004EBB";
    select.style.boxShadow = "0 0 0 3px rgba(0, 78, 187, 0.25)";
    setTimeout(function () {
      select.style.borderColor = "";
      select.style.boxShadow = "";
    }, 2000);

    if (consultSection) {
      consultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* 4. Filter and Prefill from Mega Menu or Directory */
  window.filterAndPrefill = function (category, serviceName) {
    // If category filter button exists, toggle it
    if (category) {
      const targetBtn = document.querySelector(`.filter-tab-btn[data-filter="${category}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }
    window.prefillService(serviceName);
  };

  /* 5. "Need Assistance?" Slide-Up Modal */
  if (needAssistanceBtn && assistanceModal) {
    needAssistanceBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      assistanceModal.classList.toggle("open");
    });
  }

  if (modalCloseBtn && assistanceModal) {
    modalCloseBtn.addEventListener("click", function () {
      assistanceModal.classList.remove("open");
    });
  }

  document.addEventListener("click", function (e) {
    if (
      assistanceModal &&
      assistanceModal.classList.contains("open") &&
      !assistanceModal.contains(e.target) &&
      e.target !== needAssistanceBtn &&
      !needAssistanceBtn.contains(e.target)
    ) {
      assistanceModal.classList.remove("open");
    }
  });

  /* 6. Consultation Form Submissions */
  window.handleConsultationSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("consultName").value.trim();
    const phone = document.getElementById("consultPhone").value.trim();
    const service = document.getElementById("consultService").value;

    if (!name || !phone) return;

    showToast(`Thank you, ${name}. Your consultation request for ${service || "CA Services"} has been received. Akash Singh will contact you shortly.`);
    document.getElementById("freeConsultationForm").reset();
  };

  window.handleAssistanceSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("assistName").value.trim();
    const phone = document.getElementById("assistPhone").value.trim();

    if (!name || !phone) return;

    showToast(`Thank you, ${name}. Your message has been sent to Singh Akash and Associates.`);
    if (assistanceModal) assistanceModal.classList.remove("open");
    e.target.reset();
  };

  /* 7. Mobile Menu Toggle */
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains("mobile-open");
      if (isOpen) {
        navLinks.classList.remove("mobile-open");
        navLinks.style.display = "none";
      } else {
        navLinks.classList.add("mobile-open");
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "82px";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.background = "#ffffff";
        navLinks.style.padding = "24px 20px";
        navLinks.style.boxShadow = "0 14px 30px rgba(0,0,0,0.12)";
        navLinks.style.zIndex = "1005";
      }
    });

    // Close mobile nav on anchor click
    const mobileAnchors = navLinks.querySelectorAll("a");
    mobileAnchors.forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 991) {
          navLinks.classList.remove("mobile-open");
          navLinks.style.display = "none";
        }
      });
    });
  }

})();
