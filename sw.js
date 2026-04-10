// Service Worker Install ആകുമ്പോൾ തന്നെ ആക്ടീവ് ആകാൻ
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// പുതിയ സർവീസ് വർക്കർ ഉടൻ തന്നെ കൺട്രോൾ ഏറ്റെടുക്കാൻ
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// ടാസ്ക് മെസേജ് സ്വീകരിക്കാൻ
self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_TASK') {
        const { task, delay } = event.data;

        // നിശ്ചിത സമയം കഴിയുമ്പോൾ നോട്ടിഫിക്കേഷൻ കാണിക്കാൻ
        setTimeout(() => {
            const options = {
                body: task,
                icon: 'https://cdn-icons-png.flaticon.com/512/552/552402.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/552/552402.png',
                vibrate: [200, 100, 200, 100, 200],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                    { action: 'close', title: 'Close' }
                ],
                requireInteraction: true, // യൂസർ ക്ലിക്ക് ചെയ്യുന്നത് വരെ നോട്ടിഫിക്കേഷൻ പാനലിൽ നിൽക്കും
                tag: 'task-reminder-' + Date.now() // ഒന്നിലധികം നോട്ടിഫിക്കേഷനുകൾ വരാൻ സഹായിക്കും
            };

            self.registration.showNotification("Task Reminder", options);
        }, delay);
    }
});

// നോട്ടിഫിക്കേഷനിൽ ക്ലിക്ക് ചെയ്താൽ വെബ്സൈറ്റ് ഓപ്പൺ ചെയ്യാൻ
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
