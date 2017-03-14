'use strict';

var articles = [];

function Article (rawDataSelection) {
  this.title = rawDataSelection.title;
  this.category = rawDataSelection.category;
  this.author = rawDataSelection.author;
  this.authorUrl = rawDataSelection.authorUrl;
  this.publishedOn = rawDataSelection.publishedOn;
  this.body = rawDataSelection.body;
}
//not sure if these two lines need to be kept//
var artOne = new Article (rawData[0]);
console.log(artOne);
Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');



  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);
  $newArticle.data('author', this.author);
  $newArticle.data('authorUrl', this.authorUrl);
  $newArticle.data('title', this.title);
  $newArticle.data('body', this.body);
  $newArticle.data('published on', this.publishedOn);

  /* TODO: Now use jQuery to fill in the rest of the current
  template clone with properties from this particular Article instance.
  We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

  // Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  articles.push(new Article(articleObject));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
