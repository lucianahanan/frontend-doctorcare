/*---------- change to sticky menu on scroll */
function onScroll() {
  showStickyMenu();
  showBackToTop();
  deactivateMenuAll();
  activateMenu(home);
  activateMenu(services);
  activateMenu(about);
  activateMenu(contact);
}
document.body.onscroll = (event) => { onScroll(); }


//redraw header on viewport breakpoints
function onResize() {
  if (window.innerWidth > 570) {
    header.style.display='none';
    header.style.display='flex';
    toggleMobile('close'); //console.log('close')
    document.querySelector("nav").style.display = "flex";
    document.querySelector("#nav > ul").style.display = "flex";
  }
  if (window.innerWidth < 570) {
    header.style.display='none';
    header.style.display='flex';
    toggleMobile('open'); //console.log('open')
    //show nav menu
    //document.querySelector("#nav > ul").style.display = "none";
  }
}
window.onresize = (event) => { onResize(); }


function showStickyMenu() {

  let navmenu = document.querySelector('nav');

  if (scrollY > 0) {
    menu.classList.add( 'sticky' );
    navmenu.classList.add( 'sticky' );
  }
  else if (document.getElementById("closemenu").style.display !== "block") {
    menu.classList.remove( 'sticky' );

    if (nav.classList.length > 0 ) { //console.log(nav);
      links = document.querySelector('nav li a.active');
      links.classList.remove('active');

      nav.classList.remove( 'sticky' );
    }
  }
  // if (window.innerWidth < 570 && navmenu.classList.contains('fixnav')) {
  //   console.log('tem nav ');
  // }
}


function showBackToTop() {
  let backtotop = document.getElementById('backtotop');

  if (scrollY > 800 ) {
    backtotop.classList.add('visible');
  }
  else {
    backtotop.classList.remove('visible');
  }
}


/*---------- back to top */
function backToTop() {
  if (scrollY > 0) {
    backtotop.classList.add('visible');
  }
  else {
    backtotop.classList.remove('visible');
  }
}


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function scrollToSection(section) {
  const sectionTop = section.offsetTop - 72;
  window.scrollTo( { top: sectionTop, behavior: 'smooth' } );
}


function activateMenu( section ) { //console.log('activate');
  const targetLine = scrollY + innerHeight / 2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionReached = targetLine >= sectionTop;

  const sectionEnd  = sectionTop + sectionHeight;
  const sectionPassed = sectionEnd <= targetLine;

  // is on current section
  const sectionBoundaries = sectionReached && !sectionPassed;
  const menuElement = document.querySelector( `#nav ul a[name*=${section.id}]` );

  if (sectionBoundaries) {
    menuElement.classList.add( 'active' );
  }
  else {
    menuElement.classList.remove( 'active' );
  }
}


function deactivateMenuAll() {
  const activeElements = document.querySelectorAll( 'nav li a.active' ).length;

  if( activeElements > 0 ) {
    const MenuLinks = document.querySelectorAll( 'nav li a');//console.log(MenuLinks)

    MenuLinks.forEach( function (elem) {
      elem.classList.remove('active');
    } );
  }
}


function deactivateMenu( section ) { //console.log('deactivate');
  const sectionId = section.id; //console.log(section.id);

  const activeElements = document.querySelectorAll( 'nav li a.active' ).length;

  if( activeElements > 0 ) {
    //select current section menu item
    const currentMenuElement = document.querySelector( 'nav li a.active' );

    //is not same section that is already .active
    if( currentMenuElement && currentMenuElement.name !== section.id ) {

      //select all menu items except the one with .active
      const notMenuElements = document.querySelectorAll( `nav li a:not([name*=${section.id}])` );

      //remove .active from all other menu links
      notMenuElements.forEach( function (elem) {
        elem.classList.remove('active');
      } );
    }
  }
}


/*---------- get current .active section name */
function getCurrentActiveSection() {
  const currentMenuElement = document.querySelector( '#nav li a.active' );

  active = document.querySelector('.active'); //console.log(active);
}

/*---------- open Menu's Section */
function openSection(section) {

  if (innerWidth <= 570) { //console.log('sticky570');
    toggleMobile('close');
  }

  deactivateMenu(section);
  activateMenu(section);
  scrollToSection(section);
}


function toggleMobile(toggle) {

    //if open menu
    if (toggle === 'open') { //console.log('open');
      menu.classList.add('sticky');
      //hide main content and footer
      document.getElementsByTagName("main")[0].style.display = "none";
      document.getElementsByTagName("footer")[0].style.display = "none";
      //hide hamburguer open
      document.getElementById("openmenu").style.display = "none";
      //show hamburguer close
      document.getElementById("closemenu").style.display = "block";
      //show nav menu
      document.getElementsByTagName("nav")[0].style.display = "flex";
      //fix nav height
      document.getElementsByTagName("nav")[0].classList.add('fixnav');
    }

    if (toggle === 'close') { //console.log('close');
      //show main content and footer
      document.getElementsByTagName("main")[0].style.display = "block";
      document.getElementsByTagName("footer")[0].style.display = "block";
      //show hamburguer open
      document.getElementById("openmenu").style.display = "block";
      //hide hamburguer close
      document.getElementById("closemenu").style.display = "none";
      //hide nav menu
      document.getElementsByTagName("nav")[0].style.display = "none";
      //fix navheight
      document.getElementsByTagName("nav")[0].classList.remove('fixnav');
    }

    //is desktop
    if (innerWidth >= 570) {
      //hide hamburguer open
      document.getElementById("openmenu").style.display = "none";
      //show nav menu
      document.getElementsByTagName("nav")[0].style.display = "flex";
      //fix navheight
      document.getElementsByTagName("nav")[0].classList.remove('fixnav');
    }
}