import { __assign, __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * A simple Angular2+ component used as a wrapper for [TreantJS](https://fperucic.github.io/treant-js/) library
 * for visualization of tree (chart) diagrams, with additional functionality.
 */
import * as ɵngcc0 from '@angular/core';
var NgxTreantJsComponent = /** @class */ (function () {
    function NgxTreantJsComponent() {
        this.clicked = new EventEmitter();
        this.hovered = new EventEmitter();
        this.dragged = new EventEmitter();
        this.dropped = new EventEmitter();
        this.updated = new EventEmitter();
        this.loadedNodes = new EventEmitter();
        this.loadedTreant = new EventEmitter();
        this.loadedTree = new EventEmitter();
    }
    NgxTreantJsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var callback = function (callback) {
            var popoverElm1;
            var popoverElm2;
            var timeout;
            var draggedNode;
            var droppedNode;
            var __this = _this;
            // add ids to nodeDOMs
            for (var i = 0; i < callback.nodeDB.db.length; i++) {
                callback.nodeDB.db[i].nodeDOM.id = callback.nodeDB.db[i].id;
            }
            _this.loadedTree.emit(callback);
            var $oNodes = $("#" + _this.chartId + " .node");
            // add support for drag and drop functionality
            var addDragAndDropSupport = function () {
                for (var i = 0; i < $oNodes.length; i++) {
                    $oNodes[i].draggable = true;
                    $oNodes[i].classList.add('drop');
                    $oNodes[i].addEventListener('dragstart', drag, false);
                    $oNodes[i].addEventListener('drop', drop, false);
                    $oNodes[i].addEventListener('dragover', allowDrop, false);
                }
            };
            // swap nodes after drag and drop
            function swapNodes(nodes, dragIndex, dropIndex) {
                var temp = nodes[dragIndex];
                var dragClone = __assign({}, temp);
                var dropClone = __assign({}, nodes[dropIndex]);
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
                $(popoverElm1).popover('hide');
                $(popoverElm2).popover('hide');
            }
            function drag(event) {
                var _this = this;
                draggedNode = callback.nodeDB.db.find(function (n) { return n.id == $(_this).attr('id'); });
                hidePopover();
                __this.dragged.emit({ draggedNode: draggedNode, $: $ });
            }
            function drop(event) {
                var _this = this;
                event.preventDefault();
                droppedNode = callback.nodeDB.db.find(function (n) { return n.id == $(_this).attr('id'); });
                hidePopover();
                __this.dropped.emit({ draggedNode: droppedNode, droppedNode: draggedNode, $: $ });
                var dragIndex = callback.nodeDB.db.findIndex(function (n) { return n.id == draggedNode.id; });
                var dropIndex = callback.nodeDB.db.findIndex(function (n) { return n.id == droppedNode.id; });
                swapNodes(callback.nodeDB.db, dragIndex, dropIndex);
                callback.positionTree();
            }
            function allowDrop(event) {
                event.preventDefault();
            }
            function updateTextVal(currentEle, value, classVal, node, propName) {
                var isTextUpdated = false;
                $(document).off('click');
                $(currentEle).html('<input class="input-field" style="width:' +
                    $(currentEle).width() +
                    'px;" type="text" value="' +
                    value +
                    '"/>');
                $('.input-field').focus();
                $('.input-field').keyup(function (event) {
                    if (event.keyCode === 13) {
                        var inputClass = $(event.target).attr('class');
                        var newValue = $('.input-field').val() ? $('.input-field').val() : value;
                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        if (inputClass === 'input-field') {
                            isTextUpdated = true;
                        }
                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }
                        callback.positionTree();
                        __this.updated.emit({ node: node, $: $ });
                    }
                });
                $(document).click(function () {
                    if ($(event.target).attr('class') !== 'input-field' && !isTextUpdated) {
                        var newValue = $('.input-field').val() ? $('.input-field').val() : value;
                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        $(document).off('click');
                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }
                        callback.positionTree();
                        __this.updated.emit({ node: node, $: $ });
                    }
                });
            }
            _this.isDraggable && addDragAndDropSupport();
            $oNodes.off('click').on('click', function (event) {
                var _this = this;
                var node = callback.nodeDB.db.find(function (n) { return n.id == $(_this).attr('id'); });
                hidePopover();
                __this.clicked.emit({ node: node, $: $ });
            });
            $oNodes.off('dblclick').on('dblclick', function (e) {
                var _this = this;
                if ($(event.target).attr('class') !== 'input-field') {
                    e.stopPropagation();
                    var node = callback.nodeDB.db.find(function (n) { return n.id == $(_this).attr('id'); });
                    var currentEle = $(event.target);
                    var value = $(event.target).text();
                    var classVal = $(event.target).attr('class');
                    var propName = classVal && classVal.split('-')[1];
                    hidePopover();
                    node.text &&
                        node.text[propName] &&
                        updateTextVal(currentEle, value, classVal, node, propName);
                }
            });
            if (_this.popoverSettings) {
                $oNodes.popover(_this.popoverSettings);
                $oNodes
                    .off('mouseenter')
                    .on('mouseenter', function (e) {
                    var _this = this;
                    hidePopover();
                    popoverElm1 = this;
                    $(this).popover('show');
                    var node = callback.nodeDB.db.find(function (n) { return n.id == $(_this).attr('id'); });
                    __this.hovered.emit({ node: node, $: $ });
                    clearTimeout(timeout);
                    $('.popover')
                        .off('mouseleave')
                        .on('mouseleave', function () {
                        hidePopover();
                    });
                })
                    .off('mouseleave')
                    .on('mouseleave', function (e) {
                    var hovered = false;
                    popoverElm2 = this;
                    $('.popover').hover(function () {
                        hovered = true;
                    }, function () {
                        hovered = false;
                    });
                    if (!$('.popover:hover').length) {
                        timeout = setTimeout(function () {
                            !hovered && hidePopover();
                        }, __this.mouseleaveMilliseconds || 0);
                    }
                });
            }
            // emit Tree nodes
            _this.loadedNodes.emit({ nodes: callback.nodeDB.db, $: $ });
        };
        // create Treant instance and add its container ID
        // this instance can be useful to operate on the Tree
        var treant = new Treant(this.data, callback, $);
        treant.container_id = this.chartId;
        this.loadedTreant.emit(treant);
    };
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
NgxTreantJsComponent.ɵfac = function NgxTreantJsComponent_Factory(t) { return new (t || NgxTreantJsComponent)(); };
NgxTreantJsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxTreantJsComponent, selectors: [["ngx-treant-chart"]], inputs: { chartId: "chartId", chartClass: "chartClass", data: "data", popoverSettings: "popoverSettings", mouseleaveMilliseconds: "mouseleaveMilliseconds", isDraggable: "isDraggable", textProps: "textProps" }, outputs: { clicked: "clicked", hovered: "hovered", dragged: "dragged", dropped: "dropped", updated: "updated", loadedNodes: "loadedNodes", loadedTreant: "loadedTreant", loadedTree: "loadedTree" }, decls: 1, vars: 2, consts: [[3, "className", "id"]], template: function NgxTreantJsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("className", ctx.chartClass)("id", ctx.chartId);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxTreantJsComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-treant-chart',
                template: "<div [className]=\"chartClass\" [id]=\"chartId\"></div>\n"
            }]
    }], function () { return []; }, { clicked: [{
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
        }] }); })();
    return NgxTreantJsComponent;
}());
export { NgxTreantJsComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyZWFudC1qcy5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIkBhaG1lZDc1Ny9uZ3gtdHJlYW50LWpzL2xpYi9uZ3gtdHJlYW50LWpzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLdEY7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFLSDtBQUF3RCxJQW9CcEQ7QUFFWSxRQVpGLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUM5RCxRQUFjLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUM5RCxRQUFjLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUM5RCxRQUFjLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUM5RCxRQUFjLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUM5RCxRQUNjLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7QUFDbEUsUUFBYyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ25FLFFBQWMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ2pFLElBQ21CLENBQUM7QUFDcEIsSUFDSSw4Q0FBZSxHQUFmO0FBQWMsUUFBZCxpQkF5T0M7QUFDTCxRQXpPUSxJQUFNLFFBQVEsR0FBRyxVQUFDLFFBQWE7QUFBSSxZQUMvQixJQUFJLFdBQVcsQ0FBQztBQUM1QixZQUFZLElBQUksV0FBVyxDQUFDO0FBQzVCLFlBQVksSUFBSSxPQUFPLENBQUM7QUFDeEIsWUFBWSxJQUFJLFdBQVcsQ0FBQztBQUM1QixZQUFZLElBQUksV0FBVyxDQUFDO0FBQzVCLFlBQ1ksSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDO0FBQ2hDLFlBQ1ksc0JBQXNCO0FBQ2xDLFlBQVksS0FBSyxJQUFJLENBQUMsR0FB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RTtBQUFDLHlEQUFnRDtBQUM3RCxJQUFhO0FBQWEsUUFBdEIsTUFBTSxFQUFFO0FBQUMseURBQWdEO0FBQzdELElBQWE7QUFBYSxRQUF0QixNQUFNLEVBQUU7QUFBQyx5REFBZ0Q7QUFDN0QsSUFBYTtBQUFhLFFBQXRCLE1BQU0sRUFBRTtBQUFDLHlEQUFnRDtBQUM3RCxJQUFhO0FBQWEsUUFBdEIsTUFBTSxFQUFFO0FBQUMseURBQWdEO0FBRTlELElBQWM7QUFBYSxRQUF0QixNQUFNLEVBQUU7QUFBQyw2REFBb0Q7QUFDakUsSUFBYTtBQUFhLFFBQXRCLE1BQU0sRUFBRTtBQUFDLDhEQUFxRDtBQUNsRSxJQUFhO0FBQWEsUUFBdEIsTUFBTSxFQUFFO0FBQUMsNERBQW1EO0lBbEJwRCxvQkFBb0Isd0JBSmhDLFNBQVMsQ0FBQyxjQUNQLFFBQVEsRUFBRSxrQkFBa0IsY0FDNUI7bUVBQTZDLFVBQ2hELENBQUMsUUFDVyxvQkFBb0IsQ0FnUWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFDRDtBQUFDLElBREQsMkJBQUM7QUFDQSxDQURBLEFBaFFELElBZ1FDO0FBQ0QsU0FqUWEsb0JBQW9CO0FBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIGNvbnN0IFRyZWFudDogYW55O1xuZGVjbGFyZSBjb25zdCAkOiBhbnk7XG5cbi8qKlxuICogQSBzaW1wbGUgQW5ndWxhcjIrIGNvbXBvbmVudCB1c2VkIGFzIGEgd3JhcHBlciBmb3IgW1RyZWFudEpTXShodHRwczovL2ZwZXJ1Y2ljLmdpdGh1Yi5pby90cmVhbnQtanMvKSBsaWJyYXJ5XG4gKiBmb3IgdmlzdWFsaXphdGlvbiBvZiB0cmVlIChjaGFydCkgZGlhZ3JhbXMsIHdpdGggYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC10cmVhbnQtY2hhcnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdHJlYW50LWpzLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VHJlYW50SnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKSBjaGFydElkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2hhcnRDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGF0YTogYW55O1xuICAgIEBJbnB1dCgpIHBvcG92ZXJTZXR0aW5nczogYW55O1xuICAgIEBJbnB1dCgpIG1vdXNlbGVhdmVNaWxsaXNlY29uZHM6IG51bWJlcjtcbiAgICBASW5wdXQoKSBpc0RyYWdnYWJsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSB0ZXh0UHJvcHM6IGFueTtcblxuICAgIEBPdXRwdXQoKSBjbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgaG92ZXJlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGRyYWdnZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBkcm9wcGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgdXBkYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgbG9hZGVkTm9kZXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBsb2FkZWRUcmVhbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBsb2FkZWRUcmVlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoY2FsbGJhY2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvcG92ZXJFbG0xO1xuICAgICAgICAgICAgbGV0IHBvcG92ZXJFbG0yO1xuICAgICAgICAgICAgbGV0IHRpbWVvdXQ7XG4gICAgICAgICAgICBsZXQgZHJhZ2dlZE5vZGU7XG4gICAgICAgICAgICBsZXQgZHJvcHBlZE5vZGU7XG5cbiAgICAgICAgICAgIGNvbnN0IF9fdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIGFkZCBpZHMgdG8gbm9kZURPTXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2subm9kZURCLmRiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2subm9kZURCLmRiW2ldLm5vZGVET00uaWQgPSBjYWxsYmFjay5ub2RlREIuZGJbaV0uaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubG9hZGVkVHJlZS5lbWl0KGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgY29uc3QgJG9Ob2RlcyA9ICQoYCMke3RoaXMuY2hhcnRJZH0gLm5vZGVgKTtcblxuICAgICAgICAgICAgLy8gYWRkIHN1cHBvcnQgZm9yIGRyYWcgYW5kIGRyb3AgZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgY29uc3QgYWRkRHJhZ0FuZERyb3BTdXBwb3J0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJG9Ob2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAkb05vZGVzW2ldLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRvTm9kZXNbaV0uY2xhc3NMaXN0LmFkZCgnZHJvcCcpO1xuICAgICAgICAgICAgICAgICAgICAkb05vZGVzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG9Ob2Rlc1tpXS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkb05vZGVzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgYWxsb3dEcm9wLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc3dhcCBub2RlcyBhZnRlciBkcmFnIGFuZCBkcm9wXG4gICAgICAgICAgICBmdW5jdGlvbiBzd2FwTm9kZXMobm9kZXMsIGRyYWdJbmRleCwgZHJvcEluZGV4KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IG5vZGVzW2RyYWdJbmRleF07XG4gICAgICAgICAgICAgICAgY29uc3QgZHJhZ0Nsb25lID0geyAuLi50ZW1wIH07XG4gICAgICAgICAgICAgICAgY29uc3QgZHJvcENsb25lID0geyAuLi5ub2Rlc1tkcm9wSW5kZXhdIH07XG5cbiAgICAgICAgICAgICAgICBub2Rlc1tkcmFnSW5kZXhdID0gbm9kZXNbZHJvcEluZGV4XTtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcm9wSW5kZXhdID0gdGVtcDtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBkcmFnZ2VkIG5vZGUgcHJvcHNcbiAgICAgICAgICAgICAgICBub2Rlc1tkcmFnSW5kZXhdLmlkID0gZHJhZ0Nsb25lLmlkO1xuICAgICAgICAgICAgICAgIG5vZGVzW2RyYWdJbmRleF0ubm9kZURPTS5pZCA9IGRyYWdDbG9uZS5pZDtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcmFnSW5kZXhdLnBhcmVudElkID0gZHJhZ0Nsb25lLnBhcmVudElkO1xuICAgICAgICAgICAgICAgIG5vZGVzW2RyYWdJbmRleF0uY2hpbGRyZW4gPSBkcmFnQ2xvbmUuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgbm9kZXNbZHJhZ0luZGV4XS5jb25uU3R5bGUgPSBkcmFnQ2xvbmUuY29ublN0eWxlO1xuICAgICAgICAgICAgICAgIG5vZGVzW2RyYWdJbmRleF0uc3RhY2tDaGlsZHJlbiA9IGRyYWdDbG9uZS5zdGFja0NoaWxkcmVuO1xuICAgICAgICAgICAgICAgIG5vZGVzW2RyYWdJbmRleF0uc3RhY2tQYXJlbnRJZCA9IGRyYWdDbG9uZS5zdGFja1BhcmVudElkO1xuICAgICAgICAgICAgICAgIG5vZGVzW2RyYWdJbmRleF0uc3RhY2tQYXJlbnQgPSBkcmFnQ2xvbmUuc3RhY2tQYXJlbnQ7XG4gICAgICAgICAgICAgICAgbm9kZXNbZHJhZ0luZGV4XS5sZWZ0TmVpZ2hib3JJZCA9IGRyYWdDbG9uZS5sZWZ0TmVpZ2hib3JJZDtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcmFnSW5kZXhdLnJpZ2h0TmVpZ2hib3JJZCA9IGRyYWdDbG9uZS5yaWdodE5laWdoYm9ySWQ7XG4gICAgICAgICAgICAgICAgbm9kZXNbZHJhZ0luZGV4XS5jb2xsYXBzZWQgPSBkcmFnQ2xvbmUuY29sbGFwc2VkO1xuICAgICAgICAgICAgICAgIG5vZGVzW2RyYWdJbmRleF0uY29sbGFwc2FibGUgPSBkcmFnQ2xvbmUuY29sbGFwc2FibGU7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZHJvcHBlZCBub2RlIHByb3BzXG4gICAgICAgICAgICAgICAgbm9kZXNbZHJvcEluZGV4XS5pZCA9IGRyb3BDbG9uZS5pZDtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcm9wSW5kZXhdLm5vZGVET00uaWQgPSBkcm9wQ2xvbmUuaWQ7XG4gICAgICAgICAgICAgICAgbm9kZXNbZHJvcEluZGV4XS5wYXJlbnRJZCA9IGRyb3BDbG9uZS5wYXJlbnRJZDtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcm9wSW5kZXhdLmNoaWxkcmVuID0gZHJvcENsb25lLmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIG5vZGVzW2Ryb3BJbmRleF0uY29ublN0eWxlID0gZHJvcENsb25lLmNvbm5TdHlsZTtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcm9wSW5kZXhdLnN0YWNrQ2hpbGRyZW4gPSBkcm9wQ2xvbmUuc3RhY2tDaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcm9wSW5kZXhdLnN0YWNrUGFyZW50ID0gZHJvcENsb25lLnN0YWNrUGFyZW50O1xuICAgICAgICAgICAgICAgIG5vZGVzW2Ryb3BJbmRleF0uc3RhY2tQYXJlbnRJZCA9IGRyb3BDbG9uZS5zdGFja1BhcmVudElkO1xuICAgICAgICAgICAgICAgIG5vZGVzW2Ryb3BJbmRleF0ubGVmdE5laWdoYm9ySWQgPSBkcm9wQ2xvbmUubGVmdE5laWdoYm9ySWQ7XG4gICAgICAgICAgICAgICAgbm9kZXNbZHJvcEluZGV4XS5yaWdodE5laWdoYm9ySWQgPSBkcm9wQ2xvbmUucmlnaHROZWlnaGJvcklkO1xuICAgICAgICAgICAgICAgIG5vZGVzW2Ryb3BJbmRleF0uY29sbGFwc2VkID0gZHJvcENsb25lLmNvbGxhcHNlZDtcbiAgICAgICAgICAgICAgICBub2Rlc1tkcm9wSW5kZXhdLmNvbGxhcHNhYmxlID0gZHJvcENsb25lLmNvbGxhcHNhYmxlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBoaWRlUG9wb3ZlcigpIHtcbiAgICAgICAgICAgICAgICAkKHBvcG92ZXJFbG0xKS5wb3BvdmVyKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgJChwb3BvdmVyRWxtMikucG9wb3ZlcignaGlkZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBkcmFnKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZHJhZ2dlZE5vZGUgPSBjYWxsYmFjay5ub2RlREIuZGIuZmluZCgobikgPT4gbi5pZCA9PSAkKHRoaXMpLmF0dHIoJ2lkJykpO1xuXG4gICAgICAgICAgICAgICAgaGlkZVBvcG92ZXIoKTtcblxuICAgICAgICAgICAgICAgIF9fdGhpcy5kcmFnZ2VkLmVtaXQoeyBkcmFnZ2VkTm9kZSwgJCB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZHJvcChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZHJvcHBlZE5vZGUgPSBjYWxsYmFjay5ub2RlREIuZGIuZmluZCgobikgPT4gbi5pZCA9PSAkKHRoaXMpLmF0dHIoJ2lkJykpO1xuXG4gICAgICAgICAgICAgICAgaGlkZVBvcG92ZXIoKTtcblxuICAgICAgICAgICAgICAgIF9fdGhpcy5kcm9wcGVkLmVtaXQoeyBkcmFnZ2VkTm9kZTogZHJvcHBlZE5vZGUsIGRyb3BwZWROb2RlOiBkcmFnZ2VkTm9kZSwgJCB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRyYWdJbmRleCA9IGNhbGxiYWNrLm5vZGVEQi5kYi5maW5kSW5kZXgoKG4pID0+IG4uaWQgPT0gZHJhZ2dlZE5vZGUuaWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRyb3BJbmRleCA9IGNhbGxiYWNrLm5vZGVEQi5kYi5maW5kSW5kZXgoKG4pID0+IG4uaWQgPT0gZHJvcHBlZE5vZGUuaWQpO1xuXG4gICAgICAgICAgICAgICAgc3dhcE5vZGVzKGNhbGxiYWNrLm5vZGVEQi5kYiwgZHJhZ0luZGV4LCBkcm9wSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sucG9zaXRpb25UcmVlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFsbG93RHJvcChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRleHRWYWwoY3VycmVudEVsZSwgdmFsdWUsIGNsYXNzVmFsLCBub2RlLCBwcm9wTmFtZSkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RleHRVcGRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgJChjdXJyZW50RWxlKS5odG1sKFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwiaW5wdXQtZmllbGRcIiBzdHlsZT1cIndpZHRoOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJChjdXJyZW50RWxlKS53aWR0aCgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdweDtcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCIvPidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICQoJy5pbnB1dC1maWVsZCcpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgJCgnLmlucHV0LWZpZWxkJykua2V5dXAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRDbGFzcyA9ICQoZXZlbnQudGFyZ2V0KS5hdHRyKCdjbGFzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSAkKCcuaW5wdXQtZmllbGQnKS52YWwoKSA/ICQoJy5pbnB1dC1maWVsZCcpLnZhbCgpIDogdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3VycmVudEVsZSkuaHRtbCgnPHAgY2xhc3M9XCInICsgY2xhc3NWYWwgKyAnXCI+JyArIG5ld1ZhbHVlICsgJzwvcD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dENsYXNzID09PSAnaW5wdXQtZmllbGQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUZXh0VXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudGV4dFtwcm9wTmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLndpZHRoID0gJChjdXJyZW50RWxlKS53aWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5wb3NpdGlvblRyZWUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgX190aGlzLnVwZGF0ZWQuZW1pdCh7IG5vZGUsICQgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5hdHRyKCdjbGFzcycpICE9PSAnaW5wdXQtZmllbGQnICYmICFpc1RleHRVcGRhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9ICQoJy5pbnB1dC1maWVsZCcpLnZhbCgpID8gJCgnLmlucHV0LWZpZWxkJykudmFsKCkgOiB2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdXJyZW50RWxlKS5odG1sKCc8cCBjbGFzcz1cIicgKyBjbGFzc1ZhbCArICdcIj4nICsgbmV3VmFsdWUgKyAnPC9wPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRleHRbcHJvcE5hbWVdID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS53aWR0aCA9ICQoY3VycmVudEVsZSkud2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sucG9zaXRpb25UcmVlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF9fdGhpcy51cGRhdGVkLmVtaXQoeyBub2RlLCAkIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaXNEcmFnZ2FibGUgJiYgYWRkRHJhZ0FuZERyb3BTdXBwb3J0KCk7XG5cbiAgICAgICAgICAgICRvTm9kZXMub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBjYWxsYmFjay5ub2RlREIuZGIuZmluZCgobikgPT4gbi5pZCA9PSAkKHRoaXMpLmF0dHIoJ2lkJykpO1xuXG4gICAgICAgICAgICAgICAgaGlkZVBvcG92ZXIoKTtcblxuICAgICAgICAgICAgICAgIF9fdGhpcy5jbGlja2VkLmVtaXQoeyBub2RlLCAkIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRvTm9kZXMub2ZmKCdkYmxjbGljaycpLm9uKCdkYmxjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5hdHRyKCdjbGFzcycpICE9PSAnaW5wdXQtZmllbGQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBjYWxsYmFjay5ub2RlREIuZGIuZmluZCgobikgPT4gbi5pZCA9PSAkKHRoaXMpLmF0dHIoJ2lkJykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50RWxlID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoZXZlbnQudGFyZ2V0KS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzVmFsID0gJChldmVudC50YXJnZXQpLmF0dHIoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BOYW1lID0gY2xhc3NWYWwgJiYgY2xhc3NWYWwuc3BsaXQoJy0nKVsxXTtcblxuICAgICAgICAgICAgICAgICAgICBoaWRlUG9wb3ZlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIG5vZGUudGV4dCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS50ZXh0W3Byb3BOYW1lXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGV4dFZhbChjdXJyZW50RWxlLCB2YWx1ZSwgY2xhc3NWYWwsIG5vZGUsIHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgJG9Ob2Rlcy5wb3BvdmVyKHRoaXMucG9wb3ZlclNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAkb05vZGVzXG4gICAgICAgICAgICAgICAgICAgIC5vZmYoJ21vdXNlZW50ZXInKVxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZVBvcG92ZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3ZlckVsbTEgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBvcG92ZXIoJ3Nob3cnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGNhbGxiYWNrLm5vZGVEQi5kYi5maW5kKChuKSA9PiBuLmlkID09ICQodGhpcykuYXR0cignaWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3RoaXMuaG92ZXJlZC5lbWl0KHsgbm9kZSwgJCB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucG9wb3ZlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9mZignbW91c2VsZWF2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlUG9wb3ZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAub2ZmKCdtb3VzZWxlYXZlJylcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBob3ZlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3BvdmVyRWxtMiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wb3BvdmVyJykuaG92ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJCgnLnBvcG92ZXI6aG92ZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFob3ZlcmVkICYmIGhpZGVQb3BvdmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgX190aGlzLm1vdXNlbGVhdmVNaWxsaXNlY29uZHMgfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBlbWl0IFRyZWUgbm9kZXNcbiAgICAgICAgICAgIHRoaXMubG9hZGVkTm9kZXMuZW1pdCh7IG5vZGVzOiBjYWxsYmFjay5ub2RlREIuZGIsICQgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY3JlYXRlIFRyZWFudCBpbnN0YW5jZSBhbmQgYWRkIGl0cyBjb250YWluZXIgSURcbiAgICAgICAgLy8gdGhpcyBpbnN0YW5jZSBjYW4gYmUgdXNlZnVsIHRvIG9wZXJhdGUgb24gdGhlIFRyZWVcbiAgICAgICAgY29uc3QgdHJlYW50ID0gbmV3IFRyZWFudCh0aGlzLmRhdGEsIGNhbGxiYWNrLCAkKTtcbiAgICAgICAgdHJlYW50LmNvbnRhaW5lcl9pZCA9IHRoaXMuY2hhcnRJZDtcbiAgICAgICAgdGhpcy5sb2FkZWRUcmVhbnQuZW1pdCh0cmVhbnQpO1xuICAgIH1cbn1cbiJdfQ==