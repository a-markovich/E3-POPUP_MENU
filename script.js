var menu=[
  {name:'Пункт 1',submenu:
    [
      {name:'Пункт 1.1',submenu:
        [
          {name:'Пункт 1.1.1',url:'http://www.microsoft.com'},
          {name:'Пункт 1.1.2 длинный',url:'http://www.microsoft.com'}
        ]
      },
      {name:'Пункт 1.2',url:'http://www.microsoft.com'},
      {name:'Пункт 1.3 длинный',submenu:
        [
          {name:'Пункт 1.3.1',url:'http://www.microsoft.com'},
          {name:'Пункт 1.3.2',url:'http://www.microsoft.com'},
          {name:'Пункт 1.3.3',url:'http://www.microsoft.com'},
          {name:'Пункт 1.3.4 длинный',url:'http://www.microsoft.com'}
        ]
      }
    ]
  },

  {name:'Пункт 2 длинный',url:'http://www.microsoft.com'},

  {name:'Пункт 3',submenu:
    [
      {name:'Пункт 3.1 длинный',url:'http://www.microsoft.com'},
      {name:'Пункт 3.2',url:'http://www.microsoft.com'}
    ]
  }
];


function popupMenu(menu) {

  let menuElem, menuItemElem, submenuElem, submenuItemElem;

  menuElem = document.createElement("ul");
  document.body.appendChild(menuElem);
  menuElem.className="menu";

  function createLi(array, menuElem) {
    let menuItemElem, linkElem, text;

    if ("name" in array) {
      menuItemElem = document.createElement("li");
      menuElem.appendChild(menuItemElem);
      
      if("url" in array) {
        linkElem = document.createElement("a");
        linkElem.setAttribute("href", `${array.url}`);
        menuItemElem.appendChild(linkElem);

        text = document.createTextNode(array.name);
        linkElem.appendChild(text);
      } else {
        text = document.createTextNode(`${array.name} \u21D3`);
        menuItemElem.appendChild(text);
      }
    }
    return menuItemElem;
  }

  for (let i=0; i<menu.length; i++) {

    menuItemElem = createLi(menu[i], menuElem);
    menuItemElem.className="menu_item";

    if ("submenu" in menu[i]) {
      submenuElem = document.createElement("ul");
      menuItemElem.appendChild(submenuElem);
      submenuElem.className="submenu";

      for (let j=0; j<menu[i].submenu.length; j++) {

        submenuItemElem = createLi(menu[i].submenu[j], submenuElem);
        submenuItemElem.className="submenu_item";

        if ("submenu" in menu[i].submenu[j]) {
          createSubmenu (menu[i].submenu[j].submenu, submenuItemElem);
        }

        function createSubmenu (arrSubmenu, submenuItemElem) {
          let nextSubmenuElem, nextSubmenuItemElem; 

          nextSubmenuElem = document.createElement("ul");
          submenuItemElem.appendChild(nextSubmenuElem);
          nextSubmenuElem.setAttribute("style", "display:none");
          nextSubmenuElem.className="next_submenu";

          for (let i=0; i<arrSubmenu.length; i++) {

            nextSubmenuItemElem = createLi(arrSubmenu[i], nextSubmenuElem);
            nextSubmenuItemElem.className="submenu_item";

            if ("submenu" in arrSubmenu[i]) {
              createSubmenu (arrSubmenu[i].submenu, nextSubmenuItemElem);
            }
          }
        }
      }
    }
  }

  let arr = document.getElementsByClassName("submenu_item");
  
  for(let elem of arr) {
    let ulElem = elem.querySelector(".next_submenu");
    
    if (ulElem) {
      elem.addEventListener("mouseover", mouseoverFunc);
      elem.addEventListener("mouseout", mouseoutFunc);
  
      function mouseoverFunc() {
        ulElem.setAttribute("style", "display:block");
      }
      function mouseoutFunc() {
        ulElem.setAttribute("style", "display:none");
      }
    }
  }

}

popupMenu(menu);

