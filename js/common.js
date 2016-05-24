//非空判断函数
function isNotBlank(str){
	str = $.trim(str);
	if(str != null && str != '' && typeof(str) != 'undefined'){
		return true;
	}
	return false;
}
