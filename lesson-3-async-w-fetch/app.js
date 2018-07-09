(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID 27b529238b018ac5df2e09a6358999eb02523f94f8e8a5e0bd773b0ecf7f1ae5'
    }
}).then(response => response.json())
.then(addImage);
.catch(e => requestError(e, 'image'));

function addImage(data) {
  let htmlContent = '';
  const firstImage = data.results[0];

  if (firstImage) {
    htmlContent = `<figure>
      <img src="${firstImage.urls.regular}" alt="${searchedForText}">
      <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`;
  }
  else {
    htmlContent = '<div class="error-no-image">No images available</div>';
  }
responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

}

function requestError(e, part) {
  console.log(e);
  responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}


    });
})();
