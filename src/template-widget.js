define(function(require, exports, module) {

    // Template Widget
    // --------------------------------------------------
    // 模板类 UI 组件的基类，默认集成了 Handlebars 等功能


    var Widget = require('./widget');
    var Handlebars = require('handlebars');
    var $ = require('$');


    var TemplateWidget = Widget.extend({

        // Handlebars 的 helpers
        helpers: null,

        options: {
            // 组件的默认父节点
            parentNode: document.body
        },

        // 根据配置的模板和传入的数据，构建 this.element
        parseElementFromTemplate: function() {
            var helpers = this.helpers;

            // 注册 helpers
            if (helpers) {
                for (var name in helpers) {
                    Handlebars.registerHelper(name, helpers[name]);
                }
            }

            // 生成 html
            var html = Handlebars.compile(this.options.template)(this.model);

            // 卸载 helpers
            if (helpers) {
                for (name in helpers) {
                    delete Handlebars.helpers[name];
                }
            }

            this.element = $(html);
        },

        render: function() {
            if (this.options.parentNode) {
                this.element.appendTo(this.options.parentNode);
            }
            return this;
        }
    });

    module.exports = TemplateWidget;

});
