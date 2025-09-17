const likedListContainer = document.querySelector('.liked-list-container')
import { activityTmpl } from "./activities.js"



export const likedListRender = () => {

    const storedLikes = localStorage.getItem('likedList')
    const likedList = storedLikes ? JSON.parse(storedLikes) : []
    
    if (likedListContainer) {

        likedListContainer.innerHTML = ""
        likedList.forEach(item => {

            likedListContainer.insertAdjacentHTML("beforeend", activityTmpl(item))
            
        });
    };

    
    const listLikes = () => {

        if (likedListContainer) {
            const likeBtns = document.querySelectorAll(".like-btn");

            likeBtns.forEach((btn) => {
              btn.classList.add("liked");

              btn.addEventListener("click", (e) => {
                let likedID = e.currentTarget.id;
                const activityToRemove = likedList.find(
                  (activity) => activity._id == likedID
                );

                likedList.splice(activityToRemove, 1);

                localStorage.setItem("likedList", JSON.stringify(likedList));

                likedListRender()

                if (likedList.length == 0) {
                  localStorage.removeItem("likedList");
                }
              });
            });
        }
      

    }
    
    listLikes()

}

