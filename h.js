
if(location.pathname.substr(0, 6)=="/help/" && window==top)
{
	document.write("<p><a href='/help/'>contents</a></p>");
}

function doSection(secNum){
//display the section if it's not displayed; hide it if it is displayed
if (secNum.style.display=="block"){secNum.style.display="none"}
else{secNum.style.display="block"}
}

function Google(searchText)
{
window.open('http://www.google.com/search?q=' + escape(searchText));
}

function GoogleMS(searchText)
{
Google('site:microsoft.com ' + searchText);
}

function createLinksFromUDF(){
	var els = document.getElementsByTagName('span'), el, i;
	for (i = els.length-1; i>=0; i--)
	{
		el=els[i];
		switch(el.className){
		case 'UDF':
			el.title="Function help: enter name in macro and press F1.";
			break;
		case 'type':
			if(el.innerHTML != el.innerHTML.toUpperCase()) el.title="Class help: enter name in macro and press F1.";
			break;
		}
		//el.onclick=function(){};
		//var txt=el.innerHTML;
		//el.innerHTML="<a href='qmhelp:"+txt+"' class='UDF' title='Function help is in QM window. If the link does not work, enter function name in macro and press F1.'>"+txt+"</a>";
	}
}

window.onload=createLinksFromUDF;
