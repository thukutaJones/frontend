self.addEventListener("push", (event) => {
  const data = event?.data?.json() || {};
  const title = data?.title || "New Enquiry";
  const options = {
    body: data?.body,
    icon: "/wezLogo.png",
    data: data?.url || "/enquiry",
  };
  event.waitUntil(self?.registration?.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event?.notification?.close();
  event?.waitUntil(clients?.openWindow(event?.notification?.data));
});
