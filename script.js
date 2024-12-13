function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return "";
}

function updateCounts() {
    document.getElementById("likeCount").textContent = getCookie("likes") || 0;
    document.getElementById("dislikeCount").textContent = getCookie("dislikes") || 0;
    document.getElementById("commentSection").textContent = getCookie("comment") || "";
}

document.getElementById("likeBtn").onclick = () => {
    if (!getCookie("voted")) {
        setCookie("likes", parseInt(getCookie("likes") || 0) + 1, 7);
        setCookie("voted", "true", 7);
        updateCounts();
    } else {
        alert("You have already voted!");
    }
};

document.getElementById("dislikeBtn").onclick = () => {
    if (!getCookie("voted")) {
        setCookie("dislikes", parseInt(getCookie("dislikes") || 0) + 1, 7);
        setCookie("voted", "true", 7);
        updateCounts();
    } else {
        alert("You have already voted!");
    }
};

document.getElementById("submitComment").onclick = () => {
    if (!getCookie("comment")) {
        const comment = document.getElementById("comment").value.trim();
        if (comment) {
            setCookie("comment", comment, 7);
            updateCounts();
        } else {
            alert("Please enter a valid comment.");
        }
    } else {
        alert("You have already submitted a comment!");
    }
};

document.getElementById("resetBtn").onclick = () => {
    setCookie("likes", 0, -1);
    setCookie("dislikes", 0, -1);
    setCookie("voted", "", -1);
    setCookie("comment", "", -1);
    updateCounts();
    document.getElementById("comment").value = "";
};

updateCounts();
