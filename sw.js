self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE') {
        const { task, delay, id } = event.data;

        setTimeout(() => {
            const options = {
                body: `Task: ${task}`,
                icon: 'https://cdn-icons-png.flaticon.com/512/552/552402.png',
                vibrate: [200, 100, 200],
                requireInteraction: true, // പാനലിൽ Sticky ആയി നിൽക്കാൻ
                tag: 'task-' + id, // ഒന്നിലധികം ടാസ്ക്കുകൾക്ക് ഒരേസമയം പാനലിൽ വരാൻ
                actions: [
                    { action: 'done', title: 'Done' }
                ]
            };
            self.registration.showNotification("Reminder", options);
        }, delay);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // പാനലിൽ ക്ലിക്ക് ചെയ്താൽ സൈറ്റ് ഓപ്പൺ ചെയ്യും
    event.waitUntil(clients.openWindow('/'));
});
