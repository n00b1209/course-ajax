(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', ' Client-ID 27b529238b018ac5df2e09a6358999eb02523f94f8e8a5e0bd773b0ecf7f1ae5')
        unsplashRequest.send()

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=308e29ef229f42b09da907d799a0dc3a`);
        articleRequest.send();

        function addImage() {
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

            if (data && data.results && data.results[0]) {
              const firstImage = data.results[0];
              htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            }
            else {
              htmlContent = '<div class="error-no-image">No images available</div>';
            }

          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

        };

        function addArticles () {
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

            if (data.response && data.response.docs && data.response.docs.length > 1) {
              const firstArticle = data.response.docs[0];
              htmlContent = `<p>
                <h3><a href="${firstArticle.web_url}">${firstArticle.headline.main}</a></h3>
                </p>`;
            }
            else {
              htmlContent = '<div class="error-no-articles">No articles available</div>';
            }

          responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }


    });


})();
