document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('blog-posts-container');
    const paginationContainer = document.getElementById('pagination-container');

    const mockPosts = [
        { title: 'Post 1', excerpt: 'Excerpt for post 1', author: 'Admin', date: '2024-01-01', image: 'assets/blog/blog-1.jpg' },
        { title: 'Post 2', excerpt: 'Excerpt for post 2', author: 'Admin', date: '2024-01-02', image: 'assets/blog/blog-2.jpg' },
        { title: 'Post 3', excerpt: 'Excerpt for post 3', author: 'Admin', date: '2024-01-03', image: 'assets/blog/blog-3.jpg' },
        { title: 'Post 4', excerpt: 'Excerpt for post 4', author: 'Admin', date: '2024-01-04', image: 'assets/blog/blog-4.jpg' },
        { title: 'Post 5', excerpt: 'Excerpt for post 5', author: 'Admin', date: '2024-01-05', image: 'assets/blog/blog-5.jpg' },
        { title: 'Post 6', excerpt: 'Excerpt for post 6', author: 'Admin', date: '2024-01-06', image: 'assets/blog/blog-6.jpg' },
    ];

    const postsPerPage = 3;
    let currentPage = 1;

    function displayPosts(page) {
        postsContainer.innerHTML = '';
        page--; // Adjust for zero-based index

        const start = postsPerPage * page;
        const end = start + postsPerPage;
        const paginatedPosts = mockPosts.slice(start, end);

        for (const post of paginatedPosts) {
            const postElement = document.createElement('div');
            postElement.classList.add('post-card');
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <div class="post-card-content">
                    <h3>${post.title}</h3>
                    <p>By ${post.author} on ${post.date}</p>
                    <p>${post.excerpt}</p>
                    <a href="blog-details.html">Read More</a>
                </div>
            `;
            postsContainer.appendChild(postElement);
        }
    }

    function setupPagination() {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(mockPosts.length / postsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.classList.toggle('active', i === currentPage);
            btn.addEventListener('click', () => {
                currentPage = i;
                displayPosts(currentPage);
                setupPagination();
            });
            paginationContainer.appendChild(btn);
        }
    }

    displayPosts(currentPage);
    setupPagination();
});
