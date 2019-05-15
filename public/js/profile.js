/* eslint-disable keyword-spacing */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable space-before-function-paren */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable space-before-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable wrap-iife */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable func-names */
document.onload = function () {
  // alert();
  var app = this;

  app.menuStructure = {};
  app.menuStructure.About = [
    {
      name: 'Overview',
      url: '/user/overview'
    },
    { 
      name: 'Locations',
      url: '/user/locations'
    },
    {
      name: 'Study / Work',
      url: '/user/work'
    },
    {
      name: 'Contact',
      url: '/uiser/contact'
    },
    {
      name: 'Family',
      url: '/user/family'
    }
  ];
  app.menuStructure.Friends = ['All', 'Recently Added', 'Most Active', 'Family'];
  app.menuStructure.Interests = [];
  app.menuStructure.Photos = ['Albums', 'Mobile Uploads', 'Recently Added', 'Sorted'];
  
  app.getSubMenuItems = function(menuName){
    var subMenuItems = '';
    for(let i = 0; i < menuStructure[menuName].length; i++){
      var subMenuObj = menuStructure[menuName][i];
      subMenuItems += `<div data-url="${subMenuObj.url}" class="profile-sub-menu-item">${subMenuObj.name}</div>`;
    }
    return subMenuItems;
  };

  app.menuSelected = function(target){
    target.classList.add('active-menu-item');
  };

  app.subMenuSelected = function(target){
    target.classList.add('active-sub-menu-item');
  };

  app.cancelSelectedMenu = function(){
    var selectedList = document.getElementsByClassName('active-menu-item');
    if (selectedList.length !== 0) {
      var selected = selectedList[0];
      selected.classList.remove('active-menu-item');
    }
  };

  app.cancelSelectedSubMenu = function(){
    var selectedList = document.getElementsByClassName('active-sub-menu-item');
    if (selectedList.length !== 0) {
      var selected = selectedList[0];
      selected.classList.remove('active-sub-menu-item');
    }
  };

  app.attachSubMenuContent = function(target){
    document.getElementById('subMenu').innerHTML = getSubMenuItems(target.name);
  };

  app.attachMainContent = function(target){
    
  };

  app.fetchPage = function(url){
    // alert(url);
    var xmlhttp;
    if (window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4){
        document.getElementById('innerContent').innerHTML = xmlhttp.responseText;
        // document.getElementsByClassName
      }
    };
    xmlhttp.send();
  };

  app.subMenuItemClicked = function(target){
    app.cancelSelectedSubMenu();
    app.subMenuSelected(target);
    [app.activeSubMenu] = document.getElementsByClassName('active-sub-menu-item');
    app.fetchPage(app.activeSubMenu.getAttribute('data-url'));
  };

  app.subMenuItemClickedWrapper = function(e){
    app.subMenuItemClicked(e.target);
  };

  app.menuItemClicked = function(target){
    app.cancelSelectedMenu();
    app.menuSelected(target);
    app.attachSubMenuContent(target);
    app.subMenuItems = document.getElementsByClassName('profile-sub-menu-item');
    for(let i = 0; i < app.subMenuItems.length; i++) {
      app.subMenuItems[i].addEventListener('click', subMenuItemClickedWrapper);
    }
    app.subMenuItemClicked(document.getElementsByClassName('profile-sub-menu-item')[0]);
  };

  app.menuItemClickedWrapper = function (e) {
    app.menuItemClicked(e.target);
  };

  

  app.menuItemClicked(document.getElementsByClassName('profile-menu-item')[0]);

  
  app.loadUserData = function(){
    var url = '/user/data';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState === 4){
        app.user = JSON.parse(xmlhttp.responseText);
        app.menuStructure.Interests = user.interests;
      }
    };
    xmlhttp.send();
  };
  app.loadUserData();
}();

// <!DOCTYPE html>
// <html>
// 	<head>
// 		<title>tasks</title>
// 	</head>
// 	<body>

// 		<div id="tasks">

// 			<input type="text" id="task-name">

// 			<input type="button" id="add" value="Add">

// 			<ul id="task-list">
// 				<li>Some Task <button class="remove">X</button></li>
// 			</ul>

// 		</div>

// 		<script>

// 			document.getElementById('add').addEventListener('click', function() {
// 				var html = '<li>';
// 				html += document.getElementById('task-name').value;
// 				html += '<button class="remove">X</button>';
// 				html += '</li>';

// 				document.getElementById('task-list').innerHTML += html;
// 			});

// 			document.getElementById('task-list').addEventListener('click', function (e) {
// 				if (e.target.classList.contains('remove')) {
// 					e.target.parentNode.remove();
// 				}
// 			});

// 		</script>

// 	</body>
// </html>