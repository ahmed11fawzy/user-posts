function displayData(Data){
    let defaultData={
        name:'reus',
        age:23,
    }
    Object.assign(defaultData,Data)
    return `hi ${defaultData.name} your age is ${defaultData.age} `
}
console.log(displayData({age:21}))



// USEFULL fetch data


const userUrl='https://jsonplaceholder.typicode.com/users'

async function getAllUsers(){
    try{
        const response= await fetch(userUrl)
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        let data=await response.json();
        return data
    }
    catch(err){
        console.log(err)
    }
}

// Note  display all users name


function createUser(user){
    document.querySelector('#users').innerHTML+=`<li class='user' id='${user.id}' >${user.name} </li>`
}




async function displayUsers() {
    const allUsersData = await getAllUsers();
    
    allUsersData.forEach(user => {
        console.log(user);
        createUser(user);

        
    });
}




async function selectUser(){
    await displayUsers().then(()=>{
        const listOfUsers= document.querySelectorAll('.user');
        console.log(listOfUsers);
        listOfUsers[0].classList.add('active');
        displayUserPosts(listOfUsers[0].id)
        let activeUser;
        listOfUsers.forEach(user=>{
            user.addEventListener('click',(e)=>{
                listOfUsers[0]==e.target?null:listOfUsers[0].classList.remove('active');

                activeUser?activeUser.classList.remove('active'):null
                activeUser=e.target 
                activeUser.classList.add('active');
                
                displayUserPosts(activeUser.id)
            })
        })
    })
}

selectUser();










/* Note get all users post */

const postUrl='https://jsonplaceholder.typicode.com/posts';

async function getAllPosts() {
    try{
        const response = await fetch(postUrl)
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        let data= await response.json();
        return data 
    }
    catch(err){
        console.log(err)
    }
}



async function displayPosts(){
    let posts= await getAllPosts();
    return posts
}




// Note filter user posts

async function getUserPosts(_userId){
    let userId=1;
    if(_userId){
        userId=_userId;
    }
    let userPosts=await displayPosts();
    
    userPosts=userPosts.filter(post=>post.userId==userId)
    console.log(userPosts)
    return userPosts;
}

// Note display user posts

function displayUserPosts(_userId){        
        getUserPosts(_userId).then((data)=>{
            clearPosts();
            data.forEach((post,i) => {
                console.log(post)
                
                document.querySelector('#postTabs').innerHTML+=`<li id='${i}' class="post">post${++i}</li>`;
                let activePost;
                document.querySelectorAll('.post')[0].classList.add('active-post');

// BUG fix  default active post
                showPost({id:1,userId:1,title:data[0].title,body:data[0].body,})

                document.querySelectorAll('.post').forEach(postTag=>{
                    
                    postTag.addEventListener('click',(e)=>{
                        e.target==document.querySelectorAll('.post')[0]?null:document.querySelectorAll('.post')[0].classList.remove('active-post'); 
                        console.log(e.target)
                        activePost?activePost.classList.remove('active-post'):null;
                        activePost=e.target;
                        e.target.classList.add('active-post');
                        console.log(e.target.id)
                        showPost({id:e.target.id,userId:1,title:data[e.target.id].title,body:data[e.target.id].body,})
                        
                    })
                })
            });
        })
            
} 




function clearPosts(){
    document.querySelector('#postTabs').innerHTML='';
    
}

function showPost(data){
    let defaultPost={
        id:1,
        userId:1,
        title:'title',
        body:'body',
    }
    Object.assign(defaultPost,data)
    document.querySelector('#postBody').innerHTML= `<h2>${defaultPost.title[0].toUpperCase()+defaultPost.title.slice(1)}</h2>
    <p>${defaultPost.body}</p>`


}




document.querySelector('#signUp').addEventListener('click',()=>{
    window.location.href='https://ahmed11fawzy.github.io/FormValidation/'
})