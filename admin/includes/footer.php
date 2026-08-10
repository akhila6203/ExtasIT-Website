  </main>
</div>
</div>

<div class="panel-overlay" id="panelOverlay"></div>
<div class="panel-drawer" id="panelDrawer">
  <div class="panel-drawer-header">
    <div>
      <h2 id="panelDrawerTitle">Details</h2>
      <p id="panelDrawerSubtitle"></p>
    </div>
    <button type="button" class="panel-drawer-close" id="panelDrawerClose" aria-label="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  <div class="panel-drawer-body" id="panelDrawerBody"></div>
  <div class="panel-drawer-footer" id="panelDrawerFooter"></div>
</div>

<div class="panel-toast-container" id="toastContainer"></div>
<div class="panel-spinner" id="globalSpinner" hidden>
  <div class="panel-spinner-ring"></div>
</div>

 <script src="<?= base_url('/js/admin-common.js') ?>"></script>
<?php if (!empty($pageScript)): ?>
  <script src="<?= base_url('/js/' . htmlspecialchars($pageScript)) ?>"></script>

<?php endif; ?>
</body>
</html>
