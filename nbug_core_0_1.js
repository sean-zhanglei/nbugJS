(function(){
	if(! window.nbug){window['nbug'] = {};}
	

	/*window['nbug']['node'] = {
			Node.ELEMENT_NODE:1,
			Node.ATTRIBUTE_NODE:2,
			Node.TEXT_NODE:3,
			Node.CDATA_SECTION_NODE:4,
			Node.ENTITY_REFERENCE_NODE:5,
			Node.ENTITY_NODE:6,
			Node.PROCESSING_INSTRUCTION_NODE:7,
//			Node.COMMENT_NODE:8,
			Node.DOCUMENT_NODE:9,
			Node.DOCUMENT_TYPE_NODE:10,
//			Node.DOCUMENT_FRAGMENT_NODE:11,
			Node.NOTATION_NODE:12
	
	};*/
	
	//作用域链和闭包是核心概念
	function isCompatible(other){
		if(other === false
				|| !Array.prototype.push
				|| !Object.hasOwnProperty
				|| !document.createElement
				|| !document.getElementsByTagName
				){
				return false;
			}
			return true;
	};
	window['nbug']['isCompatible'] = isCompatible;
	
	function $() {
		var elements = new Array();
		
		for(var i = 0;i < arguments.length;i++){
				var element = arguments[i];
				if (typeof element == 'string') {
					element = document.getElementByI(element);
				}	
				if(arguments.length == 1){
					return element;	
				}
				elements.push(element);
			}
			return elements;
	};
	window['nbug']['$'] = $;
	
	function addEvent (node,type,listener) {
		//
		if(! isCompatible()){return false;}
		//
		if(!(node = $(node))){return false;}
		//
		if(node.addEventListener){
			//W3C
			node.addEventListener(type,listener,false);
			return true;	
		}else if(node.attachEvent){
			//MSIE
			node['e'+type+listener] = listener;
			node[type+listener] = function  () {
				node['e'+type+listener](window.event);
			}
			node.attachEvent('on'+type,node[type+listener]);
		}
		return false;
		
	};
	window['nbug']['addEvent'] = addEvent;
	
	function addLoadEvent (loadEvent,waitForImages) {
		if(!isCompatible())return false;
		
		if (waitForImages) {
			return addEvent(window,'load',loadEvent);
		}
		
		var init = function(){
			if (arguments.callee.done) {
				return;
			}
			arguments.callee.done = true;
			loadEvent.apply(document,arguments);
		};
		//w3c
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded",init,false);
		}
		//Safari
		if (/WebKit/i.test(navigator.userAgent)) {
			var _timer = setInterval(function(){
				if(/loaded|complete/.test(document.readyState)){
					clearInterval(_timer);
					init();
				}	
			},10);
		}
		//ie条件注释
		/*cc_on @*/
		/*@if (@_win32)
		document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
		var script = document.getElementById("__ie_onload");
		script.onreadystatechange = function(){
			if (this.readyState == 'complete') {
				init();
			}
		};
		/*@end @*/
		return true;
	};
	window['nbug']['addLoadEvent'] = addLoadEvent;
	
	function removeEvent (node,type,listener) {
		//
		if(!(node = $(node))){return false;}
		//
		if(node.removeEventListener){
			//W3C
			node.removeEventListener(type,listener,false);
			return true;
		}else if(node.detachEvent){
			//MSIE
			node.detachEvent('on'+type,node[type+listener]);
			node[type+listener] = null;
			return true;
		}
		
		return false;
	};
	window['nbug']['removeEvent'] = removeEvent;
	
	function getElementsByClassName (classname,tag,parent) {
		parent = parent || document;
		
		if(!(parent = $(parent))){return false;}
		
		var allTags = (tag == '*' && parent.all)?parent.all:parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		
		className = className.replace(/\-/g,"\\-");
		var regex = new RegExp("(^|\\s)"+className+"(\\s|$)");
		
		var element;
		for(var i = 0;i < allTags.length;i++){
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}	
		}
		return matchingElements;
	};
	window['nbug']['getElementsByClassName'] = getElementsByClassName;
	
	function toggleDisplay (node,value) {
		if(!(node = $(node))){return false;}
		
		if(node.style.display != 'none'){
			node.style.display = 'none';
		}else{
			node.style.display = value || '';	
		}
		return true;
	};
	window['nbug']['toggleDisplay'] = toggleDisplay;
	
	function insertAfter (node,referenceNode) {
		if(!(node = $(node))){return false;}
		
		if(!(referenceNode = $(referenceNode))){return false;}
		return referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);
	};
	window['nbug']['insertAfter'] = insertAfter;
	
	function removeChildren (parent) {
		if(!(parent = $(parent))){return false;}
		
		while (parent.firstChild) {
			 // code to be executed
			 parent.firstChild.parentNode.removeChild(parent.firstChild)
		}
		return parent;
	};
	window['nbug']['removeChildren'] = removeChildren;
	
	function prependChild (parent,newChild) {
		if (!(parent = $(parent))) {return false;	}
		if(!(newChild = $(newChild))){return false;}
		
		if(parent.firstChild){
			parent.insertBefore(newChild,parent.firstChild);
		}else{
			parent.appendChild(newChild);
		}
		return parent;
	};
	window['nbug']['prependChild'] = prependChild;
	
	function bindFunction (obj,func) {
		return function(){
			func.apply(obj,arguments);
		};
	};
	window['nbug']['bindFunction'] = bindFunction;
	
	function getBrowserWindowSize () {
		var de = document.documentElement;
		return {
			'width':(window.innerWidth || (de && de.clientWidth) || document.body.clientWidth),
			'height':(window.innerHeight || (de && de.clientHeight) || document.body.clientHeight)
		};
	};
	window['nbug']['getBrowserWindowSize'] = getBrowserWindowSize;
	
	
	
	
	//对象，包含一组变量和函数的集合的实例,字符到函数都是对象,扩展自Object对象
	//大致可分为两种类型，Function对象和Object对象
	//Object
	//var obj = new Object();等价于var obj = {};
	//var arr = new Array();等价于 var arr = [];
	//一:Function实例
	//二:作为构造函数的Function
	//常见内置对象，Object/Function/Array/String/Boolean/Number/Math/Date/RegExp
	//function myMethod(a){}等价于 var myMethod = function(a){};等价于var myMethod = new Function('a','/**/');
	
	//继承
	//var person = {};person.getName = function(){};
	//var employee = {};employee.getName = person.getName;
	
	//不同的浏览器处理DOM对象的方式不一样
	
	//Function对象的特殊之处在于，它的实例也能作为构造器方法
	//function myConstructor (params) {alert(params);this.myparams = params;}
	//var myObject = new myConstructor('hha');
	//alert(myObject.myparams);//myparams在构造函数中无效的，在实例中有效
	
	//添加静态方法
	/*
	var myObject = new Object();
	myObject.name = 'Jeff';
	myObject.alertName = function  () {
		alert(this.name);
	}
	myObject.alertName();//正常
	//myConstructor既是一个实例也是一个构造函数
	var myConstructor = function(){
	}
	myConstructor.name = 'Jeff';
	myConstructor.alertName = function(){
		alert(this.name);
	}
	myConstructor.alertName();//正常
	//
	var ano = new myConstructor();
	ano.alertName();
	//虽然是构造函数，但是name和alertName只是针对当前作为实例的myConstructor而不是作为构造函数创建的实例
	*/
	
	
	//原型（对象的prototype属性）
	//添加公有方法,添加到构造函数底层，而不是当前实例
	/*
	function myConstructor(message){
		alert(message);
		this.myMessage = message;
	}
	myConstructor.prototype.clearMessage = function(string){
		this.myMessage += ''+string;
	}
	var myObject = new myConstructor('hello');
	myObject.cearMessage();
	*/		
	//私有成员，在构造函数中使用var 和function定义
	/*
	function myConstructor (message) {
		this.myMessage = message;
		//私有属性
		var separaor = ' -';
		var myOwner = this;
		//私有方法
		function alertMessage () {
			alert(myOwner.message);
		}
		alertMessage();
	}
	*/
	//特权方法(可以访问私有成员),构造函数作用域中使用this定义的方法
	/*
	function myConstructor(message){
		this.myMessage = message;
		var separator = ' -';
		var myOwner = this;
		function alertMessage () {
			alert(myOwner.myMessage);
		}
		//特权方法
		this.appendToMessage = function(string){
			this.myMessage += separator +string;
			alertMessage();
		}
	}
	
	var myObject = new mConstructor('hello');
	myObject.appendToMessage('Jeff');
	*/
	/*
	1:由于私有和特权成员在函数的内部，所以它们会被带到函数的每个实例中
	2：公有的原型成员是对象蓝图的一部分，是英语通过new关键字实例化的该对象的每一个实例
	3：静态成员只适用于对象的一个特殊实例
	*/
	
	//对象字面量
	/*
	var myObject = {
		propertyA:'value',
		methodA:function(){}
	};
	等价于
	var myObject = new Object();
	myObject.propertyA = 'value';
	myObject.methodA = function(){};
	*/
	//说明
	/*
	function myConstructor(){
	}
	浏览器解析脚本时立即被声明
	var myConstructor = function(){};
	脚本执行到这里时才存在
	
	使用字面量语法添加公有成员
	myConstructor.prototype = {
		propertyA:'value',
		methodA:function(){}
	};
	*/
	//try{},catch{}
	
	//this解释，引用的是包含它的函数作为某个对象的方法被调用时的那个对象
	//你的全部脚本，包括每一点代码都包含在一个名为window的全局对象中
	/*
	this的环境可以随着函数被赋值给不同的对象而改变
	var sound = 'Roar';
	function myOrneryBeast () {
		this.style.color = 'green';
		alert(sound);
	}
	function initPage () {
		var example = nbug.$('example');
		//一
		example.onclick = myOrneryBeast;
		//二
		nbug.addEvent(example,'mouseover',myOrneryBeast);
	}
	nbug.addEvent(window,'load',initPage);
	*/
	/*
	通过call()和apply()重新定义函数的执行环境
	function doubleCheck(){
		this.message = 'are you sure you want to leave';
	}
	doubleCheck.prototype.sayGoodbye = functio(){
		return confirm(this.message);
	}
	initPage(){
		var clickedLink = new doubleCheck();
		var links = document.getElementsByTagName('a');
		for(var i =0 ;i < links.length ;i++){
			nbug.addEvent(links[i],'click,clickedLink.sayGoodbye)';
		}
	}
	nbug.addEvent(window,'load',initPage);
	此时this不在是clickedLink,而是每一个a锚点
	改变执行环境
	clickedink.sayGoodbye.call(window)或者clickedLink.sayGoodbye.apply(window)
	//functionReference.call(object,argument1,argument2....);
	//functionReference.apply(object,arguments);
	例子
	function bindFunction (obj,func) {
		return function(){
			func.apply(obj,arguments);
		}
	}
	*/
	
	
	
	/*
	
	dom 1级 1998.10(Document/Node/Attr/Element/Text/HTMLDocument/HTMLElement/HTMLCollection等对象)
	-dom core(规定一般性的树形节点结构的内部运行机制，创建、编辑和操纵树的方法和属性)
	-dom html（为HTML文档、标签集合等定义了对象、属性、方法）
	-dom xml
	
	dom 2级
	-dom2 core 2000.11(新增针对命名空间的方法等)
	-dom2 html 2003.01（针对HTML4.01和XHTML 1.0新增对象，属性，方法等）
	-dom2 events(鼠标相关事件，不包括键盘)
	-dom2 style
	-dom2 traversal and range（迭代访问dom）
	-dom2 views
	
	dom 3级
	-dom3 core(新增、修改已有的一些方法等)2004
	-dom3 load and save（dom 和 xml相互转化)2004
	-dom3 validation(提供了确保动态生成的文档的有效性)
	-dom3 events(鼠标和键盘)
	-dom3 xpath(使用xpath 1.0查询dom)
	-dom3 views、formatting、abstract schemas、ls、lsAsync
	
	////规范之间相互依存
	
	浏览器支持的规范查询地址http://www.w3.org/2003/02/06-dom-support.html
	
	浏览器解析html文档时，会根据自身支持的W3C DOM模块把标记转换成对象
	ie不会显示空白符（除非空白符在文本字符夹杂），空白符解析成Text对象
	window/Document(window.document)/documentElement(html)/Element/Text等
	
	DOM2 CORE和DOM2 HTML中几乎每一个对象的基础都是Node对象
	
	核心对象Node
	属性：
	nodeName\nodeValue\nodeType\
	parentNode\childNodes\firstChild\lastChild\previousSibling\nextSibling\
	attributes\
	ownerDocument
	
	nodeValue对于有些来说无意义，返回null
	对于不基于文档中标签的其他对象（如Document）来说，nodeName的值取决于引用对象的类型
	
	核心对象的（常量字符串）数字-nodeType-nodeName
	(Node.ELEMENT_NODE)1-Element-元素名称大写，如A
	(Node.ATTRIBUTE_NODE)2-Attr-属性的名称小写
	(Node.TEXT_NODE)3-Text-#text
	(Node.CDATA_SECTION_NODE)4-CDATASection-#cdata-section
	(Node.ENTITY_REFERENCE_NODE)5-EntityReference-实体引用的名称
	(Node.ENTITY_NODE)6-Entity-实体的名称
	(Node.PROCESSING_INSTRUCTION_NODE)7-ProcessingInstruction-目标的名称
	(Node.COMMENT_NODE)8-Comment-#comment
	(Node.DOCUMENT_NODE)9-Document-#document
	(Node.DOCUMENT_TYPE_NODE)10-DocumentType-文档类型的名称，HTML
	(Node.DOCUMENT_FRAGMENT_NODE)11-DocumentFragment-#document fragment
	(Node.NOTATION_NODE)12-Notation-表示法的名称
	
	
	节点的属性被包含在相应节点的attributes成员的一个NamedNodeMap对象(与NodeList对象类似)中
	attributes.item(i).nodeName/nodeValue
	attributes[i].nodeName/nodeValue
	attributes.getNamedItem('href').nodeVlue
	
	getNamedItem与getAttibute方法类似，前者在任何节点上都是有效的，后者针对Element对象
	
	//ownerDocument
	指向节点所属根文档的引用（如window）
	
	方法
	hasChildNodes/hasAttributes(ie没有该方法)
	appendChild/insertBefore
	prependChild/insertAfter(W3C没提供实现，自己实现即可)
	replaceChild/removeChild
	
	核心对象Element,继承自Node
	方法
	getAttribute/setAttribute/removeAttribute/（基于字符串）
	getAttributeNode/setAttributeNode/removeAttributeNode/(基于实际的Attr节点)
	getElementsByTagName
	
	核心对象Document,扩展自Node
	document.documentElement(html)
	创建节点
	createAttribute/createCDATASection/createComment/createDocumentFragment
	createElement/createEntityReference/createProcessingInstruction/createTextNode
	
	查找Element对象
	getElementsByTagName/getElementById
	getElementsByClassName（W3C不包含，只适用于HTML文档不适于xml）
	*/
	
	function warkElementsLinear (func,node) {
		var root = node || window.document;
		var nodes = root.getElementsByTagName("*");
		for(var i = 0;i<nodes.length;i++){
			func.call(nodes[i]);	
		}
	};
	window['nbug']['warkElementsLinear'] = warkElementsLinear; 
	
	function warkTheDOMRecursive(func,node,depth,returnedFromParent){
		var root = node||window.document;
		var returnedFromParent = func.call(root,depth++,returnedFromParent);
		var node = root.firstChild;
		while(node){
			warkTheDOMRecursive(func,node,depth,returnedFromParent);
			node = node.nextSibling;	
		}	
	};
	window['nbug']['warkTheDOMRecursive'] = warkTheDOMRecursive;
	
	function warkTheDOMWithAttributes(node,func,depth,returnedFromParent){
			var root = node || window.document;
			returnedFromParent = func(root,depth++,returnedFromParent);
			if(root.attributes){
				for(var i = 0;i<root.attributes.length;i++){
					warkTheDOMWithAttributes(root.attributes[i],func,depth-1,returnedFromParent);	
				}	
			}
			if(root.nodeType != nbug.node.ATTRIBUTE_NODE){
				node = root.firstChild;
				while(node){
					warkTheDOMWithAttributes(node,func,depth,returnedFromParent);
					node = node.nextSibling;
				}	
			}
	};
	window['nbug']['warkTheDOMWithAttributes'] = warkTheDOMWithAttributes;
	
	
	/*
	DOM2 HTML对象都扩展自核心对象
	
	HTMLDocument对象继承核心Document对象（window.document为实例）
	属性
	title/referrer/domain/URL/body/images/applets/links/forms/anchors/cookie
	以及非规范（frames/plugins/scripts/stylesheets）
	方法
	open/close/write/writeln/getElementsByName
	
	HTMLElement对象
	属性
	id/title/lang/dir/className
	
	HTMLAnchorElement等对象继承HTMLElement
	*/
	if(!String.repeat){
		String.prototype.repeat = function(l){
			return new Array(l+1).join(this);	
		}
	}
	if(!String.trim){
		String.prototype.trim = function(){
			return this.replace(/^\s+|\s+$/g,'');	
		}
	}
	//word-word to wordWord
	function camelize(s){
		return s.replace(/-(\w)/g,function(strMatch,pl){
			return pl.toUpperCase();	
		});
	};
	window['nbug']['camelize'] = camelize;
	
	//事件
	/*
	1：对象事件（js对象以及dom对象）
	load/unload/
	abort(图像完全载入之前，因浏览器停止了载入页面导致图像载入失败)/
	error(适用于window对象，也适用于图像对象，识别图像载入错误)
	resize
	scroll(适用于具有overflow:auto样式的元素)
	2：鼠标移动事件
	mousemove/mouseover/mouseout
	3：鼠标单击事件
	mousedown/mouseup/click(鼠标指针不动才会触发)/dblclick
	4：键盘事件
	keydown/keyup/keypress
	5：表单相关事件
	submit/reset
	blur/focus
	change(focus与blur事件之间修改时触发)
	6：其他事件（dom2，可能ie等浏览器没有支持）
	用户界面事件
	DOMFocusIn/DOMFocusOut
	DOMActivate
	修改DOM文档的结构
	DOMSubtreeModified
	DOMNodeInserted
	DOMNodeRemoved
	DOMNodeRemovedFromDocument
	NodeInsertedIntoDocument
	DOMAttrModified
	DOMCharacterDataModified
	
	控制事件流
	捕获阶段（ie不支持）、冒泡阶段
	事件冒泡（由ie提出，目标元素的事件方法优先执行，然后事件会向外传播到每个祖先元素，直至document对象）
	事件捕获（Netscape提出，优先权赋予了最外层的祖先元素，然后向内传播）
	冒泡事件流是针对传统事件注册的默认事件流
	
	阻止冒泡stopPropagation（ie上属性cancelBubble设置为true）
	取消默认动作preventDefault(ie上属性returnValue设置为false)
	能取消默认动作的事件
	click/
	mousedown/mouseup/mouseover/mouseout/
	submit/
	DOMActivate/
	注册事件
	1：嵌入式注册模型（标签内部）
	2：传统的事件模型（var ancchor; anchor.onclick = function(){};anchor.onclick = null(移除事件侦听器)；anchor.onclick();(调用)）
	3：Microsoft特有的事件模型
	attachEvent(event,listener)/detachEvent(event,listener)
	fireEvent("onclick")手动调用事件
	4:W3c DOM2事件模型
	addEventListener(event,listener,false)/removeEventListener(event,listener,true)
	第三个参数为true，事件侦听器将在捕获阶段内执行，false在冒泡阶段内执行
	第一个参数是去掉前面的‘on’
	手动调用事件：
	var event = document.createEvent("MouseEvents");
	event.initMouseEvent(
		'click',
		true,//可以冒泡
		true,//可以取消
		window,//视图类型
		...
	);
	anchor.dispatchEvent(event);
	
	事件侦听器中访问事件对象
	W3C的事件模型中，事件侦听器会取得一个表示事件自身的参数
	function eventListener(W3CEvent){}
	ie
	function eventListener (W3CEvent) {
		var eventObject = W3CEvent || window.event;
	}
	
	跨浏览器的事件属性和方法
	事件对象的扩展
	Event
	-UIEvent
	--MouseEvent
	-MutationEvent
	DocumentEvent
	//
	W3C DOM2事件模型中Event属性：
	bubbles/布尔值，true表示事件是冒泡阶段的事件
	cancelable/表示事件是否具有可以被取消的默认动作
	currentTarget/当前正在处理的事件侦听器所在的事件流中的DOM元素，不等于target
	target/DOM文档中最早调用事件序列的目标对象（EventTarget对象的实例）
	timestamp/是一个DOMTimeStamp对象，毫秒
	type/事件名称
	eventPhase/表示当前事件侦听器处于事件流的哪个阶段。
	使用整数1~3表示（Event常量，CAPTUTING_PHASE(捕获)/AT_TARGET（目标对象）/BUBBLING_PHASE（冒泡））
	W3C DOM2事件模型中Event方法：
	initEvent(eventType,canBubble,cancelable)
	preventDefault()
	stopPropagation()/侦听器仍然会在当前层次上执行，但事件流不会继续超出currentTarget
	//
	W3C DOM2事件模型中MouseEvent属性：
	altKey/是否按住了，布尔值
	ctrlKey/
	shiftKey/
	button/0表示鼠标左键1表示鼠标中键2表示鼠标右键
	clientX/相对于浏览器窗口的坐标
	clientY
	screenX/相对于客户端屏幕的坐标
	screenY
	relatedTarget/多数情况下为null，在mouseover事件中，它引用的是鼠标离开的前一个对象
	在mouseout事件中，它引用的是鼠标之前进入的那个对象
	
	//
	处理浏览器不兼容问题
	//访问事件的目标元素
	ie没有target、currentTarget属性，提供srcElement属性，safari中文本节点会代替包含它的元素变成事件的目标元素
	//确定单击了哪个鼠标键
	w3c规定 0（左）/1（中）/2（右）
	Microsoft规定0（没有按）/1（左）/2（右）/3（左右）/4（中）/5（左中）/6（右中）/7（三键全按）
	//处理鼠标的位置
	W3C和ie都有clientX/clientY属性，在浏览器滚动后的位移属性时却各有不同
	W3C(document.documentElement.scrollTop)
	ie(document.body.scrollTop)
	safari(事件对象的pageX/pageY)
	//访问键盘命令
	
	*/
	
	function stopPropagation(eventObject){
		eventObject = eventObject || getEventObject(eventObject);
		if(eventObject.stopPropagation){
				eventObject.stopPropagation();
		}else{
			eventObject.cancelBubble = true;
		}	
	};
	
	window['nbug']['stopPropagation'] = stopPropagation;
	
	function preventDefault (eventObject) {
		eventObject = eventObject || getEventObject(eventObject);
		if(eventObject.preventDefault){
			eventObject.preventDefault();
		}else{
			eventObject.returnValue = false;
		}
	};
	
	window['nbug']['preventDefault'] = preventDefault;
	
	function getEventObject (W3CEvent) {
		return W3CEvent || window.event;
	};
	window['nbug']['getEventObject'] = getEventObject;
	
	function getTarget (eventObject) {
		eventObject = eventObject || getEventObject(eventObject);
		//w3c\ie
		var target = eventObject.target || eventObject.srcElement;
		//safari
		if(target.nodeType == nbug.node.TEXT_NODE){
			target = node.parentNode;
		} 
		return target;
	};
	window['nbug']['getTarget'] = getTarget;
	
	function getMouseButton (eventObject) {
		eventObject = eventObject || getEventObject(eventObject);
		
		var buttons = {
			'left' : false,
			'middle' : false,
			'right' : false
		};
		if (eventObject.toString && eventObject.toString().indexOf('MouseEvent') != -1) {
			switch (eventObject.button) {
				case 0:
					 buttons.left = true;break;
			  case 1:
			  	 buttons.middle = true;break;
			  case 2:
			  	 buttons.right = true;break;
				default:break;
			}
		}else if (eventObject.button) {
			switch (event.button) {
				case 1:buttons.left = true;break;
			  case 2:buttons.right = true;break;
			  case 3:
			 		buttons.left = true;
			 		buttons.right = true;
			 		break;
			  case 4:
			 		buttons.middle = true;
			 		break;
			  case 5:
			 		buttons.left = true;
			 		buttons.moddle = true;
			 		break;
			  case 6:
			 		buttons.right = true;
			 		buttons.middle = true;
			 		break;
			  case 7:
					buttons.left = true;
					buttons.middle = true;
					buttons.right = true;
					break;
				default:break;
			}			
		}else{
			return false;
		}
		return buttons;
	};
	window['nbug']['getMouseButton'] = getMouseButton;
	
	function getPointerPositionInDocument (eventObject) {
		eventObject = eventObject || getEventObject(eventObject);
		
		var x = event.pageX || (eventObject.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
		var y = event.pageY || (eventObject.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
		
		return {'x':x,'y':y};	
	};
	window['nbug']['getPointerPositionInDocument'] = getPointerPositionInDocument;
	
	function getKeyPressed (eventObject) {
		eventObject = eventObject || getEventObject(eventObject);
		//键盘A 65,B 66等
		var code = eventObject.keyCode;
		var value = String.fromCharCode(code);
		return {'code':code,'value':value};
	};
	window['nbug']['getKeyPressed'] = getKeyPressed;
	
	/**
	CSSStyleSheet对象表示的是所有CSS样式表，包括外部和嵌入的（继承dom对象）
	CSSStyleRule对象表示的则是样式表中的每条规则
	document.styleSheets属性可以取得CSSStyleSheet对象的列表
	
	//CSSStyleSheet
	属性：
	type text/css
	disabled
	href
	title
	media表示应用的目标设备类型，例如screen/print
	ownerRule只读的CSSRule对象
	cssRules只读的CSSRuleList列表对象
	方法：
	insertRule(rule,index)
	deleteRule(index)
	**/
})();