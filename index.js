
let apikey = "AIzaSyCZkB0mvoj_2_1pYN4DUxPf5QhTDSSAzPk";
var contadorPag = 1;
var Datos;
function buildfetch(searchTerm, callback){

    let url= `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${searchTerm}&key=${apikey}`;

    fetch(url)
	 .then(response => {
	  if (response.ok){
	  	return response.json();
	  }
	  else {
	  	throw new Error('Something went wrong. Try again later.');
	  }
	 })
        .then(responseJson =>{ callback(responseJson)
        })
        .catch(err => { 
            $('.results').html(err.message);
		})

		/*$.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?",
            method:"GET",
            data:{
                key:apikey,
				q:searchTerm,
				part:"snippet",
				maxResults:"50",
				type:"video"

            },
            dataType: "json",
            sucess: responseJson => callback(responseJson),
        
            error:err => console.log(err)
        });*/
		

    


}



function dispVideo(data){
    //console.log(data.meals.length);
	$('.results').html('');
	Datos = data;

	
	
	for(let i = 0; i<10 ; i++){
	$('.results').append( ` <div class= "Extra">
								<div class="Video"> 
									<a target ="_blank" href= " https://www.youtube.com/watch?v=${data.items[i].id.videoId} ">
										<img src=${data.items[i].snippet.thumbnails.medium.url} style= "width:400px;height:250px"></img>
										<div class= "videoName"> ${data.items[i].snippet.title} </div>
									</a>
								</div> 
							</div>` ); 
	}

	$('.botones').html( `<p class = "Botones">
							<spam> <button type= "submit" id="backButton"> Back </button> </spam>
							<spam id = "Contador"> Pagina ${contadorPag} </spam>
							<spam> <button type= "submit" id="nextButton"> Next </button> </spam>
								</p> ` );
	
	
	
}	
function dispPage(){
    //console.log(data.meals.length);
	$('.results').html('');
	var iterator = (contadorPag-1)*10;


	
	for(let i = 0; i<10 ; i++){
	
	$('.results').append( ` <div class= "Extra">
								<div class="Video"> 
									<a target ="_blank" href= " https://www.youtube.com/watch?v=${Datos.items[iterator+i].id.videoId} ">
										<img src=${Datos.items[iterator+i].snippet.thumbnails.medium.url} style= "width:400px;height:250px"></img>
										<div class= "videoName"> ${Datos.items[iterator+i].snippet.title} </div>
									</a>
								</div> 
							</div>` ); 
	} 

	$('#Contador').html(`Pagina ${contadorPag} ` );
	
	
	
}



    $('.YTForm').on('submit',(event) => {
        event.preventDefault();
        let searchTerm = $('#YTSearchbox').val();
		contadorPag = 1;
        buildfetch(searchTerm,dispVideo);


        

	});
	

	$(document).on("click","#backButton",function(event){
		event.preventDefault();
		if (contadorPag>1){
		contadorPag--;
		dispPage();}
	
	});

	$(document).on("click","#nextButton",function(event){
		event.preventDefault();
		if (contadorPag<5){
		contadorPag = contadorPag+1;
		dispPage();
		}
	
	});





