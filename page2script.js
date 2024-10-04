let currentPost = 0;
let postPerRow = 9;
let loading = false;

//Henter innlegg fra API.
function fetchPosts() {
    //Forhindrer at vi henter nye poster hvis det allerede pågår
    if (loading) return;
    loading = true;
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${currentPost}&_limit=${postPerRow}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((posts) => {
            // Henter container-elementet der postene skal vises
            const postContainer = document.getElementById('posts-container');

            // Legger til nye poster i containeren
            posts.forEach(post => {
                postContainer.innerHTML += `    
                    <div class="post">
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    </div>
                `;
            });

            // Oppdater currentPost for å hente neste sett med innlegg
            currentPost += postPerRow;
        })
        .finally(() => {
            loading = false;
        });
}

// Sjekker om brukeren har scrollet til bunnen av siden
function checkScrollPosition() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        fetchPosts(); // Hent flere innlegg når bunnen er nådd
    }
}


window.addEventListener('scroll', checkScrollPosition);

fetchPosts();