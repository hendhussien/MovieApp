
const nameError = document.getElementById('nameError');
const mailError = document.getElementById('mailError');
const ageError = document.getElementById('ageError');
const phoneError =document.getElementById('phoneError');
const passError =document.getElementById('passError');
const confirmPassError =document.getElementById('confirmPassError');
const inputName =document.querySelector('.inputName');
const ageInput =document.querySelector('.ageInput');
const mailInput =document.querySelector('.mailInput');
const passInput = document.querySelector('.passInput');
const phoneInput =document.querySelector('.phoneInput');
const confirmPassInput =document.querySelector('.confirmPassInput');
const contactUsLink =document.getElementById('contactUsLink');
const contactBtn =document.querySelector('.contactBtn');
//contactBtn.disabled = true;
const inputSearch = document.getElementById('inputSearch');
let theMovies = [];
let allMovies =[];
let imgPosterPath = 'https://image.tmdb.org/t/p/w500';
let sideBarInnerWidth = $('.sideBarInner').innerWidth();
$('#sideBar').css('left', -sideBarInnerWidth);

$('#sideBar .sideBarOuter .bars').click(function(){
    if($('#sideBar').css('left') == '0px'){
        $('#sideBar').animate({left:-sideBarInnerWidth},1000);
         $('.sideBarInner ul li').animate({"paddingTop":"200px","opacity":"0"},100);
        $('#sideBar .sideBarOuter .bars .fa-bars').show(0,function(){
            $('#sideBar .sideBarOuter .bars .xMark').removeClass('xMarkShow');
           });
    }else{
        $('#sideBar').animate({left:'0px'},1000);
        $('.sideBarInner ul li').animate({"paddingTop":"10px","opacity":"1"},500);
       $('#sideBar .sideBarOuter .bars .fa-bars').hide(10,function(){
        $('#sideBar .sideBarOuter .bars .xMark').addClass('xMarkShow');
       });
        // $('.navItem1').addClass(['animate__animated', 'animate__slideInUp']);
        // $('.navItem1').css('--animate-delay','2s');
    }
   
});
getHomeMovie('now_playing')
async function getHomeMovie(word){
    let movieContainer ='';
    let movies = await fetch(`https://api.themoviedb.org/3/movie/${word}?api_key=33647d70b0998a29c10cd3706781714a`);
    let res = await movies.json();
    //console.log(res);
    allMovies = res.results;
    //console.log(allMovies);
    //console.log(allMovies.vote_average);
    for(let i = 0; i < allMovies.length; i++){
        //console.log(allMovies);
        //console.log(allMovies[i].overview);
        movieContainer += `
        <div class="col-md-4">
          <div class="movieItem position-relative">
            <div class="moviePoster">
              <img src="${imgPosterPath}${allMovies[i].poster_path}" class="w-100 makeTransition" alt="poster">
            </div>
            <div class="movieDetails position-absolute top-0 bottom-0 p-3 makeTransition">
              <h3 class="text-center fw-bold makeTransition pt-4 pb-3">${allMovies[i].title}</h3>
              <p class="animate__animated  makeTransition mDescription">${allMovies[i].overview}</p>
              <div class="mBottomDetails makeTransition pt-3">
                <p>Date release : <span>${allMovies[i].release_date}</p>
              <div class="movieRate">
                <div class='outerStars'>
                  <div class = 'innerStars'>
                  </div>
                </div>
                <p class='voteAvg d-flex justify-content-center align-items-center mt-3'><span>${allMovies[i].vote_average}</span></p>
              </div>
              </div>
             
            </div>
          </div>
        </div>
        `
      }
      document.getElementById('rowData').innerHTML = movieContainer;
      getRating();
  };
// making the stars
function getRating(){
  const total = 10;
  for(const rating in allMovies){
    //console.log(Object.keys(allMovies[rating]));
    //console.log(JSON.stringify(allMovies[rating]));
    //console.log(allMovies[rating].vote_average);
    const starsPrec = ((allMovies[rating].vote_average) / total) * 100;
    //console.log(starsPrec);
    const starPercRounded = `${(Math.round(starsPrec / 10) * 10)}%`;
    //console.log(starPercRounded);
    //document.querySelector(`.${(Object.keys(allMovies[rating]))} .innerStars`).style.width = starPercRounded;
    document.querySelector(` .innerStars`).style.width = starPercRounded;
  }
}

//searchMovieAPI;
async function searchMovieApi(term){
    
  let movieSearch = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=33647d70b0998a29c10cd3706781714a`);
  let res = await movieSearch.json();
  //console.log(res);
  theMovies = res.results;
  //console.log(theMovies);
  let displayMovie = '';
  for(let i = 0; i < theMovies.length; i++){
    displayMovie += `
    <div class="col-md-4">
      <div class="movieItem position-relative">
        <div class="moviePoster">
          <img src="${imgPosterPath}${theMovies[i].poster_path}" class="w-100 makeTransition" alt="poster">
        </div>
        <div class="movieDetails position-absolute top-0 bottom-0 p-3 makeTransition">
          <h3 class="text-center fw-bold makeTransition pt-4 pb-3">${theMovies[i].title}</h3>
          <p class="animate__animated  makeTransition mDescription">${theMovies[i].overview}</p>
          <div class="mBottomDetails makeTransition pt-3">
            <p>Date release : <span>${theMovies[i].release_date}</p>
          <div class="movieRate">
            <div class='outerStars'>
              <div class = 'innerStars'>
              </div>
            </div>
            <p class='voteAvg d-flex justify-content-center align-items-center mt-3'><span>${Math.round(theMovies[i].vote_average)}</span></p>
          </div>
          </div>
         
        </div>
      </div>
    </div>
    `
  }
  document.getElementById('rowData').innerHTML = displayMovie;
  getRating()
}
inputSearch.addEventListener('keyup',function(e){
  //console.log(e);
  if(e.code == 'Backspace' || theMovies.length == 0){
    getHomeMovie('now_playing');
  }
})

//changing movie links
let movieLinks = document.querySelectorAll('.movieLink');
for(let i =0; i<movieLinks.length; i++){
    movieLinks[i].addEventListener('click', function(e){
        console.log(e.target.attributes.value.nodeValue);
        //console.log(this.innerHTML);
        getHomeMovie(e.target.attributes.value.nodeValue)
    })
}

// Validation
//contactBtn.addEventListener('click',validateName);
inputName.addEventListener('blur',validateName);
function validateName(){
  let regName = /^[A-Z][a-z]{3,8}/
  //console.log(regName.test(inputName.value));
  if(regName.test(inputName.value)){
    nameError.classList.replace('d-block', 'd-none');
    return true
    //$('.contactInput .inputError').hide(0);
  }else{
    nameError.classList.replace('d-none', 'd-block');
    return false
    //$('.contactInput .inputError').show(0);
    //console.log('false');
  }
}
ageInput.addEventListener('blur', validateAge)
function validateAge(){
  let regAge = /^(1[89]|[2-9]\d)$/
  //console.log(regName.test(inputName.value));
  if(regAge.test(ageInput.value)){
    ageError.classList.replace('d-block', 'd-none');
    return true
    //$('.contactInput .inputError').hide(0);
  }else{
    ageError.classList.replace('d-none', 'd-block');
    return false
    //$('.contactInput .inputError').show(0);
    //console.log('false');
  }
}
mailInput.addEventListener('blur', validateMail)
function validateMail(){
  let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //console.log(regName.test(inputName.value));
  if(regEmail.test(mailInput.value)){
    mailError.classList.replace('d-block', 'd-none');
    return true
    //$('.contactInput .inputError').hide(0);
  }else{
    mailError.classList.replace('d-none', 'd-block');
    return false
    //$('.contactInput .inputError').show(0);
    //console.log('false');
  }
}
phoneInput.addEventListener('blur', validatePhone)
function validatePhone(){
  let regPhone = /^01[0125][0-9]{8}/;
  //console.log(regName.test(inputName.value));
  if(regPhone.test(phoneInput.value)){
    phoneError.classList.replace('d-block', 'd-none');
    return true
    //$('.contactInput .inputError').hide(0);
  }else{
    phoneError.classList.replace('d-none', 'd-block');
    return false
    //$('.contactInput .inputError').show(0);
    //console.log('false');
  }
}
passInput.addEventListener('blur', validatePass)
function validatePass(){
  let regPass = /^[A-Za-z]\w{7,14}$/;
  //console.log(regName.test(inputName.value));
  if(regPass.test(passInput.value)){
    passError.classList.replace('d-block', 'd-none');
    return true
    //$('.contactInput .inputError').hide(0);
  }else{
    passError.classList.replace('d-none', 'd-block');
    return false
    //$('.contactInput .inputError').show(0);
    //console.log('false');
  }
}
confirmPassInput.addEventListener('blur',confirmPasswordMatch)
function confirmPasswordMatch(){
  if(passInput.value != confirmPassInput.value){
    confirmPassError.classList.replace('d-none', 'd-block');
    return false
  }else{
    confirmPassError.classList.replace('d-block', 'd-none');
    return true
  }
}
contactBtn.addEventListener('click',validationAll)
function validationAll(){
  if(validateName()==true && validateAge()==true && validateMail()==true && validatePhone()==true && validatePass() ==true && confirmPasswordMatch()==true){
    console.log('correct');
    contactBtn.classList.replace('btn-dark', 'btn-success');
  }else{
    console.log('false');
   //contactBtn.disabled = true;
   contactBtn.classList.replace('btn-success', 'btn-dark');
  }
}

//go to contact us section 
$('#contactUsLink').click(function(){
  const offsetContact = $('#contact').offset().top;
  console.log(offsetContact);
  $('html,body').animate({scrollTop:offsetContact},500);
})

// go to top
$(window).scroll(function(){
  if($(window).scrollTop()> 100){
    console.log('tmm');
    $('.backToTop').fadeIn(1000).css('display','flex')
  }else{
    $('.backToTop').fadeOut(1000)
  }
})
$('.backToTop').click(function(){
  $(window).scrollTop(0);
  //console.log('top');
})
