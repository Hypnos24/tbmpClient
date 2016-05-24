function login() {
		var username = $("#login_account").val().trim();
		var password = $("#login_password").val().trim();
		var nowDate = new Date().getTime();
		localStorage.setItem("isAutoLogin","0");//0为未设置自动登录
		localStorage.setItem("isRememberAcc","0");
		if(username == ""){
			mui.toast("用户名不能为空");
			return;
		}if(password == ""){
			mui.toast("密码不能为空");
			return;
		}
		$.post(
			"http://192.168.60.19:8080/tbmp/rest/users/login", {
				"username": username,
				"password": password
			},
			function(data) {
				if (data.respCode == 0) {
					//存储session 和 最后登录时间
					sessionStorage.setItem("user",JSON.stringify(data));
					localStorage.setItem("lastLoginDate",nowDate);
					//记住账号，自动登录处理
					if($("#remember_account").is(":checked")){
						localStorage.setItem("username",username);
						localStorage.setItem("isRememberAcc","1");
					}else{
						localStorage.removeItem("username");
						localStorage.removeItem("password");
						localStorage.setItem("isAutoLogin","0")
					}
					
					if($("#auto_login").is(":checked")){
						localStorage.setItem("username",username);
						localStorage.setItem("password",password);
						localStorage.setItem("isAutoLogin","1");
					}else{
						localStorage.setItem("isAutoLogin","0");
					}
					
					 mui.openWindow({
					    url: "project-summary.html", 
					    id:"summary"
					  });
				} else {
					mui.toast(data.respDesc);
					return;
				}
			},'json');
	}


function returnLogin(){
	var username = localStorage.getItem("username");
	var password = localStorage.getItem("password");
	var isRememberAcc = localStorage.getItem("isRememberAcc");
	var isAutoLogin = localStorage.getItem("isAutoLogin");
	if(isRememberAcc == 1){
		document.getElementById("login_account").value=username;
		document.getElementById("login_password").value="";
		document.getElementById("remember_account").checked = true;
	}
	if(isAutoLogin == 1){
		document.getElementById("login_account").value=username;
		document.getElementById("login_password").value=password;
		document.getElementById("auto_login").checked = true;
	}
}
