/* global bootstrap: false */
import bootstrap from "bootstrap";

(function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    bootstrap.Tooltip(tooltipTriggerEl);
  });
})();
