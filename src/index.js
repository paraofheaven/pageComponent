import page from "./pagecomponent.js";

page.getInstance({
    page: 1,
    limit: 10,
    containerId: 'page',
    onchange: function(){}
    // this.request.bind(this)
}).render();
// .setParameters(this.getParams()).render();