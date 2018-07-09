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
.then(addImage)
.catch(e => requestError(e, 'image'));

fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=308e29ef229f42b09da907d799a0dc3a`)
.then(response => response.json())
.then(addArticles)
.catch(e => requestError(e, 'articles'));

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

function addArticles(data) {
  let htmlContent = '';
  const firstArticle = data.response.docs[0];

  if (firstArticle) {
    htmlContent = `<p>
      <h3><a href="${firstArticle.web_url}">${firstArticle.headline.main}</a></h3>
      </p>`;
  }
  else {
    htmlContent = '<div class="error-no-articles">No articles available</div>';
  }
  responseContainer.insertAdjacentHTML('beforeend', htmlContent);

}


function requestError(e, part) {
  console.log(e);
  responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}


    });
})();
