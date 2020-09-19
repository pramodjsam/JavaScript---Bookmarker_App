document.getElementById("myForm").addEventListener("submit",saveBookmark);

function saveBookmark(e){
	e.preventDefault();
	let siteName=document.getElementById("siteName").value;
	let siteUrl=document.getElementById("siteUrl").value;

	if(!validateForm(siteName,siteUrl)){
		return false
	}
	
	const bookmark={
		name:siteName,
		url:siteUrl
	}

	//localStorage
	if(localStorage.getItem("bookmarks")===null){
		let bookmarks=[];
		bookmarks.push(bookmark);
		localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
	}else{
		let bookmarks =JSON.parse(localStorage.getItem("bookmarks"));
		bookmarks.push(bookmark);
		localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
	}
	document.getElementById("myForm").reset();
	fetchBookmarks();
}

function deleteBookmark(url){
	let bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
	for(let i=0;i<bookmarks.length;i++){
		if(bookmarks[i].url==url){
			bookmarks.splice(i,1);
		}
	}
	localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
	fetchBookmarks();
}

function fetchBookmarks(){
	let bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
	const bookmarkResults=document.getElementById("bookmarksResults");
	bookmarkResults.innerHTML="";
	for(let i=0;i<bookmarks.length;i++){
		let name=bookmarks[i].name;
		let url=bookmarks[i].url;
		bookmarkResults.innerHTML+=`
			<div class="card card-body text-dark bg-light mt-3">
				<h3>${name}
				<a class="btn btn-secondary" href="${url}" target="_blank">Visit</a>
				<a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete</a>
				</h3>
			</div>

		`;
	}
}

function validateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert("Please fill in the form");
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteUrl.match(regex)) {
	  alert("Please enter a valid url");
	  return false;
	}

	return true;
}