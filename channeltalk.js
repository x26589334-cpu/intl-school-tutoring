// ===== 채널톡(Channel Talk) 연동 — 전 페이지 공용 (2026-10-04) =====
// 기본 버튼은 숨기고(hideChannelButtonOnBoot) 자체 버튼(.ch-fab)을 쓴다.
// 이유: 기본 버튼은 위치 조정 boot 옵션이 없어 카톡 버튼(우하단)·모바일 전화 바(하단)와 겹친다.
// 버튼 배치: 오른쪽 아래 — 카톡 버튼 위 (PC bottom:84px / 모바일 bottom:122px).
(function () {
  // ---- 공식 SDK 로더 (채널톡 제공 스니펫 그대로) ----
  (function () {
    var w = window;
    if (w.ChannelIO) { return w.console.error("ChannelIO script included twice."); }
    var ch = function () { ch.c(arguments); };
    ch.q = [];
    ch.c = function (args) { ch.q.push(args); };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) { return; }
      w.ChannelIOInitialized = true;
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      var x = document.getElementsByTagName("script")[0];
      if (x.parentNode) { x.parentNode.insertBefore(s, x); }
    }
    if (document.readyState === "complete") { l(); }
    else { w.addEventListener("DOMContentLoaded", l); w.addEventListener("load", l); }
  })();

  function init() {
    // ---- 자체 버튼 스타일 ----
    var st = document.createElement("style");
    st.textContent =
      ".ch-fab{position:fixed;right:20px;bottom:84px;z-index:70;display:inline-flex;align-items:center;gap:7px;" +
      "background:#1f4fd8;color:#fff;font-family:inherit;font-weight:800;font-size:15px;" +
      "padding:13px 20px;border-radius:999px;border:0;cursor:pointer;white-space:nowrap;" +
      "box-shadow:0 6px 20px rgba(0,0,0,.22);transition:transform .15s ease}" +
      ".ch-fab:hover{transform:translateY(-2px)}" +
      ".ch-fab .ch-badge{display:none;position:absolute;top:-6px;right:-4px;min-width:19px;height:19px;" +
      "background:#e5304c;color:#fff;border-radius:999px;font-size:11px;font-weight:800;" +
      "line-height:19px;text-align:center;padding:0 5px;box-sizing:border-box}" +
      "@media (max-width:640px){.ch-fab{bottom:122px;right:14px;padding:11px 16px;font-size:14px}}";
    document.head.appendChild(st);

    // ---- 자체 버튼 ----
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ch-fab";
    btn.setAttribute("aria-label", "실시간 채팅 상담");
    btn.innerHTML = "💬 실시간 상담<span class=\"ch-badge\"></span>";
    btn.addEventListener("click", function () {
      if (typeof gtag === "function") gtag("event", "channeltalk_open");
    });
    document.body.appendChild(btn);

    // ---- 채널톡 부팅 ----
    ChannelIO("boot", {
      pluginKey: "3c9f01fc-8daa-44fa-adc6-c6a3a7e43d0a",
      customLauncherSelector: ".ch-fab",
      hideChannelButtonOnBoot: true,
      zIndex: 120
    });

    // 안 읽은 메시지 수 → 빨간 배지
    ChannelIO("onBadgeChanged", function (unread) {
      var b = btn.querySelector(".ch-badge");
      if (!b) return;
      if (unread > 0) { b.style.display = "block"; b.textContent = unread > 9 ? "9+" : unread; }
      else { b.style.display = "none"; }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
