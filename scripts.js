window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#f1fbff",
        "surface-container": "#daf2fa",
        "primary-fixed": "#ffdf9b",
        "surface-variant": "#cfe6ee",
        "background": "#f1fbff",
        "on-secondary-container": "#00716a",
        "on-primary-fixed": "#251a00",
        "inverse-on-surface": "#ddf5fd",
        "surface-container-highest": "#cfe6ee",
        "on-error-container": "#93000a",
        "inverse-primary": "#f2bf43",
        "on-primary-container": "#fffbff",
        "on-secondary": "#ffffff",
        "secondary-container": "#89f5ea",
        "on-background": "#071e24",
        "surface": "#f1fbff",
        "outline-variant": "#d2c5af",
        "on-error": "#ffffff",
        "outline": "#807662",
        "secondary-fixed": "#89f5ea",
        "tertiary-fixed": "#ffd9e4",
        "error": "#ba1a1a",
        "on-primary-fixed-variant": "#5b4300",
        "surface-container-high": "#d5ecf4",
        "surface-container-low": "#e1f7ff",
        "on-tertiary-container": "#fffbff",
        "tertiary": "#b01367",
        "on-secondary-fixed": "#00201e",
        "primary-fixed-dim": "#f2bf43",
        "on-primary": "#ffffff",
        "inverse-surface": "#1e343a",
        "tertiary-fixed-dim": "#ffb0cc",
        "primary": "#755700",
        "error-container": "#ffdad6",
        "secondary-fixed-dim": "#6cd8ce",
        "on-tertiary-fixed": "#3e0020",
        "surface-container-lowest": "#ffffff",
        "on-tertiary": "#ffffff",
        "primary-container": "#936f00",
        "on-secondary-fixed-variant": "#00504b",
        "secondary": "#006a64",
        "surface-tint": "#785a00",
        "surface-dim": "#c6dee6",
        "tertiary-container": "#d13480",
        "on-tertiary-fixed-variant": "#8d0050",
        "on-surface": "#071e24",
        "on-surface-variant": "#4e4635"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        md: "24px",
        lg: "48px",
        xs: "4px",
        base: "8px",
        xl: "80px",
        sm: "12px",
        "container-max": "1120px",
        gutter: "24px"
      },
      fontFamily: {
        "headline-lg": ["Plus Jakarta Sans"],
        "body-lg": ["Literata"],
        "headline-lg-mobile": ["Plus Jakarta Sans"],
        "display-lg": ["Plus Jakarta Sans"],
        "label-sm": ["Be Vietnam Pro"],
        "headline-md": ["Plus Jakarta Sans"],
        "label-md": ["Be Vietnam Pro"],
        "body-md": ["Literata"]
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-sm": ["12px", { lineHeight: "1.2", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var mobileMenu = document.getElementById("mobile-menu");
  var openMenuButton = document.getElementById("mobile-menu-button");
  var closeMenuButton = document.getElementById("mobile-menu-close");

  var chatOpenButton = document.getElementById("chat-open");
  var chatCloseButton = document.getElementById("chat-close");
  var chatModal = document.getElementById("chat-modal");
  var chatPanel = chatModal ? chatModal.querySelector(":scope > div") : null;
  var chatForm = document.getElementById("chat-form") || document.getElementById("contact-form");
  var chatMessage = document.getElementById("chat-form-message") || document.getElementById("contact-form-message");

  // Activate current menu item based on page
  (function activateMenuItems() {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var navLinks = document.querySelectorAll("aside a[href], #mobile-menu a[href]");
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.remove("text-on-surface-variant", "hover:bg-surface-variant/50");
        link.classList.add("bg-secondary-container", "text-on-secondary-container");
      } else {
        link.classList.remove("bg-secondary-container", "text-on-secondary-container");
        link.classList.add("text-on-surface-variant", "hover:bg-surface-variant/50");
      }
    });
  })();

  function closeChatModal() {
    if (chatModal && chatPanel) {
      chatPanel.classList.add("opacity-0", "translate-y-4", "scale-95");
      chatPanel.classList.remove("opacity-100", "translate-y-0", "scale-100");
      setTimeout(function () {
        chatModal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      }, 250);
    }
  }

  if (mobileMenu && openMenuButton && closeMenuButton) {
    openMenuButton.addEventListener("click", function () {
      mobileMenu.classList.remove("hidden");
      openMenuButton.setAttribute("aria-expanded", "true");
      document.body.classList.add("overflow-hidden");
    });

    closeMenuButton.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      openMenuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("overflow-hidden");
    });
  }

  if (chatOpenButton && chatCloseButton && chatModal && chatPanel) {
    chatOpenButton.addEventListener("click", function () {
      chatModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
      requestAnimationFrame(function () {
        chatPanel.classList.remove("opacity-0", "translate-y-4", "scale-95");
        chatPanel.classList.add("opacity-100", "translate-y-0", "scale-100");
      });
    });

    chatCloseButton.addEventListener("click", closeChatModal);

    chatModal.addEventListener("click", function (event) {
      if (event.target === chatModal) {
        closeChatModal();
      }
    });
  }

  if (chatForm) {
    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (chatMessage) {
        chatMessage.classList.add("hidden");
        chatMessage.innerHTML = "";
      }

      var action = chatForm.getAttribute("action") || "contact.php";
      var formData = new FormData(chatForm);

      fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            if (chatMessage) {
              chatMessage.classList.remove("hidden");
              chatMessage.classList.remove("border-error/20", "bg-error-container", "text-error");
              chatMessage.classList.add("border-primary/20", "bg-primary-fixed", "text-primary");
              chatMessage.innerHTML = "Thanks! Your message was sent successfully.";
            }
            chatForm.reset();
            if (chatModal) {
              setTimeout(closeChatModal, 1600);
            }
          } else {
            if (chatMessage) {
              chatMessage.classList.remove("hidden");
              chatMessage.classList.add("border-error/20", "bg-error-container", "text-error");
              chatMessage.innerHTML = data.errors ? data.errors.join("<br>") : "Unable to send your message right now.";
            }
          }
        })
        .catch(function (error) {
          if (chatMessage) {
            chatMessage.classList.remove("hidden");
            chatMessage.classList.add("border-error/20", "bg-error-container", "text-error");
            chatMessage.innerHTML = "Something went wrong. Please try again later.";
          }
          console.error("Contact form error:", error);
        });
    });
  }
});
