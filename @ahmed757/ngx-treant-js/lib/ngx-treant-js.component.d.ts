import { AfterViewInit, EventEmitter } from '@angular/core';
/**
 * A simple Angular2+ component used as a wrapper for [TreantJS](https://fperucic.github.io/treant-js/) library
 * for visualization of tree (chart) diagrams, with additional functionality.
 */
import * as ɵngcc0 from '@angular/core';
export declare class NgxTreantJsComponent implements AfterViewInit {
    chartId: string;
    chartClass: string;
    data: any;
    popoverSettings: any;
    mouseleaveMilliseconds: number;
    isDraggable: boolean;
    textProps: any;
    clicked: EventEmitter<any>;
    hovered: EventEmitter<any>;
    dragged: EventEmitter<any>;
    dropped: EventEmitter<any>;
    updated: EventEmitter<any>;
    loadedNodes: EventEmitter<any>;
    loadedTreant: EventEmitter<any>;
    loadedTree: EventEmitter<any>;
    constructor();
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxTreantJsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxTreantJsComponent, "ngx-treant-chart", never, { "chartId": "chartId"; "chartClass": "chartClass"; "data": "data"; "popoverSettings": "popoverSettings"; "mouseleaveMilliseconds": "mouseleaveMilliseconds"; "isDraggable": "isDraggable"; "textProps": "textProps"; }, { "clicked": "clicked"; "hovered": "hovered"; "dragged": "dragged"; "dropped": "dropped"; "updated": "updated"; "loadedNodes": "loadedNodes"; "loadedTreant": "loadedTreant"; "loadedTree": "loadedTree"; }, never, never>;
}

//# sourceMappingURL=ngx-treant-js.component.d.ts.map