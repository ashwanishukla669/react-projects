async function getUser() {
    try{

        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        console.log(response.status);
        // console.log(response.ok);

        // const user = await response.json();

        // console.log(user);

    } catch(error){
        console.log(error.message)
    }
}

getUser()