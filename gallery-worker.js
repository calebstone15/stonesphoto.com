// Web worker for image processing tasks to keep the main thread free

self.addEventListener('message', function(e) {
  const data = e.data;
  
  if (data.task === 'preload') {
    // Preload images in the background
    preloadImages(data.urls);
  }
});

function preloadImages(urls) {
  if (!urls || !urls.length) return;
  
  Promise.all(urls.map(url => fetch(url, { 
    method: 'GET',
    mode: 'no-cors',
    cache: 'force-cache'
  })))
  .then(() => {
    self.postMessage({ status: 'preloaded', urls: urls });
  })
  .catch(error => {
    self.postMessage({ status: 'error', error: error.message });
  });
}
