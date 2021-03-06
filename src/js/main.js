import API from './api';
import FeedCard from './components/feed/feed-card';

const widget = (endPoint, itemsCount, interval, placeToRender) => {
  const api = new API({
    url: endPoint,
    count: itemsCount
  });

  const renderFeed = (feed) => {
    placeToRender.innerHTML = ``;

    for (const feedCard of feed) {
      const taskComponent = new FeedCard(feedCard);
      placeToRender.appendChild(taskComponent.render());
    }
  };

  const renderWidget = () => {
    api.getData().then((feed) => renderFeed(feed));
  };

  renderWidget();
  setInterval(renderWidget, interval);
};

// - Feed URL
// - Number of posts to display
// - Update interval
const container = document.querySelector(`.app__feed`);
widget(`//api.massrelevance.com/MassRelDemo/`, 20, 10000, container);
