(function(){
	if(!window.nbug){window['nbug'] = {};}
	
	function nbugLogger (id) {
		id = id || 'NBUGLogWindow';
		var logWindow = null;//私有
		var createWindow = function(){
			var browserWindowSize = nbug.getBrowserWindowSize();
			var top = ((browserWindowSize.height - 200)/2) || 0;
			var left = ((browserWindowSize.width - 200)/2) || 0;
			//dom
			logWindow = document.createElement('UL');
			//id
			logWindow.setAttribute('id',id);
			//position
			logWindow.style.position = 'absolute';
			logWindow.style.top = top + 'px';
			logWindow.style.left = left + 'px';
			//size
			logWindow.style.width = '200px';
			logWindow.style.height = '200px';
			logWindow.style.overflow = 'scroll';
			//style
			logWindow.style.padding = '0';
			logWindow.style.margin = '0';
			logWindow.style.border = '1px solid black';
			logWindow.style.backgroundColor = 'white';
			logWindow.style.listStyle = 'none';
			logWindow.style.font = '10px/10px Verdana,Tahoma,Sans';
			//
			document.body.appendChild(logWindow);
		};//私有
		this.writeRaw = function(message) {
			if(!logWindow){createWindow();}
			
			var li = document.createElement('LI');
			li.style.padding = '2px';
			li.style.border = '0';
			li.style.borderBottom = '1px dotted black';
			li.style.margin = '0';
			li.style.color = '#000';
			li.style.font = '9px/9px Verdana,Tahoma,Sans';
			//
			if(typeof message == 'undefined'){
				li.appendchild(document.createTextNode('Message was undefined'));
			}else if(typeof li.innerHTML != 'undefined'){
				li.innerHTML = message;
			}else{
				li.appendchild(document.createTextNode(message));
			}
			logWindow.appendChild(li);
			return true;
		};//特权方法
	}
	nbugLogger.prototype = {
		write:function(message){
			if(typeof message == 'string' && message.length == 0){
				return this.writeRaw('nbug.log:null message');
			}
			if(typeof message != 'string'){
				if(message.toString){
					return this.writeRaw(message.toString());
				}else{
					return this.writeRaw(typeof message);
				}
			}
			message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;");
			return this.writeRaw(message);
		},//公有的
		header:function(message){
			message = '<span style="color:red;backgrount-color:black;font-weight:bold;padding:0px 5px;">'
							+ message
							+	'</span>';
			return this.writeRaw(message);
		}
	};
		
	window['nbug']['log'] = new nbugLogger();
	
})();