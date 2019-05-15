document.onload = function () {
	document.getElementById('reg-tab').addEventListener('click', function (e) {
		document.getElementById('log-tab').classList.remove('login-tab-active');
		document.getElementById('reg-tab').classList.add('login-tab-active');
		document.getElementById('log-panel').style.display = 'none';
		document.getElementById('reg-panel').style.display = 'block';
	});
	document.getElementById('log-tab').addEventListener('click', function (e) {
		document.getElementById('reg-tab').classList.remove('login-tab-active');
		document.getElementById('log-tab').classList.add('login-tab-active');
		document.getElementById('reg-panel').style.display = 'none';
		document.getElementById('log-panel').style.display = 'block';
	});
}();


// alert();