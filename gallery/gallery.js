// woozi-design-kit — 정적 갤러리 스크립트
//
// 의도적으로 fetch()를 쓰지 않는다: file:// 프로토콜로 이 파일을 직접 열면
// 브라우저가 로컬 JSON에 대한 fetch를 CORS로 차단하기 때문이다. 대신
// gallery-data.js가 macrostructures.json과 동일한 내용을 `window.MACROSTRUCTURES_DATA`
// 전역 변수로 인라인 제공한다(<script> 태그로 미리 로드, index.html 참고).
// scripts/lint-designkit.mjs가 두 파일의 id 집합이 일치하는지 검증한다.
(function () {
  "use strict";

  var DATA = window.MACROSTRUCTURES_DATA;
  if (!DATA || !Array.isArray(DATA.macrostructures)) {
    document.getElementById("gk-grid").innerHTML =
      '<p class="gk-empty">gallery-data.js 로드 실패 — index.html과 같은 폴더에서 열었는지 확인하세요.</p>';
    return;
  }

  var ALL = DATA.macrostructures;
  var state = { query: "", tags: [], sort: "default" };

  var elGrid = document.getElementById("gk-grid");
  var elSearch = document.getElementById("gk-search");
  var elSort = document.getElementById("gk-sort");
  var elTagbox = document.getElementById("gk-tagbox");
  var elCount = document.getElementById("gk-count");
  var elScrim = document.getElementById("gk-scrim");
  var elModal = document.getElementById("gk-modal-body");
  var elModalTitle = document.getElementById("gk-modal-title");
  var elModalEn = document.getElementById("gk-modal-en");
  var elModalClose = document.getElementById("gk-modal-close");

  function allTags() {
    var set = {};
    ALL.forEach(function (m) {
      m.use_tags.forEach(function (t) {
        set[t] = true;
      });
    });
    return Object.keys(set).sort(function (a, b) {
      return a.localeCompare(b, "ko");
    });
  }

  function renderTagbox() {
    var tags = allTags();
    elTagbox.innerHTML = "";
    tags.forEach(function (tag) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "gk-tag-chip";
      chip.textContent = tag;
      chip.addEventListener("click", function () {
        var idx = state.tags.indexOf(tag);
        if (idx === -1) {
          state.tags.push(tag);
          chip.classList.add("on");
        } else {
          state.tags.splice(idx, 1);
          chip.classList.remove("on");
        }
        render();
      });
      elTagbox.appendChild(chip);
    });
  }

  function matches(m) {
    var q = state.query.trim().toLowerCase();
    if (q) {
      var haystack = [m.name_ko, m.name_en, m.description, m.id]
        .concat(m.use_tags)
        .join(" ")
        .toLowerCase();
      if (haystack.indexOf(q) === -1) return false;
    }
    if (state.tags.length > 0) {
      var hasAll = state.tags.every(function (t) {
        return m.use_tags.indexOf(t) !== -1;
      });
      if (!hasAll) return false;
    }
    return true;
  }

  function sortList(list) {
    if (state.sort === "name") {
      return list.slice().sort(function (a, b) {
        return a.name_ko.localeCompare(b.name_ko, "ko");
      });
    }
    return list; // "default" = macrostructures.json 원본 순서
  }

  function cardEl(m) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "gk-card";
    card.setAttribute("data-id", m.id);

    var thumb = document.createElement("div");
    thumb.className = "gk-thumb";
    var img = document.createElement("img");
    img.src = "../macrostructures/" + m.svg;
    img.alt = m.name_ko + " 구조 다이어그램";
    img.loading = "lazy";
    thumb.appendChild(img);

    var body = document.createElement("div");
    body.className = "gk-body";
    body.innerHTML =
      '<p class="gk-name-ko">' +
      escapeHtml(m.name_ko) +
      '</p><p class="gk-name-en">' +
      escapeHtml(m.name_en) +
      '</p><div class="gk-tags">' +
      m.use_tags
        .slice(0, 3)
        .map(function (t) {
          return "<span>" + escapeHtml(t) + "</span>";
        })
        .join("") +
      "</div>";

    card.appendChild(thumb);
    card.appendChild(body);
    card.addEventListener("click", function () {
      openDetail(m);
    });
    return card;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    var filtered = sortList(ALL.filter(matches));
    elGrid.innerHTML = "";
    if (filtered.length === 0) {
      elGrid.innerHTML = '<p class="gk-empty">조건에 맞는 구조 골격이 없습니다. 검색어나 태그를 조정해보세요.</p>';
    } else {
      filtered.forEach(function (m) {
        elGrid.appendChild(cardEl(m));
      });
    }
    elCount.textContent = filtered.length + " / " + ALL.length + "종";
  }

  function openDetail(m) {
    elModalTitle.textContent = m.name_ko;
    elModalEn.textContent = m.name_en + " · " + m.id;
    elModal.innerHTML =
      '<div><p class="gk-section-label">설명</p><div class="gk-desc">' +
      escapeHtml(m.description) +
      "</div></div>" +
      '<div><p class="gk-section-label">피할 때</p><div class="gk-avoid">' +
      escapeHtml(m.avoid_when) +
      "</div></div>" +
      '<div><p class="gk-section-label">taste 스킬 호출 스니펫</p><div class="gk-snippet">/taste "설명" --macro=' +
      escapeHtml(m.id) +
      "</div></div>" +
      '<div><p class="gk-section-label">데모</p>' +
      '<div class="gk-demo-actions" style="margin-bottom:10px">' +
      '<a class="gk-btn primary" href="../macrostructures/demos/' +
      escapeHtml(m.id) +
      '.html" target="_blank" rel="noopener">새 탭에서 데모 열기</a>' +
      "</div>" +
      '<iframe class="gk-demo-frame" src="../macrostructures/demos/' +
      escapeHtml(m.id) +
      '.html" title="' +
      escapeHtml(m.name_ko) +
      ' 데모"></iframe>' +
      "</div>";
    elScrim.classList.add("show");
    elModalClose.focus();
  }

  function closeDetail() {
    elScrim.classList.remove("show");
    // iframe src를 비워 백그라운드에서 계속 렌더링/사운드 재생되지 않도록 정리
    var frame = elModal.querySelector("iframe");
    if (frame) frame.src = "about:blank";
  }

  elSearch.addEventListener("input", function (e) {
    state.query = e.target.value;
    render();
  });
  elSort.addEventListener("change", function (e) {
    state.sort = e.target.value;
    render();
  });
  elModalClose.addEventListener("click", closeDetail);
  elScrim.addEventListener("click", function (e) {
    if (e.target === elScrim) closeDetail();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDetail();
  });

  renderTagbox();
  render();
})();
