const subscribeWidget = document.querySelector('[data-widget=subscribe]');
const subscribeForm = subscribeWidget.querySelector('[data-id=subscribe-form]');
const nameInput = subscribeWidget.querySelector('[data-id=name]');
const phoneInput = subscribeWidget.querySelector('[data-id=phone]');

subscribeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const params = new URLSearchParams();
  Array.from(subscribeForm.elements)
    .filter(({ name }) => name)
    .forEach(({ name, value }) => params.append(name, value));

  const url = 'http://localhost:9000';
  const xhr = new XMLHttpRequest();

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log('other 2xx status');
      console.log(xhr.status);
    }
  });
  xhr.addEventListener('error', () => {
    console.log('error');
  });
  xhr.addEventListener('loadend', () => {
    console.log('load ended');
  });
});
