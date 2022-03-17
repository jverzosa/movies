import { LitElement } from 'lit';
export declare class TVShows extends LitElement {
    static styles: import("lit").CSSResult;
    tvShows: Array<Object>;
    tvShowsContainer: any;
    finalHTML: any;
    render(): import("lit-html").TemplateResult<1>;
    seachQuery?: string;
    private content;
    filterTvShows(event: Event): void;
    selectTVshow(item: any): void;
}
