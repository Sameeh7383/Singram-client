undefinedself.addEventListener('push', event => {
  console.log("to notification")
  const data = event.data.json()
  console.log(data)
  console.log('New notification', data)
  const options = {
    body: data.body,
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})
