import $ from "./jquery.min.js";

let page =(function(){
	var instance =null;

	function getInstance(opts) {
        if (instance == null) {
            instance = new Page(opts);
        }
        return instance;
    }

    function Page(opts){
    	this.page =opts.page || 1;
    	this.total = opts.total || 0;
        this.limit = opts.limit || 10;
        this.params = {};
        if (opts.containerId) {
            this.$container = $("#" + opts.containerId);
        } else if (opts.containerClass) {
            this.$container = $("." + opts.containerClass);
        }
        this.onchange = opts.onchange || function() {};
    }

    Page.prototype.setParameters = (params)=> {
        this.params = params;
        return this;
    };

    Page.prototype.getParameters = ()=> this.params;

    Page.prototype.setParameter = (key, value)=>{
        this[key] = value;
    };
    Page.prototype.getParameter = (key) =>this[key];

    Page.prototype.render = ()=>{
        var pageTmpl = [
            '<ul class="dis-pagination">',
            '<li class="oper-previous"><a href="javascript: void(0);" class="previous">上一页</a></li>',
            '<li class="oper-next"><a href="javascript: void(0);" class="next">下一页</a></li>',
            '</ul>'
        ];
        this.$container.empty().append(pageTmpl.join(''));
        this.$container.hide();
        this._bindEvent();
        this.go(1);
    };
    Page.prototype._bindEvent = ()=>{
	    this.$container.find('li a').unbind('click');
	    this.$container.delegate('li a', 'click', (e)=>{
	        var $target = $(e.target);
	        if($target.hasClass('active')){
	            return false;
	        }
	        if ($target.hasClass('previous')) {
	            if (this.page <= 1) {
	                return false;
	            } else {
	                this.go(--this.page);
	            }
	        } else if ($target.hasClass('next')) {
	            if (this.page == this.total) {
	                return false;
	            } else {
	                this.go(++this.page);
	            }
	        } else if($target.attr('data-page')){
	            this.go(parseInt($target.attr('data-page')));
	        }
	        return true;
	    });
	};
    Page.prototype.go = (page) =>{
        this.params = this.params || {};
        this.page = page || this.page;
        this.params.page = this.page;
        this.params.start = this.limit * (this.page - 1);
        this.params.limit = this.limit;
        this.onchange(this.params, (total)=> {
            this.total = Math.ceil(total / this.limit);
            if (this.total == 0) {
                this.page = 0;
            }else{
                if(this.page > this.total){
                    this.page = this.total;
                    this.go(this.total);
                }
            }
            this._change();
        });
    };
    Page.prototype._change = ()=> {
	    var $previous = this.$container.find('.previous');
	    var $next = this.$container.find('.next');
	    $previous.removeClass('disabled');
	    $next.removeClass('disabled');

	    if (this.page <= 1) {
	        $previous.addClass('disabled');
	    }

	    if (this.total == 0 || this.total == this.page) {
	        $next.addClass('disabled');
	    }
	    this.$container.find('li:not(.oper-previous,.oper-next)').remove();
	    var pages = [];
	    if(this.page > 0 && this.total > 0){
	        this.$container.show();
	        if (this.total > 10) {
	            if (this.page <= 4) {
	                for (var i = 0; i < this.page + 2; i++) {
	                    if (this.page == i + 1) {
	                        pages.push('<li><a href="javascript: void(0);" class="active">' + this.page + '</a></li>');
	                    } else {
	                        pages.push('<li><a href="javascript: void(0);" data-page="' + (i + 1) + '">' + (i + 1) + '</a></li>');

	                    }
	                }
	                pages.push('<li> ... </li>');
	                pages.push('<li><a href="javascript: void(0);" data-page="' + this.total + '">' + this.total + '</a></li>');

	            } else if (this.page + 4 >= this.total) {
	                pages.push('<li><a href="javascript: void(0);" data-page="1">1</a></li>');
	                pages.push('<li> ... </li>');
	                for (i = this.page - 4; i < this.total; i++) {
	                    if (this.page == i + 1) {
	                        pages.push('<li><a href="javascript: void(0);" class="active">' + this.page + '</a></li>');
	                    } else {
	                        pages.push('<li><a href="javascript: void(0);" data-page="' + (i + 1) + '">' + (i + 1) + '</a></li>');
	                    }
	                }
	            } else {
	                pages.push('<li><a href="javascript: void(0);" data-page="1">1</a></li>');
	                pages.push('<li> ... </li>');
	                for (i = this.page - 3; i < this.page + 2; i++) {
	                    if (this.page == i + 1) {
	                        pages.push('<li><a href="javascript: void(0);" class="active">' + this.page + '</a></li>');
	                    } else {
	                        pages.push('<li><a href="javascript: void(0);" data-page="' + (i + 1) + '">' + (i + 1) + '</a></li>');
	                    }
	                }
	                pages.push('<li> ... </li>');
	                pages.push('<li><a href="javascript: void(0);" data-page="' + this.total + '">' + this.total + '</a></li>');
	            }
	        } else {
	            for (var p = 0; p < this.total; p++) {
	                if (this.page == p + 1) {
	                    pages.push('<li><a href="javascript: void(0);" class="active">' + this.page + '</a></li>');
	                } else {
	                    pages.push('<li><a href="javascript: void(0);" data-page="' + (p + 1) + '">' + (p + 1) + '</a></li>');
	                }
	            }
	        }
	        $previous.parent().after(pages.join(''));
	    }else{
	        this.$container.hide();
	    }
	};
	return {
        getInstance: getInstance
    };

})();

export {page};