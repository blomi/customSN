/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable keyword-spacing */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable space-before-function-paren */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable space-before-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable wrap-iife */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable func-names */

document.onload = function () {
    function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function generatePostFromJSON(post) {
        console.log(post);
        var html = `<div class="post-item">
                        <div class="post-header">
                            <div class="post-author-pic-container">
                                <img class="post-author-pic" src="${post.author.thumburl}">
                            </div>
                            <div class="post-author-info">
                                <div class="post-author-name">${jsUcfirst(post.author.firstname)} ${jsUcfirst(post.author.lastname)}</div>
                                <div class="post-date">${post.date}</div>
                            </div>
                        </div>
                        <div class="post-title">
                            <textarea class="post-title-content" rows="1" readonly="">${post.description}</textarea>
                        </div>
                        <div class="post-content">
                            <img class="post-content-img" src="${post.imgurl}">
                            <!-- <img class="post-content-img" src="/img/bathroom-reader.jpg"> -->
                        </div>
                        <div class="post-description">${post.imgdescription}</div>
                        <div class="post-action">
                            <div class="post-action-btn">Like</div>
                            <div class="post-action-btn">Comment</div>
                            <div class="post-action-btn">Share</div>
                        </div>
                        <div class="post-comment-section">`;
        
        for(var i = 0; i < post.comments.length; i++){
            var comm = post.comments[i];
            html += `<div class="post-comment-item">
                        <div class="post-comment-author-pic-container">
                            <img class="post-comment-author-pic" src="${comm.author.thumburl}">
                        </div>
                        <div class="post-comment-body">
                            <div class="post-comment-author-name">${jsUcfirst(comm.author.firstname)} ${jsUcfirst(comm.author.lastname)}</div>
                            <div class="post-comment-content">
                                <div class="post-comment-text">${comm.description}</div>
                            </div>
                            <div class="post-comment-subsection">
                                <div class="post-comment-like-btn">Like</div>
                                <div class="post-comment-reply-btn">Reply</div>
                            </div>
                            <div class="post-comment-reply-section">`;
            for(var j = 0; j < post.comments[i].subcomments.length; j++){
                var subcomm = comm.subcomments[j];
                html += `<div class="post-comment-item">
                            <div class="post-comment-author-pic-container">
                                <img class="post-comment-author-pic" src="${subcomm.author.thumburl}">
                            </div>
                            <div class="post-comment-body">
                                <div class="post-comment-author-name">${jsUcfirst(subcomm.author.firstname)} ${jsUcfirst(subcomm.author.lastname)}</div>
                                <div class="post-comment-content">
                                    <div class="post-comment-text">${subcomm.description}</div>
                                </div>
                                <div class="post-comment-subsection">
                                    <div class="post-comment-like-btn">Like</div>
                                    <div class="post-comment-reply-btn">Reply</div>
                                </div>
                            </div>
                        </div>`;
            }
            html += '</div></div></div>';
        }
        html += '</div></div>';
        return html;

    }

    function loadFeed() {
        var url = '/user/posts';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', url, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                var { posts } = JSON.parse(xmlhttp.responseText);
                console.log(posts[0]);
                for (var i = 0; i < posts.length; i++) {
                    var template = generatePostFromJSON(posts[i]);
                    document.getElementById('fContent').innerHTML += template;
                }
            }
        };
        xmlhttp.send();
    }
    loadFeed();

}();


// alert();