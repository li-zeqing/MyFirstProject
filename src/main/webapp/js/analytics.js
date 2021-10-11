(function(){
	var CookieUtil = {
		// get the cookie of the key is name
		get : function(name) {
			var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie
					.indexOf(cookieName), cookieValue = null;
			if (cookieStart > -1) {
				var cookieEnd = document.cookie.indexOf(";", cookieStart);
				if (cookieEnd = -1){
					cookieEnd = document.cookie.length;
				}
				cookieValue = decodeURIComponent(document.cookie.substring(
						cookieStart + cookieName.length, cookieEnd));
			}
			return cookieValue;
		},
		// set the name/value pair to browser cookie
		set : function(name, value, expires, path, domain, secure){
			var cookieText = encodeURIComponent(name) + "="
					+ encodeURIComponent(value);
			
			if (expires) {
				//set the expires time
				var expiresTime = new Date();
				expiresTime.setTime(expires);
				cookieText += ";expires=" + expiresTime.toGMTString();
			}
			
			if (path) {
				cookieText += ";path=" + path;
			}
			
			if (domain) {
				cookieText += ";domain=" + domain;
			}
			
			if(secure) {
				cookieText += ";secure";
			}
			
			document.cookie = cookieText;
		},
		setExt : function(name, value) {
			this.set(name, value, new Date().getTime() + 315360000000, "/");
		}
	};
	
	// 主体，其实就是tracker js
	var tracker = {
		
	};
	
	// 对外暴露的方法名称
	window.__AE__ = {
		
	};
	
	// 自动加载方法
	var autoLoad = function() {
		
	};
	
	autoLoad();
})();
/**
 * 
 */