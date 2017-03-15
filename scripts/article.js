// 'use strict';
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
  $newArticle.find('h1').html(this.title);
  $newArticle.find('a').html(this.author);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('.url').html(this.authorUrl);

  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
