
self.addEventListener('install', (event) => {
    self.skipWaiting();
});


self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});


self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_TASK') {
        const { task, delay } = event.data;


        // Background-ൽ വെയിറ്റ് ചെയ്യാൻ
        setTimeout(() => {
            self.registration.showNotification("Task Reminder", {
                body: task,
                icon: 'https://cdn-icons-png.flaticon.com/512/552/552402.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/552/552402.png',
                vibrate: [200, 100, 200],
                requireInteraction: true // User ക്ലോസ് ചെയ്യുന്നത് വരെ നോട്ടിഫിക്കേഷൻ നിൽക്കും
            });
        }, delay);
    }
}
);



function scheduleTask() {
    // Firefox-ന് വേണ്ടി ബട്ടൺ ക്ലിക്ക് ചെയ്യുമ്പോൾ പെർമിഷൻ ചോദിക്കുന്നു
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            const task = document.getElementById('taskInput').value;
            const time = document.getElementById('taskTime').value;
            
            // ... ബാക്കി ഷെഡ്യൂളിംഗ് കോഡ് ഇവിടെ ചേർക്കുക ...
            alert("Permission granted! Task scheduled.");
        } else {
            alert("Notification permission denied!");
        }
    });
}



