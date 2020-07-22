window.addEventListener("load", function () {
  const groups = {};

  // init choice from URL
  const urlSearchParams = new URLSearchParams(window.location.search);
  const selectedTab = urlSearchParams.get("choice");

  // synchronize all tabs in the page when selecting a tab
  document.querySelectorAll(".tabs .nav-tabs").forEach(function (tabs) {
    const navLinks = tabs.querySelectorAll(".nav-link");
    navLinks.forEach(function (navLink) {
      // apply selected tab
      if (selectedTab === navLink.textContent) {
        setTimeout(function () {
          navLink.click();
        });
      }

      // set group of nav-links
      const group = navLink.dataset.group;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(navLink);

      function synchronizeTabs() {
        setTimeout(function () {
          const activeTab = tabs.querySelector(".nav-link.active");

          // update url
          urlSearchParams.set("choice", activeTab.textContent);
          const newUrl = window.location.pathname + "?" + urlSearchParams.toString() + window.location.hash;
          const currentUrl = window.location.href.replace(window.location.origin, "");
          if (newUrl !== currentUrl) {
            history.pushState(null, "", newUrl);
          }

          // sync tabs
          const currentGroup = activeTab.dataset.group;
          Object.keys(groups).forEach(function (group) {
            if (currentGroup === group) {
              return;
            }
            groups[group].forEach(function (navLink) {
              if (navLink.textContent === activeTab.textContent && !Object.values(navLink.classList).includes("active")) {
                navLink.click();
              }
            });
          });
        });
      }
      navLink.onclick = synchronizeTabs;
    });
  });
});
