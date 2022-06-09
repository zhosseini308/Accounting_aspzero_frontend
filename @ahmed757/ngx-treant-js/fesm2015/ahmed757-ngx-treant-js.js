import { __decorate } from 'tslib';
import { EventEmitter, Input, Output, Component, NgModule } from '@angular/core';

/**
 * A simple Angular2+ component used as a wrapper for [TreantJS](https://fperucic.github.io/treant-js/) library
 * for visualization of tree (chart) diagrams, with additional functionality.
 */
import * as ɵngcc0 from '@angular/core';
let NgxTreantJsComponent = class NgxTreantJsComponent {
    constructor() {
        this.clicked = new EventEmitter();
        this.hovered = new EventEmitter();
        this.dragged = new EventEmitter();
        this.dropped = new EventEmitter();
        this.updated = new EventEmitter();
        this.loadedNodes = new EventEmitter();
        this.loadedTreant = new EventEmitter();
        this.loadedTree = new EventEmitter();
    }
    ngAfterViewInit() {
        const callback = (callback) => {
            let popoverElm1;
            let popoverElm2;
            let timeout;
            let draggedNode;
            let droppedNode;
            const __this = this;
            // add ids to nodeDOMs
            for (let i = 0; i < callback.nodeDB.db.length; i++) {
                if (!callback.nodeDB.db[i].nodeDOM)
                    callback.nodeDB.db[i].nodeDOM = {};
                callback.nodeDB.db[i].nodeDOM.id = callback.nodeDB.db[i].id;
            }
            this.loadedTree.emit(callback);
            const $oNodes = $(`#${this.chartId} .node`);
            // add support for drag and drop functionality
            const addDragAndDropSupport = () => {
                for (let i = 0; i < $oNodes.length; i++) {
                    $oNodes[i].draggable = true;
                    $oNodes[i].classList.add('drop');
                    $oNodes[i].addEventListener('dragstart', drag, false);
                    $oNodes[i].addEventListener('drop', drop, false);
                    $oNodes[i].addEventListener('dragover', allowDrop, false);
                }
            };
            // swap nodes after drag and drop
            function swapNodes(nodes, dragIndex, dropIndex) {
                const temp = nodes[dragIndex];
                const dragClone = Object.assign({}, temp);
                const dropClone = Object.assign({}, nodes[dropIndex]);
                nodes[dragIndex] = nodes[dropIndex];
                nodes[dropIndex] = temp;
                // set dragged node props
                nodes[dragIndex].id = dragClone.id;
                nodes[dragIndex].nodeDOM.id = dragClone.id;
                nodes[dragIndex].parentId = dragClone.parentId;
                nodes[dragIndex].children = dragClone.children;
                nodes[dragIndex].connStyle = dragClone.connStyle;
                nodes[dragIndex].stackChildren = dragClone.stackChildren;
                nodes[dragIndex].stackParentId = dragClone.stackParentId;
                nodes[dragIndex].stackParent = dragClone.stackParent;
                nodes[dragIndex].leftNeighborId = dragClone.leftNeighborId;
                nodes[dragIndex].rightNeighborId = dragClone.rightNeighborId;
                nodes[dragIndex].collapsed = dragClone.collapsed;
                nodes[dragIndex].collapsable = dragClone.collapsable;
                // set dropped node props
                nodes[dropIndex].id = dropClone.id;
                nodes[dropIndex].nodeDOM.id = dropClone.id;
                nodes[dropIndex].parentId = dropClone.parentId;
                nodes[dropIndex].children = dropClone.children;
                nodes[dropIndex].connStyle = dropClone.connStyle;
                nodes[dropIndex].stackChildren = dropClone.stackChildren;
                nodes[dropIndex].stackParent = dropClone.stackParent;
                nodes[dropIndex].stackParentId = dropClone.stackParentId;
                nodes[dropIndex].leftNeighborId = dropClone.leftNeighborId;
                nodes[dropIndex].rightNeighborId = dropClone.rightNeighborId;
                nodes[dropIndex].collapsed = dropClone.collapsed;
                nodes[dropIndex].collapsable = dropClone.collapsable;
            }
            function hidePopover() {
                if (popoverElm1)
                    $(popoverElm1).popover('hide');
                if (popoverElm2)
                    $(popoverElm2).popover('hide');
            }
            function drag(event) {
                draggedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                hidePopover();
                __this.dragged.emit({ draggedNode, $ });
            }
            function drop(event) {
                event.preventDefault();
                droppedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                hidePopover();
                __this.dropped.emit({ draggedNode: droppedNode, droppedNode: draggedNode, $ });
                const dragIndex = callback.nodeDB.db.findIndex((n) => n.id == draggedNode.id);
                const dropIndex = callback.nodeDB.db.findIndex((n) => n.id == droppedNode.id);
                swapNodes(callback.nodeDB.db, dragIndex, dropIndex);
                callback.positionTree();
            }
            function allowDrop(event) {
                event.preventDefault();
            }
            function updateTextVal(currentEle, value, classVal, node, propName) {
                let isTextUpdated = false;
                $(document).off('click');
                $(currentEle).html('<input class="input-field" style="width:' +
                    $(currentEle).width() +
                    'px;" type="text" value="' +
                    value +
                    '"/>');
                $('.input-field').focus();
                $('.input-field').keyup(function (event) {
                    if (event.keyCode === 13) {
                        const inputClass = $(event.target).attr('class');
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;
                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        if (inputClass === 'input-field') {
                            isTextUpdated = true;
                        }
                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }
                        callback.positionTree();
                        __this.updated.emit({ node, $ });
                    }
                });
                $(document).click(function () {
                    if ($(event.target).attr('class') !== 'input-field' && !isTextUpdated) {
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;
                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        $(document).off('click');
                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }
                        callback.positionTree();
                        __this.updated.emit({ node, $ });
                    }
                });
            }
            this.isDraggable && addDragAndDropSupport();
            $oNodes.off('click').on('click', function (event) {
                const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                hidePopover();
                __this.clicked.emit({ node, $ });
            });
            $oNodes.off('dblclick').on('dblclick', function (e) {
                if ($(event.target).attr('class') !== 'input-field') {
                    e.stopPropagation();
                    const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                    const currentEle = $(event.target);
                    const value = $(event.target).text();
                    const classVal = $(event.target).attr('class');
                    const propName = classVal && classVal.split('-')[1];
                    hidePopover();
                    node.text &&
                        node.text[propName] &&
                        updateTextVal(currentEle, value, classVal, node, propName);
                }
            });
            if (this.popoverSettings) {
                $oNodes.popover(this.popoverSettings);
                $oNodes
                    .off('mouseenter')
                    .on('mouseenter', function (e) {
                        hidePopover();
                        popoverElm1 = this;
                        $(this).popover('show');
                        const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                        __this.hovered.emit({ node, $ });
                        clearTimeout(timeout);
                        $('.popover')
                            .off('mouseleave')
                            .on('mouseleave', function () {
                                hidePopover();
                            });
                    })
                    .off('mouseleave')
                    .on('mouseleave', function (e) {
                        let hovered = false;
                        popoverElm2 = this;
                        $('.popover').hover(function () {
                            hovered = true;
                        }, function () {
                            hovered = false;
                        });
                        if (!$('.popover:hover').length) {
                            timeout = setTimeout(() => {
                                !hovered && hidePopover();
                            }, __this.mouseleaveMilliseconds || 0);
                        }
                    });
            }
            // emit Tree nodes
            this.loadedNodes.emit({ nodes: callback.nodeDB.db, $ });
        };
        // create Treant instance and add its container ID
        // this instance can be useful to operate on the Tree
        const treant = new Treant(this.data, callback, $);
        treant.container_id = this.chartId;
        this.loadedTreant.emit(treant);
    }
};
NgxTreantJsComponent.ɵfac = function NgxTreantJsComponent_Factory(t) { return new (t || NgxTreantJsComponent)(); };
NgxTreantJsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({
    type: NgxTreantJsComponent, selectors: [["ngx-treant-chart"]], inputs: { chartId: "chartId", chartClass: "chartClass", data: "data", popoverSettings: "popoverSettings", mouseleaveMilliseconds: "mouseleaveMilliseconds", isDraggable: "isDraggable", textProps: "textProps" }, outputs: { clicked: "clicked", hovered: "hovered", dragged: "dragged", dropped: "dropped", updated: "updated", loadedNodes: "loadedNodes", loadedTreant: "loadedTreant", loadedTree: "loadedTree" }, decls: 1, vars: 2, consts: [[3, "className", "id"]], template: function NgxTreantJsComponent_Template(rf, ctx) {
        if (rf & 1) {
            ɵngcc0.ɵɵelement(0, "div", 0);
        } if (rf & 2) {
            ɵngcc0.ɵɵproperty("className", ctx.chartClass)("id", ctx.chartId);
        }
    }, encapsulation: 2
});
__decorate([
    Input()
], NgxTreantJsComponent.prototype, "chartId", void 0);
__decorate([
    Input()
], NgxTreantJsComponent.prototype, "chartClass", void 0);
__decorate([
    Input()
], NgxTreantJsComponent.prototype, "data", void 0);
__decorate([
    Input()
], NgxTreantJsComponent.prototype, "popoverSettings", void 0);
__decorate([
    Input()
], NgxTreantJsComponent.prototype, "mouseleaveMilliseconds", void 0);
__decorate([
    Input()
], NgxTreantJsComponent.prototype, "isDraggable", void 0);
__decorate([
    Input()
], NgxTreantJsComponent.prototype, "textProps", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "clicked", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "hovered", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "dragged", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "dropped", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "updated", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "loadedNodes", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "loadedTreant", void 0);
__decorate([
    Output()
], NgxTreantJsComponent.prototype, "loadedTree", void 0);

let NgxTreantJsModule = class NgxTreantJsModule {
};
NgxTreantJsModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgxTreantJsModule });
NgxTreantJsModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgxTreantJsModule_Factory(t) { return new (t || NgxTreantJsModule)(); }, imports: [[]] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxTreantJsComponent, [{
        type: Component,
        args: [{
            selector: 'ngx-treant-chart',
            template: "<div [className]=\"chartClass\" [id]=\"chartId\"></div>\n"
        }]
    }], function () { return []; }, {
        clicked: [{
            type: Output
        }], hovered: [{
            type: Output
        }], dragged: [{
            type: Output
        }], dropped: [{
            type: Output
        }], updated: [{
            type: Output
        }], loadedNodes: [{
            type: Output
        }], loadedTreant: [{
            type: Output
        }], loadedTree: [{
            type: Output
        }], chartId: [{
            type: Input
        }], chartClass: [{
            type: Input
        }], data: [{
            type: Input
        }], popoverSettings: [{
            type: Input
        }], mouseleaveMilliseconds: [{
            type: Input
        }], isDraggable: [{
            type: Input
        }], textProps: [{
            type: Input
        }]
    });
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgxTreantJsModule, { declarations: [NgxTreantJsComponent], exports: [NgxTreantJsComponent] }); })();
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxTreantJsModule, [{
        type: NgModule,
        args: [{
            declarations: [NgxTreantJsComponent],
            imports: [],
            exports: [NgxTreantJsComponent]
        }]
    }], null, null);
})();

/*
 * Public API Surface of ngx-treant-js
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxTreantJsComponent, NgxTreantJsModule };

//# sourceMappingURL=ahmed757-ngx-treant-js.js.map
