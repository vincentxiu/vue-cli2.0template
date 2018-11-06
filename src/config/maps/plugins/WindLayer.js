define([
    "dojo/_base/declare", "dojo/_base/connect", "dojo/_base/array",
    "dojo/dom-construct", "dojo/dom-style", "dojo/number",
    "esri/lang", "esri/domUtils",
    "esri/SpatialReference", "esri/geometry/Point", "esri/layers/layer", "extlayers/RasterLayer",

], function (declare, connect, arrayUtils,
             domConstruct, domStyle, number,
             esriLang, domUtils,
             SpatialReference, Point, Layer, RasterLayer) {
    var _this = null
    var RL = declare([RasterLayer], {
        // Doc: http://docs.dojocampus.org/dojo/declare#chaining
        "-chains-": {
            constructor: "manual"
        },

        constructor: function (data, options) {
            // Manually call superclass constructor with required arguments
            this.inherited(arguments, ["http://some.server.com/path", options]);
            _this = this
            this.data = data;
            this.map = options.map
            this.options = options;
            this.loaded = true;
            this.isClear = false
            this.onLoad(this);

        },
        _setMap: function (map, container) {
            this._map = map;

            var element = this._canvas = domConstruct.create("canvas", {
                id: "canvas",
                width: map.width + "px",
                height: map.height + "px",
                style: "position: absolute; left: 0px; top: 0px;"
            }, container);

            if (esriLang.isDefined(this.opacity)) {
                domStyle.set(element, "opacity", this.opacity);
            }

            this._context = element.getContext("2d");
            if (!this._context) {
                console.error("This browser does not support <canvas> elements.");
            }

            this._mapWidth = map.width;
            this._mapHeight = map.height;

            // Event connections
            this._connects = [];
            this._connects.push(connect.connect(map, "onPan", this, this.redraw));
            this._connects.push(connect.connect(map, "onExtentChange", this, this.redraw));
            this._connects.push(connect.connect(map, "onZoomStart", this, this.redraw));
            this._connects.push(connect.connect(this, "onVisibilityChange", this, this.redraw));
            this.render()
            return element;
        },
        _unsetMap: function (map, container) {
             arrayUtils.forEach(this._connects, connect.disconnect, this);
            if (this._canvas) {
                container.removeChild(this._canvas);
            }
            this._map = this._canvas = this._context = this.data = this._connects = null;
        },
        refresh: function () {
            if (!this._canDraw()) {
                return;
            }
        },
        clear: function () {
            if (!this._canDraw()) {
                return;
            }

            this._context.clearRect(0, 0, this._mapWidth, this._mapHeight);
        },
        _canDraw: function () {
            return (this._map && this._canvas && this._context) ? true : false;
        },
        _panHandler: function (extent, delta) {
            domStyle.set(this._canvas, {left: delta.x + "px", top: delta.y + "px"});
        },
        _extentChangeHandler: function (extent, delta, levelChange, lod) {
            if (!levelChange) {
                domStyle.set(this._canvas, {left: "0px", top: "0px"});
                this.clear();
            }
        },
        _visibilityChangeHandler: function (visible) {
            if (visible) {
                domUtils.show(this._canvas);
            }
            else {
                domUtils.hide(this._canvas);
            }
        },
        render: function () {
            const extent = this._getExtent()
            if (this._canvas && !this.$Wind) {
                this.$Wind = new Windy({
                    canvas: this._canvas,
                    data: this.data,
                    projection: this.options.projection
                });
                this.$Wind.start(extent[0], extent[1], extent[2], extent[3])
            } else if (this._canvas && this.$Wind) {
                this.$Wind.start(extent[0], extent[1], extent[2], extent[3])
            }
        },
        _getExtent: function () {
            var extent = _this.map.geographicExtent;

            return [[[0, 0], [_this.map.width, _this.map.height]],
                _this.map.width,
                _this.map.height,
                [[extent.xmin, extent.ymin], [extent.xmax, extent.ymax]]]
        },
        redraw() {
            _this.$Wind.stop();
            _this._canvas.width = _this.map.width;
            _this._canvas.height = _this.map.height;
            const extent = _this._getExtent()
            setTimeout(function () {
                _this.$Wind.start(extent[0], extent[1], extent[2], extent[3])
            }, 500)

        },
        getData: function () {
            return this.data
        },
        setData: function (data) {
            const _map = this.getMap()
            if (!_map) return this
            this.data = data
            this.isClear = false

           if (this._canvas) {
                renderWind.bind(this)()
            }

            function renderWind() {
                if (!this.$Wind) {
                    this.render(this._canvas)
                } else if (this.$Wind) {
                    const extent = this._getExtent()
                    this.$Wind.update(this.getData(), extent[0], extent[1], extent[2], extent[3])
                }
            }

            return this
        },
        getMap: function () {
            return _this.map
        },
        clearWind() {
            const _map = _this.getMap()
            if (!_map) return
            if (this.$Wind) this.$Wind.stop()
            this.isClear = true
            this._cloneLayer = this
            _map.removeLayer(this)
        },
        removeLayer: function () {
            const _map = _this.getMap()
            if (!_map) return
            if (_this.$Wind) _this.$Wind.stop()
            if (_this._connects && _this._connects.length > 0) {
                _this._connects.map(function (item) {
                    item.remove();
                    item = null
                })
            }
            _map.removeLayer(this)
            delete this._canvas
            delete this.$Wind
            delete this._cloneLayer
        }
    });

    return RL;
});
