document.addEventListener('DOMContentLoaded', () => {

  let requestNumber = 0
  const numberInput = document.querySelector('.add-specialist-block__input');
  let timeoutId;

  const fetchNumber = (url) => {
    fetch(url)
      .then(response => {
        // Проверка на успешность ответа
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        // Преобразование ответа в JSON
        return response.json();
      })
      .then(data => {
        // Обработка полученных данных
        console.log(data);
      })
      .catch(error => {
        // Обработка ошибок
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  numberInput.addEventListener('input', (event) => {
    clearTimeout(timeoutId);

    const currentValue = event.target.value;
    const url = `https://kadyrgulov.ru/add-specialization/getuser.php?id=${currentValue}`;
    fetchNumber(url);
    timeoutId = setTimeout(() => {
      console.log(currentValue);
    }, 1000);
  });

});