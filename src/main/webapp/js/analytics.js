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
		// config
		clientConfig : {
			serverUrl : "http://node2/log.gif",
			sessionTimeout : 360, // 360s -> 6min
			maxWaitTime : 3600, // 3600s -> 60min -> 1h
			ver : "1"
		},
		
		cookieExpiresTime : 315360000000, // cookie过期时间，10年
		
		columns : {
			// 发送到服务器的列名称
			eventName : "en",
			version : "ver",
			platform : "pl",
			sdk : "sdk",
			uuid : "u_ud",
			memberId : "u_mid",
			sessionId : "u_sd",
			clientTime : "c_time",
			language : "l",
			userAgent : "b_iev",
			resolution : "b_rst",
			currentUrl : "p_url",
			referrerUrl : "p_ref",
			title : "tt",
			orderId : "oid",
			orderName : "on",
			currencyAmount : "cua",
			currencyType : "cut",
			paymentType : "pt",
			category : "ca",
			action : "ac",
			kv : "kv_",
			duration : "du"
		},
		
		keys : {
			pageView : "e_pv",
			chargeRequestEvent : "e_crt",
			launch : "e_l",
			eventDurationEvent : "e_e",
			sid : "bftrack_sid",
			uuid : "bftrack_uuid",
			mid : "bftrack_mid",
			preVisitTime : "bftrack_previsit",
		},
		
		/**
		* 获取会话id
		 */
	
		getSid : function() {
			return CookieUtil.get(this.keys.sid)
		},
		
		/**
		* 保存会话id到cookie
		 */
		setSid : function(sid) {
			if (sid) {
				CookieUtil.setExt(this.keys.sid, sid);
			}
		},
		
		/**
		* 获取uuid，从cookie中
		 */
		getUuid : function() {
			return CookieUtil.get(this.keys.uuid);
		},
		
		/**
		* 保存uuid到cookie
		 */
		setUuid : function(uuid) {
			if (uuid) {
				CookieUtil.setExt(this.keys.uuid, uuid);
			}
		},
		
		/**
		* 获取memberID
		*/
		getMemberId : function() {
			return CookieUtil.get(this.keys.mid);
		},
		
		/**
		* 设置mid 
		*/
		setMemberId : function(mid) {
			if (mid) {
				CookieUtil.setExt(this.keys.mid,, mid);
			}
		},
		
		startSession : function() {
			// 加载js就触发的方法
			if (this.getSid()) {
				// 会话id存在，表示uuid也存在
				if (this.isSessionTimeout()) {
					// 会话过期，产生新的会话
					this.createNewSession();
				} else {
					// 会话没有过期，更新最近访问时间
					this.updatePreVisitTime(new Date().getTime());
				}
			} else {
				// 会话id不存在，表示uuid也不存在
				this.creatNewSession();
			}
			this.onPageView();
		},
		
		onLaunch : function(){
			// 触发launch事件
			var launch = {};
			launch[this.columns.eventName] = this.keys.launch; // 设置事件名称
			this.setCommonColums(launch); // 设置公用columns
			this.sendDataToServer(this.parseParam(launch)); // 最终发送编码后的数据
		},
		
		onPageView : function() {
			// 触发page view事件
			if (this.preCallApi()) {
				var time = new Date().getTime();
				var pageviewEvent = {};
				pageviewEvent[this.columns.eventName] = this.keys.pageView;
				pageviewEvent[this.columns.currentUrl] = window.location.href; // 设置当前url
				pageviewEvent[this.columns.referrerUrl] = document.referrer; // 设置前一个页面的url
				pageviewEvent[this.columns.title] = document.title; // 设置title
				this.setCommonColumns(pageviewEvent); // 设置公用columns
				this.sendDataToServer(this.parseParam(pageviewEvent)); // 最终发送编码后的数据
				this.updatePreVisitTime(time);
			}
		},
		
		onChargeRequest : function(orderId, name, currencyAmount, currencyType, paymentType) {
			// 触发订单产生事件
			
		},
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