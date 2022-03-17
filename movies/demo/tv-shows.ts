import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const getTVShows = async (query: string) => {
  let json = null;
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  json = await response.json();
  await new Promise<void>((r) => setTimeout(() => r(), 1000));
  return json;
}

@customElement('tv-shows')
export class TVShows extends LitElement {
  static styles = css`
    .searchBar {
      margin: 20px 40%;
      color: black;
      font-size: 24px;
      padding: 2px 10px 2px;
      border: 3px solid lightgray;
      text-align: center;
    }
    .showCard-container {
      display: grid;
      grid-template-columns: auto auto auto;
      padding: 5px;
    }
    .showCard {
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.8);
      margin: 5px;
      heigth: 100px;
    }
    .image {
      width: 20%;
      float: left;
      margin: 0px;
    }
    .info {
      width: 75%;
      float: right;
      padding-left: 5px;
    }
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .rating {
      font-size: 16px;
    }
    .desc {
      text-overflow: ellipsis;
      font-size: 9px;
      overflow: hidden;
      height: 20px;
    }
  `;

  @property()
  tvShows: Array<Object> = [];
  tvShowsContainer: any;
  finalHTML: any;

  render() {
    let searchBar = html`<input class="searchBar" placeholder="Search TV Shows" @input=${this.filterTvShows}></input>`;    
    return html`${searchBar}${this.finalHTML}`;
    
  }

  @property()
  seachQuery?: string;
  @state()
  private content: Promise<Array<Object>> = getTVShows('');
  filterTvShows(event: Event) {
    const input = event.target as HTMLInputElement;
    this.seachQuery = input.value;
    this.content = getTVShows(input.value);
    this.content.then((results) => {
      if (this.seachQuery && results && results.length > 0) {
        results.map((item: any) => {
          let tvShow = {
            image: item.show.image ? item.show.image['medium'] : 'https://static.tvmaze.com/uploads/images/medium_portrait/60/152357.jpg',
            name: item.show.name,
            rating: item.show.rating && item.show.rating['average'] ? item.show.rating['average'] + '/10' : 'No Rating yet',
            desc: item.show.summary,
            index: item.show.id
          }
          this.tvShows.push(tvShow);
        });
      };
      if (this.tvShows.length > 0) {
        this.tvShowsContainer = html`<div class="showCard-container">
        ${this.tvShows.map((tvShow: any) =>
          html`
          <div class="showCard">
            <img class="image" src="${tvShow.image}">
            <div class="info">
              <div class="title" @click="this.selectTVshow">${tvShow.name}</div>
              <div class="rating">${tvShow.rating}</div>
              <div class="desc">${tvShow.desc}</div>
            </div>
          </div>
            `
        )}</div>`;
        this.finalHTML = html`${this.tvShowsContainer}`;
      } else {
        this.finalHTML = html`<p>Not Working Search</p>`;
      }
    });
  }

  selectTVshow(item: any) {
    
  }
}
