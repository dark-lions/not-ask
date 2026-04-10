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
