
// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({
    workPeriod: document.getElementById('work').value,
    restPeriod: document.getElementById('rest').value,
    musicOn: document.getElementById('music').checked,
    blocking: document.getElementById('sites').checked, // enabled or not
    blacklist: document.getElementById("textarea").value.split("\n").map(s => s.trim()).filter(Boolean), // list of blocked sites
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Settings saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get({
    workPeriod: 25,
    restPeriod: 5,
    musicOn: true,
    blocking: true,
    blacklist: []
  }, function(items) {
    document.getElementById('work').value = items.workPeriod;
    document.getElementById('rest').value = items.restPeriod;
    document.getElementById('music').checked = items.musicOn;
    document.getElementById('sites').checked = items.blocking;
    document.getElementById('textarea').value = items.blacklist.join("\n");
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
